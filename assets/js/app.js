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
});
