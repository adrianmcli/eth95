import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fieldset } from "react95";
import Connection from "../../containers/Connection";
import Select from "../common/Select";

const Container = styled(Fieldset)`
  display: flex;
  height: 100%;
  width: 300px;
`;

const AddressInfo = ({ contract }) => {
  // const { provider } = Connection.useContainer();
  // const [selectedIdx, setSelectedIdx] = useState(null);
  // const fns = contract.abi.filter((x) => x.type === "function");
  // const selectedFn = fns[selectedIdx];

  // useEffect(() => {
  //   setSelectedIdx(null);
  // }, [contract]);
  console.log(contract.artifact.networks);
  if (
    !contract.artifact ||
    !contract.artifact.networks ||
    Object.keys(contract.artifact.networks).length === 0
  ) {
    return (
      <Container label="Deployed Address">
        No networks found for this contract from the artifact
      </Container>
    );
  }
  Object.entries(contract.artifact.networks);
  return (
    <Container label="Deployed Address">
      <div>Artifact Networks</div>
      <Select native />
    </Container>
  );
};

export default AddressInfo;
