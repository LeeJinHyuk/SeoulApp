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
        let tmpEmploymentNoticeData = localStorage.getItem(GD.STORAGE_KEY.EMPLOYMENT_NOTICE);
        
        this.list = {
            jobFair : tmpJobFairData !== undefined ? JSON.parse(tmpJobFairData) : undefined, // 채용설명회 리스트 데이터
            employmentNotice : tmpEmploymentNoticeData !== undefined ? JSON.parse(tmpEmploymentNoticeData) : undefined // 채용공고 리스트 데이터
        };
    },
    ajaxFactory : function(url, dataType, callType) {
        let that = this;
        $.ajax({
            url: url,
            dataType : dataType,
            method : "GET",
            cache : true,
            success : function(data, text, xhr) {
                console.log("[SeoulApiStore] success");
                if (url.indexOf("JobFairInfo") > -1) {
                    if (data && data.JobFairInfo && data.JobFairInfo.RESULT &&
                        data.JobFairInfo.RESULT.CODE === "INFO-000" &&
                        data.JobFairInfo.list_total_count > 0) {
                        localStorage.setItem(GD.STORAGE_KEY.JOBFAIR, JSON.stringify(data.JobFairInfo.row));
                        that.list.jobFair = data.JobFairInfo.row;
                    } else {
                        that.list.jobFair = undefined;
                    }
                    // 취업 설명회 데이터 수신 완료 되더라도 채용 공고 수신이 완료되지 않기 때문에 trigger하지 않는다.
                    //that.trigger(that.list.jobFair, that.TYPE.JOBFIARLIST, that.TYPE);
                } else if (url.indexOf("GetJobInfo") > -1) {
                    let tokenArray;
                    let newUrl;

                    if (data && data.GetJobInfo && data.GetJobInfo.RESULT &&
                        data.GetJobInfo.RESULT.CODE === "INFO-000" &&
                        data.GetJobInfo.list_total_count > 0) {

                        if (that.list.employmentNotice) {
                            // 데이터 존재
                            that.list.employmentNotice =
                                that.list.employmentNotice.concat(data.GetJobInfo.row);
                        } else {
                            // 데이터 미존재. 첫 시도
                            that.list.employmentNotice = data.GetJobInfo.row;
                        }

                        tokenArray = url.split("/");
                        console.log("tokenArray : " + JSON.stringify(tokenArray));
                        newUrl = tokenArray[0] + "/" + tokenArray[1] + "/" + tokenArray[2] + "/" + tokenArray[3] + "/" +
                            tokenArray[4] + "/" + tokenArray[5] + "/" +
                            (Number(tokenArray[6], 10) + 1000) + "/" + (Number(tokenArray[7], 10) + 1000) + "/";
                        console.log("newUrl : " + newUrl);
                        if (data.GetJobInfo.list_total_count > (Number(tokenArray[6], 10) + 1000)) {
                            // 총 데이터가 시작보다 클 경우 추가 요청
                            if (callType === GD.APICALL_TYPE.START) {
                                // 첫 스타트일 경우 첫 데이터 1000개만 가지고온 후 트리거 하여 로딩을 제거
                                // 나머지는 비동기로 백그라운드에서 계속 요청하면서 갱신한다.
                                that.trigger(that.list.jobFair, that.TYPE.JOBFIARLIST, that.TYPE);
                            }
                            that.ajaxFactory(newUrl, "jsonp");
                        } else {
                            // 총 데이터가 더 작을 경우 요청 중지
                            // TODO 지금은 첫요청만 처리하기 때문에 여기서 트리거하는 부분이 없지만
                            // TODO 새로고침 기능이 추가되면 타입에 따라 여기서도 트리거를 해줘야한다.
                            localStorage.setItem(GD.STORAGE_KEY.EMPLOYMENT_NOTICE, JSON.stringify(that.list.employmentNotice));
                        }
                    } else {
                        that.list.employmentNotice = undefined;
                        that.trigger(that.list.jobFair, that.TYPE.JOBFIARLIST, that.TYPE);
                    }
                    
                }
            },
            error : function (xhr, text, error) {
                console.log("[SeoulApiStore] error");
            }
        });
    },
    onGetJobFairList(callType) {
        // 취업 설명회 리스트 요청 API
        console.log("[SeoulApiStore] onGetJobFairList");
        if (this.list.jobFair) {
            // 이미 받아온 데이터가 존재할 경우 로컬스토리지 데이터 사용
            console.log("[SeoulApiStore] onGetJobFairList local data");
            this.trigger(this.list.jobFair, GD.TYPE.JOBFIARLIST, GD.TYPE);
        } else {
            // 없는 경우 서버에서 데이터 요청
            console.log("[SeoulApiStore] onGetJobFairList server data");
            this.ajaxFactory(GD.API.jobFairUrl, "jsonp");
        }
    },
    onGetEmploymentNoticeList(callType) {
        console.log("[SeoulApiStore] onGetEmploymentNoticeList");
        if (this.list.employmentNotice) {
            // 이미 받아온 데이터가 존재할 경우 로컬스토리지 데이터 사용
            console.log("[SeoulApiStore] onGetEmploymentNoticeList local data");
            if (callType === GD.APICALL_TYPE.TAB) {
                this.trigger(this.list.employmentNotice, GD.TYPE.EMPLOYMENT_NOTICE_LIST, GD.TYPE);
            }
        } else {
            // 없는 경우 서버에서 데이터 요청
            console.log("[SeoulApiStore] onGetEmploymentNoticeList server data");
            this.ajaxFactory(GD.API.employmentNoticeUrl, "jsonp", callType);
        }
    }

});

export default SeoulApiStore;

