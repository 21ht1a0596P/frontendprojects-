var noOfSquares=6;

//pallet

var arr=[];

//color picked for target
var picked;

//to get all the suqres div
var squares=document.getElementsByClassName("square");

//to get the rgb display
var targetColor=document.getElementById("targetColor");

//message that can be empty or try again or correct
var message=document.getElementById("message");

//heading
var head=document.querySelector("h1");

//reset button
var reset=document.getElementById("NewColor");

//calling init() as first statement will set the game
init();

//definig init()
function init()
{
	//generate random color pallete
	arr=generateRandomColor(noOfSquares);

	//get target color randomly from the array size
	picked=arr[randomPickedColorIndex()];

	//updating target RGB color display
	targetColor.textContent=picked;

	for (var i=0;i<squares.length;i++){
		
		//setting squares color one by one to color
		squares[i].style.backgroundColor=arr[i];

		//adding event listner to all squares
		squares[i].addEventListener("click", function()
		{
            if(normalizeColor(picked) === normalizeColor(this.style.backgroundColor))
            {
            	message.textContent="Correct";
            	message.style.color="green";
                //when correct set everything to targetColor and set newcolor to playagain
                changeColor(this.style.backgroundColor);
                reset.textContent="Play Again?";
            }
            else{
            	message.textContent="Try Again";
            	message.style.color="red";
                //to hide the wrong square, we will set it to background color 
            	this.style.backgroundColor="#232323";

            }
		});
	}

}

//add or setting EventListener for reset button
reset.addEventListener("click",resetIn);



//to get the random color from existing palette
function randomPickedColorIndex(){
	return Math.floor(Math.random()*arr.length);
}

//to get the random pallete of color
function generateRandomColor(limit)
{
	var color=[];
	for(var i=0;i<limit;i++){
		color.push(rgbGenerator());
	}
	return color;
}

//to generate a single rgb
function rgbGenerator()
{
	var r=Math.floor(Math.random()*256);

	var g=Math.floor(Math.random()*256);

	var b=Math.floor(Math.random()*256);

	return "rgb(" + r + "," + g + "," + b + ")";
}

//normalize the rgb color string to ensure consistent comparision
function normalizeColor(color){
	var ctx=document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color;
    return ctx.fillStyle;
}

//when correct change everything to correct color

function changeColor(color)
{
	for(var i=0;i<squares.length;i++)
		squares[i].style.backgroundColor=color;
	head.style.backgroundColor=color;
}

//set things when player try to reset

function resetIn(){
	arr=generateRandomColor(noOfSquares);
	picked=arr[randomPickedColorIndex()];
	targetColor.textContent=picked;
	message.textContent="";
	head.style.backgroundColor="steelblue";

	for (var i=0;i<squares.length;i++)
		squares[i].style.backgroundColor=arr[i];
}