"use strict";

import React from "react";

class Loading extends React.Component {
  constructor(props) {
    super(props);

  };

  componentWillMount() {
    console.log("[Loading] componentWillMount");

  };

  componentDidMount() {
    console.log("[Loading] componentDidMount");

  };

  componentWillReceiveProps() {
    console.log("[Loading] componentWillReceiveProps");

  };

  shouldComponentUpdate() {
    console.log("[Loading] shouldComponentUpdate");

  };

  componentWillUpdate() {
    console.log("[Loading] componentWillUpdate");

  };

  componentDidUpdate() {
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
