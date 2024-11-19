import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import CreateHotkeyModal from "../Components/CreateHotkeyModal";
import { addHotkey } from "../Components/CreateHotkeyModal";
import { useSelector, useDispatch } from "react-redux";

export default function HotkeyPage(props) {
  function createData(hotkey, action, switches) {
    return { hotkey, action, switches };
  }

  const currentServerReducer = useSelector(state => state.currentServerReducer);
  const dispatch = useDispatch();

  const rows = []

  Object.keys(currentServerReducer.hotkeys || {}).forEach(key => {
    const hotkey = currentServerReducer.hotkeys[key];
    let hotkeySwitches = ""
    hotkey.switches.forEach(switchId => {
      hotkeySwitches += currentServerReducer.switches[switchId] ?  currentServerReducer.switches[switchId].name + ", " : "Not Found" + ", " 
    })
    rows.push(
      createData(key, hotkey.action, hotkeySwitches.slice(0, -2))
    )
  })
  

  return (
    <>
      <CreateHotkeyModal />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Hotkeys</TableCell>
              <TableCell align='right'>Actions</TableCell>
              <TableCell align='right'>Switches</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.hotkey} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row' align='left'>
                  {row.hotkey}
                </TableCell>
                <TableCell align='right'>{row.action}</TableCell>
                <TableCell align='right'>{row.switches}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={() => {
        addHotkey()
      }}>Add Hotkey</Button>

      
    </>
  );
}


/*

*/