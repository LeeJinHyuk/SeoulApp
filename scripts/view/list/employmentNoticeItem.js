/**
 * Created by eerto_000 on 2016-10-09.
 */
import React from "react";
import GD from "../../globalData";
import DetailDataAction from "../../action/detailDataAction";
import style from "./employmentNoticeItem.less";

class EmploymentNoticeItem extends React.Component {
    constructor(props) {
        super(props);
        // 아이템 선택 시 이벤트
        this.selectItem = this.selectItem.bind(this);
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

    selectItem(e) {
        console.log("[EmploymentNoticeItem] selectItem");
        DetailDataAction.showDetailPage(GD.TYPE.EMPLOYMENT_NOTICE_DETAIL, this.props.itemData);
    };

    render() {
        return (
            <div
                className={"item index_" + this.props.index}
                onClick={this.selectItem}>
                <span className="companyName">{this.props.itemData.CMPNY_NM}</span>
                <span className="companyJobCode">{this.props.itemData.JOBCODE_NM}</span>
                <div className="companyAddress">
                    <strong>근무예정지 </strong>
                    <span>{this.props.itemData.WORK_PARAR_BASS_ADRES_CN}</span>
                </div>
                <div className="closingDate">
                    <strong>마감기한 </strong>
                    <span>{this.props.itemData.RCEPT_CLOS_NM}</span>
                </div>
            </div>
        )
    };
}
export default EmploymentNoticeItem;