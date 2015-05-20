    var drawingLine = 0;
    var drawingLineStartX;
    var drawingLineStartY;
    var drawingLineEndX;
    var drawingLineEndY;
    var drawingLineGraphic
function drawLine() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.L))
    {
        if(drawingLine == 0)
        {
            
            drawingLine = 1;
            drawingLineStartX = game.input.x;  
            drawingLineStartY = game.input.y;
            drawingLineGraphic = game.add.graphics(0, 0);
            
        } else
        {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
        {//snap to grid
            drawingLineStartX = Math.round(drawingLineStartX/gridSize)*gridSize;
            drawingLineStartY = Math.round(drawingLineStartY/gridSize)*gridSize;
            drawingLineEndX=Math.round(game.input.x/gridSize)*gridSize;
            drawingLineEndY=Math.round(game.input.y/gridSize)*gridSize;
        } else
        {
            drawingLineEndX = game.input.x;
            drawingLineEndY = game.input.y;
        }
            
            drawingLineGraphic.clear();
            drawingLineGraphic.lineStyle(2, 0x000000, 1);
            drawingLineGraphic.moveTo(drawingLineEndX, drawingLineEndY)
            drawingLineGraphic.lineTo(drawingLineStartX, drawingLineStartY)
        }   
    } else
    {
        
        
        if(drawingLine==1)
        {//drawingLineGraphic.generateTexture()
            
            drawingLine = 0;
            drawingLineGraphic.clear();
            drawingLineGraphic.lineStyle(2, 0x000000, 1);
            drawingLineGraphic.moveTo(drawingLineEndX, drawingLineEndY)
            drawingLineGraphic.lineTo(drawingLineStartX, drawingLineStartY)
            //drawingLineGraphic.drawRect(drawingLineStartX, drawingLineStartY, drawingLineEndX-drawingLineStartX, drawingLineEndY-drawingLineStartY);
            piece[piece.length] = game.add.sprite((drawingLineEndX<drawingLineStartX?drawingLineEndX:drawingLineStartX),(drawingLineEndY<drawingLineStartY?drawingLineEndY:drawingLineStartY),drawingLineGraphic.generateTexture());
            drawingLineGraphic.clear();
            piece[piece.length-1].inputEnabled='true';
            piece[piece.length-1].input.useHandCursor=true; 
            piece[piece.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
            piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece); 
            piece[piece.length-1].type=98;
            piece[piece.length-1].drawingLineStartX=drawingLineStartX;
            piece[piece.length-1].drawingLineStartY=drawingLineStartY;
            piece[piece.length-1].drawingLineEndX=drawingLineEndX;
            piece[piece.length-1].drawingLineEndY=drawingLineEndY;
            colorSwatch();
        }   
    }
}

function buildDrawLine(item) {
    console.log("building")
    drawingLineGraphic = game.add.graphics(0, 0);
    drawingLineGraphic.clear();
    drawingLineGraphic.lineStyle(2, 0x000000, 1);
    drawingLineGraphic.moveTo(item.drawingLineEndX, item.drawingLineEndY)
    drawingLineGraphic.lineTo(item.drawingLineStartX, item.drawingLineStartY)
    piece[piece.length] = game.add.sprite((item.drawingLineEndX<item.drawingLineStartX?item.drawingLineEndX:item.drawingLineStartX),(item.drawingLineEndY<item.drawingLineStartY?item.drawingLineEndY:item.drawingLineStartY),drawingLineGraphic.generateTexture());
    drawingLineGraphic.clear();
    piece[piece.length-1].type=98;
    piece[piece.length-1].drawingLineStartX=item.drawingLineStartX
    piece[piece.length-1].drawingLineStartY=item.drawingLineStartY
    piece[piece.length-1].drawingLineEndX=item.drawingLineEndX;
    piece[piece.length-1].drawingLineEndY=item.drawingLineEndY;
    piece[piece.length-1].x=item.drawingLineStartX
    piece[piece.length-1].y=item.drawingLineStartY

    
}

