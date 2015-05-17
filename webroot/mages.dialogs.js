function getTextureAreaSettings(item) {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Teture Area Settings",
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
                            
                        }
                    }
                }
            }
        );
}

function getNumberLineSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Number Line Settings",
                message: 
                    getMenuEntryString("Line orientation:" , "lineOrientation", "h" , null) +
                    getMenuEntryString("Line length (pixels):" , "lineLength", "500" , null) +
                    getMenuEntryString("Minimum value:" , "min", "0" , null) +
                    getMenuYesNoString("Label Minimum?", "minLabel", null) + 
                    getMenuEntryString("Maximum Value:" , "max", "10" , null) +
                    getMenuYesNoString("Label Maximum?", "maxLabel", null) + 
                    getMenuEntryString("Interval:" , "interval", "1" , null) +
                    getMenuYesNoString("Label Interval?", "intervalLabel", null) + 
                    getMenuEntryString("Subdivision:" , "subDivide", "1" , "1 for no subdivision.") +
                    getMenuEntryString("Number of dots:" , "dotNumber", "1" , null) +
                    getMenuYesNoString("Static dots?", "staticDots", "Static dots are immovable.") + 
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var newObject = JSON.parse(JSON.stringify({
                                "type": 20, 
                                "startX":100 ,
                                "startY":10,
                                "dotStartX" : 400 , 
                                "dotStartY" : 300 ,
                                "dotExpressions" : [] ,
                                "lineOrientation": $('#lineOrientation').val() ,
                                "lineLength": $('#lineLength').val()  ,
                                "min": $('#min').val() ,
                                "minLabel" : ($("input[name='minLabel']:checked").val() == "Yes" ? true : false)  , 
                                "max" : $('#max').val() ,
                                "maxLabel" : ($("input[name='maxLabel']:checked").val() == "Yes" ? true : false)  , 
                                "interval" : $('#interval').val() ,
                                "intervalLabel" : ($("input[name='intervalLabel']:checked").val() == "Yes" ? true : false) , 
                                "subDivide" : $('#subDivide').val() ,
                                "dotNumber" : $('#dotNumber').val() ,
                                "staticDots" : ($("input[name='staticDots']:checked").val() == "Yes" ? true : false) ,
                            })) ;
                            
                            if(newObject.staticDots == true)
                            {
                                getNumberLineStaticDotSettings(newObject.dotNumber, newObject )  ; 
                            } else
                            {
                                getNumberLineMovableDotSettings(newObject ) ; 
                            }
                        }
                    }
                }
            }
        );
}

function getNumberLineMovableDotSettings(item) {
    bootbox.dialog({
                title: "Number Line Static Dots",
                message: 
                    getMenuEntryString("Dot orientation:" , "dotOrientation", "h" , null) +
                    getMenuYesNoString("Label dots?", "dotLabel", null) + 
                    getMenuYesNoString("Snap dots to line?", "dotSnapping", null) + 
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            item.dotOrientation = $('#dotOrientation').val() 
                            item.dotLabel = ($("input[name='dotLabel']:checked").val() == "Yes" ? true : false) 
                            item.dotSnapping = ($("input[name='dotSnapping']:checked").val() == "Yes" ? true : false) 
                            state = 'build'
                            buildNumberLine(item);
                        }
                    }
                }
            }
        );
    
}

function getNumberLineStaticDotSettings(numItems, item) {
    bootbox.dialog({
                title: 'Number Line Movable Dot: ' + (item.dotNumber-numItems) ,
                message: 
                    getMenuEntryString("Value:" , "label", 1 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            item.dotExpressions.push( $('#label').val() )
                            if(numItems > 1)
                            {
                                getNumberLineStaticDotSettings(numItems-1, item)        
                            } else
                            {
                                state = 'build'
                                buildNumberLine(item);
                            }
                        }
                    }
                }
            }
        );
}

