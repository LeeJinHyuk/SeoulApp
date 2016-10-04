/**
 * Created by eerto_000 on 2016-08-03.
 */
"use strict";

import React from "react";
import ReactMixin from "react-mixin";
import Reflux from "reflux";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GD from "../globalData";
import Loading from "./loading/loading";
import Navi from "./navi/navi";
import JobFairList from "./list/jobFairList";
import SeoulApiStore from "../store/seoulApiStore";
import SeoulApiAction from "../action/seoulApiAction";
import style from "./container.less";

@ReactMixin.decorate(Reflux.listenTo(SeoulApiStore, "handleApiData"))
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : false,
      naviType : GD.NAVITYPE.JOBFAIR,
      listData : undefined
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
    SeoulApiAction.getJobFairList();
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log("[Container] componentWillReceiveProps");
  //
  // };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Container] shouldComponentUpdate");
  //   // 현재 로딩바 노출 상태가 다를 경우에만 랜더링 수행
  //   return ((this.state.isLoading === nextState.isLoading) ? false : true);
  // };

  // componentWillUpdate(nextProps, nextState) {
  //   console.log("[Container] componentWillUpdate");
  //
  // };
  //
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("[Container] componentDidUpdate");
  //
  // };
  //
  // componentWillUnMount() {
  //   console.log("[Container] componentWillUnMount");
  //
  // };

  handleApiData(result, type, typeList) {
    console.log("[Container] handleApiData");
    let naviType;

    switch(type) {
      case typeList.JOBFIARLIST:
        naviType = GD.NAVITYPE.JOBFAIR;
        break;
      case typeList.EMPLOYMENT_NOTICE_LIST:
        naviType = GD.NAVITYPE.EMPLOYMENT_NOTICE;
        break;
      case typeList.RECURITDETAIL:
        naviType = GD.NAVITYPE.DETAIL;
        break;
    }

    this.setState({
      isLoading : false,
      naviType : naviType,
      listData : result
    });
  };

  changeNaviType(e) {
    console.log("[Container] changeNaviType");
    if ((this.state.naviType === GD.NAVITYPE.JOBFAIR && e.target.textContent !== GD.TITLE.JOBFAIR) ||
        (this.state.naviType === GD.NAVITYPE.EMPLOYMENT_NOTICE && e.target.textContent !== GD.TITLE.EMPLOYMENT_NOTICE)) {
      // 현재 상태와 같은 탭을 누르지 않는 경우에만 로딩
      this.setState({
        isLoading : true,
        naviType : e.target.textContent === GD.TITLE.JOBFAIR ? GD.NAVITYPE.JOBFAIR : GD.NAVITYPE.EMPLOYMENT_NOTICE
      });
    }

    switch(e.target.textContent) {
      case GD.TITLE.JOBFAIR :
        SeoulApiAction.getJobFairList();
        break;
      case GD.TITLE.EMPLOYMENT_NOTICE :
        SeoulApiAction.getEmploymentNoticeList();
        break;
    }
  };

  render() {
    return (
        <div id="container">
          <Loading isLoading={this.state.isLoading}/>
          <Navi 
              naviType={this.state.naviType}
              changeNaviType={this.changeNaviType}>
          </Navi>
          {
              this.state.naviType === GD.NAVITYPE.JOBFAIR
                  ?
                  <JobFairList
                      listData={this.state.listData}>
                  </JobFairList>
                  :
                  null
          }
        </div>
    )
  };
}

export default Container;
