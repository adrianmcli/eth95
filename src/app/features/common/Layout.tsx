import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { themes, Window, WindowHeader, WindowContent } from "react95";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const Container = styled(Window)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled(WindowContent)`
  flex-grow: 1;
  display: flex;
  overflow: auto;
`;

const appTheme = {
  ...themes.default,
};

const Layout = ({ children }) => (
  <>
    <ThemeProvider theme={appTheme}>
      <AppContainer>
        <Container shadow={false}>
          <WindowHeader>Eth95.exe</WindowHeader>
          <Content>{children}</Content>
        </Container>
      </AppContainer>
    </ThemeProvider>
  </>
);

export default Layout;
