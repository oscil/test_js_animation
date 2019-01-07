// console.log("start my canvas");
//
// var canvas = document.querySelector("canvas");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
//
// var c = canvas.getContext("2d");
//
// c.fillStyle = 'rgba(255, 0, 0, 0.3)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.3)';
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = 'rgba(0, 255, 100, 0.3)';
// c.fillRect(300, 100, 100, 100);
//
//
// //line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();
//
//
// //arc
// for (var i = 0; i < 40; i++){
//     c.beginPath();
//     c.arc(Math.random()*window.innerWidth,
//           Math.random()*window.innerHeight,
//           30, 0, Math.PI*2, false);
//     c.strokeStyle = "red";
//     c.stroke();
// }
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");


var colorArray = [
    "#ffaa33",
    "#99ffaa",
    "#00ff00",
    "#4411aa",
    "#ff1100"
];

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

var init = function(size){
    var circleArray = [];
    var arrayLength = size;
    for (var i = 0 ; i < arrayLength; i++){
        var radius = Math.random()*30+1;
        var x = Math.random()*canvas.width;
        if (x < radius) x+=radius;
        if (x+radius > canvas.width) x-=radius;
        var y = Math.random()*canvas.height;
        if (y < radius) y+=radius;
        if (y+radius > canvas.height) y-=radius;
        var dx = (Math.random()-0.5)*6;
        var dy = (Math.random()-0.5)*6;
        var circle = new Circle(x,y,radius,dx,dy,
            colorArray[Math.floor(Math.random()*colorArray.length)]);
        circleArray.push(circle);
    }
    return circleArray;
}


window.addEventListener("resize", function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("IN INIT");
    circleArray = init(600);
});

var circleArray = undefined;


circleArray = init(300);


function Circle(x, y, radius, dx, dy, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.holdRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function(c) {
        c.beginPath();
        c.arc(this.x, this.y,this.radius,
            0, Math.PI*2, false);
        c.strokeStyle = "red";
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        this.x += this.dx;
        if (this.x+this.radius > innerWidth || this.x < this.radius ){
            this.dx = -this.dx;
        }
        this.y += this.dy;
        if (this.y+this.radius > innerHeight || this.y < this.radius ){
            this.dy = -this.dy;
        }

        var delta = 100;
        if (mouse.x - this.x < delta &&
            mouse.x - this.x > -delta &&
            mouse.y - this.y < delta &&
            mouse.y - this.y > -delta
        ){
            if (this.radius < 100)
                this.radius+=5;
        } else if (this.radius - 6 > this.holdRadius){
            this.radius-=6;
        }
        else{
            this.radius = this.holdRadius;
        }
    }
}

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0,0,innerWidth, innerHeight);
    for (circle in circleArray){
        circleArray[circle].draw(c);
        circleArray[circle].update();
    }
}

animate();

