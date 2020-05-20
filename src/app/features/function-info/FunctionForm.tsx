import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fieldset, Cutout } from "react95";

const Container = styled(Fieldset)`
  flex-grow: 1;
  margin-left: 16px;
  margin-top: 20px;
  position: relative;
`;

const FunctionForm = () => {
  return (
    <Container label="Call function">
      <p>Call the actual function</p>
    </Container>
  );
};

export default FunctionForm;
