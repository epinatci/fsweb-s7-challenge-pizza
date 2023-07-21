import React from 'react';
import { useHistory } from "react-router-dom";

const Redirect = () =>{

    const history= useHistory();

    setTimeout(()=>{history.push("/orderform")}, 10000);
  
    return (
        <div style={{ backgroundPosition:"center", backgroundSize:"cover", height:"100vh", backgroundColor:"#CE2829", fontFamily:"Satisfy" }}>
        <h1 style={{ width:"60%", margin: "auto", padding:"20%", color:"white" }}>Sipariş Sayfasına Yönlendiriliyorsunuz...</h1>
        </div>
    )
}
export default Redirect