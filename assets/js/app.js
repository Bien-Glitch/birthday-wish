fx.onDocumentLoad(() => {
	let innerW = window.innerHeight,
		innerH = window.innerWidth;

	const lockScreen = fx('#lock-screen');
	const clickOrSwipe = fx('#click-or-swipe', lockScreen);

	const swipeUp = (e) => {
		e.preventDefault();
		const element = fx(e.currentTarget);
		const animationOptions = {
			keyFrames: [{top: 0}, {top: `-${(innerHeight / 2)}px`}, {top: `-${(innerHeight)}px`, bottom: `${(innerHeight)}px`}],
			timing: {duration: 800, iterations: 1}
		}

		element[0].animate(animationOptions.keyFrames, animationOptions.timing).finished.then(() => element.style({
			top: `-${(innerHeight)}px`,
			bottom: `${(innerHeight)}px`
		}));

		new TypeIt('.writeup > .m-auto').options({speed: 10, lifeLike: true}).go();
	}

	clickOrSwipe.insertHTML(Fuxcel.pointerIsTouch ? 'Touch to continue' : 'Click to continue');
	lockScreen.putClass('show-bg').off().upon({
		click: (e) => swipeUp(e),
		touchend: (e) => swipeUp(e),
	});

	window.onresize = () => {
		innerH = window.innerHeight;
		innerW = window.innerWidth;
	}

	const images = [
		'presh-1.jpg',
		'presh-2.jpg',
		'presh-3.jpg',
		'presh-4.jpg',
		'presh-5.jpg',
		'presh-6.jpg',
	];

	console.log(fx('.img-wrapper')[0].getBoundingClientRect())


	images.forEach((image, idx) => {
		const img = document.createElement('img');
		img.src = `./assets/img/${image}`;
		img.dataset.id = idx + 1;
		!idx && img.classList.add('active');
		fx('.img-wrapper')[0].append(img);
	});

	let i = 0,
		imagesEle = fx('.img-wrapper img');

	console.log(imagesEle);

	setInterval(() => {
		let activeImg = fx('.img-wrapper img.active'),
			currentId = parseInt(activeImg.dataAttrib('id')),
			nextId = (currentId >= imagesEle.length) ? 1 : currentId + 1;
		console.log(activeImg, currentId)
		activeImg.removeClass('active');
		fx(`img[data-id="${nextId}"]`).putClass('active');
	}, 3000);
});
