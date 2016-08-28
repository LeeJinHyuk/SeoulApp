/**
 * Created by eerto_000 on 2016-08-28.
 */
import Reflux from "reflux";
import SeoulApiAction from "../action/seoulApiAction";

let SeoulApiStore = Reflux.createStore({
    listenables : [SeoulApiAction],

    init : function() {
        // 초기화

    },
    onGetDayCareCenterInformation() {
        console.log("[SeoulApiStore] onGetDayCareCenterInformation");
    }

});

export default SeoulApiStore;

