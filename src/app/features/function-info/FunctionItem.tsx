import React from "react";
import styled from "styled-components";

interface IItemProps {
  isActive: boolean;
}

const Item = styled.div`
  height: 24px;
  color: ${(p: IItemProps) => (p.isActive ? "white" : "unset")};
  background: ${(p: IItemProps) => (p.isActive ? "#050289" : "unset")};
  border: ${(p: IItemProps) => (p.isActive ? "1px dotted" : "unset")};
  cursor: default;
  padding: 2px 4px;
`;

interface IProps {
  fn: any;
  isActive: boolean;
  onClick: () => {};
}

const FunctionItem = ({ fn, isActive, onClick }: IProps) => {
  const arity = fn.inputs?.length || 0;
  const label = `${fn.name}(${arity})`;
  return (
    <Item
      isActive={isActive}
      onClick={onClick}
      className="function-list-item"
      title={label}
    >
      {label}
    </Item>
  );
};

export default FunctionItem;
