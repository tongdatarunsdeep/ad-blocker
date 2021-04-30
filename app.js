console.log('a')
window.addEventListener('load', function() {
    var min = 1000000;
    var max = 9999999;
    var tid = 'UA-37174842-27'
    var param = {
        v: 1,
        t: 'event',
        tid: tid,
        ni:'0',
        sr: screen.width + 'x' + screen.height,
        ul: (navigator.language || "").toLowerCase(),
        cid: Math.floor(Math.random() * (max - min + 1) + min),
        dl: window.location.href,
        dr: document.referrer,
        dt: document.title,
        ec:'adblocker',
        ua: navigator.userAgent
        
    }
    var buildParams = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
  
    var sendPixel = function(str){
        var endpoint = 'https://us-central1-bigq-drd-1.cloudfunctions.net/ad-blocker-test'
        var img = document.createElement('img');
        img.setAttribute('style', 'display:none;');

        img.src = endpoint+ '?' + buildParams(param) + str;
        document.body.appendChild(img);
    }
    if (window.ga && ga.create) {
  
        sendPixel('&ea=Allowing&el=Google%20Analytics')
    } else {
        sendPixel('&ea=Blocking&el=Google%20Analytics')
    }
    if (window.google_tag_manager) {

        sendPixel('&ea=Allowing&el=Google%20Tag%20Manager')
    } else {
        sendPixel('&ea=Blocking&el=Google%20Tag%20Manager');
    }
}, false);