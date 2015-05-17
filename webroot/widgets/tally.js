var tallyPiece;
var tallyGraphic;
var tallyChart;
var tallyTotal;
function buildTally(item) {
    tallyTotal=item.initialValue;
    var tallyPlus;
    var tallyMinus;
    
    piece[piece.length] = game.add.group();
    tallyChart = piece[piece.length-1].create(0, 0, drawTally(item.initialValue));
    tallyGraphic.clear();
    
    
    tallyMinus = piece[piece.length-1].create(0+50, 0+310, 'tallyButtonMinus');
    
    tallyPlus = piece[piece.length-1].create(0+150, 0+310, 'tallyButtonPlus');

    piece[piece.length-1].forEach(function(item) {
        item.inputEnabled='true';
        item.events.onInputDown.add(buildGroupPieceClick, this);
        item.events.onInputUp.add(onFinishDrag, draggingPiece);
        item.clicked=0;
        item.ParentPosition=piece.length-1;
    });
    
    if(state != 'build')
    {
        tallyPlus.events.onInputDown.add(tallyPlusClick, this);
        tallyMinus.events.onInputDown.add(tallyMinusClick, this);
    } else
    {
        item.startX=400;
        item.startY=300;
    }
    
    piece[piece.length-1].x=item.startX;
    piece[piece.length-1].y=item.startY;
    piece[piece.length-1].initialValue=item.initialValue;
    piece[piece.length-1].type=12;
    piece[piece.length-1].grouped=1;
    tallyPiece=piece.length-1;
}


function tallyPlusClick() {
    if(tallyTotal<100)
    {
        tallyTotal++;
        setTally(tallyTotal); 
    }
}

function tallyMinusClick() {
    if(tallyTotal>0)
    {
        tallyTotal--;
        setTally(tallyTotal);   
    }
}

function setTally(tallyValue) {
    tallyChart.loadTexture(drawTally(tallyValue));
    tallyGraphic.clear();
}

function drawTally(tallyValue) {
    tallyGraphic = game.add.graphics(400, 300);
    tallyGraphic.lineStyle(6, 0x000000, 1);
    tallyGraphic.drawRect(0, 0, 250, 300);
    var drawingTally= 0;
    var tallyX;
    var tallyY=7;
    for(var i =0; i<tallyValue; i++)
    {
        drawingTally++;
        if(drawingTally % 5 != 0)
        {
            tallyX = ((drawingTally % 20)*12)+5;
            tallyGraphic.moveTo(tallyX,tallyY);
            tallyGraphic.lineTo(tallyX, tallyY+45);
        } else 
        {
            tallyGraphic.moveTo(tallyX-48,tallyY);
            tallyGraphic.lineTo(tallyX+12, tallyY+45);
        }
            if(drawingTally%20 == 0)
        {
            tallyY+=60;
        } 
    }
    newTextureTemp = tallyGraphic;
    return tallyGraphic.generateTexture();
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