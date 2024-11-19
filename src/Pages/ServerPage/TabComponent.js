import React from "react";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import DevicesPage from "./DevicesPage";

export default function TabComponent(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


  return (
    <>
      <Tabs value={value} centered onChange={handleChange} aria-label='basic tabs example'>
        <Tab label='Switches and Alarms' />
        <Tab label='Hotkeys' />
        <Tab label='Item Three' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DevicesPage/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Hotkeys
      </TabPanel>
      <TabPanel value={value} index={2}>
        Map
      </TabPanel>
    </>
  );
}
