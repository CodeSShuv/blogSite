import React, { useState } from 'react'
import alertContext from "../alertContext.jsx"


const AlertState = (props) => {
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertColorStatus , setAlertColorStatus] = useState(true);
  const showAlert=(msg, status )=>{
    setAlertColorStatus(status);
    setAlert(true);
    setAlertMsg(msg);
    setTimeout(()=>{
      setAlert(false);
      setAlertMsg("");
    }, 2000);
  }
  return (
    <alertContext.Provider value ={{alert, setAlert,showAlert, alertMsg, setAlertMsg, alertColorStatus}}>
      {props.children}
      
    </alertContext.Provider>
  )
}

export default AlertState;