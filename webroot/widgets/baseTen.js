var hundredBlock;
var tenBlock;
var oneBlock;
var baseTenDragToContents = 0;
var baseTenBlocks = []

function buildBaseTenBlocks(item) {
    buildBaseTenDragTo(item.dragX,item.dragY, item.dragWidth, item.dragHeight);
    adjustNewPiece();
    
    
    piece[piece.length] = game.add.group();
    oneBlock = piece[piece.length-1].create(0, 0, drawBaseTenOne().generateTexture());
    oneBlock.value = 1;
    baseTenGraphic.clear();
    tenBlock = piece[piece.length-1].create(0, 50, drawBaseTenTen().generateTexture());
    tenBlock.value = 10;
    baseTenGraphic.clear();
    hundredBlock = piece[piece.length-1].create(0, 150, drawBaseTenHundred().generateTexture());

    hundredBlock.value = 100;
    baseTenGraphic.clear();

    piece[piece.length-1].x=item.startX;
    piece[piece.length-1].y=item.startY;
    piece[piece.length-1].startX=item.startX;
    piece[piece.length-1].startY=item.startY;
    
    if (state !='build') {
        fixBaseTenBlocks(oneBlock, item.startX, item.startY)
        fixBaseTenBlocks(tenBlock, item.startX, item.startY)
        fixBaseTenBlocks(hundredBlock, item.startX, item.startY)
    } else
    {
        oneBlock.anchor.setTo(0.5,0.5)
        tenBlock.anchor.setTo(0.5,0.5)
        hundredBlock.anchor.setTo(0.5,0.5)
    }
    piece[piece.length-1].forEach(function(item) {
        
        if(state != 'build')
        {
        } else
        {
            item.inputEnabled='true';
            item.ParentPosition=piece.length-1;
            item.startX = item.startX;
            item.startY = item.startY;
            item.events.onInputDown.add(buildGroupPieceClick, this);
            item.events.onInputUp.add(onFinishDrag, draggingPiece);
        }
    });
    
    piece[piece.length-1].type=13;
    piece[piece.length-1].grouped=1;
    
    
    
}

function fixBaseTenBlocks(item, startX, startY) {
    var newClone
    switch(item.value) {
    case 1:
        newClone = game.add.sprite(startX+0, startY+0, drawBaseTenOne().generateTexture());
        newClone.value = 1;
        baseTenGraphic.clear();
        break;
        
    case 10:
        newClone = game.add.sprite(startX+0, startY+50, drawBaseTenTen().generateTexture());
        newClone.value = 10;
        baseTenGraphic.clear();
        break;
        
    case 100:
        newClone = game.add.sprite(startX+0, startY+150, drawBaseTenHundred().generateTexture());
        newClone.value = 100;
        baseTenGraphic.clear();
        break;
}
    newClone.inputEnabled='true';
    newClone.input.useHandCursor=true; 
    newClone.anchor.setTo(0.5, 0.5);
    newClone.events.onInputDown.add(baseTenBlocksClickClone, this); 
    newClone.events.onInputDown.add(startDraggingBaseTenBlocks, this);
    newClone.events.onInputUp.add(stopDraggingBaseTenBlocks, this); 
    newClone.startX = startX;
    newClone.startY = startY;
    baseTenBlocks.push(newClone);
    item.destroy(true);
    
    
}


function baseTenBlocksClickClone(item) {
    var newClone = game.add.group();
    switch(item.value) {
    case 1:
        newClone = newClone.create(0, 0, drawBaseTenOne().generateTexture());
        newClone.value = 1;
        baseTenGraphic.clear();
        break;
        
    case 10:
        newClone = newClone.create(0, 50, drawBaseTenTen().generateTexture());
        newClone.value = 10;
        baseTenGraphic.clear();
        break;
        
    case 100:
        newClone = newClone.create(0, 150, drawBaseTenHundred().generateTexture());
        newClone.value = 100;
        baseTenGraphic.clear();
        break;
}
    newClone.x = newClone.x+item.startX
    newClone.y = newClone.y+item.startY
    newClone.anchor.setTo(0.5,0.5)
    newClone.inputEnabled='true';
    newClone.input.useHandCursor=true; 
    newClone.events.onInputDown.add(baseTenBlocksClickClone, this); 
    newClone.events.onInputDown.add(startDraggingBaseTenBlocks, this);
    newClone.events.onInputUp.add(stopDraggingBaseTenBlocks, this); 
    newClone.bringToTop();
    newClone.value = item.value
    newClone.startX = item.startX;
    newClone.startY = item.startY;
    newClone.ParentPosition = item.ParentPosition;
    baseTenBlocks.push(newClone);
}

function stopDraggingBaseTenBlocks(item) {
    draggingBlock=0;
     if(Math.abs(baseTenDragTo.startX-draggingBlockHandle.x) < baseTenDragTo.width/2 && Math.abs(baseTenDragTo.startY-draggingBlockHandle.y) < baseTenDragTo.height/2 ) {
         draggingBlockHandle.occupying = 1;
     }
    if(draggingBlockHandle.occupying == 1)
    {
        baseTenDragToContents += item.value;   
    }
}

