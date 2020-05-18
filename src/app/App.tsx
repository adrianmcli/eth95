import React from "react";

// console.log(`ws://${window.location.host}/ws`)
const socket = new WebSocket(`ws://${window.location.host}`);

// Connection opened
socket.addEventListener("open", function (event) {
  socket.send("Connection opened!");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

export default () => (
  <>
    <h1>Welcome to React Parcel Micro App!</h1>
    <p>Hard to get more minimal than this React app.</p>
    <button
      onClick={() =>
        fetch("/api")
          .then((x) => x.json())
          .then(console.log)
      }
    >
      click
    </button>
    <button onClick={() => socket.send("hey there!")}>send msg</button>
  </>
);
