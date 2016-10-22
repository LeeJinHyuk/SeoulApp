/**
 * Created by eerto_000 on 2016-09-25.
 */
const GD = {
    TITLE : {
        APP : "서울잡",
        JOBFAIR : "취업박람회",
        EMPLOYMENT_NOTICE : "채용공고",
        JOBFAIR_DETAIL : "취업박람회 상세보기",
        EMPLOYMENT_DETAIL : "채용공고 상세보기"
    },
    TYPE : {
        JOBFIARLIST : "jobFiarList",
        EMPLOYMENT_NOTICE_LIST : "employmentNoticeList",
        JOBFAIR_DETAIL : "jobfairDetail",
        EMPLOYMENT_NOTICE_DETAIL : "employmentNoticeDetail"
    },
    API : {
        jobFairUrl :
            "http://openapi.seoul.go.kr:8088/4150495f3231303670726f6f636f737330/json/JobFairInfo/1/999/",
        employmentNoticeUrl :
            "http://openapi.seoul.go.kr:8088/4150495f3231303670726f6f636f737330/json/GetJobInfo/1/1000/"        
    },
    NAVITYPE : {
        JOBFAIR: 0, // 취업설명회 타입
        EMPLOYMENT_NOTICE: 1, // 채용공고 타입
        JOBFAIR_DETAIL: 2, // 취업설명회 상세화면 타입
        EMPLOYMENT_NOTICE_DETAIL : 3 // 채용공고 상세화면 타입
    },
    STORAGE_KEY : {
        JOBFAIR : "jobfair", // 취업설명회 로컬 스토리지 키
        EMPLOYMENT_NOTICE : "recurit" // 채용공고 로컬 스토리지 키
    },
    JOBLISTMODE : {
        TOTAL : 0, // 취업설명회 리스트 전체
        CURRENT_YEAR : 1 // 취업설명회 이번 년도
    },
    EMPLOYMENTNOTICELISTMODE : {
        NORMAL : 0, // 검색없이 일반 상태
        SEARCH : 1 // 조건 선택으로 검색한 상태
    },
    APICALL_TYPE : {
        START : 0, // 시작 시 API CALL
        TAB : 1 // TAB 으로 API CALL
    },
    REGION : [
        {NAME : "강남구", CODE : "01"},
        {NAME : "강동구", CODE : "02"},
        {NAME : "강북구", CODE : "03"},
        {NAME : "강서구", CODE : "04"},
        {NAME : "구로구", CODE : "05"},
        {NAME : "금천구", CODE : "06"},
        {NAME : "관악구", CODE : "07"},
        {NAME : "광진구", CODE : "08"},
        {NAME : "노원구", CODE : "09"},
        {NAME : "도봉구", CODE : "10"},
        {NAME : "동대문구", CODE : "11"},
        {NAME : "동작구", CODE : "12"},
        {NAME : "마포구", CODE : "13"},
        {NAME : "서대문구", CODE : "14"},
        {NAME : "서초구", CODE : "15"},
        {NAME : "성동구", CODE : "16"},
        {NAME : "성북구", CODE : "17"},
        {NAME : "송파구", CODE : "18"},
        {NAME : "은평구", CODE : "19"},
        {NAME : "양천구", CODE : "20"},
        {NAME : "영등포구", CODE : "21"},
        {NAME : "용산구", CODE : "22"},
        {NAME : "종로구", CODE : "23"},
        {NAME : "중랑구", CODE : "24"},
        {NAME : "중구", CODE : "25"}
    ]
}

export default GD;