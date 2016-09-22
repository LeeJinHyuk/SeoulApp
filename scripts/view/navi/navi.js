/**
 * Created by eerto_000 on 2016-08-03.
 */
import React from "react";

class Navi extends React.Component {
    constructor(props) {
        super(props);

    };

    componentWillMount() {
        console.log("[Navi] componentWillMount");

    };

    componentDidMount() {
        console.log("[Navi] componentDidMount");

    };

    componentWillReceiveProps(nextProps) {
        console.log("[Navi] componentWillReceiveProps");

    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[Navi] shouldComponentUpdate");

    };

    componentWillUpdate(nextProps, nextState) {
        console.log("[Navi] componentWillUpdate");

    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[Navi] componentDidUpdate");

    };

    componentWillUnMount() {
        console.log("[Navi] componentWillUnMount");

    };

    render() {
        return (
            <div>
                <span></span>
                <div>
                    <span>설명회</span><span>공고</span>
                </div>
            </div>
        )
    };

    export default Navi;