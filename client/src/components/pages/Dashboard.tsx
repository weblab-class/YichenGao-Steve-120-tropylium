import { RouteComponentProps } from "@reach/router";
import React, { Component } from "react";

import "./Dashboard.css";

type DashboardProps = RouteComponentProps & {};
const Dashboard = (props: DashboardProps) => {
  return (
    <div className="dashboard-background">
      <div className="dashboard-text">MY PROJECTS</div>
      <button className="button">CREATE NEW</button>
    </div>
  );
};

// class Gallery extends Component {
//     let imageList = null;
//         let infoBox = null;
//         const hasImages = this.state.images.length !== 0;
//         if (hasImages) {
//             imageList = this.state.images.map((imageObj) => (
//                 <Card className = "Image"
//                     key={`Card_${imageObj._id}`}
//                     _id={imageObj._id.toString()}
//                     creator_name={imageObj.creator_name}
//                     creator_id={imageObj.creator_id}
//                     content={imageObj.content}
//                     loadId={imageObj.loadId}
//                     likedBy={imageObj.likedBy}
//                     handleClick={this.props.handleClick}
//                     imageTitle={imageObj.imageTitle}
//                     componentDidMount={this.componentDidMount}
//                     render={this.render}
//                     handleDelete={this.handleDelete}
//                     hasDelete={true}
//                     userId={this.props.userId}
//                     galleryLoaded={true}
//                     shortName = {output}

//                     />
//             ));

//         } else if (this.state.checkedImages){
//             imageList = <div className="Text-message">No images in your gallery. Login, create, and save your images to see them here!</div>;
//         } else {
//             imageList = <div className="Text-message">Loading images...</div>;
//         }

//         if (this.state.infoActive) {
//             infoBox =   <div className="galleryInfo-wrapper">
//                             <div className="title-wrapper">
//                             <a className="rank-icon" /*{this.props.content}*/ >
//                                     <span className="Icon-tooltip">Rank: {rankName}</span>
//                                     <span className="Icon-tooltip-2">Canvases to next rank: {nextRank-this.props.numCreated}</span>
//                                     <i className="fa fa-graduation-cap"></i>
//                                 </a>
//                             <div className="galleryTitle">{output.toLowerCase()}'s gallery</div>
//                             </div>
//                             <div className="text-wrapper">
//                                 <div className="closeInfo" onClick={this.toggleInfoActive}><i className="fa fa-close"></i></div>
//                                 <div className="galleryInfo">Here you can delete, download, or reload saved canvases!</div>
//                                 <div className="counterWrapper">
//                                 <div className="canvasCounter">space: {this.state.images.length}/10</div>
//                                 <div className="likeCounter">canvases created: {this.props.numCreated}</div>
//                                 <div className="likeCounter">likes: {this.state.totalLikes}</div>
//                                 </div>
//                             </div>
//                         </div>
//         }
// }

export default Dashboard;
