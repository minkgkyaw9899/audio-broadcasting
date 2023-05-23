"use client";

import { io } from "socket.io-client";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Button,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function HomePage() {
  const socket = io("http://localhost:8000");

  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("emit_chat_message", (message: string) => {
      console.log(message);
      setMessages((prev) => prev.concat(message));
    });

    return () => {
      socket.off("emit_chat_message");
    };
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value.trim() !== "") {
      console.log(value);
      socket.emit("chat_message", value);
      return setValue("");
    }
  };
  return (
    <Grid
      style={{ flex: 1, minHeight: "100vh", justifyItems: "center" }}
      component={"main"}
      container
      spacing={2}
      paddingY={10}
    >
      <Grid xs={0} md={4}></Grid>
      <Grid xs={10} md={4}>
        <Stack direction={"row"} spacing={10}>
          <TextField
            id="message"
            label="message"
            placeholder="Enter message"
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
        <Stack mt={20}>
          <Paper>
            {messages?.map((message, index) => {
              return (
                <ListItem key={index + 1}>
                  <ListItemText primary={message} />
                </ListItem>
              );
            })}
          </Paper>
        </Stack>
      </Grid>
      <Grid xs={0} md={4}></Grid>
    </Grid>
  );
}
