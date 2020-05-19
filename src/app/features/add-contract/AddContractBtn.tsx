import React, { useState } from "react";
import styled from "styled-components"
import Modal from "react-modal";
import { Button } from "react95";

import AddContractModal from "./AddContractModal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "none",
    borderRadius: "0",
    padding: "0",
  },
};

const Container = styled.div`
  width: calc(100% - 4px);
  position: absolute;
  bottom: 0;
`

const AddContractBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Container>
      <Button onClick={openModal} fullWidth>
        Add Contract
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick
      >
        <AddContractModal closeModal={closeModal} />
      </Modal>
    </Container>
  );
};

export default AddContractBtn;
