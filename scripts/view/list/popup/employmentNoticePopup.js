/**
 * Created by eerto_000 on 2016-10-10.
 */
import React from "react";
import GD from "../../../globalData";
import style from "./employmentNoticePopup.less";

class EmploymentNoticePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActivateTab : false,
            selectedItem : [],
            isMax : false
        };

        // 지역 아이템 리스트 태그 생성
        this.makeRegionItem = this.makeRegionItem.bind(this);
        // 선택된 아이템 리스트 태그 생성
        this.makeseletecItem = this.makeseletecItem.bind(this);
        // 지역 아이템 선택시 실행될 콜백
        this.selectRegionItem = this.selectRegionItem.bind(this);
        // 선택된 아이템 선택시 실행될 콜백
        this.deleteSelectedRegionItem = this.deleteSelectedRegionItem.bind(this);
        // 팝업 노출 상태에서 빈공간 선택시 실행될 콜백
        this.selectEmptySpace = this.selectEmptySpace.bind(this);
        // 지역 선택란 선택 시 실행될 콜백
        this.openReginList = this.openReginList.bind(this);
    };

    // componentWillMount() {
    //     console.log("[EmploymentNoticePopup] componentWillMount");
    //
    // };

    // componentDidMount() {
    //     console.log("[EmploymentNoticePopup] componentDidMount");
    //
    // };

    // componentWillReceiveProps(nextProps) {
    //     console.log("[EmploymentNoticePopup] componentWillReceiveProps");
    //
    // };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[EmploymentNoticePopup] shouldComponentUpdate");
    //
    // };

    // componentWillUpdate(nextProps, nextState) {
    //     console.log("[EmploymentNoticePopup] componentWillUpdate");
    //
    // };
    //
    // componentDidUpdate(prevProps, prevState) {
    //     console.log("[EmploymentNoticePopup] componentDidUpdate");
    //
    // };
    //
    // componentWillUnMount() {
    //     console.log("[EmploymentNoticePopup] componentWillUnMount");
    //
    // };
    makeRegionItem() {
        let itemTag = [];
        let that = this;

        GD.REGION.map((item, i) =>{
            itemTag.push(
                <li
                    className={item.CODE}
                    key={i}
                    onClick={that.selectRegionItem}>
                    {item.NAME}
                </li>
            );
        });
        return itemTag;
    };

    makeseletecItem() {
        let itemTag = [];
        let that = this;

        if (this.state.selectedItem.length > 0) {
            this.state.selectedItem.map((item, i) =>{
                itemTag.push(
                    <li
                        onClick={that.deleteSelectedRegionItem}
                        key={i}>
                        {item}
                    </li>
                );
            });
        } else {
            itemTag = null;
        }

        return itemTag;
    };

    selectRegionItem(e) {

    };

    deleteSelectedRegionItem(e) {

    };

    selectEmptySpace(e) {

    };

    openReginList(e) {
        this.setState({
            isActivateTab : true
        });
    };

    render() {
        return (
            <div
                className="conditionPopup"
                onClick={this.selectEmptySpace}>
                <div className="region">
                    <div className="selectRegion">
                        <span>지역</span>
                        <span
                            className={"description" + this.state.isMax === true ? " isMax" : ""}
                            onClick={this.openReginList}>
                            지역을 선택하세요.
                        </span>
                        <ul
                            className={this.state.isActivateTab === true ? "activateTab" : "deactivateTab"}>
                            {this.makeRegionItem()}
                        </ul>
                        <span>최대 3개까지 선택가능</span>
                    </div>
                    <div className="selectedRegion">
                        {
                            this.state.selectedItem.length > 0
                                ?
                                <ul>
                                    {this.makeseletecItem()}
                                </ul>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    };
}
export default EmploymentNoticePopup;