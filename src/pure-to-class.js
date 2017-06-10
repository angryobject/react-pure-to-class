'use strict';

module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  const reactComponent = options.reactComponent || 'React.Component';

  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const hasJXSReturn = path =>
    j(path)
      .find(j.ReturnStatement)
      .filter(p => j.JSXElement.check(p.value.argument))
      .size() > 0;

  const hasName = path => !!(path.id && path.id.name);

  const canBeReplaced = path => hasJXSReturn(path) && hasName(path);

  const createPropsDecl = params => {
    const isLast = i => i === params.length - 1;
    const nameIsProps = p => p.name === 'props';

    return j.variableDeclaration('const', [
      j.variableDeclarator(
        j.objectPattern(
          params.map((path, i) => {
            const prop = j.property(
              'init',
              isLast(i) ? j.identifier('props') : path,
              path
            );
            prop.shorthand = !isLast(i) || nameIsProps(path);
            return prop;
          })
        ),
        j.thisExpression()
      ),
    ]);
  };

  const createConstructor = () =>
    j.methodDefinition(
      'constructor',
      j.identifier('constructor'),
      j.functionExpression(
        null,
        [j.identifier('props')],
        j.blockStatement([
          j.expressionStatement(
            j.callExpression(j.super(), [j.identifier('props')])
          ),
        ])
      )
    );

  const createRenderMethod = body =>
    j.methodDefinition(
      'method',
      j.identifier('render'),
      j.functionExpression(null, [], body)
    );

  const createClassComponent = (name, renderBody) => {
    const cls = j.classDeclaration(
      j.identifier(name),
      j.classBody([createConstructor(), createRenderMethod(renderBody)])
    );

    cls.superClass = j.template.expression([reactComponent]);

    return cls;
  };

  const replaceWithClass = path =>
    path.filter(canBeReplaced).replaceWith(p => {
      const name = p.value.id.name;
      const params = p.value.params;
      const body = p.value.body;

      body.body.unshift(createPropsDecl(params));

      return createClassComponent(name, body);
    });

  const root = j(file.source);

  [root.find(j.FunctionDeclaration), root.find(j.FunctionExpression)].forEach(
    replaceWithClass
  );

  return root.toSource(printOptions);
};
