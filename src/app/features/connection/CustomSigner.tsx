import React, { useState } from "react";
import styled from "styled-components";
import { Select, Fieldset, Button, TextField } from "react95";
import Connection from "../../containers/Connection";
import Input from "../common/Input";

const CustomSigner = () => {
  const [text, setText] = useState("");
  const {
    attemptSetCustomSigner,
    resetCustomSigner,
  } = Connection.useContainer();

  return (
    <Fieldset label="Custom Signer (optional)" style={{ marginBottom: "12px" }}>
      <p>Private Key / Mnemonic:</p>
      <Input
        style={{ fontSize: `12px` }}
        value={text}
        placeholder="turkey snow danger yearly kale..."
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        fullWidth
        style={{ marginTop: "12px" }}
        onClick={() => {
          attemptSetCustomSigner(text);
        }}
      >
        Connect
      </Button>
    </Fieldset>
  );
};

export default CustomSigner;
