var numberLine
var numberLineDots = [];
function buildNumberLine(item) {
    item.minExpression = item.min
    item.maxExpression = item.max
    item.intervalExpression = item.interval;
    item.min = eval(item.min)
    item.max = eval(item.max)
    item.interval = eval(item.interval)
    
    piece[piece.length] = game.add.group();
    
    item.intervalSpacing = item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ))
    numberLine = piece[piece.length-1];
    numberLine.dotValue = new Array(7);
    numberLine.range = item.max-item.min;
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
    if(item.lineOrientation == 'h')
    {
        newGraphic.moveTo(0, 0)
        newGraphic.lineTo(item.lineLength,0);
        newGraphic.moveTo(0, 0)
        for(var i = 0 ; i <= (item.max-item.min)/item.interval ; i++)
        {
            newGraphic.moveTo(i*item.lineLength/( (item.max-item.min) / item.interval),  7)
            newGraphic.lineTo(i*item.lineLength/( (item.max-item.min) / item.interval), -7)        
        }
        for(var i = 0 ; i < (item.max-item.min)/item.interval*item.subDivide ; i++)
        {
            newGraphic.moveTo(i*item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ) ),  3)
            newGraphic.lineTo(i*item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ) ), -3)        
        }    
    } else
    {
        newGraphic.moveTo(0, 0)
        newGraphic.lineTo(0,item.lineLength);
        newGraphic.moveTo(0, 0)
        for(var i = 0 ; i <= (item.max-item.min)/item.interval ; i++)
        {
            newGraphic.moveTo(7,  i*item.lineLength/( (item.max-item.min) / item.interval))
            newGraphic.lineTo(-7, i*item.lineLength/( (item.max-item.min) / item.interval))        
        }
        for(var i = 0 ; i < (item.max-item.min)/item.interval*item.subDivide ; i++)
        {
            newGraphic.moveTo(3,  i*item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ) ))
            newGraphic.lineTo(-3, i*item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ) ))        
        }     
    }
    var labelFontSize
    if(item.max.toString().length > 3) {
        labelFontSize = 12
    } else
    {
        labelFontSize = 18
    }
    
    piece[piece.length-1].add(game.add.sprite( (item.lineOrientation == 'h' ?  0 : 10) , (item.lineOrientation == 'h' ?  -7 : 15) , newGraphic.generateTexture()) );
    newGraphic.clear();
    if(item.minLabel == true){
            newLabel = game.add.text(0, 20 , addCommas(item.min).toString(), {
            font: labelFontSize+"px Arial",
            fill: "black",
            align: 'left'}); 
        piece[piece.length-1].add(newLabel);
        newLabel.draggable = 1;
        newLabel.anchor.setTo(0.5,0.5)    
    }
    
    
    if(item.intervalLabel == true) {
        for(var i = 1 ; i <= (item.max-item.min)/item.interval - 1 ; i++ )
        {
             
            newLabel = game.add.text((item.lineOrientation == 'h' ?  i*item.lineLength/( (item.max-item.min) / item.interval) : 0), (item.lineOrientation == 'h' ?  0 : i*item.lineLength/( (item.max-item.min) / item.interval))+20 , addCommas(item.min+i*item.interval).toString(), {
            font: labelFontSize+"px Arial",
            fill: "black",
            align: 'left'}); 
        piece[piece.length-1].add(newLabel);
        newLabel.draggable = 1;
        newLabel.anchor.setTo(0.5,0.5)
        }    
    }
    
    if(item.maxLabel == true){
        newLabel = game.add.text((item.lineOrientation == 'h' ? item.lineLength : 0), (item.lineOrientation == 'h' ? 20 : item.lineLength+20) , addCommas(item.max).toString(), {
        font: labelFontSize+"px Arial",
        fill: "black",
        align: 'left'}); 
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    newLabel.anchor.setTo(0.5,0.5)
    }
    
    piece[piece.length-1].x = item.startX;
    piece[piece.length-1].y = item.startY;
    piece[piece.length-1].type='20a'
    
    piece[piece.length-1].forEach(function(pieceItem){
        pieceItem.inputEnabled='true';
        pieceItem.events.onInputDown.add(buildGroupPieceClick, this);
        pieceItem.events.onInputUp.add(onFinishDrag, draggingPiece);
        pieceItem.clicked=0;
        pieceItem.ParentPosition=piece.length-1;
    });
    
    
    var dotGraphic = [];
    var dotSprite = [];
    
    if(item.staticDots == true)
    {
       for(var i = 0; i < item.dotExpressions.length ; i++) 
       {
            dotGraphic.push(game.add.graphics(0, 0) );
            dotGraphic[i].beginFill(rainbow[i], 1);
            dotGraphic[i].drawCircle(0, 0, item.lineLength/600*15);
            numberLine.dotValue[i] = eval(item.dotExpressions[i])
            if(item.lineOrientation == 'h')
            {
                dotSprite.push( game.add.sprite( numberLine.dotValue[i] / item.interval*item.lineLength / ( (item.max-item.min)/item.interval ) - item.lineLength/120 , -item.lineLength/120 , dotGraphic[i].generateTexture() ) ); 
            } else
            {
                dotSprite.push(game.add.sprite(15,  numberLine.dotValue[i] / item.interval*item.lineLength / ( (item.max-item.min)/item.interval ) +12 , dotGraphic[i].generateTexture()) ); 
            }
            dotGraphic[i].clear(); 
            dotSprite[i].number = i
            piece[piece.length-1].addChild(dotSprite[i])
            numberLineDots.push(dotSprite[i])
       }
       piece[piece.length] = null
    } else
    { //draggable dots
        if(item.dotNumber > 7) { item.dotNumber = 7 }
        
        for(var i = 0; i < item.dotNumber ; i++) {
            dotGraphic.push(game.add.graphics(0, 0) );
            dotGraphic[i].beginFill(rainbow[i], 1);
            dotGraphic[i].drawCircle(0, 0, item.lineLength/600*15);
            dotSprite.push(game.add.sprite(0, 0, dotGraphic[i].generateTexture()) );
            dotGraphic[i].clear();
            if(item.dotLabel == true){
                newLabel = game.add.text((item.lineOrientation == 'h' ? 0 : 20), (item.lineOrientation == 'h' ? -25 : -5) , ['A','B','C','D','E','F','G'][i], {
                    font: "18px Arial",
                    fill: "black",
                    align: 'center'}); 
                dotSprite[i].addChild(newLabel)
            }
            dotSprite[i].x = (item.dotOrientation == 'h' ? i*35 : 0)
            dotSprite[i].y = (item.dotOrientation == 'v' ? i*40 : 0)
            dotSprite[i].number = i
            numberLine.dotValue[i] = null
            numberLineDots.push(dotSprite[i])
        }
     
        piece[piece.length] = game.add.group();
        
        dotSprite.forEach(function(spriteItem){
            spriteItem.inputEnabled='true';
            if(state == 'build')
            {   
                piece[piece.length-1].add(spriteItem);
                spriteItem.events.onInputDown.add(buildGroupPieceClick, this);
                spriteItem.events.onInputUp.add(onFinishDrag, draggingPiece);
                spriteItem.clicked=0;
                spriteItem.ParentPosition=piece.length-1;
            } else
            {
                spriteItem.x = spriteItem.x+item.dotStartX
                spriteItem.y = spriteItem.y+item.dotStartY
                spriteItem.events.onInputDown.add(numberLineDotClick, this);
                spriteItem.events.onInputUp.add(onFinishDragNumberLineDot, draggingPiece);
                spriteItem.input.useHandCursor=true; 
                spriteItem.dotSnapping = item.dotSnapping 
                spriteItem.lineLength = item.lineLength 
                spriteItem.interval = item.interval
                spriteItem.subDivide = item.subDivide
                spriteItem.intervalSpacing = item.intervalSpacing
                spriteItem.min = item.min
                spriteItem.max = item.max
                spriteItem.lineOrientation = item.lineOrientation;
            }
        });   
    }
    
    
    
    if(state == 'build') {
        if(piece[piece.length-1] != null)
        {
            piece[piece.length-1].x=item.dotStartX
            piece[piece.length-1].y=item.dotStartY
            piece[piece.length-1].type='20a'    
            piece[piece.length-2].dotStartX=piece[piece.length-1].x
            piece[piece.length-2].dotStartY=piece[piece.length-1].y
        }
        
        piece[piece.length-2].type=20
        piece[piece.length-2].startX=piece[piece.length-2].x
        piece[piece.length-2].startY=piece[piece.length-2].y
        piece[piece.length-2].lineOrientation=item.lineOrientation
        piece[piece.length-2].lineLength=item.lineLength
        piece[piece.length-2].min=item.minExpression
        piece[piece.length-2].minLabel=item.minLabel
        piece[piece.length-2].max=item.maxExpression
        piece[piece.length-2].maxLabel=item.maxLabel
        piece[piece.length-2].interval=item.intervalExpression
        piece[piece.length-2].intervalLabel=item.intervalLabel
        piece[piece.length-2].subDivide=item.subDivide
        piece[piece.length-2].dotOrientation=item.dotOrientation
        piece[piece.length-2].dotNumber=item.dotNumber
        piece[piece.length-2].dotLabel=item.dotLabel
        piece[piece.length-2].dotSnapping=item.dotSnapping    
    }
    //reset the min to the actual expression for cleanup purposes
    item.min = item.minExpression
    item.max = item.maxExpression
    item.interval = item.intervalExpression
}

