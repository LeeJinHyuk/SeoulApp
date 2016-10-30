/**
 * Created by eerto_000 on 2016-10-09.
 */
import React from "react";
import ReactMixin from "react-mixin";
import Reflux from "reflux";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GD from "../../globalData";
import EmploymentNoticeItem from "./employmentNoticeItem";
import EmploymentNoticePopup from "./popup/employmentNoticePopup";
import DetailView from "../detail/DetailView"
import MoveTopPopup from "./popup/moveTopPopup";
import DetailDataStore from "../../store/detailDataStore";
import style from "./EmploymentNoticeList.less";

@ReactMixin.decorate(Reflux.listenTo(DetailDataStore, "handleDetailData"))
class EmploymentNoticeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listMode : GD.EMPLOYMENTNOTICELISTMODE.NORMAL,
            listData : undefined,
            selectedCondition : [],
            maxPrintData : 20,
            isPrintSearchTab : false
        };

        // shouldComponentUpdate 성능 향상 모듈 실행
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 상세화면 진입
        this.handleDetailData = this.handleDetailData.bind(this);
        // 리스트 아이템 생성
        this.makeItem = this.makeItem.bind(this);
        // 검색 조건 팝업 노출
        this.openConditionPopup = this.openConditionPopup.bind(this);
        // 검색 선택 시 실행 콜백
        this.selectCondition = this.selectCondition.bind(this);
        // 더보기 버튼 선택시 실행 콜백
        this.loadAdditionalData = this.loadAdditionalData.bind(this);
        // 선택된 지역 항목 노출
        this.makeSelectedRegionItem = this.makeSelectedRegionItem.bind(this);
    };

    componentWillMount() {
        console.log("[EmploymentNoticeList] componentWillMount");
        this.setState({
            listData : this.props.listData
        });
    };

    componentWillReceiveProps(nextProps) {
        console.log("[EmploymentNoticeList] componentWillReceiveProps");
        this.setState({
            listData : nextProps.listData
        });
    };

    handleDetailData(result, type, typeList) {
        console.log("[EmploymentNoticeList] handleDetailData");
        let naviType;

        switch(type) {
            case typeList.JOBFAIR_DETAIL:
                naviType = GD.NAVITYPE.JOBFAIR_DETAIL;
                break;
            case typeList.EMPLOYMENT_NOTICE_DETAIL:
                naviType = GD.NAVITYPE.EMPLOYMENT_NOTICE_DETAIL
                break;
        }

        this.setState({
            detailType : naviType,
            detailData : result
        });
    };

    openConditionPopup(e) {
        this.setState({
            isPrintSearchTab : true
        });
    };

    selectCondition(data, selectedCondition) {
        if (data) {
            // 검색 조건으로 검색 시 스크롤 위치 초기화 되도록 수정
            window.document.body.scrollTop = 0;
            // 데이터 존재하면 조건에 따라 리스트 노출
            if (data.length === 0) {
                data = undefined;
            }
            this.setState({
                isPrintSearchTab : false,
                listData : data,
                listMode : GD.EMPLOYMENTNOTICELISTMODE.SEARCH,
                maxPrintData : 20,
                selectedCondition : selectedCondition
            });
        } else {
            // 데이터 없다면 빈공간 선택으로 팝업만 제거
            this.setState({
                isPrintSearchTab : false
            });
        }
    };

    makeItem() {
        let itemTag = [];
        let length = 0;

        if (this.state.listData) {
            length =
                this.state.maxPrintData > this.state.listData.length ? this.state.listData.length : this.state.maxPrintData;
            for (let i = 0; i < length; i++) {
                itemTag.push(
                    <EmploymentNoticeItem
                        itemData={this.state.listData[i]}
                        key={i}
                        index={i}
                    >
                    </EmploymentNoticeItem>
                );
            }
        } else {
            itemTag = null;
        }

        return itemTag;
    };

    makeSelectedRegionItem() {
        let text = "";

        for (let i = 0; i < this.state.selectedCondition.length; i++) {
            text = text + this.state.selectedCondition[i] + " ";
        }

        if (text) {
            return text;
        } else {
            return "모든지역";
        }
    };

    loadAdditionalData(e) {
        if (this.state.maxPrintData < this.state.listData.length) {
            this.setState({
                maxPrintData : this.state.maxPrintData + 20
            });
        }
    };

    render() {
        return (
            this.state.listData !== undefined
                ?
                <div className="employmentNoticeList">
                    {
                        (this.state.detailType === GD.NAVITYPE.JOBFAIR_DETAIL ||
                        this.state.detailType === GD.NAVITYPE.EMPLOYMENT_NOTICE_DETAIL)
                            ?
                            <DetailView
                                item={this.state.detailData}
                                type={this.state.detailType}>
                            </DetailView>
                            :
                            null
                    }
                    <div className="topTab">
                        {
                            this.state.listMode === GD.EMPLOYMENTNOTICELISTMODE.SEARCH
                                ?
                                <div className="totalSearchResult">
                                    <span><strong>검색결과 : </strong>{this.state.listData.length} 개</span>
                                </div>
                                :
                                null
                        }
                        <div
                            className="conditionTab"
                            onClick={this.openConditionPopup}>
                            <span>상세검색</span>
                        </div>
                    </div>
                    {
                        this.state.listMode === GD.EMPLOYMENTNOTICELISTMODE.SEARCH
                            ?
                            <div className="bottomTab">
                                <span>
                                    <strong>검색지역 : </strong>
                                    {this.makeSelectedRegionItem()}
                                </span>
                            </div>
                            :
                            null
                    }
                    {this.makeItem()}
                    {
                        this.state.isPrintSearchTab === true
                            ?
                            <EmploymentNoticePopup
                                listData={this.props.listData}
                                searchCallback={this.selectCondition}>
                            </EmploymentNoticePopup>
                            :
                            null
                    }
                    {
                        <MoveTopPopup>

                        </MoveTopPopup>
                    }
                    {
                        this.state.maxPrintData < this.state.listData.length
                            ?
                            <div
                                className="loadAdditionalData"
                                onClick={this.loadAdditionalData}>
                                <span>더보기</span>
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
export default EmploymentNoticeList;