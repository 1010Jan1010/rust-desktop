import logo from "./logo.svg";
import "./App.css";
import useSound from "use-sound";
import mySound from "./noti.mp3";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route, Routes, Link, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ServerPage from "./Pages/ServerPage";
import ServerSelectPage from "./Pages/ServerSelectPage";
import Reciever from "./reciever";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {

  // const switchCards = [];
  // switches.forEach(data => {
  //
  //   switchCards.push(
  //     <Grid item sx={{ margin: "10px" }} key={`card-${data.entityId}`}>
  //       <Box>
  //         <Typography variant='h6'>{data.name}</Typography>
  //         <Typography variant='body1'>{`${data.state}`}</Typography>
  //       </Box>
  //     </Grid>
  //   );
  // });
  //
  // const serverCards = [];
  // servers.forEach(data => {
  //   switchCards.push(
  //     <Grid item sx={{ margin: "10px" }} key={data.id}>
  //       <Button>{data.name}</Button>
  //     </Grid>
  //   );
  // });
  //

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Reciever />
      <Router>
        <Routes>
          <Route path='/' element={<ServerSelectPage/>} />
          <Route path='/server' element={<ServerPage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
