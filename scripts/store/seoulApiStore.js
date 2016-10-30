/**
 * Created by eerto_000 on 2016-08-28.
 */
import Reflux from "reflux";
import $ from "jquery";
import GD from "../globalData";
import SeoulApiAction from "../action/seoulApiAction";

let SeoulApiStore = Reflux.createStore({
    listenables: [SeoulApiAction],

    init: function () {
        let tmpJobFairData = localStorage.getItem(GD.STORAGE_KEY.JOBFAIR);
        let tmpEmploymentNoticeData = localStorage.getItem(GD.STORAGE_KEY.EMPLOYMENT_NOTICE);

        this.list = {
            jobFair: tmpJobFairData !== undefined ? JSON.parse(tmpJobFairData) : undefined, // 채용박람회 리스트 데이터
            employmentNotice: tmpEmploymentNoticeData !== undefined ? JSON.parse(tmpEmploymentNoticeData) : undefined // 채용공고 리스트 데이터
        };
    },
    ajaxFactory: function (url, dataType, callType) {
        let that = this;

        $.ajax({
            url: url,
            dataType: dataType,
            method: "GET",
            cache: true,
            success: function (data, text, xhr) {
                console.log("[SeoulApiStore] success");
                if (url.indexOf("JobFairInfo") > -1) {
                    if (data && data.JobFairInfo && data.JobFairInfo.RESULT &&
                        data.JobFairInfo.RESULT.CODE === "INFO-000" &&
                        data.JobFairInfo.list_total_count > 0) {
                        // 취업 박람회 데이터 수신 성공
                        localStorage.setItem(GD.STORAGE_KEY.JOBFAIR, JSON.stringify(data.JobFairInfo.row));
                        that.list.jobFair = data.JobFairInfo.row;
                    } else {
                        // 취업 박람회 데이터 수신 실패
                        that.list.jobFair = undefined;
                    }
                } else if (url.indexOf("GetJobInfo") > -1) {
                    let tokenArray;
                    let newUrl;

                    if (data && data.GetJobInfo && data.GetJobInfo.RESULT &&
                        data.GetJobInfo.RESULT.CODE === "INFO-000" &&
                        data.GetJobInfo.list_total_count > 0) {

                        if (that.list.employmentNotice) {
                            // 취업 공고 데이터 존재
                            that.list.employmentNotice =
                                that.list.employmentNotice.concat(data.GetJobInfo.row);
                        } else {
                            // 취업 공고 데이터 미존재. 첫 시도
                            that.list.employmentNotice = data.GetJobInfo.row;
                        }

                        tokenArray = url.split("/");
                        console.log("tokenArray : " + JSON.stringify(tokenArray));
                        newUrl = tokenArray[0] + "/" + tokenArray[1] + "/" + tokenArray[2] + "/" + tokenArray[3] + "/" +
                            tokenArray[4] + "/" + tokenArray[5] + "/" +
                            (Number(tokenArray[6], 10) + 1000) + "/" + (Number(tokenArray[7], 10) + 1000) + "/";

                        if (data.GetJobInfo.list_total_count > (Number(tokenArray[6], 10) + 1000)) {
                            // 총 데이터가 시작보다 클 경우 추가 요청
                            if (callType === GD.APICALL_TYPE.START) {
                                // 첫 스타트일 경우 첫 데이터 1000개만 가지고온 후 트리거 하여 로딩을 제거
                                // 나머지는 비동기로 백그라운드에서 계속 요청하면서 갱신한다.
                                that.trigger(that.list.jobFair, GD.TYPE.JOBFAIRLIST, GD.TYPE);
                            }
                            that.ajaxFactory(newUrl, "jsonp");
                        } else {
                            // 총 데이터가 더 작을 경우 요청 중지
                            localStorage.setItem(GD.STORAGE_KEY.EMPLOYMENT_NOTICE, JSON.stringify(that.list.employmentNotice));
                        }
                    } else {
                        that.list.employmentNotice = undefined;
                        that.trigger(that.list.jobFair, GD.TYPE.JOBFAIRLIST, GD.TYPE);
                    }

                }
            },
            error: function (xhr, text, error) {
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
            this.trigger(this.list.jobFair, GD.TYPE.JOBFAIRLIST, GD.TYPE);
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

