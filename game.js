var canvas,context,snake,prey,size=8,score=0,scoreBoard;
var colors=['#ff0000','#0043ff','#ffff00','#ff00ff'],colorSelect="#ffffff";

window.onload=function(){
	canvas=document.getElementById("gameWindow");
	context=canvas.getContext('2d');
	scoreBoard=document.getElementById('score');
	snake=new Snake();
	snake.tailX.push(0);
	snake.tailY.push(0);
	prey=new Food();
	setInterval(update,1000/25);
	//context.fillRect(0,0,canvas.width,canvas.height);
}
class Food{
	constructor(){
		this.x=Math.ceil(Math.random()*39)*16;
		this.y=Math.ceil(Math.random()*29)*16;
	}
}
class Snake{
	constructor(){
		this.xPos=0;
		this.yPos=0;
		this.xVel=0;
		this.yVel=0;
		this.snakeSpeed=size;
		this.length=1;
		this.tailX=[];
		this.tailY=[];
	}
}
function collision(){
	if(snake.xPos<0 || snake.xPos>640){
		return true;
	}
	if(snake.yPos<0 || snake.yPos>480){
		return true;
	}
	var positionX=snake.tailX[snake.tailX.length-2];
	var positionY=snake.tailY[snake.tailY.length-2];
	for(let i=snake.tailY.length-snake.length-1;i>=0;i--){
		if(snake.tailX[i]==positionX && snake.tailY[i]==positionY){
			return true;
		}
	}
	return false;
}
function update(){
	snake.xPos+=snake.xVel;
	snake.yPos+=snake.yVel;
	context.fillStyle="#665b5b";
	context.fillRect(0,0,canvas.width,canvas.height);
	context.fillStyle="#ffffff";
	if(snake.length==snake.tailX.length){
		for(let i=0;i<snake.tailX.length-1;i++){
			snake.tailX[i]=snake.tailX[i+1];
			snake.tailY[i]=snake.tailY[i+1];
		}
	}
	snake.tailX[snake.tailX.length-1]=(snake.xPos);
	snake.tailY[snake.tailY.length-1]=(snake.yPos);
	for(let j=0;j<snake.length;j++){
		context.fillRect(snake.tailX[snake.tailX.length-j-1],snake.tailY[snake.tailX.length-j-1],size,size);
	}
	if(snake.xPos==prey.x && snake.yPos==prey.y){
		prey=new Food();
		score+=1;
		snake.length++;
		colorSelect=colors[Math.floor(Math.random()*3)];
		snake.tailX.push(snake.xPos);
		snake.tailY.push(snake.yPos);
	}
	context.fillStyle=colorSelect;
	context.fillRect(prey.x,prey.y,size,size);
	scoreBoard.innerHTML="SCORE: "+score;
	if(collision()){
		context.fillStyle="white";
		context.fillText("GAME OVER",canvas.width-640/2,canvas.height-480/2);
		starting=false;
	}
}
window.addEventListener('keydown',(event)=>{
	if(event.keyCode==65 && snake.xVel==0){
		snake.xVel=-snake.snakeSpeed;
		snake.yVel=0;
	}//A
	else if(event.keyCode==68 && snake.xVel==0){
		snake.xVel=snake.snakeSpeed;
		snake.yVel=0;
	}//D
	else if(event.keyCode==83 && snake.yVel==0){
		snake.xVel=0;
		snake.yVel=snake.snakeSpeed;
	}//S
	else if(event.keyCode==87 && snake.yVel==0){
		snake.xVel=0;
		snake.yVel=-snake.snakeSpeed;
	}//W
	else if(event.keyCode==66){
		starting=true;
	}
});
