import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";
import SwitchCard from "../Components/SwitchCard";
import { useDispatch, useSelector } from "react-redux";

export default function ServerSelectPage() {
  const navigate = useNavigate();
  const [servers, setServers] = useState({});
  const server = useSelector(state => state.serverReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchServers() {
      window.api.getServers().then(res => {
        setServers(res);
        console.log("res", res);
      });
    }
    fetchServers();
  }, []);

  return (
    <>
      <Typography
        variant='h2'
        sx={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          color: "white",
        }}>
        Servers
      </Typography>

      {Object.keys(servers).map(serverId => {
        return (
          <Button
            variant='outlined'
            key={serverId}
            onClick={async () => {
              const res = await window.api.setupConnection(serverId);
            

              dispatch({
                type: "SET_CURRENT_SERVER",
                payload: res,
              });
              navigate(`/server`);
            }}>
            {servers[serverId].name}
          </Button>
        );
      })}
    </>
  );
}
