import { RouteComponentProps } from "@reach/router";
// import React, { Component } from "react";
import React, { MouseEventHandler, useState } from "react";
// import Card from "../modules/Card"
import { get, post } from "../../utilities";
import "./Dashboard.css";
import { Redirect } from "@reach/router";
import mongoose from 'mongoose';
import { Link } from "@reach/router";


type DashboardProps = RouteComponentProps & {
    userId: String;
};
const Dashboard = (props: DashboardProps) => {
  return (
    <div className="dashboard-background">
      <div className="dashboard-text">MY PROJECTS</div>
        <Link to="/fractal_creator">
            <button className="button">CREATE NEW</button>
        </Link>
//     </div>
  );
};
// class Dashboard extends Component {
//   constructor(props: DashboardProps) {
//     super(props);
//     this.state = {
//         images: [],
//         infoActive: false,
//         totalLikes: 0,
//         //TODO: add more fractal properties here!
//     }
//         this.handleDelete = this.handleDelete.bind(this);
//         this.calculateLikes = this.calculateLikes.bind(this);
//   }
//   calculateLikes() {
//     var i;
//     for (i=0;i<this.state.images.length;i++) {
//         let newLikes = this.state.totalLikes + this.state.images[i].likedBy.length;
//         this.setState({totalLikes:newLikes});
//     }
//   }

//   handleDelete(creator,id) {
//     const ObjectId = mongoose.Types.ObjectId;
//     get("/api/images/delete",{creator_id:creator,_id:  ObjectId(id)}).then(() => {
//     });
//     var newArray = this.state.images.filter(function (el) {
//         return el._id.toString() !== id;
//     });
//     this.setState({images:newArray});
//     this.props.handleDelete();
//   }
  
//   componentDidMount() {
//     this.setState({checkedImages:false});
//     get("/api/images", { creator_id: this.props.userId}).then((imageObjs) => {
//         let reversedImageObjs = imageObjs.reverse();
//         reversedImageObjs.map((imageObj) => {
//             this.setState({ images: this.state.images.concat([imageObj]) });
//         });
//         this.setState({checkedImages:true});
        
//         this.calculateLikes();
//             //TODO: change to fractal properties
//     });
    
        
//   }

//   render() {
//     let imageList = null;
//     let infoBox = null;
//     const hasImages = this.state.images.length !== 0;
//     if (hasImages) {
//         imageList = this.state.images.map((imageObj) => (
//             <Card className = "Image"
//                 key={`Card_${imageObj._id}`} //TOASK
//                 _id={imageObj._id.toString()}
//                 creator_name={imageObj.creator_name}
//                 creator_id={imageObj.creator_id}
//                 content={imageObj.content}
//                 loadId={imageObj.loadId}
//                 likedBy={imageObj.likedBy}
//                 handleClick={this.props.handleClick}
//                 imageTitle={imageObj.imageTitle}
//                 componentDidMount={this.componentDidMount}
//                 render={this.render}
//                 handleDelete={this.handleDelete}
//                 hasDelete={true}
//                 userId={this.props.userId}
//                 galleryLoaded={true}


//                 />
//         ));

//     } else if (this.state.checkedImages){
//         imageList = <div className="Text-message">No fractal is saved. Click the button and create one right now!</div>;
//     } else {
//         imageList = <div className="Text-message">Loading fractal...</div>;
//     }

//     if (this.state.infoActive) {
//         infoBox =   <div className="galleryInfo-wrapper">
//                         <div className="title-wrapper">
//                         <div className="galleryTitle">{userID.toLowerCase()}'s gallery</div>
//                         </div>
//                         <div className="text-wrapper">
//                             <div className="closeInfo" onClick={this.toggleInfoActive}><i className="fa fa-close"></i></div>
//                             <div className="galleryInfo">Delete, download, or reload saved fractal in your dashboard!</div>
//                             <div className="counterWrapper">
//                             <div className="canvasCounter">space: {this.state.images.length}/10</div>
//                             <div className="likeCounter"># fractal created: {this.props.numCreated}</div>
//                             <div className="likeCounter">likes: {this.state.totalLikes}</div>
//                             </div>
//                         </div>
//                     </div>
//     }
  
//   return (
//     <>
          
//        <div className="dashboard-background">
//           <div className="dashboard-text">MY PROJECTS</div>
//           <button className="button">CREATE NEW</button>
//        </div>

//               <div className="Image-container">
//                   {imageList}
//                   {infoBox}
//               </div>
//       </>
//     );
// }

// }


export default Dashboard;
