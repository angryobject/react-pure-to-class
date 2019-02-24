// @ts-ignore
import * as React from 'react';

interface IProps {
  message: string;
  children: React.Element;
}

type OtherProps = {};

const MyComponent1 = (props: IProps) => {
  return <div>{props.message}</div>;
};

function MyComponent2({
  message = 'foobar',
}: IProps & OtherProps) {
  return <div>{message}</div>;
}

const MyComponent3 = (p: IProps & OtherProps) =>
  p.children ? <div>{p.children}</div> : null;

function MyComponent4(p: IProps) {
  return p.children ? <div>{p.children}</div> : null;
}

const NonReact = v => v.x + v.y;
