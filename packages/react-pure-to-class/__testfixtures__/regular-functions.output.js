import React from 'react';

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

module.exports = class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props,
    } = this;

    return <div>{props.message}</div>;
  }
};

export default class MyComponent extends React.Component {
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

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>bla-bla</div>;
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const p = this.props;
    return p.children ? <div>{children}</div> : null;
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>bla-bla</div>;
  }
}

const MyComponent = class MyFunction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>bla-bla</div>;
  }
}

class NonReact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const v = this.props;
    return v.x + v.y;
  }
}

class StillReact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const a = <div>bla-bla</div>;
    return 2 + 2;
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;
    return (<ul>
      {items.map(item => <li>{item}</li>)}
    </ul>);
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;
    const lis = items.map(item => <li>{item}</li>);

    return (<ul>{lis}</ul>);
  }
}
