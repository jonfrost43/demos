function hasGetUserMedia(){
    navigator.getUserMedia =    navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia ||
                                navigator.msGetUserMedia;

    return !!navigator.getUserMedia;
}

var body = document.querySelector('body'),
    videoL = document.querySelector('video.left'),
    videoR = document.querySelector('video.right'),
    btnLaunch = document.querySelector('button#launch'),
    divDemo = document.querySelector('div.demo'),
	constraints = {video: {
			mandatory: {
				maxWidth: screen.width / 2,
				maxHeight: screen.height
			}
		}
	},
    errorCallback = function(e){
        alert('Error: ' + e.name);
    };


if(!hasGetUserMedia()){
    alert('getUserMedia() is not supported in your browser');
}
else {
	MediaStreamTrack.getSources(function(sources){
		sources.forEach(function(source){
			if(source.kind === 'video' && source.facing === 'environment'){
				constraints.video.optional = [{sourceId: source.id}]
			}
		});
	});

    btnLaunch.addEventListener('click', function(e){
        btnLaunch.classList.add('hidden');
        divDemo.classList.remove('hidden');

        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);

		navigator.getUserMedia(constraints, function(stream){
			videoL.src = videoR.src = window.URL.createObjectURL(stream);
		}, errorCallback);
    }, false);

}
