/**
 * Created by eerto_000 on 2016-08-03.
 */
"use strict";

import React from "react";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    console.log("[Container] componentWillMount");

  }

  componentDidMount() {
    console.log("[Container] componentDidMount");

  }

  componentWillReceiveProps() {
    console.log("[Container] componentWillReceiveProps");

  }

  shouldComponentUpdate() {
    console.log("[Container] shouldComponentUpdate");

  }

  componentWillUpdate() {
    console.log("[Container] componentWillUpdate");

  }

  componentDidUpdate() {
    console.log("[Container] componentDidUpdate");

  }

  componentWillUnMount() {
    console.log("[Container] componentWillUnMount");

  }

  render() {
    return null;
  }
}

export default Container;
