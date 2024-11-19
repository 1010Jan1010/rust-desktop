import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Box, Stack } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput } from "@mui/material";


let open, setOpen;
let hotkey, setHotkey;
let selectedSwitches, setSelectedSwitches;
let action, setAction


export async function addHotkey() {
  setHotkey("");
  setSelectedSwitches([]);
  setOpen(true);
}

export default function AddHotkeyModal() {
  [open, setOpen] = useState(false);
  [action, setAction] = useState("toggle");
  [hotkey, setHotkey] = useState("");

  const currentServer = useSelector(state => state.currentServerReducer);
  const dispatch = useDispatch();  



  [selectedSwitches, setSelectedSwitches] = useState([]);

  
  const handleClose = async () => {
    setOpen(false);
    console.log("hotkey", hotkey);
    console.log("selectedSwitches", selectedSwitches);
    console.log("action", action);

    await dispatch({
      type: "SET_CURRENT_SERVER",
      payload: {
        ...currentServer,
        hotkeys: {
          ...currentServer.hotkeys,
          [hotkey]: {
            switches: selectedSwitches,
            action: action,
          },
        },
      },
    });

    await window.api.reloadHotkeys(currentServer.id);
    
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <DialogTitle>Add a Hotkey</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{mb: 1}}>Add a hotkey to control your Smart Switches</DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='hotkey'
          label='Hotkey'
          placeholder='e.g Ctrl+M or Alt+Shift+1 (no spaces)'
          type='text'
          fullWidth
          variant='outlined'
          onChange={e => {
            setHotkey(e.target.value);
          }}
        ></TextField>

        <Divider sx={{ mt: 1, mb: 1.5, minWidth: { sx: "100", sm: "400px" } }}></Divider>
        <FormControl fullWidth sx={{  }}>
          <InputLabel id='demo-multiple-chip-label'>Switches</InputLabel>
          <Select
            labelId='demo-multiple-chip-label'
            id='demo-multiple-chip'
            multiple
            value={selectedSwitches}
            onChange={e => {
              const value = e.target.value;
              console.log(typeof value === "string" ? value.split(",") : value);
              setSelectedSwitches(typeof value === "string" ? value.split(",") : value);
            }}
            input={<OutlinedInput id='demo-multiple-chip' label='Switches' />}
            renderValue={selected => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {Object.keys(selectedSwitches).map(value => (
                  <Chip key={value} label={currentServer.switches[selectedSwitches[value]].name} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {Object.keys(currentServer.switches).map(value => (
              <MenuItem key={value} value={value}>
                <Checkbox checked={selectedSwitches.indexOf(value) > -1} />
                <ListItemText primary={currentServer.switches[value].name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{mt: 2}}>
          <InputLabel id='demo-simple-select-label'>Action</InputLabel>
          <Select labelId='demo-simple-select-label' id='demo-simple-select' value={action} label='Action' onChange={(e) => {
            setAction(e.target.value);
          }}>
            <MenuItem value={"toggle"}>Toggle</MenuItem>
            <MenuItem value={"turnOn"}>Turn On</MenuItem>
            <MenuItem value={"turnOff"}>Turn Off</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          variant='contained'
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
