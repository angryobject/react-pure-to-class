// @ts-ignore
import * as React from 'react';

interface IProps {
  message: string;
  children: React.Element;
}

type OtherProps = {};

class MyComponent1 extends React.Component<IProps> {
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

class MyComponent2 extends React.Component<IProps & OtherProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      message = 'foobar',
    } = this.props;

    return <div>{message}</div>;
  }
}

class MyComponent3 extends React.Component<IProps & OtherProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const p = this.props;
    return p.children ? <div>{p.children}</div> : null;
  }
}

class MyComponent4 extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const p = this.props;
    return p.children ? <div>{p.children}</div> : null;
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
