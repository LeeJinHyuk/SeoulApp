/**
 * Created by eerto_000 on 2016-08-28.
 */
import Reflux from "reflux";
import Superagent from "superagent";
import SuperagentJsonp from "superagent-jsonp";
import SeoulApiAction from "../action/seoulApiAction";

let SeoulApiStore = Reflux.createStore({
    listenables : [SeoulApiAction],

    init : function() {
        // 초기화
        this.data = {
            query : "param=ServiceKey=HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%252BPGfe%252BiUOMDUlk0P1%252FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%253D%253D" +
            "%26s_page=1%26s_list=1%26type=json%26numOfRows=200%26pageNo=1"
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
        Superagent.get("http://api.data.go.kr/openapi/379bee0d-9545-4436-b039-53c5444da34f")
            .use(SuperagentJsonp({
                timeout : 3000
            }))
            .query(this.data.query)
            .end(function(err, res){
                console.log(err);
                console.log(res);
            });


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