function getInequalityEntrySettings() {
    var newObject = JSON.parse(JSON.stringify({
        "type": 17 , 
        "inequalityEntryX":300 , 
        "inequalityEntryY":200,
        "displayX":200 , 
        "displayY":300 
        })) ;
    buildInequalityEntry(newObject)
    
}

function gettTableSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "TTable Settings",
                message: 
                    getMenuEntryString("Label for Items:" , "wordlabel", "Items" , null) +
                    getMenuEntryString("Label for Values:" , "expressionlabel", "Values" , null) +
                    getMenuEntryString("Number of Items" , "numitems", 4 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var wordLabel = $('#wordlabel').val();
                            var expressionlabel = $('#expressionlabel').val();
                            var numItems = $('#numitems').val();
                            var newObject = JSON.parse(JSON.stringify({
                                "type": 19, 
                                "startX": 200 , 
                                "startY": 200 , 
                                "wordLabel": wordLabel,
                                "wordList" : [] ,
                                "expressionLabel" : expressionlabel , 
                                "expressionList" : [] ,
                                "numItems" : numItems
                            })) ;
                            gettTableItem(numItems, newObject);
                        }
                    }
                }
            }
        );
}

function gettTableItem(numItems, item) {
    console.log(item.numItems-numItems)
    bootbox.dialog({
                title: 'TTable item: ' + (item.numItems-numItems) ,
                message: 
                    getMenuEntryString("Label:" , "label", "Name" , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            item.wordList.push( $('#label').val() )
                            if(numItems > 1)
                            {
                                gettTableItem(numItems-1, item)        
                            } else
                            {
                                gettTableValue(item.numItems, item)
                            }
                        }
                    }
                }
            }
        );
}

function gettTableValue(numItems, item) {
    bootbox.dialog({
                title: 'TTable value: ' + (item.numItems-numItems),
                message: 
                    getMenuEntryString("Value:" , "label", 1 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            item.expressionList.push( $('#label').val() )
                            if(numItems > 1)
                            {
                                gettTableValue(numItems-1, item)        
                            } else
                            {
                                state = 'build'
                                buildtTable(item)
                            }
                        }
                    }
                }
            }
        );
}



function getRandomDecimalSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Random Decimal Settings",
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
                            buildRandomDecimal(newObject);
                            adjustNewPiece();
                            
                        }
                    }
                }
            }
        );
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

function getRandomFractionSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Random Fraction Settings",
                message: 
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
                            
                            var newNumeratorRandomFloor = $('#numfloor').val();
                            var newNumeratorRandomCeiling = $('#numceiling').val();
                            var newDenominatorRandomFloor = $('#denfloor').val();
                            var newDenominatorRandomCeiling = $('#denceiling').val();
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({   
                                "numeratorRandomCeiling":newNumeratorRandomCeiling,
                                "numeratorRandomFloor":newNumeratorRandomFloor,
                                "denominatorRandomCeiling":newDenominatorRandomCeiling,
                                "denominatorRandomFloor":newDenominatorRandomFloor,
                                "static" : ($("input[name='behavior']:checked").val() == "Static" ? 1 : 0) ,
                                "draggable" : ($("input[name='behavior']:checked").val() == "Draggable" ? 1 : 0) ,
                                "selectable" : ($("input[name='behavior']:checked").val() == "Selectable" ? 1 : 0)
                                })) ;
                            buildRandomFraction(newObject);
                            adjustNewPiece();
                            
                        }
                    }
                }
            }
        );
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

