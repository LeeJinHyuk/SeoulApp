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
            listData : undefined,
            conditionMode : false
        };

        // shouldComponentUpdate 성능 향상 모듈 실행
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 전달 받은 리스트 데이터를 모드에 맞게 변경
        this.rearrangeListData = this.rearrangeListData.bind(this);
        // 리스트 아이템 생성
        this.makeItem = this.makeItem.bind(this);
        // 리스트 모드 변경
        this.openConditionPopup = this.openConditionPopup.bind(this);
        // 하단 리스트 모드 변경 팝업의 스타일 설정
        this.setSeletedCondition = this.setSeletedCondition.bind(this);
        // 리스트 모드 변경 팝업에서 선택
        this.selectCondition = this.selectCondition.bind(this);
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
                listData : nextProps.listData,
                conditionMode : false
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
                listData : tmpListData,
                conditionMode : false
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
                        index={i}
                    >
                    </JobFairItem>
                );
            });
        } else {
            itemTag = null;
        }

        return itemTag;
    };

    openConditionPopup(e) {
        this.setState({
            conditionMode : true
        });
    };

    setSeletedCondition(mode) {
        if (mode === GD.JOBLISTMODE.TOTAL) {
            if (this.state.listMode === GD.JOBLISTMODE.TOTAL) {
                return "activate";
            } else {
                return "";
            }
        } else {
            if (this.state.listMode === GD.JOBLISTMODE.CURRENT_YEAR) {
                return "activate";
            } else {
                return "";
            }
        }
    };
    selectCondition(e) {
        let tmpListData = [];
        let currentYear;

        if (e.target.className.indexOf("conditionPopup") > -1) {
            // 배경 선택 시 이벤트. condition popup 만 닫힌다.
            this.setState({
                conditionMode : false
            });
        } else if (e.target.className.indexOf("total") > -1) {
            // 전체 기간 선택 시 이벤트.
            if (this.state.listMode === GD.JOBLISTMODE.TOTAL) {
                this.setState({
                    conditionMode : false
                });
            } else {
                this.setState({
                    conditionMode : false,
                    listData : this.props.listData,
                    listMode : GD.JOBLISTMODE.TOTAL
                });
            }
        } else {
            // 현재 년도 선택 시 이벤트.
            e.stopPropagation();
            if (this.state.listMode === GD.JOBLISTMODE.CURRENT_YEAR) {
                this.setState({
                    conditionMode : false
                });
            } else {
                currentYear = new Date().getFullYear().toString();

                tmpListData = this.props.listData.filter(function(item, index, array) {
                    if (currentYear === item.JOBFAIR_YEAR) {
                        return true;
                    } else {
                        return false;
                    }
                });

                this.setState({
                    conditionMode : false,
                    listData : tmpListData,
                    listMode : GD.JOBLISTMODE.CURRENT_YEAR
                });
            }
        }
    };

    render() {
        return (
            this.state.listData !== undefined
                ?
                <div className="jobFairList">
                    <div className="conditionTab" onClick={this.openConditionPopup}>
                        {
                            this.state.listMode === GD.JOBLISTMODE.TOTAL
                                ?
                                <span>전체기간</span>
                                :
                                <span>{new Date().getFullYear().toString()}</span>
                        }
                    </div>
                    {this.makeItem()}
                    {
                        this.state.conditionMode === true
                            ?
                            <div
                                className="conditionPopup"
                                onClick={this.selectCondition}>
                                <ul>
                                    <li
                                        className={"total " + this.setSeletedCondition(GD.JOBLISTMODE.TOTAL)}
                                        onClick={this.selectCondition}>
                                        전체기간
                                    </li>
                                    <li
                                        className={"current " + this.setSeletedCondition(GD.JOBLISTMODE.CURRENT_YEAR)}
                                        onClick={this.selectCondition}>
                                        {new Date().getFullYear().toString()}
                                    </li>
                                </ul>
                            </div>
                            :
                            null
                    }
                </div>
                :
                null
        )
    };
}
export default JobFairList;