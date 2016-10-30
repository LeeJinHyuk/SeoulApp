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
import EmploymentNoticeList from "./list/employmentNoticeList";
import DetailView from "./detail/DetailView"
import SeoulApiStore from "../store/seoulApiStore";
import SeoulApiAction from "../action/seoulApiAction";
import style from "./container.less";

@ReactMixin.decorate(Reflux.listenTo(SeoulApiStore, "handleApiData"))
class Container extends React.Component {
  constructor(props) {
    super(props);
    // cordova value
    this.timerObj;

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
    // 뒤로가기 버튼 이벤트
    this.backButtonEvent = this.backButtonEvent.bind(this);
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
    let that = this;
    console.log("[Container] componentDidMount");
    // 최상위 컴포넌트 마운트 완료 시 데이터 요청
    SeoulApiAction.getJobFairList(GD.APICALL_TYPE.START);
    SeoulApiAction.getEmploymentNoticeList(GD.APICALL_TYPE.START);
    document.addEventListener("backbutton", this.backButtonEvent, false);
  };

  handleApiData(result, type, typeList) {
    console.log("[Container] handleApiData");
    let naviType;

    switch(type) {
      case typeList.JOBFAIRLIST:
        naviType = GD.NAVITYPE.JOBFAIR;
        break;
      case typeList.EMPLOYMENT_NOTICE_LIST:
        naviType = GD.NAVITYPE.EMPLOYMENT_NOTICE;
        break;
      case typeList.JOBFAIR_DETAIL:
        naviType = GD.NAVITYPE.JOBFAIR_DETAIL;
        break;
      case typeList.EMPLOYMENT_NOTICE_DETAIL:
        naviType = GD.NAVITYPE.EMPLOYMENT_NOTICE_DETAIL
        break;
    }
    
    // 데이터 갱신 때 마다 스크롤 위치 초기화
    window.document.body.scrollTop = 0;
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
        SeoulApiAction.getJobFairList(GD.APICALL_TYPE.TAB);
        break;
      case GD.TITLE.EMPLOYMENT_NOTICE :
        SeoulApiAction.getEmploymentNoticeList(GD.APICALL_TYPE.TAB);
        break;
    }
  };

  backButtonEvent(e) {
    let that = this;
    if (document.getElementsByClassName("conditionPopup").length === 0 &&
        document.getElementsByClassName("conditionPopupForJob").length === 0 &&
        document.getElementsByClassName("DetailView").length === 0) {
      // 3가지 팝업에 대한 back button event는 각각 팝업에 정의되어 있기 때문에
      // 기본적인 back button event 로의 종료 이벤트는 container에서 정의
      if (navigator && navigator.showToast) {
        if (this.timerObj) {
          navigator.app.exitApp();
        } else {
          this.timerObj = setTimeout(function() {
            clearTimeout(that.timerObj);
            that.timerObj = undefined;
          }, 1500);
          navigator.showToast(GD.MESSAGE.EXIT_NOTIFICATION);
        }
      } 
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
          {
              this.state.naviType === GD.NAVITYPE.EMPLOYMENT_NOTICE 
                  ?
                  <EmploymentNoticeList
                    listData={this.state.listData}>
                  </EmploymentNoticeList>
                  :
                  null
          }
        </div>
    )
  };
}

export default Container;
