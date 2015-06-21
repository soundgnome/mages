function getPrintSettings() {
   
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Print Applet Settings",
                message: 
                getMenuEntryString("New applet ID#:" , "appletid", 0 , null) +
                getMenuEntryString("New doneTest:", "donetest", "multipleChoiceCorrectAnswer==multipleChoiceSelected" , "This will be evaluated when the used presses the done button.") +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                           // newAppletID = Number(prompt("Enter new applet ID#:"));  
	                        // appletDoneTest = new DoneTest(newAppletID, prompt("Enter new doneTest:"));
                            
                            newAppletID = $('#appletid').val();
                            appletDoneTest = encodeURI($('#donetest').val());
                            appletDoneTest = decodeURI(appletDoneTest);
                            state = 'build';
                            printPieces(newAppletID, appletDoneTest);
                        }
                    }
                }
            }
        );
}


        /***********************************************************************
         *                  JSON STRING PRINTER
         * ********************************************************************/

//this prints the constructor codes to an alert window
function printPieces(newAppletID, appletDoneTest) {
    var printString = "";
    var openTag='';
    var closeTag = '<br>';
    var constructorString = "";

    for (var item=0; item< piece.length; item++)
    {
        if(!piece[item].deleted)
        {
            switch(piece[item].type) 
            {
                case 0: //clickbox
                var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "userScale": piece[item].userScale, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y ,
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 1: //text area constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "newText":encodeURIComponent(piece[item].text).replace(/'/g, "%27") ,
                        "font":piece[item].font ,
                        "fontString":piece[item].fontString,
                        "fill":piece[item].fill ,
                        "wordWrap":piece[item].wordWrap ,
                        "wordWrapWidth":piece[item].wordWrapWidth ,
                        "alignment":piece[item].alignment
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 2: //random number constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "font":piece[item].fontString ,
                        "fontString":piece[item].fontString,
                        "fill":piece[item].fill ,
                        "randomCeiling":piece[item].randomCeiling,
                        "randomFloor":piece[item].randomFloor,
                        "draggable": piece[item].draggable ,
                        "selectable": piece[item].selectable ,
                        "selectedExpression": piece[item].selectedExpression
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 3: //evaluate fraction constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "fill":piece[item].fill ,
                        "wholeExpression":piece[item].wholeExpression,
                        "numeratorExpression":piece[item].numeratorExpression,
                        "denominatorExpression":piece[item].denominatorExpression,
                        "size":piece[item].size,
                        "draggable": piece[item].draggable ,
                        "selectable": piece[item].selectable ,
                        "selectedExpression": piece[item].selectedExpression
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 4: //hundredChart
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "userScale": piece[item].userScale, 
                        "staticValue": piece[item].staticValue,
                        "startX":piece[item].x , 
                        "startY":piece[item].y 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 5: //doneButton
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;     
                    break;
                    
                case 6: //random decimal constructor
                //(appletID, type, startX, startY, font, fill, randomCeiling, randomFloor, randomDigits) {
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "font":piece[item].fontString ,
                        "fontString":piece[item].fontString,
                        "fill":piece[item].fill ,
                        "randomCeiling":piece[item].randomCeiling,
                        "randomFloor":piece[item].randomFloor,
                        "randomDigits":piece[item].randomDigits,
                        "draggable": piece[item].draggable ,
                        "selectable": piece[item].selectable ,
                        "selectedExpression": piece[item].selectedExpression
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                
                case 7: //random mixed number constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "fill":piece[item].fill ,
                        "wholeNumberRandomCeiling":piece[item].wholeNumberRandomCeiling,
                        "wholeNumberRandomFloor":piece[item].wholeNumberRandomFloor,
                        "numeratorRandomCeiling":piece[item].numeratorRandomCeiling,
                        "numeratorRandomFloor":piece[item].numeratorRandomFloor,
                        "denominatorRandomCeiling":piece[item].denominatorRandomCeiling,
                        "denominatorRandomFloor":piece[item].denominatorRandomFloor,
                        "size":piece[item].size,
                        "draggable": piece[item].draggable ,
                        "selectable": piece[item].selectable ,
                        "selectedExpression": piece[item].selectedExpression
                        });
                   constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                
                case 8: //draggable number constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "orientation":piece[item].orientation ,
                        "clonable":piece[item].clonable,
                        "fill":piece[item].fill ,
                        "size":piece[item].size 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                
                case 9: //dragTo Box
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "userScaleX":piece[item].userScaleX ,
                        "userScaleY":piece[item].userScaleY 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                
                case 10: //multiple choice
                    if(piece[item].multiType==0 || piece[item].multiType==1 || piece[item].multiType==2)//main piece
                    { 
                        var newObject = JSON.stringify({    
                            "appletID": newAppletID, 
                            "type": piece[item].type, 
                            "startX":piece[item].x , 
                            "startY":piece[item].y , 
                            "correct":piece[item].correct ,
                            "incorrect1":piece[item].incorrect1,
                            "incorrect2":piece[item].incorrect2 ,
                            "incorrect3":piece[item].incorrect3,
                            "multipleChoiceFontSize":piece[item].multipleChoiceFontSize,
                            "spaceX":piece[item].spaceX,
                            "spaceY":piece[item].spaceY,
                            "multiType":piece[item].multiType
                            });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                    }
                    break;
                        
                case 11: //protractor and angle
                    if(piece[item].protractor!=1) {
                        var newObject = JSON.stringify({    
                            "appletID": newAppletID, 
                            "type": piece[item].type, 
                            "angleX":piece[item].x , 
                            "angleY":piece[item].y , 
                            "lowerAngle":piece[item].lowerAngle ,
                            "upperAngle":piece[item].upperAngle,
                            "protractorX":piece[item].protractorX ,
                            "protractorY":piece[item].protractorY
                            });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    }
                    break;
                    
                case 12: //tally box
                //(appletID, type, startX, startY, initialValue) {
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "initialValue":piece[item].initialValue
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 13: //clonable base ten blocks
                //(appletID, type, startX, startY, dragX, dragY, dragWidth, dragHeight) {
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "dragX":piece[item-1].x , 
                        "dragY":piece[item-1].y , 
                        "dragWidth":baseTenDragTo.width, 
                        "dragHeight":baseTenDragTo.height
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 14: //number entry (numberEntryX, numberEntryY, orientation, displayX, displayY,displayDigits)
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "numberEntryX":piece[item].x , 
                        "numberEntryY":piece[item].y , 
                        "orientation":piece[item].orientation , 
                        "displayX":entryPanelCoordinates("x"), 
                        "displayY":entryPanelCoordinates("y"), 
                        "hideInitialValue":piece[item].hideInitialValue,
                        "panelQuantity":piece[item].panelQuantity,
                        "displayDigits":piece[item].displayDigits
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 15: //EvaluatedExpression
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "expression":  fixedEncodeURIComponent(piece[item].expression),
                        "font":piece[item].fontString, 
                        "fill":piece[item].fill, 
                        "wordWrap":piece[item].wordWrap, 
                        "wordWrapWidth":piece[item].wordWrapWidth, 
                        "align":piece[item].align ,
                        "draggable": piece[item].draggable ,
                        "selectable": piece[item].selectable ,
                        "selectedExpression": piece[item].selectedExpression
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 16: //HiddenNumberConstructor(appletID, type, expression)
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID,
                        "type": piece[item].type, 
                        "expression": fixedEncodeURIComponent(piece[item].expression)
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 17: //InequalityEntryConstructor(appletID, type,inequalityEntryX, inequalityEntryY, displayX, displayY)
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "inequalityEntryX":piece[item].x , 
                        "inequalityEntryY":piece[item].y ,
                        "displayX":piece[item+1].x , 
                        "displayY":piece[item+1].y 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 18: //BarGraphConstructor(appletID, type, title, min, max, interval, numberLabel, numberedAxis, itemList, itemLabel, itemValueList, startX, startY)
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "titleText":piece[item].titleText , 
                        "min":piece[item].min, 
                        "max":piece[item].max, 
                        "interval":piece[item].interval, 
                        "numberLabel":piece[item].numberLabel, 
                        "numberedAxis":piece[item].numberedAxis, 
                        "itemList":piece[item].itemList,
                        "itemLabel":piece[item].itemLabel, 
                        "itemValueList":piece[item].itemValueList
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 19: //TTableConstructor(appletID, type, wordLabel, wordList, expressionLabel, expressionList, startX, startY) 
                    for(var itemCounter  = 0; itemCounter < piece[item].expressionList.length ; itemCounter++) {
                            piece[item].expressionList[itemCounter] =fixedEncodeURIComponent(piece[item].expressionList[itemCounter]) ;
                    }
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX": piece[item].x , 
                        "startY": piece[item].y , 
                        "wordLabel": piece[item].wordLabel , 
                        "wordList": piece[item].wordList, 
                        "expressionLabel": piece[item].expressionLabel, 
                        "expressionList": piece[item].expressionList
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 20: //Number Line
                    var newObject = JSON.stringify({  
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x,
                        "startY":piece[item].y,
                        "lineOrientation":piece[item].lineOrientation,
                        "lineLength":piece[item].lineLength ,
                        "min": piece[item].min,
                        "minLabel" : piece[item].minLabel , 
                        "max" : piece[item].max , 
                        "maxLabel" : piece[item].maxLabel , 
                        "interval" : piece[item].interval ,
                        "intervalLabel" : piece[item].intervalLabel , 
                        "subDivide" : piece[item].subDivide ,
                        "dotStartX" : piece[item+1].x , 
                        "dotStartY" : piece[item+1].y ,
                        "dotOrientation" : piece[item].dotOrientation , 
                        "dotNumber" : piece[item].dotNumber ,
                        "dotLabel" : piece[item].dotLabel , 
                        "dotSnapping" : piece[item].dotSnapping
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 21: //Texture Area
                console.log(piece[item].textureExpression)
                    var newObject = JSON.stringify({  
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x,
                        "startY":piece[item].y,
                        "textureExpression": piece[item].textureExpression,
                        "number": piece[item].number ,
                        "draggable": piece[item].draggable ,
                        "selectable": piece[item].selectable ,
                        "selectedExpression": piece[item].selectedExpression
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 22: //Timer
                    var newObject = JSON.stringify({  
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x,
                        "startY":piece[item].y,
                        "timeLimit": piece[item].timeLimit,
                        "size":piece[item].size
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 98: //draw line
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "color": piece[item].color, 
                        "drawingLineStartX":piece[item].x , 
                        "drawingLineStartY":piece[item].y , 
                        "drawingLineEndX": piece[item].x+piece[item].drawingLineEndX-piece[item].drawingLineStartX,
                        "drawingLineEndY": piece[item].y+piece[item].drawingLineEndY-piece[item].drawingLineStartY
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 99: //draw box
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "color": piece[item].color, 
                        "drawingBoxStartX":piece[item].x , 
                        "drawingBoxStartY":piece[item].y , 
                        "drawingBoxEndX": piece[item].drawingBoxEndX,
                        "drawingBoxEndY": piece[item].drawingBoxEndY
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
            }   
            }
        }
    printString = printString.slice(0, - 5)
    constructorString="<br>SOLUTION: " + appletDoneTest + " ";
    printString = printString + openTag + constructorString + closeTag;  
    state="prompt";
    bootbox.alert({
        size: 'large',
        title: "Applet Constructor Code Output - Add to mages.applets.js",
        message: printString , //this is now possibly quite long
        callback: function(){ state="build"; }  //continue building
    });
}

function getConstructorString(newObject) {
    if (typeof newObject == "object") {
        var json = JSON.stringify(newObject);
    } else {
        var json = newObject;
    }
    return "              " + json + ",";
}

//test
