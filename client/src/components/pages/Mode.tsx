import React, { MouseEventHandler, useState } from "react";
import "./Mode.css";
import { RouteComponentProps } from "@reach/router";
import Button from "@mui/material/Button";
import { Link } from "@reach/router";

type ModeProps = RouteComponentProps;

const Mode = (props: ModeProps) => {
    return (
        <div className="mode-background">
             <h3 className="mode-text">CHOOSE THE RIGHT MODE FOR YOU.</h3>

             <div className="split left">
                <div className="centered">
                <Link to="/create/simple_fractal_creator/" className="Dashboard-linkText">
                    <Button variant="contained" size="large">
                         SIMPLE FRACTAL CREATOR
                    </Button>
                 </Link>
                     <h2>Follow 5 simple steps to create fractals</h2>
                </div>
            </div>
            <div className="split right">
                <div className="centered">
                    <Link to="/create/advanced_fractal_creator/" className="Dashboard-linkText">
                        <button className="button">ADVANCED FRACTAL CREATOR</button>
                    </Link>
                        <h2>Build Fractals usring more adavanced features</h2>
                </div>
            </div>
        </div>
        
    );
};

export default Mode;
