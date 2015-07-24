function getConcreteFractionTypeTypeSetting() {
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
    '<input type="radio" name="type" id="bold-0" value="bar" checked="checked"> ' +
    'Fraction Bar </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="dragTo"> Fraction Bar DragTo </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="model"> Fraction Model </label> ' +
    
    '</div> '
    bootbox.alert({
        size: 'large',
        title: "Concrete Fractions Type:",
        onEscape: function() {state='build'},
        message: multChoiceString[0], //this is now possibly quite long
        callback: function()
        { 
            var selection = $("input[name='type']:checked").val();
            switch(selection) {
                case 'bar':
                    getConcreteFractionBarSettings();
                    break;
                    
                case 'dragTo':
                    getConcreteFractionBarDragToSettings();
                    break;
                    
                case 'model':
                    getConcreteFractionModelSettings();
                    break;
            }
            
        }
    });
}

//buildFractionBar({"type":24,"startX":40,"startY":20,"denominator":3,"scaleX":1,"scaleY":1,"draggable":true,"color":true}
function getConcreteFractionBarSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Fraction Bar Settings",
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Denominator:" , "denominator", 4 , null) +
                    getMenuEntryString("ScaleX:" , "scalex", 1 , null) +
                    getMenuEntryString("ScaleY" , "scaley", 1 , null) +
                    getMenuYesNoString("Draggable?", "draggable", null) + 
                    getMenuYesNoString("Color?", "color", null) + 
                    getMenuEntryString("Limit pieces:" , "limit", 0 , "0 to display all pieces.") +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var newObject = JSON.parse(JSON.stringify({
                                "startX":100 ,
                                "startY":10,
                                "denominator" : $('#denominator').val() , 
                                "scaleX" : $('#scalex').val() , 
                                "scaleY" : $('#scaley').val() , 
                                "draggable": ($("input[name='draggable']:checked").val() == "Yes" ? true : false) ,
                                "color": ($("input[name='color']:checked").val() == "Yes" ? true : false) ,
                                "limit":($('#scalex').val() == 0 ? 0 : $('#denominator').val() )  ,
                            })) ;
                            buildFractionBar(newObject);
                            state='build'
                        }
                    }
                }
            }
        );
}

//buildFractionBarDragToBox({"type":25,"startX":40,"startY":420,"scaleX":1,"scaleY":1})
function getConcreteFractionBarDragToSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Fraction Bar DragTo Settings",
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("ScaleX:" , "scalex", 1 , null) +
                    getMenuEntryString("ScaleY" , "scaley", 1 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var newObject = JSON.parse(JSON.stringify({
                                "startX":100 ,
                                "startY":10,
                                "scaleX" : $('#scalex').val() , 
                                "scaleY" : $('#scaley').val() ,
                            })) ;
                            buildFractionBarDragToBox(newObject);
                            state='build'
                        }
                    }
                }
            }
        );
}

//buildFractionBar({"type":24,"startX":40,"startY":20,"denominator":3,"scaleX":1,"scaleY":1,"draggable":true,"color":true})
function buildFractionBar(item) {
    if (typeof item.limit === 'undefined' || item.limit == 0) { item.limit = item.denominator }
    var denominatorExpression = item.denominator;
    item.denominator = eval(item.denominator);
    var colors = [0xFF0000,0xFFA500,0xFFFF00,0x008000,0x0000FF,0x4B0082,0xEE82EE,0xFF69B4,0xFFE4B5,0xADFF2F,0x48D1CC]
    piece[piece.length] = game.add.group();
    
    
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
   
    if(item.color == true)
    {
        newGraphic.beginFill( (item.denominator<12? colors[item.denominator-1] : 0xA0522D), 1);
  
    } else
    {
        newGraphic.beginFill( 0xFFFFFF, 1);
    }
        newGraphic.drawRect(0, 0, item.scaleX*700 / item.denominator , item.scaleY*30);  
    
    var barPieces = []
    for(var i = 0 ; i < eval(item.limit) ; i ++)
    {
        barPieces.push(game.add.sprite (i*item.scaleX*700 / item.denominator ,0,newGraphic.generateTexture() ) )
        barPieces[barPieces.length-1].addChild( game.add.text(barPieces[barPieces.length-1].width/2, 0, "1", {
            font: 14*item.scaleY+'px Arial',
            fill: 'black',
            align: "center"
        }))
        barPieces[barPieces.length-1].addChild( game.add.text(barPieces[barPieces.length-1].width/2, -2*item.scaleY, "_", {
            font: 16*item.scaleY+'px Arial',
            fill: 'black',
            align: "center"
        }))
        barPieces[barPieces.length-1].addChild( game.add.text(barPieces[barPieces.length-1].width/2-(item.denominator>9?item.scaleX*4:0), 15*item.scaleY, item.denominator.toString(), {
            font: 14*item.scaleY+'px Arial',
            fill: 'black',
            align: "center"
        }))
        piece[piece.length-1].add(barPieces[barPieces.length-1])
    }
    
    newGraphic.clear();  //clean up texture

    
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].forEach(function(subitem) {
        subitem.inputEnabled='true';
        subitem.events.onInputDown.add(buildGroupPieceClick, this);
        subitem.events.onInputUp.add(onFinishDrag, draggingPiece);  
        subitem.ParentPosition=piece.length-1;
    });
    
    if(state!='build')
    {
        piece[piece.length-1].x = item.startX;
        piece[piece.length-1].y = item.startY;
        piece[piece.length-1].forEach(function(subitem) { 
            if(item.draggable == true)
            {
                subitem.inputEnabled='true';
                subitem.input.useHandCursor=true;
                subitem.events.onInputDown.add(startDraggingFractionBar, this);
                subitem.events.onInputUp.add(stopDraggingFractionBar, this); 
                //subitem.input.enableDrag(false, true);
                subitem.occupying = null;
                subitem.anchor.setTo(0,0)
            }
        });
        
    }
    piece[piece.length-1].type = 24;
    piece[piece.length-1].denominator = item.denominator;
    piece[piece.length-1].scaleX = item.scaleX;
    piece[piece.length-1].scaleY = item.scaleY;
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].limit = item.limit;
    piece[piece.length-1].color = item.color;
    
    
}

