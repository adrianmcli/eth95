import React from "react";
import styled from "styled-components";
import Contracts from "../../containers/Contracts";

const Item = styled.div`
  height: 24px;
  color: ${(p) => (p.isActive ? "white" : "unset")};
  background: ${(p) => (p.isActive ? "#050289" : "unset")};
  border: ${(p) => (p.isActive ? "1px dotted" : "unset")};
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
