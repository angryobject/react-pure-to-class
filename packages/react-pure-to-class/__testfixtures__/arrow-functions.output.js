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

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const p = this.props;
    return p.children ? <div>{p.children}</div> : null;
  }
}

export class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const p = this.props;
    return p.children ? <div>{p.children}</div> : null;
  }
}

module.exports = class extends React.Component {
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

export default class extends React.Component {
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

export class AnotherMyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;

    return (
      <ul>
        {items.map(item => <li>{item}</li>)}
      </ul>
    );
  }
}
