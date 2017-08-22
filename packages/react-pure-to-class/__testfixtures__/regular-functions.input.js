import React from 'react';

function MyComponent(props) {
  return <div>{props.message}</div>;
};

module.exports = function MyComponent(props) {
  return <div>{props.message}</div>;
};

export default function MyComponent(props) {
  return <div>{props.message}</div>;
};

function MyComponent() {
  return <div>bla-bla</div>;
}

function MyComponent(p) {
  return p.children ? <div>{children}</div> : null;
}

const MyComponent = function() {
  return <div>bla-bla</div>;
}

function nonReact(v) {
  return v.x + v.y;
}

function StillReact() {
  const a = <div>bla-bla</div>;
  return 2 + 2;
}
