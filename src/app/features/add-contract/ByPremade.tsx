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
                <PremadeListItem idx={0} name="Uniswap" />
                <PremadeListItem idx={0} name="OpenZeppelin" />
                <PremadeListItem idx={0} name="DappSys" />
                <PremadeListItem idx={0} name="UMA" />
                <PremadeListItem idx={0} name="Kyber" />
                <PremadeListItem idx={0} name="MakerDAO" />
                <PremadeListItem idx={0} name="Compound" />
                <PremadeListItem idx={0} name="AAVE" />
                <PremadeListItem idx={0} name="dYdX" />
                <PremadeListItem idx={0} name="Curve Finance" />
                <PremadeListItem idx={0} name="Synthetix" />
                <PremadeListItem idx={0} name="OpenSea" />
              </Content>
            </VendorCutout>
            <VendorCutout>
              <Content>
                <PremadeListItem idx={0} name="ERC20" />
                <PremadeListItem idx={0} name="ERC721" />
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
