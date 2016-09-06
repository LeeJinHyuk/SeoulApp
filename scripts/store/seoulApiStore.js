/**
 * Created by eerto_000 on 2016-08-28.
 */
import Reflux from "reflux";
import $ from "jquery";
import SeoulApiAction from "../action/seoulApiAction";

let SeoulApiStore = Reflux.createStore({
    listenables : [SeoulApiAction],

    init : function() {
        this.data = {
            jobFairUrl :
                "http://openapi.seoul.go.kr:8088/4150495f3231303670726f6f636f737330/json/JobFairInfo/1/999/",
            recruitmentListUrl :
                "http://openapi.mpm.go.kr/openapi/service/RetrievePblinsttEmpmnInfoService/getList" +
                "?ServiceKey=HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%2BPGfe%2BiUOMDUlk0P1%2FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%3D%3D" +
                "&numOfRows=999&pageNo=1",
            recruitmentDetailUrl :
                "http://openapi.mpm.go.kr/openapi/service/RetrievePblinsttEmpmnInfoService/getItem"
        };
    },
    ajaxFactory : function(url) {
        $.ajax({
            url: url,
            dataType : "jsonp",
            method : "GET",
            jsonp : false,
            jsonpCallback: "jsonCallback",
            cache : true,
            success : function(data, text, xhr) {
                console.log("success");
            },
            error : function (xhr, text, error) {
                console.log("error");
            }
        });
    },
    onGetJobFairList() {
        console.log("[SeoulApiStore] onGetJobFairList");
        this.ajaxFactory(this.data.jobFairUrl);
    },
    onGetrecuritmentList() {
        console.log("[SeoulApiStore] onGetrecuritmentList");
        this.ajaxFactory(this.data.recruitmentListUrl);
    },
    onGetrecuritDetail(idx) {
        console.log("[SeoulApiStore] onGetrecuritDetail");
        let requestUrl;
        
        requestUrl = this.data.recruitmentDetailUrl + "?idx=" + idx + 
                "&ServiceKey=HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%2BPGfe%2BiUOMDUlk0P1%2FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%3D%3D" + 
            "&numOfRows=999&pageNo=1";
        this.ajaxFactory(requestUrl);
    }

});

export default SeoulApiStore;

