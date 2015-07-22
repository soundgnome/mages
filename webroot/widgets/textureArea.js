var textureArea;
var newTextureTemp
function buildTextureArea(item) {
    var newTexture = game.add.sprite(0 ,0 ,  eval(item.textureExpression) )
    var bmd = game.add.bitmapData(newTexture.width,newTexture.height);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,newTexture.width,newTexture.height);
    bmd.ctx.fillStyle = '#DDDDDD';
    bmd.ctx.fill();
    
    piece[piece.length] = game.add.sprite(0, 0 , bmd)

    piece[piece.length-1].x=item.startX
    piece[piece.length-1].y=item.startY
    
    
    piece[piece.length-1].addChild(newTexture)
    
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, this);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, this);
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].textureExpression = item.textureExpression;
    piece[piece.length-1].type = item.type;
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].selectable = item.selectable;
    piece[piece.length-1].selectedExpression = item.selectedExpression;
    if(state!='build')
    {
        piece[piece.length-1].number = eval(item.number);
    } else
    {
        piece[piece.length-1].number = item.number;
    }
    piece[piece.length-1].dragOffsetX = 0
    piece[piece.length-1].dragOffsetY = 0
    piece[piece.length-1].dragDoneOffsetX = 0
    if(state!='build' && item.draggable == 1)
    {
        piece[piece.length-1].inputEnabled='true';
        
        piece[piece.length-1].input.useHandCursor=true;
        piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
        piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
    }
    if(item.selectable == 1)
    {
        addSelectionBehavior()   
    }
    
    if (typeof newTextureTemp === 'undefined') 
            { } else
            {
                newTextureTemp.clear()
            }
    
}



function buildFractionBar(item) {
    var colors = [0xFF0000,0xFFA500,0xFFFF00,0x008000,0x0000FF,0x4B0082,0xEE82EE,0xFF69B4,0xFFE4B5,0xADFF2F,0x48D1CC]
    piece[piece.length] = game.add.group();
    
    
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
   
    newGraphic.beginFill( (item.denominator<12? colors[item.denominator-1] : 0xA0522D), 1);
    newGraphic.drawRect(0, 0, item.scaleX*700 / item.denominator , item.scaleY*30);
    
    var barPieces = []
    for(var i = 0 ; i < item.denominator ; i ++)
    {
        barPieces.push(game.add.sprite (i*item.scaleX*700 / item.denominator ,0,newGraphic.generateTexture() ) )
        barPieces[barPieces.length-1].addChild( game.add.text(barPieces[barPieces.length-1].width/2, 0, "1", {
            font: 14*item.scaleY+'px Arial',
            fill: 'black',
            align: "center"
        }))
        barPieces[barPieces.length-1].addChild( game.add.text(barPieces[barPieces.length-1].width/2, -2*item.scaleY, "_", {
            font: 16*item.scaleY+'px Arial',
            fill: 'black',
            align: "center"
        }))
        barPieces[barPieces.length-1].addChild( game.add.text(barPieces[barPieces.length-1].width/2-(item.denominator>9?item.scaleX*4:0), 15*item.scaleY, item.denominator.toString(), {
            font: 14*item.scaleY+'px Arial',
            fill: 'black',
            align: "center"
        }))
        piece[piece.length-1].add(barPieces[barPieces.length-1])
    }
    
    newGraphic.clear();  //clean up texture

    
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].forEach(function(subitem) {
        subitem.inputEnabled='true';
        subitem.events.onInputDown.add(buildGroupPieceClick, this);
        subitem.events.onInputUp.add(onFinishDrag, draggingPiece);  
        subitem.ParentPosition=piece.length-1;
    });
    
    if(state!='build')
    {
        piece[piece.length-1].x = item.startX;
        piece[piece.length-1].y = item.startY;
        piece[piece.length-1].forEach(function(subitem) { 
            if(item.draggable == true)
            {
                subitem.inputEnabled='true';
                subitem.input.useHandCursor=true;
                subitem.events.onInputDown.add(startDraggingFractionBar, this);
                subitem.events.onInputUp.add(stopDraggingFractionBar, this); 
                //subitem.input.enableDrag(false, true);
                subitem.occupying = null;
                subitem.anchor.setTo(0,0)
            }
        });
        
    }
    piece[piece.length-1].type = 24;
    piece[piece.length-1].denominator = item.denominator;
    piece[piece.length-1].scaleX = item.scaleX;
    piece[piece.length-1].scaleY = item.scaleY;
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].color = item.color;
    
    
}

