let canvas = document.querySelector('canvas');

$(function() {
    setTimeout(function() {
        $('.title').removeClass('hidden');
    }, 500);
});

$(function() {
    setTimeout(function() {
        $('.description').removeClass('hidden');
    }, 500);
});

$(function() {
    setTimeout(function() {
        $('.canvas').removeClass('hidden');
    }, 500);
});

$(function() {
    setTimeout(function() {
        $('.nav').removeClass('hidden');
    }, 500);
});

function playHover(el) {
	document.getElementById(el).play();
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

function Note(x, y, dx, dy) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.draw = function() {
		c.beginPath();
		c.ellipse(this.x, this.y, 5, 9, 45 * Math.PI/180, 0, 2 * Math.PI);
		c.moveTo(this.x + 7, this.y - 2);
		c.lineTo(this.x + 7, this.y - 50);
		c.closePath();
		c.lineWidth = 2;
		c.fill();
		c.stroke();
	}

	this.update = function() {
		if (this.x + 8 > innerWidth) {
			this.dx = -this.dx;
		} else if (this.x - 5 < 0) {
				this.dx = -this.dx;
		}
		if (this.y + 8 > innerHeight) {
			this.dy = -this.dy;
		} else if (this.y - 5 < 0) {
				this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		this.draw()

	}
}

let noteArray = [];

function init() {
	noteArray.length = 0;
	for (var i = 0; i < 100; i++) {
		let x = Math.random() * (innerWidth - 20) + 5;
		let y = Math.random() * (innerHeight - 20) + 5;
		let dx = (Math.random() - 0.5) * 2;
		let dy = (Math.random() - 0.5) * 2;
		noteArray.push(new Note(x, y, dx, dy));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i < noteArray.length; i++) {
		noteArray[i].update();
	}
}

init();
animate();