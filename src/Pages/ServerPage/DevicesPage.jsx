import React from 'react'
import { useSelector } from 'react-redux';
import SwitchCard from '../../Components/SwitchCard';
import { Button, Typography } from '@mui/material';

export default function DevicesPage() {
    const server = useSelector(state => state.serverReducer);

    React.useEffect(() => {
        console.log(server.switches);
    }, [server]);
  return (
    <>
    <Button variant="outlined" color="warning" onClick={() => {
        window.api.test('test');
    }}>Test Button</Button>
    Switches
    {(server.switches || []).map((sw, i) => {
        return (
            <SwitchCard key={i} state={true} />
        )
    })}
    </>
  )
}
