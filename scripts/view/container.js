/**
 * Created by eerto_000 on 2016-08-03.
 */
"use strict";

import React from "react";
import ReactMixin from "react-mixin";
import Reflux from "reflux";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from "./container.css";
import GD from "../globalData";
import Loading from "./loading/loading";
import Navi from "./navi/navi";
import SeoulApiStore from "../store/seoulApiStore";
import SeoulApiAction from "../action/seoulApiAction";

@ReactMixin.decorate(Reflux.listenTo(SeoulApiStore, "handleApiData"))
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : false,
      naviType : GD.NAVITYPE.JOBFAIR
    };
    // shouldComponentUpdate 성능 향상 모듈 실행
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    // api 요청 후 실행될 콜백
    this.handleApiData = this.handleApiData.bind(this);
    // 네비 타입 변경 시 실행될 콜백
    this.changeNaviType = this.changeNaviType.bind(this);
  };

  componentWillMount() {
    console.log("[Container] componentWillMount");
    // componentWillMount state 정리 구간. 단 re render는 하지 않음.
    this.setState({
      isLoading : true,
      naviType : GD.NAVITYPE.JOBFAIR
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Container] shouldComponentUpdate");
  //   // 현재 로딩바 노출 상태가 다를 경우에만 랜더링 수행
  //   return ((this.state.isLoading === nextState.isLoading) ? false : true);
  // };

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
      isLoading : false,
      
    });
  };

  changeNaviType(e) {
    console.log("[Container] changeListMode");
    let naviType;

    switch(e.target.textContent) {
      case GD.TITLE.JOBFAIR :
            naviType = GD.NAVITYPE.JOBFAIR;
            break;
      case GD.TITLE.EMPLOYMENT_NOTICE :
            naviType = GD.NAVITYPE.EMPLOYMENT_NOTICE;
            break;
    }
    this.setState({
      naviType : naviType
    });
  };

  render() {
    return (
        <div id="container">
          <Loading isLoading={this.state.isLoading}/>
          <Navi
              naviType={this.state.naviType}
              changeNaviType={this.changeNaviType}>
          </Navi>
        </div>
    )
  };
}

export default Container;
