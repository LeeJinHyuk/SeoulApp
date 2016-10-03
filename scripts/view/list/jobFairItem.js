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

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[JobFairItem] shouldComponentUpdate");

    };

    componentWillUpdate(nextProps, nextState) {
        console.log("[JobFairItem] componentWillUpdate");

    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[JobFairItem] componentDidUpdate");

    };

    componentWillUnMount() {
        console.log("[JobFairItem] componentWillUnMount");

    };

    render() {
        return (
            <div className={"item index_" + this.props.index}>
                <div>
                    <span>{this.props.itemData.JOBFAIR_YEAR}</span>
                </div>
                <div>
                    <span>{this.props.itemData.JOBFAIR_NAME}</span>
                </div>
                <div>
                    <span>{this.props.itemData.JOBFAIR_DATE} </span>
                    <span>{this.props.itemData.JOBFAIR_FRTIME}</span>
                    <span> ~ </span>
                    <span>{this.props.itemData.JOBFAIR_EDTIME}</span>
                </div>
                <div>
                    <span>{this.props.itemData.JOBFAIR_JOINT_AUSPICES}</span>
                </div>
            </div>
        )
    };
}
export default JobFairItem;
