// Note: We need this for $ to work.
// Don't ask why!
$ = document.querySelector.bind(document);

// This will keep track of the position of the elf.
let elfLocation = {
	top: 1,
	left: 2,
};

// *****************************************
// This positions the elf on the board.
// *****************************************
function placeElf(leftPosition, topPosition) {
	box = document.querySelector("#main-box");
	box.style.top = topPosition * 100 + "px";
	box.style.left = leftPosition * 100 + "px";
}

// *****************************************
// This makes the elf turn and move.
// *****************************************
function walkLeft() {
	if (elfLocation.left != 0) {
		console.log("walk left");
		elfLocation.left--; // subtract one from position left
		turnElf("left");
		placeElf(elfLocation.left, elfLocation.top); // move the elf sprite
	}
}
function walkRight() {
	if (elfLocation.left != 4) {
		console.log("walk right");
		elfLocation.left++; // add one to position left
		turnElf("right");
		placeElf(elfLocation.left, elfLocation.top); // move the elf sprite
	}
}
function walkUp() {
	if (elfLocation.top != 0) {
		console.log("walk up");
		elfLocation.top--; // subtract one from position top
		turnElf("up");
		placeElf(elfLocation.left, elfLocation.top); // move the elf sprite
	}
}
// *****************************************
// TODO: finish this function to make the elf
// walk down.
// *****************************************
function walkDown() {
	console.log("walk down");
	if (elfLocation.top != 4) {
		// TODO: make the elf turn and walk down
		elfLocation.top++;
		turnElf("down");
		placeElf(elfLocation.left, elfLocation.top);
	}
}
// *****************************************
// set up the button for walking left
// *****************************************
leftButton = $("#left-button");
leftButton.onclick = walkLeft;
console.log(leftButton);
// *****************************************
// set up the button for walking right
// *****************************************
rightButton = $("#right-button");
rightButton.onclick = walkRight;
// *****************************************
// TODO: set up the button for walking up
// *****************************************
upButton = $("#up-button");
upButton.onclick = walkUp;
// *****************************************
// TODO:  set up the button for walking down
// *****************************************
downButton = $("#down-button");
downButton.onclick = walkDown;

// *****************************************
// This function will set the sprite
// for the elf so it is facing the right direction.
// *****************************************
function turnElf(direction) {
	// find the elf-sprite img tag
	let elfSprite = $("#elf-sprite");

	// set the correct image for walking left.
	if (direction === "left") {
		elfSprite.src = "img/elf_left.png";
	} else if (direction === "right") {
		elfSprite.src = "img/elf_right.png";
	} else if (direction === "up") {
		elfSprite.src = "img/elf_up.png";
	} else if (direction === "down") {
		elfSprite.src = "img/elf_down.png";
	}

	// TODO: if the direction is right, up, or down
	// set the src to be the correct image
}

// *****************************************
// Now we must call place elf to put in into
// the page
// *****************************************
// It starts at the elfLocation, so we set it here.
placeElf(elfLocation.left, elfLocation.top);
// It starts looking down, so set it here.
turnElf("down");

// *****************************************
// Cookie Placement
// *****************************************

// Below, are the cookie objects.
// This will indicate the id of the cookie in index.html
// It will also indicate where to place the cookie on the board.
let cookie1 = {
	id: "#cookie-1",
	left: 2,
	top: 4,
};

let cookie2 = {
	id: "#cookie-2",
	left: 1,
	top: 2,
};

// TODO: make cookies for 3, 4, and 5.
// Hint: look in index.html for the ids.
let cookie3 = {
	id: "#cookie-3",
	left: 3,
	top: 4,
};
let cookie4 = {
	id: "#cookie-4",
	left: 4,
	top: 1,
};
let cookie5 = {
	id: "#cookie-5",
	left: 0,
	top: 4,
};
let cookieObjects = [
	cookie1,
	cookie2,
	// TODO: put more cookies here.
	cookie3,
	cookie4,
	cookie5,
];

let cookieElm;
let score = document.querySelector("#score");
let points = 0;
// *****************************************
// This code places the cookies on the screen
// *****************************************

for (cookies of cookieObjects) {
	console.log(cookies);
	cookieElm = document.querySelector(cookies.id); // select "cookie-1"
	cookieElm.style.left = 100 * cookies.left + "px";
	cookieElm.style.top = 100 * cookies.top + "px";
	console.log(cookies.left);
}

function setRandomCookie(cookie) {
	cookie.left = Math.floor(Math.random() * 4);
	cookie.top = Math.floor(Math.random() * 4);
	cookieElm = document.querySelector(cookie.id);
	cookieElm.style.left = 100 * cookie.left + "px";
	cookieElm.style.top = 100 * cookie.top + "px";
}
for (cookie of cookieObjects) {
	setRandomCookie(cookie);
}
// BONUS: Replace the code for placing the cookies
// on the page with a for-loop

document.addEventListener("keydown", function (event) {
	if (event.key == "ArrowLeft") {
		walkLeft();
		eatCookie();
	} else if (event.key == "ArrowRight") {
		walkRight();
		eatCookie();
	} else if (event.key == "ArrowUp") {
		walkUp();
		eatCookie();
	} else if (event.key == "ArrowDown") {
		walkDown();
		eatCookie();
	}
});

// More Bonuses, check if the elf walks into a cookie
// If so, set the style.display of the cookie to none.
// Hint: Try it with on cookie. If you figure that out,
// make it into a function. And if that works, try a loop
// to check all the cookies!

// Can you think of anything else you'd like to do with
// the cookies?
function eatCookie() {
	for (cookie of cookieObjects) {
		cookieElm = document.querySelector(cookie.id);
		if (cookie.top == elfLocation.top && cookie.left == elfLocation.left) {
			cookieElm = document.querySelector(cookie.id);
			if (cookieElm.style.display != "none") {
				cookieElm.style.display = "none";
				points++;
				console.log(points);
			}
			if (cookieElm.style.display == "none") {
				cookieElm.style.display = "";
				setRandomCookie(cookie);
			}
		}
	}
	score.innerHTML = "Score: " + points;
}
