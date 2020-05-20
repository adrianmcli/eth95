import React, { useState } from "react";
import styled from "styled-components";
import { Button, TabBody as rTabBody, Cutout } from "react95";
import PremadeListItem from "./PremadeListItem";

const TabBody = styled(rTabBody)`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 16px;
`;

const VendorCutout = styled(Cutout)`
  flex-grow: 1;
  text-align: left;
  background: white;
  overflow: hidden;

  &:before {
    z-index: unset;
    width: 100%;
    height: 100%;
  }
`;

const ContractsCutout = styled(Cutout)`
  flex-grow: 1;
  text-align: left;
  background: white;
  overflow: hidden;

  &:before {
    z-index: unset;
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  overflow-y: auto;
  overflow-x: inherit;
  width: 100%;
  height: 240px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ByPremade = ({ closeModal }) => {
  return (
    <>
      <TabBody>
        <div style={{ height: "452px", paddingRight: "inherit" }}>
          <p>
            Unforunately this method is not yet available. When complete, this
            tab will allow you to add contract ABIs from popular protocols.
          </p>

          <ListsContainer>
            <VendorCutout>
              <Content>
                <PremadeListItem name="Uniswap" />
                <PremadeListItem name="OpenZeppelin" />
                <PremadeListItem name="DappSys" />
                <PremadeListItem name="UMA" />
                <PremadeListItem name="Kyber" />
                <PremadeListItem name="MakerDAO" />
                <PremadeListItem name="Compound" />
                <PremadeListItem name="AAVE" />
                <PremadeListItem name="dYdX" />
                <PremadeListItem name="Curve Finance" />
                <PremadeListItem name="Synthetix" />
                <PremadeListItem name="OpenSea" />
              </Content>
            </VendorCutout>
            <VendorCutout>
              <Content>
                <PremadeListItem name="ERC20" />
                <PremadeListItem name="ERC721" />
              </Content>
            </VendorCutout>
          </ListsContainer>
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
export default ByPremade;
