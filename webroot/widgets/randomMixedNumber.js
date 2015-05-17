function MixedNumberConstructor(wholeNumber , numerator , denominator) {
    this.wholeNumber = wholeNumber;
    this.numerator = numerator;
    this.denominator = denominator;
}



function buildRandomMixedNumber(item) {
    //(applet[i].wholeNumberRandomFloor, applet[i].wholeNumberRandomCeiling, applet[i].numeratorRandomFloor, applet[i].numeratorRandomCeiling, applet[i].denominatorRandomFloor, applet[i].denominatorRandomCeiling, i);
    var newWholeNumberRandom = getRandomInt(Number(item.wholeNumberRandomFloor), Number(item.wholeNumberRandomCeiling) );
    var newNumeratorRandom = getRandomInt(Number(item.numeratorRandomFloor), Number(item.numeratorRandomCeiling) );
    var newDenominatorRandom = getRandomInt(Number(item.denominatorRandomFloor), Number(item.denominatorRandomCeiling) );
    randomMixedNumber.push(new MixedNumberConstructor(newWholeNumberRandom, newNumeratorRandom, newDenominatorRandom));
    if(state!='build')
    {
        fontString=item.font;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        newTextSize = item.size;

    } else
    {
  
    }
        var fontString = newTextSize + "px Arial";
        var bigFontString = newTextSize*2 + "px Arial";
    var newWholeNumberRandomText = game.add.text(newTextSize/2, 0, newWholeNumberRandom.toString(), {
            font: bigFontString,
            fill: newTextColor,
            align: "right"
    });
    
    var newNumeratorRandomText = game.add.text(newTextSize*1.5, 0, newNumeratorRandom.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    var newDenominatorRandomText = game.add.text(newTextSize*1.5, newTextSize, newDenominatorRandom.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    
    var fractionBarText = game.add.text(newTextSize*1.5, 0, "___", {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    
    var boxLength = Number(newTextSize)
    var boxGraphic = game.add.graphics(0, 0);
    boxGraphic.lineStyle(2, 0x000000, 1)
    boxGraphic.drawCircle(0, -boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(0, boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(boxLength*3, -boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(boxLength*3, boxLength, 0.01);//these four dots keep the whole thing centered
    
    
    piece[piece.length] = game.add.sprite(0,0, boxGraphic.generateTexture());
    boxGraphic.clear();
    newNumeratorRandomText.anchor.setTo(0.5,0)
    newDenominatorRandomText.anchor.setTo(0.5,0)
    fractionBarText.anchor.setTo(0.5,0)
    newWholeNumberRandomText.anchor.setTo(1,0)
    //piece[piece.length] = game.add.sprite(0,0,'fractionBar');
    piece[piece.length-1].addChild(fractionBarText);
    piece[piece.length-1].addChild(newNumeratorRandomText);
    piece[piece.length-1].addChild(newDenominatorRandomText);
    piece[piece.length-1].addChild(newWholeNumberRandomText);
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].x=400;
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].selectable = item.selectable;
    piece[piece.length-1].selectedExpression = item.selectedExpression;
    if(state != 'build')
    {
        piece[piece.length-1].x=item.startX;
        piece[piece.length-1].y=item.startY;
        piece[piece.length-1].dragOffsetX = -boxLength/2 ;
        piece[piece.length-1].dragOffsetY = 0
        piece[piece.length-1].dragDoneOffsetX = boxLength
        if(item.draggable == 1)
        {
            piece[piece.length-1].align = 'center'
            piece[piece.length-1].input.useHandCursor=true;
            piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
            piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
            piece[piece.length-1].number = newWholeNumberRandom+newNumeratorRandom/newDenominatorRandom;
            
        }
    }
    if(item.selectable == 1)
    {
        addSelectionBehavior()   
    }
    

    
    piece[piece.length-1].events.onInputDown.add(buildGroupPieceClick, this);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
    piece[piece.length-1].clicked=0;
    piece[piece.length-1].ParentPosition=piece.length-1;

    piece[piece.length-1].wholeNumberRandomFloor = item.wholeNumberRandomFloor;
    piece[piece.length-1].wholeNumberRandomCeiling = item.wholeNumberRandomCeiling;
    piece[piece.length-1].numeratorRandomFloor = item.numeratorRandomFloor;
    piece[piece.length-1].numeratorRandomCeiling = item.numeratorRandomCeiling;
    piece[piece.length-1].denominatorRandomFloor = item.denominatorRandomFloor;
    piece[piece.length-1].denominatorRandomCeiling = item.denominatorRandomCeiling;
    piece[piece.length-1].fontString="" + newBold + " " + newTextSize + "px Arial";
    piece[piece.length-1].fill = newTextColor;
    piece[piece.length-1].size = newTextSize;
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=7;
}

function getRandomMixedNumberSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Random Mixed Number Settings",
                message: 
                    getMenuEntryString("Whole Number Floor" , "floor", 1, null ) +
                    getMenuEntryString("Whole Number Ceiling" , "ceiling", 10 , null) +
                    getMenuEntryString("Numerator Floor" , "numfloor", 1 ) +
                    getMenuEntryString("Numerator Ceiling" , "numceiling", 10 , null) +
                    getMenuEntryString("Denominator Floor" , "denfloor", 1 ) +
                    getMenuEntryString("Denominator Ceiling" , "denceiling", 10 , null) +
                    getMenuEntryString("Color" , "color", newTextColor , null) +
                    getMenuEntryString("Size" , "size", 36 , null) +
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
                            var newWholeNumberRandomFloor = $('#floor').val();
                            var newWholeNumberRandomCeiling = $('#ceiling').val();
                            var newNumeratorRandomFloor = $('#numfloor').val();
                            var newNumeratorRandomCeiling = $('#numceiling').val();
                            var newDenominatorRandomFloor = $('#denfloor').val();
                            var newDenominatorRandomCeiling = $('#denceiling').val();
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                             state = 'build';
                            var newObject = JSON.parse(JSON.stringify({   
                                "wholeNumberRandomCeiling":newWholeNumberRandomCeiling,
                                "wholeNumberRandomFloor":newWholeNumberRandomFloor,
                                "numeratorRandomCeiling":newNumeratorRandomCeiling,
                                "numeratorRandomFloor":newNumeratorRandomFloor,
                                "denominatorRandomCeiling":newDenominatorRandomCeiling,
                                "denominatorRandomFloor":newDenominatorRandomFloor,
                                "static" : ($("input[name='behavior']:checked").val() == "Static" ? 1 : 0) ,
                                "draggable" : ($("input[name='behavior']:checked").val() == "Draggable" ? 1 : 0) ,
                                "selectable" : ($("input[name='behavior']:checked").val() == "Selectable" ? 1 : 0)
                                })) ;
                            buildRandomMixedNumber(newObject);
                            adjustNewPiece();
                           
                    }
                }
            }
        }
    );
}
