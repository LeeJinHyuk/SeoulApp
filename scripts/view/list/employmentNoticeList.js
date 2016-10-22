/**
 * Created by eerto_000 on 2016-10-09.
 */
import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GD from "../../globalData";
import EmploymentNoticeItem from "./employmentNoticeItem";
import EmploymentNoticePopup from "./popup/employmentNoticePopup";
import MoveTopPopup from "./popup/moveTopPopup";
import style from "./EmploymentNoticeList.less";

class EmploymentNoticeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listMode : GD.EMPLOYMENTNOTICELISTMODE.NORMAL,
            listData : undefined,
            selectedCondition : [],
            maxPrintData : 20,
            isPrintSearchTab : false
        };

        // shouldComponentUpdate 성능 향상 모듈 실행
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 리스트 아이템 생성
        this.makeItem = this.makeItem.bind(this);
        // 검색 조건 팝업 노출
        this.openConditionPopup = this.openConditionPopup.bind(this);
        // 검색 선택 시 실행 콜백
        this.selectCondition = this.selectCondition.bind(this);
        // 더보기 버튼 선택시 실행 콜백
        this.loadAdditionalData = this.loadAdditionalData.bind(this);
        // 테스트 파싱 함수1
        this.testCall = this.testCall.bind(this);
        // 테스트 파싱 함수2
        this.testCallIner = this.testCallIner.bind(this);
    };

    componentWillMount() {
        console.log("[EmploymentNoticeList] componentWillMount");
        this.setState({
            listData : this.props.listData
        });
    };

    // componentDidMount() {
    //     console.log("[EmploymentNoticeList] componentDidMount");
    //
    // };

    componentWillReceiveProps(nextProps) {
        console.log("[EmploymentNoticeList] componentWillReceiveProps");
        this.testCall(nextProps);
        this.setState({
            listData : nextProps.listData
        });
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[EmploymentNoticeList] shouldComponentUpdate");
    //
    // };

    // componentWillUpdate(nextProps, nextState) {
    //     console.log("[EmploymentNoticeList] componentWillUpdate");
    //
    // };

    // componentDidUpdate(prevProps, prevState) {
    //     console.log("[EmploymentNoticeList] componentDidUpdate");
    //
    // };

    // componentWillUnmount() {
    //     console.log("[EmploymentNoticeList] componentWillUnmount");
    //
    // };

    openConditionPopup(e) {
        this.setState({
            isPrintSearchTab : true
        });
    };

    selectCondition(data, selectedCondition) {
        if (data) {
            // 검색 조건으로 검색 시 스크롤 위치 초기화 되도록 수정
            window.document.body.scrollTop = 0;
            // 데이터 존재하면 조건에 따라 리스트 노출
            if (data.length === 0) {
                data = undefined;
            }
            this.setState({
                isPrintSearchTab : false,
                listData : data,
                listMode : GD.EMPLOYMENTNOTICELISTMODE.SEARCH,
                maxPrintData : 20,
                selectedCondition : selectedCondition
            });
        } else {
            // 데이터 없다면 빈공간 선택으로 팝업만 제거
            this.setState({
                isPrintSearchTab : false
            });
        }
    };

    makeItem() {
        let itemTag = [];
        let length = 0;

        if (this.state.listData) {
            length =
                this.state.maxPrintData > this.state.listData.length ? this.state.listData.length : this.state.maxPrintData;
            for (let i = 0; i < length; i++) {
                itemTag.push(
                    <EmploymentNoticeItem
                        itemData={this.state.listData[i]}
                        key={i}
                        index={i}
                    >
                    </EmploymentNoticeItem>
                );
            }
        } else {
            itemTag = null;
        }

        return itemTag;
    };

    loadAdditionalData(e) {
        if (this.state.maxPrintData < this.state.listData.length) {
            this.setState({
                maxPrintData : this.state.maxPrintData + 20
            });
        }
    };

    testCall(nextProps) {
        // ACDMCR_NM 학력코드명
        // EMPLYM_STLE_CMMN_MM 고용형태코드명
        // CAREER_CND_NM 경력조건코드명
        // RET_GRANTS_NM 퇴직금구분
        // WORK_TM_NM 근무형태
        // JO_FEINSR_SBSCRB_NM 4대보험
        // MODEL_MTH_NM 전형방법
        // RCEPT_MTH_NM 접수방법
        // MNGR_INSTT_NM 지역구

        let ACDMCR_NM = [];
        let EMPLYM_STLE_CMMN_MM = [];
        let CAREER_CND_NM = [];
        let RET_GRANTS_NM = [];
        let WORK_TM_NM = [];
        let JO_FEINSR_SBSCRB_NM = [];
        let MODEL_MTH_NM = [];
        let RCEPT_MTH_NM = [];
        let MNGR_INSTT_NM = [];

        let that = this;
        nextProps.listData.map((item, i) => {
            if (ACDMCR_NM.length === 0) {
                ACDMCR_NM.push(item.ACDMCR_NM);
                EMPLYM_STLE_CMMN_MM.push(item.ACDMCR_NM);
                CAREER_CND_NM.push(item.ACDMCR_NM);
                RET_GRANTS_NM.push(item.ACDMCR_NM);
                WORK_TM_NM.push(item.ACDMCR_NM);
                JO_FEINSR_SBSCRB_NM.push(item.ACDMCR_NM);
                MODEL_MTH_NM.push(item.ACDMCR_NM);
                RCEPT_MTH_NM.push(item.ACDMCR_NM);
                MNGR_INSTT_NM.push(item.MNGR_INSTT_NM);
            } else {
                that.testCallIner(ACDMCR_NM, item.ACDMCR_NM);
                that.testCallIner(EMPLYM_STLE_CMMN_MM, item.EMPLYM_STLE_CMMN_MM);
                that.testCallIner(CAREER_CND_NM, item.CAREER_CND_NM);
                that.testCallIner(RET_GRANTS_NM, item.RET_GRANTS_NM);
                that.testCallIner(WORK_TM_NM, item.WORK_TM_NM);
                that.testCallIner(JO_FEINSR_SBSCRB_NM, item.JO_FEINSR_SBSCRB_NM);
                that.testCallIner(MODEL_MTH_NM, item.MODEL_MTH_NM);
                that.testCallIner(RCEPT_MTH_NM, item.RCEPT_MTH_NM);
                that.testCallIner(MNGR_INSTT_NM, item.MNGR_INSTT_NM);
            }
        });
        console.log("ACDMCR_NM(학력코드명) : " + JSON.stringify(ACDMCR_NM));
        console.log("EMPLYM_STLE_CMMN_MM(고용형태코드명) : " + JSON.stringify(EMPLYM_STLE_CMMN_MM));
        console.log("CAREER_CND_NM(경력조건코드명) : " + JSON.stringify(CAREER_CND_NM));
        console.log("RET_GRANTS_NM(퇴직금구분) : " + JSON.stringify(RET_GRANTS_NM));
        console.log("WORK_TM_NM(근무형태) : " + JSON.stringify(WORK_TM_NM));
        console.log("JO_FEINSR_SBSCRB_NM(4대보험) : " + JSON.stringify(JO_FEINSR_SBSCRB_NM));
        console.log("MODEL_MTH_NM(전형방법) : " + JSON.stringify(MODEL_MTH_NM));
        console.log("RCEPT_MTH_NM(접수방법) : " + JSON.stringify(RCEPT_MTH_NM));
        console.log("MNGR_INSTT_NM(지역구) : " + JSON.stringify(MNGR_INSTT_NM));
    };

    testCallIner(tmpArray, data) {
        let flag = false;

        for (let i = 0; i < tmpArray.length; i++) {
            if (tmpArray[i] === data) {
                flag = true;
            }
        }
        if (flag === false) {
            tmpArray.push(data);
        }
    };

    render() {
        return (
            this.state.listData !== undefined
                ?
                <div className="employmentNoticeList">
                    <div className="topTab">
                        {
                            this.state.listMode === GD.EMPLOYMENTNOTICELISTMODE.SEARCH
                                ?
                                <div className="totalSearchResult">
                                    <span><strong>검색결과 : </strong>{this.state.listData.length} 개</span>
                                </div>
                                :
                                null
                        }
                        <div
                            className="conditionTab"
                            onClick={this.openConditionPopup}>
                            <span>상세검색</span>
                        </div>
                    </div>
                    {
                        this.state.listMode === GD.EMPLOYMENTNOTICELISTMODE.SEARCH
                            ?
                            <div className="bottomTab">
                                <span>
                                    <strong>검색지역 : </strong>
                                    {this.state.selectedCondition.length > 0 ? JSON.stringify(this.state.selectedCondition) : "모든지역"}
                                </span>
                            </div>
                            :
                            null
                    }
                    {this.makeItem()}
                    {
                        this.state.isPrintSearchTab === true
                            ?
                            <EmploymentNoticePopup
                                listData={this.props.listData}
                                searchCallback={this.selectCondition}>
                            </EmploymentNoticePopup>
                            :
                            null
                    }
                    {
                        <MoveTopPopup>

                        </MoveTopPopup>
                    }
                    {
                        <div
                            className="loadAdditionalData"
                            onClick={this.loadAdditionalData}>
                            <span
                                className={this.state.maxPrintData >= this.state.listData.length ? "deactivate" : "activate"}>
                                더보기
                            </span>
                        </div>
                    }
                </div>
                :
                null
        )
    };
}
export default EmploymentNoticeList;