import React from "react";
import Modal from "react-modal";
import "./styles/global.css";

import Signers from "./containers/Signers";
import Address from "./containers/Address";
import Contracts from "./containers/Contracts";
import Websockets from "./containers/Websockets";
import Connection from "./containers/Connection";
import Layout from "./features/common/Layout";
import Sidebar from "./features/sidebar/Sidebar";
import Main from "./features/main/Main";
import Network from "./containers/Network";
import ContractAddress from "./containers/ContractAddress";

Modal.setAppElement("#root");

const App = () => (
  <Contracts.Provider>
    <Websockets.Provider>
      <Connection.Provider>
        <Signers.Provider>
          <Network.Provider>
            <Address.Provider>
              <ContractAddress.Provider>
                <Layout>
                  <Sidebar />
                  <Main />
                </Layout>
              </ContractAddress.Provider>
            </Address.Provider>
          </Network.Provider>
        </Signers.Provider>
      </Connection.Provider>
    </Websockets.Provider>
  </Contracts.Provider>
);

export default App;
