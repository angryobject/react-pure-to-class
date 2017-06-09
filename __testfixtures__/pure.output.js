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
