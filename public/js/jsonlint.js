function prettyPrint() {
    var ugly = document.getElementById('myTextArea').innerText;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('myTextArea').innerText = pretty;
}
function copyToClipboard(text) {
    Copied = text.createTextRange();
    Copied.execCommand("Copy");
}