var fractionBarHandle = null;
function startDraggingFractionBar(barPiece) {
    fractionBarHandle = barPiece;
    game.world.bringToTop(barPiece.parent);
    
    //needed to compensate for the child/parent difference
    fractionBarHandle.xOffset = fractionBarHandle.x - game.input.x
    fractionBarHandle.yOffset = fractionBarHandle.y - game.input.y
    
    if ( barPiece.occupying != null ) //I'm in a box already
    {
        barPiece.occupying.contents -= (1/barPiece.parent.denominator) ;
        for (var i = barPiece.contentsSlot + 1 ; i < barPiece.occupying.contentsIDs.length; i++)
        {
            barPiece.occupying.contentsIDs[i].contentsSlot -= 1;
        }
        barPiece.occupying.contentsIDs.splice(barPiece.contentsSlot,1);
        fixSlotSpacing(barPiece.occupying);
        barPiece.occupying = null;
        
    }
    
    
    
}

function fixSlotSpacing(dragTo) {
        dragTo.contents = 0;
        for (var i = 0 ; i < dragTo.contentsIDs.length ; i++)
        {
            dragTo.contentsIDs[i].x = dragTo.x+(dragTo.contents*dragTo.width)-dragTo.contentsIDs[i].parent.x
            dragTo.contentsIDs[i].y = dragTo.y-dragTo.contentsIDs[i].parent.y
            dragTo.contents += (1/dragTo.contentsIDs[i].parent.denominator) ; 
        }
    }

function stopDraggingFractionBar(barPiece) {
    if(barPiece.occupying != null)
    {
       barPiece.occupying.contents += (1/barPiece.parent.denominator) ;
       barPiece.occupying.contentsIDs.push(barPiece)
       barPiece.contentsSlot = barPiece.occupying.contentsIDs.length-1;
       fixSlotSpacing(barPiece.occupying);
       barPiece.occupying.contents = parseFloat(barPiece.occupying.contents.toFixed(3))
       
    } else
    {
        barPiece.contentsSlot = null;
    }
    
    
    fractionBarHandle = null;
    

}

function dragFractionBar() {
    if(fractionBarHandle != null)
    {
        fractionBarHandle.x = game.input.x+fractionBarHandle.xOffset
        fractionBarHandle.y = game.input.y+fractionBarHandle.yOffset
        
        fractionBarDragToBoxes.forEach(function(item){
            if( (((item.x+item.width)-game.input.x)>0) && (((item.x+item.width)-game.input.x)<item.width) && (((item.y+item.height)-game.input.y)>0) && (((item.y+item.height)-game.input.y)<item.height) )
            {
                if(parseFloat((item.contents+1/fractionBarHandle.parent.denominator).toFixed(3))<=1)
                {
                    fractionBarHandle.x = item.x+(item.contents*item.width)-fractionBarHandle.parent.x
                    fractionBarHandle.y = item.y-fractionBarHandle.parent.y
                    fractionBarHandle.occupying = item;    
                }
            } else
            {
                fractionBarHandle.occupying = null;
            }
        });

    }
}

var fractionBarDragToBoxes = [];
function buildFractionBarDragToBox(item) {
    if(state!='build')
    {
        startX=item.startX;
        startY=item.startY;
    } else
    {
        startX=400;
        startY=250;
    }
    var dragToGraphic = game.add.graphics(0, 0);
    dragToGraphic.beginFill(0xFFFFFF);
    dragToGraphic.lineStyle(2, 0x000000, 1);
    dragToGraphic.drawRect(0, 0, item.scaleX*700, item.scaleY*30);
    dragToGraphic.endFill();
    
    piece[piece.length] = game.add.sprite(startX, startY, dragToGraphic.generateTexture());
    dragToGraphic.clear()
    piece[piece.length-1].anchor.setTo(0, 0);
    piece[piece.length-1].type=25;
    piece[piece.length-1].scaleX = item.scaleX;
    piece[piece.length-1].scaleY = item.scaleY;
    piece[piece.length-1].contents = 0 ;  //should this be null; test sometime?
    piece[piece.length-1].contentsIDs = [];
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, this);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, this);
    
    fractionBarDragToBoxes[fractionBarDragToBoxes.length] = piece[piece.length-1];  //add myself to the dragToBoxes array.
}






