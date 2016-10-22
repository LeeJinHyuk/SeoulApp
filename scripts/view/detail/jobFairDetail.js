/**
 * Created by eerto_000 on 2016-10-21.
 */
import React from "react";
import GD from "../../globalData";
import style from "./JobFairDetail.less";

class JobFairDetail extends React.Component {
    constructor(props) {
        super(props);
        
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

    render() {
        return (
            <div className="jobFairDetail">
                <div className="detailNavi">
                    <div className="backButton">&lt;</div>
                    <span>{GD.TITLE.JOBFAIR_DETAIL}</span>
                </div>
                <div className="detailList">
                    <dl>
                        <dt>{this.props.item.JOBFAIR_NAME}</dt>
                        <dd>{this.props.item.JOBFAIR_DATE}</dd>
                        <dd>{this.props.item.JOBFAIR_FRTIME}</dd>
                        <dd>{this.props.item.JOBFAIR_EDTIME}</dd>
                    </dl>
                    <dl>
                        <dt>행사내용</dt>
                        <dd>{this.props.item.GUIDE_INTRO}</dd>
                    </dl>
                    <dl>
                        <dt>장소</dt>
                        <dd>{this.props.item.JOBFAIR_LOCATION}</dd>
                        <dd>{this.props.item.JOBFAIR_URL}</dd>
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