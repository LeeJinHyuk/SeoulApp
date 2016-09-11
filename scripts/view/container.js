/**
 * Created by eerto_000 on 2016-08-03.
 */
"use strict";

import React from "react";
import ReactMixin from "react-mixin";
import Reflux from "reflux";
import Loading from "./loading/loading";
import SeoulApiStore from "../store/seoulApiStore";
import SeoulApiAction from "../action/seoulApiAction";

@ReactMixin.decorate(Reflux.listenTo(SeoulApiStore, "handleApiData"))
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : false
    };
  };

  componentWillMount() {
    console.log("[Container] componentWillMount");

  };

  componentDidMount() {
    console.log("[Container] componentDidMount");
    this.setState = ({
      isLoading : true
    });
    SeoulApiAction.getJobFairList();
  };

  componentWillReceiveProps() {
    console.log("[Container] componentWillReceiveProps");

  };

  shouldComponentUpdate() {
    console.log("[Container] shouldComponentUpdate");

  };

  componentWillUpdate() {
    console.log("[Container] componentWillUpdate");

  };

  componentDidUpdate() {
    console.log("[Container] componentDidUpdate");

  };

  componentWillUnMount() {
    console.log("[Container] componentWillUnMount");

  };

  handleApiData(result) {
    console.log("[Container] handleApiData");
  };

  render() {
    return (
        <div id="container">
          <Loading isLoading={this.state.isLoading}/>
        </div>
    )
  };
}

export default Container;