function testTexture() {
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
   
    newGraphic.beginFill(0xFF0000, 1);
    newGraphic.drawCircle(90, 90, 180);
    newGraphic.beginFill(0xFFAAAA, 1);
    newGraphic.drawCircle(90, 90, 120);
    newGraphic.beginFill(0xFFDDDD, 1);
    newGraphic.drawCircle(90, 90, 60);
    newGraphic.moveTo(0,0)
    newGraphic.lineTo(180,180)
    newGraphic.moveTo(180,0)
    newGraphic.lineTo(0,180)
    newTextureTemp = newGraphic
    return newGraphic.generateTexture();
}


function dotTexture(diameter) {
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(0, 0x000000, 1);
   
    newGraphic.beginFill(0x000000, 1);
    newGraphic.drawCircle(0, 0, diameter);
    newTextureTemp = newGraphic
    return newGraphic.generateTexture();
}


function rectangleFigureTexture(width, height, red, green, blue, unit, scale, hideLabel) {
    if (typeof scale === 'undefined') {scale = 1};
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
    var decColor = red + 256 * green + 65536 * blue;
    newGraphic.beginFill(decColor, 1);
    newGraphic.drawRect(0, 0, width*scale, height*scale);
    var image = game.add.group();
    image.add(newGraphic);

    width = width + " " + unit
    height = height + " " + unit
    if(hideLabel != true)
    {
        newLabel = game.add.text(newGraphic.width/2-(width.toString().length*5),-21, width.toString(), {
            font: "18px Arial",
            fill: "black",
            align: 'left'}); 
        image.add(newLabel);
        
        newLabel = game.add.text(0,newGraphic.height/2-10, height.toString(), {
            font: "18px Arial",
            fill: "black",
            align: 'left'}); 
        image.add(newLabel);
        newLabel.x = -(newLabel.width+3)   
    }
    
    var newGraphic = image.generateTexture();
    image.destroy();
    return newGraphic;
}

function imageArrayTexture(textureImage, quantity, orientation) {
    var image = game.add.group();
    var offSet = 0;
    for(var i = 0 ; i < quantity ; i++)
    {
        if(orientation == 'v')
        {
            image.create(0, image.height+offSet, textureImage);  
        } else
        {
            image.create(image.width+offSet, 0, textureImage); 
        }
        
        if(offSet == 0) {offSet = 5};
    }
    var newGraphic = image.generateTexture();
    image.destroy();
    return newGraphic;
}



function blockPattern(activeDirections, lengths) {
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(3, 0x000000, 1);
    newGraphic.beginFill(0xFFFFFF);
    newGraphic.drawRect(0, 0, 10, 10);
   
    
    for(var directionI = 0; directionI < activeDirections.length ; directionI++)
    {
        var blockX = 0;
        var blockY = 0;
        for(var i=0 ; i<lengths[directionI] ; i++) 
        {
            switch(activeDirections[directionI]) {
            case 1:
            blockX += 10;
            blockY += 0;
            break;
            
            case 2:
            blockX += 0;
            blockY += 10;
            break;
            
            case 3:
            blockX += -10;
            blockY += 0;
            break;
            
            default: //extend up only
            blockX += 0;
            blockY += -10;
            }
            newGraphic.drawRect(blockX, blockY, 10, 10);
        }    
    }
    
    newGraphic.endFill();
    newTextureTemp = newGraphic
    return newGraphic.generateTexture();
}


function getTextureAreaSettings(item) {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Teture Area Settings",
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Texture expression?" , "texture", "testTexture()" , null) +
                    getMenuEntryString("Texture value?" , "number", "1" , null) +
                    getMenuStaticDraggagbleSelectableString("Applet behavior: ", "behavior", "This describes the behavior at applet runtime.") +
                    //getMenuYesNoString("Draggable?", "draggable", "Allow user to drag.") + 
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var newObject = JSON.parse(JSON.stringify({
                                "type": 21, 
                                "startX":100 ,
                                "startY":10,
                                "textureExpression": $('#texture').val(),
                                "number": $('#number').val(),
                                "static" : ($("input[name='behavior']:checked").val() == "Static" ? 1 : 0) ,
                                "draggable" : ($("input[name='behavior']:checked").val() == "Draggable" ? 1 : 0) ,
                                "selectable" : ($("input[name='behavior']:checked").val() == "Selectable" ? 1 : 0)
                            })) ;
                            state = 'build';
                            buildTextureArea(newObject)
                            if(newObject.draggable == 1) {getClonableSettings()}
                        }
                    }
                }
            }
        );
}


