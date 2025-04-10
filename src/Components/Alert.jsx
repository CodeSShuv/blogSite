import { useContext } from "react"
import React from 'react'
import "./Css/alertBox.css"
import alertContext from "../Context/alertContext"
const Alert = ({status= true}) => {
    const {alert, alertMsg} = useContext(alertContext);
  return (
    <>
    <div className={`alert alert-${status?"success":"danger"} customFeatures`} id={`${!alert?"": "fade"}`} role="alert">
{alertMsg}
</div>

    </>
  )
}

export default Alert