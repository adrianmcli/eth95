import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  TabBody as rTabBody,
} from "react95";

const TabBody = styled(rTabBody)`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ByEtherscan = ({ closeModal }) => {
  return (
    <>
      <TabBody>
        <div style={{ height: "452px" }}>
          <p>
            Unforunately this method is not yet available. You can
            however follow these steps to grab any publicly available ABIs from Etherscan:
          </p>
          <ol>
            <li>
              Go to{" "}
              <a
                href="https://etherscan.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Etherscan
              </a>{" "}
              and find the contract you are interested in.
            </li>
            <li>
              Make sure you are in the Contract view (instead of Token for
              example).
            </li>
            <li>
              Click on the "Contract" tab under the "Contract Overview" box.
            </li>
            <li>Scroll down to the "Contract ABI" section and copy it.</li>
            <li>Come back here, click the ABI tab and paste it in.</li>
          </ol>
        </div>
        <ButtonContainer>
          <Button
            fullWidth
            size="lg"
            style={{ marginTop: "1rem" }}
            onClick={closeModal}
          >
            Close
          </Button>
        </ButtonContainer>
      </TabBody>
    </>
  );
};
export default ByEtherscan;
