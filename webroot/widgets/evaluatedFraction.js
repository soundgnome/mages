var evaluatedNumerator = [];
var evaluatedDenominator = [];
var evaluatedWhole = [];
function buildEvaluatedFraction(item) {
    
    var fontString;

    var newNumeratorEvaluated = eval(item.numeratorExpression)
    var newDenominatorEvaluated = eval(item.denominatorExpression) 
    if(item.wholeExpression != "null")
    {
        var newWholeEvaluated = eval(item.wholeExpression); 
    } else
    {
        var newWholeEvaluated = 0;
    }
    
    evaluatedWhole.push(newWholeEvaluated);
    evaluatedNumerator.push(newNumeratorEvaluated);
    evaluatedDenominator.push(newDenominatorEvaluated);
    if(state!='build')
    {
        fontString="" + newBold + " " + item.size + "px Arial";
        wholeFontString = "" + newBold + " " + item.size*2 + "px Arial";
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
    } else
    {
        fontString="" + newBold + " " + newTextSize + "px Arial";
        wholeFontString="" + newBold + " " + newTextSize*2 + "px Arial";
        item.size = newTextSize;
    }
    
    var wholeOffset = 0
    console.log(item.wholeExpression)
    if(item.wholeExpression != "null")
    {
        var newWholeEvaluatedText = game.add.text(-item.size/2.5, 0, newWholeEvaluated.toString(), {
            font: wholeFontString,
            fill: newTextColor,
            align: "center"
        });
        wholeOffset += newWholeEvaluatedText.width
    }

    var newNumeratorEvaluatedText = game.add.text(wholeOffset + item.size/2.5, 0, newNumeratorEvaluated.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    var newDenominatorEvaluatedText = game.add.text(wholeOffset + item.size/2.5, item.size, newDenominatorEvaluated.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    
    var fractionBarText = game.add.text(wholeOffset -item.size/2.5, 0, "___", {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    
    var boxLength = Number(item.size)*1.4
    var boxGraphic = game.add.graphics(0, 0);
    boxGraphic.lineStyle(2, 0x000000, 1)
    boxGraphic.drawCircle(0, -boxLength*.5, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(0, boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(wholeOffset+boxLength, -boxLength*.5, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(wholeOffset+boxLength, boxLength, 0.01);//these four dots keep the whole thing centered
    
    piece[piece.length] = game.add.sprite(0,0, boxGraphic.generateTexture());
    boxGraphic.clear();
    newNumeratorEvaluatedText.anchor.setTo(0.5,0)
    newDenominatorEvaluatedText.anchor.setTo(0.5,0)
    //piece[piece.length] = game.add.sprite(0,0,'fractionBar');
    piece[piece.length-1].anchor.setTo(0.2,0)
    piece[piece.length-1].addChild(fractionBarText);
    piece[piece.length-1].addChild(newNumeratorEvaluatedText);
    piece[piece.length-1].addChild(newDenominatorEvaluatedText);
    if(item.wholeExpression != "null")
    {
        piece[piece.length-1].addChild(newWholeEvaluatedText)
    }
    
    piece[piece.length-1].scale.setTo(item.size/40, item.size/40);
    
    piece[piece.length-1].fontString="" + newBold + " " + item.size + "px Arial";
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].selectable = item.selectable;
    piece[piece.length-1].selectedExpression = item.selectedExpression;
    piece[piece.length-1].anchor.setTo(0.5, 0.5); 
    if(state != 'build')
    {
        piece[piece.length-1].x=item.startX;
        piece[piece.length-1].y=item.startY;
        piece[piece.length-1].dragOffsetX = -item.size/3
        piece[piece.length-1].dragOffsetY = 0
        piece[piece.length-1].dragDoneOffsetX = boxLength*.4
        if(item.draggable == 1)
        {
            piece[piece.length-1].inputEnabled='true';
            piece[piece.length-1].input.useHandCursor=true;
            piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
            piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
            piece[piece.length-1].number = newWholeEvaluated+newNumeratorEvaluated/newDenominatorEvaluated;
        }
    } else
    {
        piece[piece.length-1].x=400;
        piece[piece.length-1].y=300;
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].events.onInputDown.add(buildGroupPieceClick, this);
        piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
        piece[piece.length-1].clicked=0;
        piece[piece.length-1].ParentPosition=piece.length-1;
        piece[piece.length-1].fontString="" + newBold + " " + newTextSize + "px Arial";
        piece[piece.length-1].fill = newTextColor;
        piece[piece.length-1].size = newTextSize;
        piece[piece.length-1].grouped=1;
        piece[piece.length-1].type=3;
    }
    piece[piece.length-1].numeratorExpression = item.numeratorExpression;
    piece[piece.length-1].denominatorExpression = item.denominatorExpression;

    piece[piece.length-1].wholeExpression = item.wholeExpression;

    if(item.selectable == 1)
    {
        addSelectionBehavior()   
    }
}

function getEvaluatedFractionSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Evaluated Fraction Settings",
                closeButton: false,
                message: 
                getMenuEntryString("Whole number expression:" , "wholeExpression", null , "(null for a regular fraction.)") +
                getMenuEntryString("Numerator Expression" , "numExpression", 1 ) +
                getMenuEntryString("Denominator Expression" , "denExpression", "getRandomInt(1,10)" ) +
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
                            
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({ 
                                "wholeExpression":$('#wholeExpression').val(),
                                "numeratorExpression":$('#numExpression').val(),
                                "denominatorExpression":$('#denExpression').val(),
                                "static" : ($("input[name='behavior']:checked").val() == "Static" ? 1 : 0) ,
                                "draggable" : ($("input[name='behavior']:checked").val() == "Draggable" ? 1 : 0) ,
                                "selectable" : ($("input[name='behavior']:checked").val() == "Selectable" ? 1 : 0)
                                })) ;
                            buildEvaluatedFraction(newObject);
                            adjustNewPiece();
                            
                        }
                    }
                }
            }
        );
}
