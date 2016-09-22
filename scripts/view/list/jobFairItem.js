/**
 * Created by eerto_000 on 2016-09-22.
 */
import React from "react";
    
class JobFairItem extends React.Component {
    constructor(props) {
        super(props);

    };

    componentWillMount() {
        console.log("[JobFairItem] componentWillMount");

    };

    componentDidMount() {
        console.log("[JobFairItem] componentDidMount");

    };

    componentWillReceiveProps(nextProps) {
        console.log("[JobFairItem] componentWillReceiveProps");

    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[JobFairItem] shouldComponentUpdate");

    };

    componentWillUpdate(nextProps, nextState) {
        console.log("[JobFairItem] componentWillUpdate");

    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[JobFairItem] componentDidUpdate");

    };

    componentWillUnMount() {
        console.log("[JobFairItem] componentWillUnMount");

    };

    render() {
        return (
            <li></li>
        )
    };

    export default JobFairItem;