function getTextAreaSettings() {

    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Text Area Settings",
                message: 
                    getMenuEntryString("Text:" , "newtext", "Hello.", null ) +
                    getMenuEntryString("Color:" , "color", newTextColor , null) +
                    getMenuEntryString("Size:" , "size", newTextSize , null) +
                    getMenuEntryString("Word wrap width:" , "wrapWidth", 0 , "Enter 0 to turn off wrap.") +
                    getMenuYesNoString("Bold?", "bold", null) +
                    getMenuEntryString("Alighnment? l/c/r:" , "alignment", "l" , null) +
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
                            var newText = $('#newtext').val();
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            if($("input[name='bold']:checked").val() == "Yes")
                            {
                                newBold="bold";
                            } else
                            {
                                newBold="";
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
                            
                            //newTextWrap = prompt("Word wrap?" , newTextWrap);
                            if($('#wrapWidth').val() > 0)
                            {
                                newTextWrap=true;
                                newTextWidth = $('#wrapWidth').val() ;
                            } else
                            {
                                newTextWrap=false;
                            }
                            state = 'build';
                            
                            
                            var newObject = JSON.parse(JSON.stringify({   
                                "type": 1, 
                                "startX":400 , 
                                "startY":300 , 
                                "newText":newText ,
                                "alignment":alignment
                                })) ;
                            
                            buildTextArea(newObject);
                            
                        adjustNewPiece();
                            
                        }
                    }
                }
            }
        );

}

function getDraggableNumbersSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Draggable Number Settings",
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

function getClickBoxSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "HundredChart Settings",
                message: 
                getMenuEntryString("Scale:" , "scale", 1 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                           // newAppletID = Number(prompt("Enter new applet ID#:"));  
	                        // appletDoneTest = new DoneTest(newAppletID, prompt("Enter new doneTest:"));
                            
                            var userScale = $('#scale').val();
                            var staticValue = $('#staticvalue').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({
                                "userScale":Number(userScale) ,
                                "startX" : 400 , 
                                "startY" : 300 
                                })) ;
                            buildClickBox(newObject);
                            adjustNewPiece();
                            
                        }
                    }
                }
            }
        );
}


function getHundredChartSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "HundredChart Settings",
                message: 
                getMenuEntryString("Scale:" , "scale", 1 , null) +
                getMenuEntryString("Static value:" , "staticvalue", 0 , "0 for clickable chart.") +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                           // newAppletID = Number(prompt("Enter new applet ID#:"));  
	                        // appletDoneTest = new DoneTest(newAppletID, prompt("Enter new doneTest:"));
                            
                            var userScale = $('#scale').val();
                            var staticValue = $('#staticvalue').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({
                                "userScale":Number(userScale) ,
                                "staticValue":Number(staticValue) ,
                                "startX" : 400 , 
                                "startY" : 300 
                                })) ;
                            buildHundredChart(newObject);
                            adjustNewPiece();
                            
                        }
                    }
                }
            }
        );
}


function getDragToBoxSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "DragTo Box Settings",
                message: 
                getMenuEntryString("ScaleX:" , "scalex", 0.5 , null) +
                getMenuEntryString("ScaleY:" , "scaley", 0.5 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                           // newAppletID = Number(prompt("Enter new applet ID#:"));  
	                        // appletDoneTest = new DoneTest(newAppletID, prompt("Enter new doneTest:"));
                            
                            var userScaleX = $('#scalex').val();
                            var userScaleY = $('#scaley').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({
                                "userScaleX":Number(userScaleX),
                                "userScaleY":Number(userScaleY)
                                })) ;
                            buildDragToBox(newObject);
                            adjustNewPiece();
                            
                        }
                    }
                }
            }
        );
}

function getNumberEntrySettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Number Entry Box Settings",
                message: 
                getMenuEntryString("Max digits:" , "digits", 6 , null) +
                getMenuEntryString("Orientation? h/v:" , "orientation", "h" , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var digits = $('#digits').val();
                            var orientation = $('#orientation').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({
                                "numberEntryX":200 , 
                                "numberEntryY":200, 
                                "orientation":orientation , 
                                "displayX":300, 
                                "displayY":300, 
                                "displayDigits":Number(digits)
                                })) ;
                            buildNumberEntry(newObject)
                            
                        }
                    }
                }
            }
        );
}


function getHiddenNumberSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Hidden Number #" + hiddenNumber.length + " Settings",
                message: 
                getMenuEntryString("Expression:" , "expression", '2+2' , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var expression = $('#expression').val();
                            state = 'build';
                        var newObject = JSON.parse(JSON.stringify({
                            "expression":fixedEncodeURIComponent(expression)
                            })) ;
                        buildHiddenNumber(newObject)
                        }
                    }
                }
            }
        );
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
                                "expression" : expression , 
                                "fill" : newTextColor, 
                                "wordWrap" : newTextWrap, 
                                "wordWrapWidth": newTextWidth, 
                                "align": alignment
                                })) ;
                            buildEvaluatedExpression(newObject)
                            adjustNewPiece()
                        }
                    }
                }
            }
        );
    
}

//BarGraphConstructor(appletID, type, titleText, min, max, interval, numberLabel, numberedAxis, itemList, itemLabel, itemValueList, startX, startY) 
function getBarGraphSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Bar Graph Entry Box Settings",
                message: 
                getMenuEntryString("Graph title:" , "graphtitle", 'Bar Graph' , null) +
                getMenuEntryString("Numbered Axis x/y:" , "numaxis", 'y' , null) +
                getMenuEntryString("Numbered Axis Label:" , "numaxislabel", 'Quantity' , null) +
                getMenuEntryString("Numbered Axis Min:" , "numaxismin", 0 , null) +
                getMenuEntryString("Numbered Axis Max:" , "numaxismax", 10 , null) +
                getMenuEntryString("Numbered Axis Interval:" , "numaxisinterval", 1 , null) +
                getMenuEntryString("Labeled Axis Label" , "labeledaxislabel", "Categories" , null) +
                getMenuEntryString("Labeled Axis Number of Items:" , "labeledaxisnumitems", 4 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var titleText = $('#graphtitle').val();
                            var min = $('#numaxismin').val();
                            var max = $('#numaxismax').val();
                            var interval = $('#numaxisinterval').val();
                            var numberLabel = $('#numaxislabel').val();
                            var numberedAxis = $('#numaxis').val();
                            var itemLabel = $('#labeledaxislabel').val();
                            var itemList = new Array(0);
                            var itemValueList = new Array(0);
                        
                            getBarGraphItemLabels(0, null, titleText, eval(min), eval(max), eval(interval), numberLabel, numberedAxis, itemList ,itemLabel, itemValueList, eval( $('#labeledaxisnumitems').val()) , 0 ); 
                        }
                    }
                }
            }
        );
}

var newMultipleChoiceNumbers = [];
var multipleChoiceFontSize = 40;
function getBarGraphItemLabels(appletID, type, titleText, min, max, interval, numberLabel, numberedAxis, itemList, itemLabel, itemValueList, numItems, startPrompt)  {

    var barGraphTitleString = new Array(numItems);
    barGraphTitleString[startPrompt]='Bar Graph Item Labels Settings: #' + startPrompt;   

    
    
    bootbox.alert({
        size: 'large',
        title: barGraphTitleString[startPrompt],
        message: getMenuEntryString("Label:" , "label", 'item' , null) +
                getMenuEntryString("Value:" , "value", 'getRandomInt(min,max)' , null), 
        callback: function()
        { 
            itemList.push( $('#label').val() )
            itemValueList.push( $('#value').val() )
            
            if(startPrompt < numItems-1)
            {
                getBarGraphItemLabels(0, null, titleText, min, max, interval, numberLabel, numberedAxis, itemList ,itemLabel, itemValueList, numItems , startPrompt+1);
            } else
            {
                
                var newObject = JSON.parse(JSON.stringify({    
                    "appletID": appletID, 
                    "type": 18, 
                    "startX":200 , 
                    "startY":200 , 
                    "titleText":titleText , 
                    "min":min, 
                    "max":max, 
                    "interval":interval, 
                    "numberLabel":numberLabel, 
                    "numberedAxis":numberedAxis, 
                    "itemList":itemList,
                    "itemLabel":itemLabel, 
                    "itemValueList":itemValueList
                    }));
                    console.log(newObject)
                buildBarGraph(newObject);
                state='build'            
                
            }
        }
    });
}

function getTallySettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Tally Settings",
                message: 
                getMenuEntryString("Initial value:" , "initial", 0 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                           // newAppletID = Number(prompt("Enter new applet ID#:"));  
	                        // appletDoneTest = new DoneTest(newAppletID, prompt("Enter new doneTest:"));
                            var initialValue = $('#initial').val();
                            var newObject = JSON.parse(JSON.stringify({    
                                "startX":300 , 
                                "startY":200 , 
                                "initialValue":Number(initialValue)
                                }));
                            buildTally(newObject);
                            state = 'build';
                            
                            
                        }
                    }
                }
            }
        );
    
}

function appletIDPrompt() {
    this.savedState=state;
    state='prompt';
    bootbox.prompt({
        title: "Enter appletID#:",
        value: "1",
        callback: function(result) {
            if (result === null) 
            {
                //Example.show("Prompt dismissed");
            } else 
            {
                loadAppletID=result;
                state = 'applet';
                titleBack.destroy(true);
                
            }
        }
    });
}

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

function getProtractorAngleSetting() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Protractor and Angle Settings",
                message: 
                getMenuEntryString("Enter start leg in degrees:" , "start", 270, null ) +
                getMenuEntryString("Enter end leg in degrees:" , "end", "getRandomInt(90,270)" , "0:d 90:r 180:u 270:l") +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                           // newAppletID = Number(prompt("Enter new applet ID#:"));  
	                        // appletDoneTest = new DoneTest(newAppletID, prompt("Enter new doneTest:"));
                            
                            var lowerAngle = $('#start').val();
                            var upperAngle = $('#end').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({    
                                "lowerAngle": lowerAngle, 
                                "upperAngle": upperAngle,
                                })); 
                            buildProtractorAngle(newObject);
                        }
                    }
                }
            }
        );
}

function getMultipleChoiceTypeSetting() {
    menuKeyPressed =0
    state = 'prompt';
    var multChoiceString = new Array(4);
    multChoiceString[0] = 
    '<div class="row">  ' +
    '<div class="col-md-12"> ' +
    '<form class="form-horizontal"> ' +
    '<div class="form-group"> ' +'<label class="col-md-4 control-label" for="type">Select Type:</label> ' +
    '<div class="col-md-4">' + '<div class="row">  ' +
    
    '</div><div class="radio"> <label for="bold-0"> ' +
    '<input type="radio" name="type" id="bold-0" value="number" checked="checked"> ' +
    'Number/Decimal Values </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="fraction"> Fraction Values </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="mixed"> Mixed Number Values </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="literal"> Literal Values (Strings) </label> ' +
    
    '</div> '
    bootbox.alert({
        size: 'large',
        title: "Multiple Choice",
        message: multChoiceString[0], //this is now possibly quite long
        callback: function()
        { 
            var selection = $("input[name='type']:checked").val();
            switch(selection) {
                case 'number':
                    getMultipleChoiceNumberSettings()
                    break;
                    
                case 'fraction':
                    state='build'
                    break;

                case 'number':
                    state='build'
                    break;
                    
                case 'literal':
                    state='build'
                    break;
            }
            
        }
    });
}

