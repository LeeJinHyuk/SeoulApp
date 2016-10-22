/**
 * Created by eerto_000 on 2016-09-22.
 */
import React from "react";
import GD from "../../globalData";
import DetailDataAction from "../../action/detailDataAction";
import style from "./jobFairItem.less";
    
class JobFairItem extends React.Component {
    constructor(props) {
        super(props);

        // 아이템 선택 시 이벤트
        this.selectItem = this.selectItem.bind(this);
    };

    componentWillMount() {
        console.log("[JobFairItem] componentWillMount");

    };

    componentDidMount() {
        console.log("[JobFairItem] componentDidMount");

    };

    componentWillReceiveProps(nextProps) {
        console.log("[JobFairItem] componentWillReceiveProps");

    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[JobFairItem] shouldComponentUpdate");
    //
    // };

    componentWillUpdate(nextProps, nextState) {
        console.log("[JobFairItem] componentWillUpdate");

    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[JobFairItem] componentDidUpdate");

    };

    componentWillUnmount() {
        console.log("[JobFairItem] componentWillUnmount");

    };
    
    selectItem(e) {
        console.log("[JobFairItem] selectItem");
        DetailDataAction.showDetailPage(GD.TYPE.JOBFAIR_DETAIL, this.props.itemData);
    };
    
    render() {
        return (
            <div 
                className={"item index_" + this.props.index}
                onClick={this.selectItem}>
                <div className="jabFairTitle">
                    <span className="yearBadge">{this.props.itemData.JOBFAIR_YEAR}</span>
                    <span className="jobFairJoint">{this.props.itemData.JOBFAIR_JOINT_AUSPICES}</span>
                </div>
                <div>
                    <span className="jobFairName">{this.props.itemData.JOBFAIR_NAME}</span>
                </div>
                <div className="jobFairDay">
                    <strong>일자 </strong>
                    <span>{this.props.itemData.JOBFAIR_DATE} </span>
                    <span>{this.props.itemData.JOBFAIR_FRTIME}</span>
                    <span> ~ </span>
                    <span>{this.props.itemData.JOBFAIR_EDTIME}</span>
                </div>
            </div>
        )
    };
}
export default JobFairItem;
