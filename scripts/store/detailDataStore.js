/**
 * Created by eerto_000 on 2016-10-22.
 */
import Reflux from "reflux";
import GD from "../globalData";
import DetailDataAction from "../action/detailDataAction";

let DetailDataStore = Reflux.createStore({
    listenables : [DetailDataAction],

    init : function() {

    },
    onShowDetailPage(type, item) {
        console.log("[DetailDataStore] onShowDetailPage");
        this.trigger(item, type, GD.TYPE);
    },
    onHideDetailPage() {
        console.log("[DetailDataStore] onShowDetailPage");
        this.trigger(undefined, undefined, GD.TYPE);
    }
});

export default DetailDataStore;