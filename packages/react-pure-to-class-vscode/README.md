Replaces pure react components with class components.

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
