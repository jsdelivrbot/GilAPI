function prettyPrint() {
    var ugly = document.getElementById('myTextArea').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('myTextArea').value = pretty;
}