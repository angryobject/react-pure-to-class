Replaces pure functional react components with class components. Works both for JavaScript and TypeScript.

Select a block of code, choose `React Pure To Class` from the Command Palette.

![Demo](https://raw.githubusercontent.com/angryobject/react-pure-to-class/master/packages/react-pure-to-class-vscode/example.gif)

Turns this:

```javascript
function MyComponent(props) {
  return (
    <div className="my-component">
      {props.children}
    </div>
  );
}
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

    return (
      <div className="my-component">
        {props.children}
      </div>
    );
  }
}
```

It makes some assumptions about functions that can be transformed:

* function should has zero or one argument (i.e. `props`, though the name me be different)
* the argument, if present, should be an identifier (`foo => {..}`) or object pattern(`({ foo }) => {...}`). This means array patterns (`([foo]) => {...}`) and default function parameters (`(foo = defaultFoo) => {...}`) don't work. `props` is always an object and default props are handled differently in React
* the functions should not appear inside other functions, be property of an objects or method of a class

Extension options:

`reactPureToClass.reactComponent` -  string, where to find base react component, defaults to `React.Component`.
