var tabs = require("sdk/tabs");
var contextMenu = require("sdk/context-menu");

function difinu(vorto) {
    tabs.open("http://vortaro.net/#" + vorto);
}

var menuItem = contextMenu.Item({
    label: "Elektu vorton!",
    context: contextMenu.SelectionContext(),
    contentScript: 'self.on("context", function () {' +
        '  var text = window.getSelection().toString();' +
        '  if (text.length > 30) text = text.substr(0, 30);' +
        '  return "Difinu \\\"" + text + "\\\"";' +
        '});' +
        'self.on("click", function () {' +
        '  var text = window.getSelection().toString();' +
        '  if (text.length > 30) text = text.substr(0, 30);' +
        '  self.postMessage(text);' +
        '});',
    accessKey: "D",
    onMessage: function (vorto) {
        console.log(vorto);
        difinu(vorto);
    }
});
