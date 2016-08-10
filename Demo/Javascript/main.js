var bodyWidth = document.body.clientWidth,
	boxWidth = document.getElementsByClassName('box')[0].offsetWidth,
	wrapper = document.getElementsByClassName('wrapper')[0],
	
	images = {
		'data': [
			{
				'src': 'P_01.jpg'
			},
			{
				'src': 'P_02.jpg'
			},
			{
				'src': 'P_03.jpg'
			},
			{
				'src': 'P_04.jpg'
			}
		]
	};

window.onscroll = function(){

	var newBox,
		newPic,
		newImg;

	if (isLoad()) {

		for (var i = 0; i < images.data.length; i++) {

			newBox = document.createElement('div');
			newPic = document.createElement('div');
			newImg = document.createElement('img');
			newBox.className = 'box';
			newPic.className = 'pic';
			
			newImg.src = '../images/' + images.data[i].src;
			newPic.appendChild(newImg);
			newBox.appendChild(newPic);
			wrapper.appendChild(newBox);

		}

		init();

	};
}

function init(){

	var n = Math.floor(bodyWidth/boxWidth),
		boxArr = document.getElementsByClassName('box'),
		boxHeightArr = [],
		boxHeight,
		index,
		minBoxHeight;

	for (var i = 0; i < boxArr.length; i++) {

		if (i < n) {

			boxHeight = boxArr[i].offsetHeight;
			boxHeightArr.push(boxHeight);

		} else {

			minBoxHeight = Math.min.apply(null,boxHeightArr);

			index = boxHeightArr.indexOf(minBoxHeight);

			boxArr[i].style.cssText = "position: absolute;top: "+ minBoxHeight +"px;left: "+ index*boxWidth +"px";
			wrapper.style.cssText = "width: "+ n*boxWidth +"px; margin: 0 auto;"
			
			boxHeightArr[index] += boxArr[i].offsetHeight;
		}
		
	}

}

function isLoad(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
		documentH = document.documentElement.clientHeight,
		boxArr = document.getElementsByClassName('box'),
		sideHeight = boxArr[boxArr.length-1].offsetTop + Math.floor(boxArr[boxArr.length-1].offsetHeight/2);
	return (sideHeight < scrollTop + documentH) ? true : false;
}

init();