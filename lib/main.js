var tabs = require("sdk/tabs");
var contextMenu = require("sdk/context-menu");

function difinu(vorto) {
    tabs.open("http://vortaro.net/#" + vorto);
}

var getSelectionText = 'var text = window.getSelection().toString();' +
        'if (text.length > 30) text = text.substr(0, 30);';

function createOnEvent(event, action) {
    return 'self.on("' + event + '", function () {' +
        getSelectionText + action +
        '});';
};

function createModifyMenuItemAction() {
    return createOnEvent('context', 'return "Difinu \\\"" + text + "\\\"";');
}

function createHandleClickAction() {
    return createOnEvent('click', 'self.postMessage(text);');
}

function createContentScript() {
    return createModifyMenuItemAction() + createHandleClickAction();
};

var menuItem = contextMenu.Item({
    label: "Elektu vorton!",
    context: contextMenu.SelectionContext(),
    contentScript: createContentScript(),
    accessKey: "D",
    onMessage: function (vorto) {
        console.log(vorto);
        difinu(vorto);
    }
});
