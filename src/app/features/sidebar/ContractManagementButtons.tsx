import React from "react";
import styled from "styled-components";
import { Button } from "react95";
import Contracts from "../../containers/Contracts";

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 8px;
`;

const SmallButton = styled(Button)`
  padding: 2px 6px;
  font-size: 11px;
  min-width: auto;
  height: 20px;
`;



const ContractManagementButtons = () => {
  const { contracts, selectedIdx, selectedContract, deleteContract } = Contracts.useContainer();

  const handleDelete = () => {
    if (selectedIdx !== null && selectedContract) {
      const confirmDelete = window.confirm(`Are you sure you want to delete "${selectedContract.name}"?`);
      if (confirmDelete) {
        deleteContract(selectedIdx);
      }
    }
  };



  // Only show buttons if there are contracts and one is selected
  if (contracts.length === 0 || selectedIdx === null) {
    return null;
  }

  return (
    <ButtonContainer>
      <SmallButton onClick={handleDelete}>
        Delete
      </SmallButton>
    </ButtonContainer>
  );
};

export default ContractManagementButtons;
