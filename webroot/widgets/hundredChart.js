var hundredBoxesClicked=-1;
function buildHundredChart(item) {
    piece[piece.length] = game.add.group();
    var valueCountdown = item.staticValue;
    for(var i=0; i<10; i++)
    {
        for(var j=0; j<10; j++)
        {
            piece[piece.length-1].create((i-5)*20*item.userScale,(j-5)*20*item.userScale, drawClickableBox(item.userScale, ( valueCountdown > 0 ? 1 : 0 ) ));
            valueCountdown--
            newTextureTemp.clear();
        }
    }
    piece[piece.length-1].forEach(function(subItem) {
        if(item.staticValue > 0) //static value
        {
             
            hundredBoxesClicked = item.staticValue
        } else
        {
            hundredBoxesClicked=0;
        }
        subItem.inputEnabled='true';
        subItem.events.onInputDown.add(buildGroupPieceClick, this);
        subItem.events.onInputUp.add(onFinishDrag, draggingPiece);
        subItem.clicked=0;  
       
        subItem.userScale = item.userScale;
        subItem.ParentPosition=piece.length-1;
    });
    piece[piece.length-1].x = item.startX;
    piece[piece.length-1].y = item.startY;
    if(state!= 'build')
    {

        piece[piece.length-1].forEach(function(subItem) {
            if(item.staticValue == 0)
            {
                subItem.inputEnabled='true';
                subItem.events.onInputDown.add(hundredBoxClick, this);
            }
            subItem.parentNumber = piece.length-1;
        });    
    }
    piece[piece.length-1].userScale = item.userScale;
    piece[piece.length-1].staticValue = item.staticValue;
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=4; 
    
}

function hundredBoxClick(item) {
    piece[item.parentNumber].forEach(function(item) {
        item.events.onInputOver.add(hundredBoxClick, this);  //this is the right place to add it; we want mouseover behavior too
    });
    
    if(game.input.mousePointer.isDown)
    {
        if(item.clicked == 0)
        {
            item.clicked = 1;
            hundredBoxesClicked++;
            item.loadTexture(drawClickableBox(item.userScale, 1));
            newTextureTemp.clear();
        } else
        {
            item.clicked = 0;
            hundredBoxesClicked--;
            item.loadTexture(drawClickableBox(item.userScale, 0));
            newTextureTemp.clear();
        }   
    }
}

function getHundredChartSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "HundredChart Settings",
                onEscape: function() {state='build'},
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