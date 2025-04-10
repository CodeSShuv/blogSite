import React, { createContext } from "react";


const alertContext = createContext({
    alert: false,
    setAlert: () => {},
    showAlert: () => {}, // Make sure this exists
    alertMsg: '',
    setAlertMsg: () => {},
    alertColorStatus: false, // I notice you use this in your Alert component
    setAlertColorStatus: () => {}
});
export default alertContext;
