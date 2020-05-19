import React from "react";
import styled from "styled-components";
import { Button, Window, WindowHeader, WindowContent } from "react95";

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Ex = styled.span`
  font-weight: bold;
  transform: translate(-0.25px, -1px);
`;

export const ModalHeader = ({ onCloseClick, label }) => (
  <Header>
    <span>{label}</span>
    <Button
      style={{ width: "24px", height: "24px" }}
      size={"sm"}
      square
      onClick={onCloseClick}
    >
      <Ex>✕</Ex>
    </Button>
  </Header>
);

export const ModalContent = styled(WindowContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ModalContainer = styled(Window)`
  width: ${(p) => p.width || "720px"};
  display: flex;
  flex-direction: column;
`;
