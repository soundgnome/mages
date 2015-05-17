function buildRandomNumber(item) {
    var newRandom = getRandomInt(Number(item.randomFloor), Number(item.randomCeiling) );
    var startX;
    var startY;
    var fontString;
    randomNumber.push(newRandom);
    if(state!='build')
    {
        fontString=item.font;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        startX=item.startX;
        startY=item.startY;
    } else
    {
        startX=400;
        startY=250;
        fontString="" + newBold + " " + newTextSize + "px Arial";
    }
    
    piece[piece.length] = game.add.text(startX, startY, addCommas(newRandom), {
            font: fontString,
            fill: newTextColor,
            align: "right"
    });
    piece[piece.length-1].anchor.setTo(1, 0);
    piece[piece.length-1].randomFloor = item.randomFloor;
    piece[piece.length-1].randomCeiling = item.randomCeiling;
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=2;
    piece[piece.length-1].fontString=fontString; 
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].selectable = item.selectable;
    piece[piece.length-1].selectedExpression = item.selectedExpression;
    piece[piece.length-1].dragOffsetX = -piece[piece.length-1].width
    piece[piece.length-1].dragOffsetY = 0
    piece[piece.length-1].dragDoneOffsetX = piece[piece.length-1].width*2
    if(state!='build' && item.draggable == 1)
    {
        piece[piece.length-1].inputEnabled='true';
        
        piece[piece.length-1].input.useHandCursor=true;
        piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
        piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
        piece[piece.length-1].number = newRandom;
        
    }
    if(item.selectable == 1)
    {
        addSelectionBehavior()   
    }
}

function getRandomNumberSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Random Number Settings",
                message: 
                getMenuEntryString("Whole Number Floor" , "floor", 1, null ) +
                getMenuEntryString("Whole Number Ceiling" , "ceiling", 10 , null) +
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
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({   
                                "randomCeiling":newRandomCeiling,
                                "randomFloor":newRandomFloor,
                                "static" : ($("input[name='behavior']:checked").val() == "Static" ? 1 : 0) ,
                                "draggable" : ($("input[name='behavior']:checked").val() == "Draggable" ? 1 : 0) ,
                                "selectable" : ($("input[name='behavior']:checked").val() == "Selectable" ? 1 : 0)
                                })) ;
                            buildRandomNumber(newObject);
                            adjustNewPiece();
                           
                        }
                    }
                }
            }
        );
}