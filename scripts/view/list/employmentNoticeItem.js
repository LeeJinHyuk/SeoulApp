/**
 * Created by eerto_000 on 2016-10-09.
 */
import React from "react";
import style from "./employmentNoticeItem.less";

class EmploymentNoticeItem extends React.Component {
    constructor(props) {
        super(props);

    };

    componentWillMount() {
        console.log("[EmploymentNoticeItem] componentWillMount");

    };

    componentDidMount() {
        console.log("[EmploymentNoticeItem] componentDidMount");

    };

    componentWillReceiveProps(nextProps) {
        console.log("[EmploymentNoticeItem] componentWillReceiveProps");

    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[JobFairItem] shouldComponentUpdate");
    //
    // };

    componentWillUpdate(nextProps, nextState) {
        console.log("[EmploymentNoticeItem] componentWillUpdate");

    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[EmploymentNoticeItem] componentDidUpdate");

    };

    componentWillUnMount() {
        console.log("[EmploymentNoticeItem] componentWillUnMount");

    };

    render() {
        return (
            <div className={"item index_" + this.props.index}>
                <div>
                    <span>{this.props.itemData.CMPNY_NM}</span>
                </div>
                <div>
                    <span>{this.props.itemData.JOBCODE_NM}</span>
                </div>
                <div>
                    <span>{this.props.itemData.BASS_ADRES_CN}</span>
                </div>
                <div>
                    <span>{this.props.itemData.HOPE_WAGE}</span>
                </div>
            </div>
        )
    };
}
export default EmploymentNoticeItem;