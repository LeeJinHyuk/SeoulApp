/**
 * Created by eerto_000 on 2016-08-28.
 */
import Reflux from "reflux";
import Axios from "axios";
import SeoulApiAction from "../action/seoulApiAction";

let SeoulApiStore = Reflux.createStore({
    listenables : [SeoulApiAction],

    init : function() {
        // 초기화
        this.data = {
            serviceKey : "cHRUimkjrM0%2BjLh2rX7x2R6F3VImMURgWUPowbDYyQXHVxX07IT4IyVtz2tjlzOSFxWabBRcIYqj%2BKARZOEsnw%3D%3D",
            s_page : 1,
            s_list : 1,
            type : "json"
        };

        // $.ajax({
        //     post: 'get',
        //     url: 'http://api.data.go.kr/openapi/379bee0d-9545-4436-b039-53c5444da34f',
        //     data: data,
        //     dataType: 'jsonp',
        //     success: function(data){
        //         console.log(data);
        //     }
        // });
        // cHRUimkjrM0%2BjLh2rX7x2R6F3VImMURgWUPowbDYyQXHVxX07IT4IyVtz2tjlzOSFxWabBRcIYqj%2BKARZOEsnw%3D%3D
        // http://api.data.go.kr/openapi/379bee0d-9545-4436-b039-53c5444da34f
    },
    onGetDayCareCenterInformation() {
        console.log("[SeoulApiStore] onGetDayCareCenterInformation");

        Axios.get("http://api.data.go.kr/openapi/379bee0d-9545-4436-b039-53c5444da34f",
            {
                responseType : "json",
                data : this.data
            })
            .then( response => { console.log(response); } ) // SUCCESS
            .catch( response => { console.log(response); } ); // ERROR
    }

});

export default SeoulApiStore;

