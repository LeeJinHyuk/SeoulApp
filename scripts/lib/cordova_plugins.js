cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-toaster.notification",
        "file": "plugins/cordova-plugin-toaster/www/toaster.js",
        "pluginId": "cordova-plugin-toaster",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-toaster": "0.0.1"
};
// BOTTOM OF METADATA
});