var fractionBarHandle = null;
function startDraggingFractionBar(barPiece) {
    fractionBarHandle = barPiece;
    game.world.bringToTop(barPiece.parent);
    
    //needed to compensate for the child/parent difference
    fractionBarHandle.xOffset = fractionBarHandle.x - game.input.x
    fractionBarHandle.yOffset = fractionBarHandle.y - game.input.y
    
    if ( barPiece.occupying != null ) //I'm in a box already
    {
        barPiece.occupying.contents -= (1/barPiece.parent.denominator) ;
        for (var i = barPiece.contentsSlot + 1 ; i < barPiece.occupying.contentsIDs.length; i++)
        {
            barPiece.occupying.contentsIDs[i].contentsSlot -= 1;
        }
        barPiece.occupying.contentsIDs.splice(barPiece.contentsSlot,1);
        fixSlotSpacing(barPiece.occupying);
        barPiece.occupying = null;
        
    }
    
    
    
}

function fixSlotSpacing(dragTo) {
        dragTo.contents = 0;
        for (var i = 0 ; i < dragTo.contentsIDs.length ; i++)
        {
            dragTo.contentsIDs[i].x = dragTo.x+(dragTo.contents*dragTo.width)-dragTo.contentsIDs[i].parent.x
            dragTo.contentsIDs[i].y = dragTo.y-dragTo.contentsIDs[i].parent.y
            dragTo.contents += (1/dragTo.contentsIDs[i].parent.denominator) ; 
        }
        console.log(dragTo.contents)
    }

function stopDraggingFractionBar(barPiece) {
    if(barPiece.occupying != null)
    {
       barPiece.occupying.contentsIDs.push(barPiece)
       barPiece.contentsSlot = barPiece.occupying.contentsIDs.length-1;
       fixSlotSpacing(barPiece.occupying);
       barPiece.occupying.contents = parseFloat(barPiece.occupying.contents.toFixed(3))
       
    } else
    {
        barPiece.contentsSlot = null;
    }
    
    
    fractionBarHandle = null;
    

}


function dragFractionBar() {
    if(fractionBarHandle != null)
    {
        fractionBarHandle.x = game.input.x+fractionBarHandle.xOffset
        fractionBarHandle.y = game.input.y+fractionBarHandle.yOffset
        
        fractionBarDragToBoxes.forEach(function(item){
            if( (((item.x+item.width)-game.input.x)>0) && (((item.x+item.width)-game.input.x)<item.width) && (((item.y+item.height)-game.input.y)>0) && (((item.y+item.height)-game.input.y)<item.height) )
            {
                if(parseFloat((item.contents+1/fractionBarHandle.parent.denominator).toFixed(3))<=1)
                {
                    fractionBarHandle.x = item.x+(item.contents*item.width)-fractionBarHandle.parent.x
                    fractionBarHandle.y = item.y-fractionBarHandle.parent.y
                    fractionBarHandle.occupying = item;    
                }
            } else
            {
                fractionBarHandle.occupying = null;
            }
        });

    }
}

