/**
 * Created by eerto_000 on 2016-10-28.
 */

class GlobalUtil {
    constructor() {};

    transformTime(data) {
        let hour;
        let min;

        hour = data.slice(0,2);
        min = data.slice(2,4);

        return hour + ":" + min;
    };
};

export default (new GlobalUtil);