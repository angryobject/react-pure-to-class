import React from 'react';

const MyComponent = class extends React.Component {
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

const MyComponent = class extends React.Component {
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

const MyComponent = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props: p,
    } = this;

    return p.children ? <div>{p.children}</div> : null;
  }
};

export const MyComponent = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props: p,
    } = this;

    return p.children ? <div>{p.children}</div> : null;
  }
};

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

const nonReact = v => v.x + v.y;

const StillReact = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const a = <div>bla-bla</div>;
    return 2 + 2;
  }
};

export const AnotherMyComponent = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props: { items },
    } = this;

    return (
      <ul>
        {items.map(item => <li>{item}</li>)}
      </ul>
    );
  }
}
