var randomDecimal = [];
function buildRandomDecimal(item) {
    var startX;
    var startY;
    var fontString;
    
    if(state!='build')
    {
        fontString=item.font;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        newTextSize = item.size;
        startX=item.startX;
        startY=item.startY;
    } else
    {
        fontString="" + newBold + " " + newTextSize + "px Arial";
        startX=400;
        startY=250;
    }
    
    var newRandom = getRandomDecimal(Number(item.randomFloor), Number(item.randomCeiling) , Number(item.randomDigits) );
    randomDecimal.push(newRandom);
    piece[piece.length] = game.add.text(startX, startY, newRandom.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    piece[piece.length-1].randomFloor = item.randomFloor;
    piece[piece.length-1].randomCeiling = item.randomCeiling;
    piece[piece.length-1].randomDigits = item.randomDigits;
    piece[piece.length-1].fontString=fontString;
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].anchor.setTo(0.5, 0.5);
    piece[piece.length-1].type=6;
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].selectable = item.selectable;
    piece[piece.length-1].selectedExpression = item.selectedExpression;
    piece[piece.length-1].dragOffsetX = -piece[piece.length-1].width/2
    piece[piece.length-1].dragOffsetY = -piece[piece.length-1].height/2
    piece[piece.length-1].dragDoneOffsetX = piece[piece.length-1].width/2
    if(state!='build' && item.draggable == 1)
    {
        piece[piece.length-1].inputEnabled='true';
        console.log(item.align)
        
        
        
        piece[piece.length-1].input.useHandCursor=true;
        piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
        piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
        piece[piece.length-1].number = evaluatedExpression[evaluatedExpression.length-1];
        
    }
    if(item.selectable == 1)
    {
        addSelectionBehavior() 
    }
    
    
}

function getRandomDecimalSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Random Decimal Settings",
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Floor" , "floor", 0 , null) +
                    getMenuEntryString("Ceiling" , "ceiling", 10 , null) +
                    getMenuEntryString("Digits" , "digits", 2 , null) +
                    getMenuEntryString("Color" , "color", newTextColor , null) +
                    getMenuEntryString("Size" , "size", 72 , null) +
                    getMenuYesNoString("Bold?", "bold", null) +
                    getMenuStaticDraggagbleSelectableString("Applet behavior: ", "behavior", "This describes the behavior at applet runtime.") +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            if($("input[name='bold']:checked").val() == "Yes")
                            {
                                newBold="bold";
                            } else
                            {
                                newBold="";
                            }
                            
                            var newRandomFloor = $('#floor').val();
                            var newRandomCeiling = $('#ceiling').val();
                            var newRandomDigits = $('#digits').val();
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({   
                                "randomCeiling":newRandomCeiling,
                                "randomFloor":newRandomFloor,
                                "randomDigits":newRandomDigits,
                                "static" : ($("input[name='behavior']:checked").val() == "Static" ? 1 : 0) ,
                                "draggable" : ($("input[name='behavior']:checked").val() == "Draggable" ? 1 : 0) ,
                                "selectable" : ($("input[name='behavior']:checked").val() == "Selectable" ? 1 : 0)
                                })) ;
                            state = 'build'
                            buildRandomDecimal(newObject);
                            adjustNewPiece();
                            
                        }
                    }
                }
            }
        );
}