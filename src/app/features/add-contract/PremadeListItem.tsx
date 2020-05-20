import React from "react";
import styled from "styled-components";
import Contracts from "../../containers/Contracts";

interface IProps {
  isActive: boolean;
}

const Item = styled.div`
  height: 24px;
  color: ${(p: IProps) => (p.isActive ? "white" : "unset")};
  background: ${(p: IProps) => (p.isActive ? "#050289" : "unset")};
  border: ${(p: IProps) => (p.isActive ? "1px dotted" : "unset")};
  cursor: default;
  padding: 2px 4px;
`;

const PremadeListItem = ({ name, idx }) => {
  // const { setSelectedIdx, selectedIdx } = Contracts.useContainer();
  // const isActive = selectedIdx === idx;
  const isActive = false;
  const handleClick = () => {
    // setSelectedIdx(isActive ? null : idx);
  };

  return (
    <Item isActive={isActive} onClick={handleClick}>
      {name}
    </Item>
  );
};

export default PremadeListItem;
