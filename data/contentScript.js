// Get selection and limit to only the first word, because vortaro.net
// doesn't support sentences.
function firstWord(text) {
    return text.split(/\s+/, 1)[0].toLowerCase();
}

// Remove -n and -j and present verbs as infinitives
// (replacing -as/is/os with -i).
function normalize(text) {
    if (text.endsWith("n") && text !== "kun") {
        text = text.substring(0, text.length-1);
    }
    if (text.endsWith("j")) {
        text = text.substring(0, text.length-1);
    }
    if (text.endsWith("as") || text.endsWith("is") || text.endsWith("os")) {
        text = text.substring(0, text.length-2) + "i";
    };
    return text;
}

function getSelectionText() {
    var text = window.getSelection().toString();
    text = firstWord(text);
    return normalize(text);
}

self.on("context", function () {
    var text = getSelectionText();
    return "Difinu \"" + text + "\"";
});

self.on("click", function () {
    var text = getSelectionText();
    self.postMessage(text);
});
