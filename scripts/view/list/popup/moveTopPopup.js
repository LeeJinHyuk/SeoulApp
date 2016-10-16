/**
 * Created by eerto_000 on 2016-10-16.
 */
/**
 * Created by eerto_000 on 2016-10-10.
 */
import React from "react";
import GD from "../../../globalData";
import style from "./moveTopPopup.less";

class MoveTopPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoveScroll : false
        };

        // 맨위로 버튼 선택 시 이벤트 등록
        this.clickUpButton = this.clickUpButton.bind(this);
        // 스크롤에 따라 맨위로 버튼 노출 미노출 설정하는 이벤트 등록
        this.displayUpButton = this.displayUpButton.bind(this);
    };

    // componentWillMount() {
    //     console.log("[MoveTopPopup] componentWillMount");
    //
    // };

    componentDidMount() {
        console.log("[MoveTopPopup] componentDidMount");
        window.addEventListener("scroll", this.displayUpButton);
    };

    // componentWillReceiveProps(nextProps) {
    //     console.log("[MoveTopPopup] componentWillReceiveProps");
    //
    // };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("[MoveTopPopup] shouldComponentUpdate");
    //
    // };

    // componentWillUpdate(nextProps, nextState) {
    //     console.log("[MoveTopPopup] componentWillUpdate");
    // };
    //
    // componentDidUpdate(prevProps, prevState) {
    //     console.log("[MoveTopPopup] componentDidUpdate");
    // };

    componentWillUnmount() {
        console.log("[MoveTopPopup] componentWillUnmount");
        window.removeEventListener("scroll", this.displayUpButton);
    };

    clickUpButton(e) {
        window.document.body.scrollTop = 0;
        this.setState({
            isMoveScroll : false
        });
    };

    displayUpButton(e) {
        let scrollTop = e.srcElement.body.scrollTop;

        if (scrollTop > 0) {
            if (this.state.isMoveScroll === false) {
                this.setState({
                    isMoveScroll : true
                });
            }
        } else {
            this.setState({
                isMoveScroll : false
            });
        }
    };


    render() {
        return (
            this.state.isMoveScroll === true
                ?
                <div
                    className="moveTop"
                    onClick={this.clickUpButton}>
                    <span>맨위로</span>
                </div>
                :
                null
        )
    };
}
export default MoveTopPopup;