var draggingNumberLineDot = 0
var draggingDotHandle
function numberLineDotClick (item) {
    draggingNumberLineDot=1;
    game.world.bringToTop(item);
    draggingDotHandle = item;
}

function onFinishDragNumberLineDot(item) {
    draggingNumberLineDot=0;
    if(draggingDotHandle.lineOrientation == 'h')
        {
            if( draggingDotHandle.x+draggingDotHandle.lineLength/600*5 >= numberLine.x && draggingDotHandle.x+draggingDotHandle.lineLength/600*5 <= numberLine.x+numberLine.width && draggingDotHandle.y == numberLine.y-4 )
            {
            } else
            {
                numberLine.dotValue[draggingDotHandle.number]= null
            }    
        } else
        {
            if( draggingDotHandle.y+draggingDotHandle.lineLength/600*5 >= numberLine.y && draggingDotHandle.y+draggingDotHandle.lineLength/600*5 <= numberLine.y+numberLine.height && draggingDotHandle.x == numberLine.x+14 )
            {
            } else
            {
                numberLine.dotValue[draggingDotHandle.number]= null
            }     
        }
}

function dragNumberLineDot(item) {
    if(draggingNumberLineDot==1)
    {

        draggingDotHandle.x=game.input.x;
        draggingDotHandle.y=game.input.y;
        if(draggingDotHandle.lineOrientation == 'h')
        {
            if(draggingDotHandle.x+5 > numberLine.x && draggingDotHandle.x-5 < numberLine.x+numberLine.width && Math.abs(draggingDotHandle.y+4-numberLine.y) < 20) 
            {//I'm close to a vertex.  Snap to it.
                draggingDotHandle.y=numberLine.y-4;
    
                if(draggingDotHandle.dotSnapping == 1) {
                   draggingDotHandle.x = parseInt(draggingDotHandle.x/draggingDotHandle.intervalSpacing)*draggingDotHandle.intervalSpacing+(numberLine.x%draggingDotHandle.intervalSpacing)-5
                } else
                {
                }
                numberLine.dotValue[draggingDotHandle.number] = draggingDotHandle.min+(draggingDotHandle.x+5 - numberLine.x) / draggingDotHandle.intervalSpacing * draggingDotHandle.interval/draggingDotHandle.subDivide
               
            }   
        } else
        {
            if(draggingDotHandle.y+12 > numberLine.y && draggingDotHandle.y+12 < numberLine.y+numberLine.height && Math.abs(draggingDotHandle.x-14-numberLine.x) < 20) 
            {//I'm close to a vertex.  Snap to it.
                draggingDotHandle.x=numberLine.x+14;
                if(draggingDotHandle.dotSnapping == true) {
                   draggingDotHandle.y = parseInt(draggingDotHandle.y/draggingDotHandle.intervalSpacing)*draggingDotHandle.intervalSpacing+(numberLine.y%draggingDotHandle.intervalSpacing)+12
                   numberLine.dotValue[draggingDotHandle.number] = draggingDotHandle.min+(draggingDotHandle.y-12 - numberLine.y) / draggingDotHandle.intervalSpacing * draggingDotHandle.interval/draggingDotHandle.subDivide
                } else
                {
                   
                    numberLine.dotValue[draggingDotHandle.number] =  draggingDotHandle.min+( (draggingDotHandle.x+draggingDotHandle.lineLength/600*5 - numberLine.x) /  draggingDotHandle.lineLength ) * draggingDotHandle.max-draggingDotHandle.min
                }
            }
        }
    }
}

function getNumberLineSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Number Line Settings",
                onEscape: function() {state='build'},
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
                onEscape: function() {state='build'},
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
                onEscape: function() {state='build'},
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