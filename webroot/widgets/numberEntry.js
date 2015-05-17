var numberEntryValue=0;
var numberEntryPanelText;
function buildNumberEntry(item) {
    
    piece.forEach(function(item) {
        if(item.type == 14 || item.type == '14b')
        {
            console.log("previous number entry found - only one per applet");
            item.deleted=true;
            item.destroy(true);
        }
    });
    //number entry buttons
    piece[piece.length] = game.add.group();
    var pieceLabel;
    for(var i = 0; i < 11; i++)
    {
        if(item.orientation == "h")
        {                           
            piece[piece.length-1].create(i*40,0,'numberEntryButton').value=i;
            pieceLabel = new Phaser.Text(game, i*40+10, 0, (i< 10 ? i.toString() : "X" ), {
            font: "36px Arial",
            fill: "black",
            align: "right"});
            pieceLabel.value=i;
            piece[piece.length-1].add(pieceLabel);
        } else
        {
            piece[piece.length-1].create(0,i*40+10,'numberEntryButton').value=i;
            pieceLabel = new Phaser.Text(game, 10, i*40+10, (i< 10 ? i.toString() : "X" ), {
            font: "36px Arial",
            fill: "black",
            align: "right"});
            pieceLabel.value=i;
            piece[piece.length-1].add(pieceLabel);
        }
        
    }
    
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=14;
    piece[piece.length-1].orientation = item.orientation;
    piece[piece.length-1].numberEntryX = item.numberEntryX;
    piece[piece.length-1].numberEntryY = item.numberEntryY;
    piece[piece.length-1].displayX = item.displayX;
    piece[piece.length-1].displayY = item.displayY;
    piece[piece.length-1].displayDigits = item.displayDigits;
    
    piece[piece.length-1].forEach(function(item) {
        item.inputEnabled='true';
        item.events.onInputDown.add(buildGroupPieceClick, this);
        item.events.onInputUp.add(onFinishDrag, draggingPiece);  
        item.ParentPosition=piece.length-1;
        item.displayDigits = item.displayDigits;
        item.displayX = item.displayX;
        item.displayY = item.displayY;
    });
    
    //displayPanel
    game.add.sprite(0,newTextSize/40*-4,'fractionBar');
    var panelGraphic = game.add.graphics(0, 0);
    panelGraphic.beginFill(0xFFFFFF);
    panelGraphic.drawRect(0, 0, item.displayDigits*40 + Math.floor((item.displayDigits-1)/3)*20, 60); 
    panelGraphic.endFill();
    piece[piece.length] = game.add.sprite(item.displayX,item.displayY,panelGraphic.generateTexture());
    panelGraphic.clear();
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type='14b';
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
    
    if(state!='build')
    {
        piece[piece.length-2].x=item.numberEntryX;
        piece[piece.length-2].y=item.numberEntryY;
        piece[piece.length-2].forEach(function(subItem) { //number entry button behavior
            subItem.events.onInputDown.add(numberEntryClick, this);
            subItem.displayDigits = item.displayDigits
            subItem.displayX = item.displayX;
            //item.events.onInputUp.add(numberEntryFinishClick, this);  
            subItem.ParentPosition=piece.length-1;
        });
        //new text over entry panel
        numberEntryPanelText = game.add.text(item.displayX + ((item.displayDigits-1)*40) + Math.floor((item.displayDigits-1)/3) *20, item.displayY-9, numberEntryValue.toString(), {
            font: "72px Arial",
            fill: "black",
            align: "right"
            }); 
    }
}

function numberEntryClick (item) {
    if(item.value<10 && numberEntryValue.toString().length < item.displayDigits)
    {
        numberEntryValue = numberEntryValue*10+item.value;
        numberEntryPanelText.text = addCommas( numberEntryValue.toString() );
        if(numberEntryValue.toString().length >1)
        {
            if( (numberEntryValue.toString().length-1)%3 == 0)
            {
               numberEntryPanelText.x -= 60  
            } else
            {
               numberEntryPanelText.x -= 40 
            }
        }
    } else
    {
        numberEntryValue = 0;
        numberEntryPanelText.x = item.displayX + ((item.displayDigits-1)*40) + Math.floor((item.displayDigits-1)/3)*20
        numberEntryPanelText.text = numberEntryValue.toString();
    }
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
