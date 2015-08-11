function hasGetUserMedia(){
    navigator.getUserMedia =    navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia ||
                                navigator.msGetUserMedia;

    return !!navigator.getUserMedia;
}

var body = document.querySelector('body'),
    video = document.querySelector('video'),
    canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
    controls = document.querySelector('#controls'),
    btnCapture = document.querySelector('#capture'),
	photos = document.querySelector('#photos'),
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
                button.classList.add('camera');
                button.classList.add(videoSourcesMap[source.facing] || 'front');
                button.innerHTML = videoSourcesMap[source.facing] || 'Start camera';
                button.setAttribute('data-source-id', source.id);
                fragment.appendChild(button);
            }
        });

        controls.appendChild(fragment);
    });

    body.addEventListener('click', function(e){
        if(e.target.tagName === 'BUTTON' && e.target.dataset.sourceId){
            video.className = e.target.className;
            setSource({
                video: {
                    optional: [{sourceId: e.target.dataset.sourceId}]
                }
            });
			e.target.classList.add('hidden');
        }
    });

	btnCapture.addEventListener('click', function(e){
		var image;

		if(!!window.stream){
			ctx.drawImage(video, 0, 0, 150, 150);

			image = document.createElement('img');
			image.src = canvas.toDataURL('image/webp');
			image.className = 'flip';
			photos.appendChild(image);
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
			btnCapture.classList.remove('hidden');
        }, errorCallback);
    }
}
