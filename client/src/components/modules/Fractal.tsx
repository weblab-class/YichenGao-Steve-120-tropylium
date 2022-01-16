import React, { Component } from "react";
import "./Canvas.css";
import { unstable_batchedUpdates } from "react-dom";
import { post,get } from "../../utilities";


class Fractal extends Component {
    constructor(props) {
      super(props);
      // Two state properties, isActive stores info on which brush is active. brushSize controls the pixel size of the brush
      this.state = {
          
          images: [],
          loadIndex: 0,
          loadId: 0,
          imageToLoad: undefined,
          imageTitle: '',
          titleGiven: false,
          newSession: true,
          height:0,
          width:0,
      }
    }
}