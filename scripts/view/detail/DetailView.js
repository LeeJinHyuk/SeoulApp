/**
 * Created by eerto_000 on 2016-10-21.
 */
import React from "react";
import GD from "../../globalData";
import DetailDataAction from "../../action/detailDataAction";
import style from "./DetailView.less";

class JobFairDetail extends React.Component {
    constructor(props) {
        super(props);

        // 장소 데이터가 html tag 인지 string인지 체크하여 추가
        this.insertLocationUrl = this.insertLocationUrl.bind(this);
    };

    componentWillMount() {
        console.log("[JobFairDetail] componentWillMount");

    };

    componentDidMount() {
        console.log("[JobFairDetail] componentDidMount");
    };

    componentWillReceiveProps(nextProps) {
        console.log("[JobFairDetail] componentWillReceiveProps");

    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[JobFairDetail] shouldComponentUpdate");
    //
    // };

    componentWillUpdate(nextProps, nextState) {
        console.log("[JobFairDetail] componentWillUpdate");

    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[JobFairDetail] componentDidUpdate");

    };

    componentWillUnmount() {
        console.log("[JobFairDetail] componentWillUnmount");
    };

    insertLocationUrl() {
        console.log("[JobFairDetail] insertLocationUrl");
        let innerHtmlData = {
            __html : this.props.item.JOBFAIR_URL
        };

        if (!this.props.item.JOBFAIR_URL) {
            // 데이터 없는 경우
            return null;
        } else if (this.props.item.JOBFAIR_URL.indexOf("<table") > -1) {
            // 태그인 경우
            return (
                <dd
                    dangerouslySetInnerHTML={innerHtmlData}>

                </dd>
            );
        } else {
            // 경로인 경우
            return (
                <dd>
                    <a href={this.props.item.JOBFAIR_URL} className="moveMap">지도 바로보기 &gt;</a>
                </dd>
            );
        }
    };

    backButton() {
        console.log("[JobFairDetail] backButton");
        DetailDataAction.hideDetailPage();
    };

    render() {
        return (
            <div className="DetailView">
                <div className="detailNavi">
                    <div
                        className="backButton"
                        onClick={this.backButton}>&lt;
                    </div>
                    <span>
                        {this.props.type === GD.NAVITYPE.JOBFAIR_DETAIL ? GD.TITLE.JOBFAIR_DETAIL : GD.TITLE.EMPLOYMENT_DETAIL}
                    </span>
                </div>
                {
                    this.props.type === GD.NAVITYPE.JOBFAIR_DETAIL
                        ?
                        <div className="detailList">
                            <dl>
                                <dt className="DetailViewTitle">{this.props.item.JOBFAIR_NAME}</dt>
                                <dd>
                                    <strong>일자 </strong>
                                    <span>{this.props.item.JOBFAIR_DATE} </span>
                                    <span>{this.props.item.JOBFAIR_FRTIME}</span>
                                    <span> ~ </span>
                                    <span>{this.props.item.JOBFAIR_EDTIME}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>장소</dt>
                                <dd>{this.props.item.JOBFAIR_LOCATION}</dd>
                                {this.insertLocationUrl()}
                            </dl>
                            <dl>
                                <dt>공동 주최기관</dt>
                                <dd>{this.props.item.JOBFAIR_JOINT_AUSPICES}</dd>
                            </dl>
                        </div>
                        :
                        <div className="detailList">
                            <dl>
                                <dt className="DetailViewTitle">{this.props.item.CMPNY_NM}</dt>
                                <dd>
                                    <span>{this.props.item.JOBCODE_NM} </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>모집인원</dt>
                                <dd>{this.props.item.RCRIT_NMPR_CO}</dd>
                                <dt>마감일</dt>
                                <dd>{this.props.item.RCEPT_CLOS_NM}</dd>
                            </dl>
                            <dl>
                                <dt>모집정보</dt>
                                <dt>모집직종</dt>
                                <dd>{this.props.item.JOBCODE_NM}</dd>
                                <dt>모집인원</dt>
                                <dd>{this.props.item.RCRIT_NMPR_CO}</dd>
                                <dt>직무내용</dt>
                                <dd>{this.props.item.DTY_CN}</dd>
                            </dl>
                            <dl>
                                <dt>근무조건</dt>
                                <dt>학력</dt>
                                <dd>{this.props.item.ACDMCR_NM}</dd>
                                <dt>경력조건</dt>
                                <dd>{this.props.item.CAREER_CND_NM}</dd>
                                <dt>고용형태</dt>
                                <dd>{this.props.item.EMPLYM_STLE_CMMN_MM}</dd>
                                <dt>급여조건</dt>
                                <dd>{this.props.item.HOPE_WAGE}</dd>
                                <dt>근무시간</dt>
                                <dd>{this.props.item.WORK_TIME_NM}</dd>
                                <dt>근무형태</dt>
                                <dd>{this.props.item.WORK_TM_NM}</dd>
                                <dt>근무예정지</dt>
                                <dd>{this.props.item.WORK_PARAR_BASS_ADRES_CN}</dd>
                            </dl>
                            <dl>
                                <dt>복리후생</dt>
                                <dt>4대보험</dt>
                                <dd>{this.props.item.JO_FEINSR_SBSCRB_NM}</dd>
                                <dt>퇴직금</dt>
                                <dd>{this.props.item.RET_GRANTS_NM}</dd>
                                <dt>공휴일</dt>
                                <dd>{this.props.item.HOLIDAY_NM}</dd>
                            </dl>
                            <dl>
                                <dt>전형방법</dt>
                                <dd>{this.props.item.MODEL_MTH_NM}</dd>
                                <dt>접수방법</dt>
                                <dd>{this.props.item.RCEPT_MTH_NM}</dd>
                                <dt>채용담당</dt>
                                <dt>담당자 이름</dt>
                                <dd>{this.props.item.MNGR_NM}</dd>
                                <dt>담당자 연락처</dt>
                                <dd>{this.props.item.MNGR_PHON_NO}</dd>
                            </dl>
                            <dl>
                                <dt>기업정보</dt>
                                <dt>기업이름</dt>
                                <dd>{this.props.item.CMPNY_NM}</dd>
                                <dt>사업요약내용</dt>
                                <dd>{this.props.item.BSNS_SUMRY_CN}</dd>
                                <dt>기업주소</dt>
                                <dd>{this.props.item.BASS_ADRES_CN}</dd>
                                <dt>인근전철역</dt>
                                <dd>{this.props.item.SUBWAY_NM}</dd>
                            </dl>
                        </div>
                }
            </div>
        )
    };
}
export default JobFairDetail;