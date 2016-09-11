/**
 * Created by eerto_000 on 2016-08-03.
 */
"use strict";

import React from "react";
import ReactMixin from "react-mixin";
import Reflux from "reflux";
import style from "./container.css";
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
    
    this.handleApiData = this.handleApiData.bind(this);
  };

  componentWillMount() {
    console.log("[Container] componentWillMount");
    // componentWillMount state 정리 구간. 단 re render는 하지 않음.
    this.setState({
      isLoading : true
    });
  };

  componentDidMount() {
    console.log("[Container] componentDidMount");
    // 최상위 컴포넌트 마운트 완료 시 데이터 요청
    // TODO 로컬스토리지 또는 디바이스 저장소 데이터 유무에 따라 요청/미요청 로직 추가 필요
    SeoulApiAction.getJobFairList();
  };

  componentWillReceiveProps(nextProps) {
    console.log("[Container] componentWillReceiveProps");

  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Container] shouldComponentUpdate");
    return ((this.state.isLoading === nextState.isLoading) ? false : true);
  };

  componentWillUpdate(nextProps, nextState) {
    console.log("[Container] componentWillUpdate");

  };

  componentDidUpdate(prevProps, prevState) {
    console.log("[Container] componentDidUpdate");

  };

  componentWillUnMount() {
    console.log("[Container] componentWillUnMount");

  };

  handleApiData(result, type, typeList) {
    console.log("[Container] handleApiData");
    this.setState({
      isLoading : false
    });
  };

  render() {
    console.log("render " + this.state.isLoading);
    return (
        <div id="container">
          <Loading isLoading={this.state.isLoading}/>
        </div>
    )
  };
}

export default Container;
