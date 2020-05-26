import React, { useState } from "react";
import { Button } from "react95";

import { ModalContainer, ModalHeader, ModalContent } from "../common/Modal";
import Input from "../common/Input";

const ProxyCallModal = ({ closeModal }) => {
  return (
    <ModalContainer>
      <ModalHeader onCloseClick={closeModal} label="Submit via Proxy" />
      <ModalContent>
        <Input value="test" />
        <Button>Submit</Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default ProxyCallModal;
