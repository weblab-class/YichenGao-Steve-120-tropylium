import "./Card.css";
import React, { Component } from "react";
import {Link} from "@reach/router";
import { get } from "../../utilities";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '', //TODO
            likeable: true,
            tempLiked: false,
        }
        this.delete = this.delete.bind(this);
        this.download = this.download.bind(this);
        this.handleLikeable = this.handleLikeable.bind(this);
    }

    handleLikeable(id) {
        if (this.props.userId == undefined) {
            window.alert('Please log in first!');
            return;
        } else {
            this.setState({tempLiked:true});
            this.props.handleLike(id);
        }
        
    }

    download() {
        this.imgFile.setAttribute('href', this.props.content);
    }

    delete() {
        this.props.handleDelete(this.props.creator_id,this.props._id);
    }

    render () {

        let deleteButton = null;
        if (this.props.hasDelete) {
            deleteButton =  <div className="Icon-wrapper" onClick={this.toggleDelModal}>    
                                <span className="Icon-tooltip">Delete</span>
                                <i className="fa fa-trash"></i>
                            </div>
        }
        let likeButton = null;

        if (this.props.galleryLoaded) {
            likeButton = <a className="Like-wrapper-gallery">
                            <span className="helper2"><i className="fa fa-heart"></i></span>
                            {this.props.likedBy.length}
                         </a>
        } else if (this.state.likeable && this.state.tempLiked) {
            likeButton = <a className="Like-wrapper-off">
                            <span className="helper2"><i className="fa fa-heart"></i></span>
                            {this.props.likedBy.length+1}
                         </a>
        } else if (!this.props.likedBy.includes(this.props.userId) || this.props.userId == undefined) {
            likeButton = <a className="Like-wrapper" onClick={() => handleLikeable(this.props._id)}>
                            <span className="helper"><i className="fa fa-heart-o"></i></span>
                            <span className="helper2"><i className="fa fa-heart"></i></span>
                            {this.props.likedBy.length}
                         </a>
        } else {
            likeButton = <a className="Like-wrapper-off">
                            <span className="helper2"><i className="fa fa-heart"></i></span>
                            {this.props.likedBy.length}
                         </a>
        }
    
        let creatorBox = null;
        if (!this.props.galleryLoaded) {
            creatorBox =    <div className="Creator-info">
                                <div className="Creator-name">created by: {this.props.shortName}</div>
                                <div className="Creator-stats">canvases created: {this.props.fractalTotal}</div>
                            </div>
        }
        
        const { handleClick,handleDelete,handleLike } = this.props;
        const { handleLikeable} = this;
        return (
            <div>
                <div className={this.state.delModalActive ? "Card-Canvas-modal" : "Card-Canvas-modal-hidden"} ref={modal => this.modal = modal}>
                        <div className="Card-Modal-content">
                            Are you sure?
                            <button className="halfButton-Card" style={{margin:'5px'}} onClick={this.delete}>delete</button>
                            <button className="halfButton-Card" onClick={this.toggleDelModal}>cancel</button>

                        </div>
                    </div>

                    <div className={this.state.downModalActive ? "Card-Canvas-modal" : "Card-Canvas-modal-hidden"} ref={modal => this.modal = modal}>
                        <div className="Card-Modal-content">
                            Are you sure?
                            <a className="halfButton-Card" style={{margin:'5px',textDecoration:'none'}} onClick={this.toggleDownModal} href='#' ref={imgFile => this.imgFile = imgFile} download={this.props.imageTitle + '.png'}>download</a>
                            <button className="halfButton-Card" onClick={this.toggleDownModal}>cancel</button>

                        </div>
                    </div>

                <div className="Card-container">
                    <div className="Info-box">
                        <div className="Creator-wrapper">
                            {likeButton}
                            {creatorBox}
                            
                        </div>
                        {/* <div className="Delete" onClick={this.handleDelete}>Delete Image</div> */}
                        <div className="Gallery-bar">
                            <div className="Icon-list">
                                {/* <div className="Icon-wrapper" onClick={() => handleDelete(this.props.creator_id,this.props._id)}> */}
                                {deleteButton}
                                <a className="Icon-wrapper" onClick={this.setDownload} /*{this.props.content}*/ >
                                    <span className="Icon-tooltip">Download</span>
                                    <i className="fa fa-download"></i>
                                </a>
                                <Link to='/create' onClick={() => handleClick(this.props._id)}>
                                <div className="Icon-wrapper">
                                    <span className="Icon-tooltip">Load Session</span>
                                    <i className="fa fa-edit"></i>
                                </div>
                                </Link>
                            </div>
                            
                        </div>
                        <div className="Gallery-title">{this.props.fractalTitle}</div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Card;