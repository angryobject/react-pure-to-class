A `jscodeshift` transformer to create react class component from pure functional component. Works both for JavaScript and TypeScript.

Turns this:

```javascript
function MyComponent(props) {
  return <div>{props.message}</div>;
};
```

into this:

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props,
    } = this;

    return <div>{props.message}</div>;
  }
}
```

It makes some assumptions about functions that can be transformed:

* function should has zero or one argument (i.e. `props`, though the name me be different)
* the argument, if present, should be an identifier (`foo => {..}`) or object pattern(`({ foo }) => {...}`). This means array patterns (`([foo]) => {...}`) and default function parameters (`(foo = defaultFoo) => {...}`) don't work. `props` is always an object and default props are handled differently in React
* the functions should not appear inside other functions, be property of an objects or method of a class

See [jscodeshift](https://github.com/facebook/jscodeshift) for more info on transformations.

Basic manual usage in node (you probably don't need it):

```javascript
const jscodeshift = require('jscodeshift');
const pureToClass = require('react-pure-to-class');

const options = {
  reactComponent: 'React.Component',
  printOptions: {
    quote: 'single',
    trailingComma: true,
  },
};

const source = ''; // your source code here;

const transformedSource = pureToClass(
  { source },
  { jscodeshift },
  options // or empty object for defaults
);
```

It also works as a cli, which may be useful in vim to transform selected code, like so:

```
:'<,'>!react-pure-to-class
```

