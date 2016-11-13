(function () {
    var text = $('textarea');
    var resultText = $('.result');
    var counter = $('.counter');
    var selectLang = document.createDocumentFragment();
    var selects = document.createElement('select');
    var content = $('.content');

    function $ (domElement) {
        return document.querySelector(domElement);
    };

    function countWords(x){
        x = x.replace(/(^\s*)|(\s*$)/gi,"");
        x = x.replace(/[ ]{2,}/gi," ");
        x = x.replace(/\n /,"\n");
        return x.split(' ').length;
    }

    document.addEventListener('keydown', function (e) {
        if(e.keyIdentifier === 'U+0008') {
            var textVal = text.value;
            counter.querySelector('span').innerHTML = countWords(textVal);
        }
    }, false);

    function getLanguage() {
        var xhr = new XMLHttpRequest();
        var result = text.value;
        xhr.open('GET', 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20151216T091313Z.36f5010f3318962e.c6a30c8dabebb65c0e150587decbeed86eaf27ef', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.status === 200) {
                var xhrAnswer = JSON.parse(xhr.responseText);
                var lang = xhrAnswer.dirs;
                for (var i = 0; i < lang.length; i++) {
                    var options = document.createElement('option');
                    options.textContent = lang[i];
                    selects.appendChild(options)
                }
                selectLang.appendChild(selects);
                content.appendChild(selectLang);
            } else {
                console.log( xhr.responseText );
            };
        }
    };
    getLanguage();

    text.addEventListener('textInput', takeTranslate);

    function takeTranslate () {
        var selectedLang = selects[selects.selectedIndex].value;
        var textVal = text.value;
        counter.querySelector('span').innerHTML = countWords(textVal);

        var xhr = new XMLHttpRequest();
        var result = text.value;

        var params = 'key=trnsl.1.1.20151216T091313Z.36f5010f3318962e.c6a30c8dabebb65c0e150587decbeed86eaf27ef'+ '&lang='+ selectedLang + '&text='+ result;
        xhr.open('POST', 'https://translate.yandex.net/api/v1.5/tr.json/translate', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);

        xhr.onreadystatechange = function() {
            if (xhr.status === 200) {
                var text = JSON.parse(xhr.responseText);
                resultText.innerHTML = String(text.text);
            } else {
                console.log( xhr.responseText );
            };
        }
    };
})();
