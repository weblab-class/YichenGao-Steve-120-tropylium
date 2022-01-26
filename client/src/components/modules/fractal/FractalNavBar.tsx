import React, {useState} from "react";
import arrow_back from "../../../images/arrow_back.svg"
import "./FractalNavBar.css";
import { Link } from "@reach/router";

type Props = {
    onSaveClick: () => void
    onDownloadImageClick: () => void
    title: string
    updateTitle: (newTitle: string) => void
}

const FractalNavBar = (props: Props) => {
    return (<div className="fractal-navbar_container">
        <Link to="/create/">
            <div className = "fractal-navbar-back_button" onClick={(event) => props.onSaveClick}>
                <img src={arrow_back}></img>
            </div>
        </Link>
        <input className="fractal-navbar-sidebar_input" 
                type="text" value = {props.title} placeholder="Project Title"
                onChange={(event) => props.updateTitle(event.target.value)}/>
        <div className="fractal-navbar-download_button" onClick={(event) => props.onDownloadImageClick()}>
            Download Image
        </div>
    </div>);
}

export default FractalNavBar;