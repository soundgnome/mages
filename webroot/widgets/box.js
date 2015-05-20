var drawingBox = 0;
    var drawingBoxStartX;
    var drawingBoxStartY;
    var drawingBoxEndX;
    var drawingBoxEndY;
    var drawingBoxGraphic
function drawBox() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.B))
    {
        if(drawingBox == 0)
        {
            drawingBox = 1;
            drawingBoxStartX = game.input.x;  
            drawingBoxStartY = game.input.y;
            drawingBoxGraphic = game.add.graphics(0, 0);
        } else
        {
            drawingBoxEndX = game.input.x;
            drawingBoxEndY = game.input.y;
            
            
            drawingBoxGraphic.clear();
            drawingBoxGraphic.lineStyle(2, 0x000000, 1);
            drawingBoxGraphic.drawRect(drawingBoxStartX, drawingBoxStartY, drawingBoxEndX-drawingBoxStartX, drawingBoxEndY-drawingBoxStartY);
        }   
    } else
    {
        
        
        if(drawingBox==1)
        {//drawingBoxGraphic.generateTexture()
            var bufferspot
            if(drawingBoxStartX > drawingBoxEndX ) {
                bufferspot = drawingBoxStartX
                drawingBoxStartX = drawingBoxEndX
                drawingBoxEndX = bufferspot
            }
            if(drawingBoxStartY > drawingBoxEndY ) {
                bufferspot = drawingBoxStartY
                drawingBoxStartY = drawingBoxEndY
                drawingBoxEndY = bufferspot
            }
            drawingBox = 0;
            drawingBoxGraphic.clear();
            drawingBoxGraphic.lineStyle(2, 0x000000, 1);
            drawingBoxGraphic.drawRect(drawingBoxStartX, drawingBoxStartY, drawingBoxEndX-drawingBoxStartX, drawingBoxEndY-drawingBoxStartY);
            piece[piece.length] = game.add.sprite(drawingBoxStartX,drawingBoxStartY,drawingBoxGraphic.generateTexture());
            drawingBoxGraphic.clear();
            piece[piece.length-1].inputEnabled='true';
            piece[piece.length-1].input.useHandCursor=true; 
            piece[piece.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
            piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece); 
            piece[piece.length-1].type=99;
            piece[piece.length-1].drawingBoxStartX=drawingBoxStartX;
            piece[piece.length-1].drawingBoxStartY=drawingBoxStartY;
            piece[piece.length-1].drawingBoxEndX=drawingBoxEndX;
            piece[piece.length-1].drawingBoxEndY=drawingBoxEndY;
            piece[piece.length-1].drawingBoxEndX=(piece[piece.length-1].x+Math.abs(piece[piece.length-1].drawingBoxStartX-piece[piece.length-1].drawingBoxEndX)) , 
            piece[piece.length-1].drawingBoxEndY=piece[piece.length-1].y+Math.abs(piece[piece.length-1].drawingBoxStartY-piece[piece.length-1].drawingBoxEndY)
            colorSwatch();        
            
        }   
    }
}

function buildDrawBox(item) {
    drawingBoxGraphic = game.add.graphics(0, 0);
    drawingBoxGraphic.lineStyle(2, 0x000000, 1);
    drawingBoxGraphic.drawRect(item.drawingBoxStartX, item.drawingBoxStartY, item.drawingBoxEndX-item.drawingBoxStartX, item.drawingBoxEndY-item.drawingBoxStartY);
    piece[piece.length] = game.add.sprite(drawingBoxStartX,drawingBoxStartY,drawingBoxGraphic.generateTexture());
    drawingBoxGraphic.clear();
    piece[piece.length-1].type=99;
    piece[piece.length-1].drawingBoxStartX=item.drawingBoxStartX
    piece[piece.length-1].drawingBoxStartY=item.drawingBoxStartY
    piece[piece.length-1].drawingBoxEndX=item.drawingBoxEndX;
    piece[piece.length-1].drawingBoxEndY=item.drawingBoxEndY;
    piece[piece.length-1].x=item.drawingBoxStartX
    piece[piece.length-1].y=item.drawingBoxStartY

    
}

