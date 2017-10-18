var markdownDom = document.getElementById('markdown');
var contentDom = document.getElementById('dxedit');
var oBtn = document.getElementById('submit');

var timer = null;

contentDom.oninput = function () {

    var that = this;
    if (timer !== null) {
        return;
    }

    timer = setTimeout(function () {
        markdownDom.innerHTML = marked(that.value);
        timer = null;
    }, 500);

};


oBtn.onclick = function () {

    fetch('/admin/post', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: document.getElementById('post-title').value,
            content: contentDom.value,
            tag: document.getElementById('post-tag').value
        })
    }).then(function (response) {
        return response.json()
    }).then(function (json) {
        console.log(json)
    }).catch(function (e) {
        console.log(e)
    })
};