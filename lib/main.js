var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var contextMenu = require("sdk/context-menu");

function difinu(vorto) {
    tabs.open("http://vortaro.net/#" + vorto);
}

var menuItem = contextMenu.Item({
    label: "Elektu vorton!",
    context: contextMenu.SelectionContext(),
    contentScriptFile: data.url("contentScript.js"),
    accessKey: "D",
    onMessage: function (vorto) {
        console.log(vorto);
        difinu(vorto);
    }
});
