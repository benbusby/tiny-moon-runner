var c;var cc;var scl=15;const VOID=-1;const STAR=0;const NEIL=1;const MOON=3;const OBST=4;const keyState={};const MOVE_LEFT=37;const MOVE_UP=38;const MOVE_RIGHT=39;const MOVE_DOWN=40;const KEY_RESET=82;var lastKeyCode=0;var gameOver=0;var jumpUp=0;var resetJump=0;var gameLoopInterval;var renderInterval;var canJump=true;var playerBase=0;function startMovement(){if(keyState[MOVE_RIGHT]||keyState[MOVE_LEFT]){var b=astronaut.posX;var a=astronaut.posY;map.map[[b,a]]=initialMap[[b,a]];astronaut.posX+=(keyState[MOVE_RIGHT]&&astronaut.posX<map.x)?1:0;astronaut.posX-=(keyState[MOVE_LEFT]&&astronaut.posX>0)?1:0}if(keyState[MOVE_UP]&&astronaut.posY==playerBase&&canJump){jumpUp=1;canJump=false}}function gameLoop(){gameLoopInterval=setInterval(startMovement,50)}function shiftBackground(){for(var a=1;a<=map.x;a++){for(var b=0;b<=map.y-10;b++){if(map.map[[a,b]]==OBST){continue}if(a==map.x){if(Math.random()>0.9){map.map[[a,b]]=STAR;initialMap[[a,b]]=STAR}else{map.map[[a,b]]=VOID;initialMap[[a,b]]=VOID}}else{if(map.map[[a+1,b]]<=STAR&&initialMap[[a+1,b]]<=STAR){map.map[[a,b]]=map.map[[a+1,b]];initialMap[[a,b]]=initialMap[[a+1,b]]}}}}setTimeout(shiftBackground,150)}document.onkeydown=function(a){if(a.keyCode==KEY_RESET){init();return}keyState[a.keyCode||a.which]=true};document.onkeyup=function(a){keyState[a.keyCode||a.which]=false;if(a.keyCode==MOVE_UP){canJump=true}};var initialMap=[[]];var map={x:Math.floor(640/scl),y:Math.floor(360/scl)-1,map:[[]],initMap:function(){for(var a=0;a<=map.x;a++){for(var b=0;b<=map.y;b++){if(b>map.y-2){map.map[[a,b]]=MOON;initialMap[[a,b]]=MOON;continue}if(b>map.y-10){continue}if(Math.random()>0.9){map.map[[a,b]]=STAR;initialMap[[a,b]]=STAR}else{map.map[[a,b]]=VOID;initialMap[[a,b]]=VOID}}}},renderMap:function(){if(jumpUp&&astronaut.posY<=(playerBase-8)){jumpUp=0;resetJump=1}else{if(resetJump&&astronaut.posY>=playerBase){astronaut.posY=playerBase;resetJump=0}}var e=astronaut.posX;var b=astronaut.posY;astronaut.posY=astronaut.posY-jumpUp+resetJump;if(map.map[[e,b]]==OBST){gameOver=1}map.map[[25,47]]=MOON;if(jumpUp||resetJump){map.map[[e,b]]=initialMap[[e,b]]}map.map[[astronaut.posX,astronaut.posY]]=NEIL;cc.font="15px Lucida Console, Monaco, monospace";for(var a=0;a<=map.x;a++){for(var d=0;d<=map.y;d++){switch(map.map[[a,d]]){case VOID:cc.fillStyle=gameOver?"red":"#000000";cc.fillText(" ",a*scl+5,d*scl+10);break;case MOON:cc.fillStyle=gameOver?"red":"#444444";cc.fillText("#",a*scl+5,d*scl+10);break;case STAR:cc.fillStyle=gameOver?"red":"#aaaaaa";cc.fillText(".",a*scl+5,d*scl+10);break;case NEIL:cc.fillStyle=gameOver?"red":"white";cc.fillText("@",a*scl+5,d*scl+10);break;case OBST:if(gameOver){map.map[[a,d]]=VOID;break}cc.fillStyle="red";cc.fillText("n",a*scl+5,d*scl+10);map.map[[a-1,d]]=map.map[[a,d]];map.map[[a,d]]=initialMap[[a,d]];break}}}}};var astronaut={posX:0,posY:0};window.onload=function(){c=document.getElementById("gc");cc=c.getContext("2d");init()};function init(){playerBase=map.y-2;gameOver=0;astronaut.posX=0;astronaut.posY=playerBase;map.initMap();update();gameLoop();shiftBackground();renderInterval=setInterval(update,50);addObstacle()}function update(){if(gameOver){clearInterval(renderInterval);clearInterval(gameLoopInterval);return}render()}function render(){cc.fillStyle="black";cc.fillRect(0,0,c.width,c.height);map.renderMap()}function addObstacle(){for(var a=map.y-4;a<=map.y-2;a++){map.map[[map.x,a]]=OBST}setTimeout(addObstacle,Math.random()*2000)};