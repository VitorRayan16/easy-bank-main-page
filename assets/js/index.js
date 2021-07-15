// background animation
document
	.querySelector(".background-svg")
	.classList.add("background-svg-normal-animate");

setTimeout(() => {
	document
		.getElementById("desktop-svg-img")
		.classList.add("mockup-img-animate");
}, 1000);

// scroll animation
const reasonArea = document.querySelector(".reasons-area");
const reasons = document.querySelectorAll(".reason-resume");

const elementInView = (el, dividend = 1) => {
	const elementTop = el.getBoundingClientRect().top;

	return (
		elementTop <=
		(window.innerHeight || document.documentElement.clientHeight) / dividend
	);
};

const elementOutView = (el) => {
	const elementTop = el.getBoundingClientRect().top;

	return (
		elementTop >
		(window.innerHeight || document.documentElement.clientHeight)
	);
};

const CLASS_TIMING = 150;
const timers = [];
let timer = null;

const startAnimation = () => {
	let time = 0;
	for (let i = 0; i < reasons.length; i++) {
		const el = reasons[i];
		if (i == 0) {
			addAnimatedClasses(el);
			time++;
			continue;
		}

		timer = setTimeout(() => {
			addAnimatedClasses(el);
		}, CLASS_TIMING * reasons.length * time);
		time++;
		timers.push(timer);
	}
};

const addAnimatedClasses = (el) => {
	const svg = el.querySelector("svg");
	const h2 = el.querySelector("h2");
	const p = el.querySelector("p");

	svg.classList.add("svg-animate");
	timer = setTimeout(() => {
		h2.classList.add("h2-animate");
		let timer2 = setTimeout(() => {
			p.classList.add("p-animate");
		}, CLASS_TIMING);
		timers.push(timer2);
	}, CLASS_TIMING);
	timers.push(timer);
};

const restoreDefaultClasses = () => {
	reasons.forEach((el) => {
		el.querySelector("svg").classList.remove("svg-animate");
		el.querySelector("h2").classList.remove("h2-animate");
		el.querySelector("p").classList.remove("p-animate");
	});
	timers.forEach((timer) => clearTimeout(timer));
	timers.splice();
};

const handleScrollAnimation = () => {
	if (elementInView(reasonArea, 1.25)) startAnimation();
	else if (elementOutView(reasonArea)) restoreDefaultClasses();
};

window.addEventListener("scroll", () => {
	handleScrollAnimation();
});

// nav
const toggle = document.querySelector(".toggle-nav");
const closeNav = document.querySelector(".close-nav");

const navModal = new bootstrap.Modal(document.getElementById("navModal"), {
	keyboard: false,
	backdrop: "static",
});

// const closeNavRect = closeNav.getBoundingClientRect();
const toggleRect = toggle.getBoundingClientRect();
closeNav.style.left = toggleRect.x + "px";
closeNav.style.top = toggleRect.y + "px";

toggle.addEventListener("click", () => {
	toggle.style.display = "none";
	closeNav.style.display = "block";

	navModal.show();
});

closeNav.addEventListener("click", () => {
	toggle.style.display = "block";
	closeNav.style.display = "none";
	navModal.hide();
});

window.addEventListener("resize", () => {
	const windowWidth = document.documentElement.clientWidth;

	console.log(windowWidth);

	if (windowWidth > 1440) {
		toggle.style.display = "none";
		closeNav.style.display = "none";
		navModal.hide();
		return;
	}

	toggle.style.display = "block";
	closeNav.style.display = "none";
	navModal.hide();
});
