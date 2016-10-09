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
      listData : undefined,
      isMoveScroll : false
    };
    // shouldComponentUpdate 성능 향상 모듈 실행
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    // api 요청 후 실행될 콜백
    this.handleApiData = this.handleApiData.bind(this);
    // 네비 타입 변경 시 실행될 콜백
    this.changeNaviType = this.changeNaviType.bind(this);
    // 스크롤에 따라 맨위로 버튼 노출 미노출 설정하는 이벤트 등록
    this.displayUpButton = this.displayUpButton.bind(this);
    // 맨위로 버튼 선택 시 이벤트 등록
    this.clickUpButton = this.clickUpButton.bind(this);
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
    SeoulApiAction.getJobFairList(GD.APICALL_TYPE.START);
    SeoulApiAction.getEmploymentNoticeList(GD.APICALL_TYPE.START);
    window.addEventListener("scroll", this.displayUpButton);
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

  displayUpButton(e) {
    let scrollTop = e.srcElement.body.scrollTop;

    if (scrollTop > 0) {
      this.setState({
        isMoveScroll : true
      });
    } else {
      this.setState({
        isMoveScroll : false
      });
    }
  };

  clickUpButton(e) {
    window.document.body.scrollTop = 0;
    this.setState({
      isMoveScroll : false
    });
  };

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
    // 탭 또는 데이터 갱신으로 인한 부분이기 때문에 스크롤 위치를 초기화한다.
    window.document.body.scrollTop = 0;

    this.setState({
      isLoading : false,
      naviType : naviType,
      listData : result,
      isMoveScroll : false
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
          <div
              className={"moveTop " + (this.state.isMoveScroll === true ? "activate" : "deactivate")}
              onClick={this.clickUpButton}>
            <span>맨위로</span>
          </div>
        </div>
    )
  };
}

export default Container;
