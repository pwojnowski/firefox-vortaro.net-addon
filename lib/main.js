var tabs = require("sdk/tabs");
var contextMenu = require("sdk/context-menu");

function difinu(vorto) {
    tabs.open("http://vortaro.net/#" + vorto);
}

// Get selection and limit to only the first word, because vortaro.net
// doesn't support sentences.
var getSelectionText = 'var text = window.getSelection().toString();'
        + 'text = text.split(/\\\s+/, 1)[0].toLowerCase();'
        + 'if (text.endsWith("n") && text !== "kun") {'
        + '  text = text.substring(0, text.length-1);'
        + '}'
        + 'if (text.endsWith("j")) {'
        + '  text = text.substring(0, text.length-1);'
        + '}'
        + 'if (text.endsWith("as") || text.endsWith("is") || text.endsWith("os")) {'
        + '  text = text.substring(0, text.length-2) + "i";'
        + '}';

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
