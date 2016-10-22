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
    //     console.log("[EmploymentNoticeItem] shouldComponentUpdate");
    //
    // };

    componentWillUpdate(nextProps, nextState) {
        console.log("[EmploymentNoticeItem] componentWillUpdate");

    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[EmploymentNoticeItem] componentDidUpdate");

    };

    componentWillUnmount() {
        console.log("[EmploymentNoticeItem] componentWillUnmount");

    };

    render() {
        return (
            <div className={"item index_" + this.props.index}>
                <span className="companyName">{this.props.itemData.CMPNY_NM}</span>
                <span className="companyJobCode">{this.props.itemData.JOBCODE_NM}</span>
                <div className="companyAddress">
                    <strong>근무예정지 </strong>
                    <span>{this.props.itemData.WORK_PARAR_BASS_ADRES_CN}</span>
                </div>
                <div className="closingDate">
                    <strong>마감일 </strong>
                    <span>{this.props.itemData.RCEPT_CLOS_NM}</span>
                </div>
            </div>
        )
    };
}
export default EmploymentNoticeItem;