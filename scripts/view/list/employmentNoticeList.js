/**
 * Created by eerto_000 on 2016-10-09.
 */
import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GD from "../../globalData";
import EmploymentNoticeItem from "./employmentNoticeItem";
import style from "./EmploymentNoticeList.less";

class EmploymentNoticeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listMode : GD.EMPLOYMENTNOTICELISTMODE.NORMAL,
            listData : undefined,
            maxPrintData : 20,
            isPrintSearchTab : false
        };

        // shouldComponentUpdate 성능 향상 모듈 실행
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 리스트 아이템 생성
        this.makeItem = this.makeItem.bind(this);
        // 검색 조건 팝업 노출
        this.openConditionPopup = this.openConditionPopup.bind(this);
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

    // componentWillUnMount() {
    //     console.log("[EmploymentNoticeList] componentWillUnMount");
    //
    // };

    openConditionPopup(e) {
        this.setState({
            isPrintSearchTab : true
        });
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

    makeItem() {
        let itemTag = [];

        if (this.state.listData) {
            for (let i = 0; i < this.state.maxPrintData; i++) {
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
                                    <span>검색결과 : {this.state.listData.length} 개</span>
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
                                <span>test입니다</span>
                            </div>
                            :
                            null
                    }
                    {this.makeItem()}
                    {
                        this.state.isPrintSearchTab === true
                            ?
                            <div
                                className="conditionPopup">
                                <div className="region">
                                    <div className="selectRegion">
                                        <span>지역</span>
                                        <select id="soflow">
                                            <option>지역선택</option>
                                            <option>강남구</option>
                                            <option>도봉구</option>
                                        </select>
                                        <span>최대 3개까지 선택가능</span>
                                    </div>
                                    <div className="selectedRegion">
                                        <ul>
                                            <li>test1</li>
                                            <li>test2</li>
                                            <li>test3</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
                :
                null
        )
    };
}
export default EmploymentNoticeList;