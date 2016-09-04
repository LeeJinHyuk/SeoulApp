/**
 * Created by eerto_000 on 2016-08-28.
 */
import Reflux from "reflux";
import $ from "jquery";
import SeoulApiAction from "../action/seoulApiAction";

let SeoulApiStore = Reflux.createStore({
    listenables : [SeoulApiAction],

    init : function() {
        // 초기화
        // this.data = {
        //     query : "param=ServiceKey=HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%252BPGfe%252BiUOMDUlk0P1%252FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%253D%253D" +
        //     "%26s_page=1%26s_list=1%26type=json%26numOfRows=200%26pageNo=1"
        // };
        this.data = {
            serviceKey : "HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%2BPGfe%2BiUOMDUlk0P1%2FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%3D%3D",
            s_page : encodeURIComponent("1"),
            s_list : encodeURIComponent("100"),
            numOfRows : encodeURIComponent("200"),
            pageNo : encodeURIComponent("1"),
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

        $.ajax({
            url: "http://api.data.go.kr/openapi/379bee0d-9545-4436-b039-53c5444da34f",
            dataType : "jsonp",
            method : "GET",
            data : this.data,
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

        // Superagent.get("http://api.data.go.kr/openapi/379bee0d-9545-4436-b039-53c5444da34f")
        //     .use(SuperagentJsonp({
        //         timeout : 3000
        //     }))
        //     .query(this.data.query)
        //     .end(function(err, res){
        //         console.log(err);
        //         console.log(res);
        //     });


        // Superagent.get("http://api.data.go.kr/openapi/379bee0d-9545-4436-b039-53c5444da34f")
        //     .set("Accept", "application/json")
        //     .withCredentials()
        //     .query({data : this.data})
        //     .end(function(err, res){
        //     });


        //
        // Axios.get("http://api.data.go.kr/openapi/379bee0d-9545-4436-b039-53c5444da34f",
        //     {
        //         responseType : "json",
        //         params: {
        //             data: this.data
        //         },
        //     })
        //     .then( response => { console.log(response); } ) // SUCCESS
        //     .catch( response => { console.log(response); } ); // ERROR
    }

});

export default SeoulApiStore;

