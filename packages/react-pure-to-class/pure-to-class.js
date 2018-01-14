'use strict';

module.exports = function(file, api, options) {
  const j = api.jscodeshift;

  const reactComponent = options.reactComponent || 'React.Component';

  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const areValidArguments = args => {
    const hasOneArgumentMax = args.length <= 1;
    const argumentIsIdentifierOrObjectPattern =
      !args[0] || j.Identifier.check(args[0]) || j.ObjectPattern.check(args[0]);

    return hasOneArgumentMax && argumentIsIdentifierOrObjectPattern;
  };

  const isInsideFunctionOrObjectOrClass = path => {
    const jp = j(path);

    return (
      jp.closest(j.FunctionDeclaration).size() ||
      jp.closest(j.FunctionExpression).size() ||
      jp.closest(j.ArrowFunctionExpression).size() ||
      jp.closest(j.ObjectExpression).size() ||
      jp.closest(j.ClassBody).size()
    );
  };

  const canBeReplaced = path => {
    const hasValidArguments = areValidArguments(path.value.params);
    return hasValidArguments && !isInsideFunctionOrObjectOrClass(path);
  };

  const createBodyWithReturn = body =>
    j.BlockStatement.check(body)
      ? body
      : j.blockStatement([j.returnStatement(body)]);

  const createPropsDecl = param => {
    if (j.ObjectPattern.check(param) || param.name !== 'props') {
      return j.variableDeclaration('const', [
        j.variableDeclarator(
          param,
          j.memberExpression(j.thisExpression(), j.identifier('props'))
        ),
      ]);
    }

    const props = j.property('init', j.identifier('props'), param);
    props.shorthand = true;

    return j.variableDeclaration('const', [
      j.variableDeclarator(j.objectPattern([props]), j.thisExpression()),
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
      name ? j.identifier(name) : null,
      j.classBody([createConstructor(), createRenderMethod(renderBody)])
    );

    cls.superClass = j.template.expression([reactComponent]);

    return cls;
  };

  const replaceWithClass = path =>
    path.filter(canBeReplaced).replaceWith(p => {
      const name = p.value.id && p.value.id.name;
      const param = p.value.params[0];
      const body = createBodyWithReturn(p.value.body);

      if (param) {
        body.body.unshift(createPropsDecl(param));
      }

      return createClassComponent(name, body);
    });

  const root = j(file.source);

  [
    root.find(j.FunctionDeclaration),
    root.find(j.FunctionExpression),
    root.find(j.ArrowFunctionExpression),
  ].forEach(replaceWithClass);

  return root.toSource(printOptions);
};
