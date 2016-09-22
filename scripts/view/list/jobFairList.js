/**
 * Created by eerto_000 on 2016-08-03.
 */
import React from "react";

class JobFairList extends React.Component {
    constructor(props) {
        super(props);

    };

    componentWillMount() {
        console.log("[JobFairList] componentWillMount");

    };

    componentDidMount() {
        console.log("[JobFairList] componentDidMount");

    };

    componentWillReceiveProps(nextProps) {
        console.log("[JobFairList] componentWillReceiveProps");

    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[JobFairList] shouldComponentUpdate");

    };

    componentWillUpdate(nextProps, nextState) {
        console.log("[JobFairList] componentWillUpdate");

    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[JobFairList] componentDidUpdate");

    };

    componentWillUnMount() {
        console.log("[JobFairList] componentWillUnMount");

    };

    render() {
        return (
            <div>
                <ul>
                    
                </ul>
            </div>
        )
    };

export default JobFairList;
}