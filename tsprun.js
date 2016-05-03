var dotX = [];
var dotY = [];

var nnX = [];
var nnY = [];

$(document).ready( function() {
	
	var canvas = $("#canvas").get(0);
	var ctx = canvas.getContext("2d");
	ctx.canvas.width=600;
	ctx.canvas.height=400;
	
	$("#canvas").click( function() {
		
		//get context of canvas
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		
		//add point to canvas (write this)
		ctx.fillStyle = "#F8F8F8";
		ctx.fillRect(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop,2,2);
		
		//add point to arrays
		dotX.push(event.pageX);
		dotY.push(event.pageY);
	
	});
	
	
	
	$("#button1").click( function() {
		nnX = [];
		nny = [];
		//do algorithm
		//connect(dotX, dotY, "#55C")
		NearestNeighbor();
		//console.log(nnX);
		connect(nnX, nnY, "#FF9966");
		
		
		//draw a line between every point
		
	});
	
	
	$("#button2").click( function() {
		nnX = [];
		nny = [];
		SmallestIncrease();
		connect(nnX, nnY, "#66FF66");
	});
});

function connect(xs, ys, color)
{
	//draw lines between points
	var canvas = $("#canvas").get(0);
	var ctx = canvas.getContext("2d");	
	ctx.strokeStyle = color; //change color of line
	ctx.lineWidth = 4; //change width of line
	ctx.beginPath();
	console.log("here0");
	for (var i = 0; i < xs.length - 1; i++)
	{
		//ctx.moveTo(xs[i], ys[i]);
		//ctx.lineTo(xs[i+1], ys[i+1]);
		ctx.moveTo(xs[i] - canvas.offsetLeft, ys[i] - canvas.offsetTop);
		ctx.lineTo(xs[i+1] - canvas.offsetLeft, ys[i+1] - canvas.offsetTop);
		ctx.stroke();
	}
	
}

function NearestNeighbor()
{
	console.log("here1");
	for (var i = 0; i < dotX.length; i++)
	{
		var closest = 0;
		var furthest = Number.MAX_VALUE;
		for (var j = 0; j < nnX.length; j++)
		{
			if (distance(dotX[i],nnX[j],dotY[i],nnY[j]) < furthest)
			{
				console.log(distance(dotX[i],nnX[j],dotY[i],nnY[j]));
				console.log(furthest);
				furthest = distance(dotX[i],nnX[j],dotY[i],nnY[j]);
				closest = j;
			}
		}
		console.log(closest);
		nnX.splice(closest + 1, 0, dotX[i]);
		nnY.splice(closest + 1, 0, dotY[i]);
		console.log(nnX);
	}
}

function SmallestIncrease()
{
	console.log(dotX);
	console.log(dotY);
	for (var i = 0; i < dotX.length; i++)
	{
		var closest = 0;
		var increase = Number.MAX_VALUE;
		for (var j = 0; j < nnX.length - 1; j++)
		{
			if (distance(nnX[j],dotX[i],nnY[j],dotY[i]) + distance(dotX[i],nnX[j+1],dotY[i],nnY[j+1])
				 - distance(nnX[j],nnX[j+1],nnY[j],nnY[j+1]) < increase)
			{
				closest = j;
				increase = distance(nnX[j],dotX[i],nnY[j],dotY[i]) + distance(dotX[i],nnX[j+1],dotY[i],nnY[j+1])
				 - distance(nnX[j],nnX[j+1],nnY[j],nnY[j+1]);
				console.log("point 1 to new point =" + distance(nnX[j],dotX[i],nnY[j],dotY[i]));
				console.log("new point to point 2 =" + distance(dotX[i],nnX[j+1],dotY[i],nnY[j+1]));
				console.log("old distance =" + distance(nnX[j],nnX[j+1],nnY[j],nnY[j+1]));
				console.log("increase =" + increase);
			}
		}
		if (distance(dotX[i],nnX[nnX.length - 1],dotY[i],nnY[nnY.length - 1]) < increase)
		{
			closest = nnX.length - 1;
			increase = distance(dotX[i],nnX[nnX.length - 1],dotY[i],nnY[nnY.length - 1]);
			console.log(increase);
		}
		console.log(closest);
		nnX.splice(closest+1, 0, dotX[i]);
		nnY.splice(closest+1, 0, dotY[i]);
		console.log(nnX);
		console.log(nnY);
	}
}	

function distance(x1, x2, y1, y2) 
{
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
