/**
 * Created by eerto_000 on 2016-09-25.
 */
const GD = {
    TITLE : {
        JOBFAIR : "취업설명회",
        EMPLOYMENT_NOTICE : "채용공고"
    },
    NAVITYPE : {
        JOBFAIR: 0, // 취업설명회 타입
        EMPLOYMENT_NOTICE: 1, // 채용공고 타입
        DETAIL: 2 // 상세화면 타입
    },
    STORAGE_KEY : {
        JOBFAIR : "jobfair", // 취업설명회 로컬 스토리지 키
        EMPLOYMENT_NOTICE : "recurit" // 채용공고 로컬 스토리지 키
    },
    JOBLISTMODE : {
        TOTAL : 0, // 취업설명회 리스트 전체
        CURRENT_YEAR : 1 // 취업설명회 이번 년도
    }
}

export default GD;