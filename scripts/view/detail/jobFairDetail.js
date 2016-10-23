/**
 * Created by eerto_000 on 2016-10-21.
 */
import React from "react";
import GD from "../../globalData";
import DetailDataAction from "../../action/detailDataAction";
import style from "./JobFairDetail.less";

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
                    <a href={this.props.item.JOBFAIR_URL}>경로</a>
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
            <div className="jobFairDetail">
                <div className="detailNavi">
                    <div
                        className="backButton"
                        onClick={this.backButton}>&lt;
                    </div>
                    <span>{GD.TITLE.JOBFAIR_DETAIL}</span>
                </div>
                <div className="detailList">
                    <dl>
                        <dt className="jabFairTitle">{this.props.item.JOBFAIR_NAME}</dt>
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
            </div>
        )
    };
}
export default JobFairDetail;