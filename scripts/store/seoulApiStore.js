/**
 * Created by eerto_000 on 2016-08-28.
 */
import Reflux from "reflux";
import $ from "jquery";
import SeoulApiAction from "../action/seoulApiAction";

let SeoulApiStore = Reflux.createStore({
    listenables : [SeoulApiAction],

    init : function() {
        this.TYPE = {
            JOBFIARLIST : "jobFiarList",
            RECURITLIST : "recuritList",
            RECURITDETAIL : "recuritDetail"
        };
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
    ajaxFactory : function(url, dataType) {
        let that = this;
        $.ajax({
            url: url,
            dataType : dataType,
            method : "GET",
            cache : true,
            success : function(data, text, xhr) {
                console.log("[SeoulApiStore] success");
                that.trigger(data, that.TYPE.JOBFIARLIST, that.TYPE);
            },
            error : function (xhr, text, error) {
                console.log("[SeoulApiStore] error");
            }
        });
    },
    onGetJobFairList() {
        // 취업 설명회 리스트 요청 API
        console.log("[SeoulApiStore] onGetJobFairList");
        this.ajaxFactory(this.data.jobFairUrl, "jsonp");
    },
    onGetrecuritmentList() {
        // TODO 취업공고 리스트 요청 방법 확인 필요(xml cors)
        console.log("[SeoulApiStore] onGetrecuritmentList");
        this.ajaxFactory(this.data.recruitmentListUrl, "jsonp");
    },
    onGetrecuritDetail(idx) {
        // TODO 취업공고 상세정보 요청 방법 확인 필요(xml cors)
        console.log("[SeoulApiStore] onGetrecuritDetail");
        let requestUrl;
        
        requestUrl = this.data.recruitmentDetailUrl + "?idx=" + idx + 
                "&ServiceKey=HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%2BPGfe%2BiUOMDUlk0P1%2FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%3D%3D" + 
            "&numOfRows=999&pageNo=1";
        this.ajaxFactory(requestUrl, "xml");
    }

});

export default SeoulApiStore;

