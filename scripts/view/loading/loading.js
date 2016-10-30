"use strict";

import React from "react";
import style from "./loading.less";

class Loading extends React.Component {
  constructor(props) {
    super(props);

  };

  render() {
    return (
        this.props.isLoading 
            ? 
            <div className="loadingContainer">
              <div className="loadingBackground"></div>
              <div className="loading"></div>
            </div>
            : 
            null
    )
  };
}

export default Loading;
