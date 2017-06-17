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
