import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fieldset } from "react95";
import Connection from "../../containers/Connection";

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
  return (
    <Container label="Deployed Address">
      <div>Artifact Networks</div>
    </Container>
  );
};

export default AddressInfo;
