import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TabComponent from "./TabComponent";

export default function ServerPage() {
  // use server reducer
  const server = useSelector(state => state.serverReducer);
  const navigate = useNavigate();


  // listen for messages from main process
  

  // stop listening if component unmounts

  return (
    <>
      Server
      {JSON.stringify(server)}
      <Button
        onClick={() => {
          window.api.disconnect();
          navigate("/");
        }}>
        Disconnect
      </Button>
      <TabComponent />
    </>
  );
}
