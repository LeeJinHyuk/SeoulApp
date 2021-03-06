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
        this.openRegionList = this.openRegionList.bind(this);
        // 검색 버튼 선택
        this.searchData = this.searchData.bind(this);
        // 뒤로가기 버튼 이벤트
        this.backButtonEvent = this.backButtonEvent.bind(this);
    };

    componentDidMount() {
        console.log("[EmploymentNoticePopup] componentDidMount");
        document.addEventListener("backbutton", this.backButtonEvent, false);
    };

    componentWillUnmount() {
        console.log("[EmploymentNoticePopup] componentWillUnmount");
        document.removeEventListener("backbutton", this.backButtonEvent, false);
    };
    
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
                        <span className="deleteIcon"></span>
                    </li>
                );
            });
        } else {
            itemTag = null;
        }

        return itemTag;
    };

    selectRegionItem(e) {
        let regionName;
        let tmpSelectedList;
        let isExist = false;

        e.stopPropagation();

        tmpSelectedList = this.state.selectedItem.slice();

        for(let i = 0; i < GD.REGION.length; i++) {
            if (e.target.className === GD.REGION[i].CODE) {
                regionName = GD.REGION[i].NAME;
                break;
            }
        }

        for (let i = 0; i < tmpSelectedList.length; i++) {
            if (regionName === tmpSelectedList[i]) {
                isExist = true;
                break;
            }
        }

        if (isExist === true) {
            // 중복
            this.setState({
                isActivateTab : false
            });
        } else {
            // 신규 등록
            tmpSelectedList.push(regionName);
            if (tmpSelectedList.length === 3) {
                this.setState({
                    isActivateTab : false,
                    selectedItem : tmpSelectedList,
                    isMax : true
                });
            } else {
                this.setState({
                    isActivateTab : false,
                    selectedItem : tmpSelectedList,
                    isMax : false
                });
            }
        }
    };

    deleteSelectedRegionItem(e) {
        let tmpSelectedList;

        e.stopPropagation();

        tmpSelectedList = this.state.selectedItem.slice();
        
        for(let i = 0; i < tmpSelectedList.length; i++) {
            if (tmpSelectedList[i] === (e.target.textContent === "" ? e.target.parentNode.textContent : e.target.textContent)) {
                tmpSelectedList.splice(i, 1);
                break;
            }
        }

        this.setState({
            selectedItem : tmpSelectedList,
            isMax : false
        });
    };

    selectEmptySpace(e) {
        this.props.searchCallback();
    };

    openRegionList(e) {
        e.stopPropagation();
        if (this.state.isMax === false) {
            this.setState({
                isActivateTab : !this.state.isActivateTab
            });
        }
    };

    searchData(e) {
        let filterData;
        let that = this;

        e.stopPropagation();
        
        if (this.state.selectedItem.length > 0) {
            filterData = this.props.listData.filter(function(item, index, array) {
                for(let i = 0; i < that.state.selectedItem.length; i++) {
                    if (item.WORK_PARAR_BASS_ADRES_CN.indexOf(that.state.selectedItem[i]) > -1) {
                        return true;
                    }
                }
                return false;
            });

            if (!filterData) {
                filterData = [];
            }
            this.props.searchCallback(filterData, this.state.selectedItem);
        } else {
            this.props.searchCallback(this.props.listData, []);
        }
    };

    backButtonEvent(e) {
        this.props.searchCallback();
    };

    render() {
        return (
            <div
                className="conditionPopup"
                onClick={this.selectEmptySpace}>
                <div className="region">
                    <div className="selectRegion">
                        <span
                            className={"description" + (this.state.isMax === true ? " isMax" : "")}
                            onClick={this.openRegionList}>
                            지역을 선택하세요.
                            <span className="downArrowIcon"></span>
                        </span>
                        <ul
                            className={this.state.isActivateTab === true ? "activateTab" : "deactivateTab"}>
                            {this.makeRegionItem()}
                        </ul>
                    </div>

                    {
                        this.state.selectedItem.length > 0
                            ?
                            <div className="selectedRegion">
                                <strong>선택된 지역 : </strong>
                                <ul>
                                    {this.makeseletecItem()}
                                </ul>
                            </div>
                            :
                            null
                    }

                    <div
                        className="searchButton"
                        onClick={this.searchData}>
                        <span>검색</span>
                    </div>
                </div>
            </div>
        )
    };
}
export default EmploymentNoticePopup;