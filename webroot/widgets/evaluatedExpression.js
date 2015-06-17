var evaluatedExpression = [];
function buildEvaluatedExpression(item) {
     item.expression=decodeURIComponent(item.expression);   
    
    evaluatedExpression.push(eval(item.expression));
    if(state!='build')
    {
        fontString=item.font;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap
        newTextWidth=item.wordWrapWidth
        startX=item.startX;
        startY=item.startY;
    } else
    {
        startX=400;
        startY=250;
        fontString="" + newBold + " " + newTextSize + "px Arial";
    }
    piece[piece.length] = game.add.text(startX, startY, evaluatedExpression[evaluatedExpression.length-1].toString(), {
            font: fontString,
            fill: newTextColor,
            align: item.align,
            wordWrap: newTextWrap,
            wordWrapWidth: newTextWidth
    });
    
    piece[piece.length-1].anchor.setTo(0.5, 0.5);
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=15;
    piece[piece.length-1].align=item.align;
    piece[piece.length-1].fontString=fontString;
    piece[piece.length-1].fill=newTextColor;
    piece[piece.length-1].expression=item.expression;
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].selectable = item.selectable;
    piece[piece.length-1].selectedExpression = item.selectedExpression;
    piece[piece.length-1].dragOffsetX = -piece[piece.length-1].width/2
    if(item.draggable == 1)
    {
        piece[piece.length-1].dragOffsetY = piece[piece.length-1].height/2  //this was changes to accomodate 1-5   
    }
    if(item.selectable == 1)
    {
        piece[piece.length-1].dragOffsetY = -piece[piece.length-1].height/2  //this was changes to accomodate 1-5   
    }
    piece[piece.length-1].dragDoneOffsetX = piece[piece.length-1].width //this was changes to accomodate 1-5
    if(state!='build' && item.draggable == 1)
    {
        piece[piece.length-1].inputEnabled='true';
        console.log(item.align)
        piece[piece.length-1].input.useHandCursor=true;
        if(item.clonable == "1") //"n" is default
            {//clonable; add a cloning function
                piece[piece.length-1].events.onInputDown.add(evaluatedExpressionClickClone, this); 
            }  
        piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
        piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
        piece[piece.length-1].number = evaluatedExpression[evaluatedExpression.length-1];
        
    }
    if(item.selectable == 1)
    {
        addSelectionBehavior() 
    }
}

function evaluatedExpressionClickClone(item) {
    var newClone = game.add.text(item.x, item.y, item.number.toString(), {
                    font: item.fontString,
                    fill: item.fill,
                    align: item.align
                    }); 
    newClone.inputEnabled='true';
    newClone.events.onInputDown.add(evaluatedExpressionClickClone, this); 
    newClone.events.onInputDown.add(startDraggingNumber, this); 
    newClone.events.onInputUp.add(stopDraggingNumber, this); 
    
    newClone.number = item.number;
    newClone.size = Number(item.size);
    newClone.fontString = item.fontString;
    newClone.fill = item.fill;
    newClone.dragOffsetX = item.dragOffsetX;
    newClone.dragDoneOffsetX = item.dragDoneOffsetX;
    newClone.dragOffsetY = item.dragOffsetY;
    newClone.anchor.setTo(0.5, 0.5);
    
   
    newClone.x = item.x;
    newClone.y = item.y;
    evaluatedExpression.push(newClone);
}

function getEvaluatedExpressionSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Evaluated Expression Settings",
                message: 
                    getMenuEntryString("Expression:" , "expression", '2+2' , null) +
                    getMenuEntryString("Color" , "color", newTextColor , null) +
                    getMenuEntryString("Size" , "size", 72 , null) +
                    getMenuEntryString("Word wrap width:" , "wrapWidth", 0 , "Enter 0 to turn off wrap.") +
                    getMenuYesNoString("Bold?", "bold", null) +
                    getMenuEntryString("Alighnment? l/c/r:" , "alignment", "r" , null) +
                    getMenuStaticDraggagbleSelectableString("Applet behavior: ", "behavior", "This describes the behavior at applet runtime.") +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                           // newAppletID = Number(prompt("Enter new applet ID#:"));  
	                        // appletDoneTest = new DoneTest(newAppletID, prompt("Enter new doneTest:"));
                            if($("input[name='bold']:checked").val() == "Yes")
                            {
                                newBold="bold";
                            } else
                            {
                                newBold="";
                            }
                            if($('#wrapWidth').val() > 0)
                            {
                                newTextWrap=true;
                                newTextWidth = $('#wrapWidth').val() ;
                            } else
                            {
                                newTextWrap=false;
                            }
                            
                            var alignment;
                            switch($('#alignment').val() ) {
                                case 'l':
                                    alignment = 'left'
                                    break;
                                case 'c':
                                    alignment = 'center'
                                    break;
                                case 'r':
                                    alignment = 'right'
                                    break;
                            }
                            
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            var expression = $('#expression').val();
                            console.log(expression)
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({   
                                "type" : 15, 
                                "startX" : 400 , 
                                "startY" : 300 , 
                                "expression" : fixedEncodeURIComponent(expression)  , 
                                "fill" : newTextColor, 
                                "wordWrap" : newTextWrap, 
                                "wordWrapWidth": newTextWidth, 
                                "align": alignment,
                                "static" : ($("input[name='behavior']:checked").val() == "Static" ? 1 : 0) ,
                                "draggable" : ($("input[name='behavior']:checked").val() == "Draggable" ? 1 : 0) ,
                                "selectable" : ($("input[name='behavior']:checked").val() == "Selectable" ? 1 : 0)
                                })) ;
                            state = 'build'
                            buildEvaluatedExpression(newObject)
                            adjustNewPiece()
                        }
                    }
                }
            }
        );
    
}