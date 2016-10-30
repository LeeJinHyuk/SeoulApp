/**
 * Created by eerto_000 on 2016-08-03.
 */
import React from "react";
import GD from "../../globalData";
import style from "./navi.less";

class Navi extends React.Component {
    constructor(props) {
        super(props);

    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[Navi] shouldComponentUpdate");
        // 현재 리스트 보기 모드가 다를 경우에만 랜더링 수행
        return ((this.props.naviType === nextProps.naviType) ? false : true);
    };
    
    render() {
        let activeJabfair = "";
        let activeEmployment = "";

        if (this.props.naviType === GD.NAVITYPE.JOBFAIR) {
            activeJabfair = "activateTitle";
        } else {
            activeEmployment = "activateTitle";
        }
        
        return (
            (this.props.naviType === GD.NAVITYPE.JOBFAIR || this.props.naviType === GD.NAVITYPE.EMPLOYMENT_NOTICE)
                ?
                <div className="navi">
                    <div className="seoulJobIcon"></div>
                    <div className="title">
                        <span>
                            {GD.TITLE.APP}
                        </span>
                    </div>
                    <div className="tab">
                        <span className={activeJabfair} onClick={this.props.changeNaviType}>
                            {GD.TITLE.JOBFAIR}
                        </span>
                        <span className={activeEmployment} onClick={this.props.changeNaviType}>
                            {GD.TITLE.EMPLOYMENT_NOTICE}
                        </span>
                    </div>
                </div>
                :
                <div></div>
        )
    };
}

export default Navi;