var newMultipleChoiceNumbers = [];
var multipleChoiceFontSize = 40;
function getMultipleChoiceNumberSettings(startPrompt) {
    
    if(startPrompt == null)
    {
        startPrompt=0;
    }
    var multChoiceTitleString = new Array(5);
    multChoiceTitleString[0]='Multiple Choice Number Settings: Correct Answer';
    multChoiceTitleString[1]='Multiple Choice Number Settings: Incorrect Answer #1';
    multChoiceTitleString[2]='Multiple Choice Number Settings: Incorrect Answer #2';
    multChoiceTitleString[3]='Multiple Choice Number Settings: Incorrect Answer #3';
    
    var multChoiceMessageString = new Array(5);
    multChoiceMessageString[0] = getMenuEntryString("Correct answer expression:" , "correct", 1 , "Enter an expression that respresents the correct answer.");
    multChoiceMessageString[1] = getMenuEntryString("Inorrect answer #1 expression:" , "incorrect1", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect answer. ");
    multChoiceMessageString[2] = getMenuEntryString("Inorrect answer #2 expression:" , "incorrect2", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect answer. ");
    multChoiceMessageString[3] = getMenuEntryString("Inorrect answer #3 expression:" , "incorrect3", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect answer. ");


    bootbox.alert({
        size: 'large',
        title: multChoiceTitleString[startPrompt],
        message: multChoiceMessageString[startPrompt], 
        callback: function()
        { 
            
            switch(startPrompt) 
            {
                case 0:
                    newMultipleChoiceNumbers.push( $('#correct').val() ); 
                    break;
                case 1:
                    newMultipleChoiceNumbers.push( $('#incorrect1').val() );
                    break;
                case 2:
                    newMultipleChoiceNumbers.push( $('#incorrect2').val() );
                    break;
                case 3:
                    newMultipleChoiceNumbers.push( $('#incorrect3').val() );
                    break;
            }
            if(startPrompt <3)
            {
                getMultipleChoiceNumberSettings(startPrompt+1);
            } else
            {
                bootbox.dialog({
                title: "Multiple Choice Settings",
                message: 
                getMenuEntryString("Font size:" , "fontsize", multipleChoiceFontSize ) +
                getMenuEntryString("Horizontal Spacing:" , "spacex", 200 ) +
                getMenuEntryString("Vertical Spacing:" , "spacey", 40 ) +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            spaceX = $('#spacex').val();
                            spaceY = $('#spacey').val();
                            multipleChoiceFontSize = $('#fontsize').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({    
                                "answers": newMultipleChoiceNumbers, 
                                "spaceX": spaceX, 
                                "spaceY":spaceY , 
                                "multipleChoiceFontSize":multipleChoiceFontSize
                                }));      
                            buildMultipleChoiceNumbers(newObject);
                            newMultipleChoiceNumbers = [];
                                }
                            }
                        }
                    }
                );
                
                
            }
        }
    });
}

function getMenuEntryString(label, key, defaultValue, help) {
    var helpString = '';
    if(help != null)
    {
        helpString='<span class="help-block">' + help + '</span> '
    }
    return '<div class="row">  ' +
            '<div class="col-md-12"> ' +
            '<form class="form-horizontal"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="' + key + '">'+ label +'</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="' + key + '" name="' + key + '" type="text" value="'+ defaultValue +'" class="form-control input-md"> ' +
            helpString +
            '</div> ' +
            '</div> '
}

function getMenuYesNoString(label, key, help) {
    var helpString = '';
    if(help != null)
    {
        helpString='<span class="help-block">' + help + '</span> </div> '
    }
    return '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="bold">' + label + '</label> ' +
            '<div class="col-md-4"> <div class="radio"> <label for="bold-0"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-0" value="No" checked="checked"> ' +
            'No </label> ' +
            '</div><div class="radio"> <label for="' + key + '-1"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-1" value="Yes"> Yes </label> ' +
            helpString +
            '</div> ' 
}

function getMenuStaticDraggagbleSelectableString(label, key, help) {
    var helpString = '';
    if(help != null)
    {
        helpString='<span class="help-block">' + help + '</span> </div> '
    }
    return '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="bold">' + label + '</label> ' +
            '<div class="col-md-4"> <div class="radio"> <label for="bold-0"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-0" value="Static" checked="checked"> ' +
            'Static </label> ' +
            '</div><div class="radio"> <label for="' + key + '-1"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-1" value="Draggable"> Draggable </label> ' +
            '</div><div class="radio"> <label for="' + key + '-1"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-1" value="Selectable"> Selectable </label> ' +
            helpString +
            '</div> ' 
}

function getSelectionExpressionSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Selectable expression setting",
                message: 
                getMenuEntryString("Selected expression:", "selectedExpression", true , "The expression's value will be evaluated as true or false to determine if the item should be clicked.") +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            piece[piece.length-1].selectedExpression = encodeURI($('#selectedExpression').val());
                            state = 'build';
                        }
                    }
                }
            }
        );

    
}

