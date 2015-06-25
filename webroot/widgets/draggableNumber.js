//this makes a copy of the original number that can now make a copy of itself
var draggableNumbers = []
function draggableNumbersClickClone(item) {
    var newClone = game.add.text(item.x, item.y, item.number.toString(), {
                    font: item.fontString,
                    fill: item.fill,
                    align: "center"
                    }); 
    newClone.inputEnabled='true';
    newClone.events.onInputDown.add(draggableNumbersClickClone, this); 
    newClone.events.onInputDown.add(startDraggingNumber, this); 
    newClone.events.onInputUp.add(stopDraggingNumber, this); 
    
    newClone.number = item.number;
    newClone.size = Number(item.size);
    newClone.fontString = item.fontString;
    newClone.fill = item.fill;
    newClone.dragOffsetX = item.dragOffsetX;
    newClone.dragDoneOffsetX = item.dragDoneOffsetX;
    newClone.dragOffsetY = 0
    
   
    newClone.x = item.x;
    newClone.y = item.y;
    draggableNumbers.push(newClone);
}

var draggablePieces = [];
function buildDraggableNumbers(item) {
    piece.forEach(function(item) {
        if(item.type == 8)
        {
            console.log("previous number strip found - only one per applet");
            item.deleted=true;
            item.destroy(true);
        }
    });
    var loadOffsetX=0;
    var loadOffsetY=0;
    piece[piece.length] = game.add.group();   
    var fontString;
    
    if(state!='build')
    {
        fontString = item.size + "px Arial";
        loadOffsetX=item.startX;
        loadOffsetY=item.startY;
    } else
    {
        item.startX=400;
        item.startY=250;
        fontString=item.size + "px Arial";
    }
    
    for(var i = 0; i < 10; i++)
    {
        if(item.orientation == "h")
        {                           
            draggablePieces[i] = game.add.text((i-5)*item.size/1.5+loadOffsetX, 0+loadOffsetY, i.toString(), {
            font: fontString,
            fill: item.fill,
            align: "center"
            }); 
        } else
        {
            draggablePieces[i] = game.add.text(0+loadOffsetX, (i-5)*item.size/1.1+loadOffsetY, i.toString(), {
            font: item.size + "px Arial",
            fill: item.fill,
            align: "center"
            }); 
        }
        draggableNumbers.push(draggablePieces[i]);
    }
    

    if(state!='build')
    {
        for(var slot = 0; slot < 10; slot++)
        {
            draggableNumbers[slot].inputEnabled='true';
            draggableNumbers[slot].number=slot;
            draggableNumbers[slot].type=8;
            piece[piece.length-1].startX = loadOffsetX;
            piece[piece.length-1].startY = loadOffsetY;
            
            draggableNumbers[slot].fontString=item.size + "px Arial";
            draggableNumbers[slot].size=item.size;
            draggableNumbers[slot].inputEnabled='true';
            draggableNumbers[slot].input.useHandCursor=true; 
            draggableNumbers[slot].dragOffsetX = 0;
            draggableNumbers[slot].dragDoneOffsetX = 0;
            draggableNumbers[slot].dragOffsetY = 0
            if(item.clonable != "No") //"n" is default
            {//clonable; add a cloning function
                draggableNumbers[slot].events.onInputDown.add(draggableNumbersClickClone, this); 
            }  
            draggableNumbers[slot].events.onInputDown.add(startDraggingNumber, this);
            draggableNumbers[slot].events.onInputUp.add(stopDraggingNumber, this); 
            
        }
    } else
    {
            for(i = 0; i < 10; i++)
            {
                piece[piece.length-1].add(draggablePieces[i]);
            }
            piece[piece.length-1].grouped=1;
            
            piece[piece.length-1].x = item.startX;
            piece[piece.length-1].y = item.startY;
            
            
            piece[piece.length-1].forEach(function(item) {
                item.inputEnabled='true';
                item.events.onInputDown.add(buildGroupPieceClick, this);
                item.events.onInputUp.add(onFinishDrag, draggingPiece);
                item.clicked=0;
                item.ParentPosition=piece.length-1;
        });
    }
    piece[piece.length-1].type=8;
    piece[piece.length-1].orientation = item.orientation;
    console.log(item.clonable)
    piece[piece.length-1].clonable = item.clonable;
    piece[piece.length-1].size = item.size;
    piece[piece.length-1].fill = item.fill;
    
}

function getDraggableNumbersSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Draggable Number Settings",
                onEscape: function() {state='build'},
                message: 
                getMenuEntryString("Orientation? h/v:" , "orientation", "h" , null) +
                getMenuEntryString("Color:" , "color", newTextColor , null) +
                getMenuEntryString("Size:" , "size", 40 , null) +
                getMenuYesNoString("Clonable?:", "clonable", null) +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var orientation = $('#orientation').val();
                            var clonable = $("input[name='clonable']:checked").val() ;
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            console.log($('#clonable').val())
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({
                                "type": 8, 
                                "orientation":orientation ,
                                "clonable":clonable,
                                "fill":newTextColor ,
                                "size":newTextSize,
                                "startX" : 400 , 
                                "startY" : 300 , 
                                })) ;
                                console.log(newObject)
                            buildDraggableNumbers(newObject)
                            
                        }
                    }
                }
            }
        );
    
}