var draggingBlockHandle;
var draggingBlock=0;
function startDraggingBaseTenBlocks(item) {
    if(item.occupying == 1)
    {
        baseTenDragToContents -= item.value;
    }
    draggingBlock=1;
    game.world.bringToTop(item);  //bring the number above the boxes
    draggingBlockHandle=item;
    item.events.onInputDown.remove(baseTenBlocksClickClone, this); //we don't want it to clone over and over
}

function dragBaseTenBlock() {
    if(draggingBlock==1)
    {
        draggingBlockHandle.occupying = 0;
        draggingBlockHandle.x=game.input.x;
        draggingBlockHandle.y=game.input.y;
        if(Math.abs(baseTenDragTo.startX-draggingBlockHandle.x) < baseTenDragTo.width/2+(draggingBlockHandle.value < 10 ? 10 : 50) && Math.abs(baseTenDragTo.startX-draggingBlockHandle.x) > baseTenDragTo.width/2-(draggingBlockHandle.value < 10 ? 10 : 50) ) {
            if(Math.abs(baseTenDragTo.startY-draggingBlockHandle.y) < baseTenDragTo.height/2) {
               if(draggingBlockHandle.x > baseTenDragTo.startX)
               {
                  draggingBlockHandle.x =  baseTenDragTo.startX + baseTenDragTo.width/2 - (draggingBlockHandle.value < 10 ? 10 : 50)
               } else
               {
                  draggingBlockHandle.x =  baseTenDragTo.startX - baseTenDragTo.width/2 + (draggingBlockHandle.value < 10 ? 10 : 50)
               }
            }
        }
        if(Math.abs(baseTenDragTo.startY-draggingBlockHandle.y) < baseTenDragTo.height/2+(draggingBlockHandle.value < 100 ? 10 : 50) && Math.abs(baseTenDragTo.startY-draggingBlockHandle.y) > baseTenDragTo.height/2-(draggingBlockHandle.value < 100 ? 10 : 50) ) {
            if(Math.abs(baseTenDragTo.startX-draggingBlockHandle.x) < baseTenDragTo.width/2) {
               if(draggingBlockHandle.y > baseTenDragTo.startY)
               {
                  draggingBlockHandle.y =  baseTenDragTo.startY + baseTenDragTo.height/2 - (draggingBlockHandle.value < 100 ? 10 : 50)
               } else
               {
                  draggingBlockHandle.y =  baseTenDragTo.startY - baseTenDragTo.height/2 + (draggingBlockHandle.value < 100 ? 10 : 50)
               }
            }
        }
    }
}


var baseTenGraphic
function drawBaseTenOne() {
    baseTenGraphic = game.add.graphics(0, 0);
    baseTenGraphic.beginFill(0xFFFFFF);
    baseTenGraphic.lineStyle(3, 0x000000, 1);
    baseTenGraphic.drawRect(0, 0, 10, 10);
    baseTenGraphic.endFill();
    return baseTenGraphic;
}

function drawBaseTenTen() {
    baseTenGraphic = game.add.graphics(0, 0);
    baseTenGraphic.beginFill(0xFFFFFF);
    for(var i=0 ; i<10 ; i++) {
        baseTenGraphic.lineStyle(3, 0x000000, 1);
        baseTenGraphic.drawRect(i*10, 0, 10, 10);
    }
    baseTenGraphic.endFill();
    return baseTenGraphic;
}

function drawBaseTenHundred() {
    baseTenGraphic = game.add.graphics(0, 0);
    baseTenGraphic.beginFill(0xFFFFFF);
    for(var i=0 ; i<10 ; i++) {
        for (var j=0; j<10 ; j++) {
            baseTenGraphic.lineStyle(3, 0x000000, 1);
            baseTenGraphic.drawRect(i*10, j*10, 10, 10);    
        }
    }
    baseTenGraphic.endFill();
    return baseTenGraphic;
}

var dragToGraphic;
var baseTenDragTo;

function buildBaseTenDragTo(startX, startY, boxWidth, boxHeight) {
    baseTenDragToContents = 0;
    baseTenDragTo = JSON.parse(JSON.stringify({    
                        "startX": startX, 
                        "startY": startY, 
                        "width":boxWidth, 
                        "height":boxHeight
                        }));
    piece[piece.length] = game.add.sprite(0, 0, drawBaseTenDragTo(boxWidth, boxHeight).generateTexture());
    dragToGraphic.clear();
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type='13a';
    if(state != 'build')
    {
        piece[piece.length-1].x = startX;
        piece[piece.length-1].y = startY;
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].events.onInputDown.add(doneButtonClick, this);
        piece[piece.length-1].anchor.setTo(0.5, 0.5);
    }
}

function drawBaseTenDragTo(width, height) {
    dragToGraphic = game.add.graphics(0, 0);
    dragToGraphic.beginFill(0xFFFFFF);
    dragToGraphic.drawRect(0, 0, width, height); 
    dragToGraphic.endFill();
    return dragToGraphic;
}
