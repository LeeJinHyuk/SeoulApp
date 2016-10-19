/**
 * Created by eerto_000 on 2016-09-22.
 */
import React from "react";
import style from "./jobFairItem.less";
    
class JobFairItem extends React.Component {
    constructor(props) {
        super(props);

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

    render() {
        return (
            <div className={"item index_" + this.props.index}>
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
