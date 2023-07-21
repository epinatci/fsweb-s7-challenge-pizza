import { Button } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";



const HomePage = () => {

    return (

        <div className="home-page">

            <div className="ty-logo">
            <img src="/logo.svg" alt="Teknolojik Yemekler logo" />
            </div>
            

            <p>KOD ACIKTIRIR <br/> 
                PIZZA, DOYURUR</p>

            <br />

            <Link to="/orderform" >

                <Button 
                data-cy="mainpage"
                id="order-pizza" 
                color="warning" 
                className="rounded-pill"
                size="lg"
                > 

                ACIKTIM

                </Button>

            </Link>    

        </div>
    )
};

export default HomePage;