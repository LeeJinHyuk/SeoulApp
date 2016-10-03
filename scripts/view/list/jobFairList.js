/**
 * Created by eerto_000 on 2016-08-03.
 */
import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GD from "../../globalData";
import JobFairItem from "./jobFairItem";
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
        // 리스트 아이템 생성
        this.makeItem = this.makeItem.bind(this);
    };

    // componentWillMount() {
    //     console.log("[JobFairList] componentWillMount");
    //
    // };

    // componentDidMount() {
    //     console.log("[JobFairList] componentDidMount");
    //
    // };

    componentWillReceiveProps(nextProps) {
        console.log("[JobFairList] componentWillReceiveProps");
        this.rearrangeListData(nextProps);
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[JobFairList] shouldComponentUpdate");
    //
    // };

    // componentWillUpdate(nextProps, nextState) {
    //     console.log("[JobFairList] componentWillUpdate");
    //
    // };

    // componentDidUpdate(prevProps, prevState) {
    //     console.log("[JobFairList] componentDidUpdate");
    //
    // };

    // componentWillUnMount() {
    //     console.log("[JobFairList] componentWillUnMount");
    //
    // };

    rearrangeListData(nextProps) {
        let currentYear;
        let tmpListData;

        if (this.state.listMode === GD.JOBLISTMODE.TOTAL) {
            // 전체 데이터
            this.setState({
                listData : nextProps.listData
            });
        } else {
            // 이번 년도 데이터
            currentYear = new Date().getFullYear().toString();

            if (nextProps.listData) {
                // listData 가 존재하고 현재 년도에 해당하는 데이터만 추출
                tmpListData = nextProps.listData.filter(function(item, index, array) {
                    if (currentYear === item.JOBFAIR_YEAR) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            this.setState({
                listData : tmpListData
            });
        }
    };

    makeItem() {
        let itemTag = [];

        if (this.state.listData) {
            this.state.listData.map((item, i) => {
                itemTag.push(
                    <JobFairItem
                        itemData={item}
                        key={i}
                    >
                    </JobFairItem>
                );
            });
        } else {
            itemTag = null;
        }

        return itemTag;
    };

    render() {
        return (
            this.state.listData !== undefined
                ?
                <div className="jobFairList">
                    <div className="conditionTab">
                        {
                            this.state.listMode === GD.JOBLISTMODE.TOTAL
                                ?
                                <span>전체기간</span>
                                :
                                <span>{new Date().getFullYear().toString()}</span>
                        }
                    </div>
                    {this.makeItem()}
                    <div className="conditionPopup deactivate">
                        <ul>
                            <li>전체기간</li>
                            <li>{new Date().getFullYear().toString()}</li>
                        </ul>
                    </div>
                </div>
                :
                null
        )
    };
}
export default JobFairList;