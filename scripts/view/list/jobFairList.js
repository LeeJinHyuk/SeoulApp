/**
 * Created by eerto_000 on 2016-08-03.
 */
import React from "react";
import GD from "../../globalData";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from "./jobFairList.less";

class JobFairList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listMode : GD.JOBLISTMODE.TOTAL,
            listData : undefined
        };

        // shouldComponentUpdate 성능 향상 모듈 실행
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 전달 받은 리스트 데이터를 모드에 맞게 변경
        this.rearrangeListData = this.rearrangeListData.bind(this);
    };

    componentWillMount() {
        console.log("[JobFairList] componentWillMount");
        rearrangeListData();
    };

    // componentDidMount() {
    //     console.log("[JobFairList] componentDidMount");
    //
    // };

    // componentWillReceiveProps(nextProps) {
    //     console.log("[JobFairList] componentWillReceiveProps");
    //
    // };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[JobFairList] shouldComponentUpdate");
    //
    // };

    // componentWillUpdate(nextProps, nextState) {
    //     console.log("[JobFairList] componentWillUpdate");
    //
    // };
    //
    // componentDidUpdate(prevProps, prevState) {
    //     console.log("[JobFairList] componentDidUpdate");
    //
    // };

    // componentWillUnMount() {
    //     console.log("[JobFairList] componentWillUnMount");
    //
    // };

    rearrangeListData() {
        let currentYear;
        let tmpListData;

        if (this.state.listMode === GD.JOBLISTMODE.TOTAL) {
            // 전체 데이터
            this.state({
                listData : this.props.listData
            });
        } else {
            // 이번 년도 데이터
            currentYear = new Date().getFullYear().toString();
            
            if (this.props.listData) {
                // listData 가 존재하고 현재 년도에 해당하는 데이터만 추출
                tmpListData = this.props.listData.filter(function(item, index, array) {
                    if (currentYear === item.JOBFAIR_YEAR) {
                        return true;
                    } else {
                        return false;
                    }
                });   
            }
            
            this.state({
                listData : tmpListData
            });
        }
    }

    render() {
        return (

            <div className="">
                <ul>
                    
                </ul>
            </div>
        )
    };

export default JobFairList;
}