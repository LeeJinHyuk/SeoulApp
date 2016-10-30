/**
 * Created by eerto_000 on 2016-10-30.
 */
import React from "react";
import GD from "../../../globalData";
import style from "./JobFairPopup.less";

class JobFairPopup extends React.Component {
    constructor(props) {
        super(props);
        // 뒤로가기 버튼 이벤트
        this.backButtonEvent = this.backButtonEvent.bind(this);
    };

    // componentWillMount() {
    //     console.log("[JobFairPopup] componentWillMount");
    //
    // };

    componentDidMount() {
        console.log("[JobFairPopup] componentDidMount");
        document.addEventListener("backbutton", this.backButtonEvent, false);
    };

    // componentWillReceiveProps(nextProps) {
    //     console.log("[JobFairPopup] componentWillReceiveProps");
    //
    // };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[JobFairPopup] shouldComponentUpdate");
    //
    // };

    // componentWillUpdate(nextProps, nextState) {
    //     console.log("[JobFairPopup] componentWillUpdate");
    //
    // };
    //
    // componentDidUpdate(prevProps, prevState) {
    //     console.log("[JobFairPopup] componentDidUpdate");
    //
    // };

    componentWillUnmount() {
        console.log("[JobFairPopup] componentWillUnmount");
        document.removeEventListener("backbutton", this.backButtonEvent, false);
    };

    backButtonEvent(e) {
        this.props.backButtonEvent();
    };

    render() {
        return (
            <div
                className="conditionPopupForJob"
                onClick={this.props.selectCondition}>
                <ul>
                    <li
                        className={"total " + this.props.setSeletedCondition(GD.JOBLISTMODE.TOTAL)}
                        onClick={this.props.selectCondition}>
                        전체기간
                    </li>
                    <li
                        className={"current " + this.props.setSeletedCondition(GD.JOBLISTMODE.CURRENT_YEAR)}
                        onClick={this.props.selectCondition}>
                        {new Date().getFullYear().toString()}
                    </li>
                </ul>
            </div>
        )
    };
}
export default JobFairPopup;