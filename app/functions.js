Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function errorShowMessage(title, content) {
    $.bigBox({
        title: title,
        content: content,
        color: "#C46A69",
        icon: "fa fa-warning shake animated",
        number: '',
        timeout: 6000
    });
}