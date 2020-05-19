import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  reset,
  themes,
  List,
  ListItem,
  Divider,
  AppBar,
  Toolbar,
  Button,
  TextField,
  Cutout,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";

const socket = new WebSocket(`ws://${window.location.host}`);
// Connection opened
socket.addEventListener("open", function (event) {
  socket.send("Connection opened!");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function Menu() {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {open && (
        <List
          horizontalAlign="left"
          verticalAlign="bottom"
          open={open}
          onClick={handleClose}
        >
          <ListItem>👨‍💻 Profile</ListItem>
          <ListItem>📁 My account</ListItem>
          <Divider />
          <ListItem disabled>🔙 Logout</ListItem>
        </List>
      )}
      <Button
        onClick={handleClick}
        active={open}
        style={{ fontWeight: "bold" }}
      >
        Start
      </Button>
    </div>
  );
}

const App = () => (
  <div style={{ height: "100vh"}}>
    <ResetStyles />
    <ThemeProvider theme={themes.default}>
      {/* <AppBar>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Menu />
          <TextField
            placeholder="Search..."
            width={150}
            style={{ marginLeft: 4 }}
          />
        </Toolbar>
      </AppBar> */}
      {/* <List>
        <ListItem>🎤 Sing</ListItem>
        <ListItem>💃🏻 Dance</ListItem>
        <Divider />
        <ListItem disabled>😴 Sleep</ListItem>
      </List> */}
      <Window style={{ width: "100%", height: "100%" }}>
        <WindowHeader
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>EthPilot.exe</span>
          <Button
            style={{ marginRight: "-6px", marginTop: "1px" }}
            size={"sm"}
            square
          >
            <span style={{ fontWeight: "bold", transform: "translateY(-1px)" }}>
              x
            </span>
          </Button>
        </WindowHeader>
        <Toolbar>
          <Button variant="menu" size="sm">
            File
          </Button>
          <Button variant="menu" size="sm">
            Edit
          </Button>
          <Button variant="menu" size="sm" disabled>
            Save
          </Button>
        </Toolbar>
        <WindowContent style={{}}>
          <Cutout style={{ margin: "auto", background: "white", height: "100%" }}>
            <h1
              style={{
                fontFamily: "times new roman",
                textAlign: "center",
                fontSize: "3rem",
                marginTop: "0.5rem",
              }}
            >
              React95
            </h1>
          </Cutout>
        </WindowContent>
      </Window>
    </ThemeProvider>
  </div>
);

export default App;
