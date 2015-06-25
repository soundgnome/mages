var textureArea;
var newTextureTemp
function buildTextureArea(item) {
    console.log(item.textureExpression)
    var newTexture = game.add.sprite(0 ,0 ,  eval(item.textureExpression) )
    var bmd = game.add.bitmapData(newTexture.width,newTexture.height);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,newTexture.width,newTexture.height);
    bmd.ctx.fillStyle = '#CCCCCC';
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
    console.log(item.textureExpression)
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
    
    
    newTextureTemp.clear()
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

