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
		
		//do algorithm
		//connect(dotX, dotY, "#55C")
		NearestNeighbor();
		//console.log(nnX);
		connect(nnX, nnY, "#FF9966");
		
		
		//draw a line between every point
		
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
		var max = Number.MAX_VALUE;
		for (var j = 1; j < nnX.length; j++)
		{
			if (distance(dotX[j],nnX[j],dotY[j],nnY[j]) < max)
			{
				max = distance(dotX[j],nnX[j],dotY[j],nnY[j]);
				closest = j;
			}
		}
		nnX.splice(closest + 1, 0, dotX[i]);
		nnY.splice(closest + 1, 0, dotY[i]);
	}
}

function distance(x1, x2, y1, y2) 
{
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
