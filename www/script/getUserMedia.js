function hasGetUserMedia(){
    navigator.getUserMedia =    navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia ||
                                navigator.msGetUserMedia;

    return !!navigator.getUserMedia;
}

var body = document.querySelector('body'),
    video = document.querySelector('video')
    videoSourcesMap = {
        user: 'front',
        environment: 'back'
    },
    errorCallback = function(e){
        alert('Error: ' + e.name);
    };

if(!hasGetUserMedia()){
    alert('getUserMedia() is not supported in your browser');
}
else {
    MediaStreamTrack.getSources(function(sources){
        var fragment = document.createDocumentFragment();

        sources.forEach(function(source){
            console.log(source);

            if(source.kind === 'video'){
                var button = document.createElement('button');
                button.innerHTML = button.className = videoSourcesMap[source.facing] || 'front';
                button.setAttribute('data-source-id', source.id);
                fragment.appendChild(button);
            }
        });

        body.appendChild(fragment);
    });

    body.addEventListener('click', function(e){
        if(e.target.tagName === 'BUTTON' && e.target.dataset.sourceId){
            video.className = e.target.className;
            setSource({
                video: {
                    optional: [{sourceId: e.target.dataset.sourceId}]
                }
            });
        }
    });


    function setSource(source){
        if(!!window.stream){
            video.src = null;
            window.stream.stop();
        }

        navigator.getUserMedia(source, function(stream){
            window.stream = stream;
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errorCallback);
    }
}
