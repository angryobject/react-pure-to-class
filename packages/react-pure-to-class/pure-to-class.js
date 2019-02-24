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

  const isInsideJSXOrFunctionOrObjectOrClass = path => {
    const jp = j(path);

    return (
      jp.closest(j.JSXElement).size() ||
      jp.closest(j.FunctionDeclaration).size() ||
      jp.closest(j.FunctionExpression).size() ||
      jp.closest(j.ArrowFunctionExpression).size() ||
      jp.closest(j.ObjectExpression).size() ||
      jp.closest(j.ClassBody).size()
    );
  };

  const canBeReplaced = path => {
    const hasValidArguments = areValidArguments(path.value.params);
    return hasValidArguments && !isInsideJSXOrFunctionOrObjectOrClass(path);
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

  const createClassComponent = (name, renderBody, propsType) => {
    const cls = j.classDeclaration(
      name ? j.identifier(name) : null,
      j.classBody([createConstructor(), createRenderMethod(renderBody)])
    );

    cls.superClass = j.template.expression([reactComponent]);

    if (propsType) {
      cls.superTypeParameters = j.tsTypeParameterInstantiation([
        propsType.typeAnnotation,
      ]);
    }

    return cls;
  };

  const replaceWithClass = collection =>
    collection
      .map(path => {
        const grandParent = path.parent.parent;
        const hasOwnName = path.value.id && path.value.id.name;

        if (
          !hasOwnName &&
          j.VariableDeclaration.check(grandParent.value) &&
          grandParent.value.declarations.length === 1
        ) {
          return grandParent;
        }

        return path;
      })
      .replaceWith(path => {
        const isVarDecl = j.VariableDeclaration.check(path.value);
        const fn = isVarDecl ? path.value.declarations[0].init : path.value;

        const name = isVarDecl
          ? path.value.declarations[0].id.name
          : fn.id && fn.id.name;

        const props = fn.params[0];
        const propsType = props && fn.params[0].typeAnnotation;
        const body = createBodyWithReturn(fn.body);

        if (props) {
          delete props.typeAnnotation;
          body.body.unshift(createPropsDecl(props));
        }

        return createClassComponent(name, body, propsType);
      });

  const root = j(file.source, {
    parser: options.parser,
  });

  [
    root.find(j.FunctionDeclaration).filter(canBeReplaced),
    root.find(j.FunctionExpression).filter(canBeReplaced),
    root.find(j.ArrowFunctionExpression).filter(canBeReplaced),
  ].forEach(replaceWithClass);

  return root.toSource(printOptions);
};
