import React from 'react';

const MyComponent = props => {
  return <div>{props.message}</div>;
};

const MyComponent = (props) => <div>{props.message}</div>;

const MyComponent = p => p.children ? <div>{p.children}</div> : null;

export const MyComponent = p => p.children ? <div>{p.children}</div> : null;

module.exports = (props) => {
  return <div>{props.message}</div>;
};

export default props => {
  return <div>{props.message}</div>;
};

const nonReact = v => v.x + v.y;

const StillReact = () => {
  const a = <div>bla-bla</div>;
  return 2 + 2;
};

export const AnotherMyComponent = ({ items }) => (<ul>
  {items.map(item => <li>{item}</li>)}
</ul>)
