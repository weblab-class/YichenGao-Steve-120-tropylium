import { RouteComponentProps } from "@reach/router";
import React, { Component } from "react";
import Card from "../modules/Crad"
import { get, post } from "../../utilities";
import "./Dashboard.css";
import { Redirect } from "@reach/router";
import mongoose from 'mongoose';

type DashboardProps = RouteComponentProps & {};
// const Dashboard = (props: DashboardProps) => {
//   return (
//     <div className="dashboard-background">
//       <div className="dashboard-text">MY PROJECTS</div>
//       <button className="button">CREATE NEW</button>
//     </div>
//   );
// };
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        images: [],
        height: undefined,
        width: undefined,
        infoActive: false,
        totalLikes: 0,
    }
        this.handleDelete = this.handleDelete.bind(this);
        this.setSize = this.setSize.bind(this);
        this.calculateLikes = this.calculateLikes.bind(this);
  }
  calculateLikes() {
    var i;
    for (i=0;i<this.state.images.length;i++) {
        let newLikes = this.state.totalLikes + this.state.images[i].likedBy.length;
        this.setState({totalLikes:newLikes});
    }
  }

  handleDelete(creator,id) {
    const ObjectId = mongoose.Types.ObjectId;
    get("/api/images/delete",{creator_id:creator,_id:  ObjectId(id)}).then(() => {
    });
    var newArray = this.state.images.filter(function (el) {
        return el._id.toString() !== id;
    });
    this.setState({images:newArray});
    this.props.handleDelete();
  }
  setSize(width,height) {
    this.setState({height:height});
    this.setState({width:width});

  }
  componentDidMount() {
    this.setState({checkedImages:false});
    get("/api/images", { creator_id: this.props.userId}).then((imageObjs) => {
        let reversedImageObjs = imageObjs.reverse();
        reversedImageObjs.map((imageObj) => {
            this.setState({ images: this.state.images.concat([imageObj]) });
        });
        this.setState({checkedImages:true});
        
        this.calculateLikes();
        if (imageObjs.length > 0) {
            this.setState({infoActive:true});
        }
        if (window.screen.height > document.body.scrollHeight) {
            this.canvas.height = window.screen.height;  

        } else {
            this.canvas.height = document.body.scrollHeight;
        }   
            this.canvas.width = window.innerWidth;
            //TODO: change to proper fractal names
    });
    if (window.screen.height > document.body.scrollHeight) {
        this.canvas.height = window.screen.height;  

    } else {
        this.canvas.height = document.body.scrollHeight;
    }   
        this.canvas.width = window.innerWidth;
        this.setHeight(this.canvas.width,this.canvas.height);
        
    
 }



  let imageList = null;
  let infoBox = null;
  const hasImages = this.state.images.length !== 0;
  if (hasImages) {
      imageList = this.state.images.map((imageObj) => (
          <Card className = "Image"
              key={`Card_${imageObj._id}`} //TOASK
              _id={imageObj._id.toString()}
              creator_name={imageObj.creator_name}
              creator_id={imageObj.creator_id}
              content={imageObj.content}
              loadId={imageObj.loadId}
              likedBy={imageObj.likedBy}
              handleClick={this.props.handleClick}
              imageTitle={imageObj.imageTitle}
              componentDidMount={this.componentDidMount}
              render={this.render}
              handleDelete={this.handleDelete}
              hasDelete={true}
              userId={this.props.userId}
              galleryLoaded={true}


              />
      ));

  } else if (this.state.checkedImages){
      imageList = <div className="Text-message">No images in your gallery. Login, create, and save your images to see them here!</div>;
  } else {
      imageList = <div className="Text-message">Loading images...</div>;
  }

  if (this.state.infoActive) {
      infoBox =   <div className="galleryInfo-wrapper">
                      <div className="title-wrapper">
                      <a className="rank-icon" /*{this.props.content}*/ >
                              <span className="Icon-tooltip">Rank: {rankName}</span>
                              <span className="Icon-tooltip-2">Canvases to next rank: {nextRank-this.props.numCreated}</span>
                              <i className="fa fa-graduation-cap"></i>
                          </a>
                      <div className="galleryTitle">{output.toLowerCase()}'s gallery</div>
                      </div>
                      <div className="text-wrapper">
                          <div className="closeInfo" onClick={this.toggleInfoActive}><i className="fa fa-close"></i></div>
                          <div className="galleryInfo">Here you can delete, download, or reload saved canvases!</div>
                          <div className="counterWrapper">
                          <div className="canvasCounter">space: {this.state.images.length}/10</div>
                          <div className="likeCounter">canvases created: {this.props.numCreated}</div>
                          <div className="likeCounter">likes: {this.state.totalLikes}</div>
                          </div>
                      </div>
                  </div>
  }
  
  return (
    <>
          
       <div className="dashboard-background">
          <div className="dashboard-text">MY PROJECTS</div>
          <button className="button">CREATE NEW</button>
       </div>

              <div className="Image-container">
                  {imageList}
                  {infoBox}
              </div>
      </>
    );
  }

 
}

export default Dashboard;
