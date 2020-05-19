import React from "react";
import Modal from "react-modal";
import "./styles/global.css";

import Contracts from "./containers/Contracts";
import Websockets from "./containers/Websockets";
import Layout from "./features/common/Layout";
import Sidebar from "./features/sidebar/Sidebar";

Modal.setAppElement("#root");

const App = () => (
  <Contracts.Provider>
    <Websockets.Provider>
      <Layout>
        <Sidebar />
        {/* <Divider /> */}
      </Layout>
    </Websockets.Provider>
  </Contracts.Provider>
);

export default App;
