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
    },
    {
        "id": "cordova-plugin-backbutton.Backbutton",
        "file": "plugins/cordova-plugin-backbutton/www/Backbutton.js",
        "pluginId": "cordova-plugin-backbutton",
        "clobbers": [
            "navigator.Backbutton"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-toaster": "0.0.1",
    "cordova-plugin-backbutton": "0.3.0",
    "cordova-plugin-splashscreen": "4.0.0"
};
// BOTTOM OF METADATA
});