var wrapper = $('.wrapper'),
	bodyWidth = $('body').width(),
	boxWidth = $('.box').eq(0).width(),
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

function init(){
	var n = Math.floor(bodyWidth / boxWidth),
		boxHeight,
		minBoxHeight,
		index,
		boxHeightArr = [],
		boxArr = $('.box');

	for (var i = 0; i < boxArr.length; i++) {

		if (i < n) {
			boxHeight = boxArr[i].offsetHeight;
			boxHeightArr.push(boxHeight);
		} else {
			minBoxHeight = Math.min.apply(null, boxHeightArr);
			index = boxHeightArr.indexOf(minBoxHeight);

			wrapper.css({
				'position': 'relative',
				'width': boxWidth*n + 'px',
				'margin': '0 auto'
			})

			boxArr.eq(i).css({
				'position': 'absolute',
				'left': index*boxWidth + 'px',
				'top': minBoxHeight + 'px'
			})

			boxHeightArr[index] += boxArr[i].offsetHeight;
		}
	}
}

$(window).scroll(function(){
	var newBox,
		newPic,
		newImg;

	if (scrollAble()) {
		for (var i = 0; i < images.data.length; i++) {
			newBox = $('div');
			newPic = $('div');
			newImg = $('img');
			newBox.addClass('box');
			newPic.addClass('pic');

			newImg.attr(src, '../images/' + images.data[i].src);
			newPic.append(newImg);
			newBox.append(newPic);
			wrapper.append(newBox);
		}

		init();
	}
})

function scrollAble(){
	var boxArr = $('.box'),
		sideHeight = boxArr.last().get(0).offsetTop + Math.floor(boxArr.last().height()/2),
		scrollTop = $(window).scrollTop,
		documentH = $(document).height();

	return(sideHeight < scrollTop + documentH) ? true : false;
}

init();