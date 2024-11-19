import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Switch } from "@mui/material";

export default function SwitchCard(props) {  
  return (
    <Card sx={{ width: "fit-content", minWidth: "300px", borderRadius: "8px", "backgroundColor": [props.state ? "#1d401e" : ""] }}>
      <Stack direction='row' spacing={3} sx={{
        justifyContent: "center",
        alignItems: "center",
      }}>
       
       <Avatar src="https://cdn.discordapp.com/attachments/1023508311192109178/1036394932585385994/unknown.png" sx={{
            width: "100px",
            height: "100px",
       }}></Avatar>
        <CardContent>
          <Typography sx={{ alignSelf: "center" }} variant='h6'>
            Smart Switch
          </Typography>
  
          <CardActions>
            <ButtonGroup sx={{ marginLeft: "-18px" }} variant='contained' aria-label='outlined primary button group'>
              <Tooltip title='Edit'>
                <IconButton id='edit_button' aria-label='delete' color='primary' >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Preview'>
                <IconButton id='delete_button' aria-label='delete' color='error' >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Switch'>
                <Switch checked={props.state} onClick={()=> {
                    console.log("TOGGLED")
                }}></Switch>
              </Tooltip>
            </ButtonGroup>
          </CardActions>
        </CardContent>
      </Stack>
    </Card>
  );
}
