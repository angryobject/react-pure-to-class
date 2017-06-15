A `jscodeshift` transformer to create react class component from pure (functional) component.

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
