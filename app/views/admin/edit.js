window.onload = function () {
    var markdownDom = document.getElementById('markdown');
    var contentDom = document.getElementById('dxedit');
    var oBtn = document.getElementById('submit');
    var oTagSubmit = document.getElementById('post-tag-submit');
    var oTag = document.getElementById('post-tag');
    var oTags = document.getElementById('tags');

    var timer = null;
    var id = document.getElementById('postId').value;

    markdownDom.innerHTML = marked(contentDom.value);

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

        fetch('/admin/post/' + id, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: document.getElementById('post-title').value,
                content: contentDom.value
            })
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (json.status === 1) {

            } else {
                alert(json.message)
            }
        }).catch(function (e) {
            console.log(e)
        })
    };


    var tagFlag = false;
    oTagSubmit.onsubmit = function (e) {
        e.preventDefault();
        if (tagFlag === true) {
            return
        }
        if (oTag.value.trim() === '') {
            return;
        }
        checkTag(oTag.value)
    };

    function submitTag() {


        tagFlag = true
        fetch('/admin/tag', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: id, tag: oTag.value})
        }).then(function (response) {
            tagFlag = false
            return response.json()
        }).then(function (json) {
            if (json.status === 0) {
                console.log(json)
            } else if (json.status === 1) {
                appendTag(oTags, json.data)
            }
            oTag.value = ''
        }).catch(function (e) {
            tagFlag = false;
            console.log(e)
        });
    };

    function checkTag(tag) {
        var bs = document.querySelectorAll('.tag b');
        var tags = []
        for (var i = 0; i < bs.length; i++) {
            tags.push(bs[i].innerHTML)
        }

        if (tags.indexOf(tag) === -1) {
            submitTag()
        }

    }

    function appendTag(parent, data) {
        var spans = document.getElementsByClassName('tag');
        var ids = [];
        for (var i = 0; i < spans.length; i++) {
            ids.push(spans[i].getAttribute('data-id'))
        }

        if (ids.indexOf(data.id + '') === -1) {
            var span = document.createElement('span');
            span.className = 'tag';

            span.innerHTML = `<b>${data.tag}</b><i>×</i>`;
            span.setAttribute('data-id', data.id);
            parent.appendChild(span);
        }
    }

    oTags.onclick = function (e) {
        if (e.target.tagName.toLowerCase() === 'i') {
            var tagId = e.target.parentNode.getAttribute('data-id')
            if (tagId) {
                deletePostsTags(id, tagId, e.target)
            }

        }

    };

    function deletePostsTags(postId, tagId, that) {
        fetch('/admin/post-tag/delete',{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId, tagId})
        }).then(response => {
            return response.json()
        }).then(json => {
            console.log(json)
            if (json.status === 1) {
                that.parentNode.parentNode.removeChild(that.parentNode)
            }
        }).catch(e => {
            console.log(e)
        })
    }
};