"use strict";

import React from "react";
import style from "./loading.less";

class Loading extends React.Component {
  constructor(props) {
    super(props);
    console.log("loading " + props);
  };

  componentWillMount() {
    console.log("[Loading] componentWillMount");

  };

  componentDidMount() {
    console.log("[Loading] componentDidMount");

  };

  componentWillReceiveProps(nextProps) {
    console.log("[Loading] componentWillReceiveProps");

  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Loading] shouldComponentUpdate");
  //
  // };

  componentWillUpdate(nextProps, nextState) {
    console.log("[Loading] componentWillUpdate");

  };

  componentDidUpdate(prevProps, prevState) {
    console.log("[Loading] componentDidUpdate");

  };

  componentWillUnMount() {
    console.log("[Loading] componentWillUnMount");

  };

  render() {
    return (
        this.props.isLoading ? <div id="loading"></div> : null
    )
  };
}

export default Loading;
