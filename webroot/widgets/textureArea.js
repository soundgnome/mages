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

    //textureArea.push(piece[piece.length-1]);
    //lastTexture.clear()
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

function rectangleFigureTexture(width, height, red, green, blue, label, scale) {
    if (typeof scale === 'undefined') {scale = 1};
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
    var decColor = red + 256 * green + 65536 * blue;
    newGraphic.beginFill(decColor, 1);
    newGraphic.drawRect(0, 0, width*scale, height*scale);
    var image = game.add.group();
    image.add(newGraphic);

    width = width + " " + label
    height = height + " " + label
    
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
    newLabel.x = -(newLabel.width+2)
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
                            console.log($("input[name='behavior']:checked").val() )
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