//buildFractionBarDragToBox({"type":25,"startX":40,"startY":420,"scaleX":1,"scaleY":1})
var fractionBarDragToBoxes = [];
function buildFractionBarDragToBox(item) {
    if(state!='build')
    {
        startX=item.startX;
        startY=item.startY;
    } else
    {
        startX=400;
        startY=250;
    }
    var dragToGraphic = game.add.graphics(0, 0);
    dragToGraphic.beginFill(0xFFFFFF);
    dragToGraphic.lineStyle(2, 0x000000, 1);
    dragToGraphic.drawRect(0, 0, item.scaleX*700, item.scaleY*30);
    dragToGraphic.endFill();
    
    piece[piece.length] = game.add.sprite(startX, startY, dragToGraphic.generateTexture());
    dragToGraphic.clear()
    piece[piece.length-1].anchor.setTo(0, 0);
    piece[piece.length-1].type=25;
    piece[piece.length-1].scaleX = item.scaleX;
    piece[piece.length-1].scaleY = item.scaleY;
    piece[piece.length-1].contents = 0 ;  //should this be null; test sometime?
    piece[piece.length-1].contentsIDs = [];
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, this);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, this);
    
    fractionBarDragToBoxes[fractionBarDragToBoxes.length] = piece[piece.length-1];  //add myself to the dragToBoxes array.
}



//fractionModelTexture({type:"box" , numerator:1 , denominator:2 , size:200 , color:0xff0000 })
function getConcreteFractionModelSettings(item) {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Teture Area Settings",
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Type (box/pie):" , "modeltype", "box" , null) +
                    getMenuEntryString("Numerator:" , "numerator", 1 , null) +
                    getMenuEntryString("Denominator:" , "denominator", 3 , null) +
                    getMenuEntryString("Size:" , "size", 200 , null) +
                    getMenuEntryString("Color:" , "color", 0xff0000 , null) +
                    getMenuStaticDraggagbleSelectableString("Applet behavior: ", "behavior", "This describes the behavior at applet runtime.") +
                    //getMenuYesNoString("Draggable?", "draggable", "Allow user to drag.") + 
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var textureExpression = 'fractionModelTexture({' + 'type:"' + $('#modeltype').val() + '", numerator:' + $('#numerator').val() + ', denominator:' + $('#denominator').val() + ', size:' + $('#size').val() + ', color:' + $('#color').val() + '})';
                            console.log(textureExpression)
                            var newObject = JSON.parse(JSON.stringify({
                                "type": 21, 
                                "startX":100 ,
                                "startY":10,
                                "textureExpression": textureExpression,
                                "number": $('#numerator').val()/$('#denominator').val(),
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


//fractionModelTexture({type:"box" , numerator:1 , denominator:2 , size:200 , color:0xff0000 })
function fractionModelTexture(settings) {
    if (typeof settings.color === 'undefined') 
            { settings.color == 0xA8A8A8 } 
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
    newGraphic.beginFill(settings.color, 1);
    settings.numerator = eval(settings.numerator)
    settings.denominator = eval(settings.denominator)
    if(settings.type == "box") 
    {
        console.log("box")
        var factors = getLeastFactors(settings.denominator);
        var boxWidth = settings.size / factors[1];
        var boxHeight = settings.size / factors[0];
        var boxesBuilt = 0;
        for(var row = 0 ; row < factors[0] ; row++)
        {
            for(var column = 0 ; column < factors[1] ; column++)
            {
                newGraphic.drawRect(column*boxWidth, row*boxHeight, column+1*boxWidth, row+1*boxHeight);    
                boxesBuilt++;
                if(boxesBuilt == settings.numerator)
                {
                    newGraphic.beginFill(0xFFFFFF, 1);   
                }
            }
            
        }
        
    } else
    { //arc(cx, cy, radius, startAngle, endAngle, anticlockwise) 
        var startAngle = -90
        var fractionAngle = 360/settings.denominator;
    
        
        for(var i = 0 ; i < settings.denominator; i ++) 
        {
            console.log(startAngle)
            //  As we wish to draw a 2nd arc on the SAME Graphics object, we need to move the drawing operation
            newGraphic.moveTo(-100, -100);
            if(i == settings.numerator-1)
                {
                    newGraphic.beginFill(0xFFFFFF, 1);   
                }
            //  Note the 'true' at the end, this tells it to draw anticlockwise
            newGraphic.arc(-100, -100, settings.size, game.math.degToRad(startAngle), game.math.degToRad(startAngle+fractionAngle), false);
            
            
            startAngle += fractionAngle
        }
        
    }
    newTextureTemp = newGraphic
    return newGraphic.generateTexture();
}