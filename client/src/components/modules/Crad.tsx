import "./Card.css";
import React, { Component } from "react";
import {Link} from "@reach/router";
import { get } from "../../utilities";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            delModalActive: false,
            downModalActive: false,
            likeable: true,
            tempLiked: false,
        }
        this.toggleDelModal = this.toggleDelModal.bind(this);
        this.delete = this.delete.bind(this);
        this.toggleDownModal = this.toggleDownModal.bind(this);
        this.setDownload = this.setDownload.bind(this);
        this.handleLikeable = this.handleLikeable.bind(this);
    }

export Card