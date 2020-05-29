var canvas,context,snake,prey,size=16,score=0,scoreBoard;
var colors=['#ff0000','#6FA2FF','#ffff00','#FFBFEF','#14d160','#BBFF78','#C5B8FF','#df613f','#e0522c','#256c14'],colorSelect="#BBFF78",starting;
var left,right,up,down;

window.onload=function(){
	canvas=document.getElementById("gameWindow");
	context=canvas.getContext('2d');
	scoreBoard=document.getElementById('score');
	snake=new Snake();
	snake.tailX.push(0);
	snake.tailY.push(0);
	prey=new Food();
	setInterval(update,1000/10);
	starting=true;
	score=0;
	left=false;
	right=true;
	down=false;
	up=false;
}
function init(){
	starting=true;
	score=0;
	snake=new Snake();
	snake.tailX.push(0);
	snake.tailY.push(0);
	prey=new Food();
	left=false;
	right=true;
	down=false;
	up=false;
}
class Food{
	constructor(){
		this.x=Math.ceil(Math.random()*39)*16;
		this.y=Math.ceil(Math.random()*29)*16;
	}
}
class Snake{
	constructor(){
		this.xPos=64;
		this.yPos=64;
		this.xVel=size;
		this.yVel=0;
		this.snakeSpeed=size;
		this.length=1;
		this.tailX=[];
		this.tailY=[];
	}
}
function collision(){
	if(snake.xPos<0 || snake.xPos>=640){
		return true;
	}
	if(snake.yPos<0 || snake.yPos>=480){
		return true;
	}
	var positionX=snake.tailX[snake.tailX.length-1];
	var positionY=snake.tailY[snake.tailY.length-1];
	for(let i=snake.tailX.length-1;i>=0;i--){
		if(positionX+snake.xVel==snake.tailX[i] && positionY+snake.yVel==snake.tailY[i]){
			return true;
		}
	}
	//if(snake.xVel<0){
		
	//}
	/*else if(snake.xVel>0){

	}
	else if(snake.yVel<0){

	}
	else if(snake.yVel>0){
			
	}*/
	return false;
}
function update(){
	if(starting){
		snake.xPos+=snake.xVel;
		snake.yPos+=snake.yVel;
		context.fillStyle="#665b5b";
		context.fillRect(0,0,canvas.width,canvas.height);
		context.fillStyle="#9AD2FF";
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
			colorSelect=colors[Math.round(Math.random()*9)];
			snake.tailX.push(snake.xPos);
			snake.tailY.push(snake.yPos);
		}
		context.fillStyle=colorSelect;
		context.fillRect(prey.x,prey.y,size,size);
		scoreBoard.innerHTML="SCORE: "+score;
		if(collision()){
			context.fillStyle="white";
			context.font="20pt sans-serif";
			context.fillText("GAME OVER",canvas.width-640/2-50,canvas.height-480/2+10);
			starting=false;
		}
	}
}
window.addEventListener('keydown',(event)=>{
	if((event.keyCode==65 || event.keyCode==37) && !right){
		snake.xVel=-snake.snakeSpeed;
		snake.yVel=0;
		left=true;
		right=false;
		down=false;
		up=false;
	}//A
	else if((event.keyCode==68 || event.keyCode==39) && !left){
		snake.xVel=snake.snakeSpeed;
		snake.yVel=0;
		left=false;
		right=true;
		down=false;
		up=false;
	}//D
	else if((event.keyCode==83 || event.keyCode==40) && !up){
		snake.xVel=0;
		snake.yVel=snake.snakeSpeed;
		left=false;
		right=false;
		down=true;
		up=false;
	}//S
	else if((event.keyCode==87 || event.keyCode==38) && !down){
		snake.xVel=0;
		snake.yVel=-snake.snakeSpeed;
		left=false;
		right=false;
		down=false;
		up=true;
	}//W
});
function up(){
	//if(!down){
		snake.xVel=0;
		snake.yVel=-snake.snakeSpeed;
		left=false;
		right=false;
		down=false;
		up=true;
	//}
}
function down(){
	//if(!up){
		snake.xVel=0;
		snake.yVel=-snake.snakeSpeed;
		left=false;
		right=false;
		down=true;
		up=false;
	//}
}
function left(){
	//if(!right){
		snake.xVel=-snake.snakeSpeed;
		snake.yVel=0;
		left=true;
		right=false;
		down=false;
		up=false;
	//}
}
function right(){
	//if(!left){
		snake.xVel=snake.snakeSpeed;
		snake.yVel=0;
		left=false;
		right=true;
		down=false;
		up=false;
	//}
}
function refresh(){
	init();
}