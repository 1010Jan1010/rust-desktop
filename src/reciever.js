
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Reciever() {
    const server = useSelector(state => state.serverReducer);
    const dispatch = useDispatch();
    React.useEffect(() => {
        
        window.api.receive("newSwitchAdded", (res) => {
            console.log("server", server);
            //dispatch({
            //    type: "SET_CURRENT_SERVER",
            //    payload: {
            //        ...server,
            //        switches: [...server.switches, res]
//
            //    }
            //})

            
        
        });
    }, []);
    
    return <></>;
}
