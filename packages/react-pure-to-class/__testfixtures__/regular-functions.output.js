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
    const {
      props: p,
    } = this;

    return p.children ? <div>{children}</div> : null;
  }
}

const MyComponent = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>bla-bla</div>;
  }
}

function nonReact(v) {
  return v.x + v.y;
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
    const {
      props: { items },
    } = this;

    return (<ul>
      {items.map(item => <li>{item}</li>)}
    </ul>);
  }
}
