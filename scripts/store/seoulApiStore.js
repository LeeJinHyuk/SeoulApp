/**
 * Created by eerto_000 on 2016-08-28.
 */
import Reflux from "reflux";
import $ from "jquery";
import GD from "../globalData";
import SeoulApiAction from "../action/seoulApiAction";

let SeoulApiStore = Reflux.createStore({
    listenables : [SeoulApiAction],

    init : function() {
        let tmpJobFairData = localStorage.getItem(GD.STORAGE_KEY.JOBFAIR);

        this.TYPE = {
            JOBFIARLIST : "jobFiarList",
            RECURITLIST : "recuritList",
            RECURITDETAIL : "recuritDetail"
        };
        this.API = {
            jobFairUrl :
                "http://openapi.seoul.go.kr:8088/4150495f3231303670726f6f636f737330/json/JobFairInfo/1/999/",
            recruitmentListUrl :
                "http://openapi.mpm.go.kr/openapi/service/RetrievePblinsttEmpmnInfoService/getList" +
                "?ServiceKey=HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%2BPGfe%2BiUOMDUlk0P1%2FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%3D%3D" +
                "&numOfRows=999&pageNo=1",
            recruitmentDetailUrl :
                "http://openapi.mpm.go.kr/openapi/service/RetrievePblinsttEmpmnInfoService/getItem"
        };
        this.list = {
            jobFair : tmpJobFairData !== undefined ? JSON.parse(tmpJobFairData) : undefined // 채용설명회 리스트 데이터
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
                switch(url) {
                    case that.API.jobFairUrl:
                        if (data && data.JobFairInfo && data.JobFairInfo.RESULT &&
                            data.JobFairInfo.RESULT.CODE === "INFO-000") {
                            localStorage.setItem(GD.STORAGE_KEY.JOBFAIR, JSON.stringify(data));
                            that.trigger(data, that.TYPE.JOBFIARLIST, that.TYPE);
                        } else {
                            that.trigger(undefined, that.TYPE.JOBFIARLIST, that.TYPE);
                        }
                        break;
                }
            },
            error : function (xhr, text, error) {
                console.log("[SeoulApiStore] error");
            }
        });
    },
    onGetJobFairList() {
        // 취업 설명회 리스트 요청 API
        console.log("[SeoulApiStore] onGetJobFairList");
        if (this.list.jobFair) {
            // 이미 받아온 데이터가 존재할 경우 로컬스토리지 데이터 사용
            console.log("[SeoulApiStore] onGetJobFairList local data");
            this.trigger(this.list.jobFair, this.TYPE.JOBFIARLIST, this.TYPE);
        } else {
            // 없는 경우 서버에서 데이터 요청
            console.log("[SeoulApiStore] onGetJobFairList server data");
            this.ajaxFactory(this.API.jobFairUrl, "jsonp");
        }
    },
    onGetrecuritmentList() {
        // TODO 취업공고 리스트 요청 방법 확인 필요(xml cors)
        console.log("[SeoulApiStore] onGetrecuritmentList");
        this.ajaxFactory(this.API.recruitmentListUrl, "jsonp");
    },
    onGetrecuritDetail(idx) {
        // TODO 취업공고 상세정보 요청 방법 확인 필요(xml cors)
        console.log("[SeoulApiStore] onGetrecuritDetail");
        let requestUrl;
        
        requestUrl = this.API.recruitmentDetailUrl + "?idx=" + idx +
                "&ServiceKey=HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%2BPGfe%2BiUOMDUlk0P1%2FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%3D%3D" + 
            "&numOfRows=999&pageNo=1";
        this.ajaxFactory(requestUrl, "xml");
    }

});

export default SeoulApiStore;

