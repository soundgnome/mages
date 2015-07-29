var numberEntryValue=[];
var numberEntryPanelText = [];
var numberEntryPanels = [];
var activeEntryPanel = 0;
var numberEntryButtons = [];

function buildNumberEntry(item) {
    console.log("numberEntry")
    if (typeof item.panelQuantity === 'undefined') {item.panelQuantity = 1}
    
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
    var pieceHandle;
    
    for(var i = 0; i < 11; i++)
    {
        if(item.orientation == "h")
        {                           
            pieceHandle = piece[piece.length-1].create(i*40,0,'numberEntryButton')
            pieceHandle.value=i;
            pieceLabel = new Phaser.Text(game, i*40+10, 0, (i< 10 ? i.toString() : "X" ), {
            font: "36px Arial",
            fill: "black",
            align: "right"});
            pieceLabel.value=i;
            piece[piece.length-1].add(pieceLabel);
        } else
        {
            pieceHandle = piece[piece.length-1].create(0,i*40+10,'numberEntryButton');
            pieceHandle.value=i;
            pieceLabel = new Phaser.Text(game, 10, i*40+10, (i< 10 ? i.toString() : "X" ), {
            font: "36px Arial",
            fill: "black",
            align: "right"});
            pieceLabel.value=i;
            piece[piece.length-1].add(pieceLabel);
        }
        numberEntryButtons.push(pieceHandle)
        
    }
    
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=14;
    piece[piece.length-1].orientation = item.orientation;
    piece[piece.length-1].numberEntryX = item.numberEntryX;
    piece[piece.length-1].numberEntryY = item.numberEntryY;
    piece[piece.length-1].displayX = item.displayX; 
    piece[piece.length-1].displayY = item.displayY;
    piece[piece.length-1].displayDigits = item.displayDigits;
    piece[piece.length-1].panelQuantity = item.panelQuantity;
    piece[piece.length-1].hideInitialValue = item.hideInitialValue;
    
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
    var panelGraphic = game.add.graphics(0, 0);
    panelGraphic.beginFill(0xFFFFFF);
    panelGraphic.drawRect(0, 0, item.displayDigits*40 + Math.floor((item.displayDigits-1)/3)*20, 60); 
    panelGraphic.endFill();
    for(var i = 0; i<item.panelQuantity ; i++)
    {
        
        game.add.sprite(i*newTextSize/20,(i+1)*newTextSize/40*-4,'fractionBar');
        numberEntryPanels[numberEntryPanels.length]=game.add.sprite(item.displayX[i],item.displayY[i],panelGraphic.generateTexture());
        numberEntryPanels[numberEntryPanels.length-1].panelNumber = i;
        numberEntryPanels[numberEntryPanels.length-1].grouped=0;
        numberEntryPanels[numberEntryPanels.length-1].type='14b';
        numberEntryPanels[numberEntryPanels.length-1].inputEnabled='true';
        numberEntryPanels[numberEntryPanels.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
        numberEntryPanels[numberEntryPanels.length-1].events.onInputDown.add(entryPanelClick, this);
        numberEntryPanels[numberEntryPanels.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);  
        numberEntryValue.push(0)
        if(state=='applet')
        {
            
            numberEntryPanelText[numberEntryPanelText.length] = game.add.text(item.displayX[i] + ((item.displayDigits-1)*40) + Math.floor((item.displayDigits-1)/3) *20, item.displayY[i]-9, (item.hideInitialValue=="Yes"?"":numberEntryValue[i].toString() ), {
                font: "72px Arial",
                fill: "black",
                align: "right"
            });    
            if(item.panelQuantity>1 && i==0)
            {
                numberEntryPanelBox = game.add.graphics(numberEntryPanels[numberEntryPanels.length-1].x, numberEntryPanels[numberEntryPanels.length-1].y);   
                numberEntryPanelBox.lineStyle(2, 0x0000FF, 1);
                numberEntryPanelBox.drawRect(-2, -2, numberEntryPanels[numberEntryPanels.length-1].width+4, numberEntryPanels[numberEntryPanels.length-1].height+4); 
            }
        
        }
        
    }
    panelGraphic.clear();
    //new text over entry panel

    if(state!='build')
    {
        piece[piece.length-1].x=item.numberEntryX;
        piece[piece.length-1].y=item.numberEntryY;
        piece[piece.length-1].forEach(function(subItem) { //number entry button behavior
            
            subItem.events.onInputDown.add(numberEntryClick, this);
            subItem.displayDigits = item.displayDigits;
            subItem.displayX = item.displayX;
            //item.events.onInputUp.add(numberEntryFinishClick, this);  
            subItem.ParentPosition=piece.length-1;
        });
        
    }
}


var numberEntryPanelBox ;
function entryPanelClick(item)
{
    if(state=='applet')
    {
        if (typeof numberEntryPanelBox !== 'undefined') {numberEntryPanelBox.clear()}
        activeEntryPanel = item.panelNumber;
        if(numberEntryPanels.length>1)
        {
            numberEntryPanelBox = game.add.graphics(item.x, item.y);   
            numberEntryPanelBox.lineStyle(2, 0x0000FF, 1);
            numberEntryPanelBox.drawRect(-2, -2, item.width+4, item.height+4); 
        }
    }
}

var lastKey;
var keyStillDown=0;
function scanKeyboard()
{
    var i;
    var numKey;
    for (i = 0; i <= 9; i++) {
		numKey = i.toString().charCodeAt(0);
        if (game.input.keyboard.isDown(numKey) ) {
        	if(keyStillDown == 0) { //only process it once
	    		keyStillDown = 1;
	    		lastKey = i;
	    		numberEntryButtons.forEach(function(item) {
	    		    if(item.value == i)
	    		    {
	    		        numberEntryClick(item);
	    		    }
	    		});
    		}
    	} else //the key isn't down anymore
	    {
	    	if(lastKey == i)
	    	{
	    		lastKey = 0; //reset
	    		keyStillDown = 0; //make way for a new key
	    	}
	    }
    }
}

function numberEntryClick (item) {
    if(item.value<10 && numberEntryValue[activeEntryPanel].toString().length < item.displayDigits)
    {
        numberEntryValue[activeEntryPanel] = numberEntryValue[activeEntryPanel]*10+item.value;
        numberEntryPanelText[activeEntryPanel].text = addCommas( numberEntryValue[activeEntryPanel].toString() );
        if(numberEntryValue[activeEntryPanel].toString().length >1)
        {
            if( (numberEntryValue[activeEntryPanel].toString().length-1)%3 == 0)
            {
               numberEntryPanelText[activeEntryPanel].x -= 60;
            } else
            {
               numberEntryPanelText[activeEntryPanel].x -= 40;
            }
        }
    } else
    {
        if(item.value<10 && item.displayDigits == 1)
        {
            numberEntryValue[activeEntryPanel] = item.value;
            numberEntryPanelText[activeEntryPanel].text = numberEntryValue[activeEntryPanel].toString();
        } else
        {
            numberEntryValue[activeEntryPanel] = 0;
            numberEntryPanelText[activeEntryPanel].x = item.displayX[activeEntryPanel] + ((item.displayDigits-1)*40) + Math.floor((item.displayDigits-1)/3)*20;
            numberEntryPanelText[activeEntryPanel].text = numberEntryValue[activeEntryPanel].toString(); 
        }
        
    }
}

//TO DO: add hide initial value?
function getNumberEntrySettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Number Entry Box Settings",
                onEscape: function() {state='build'},
                message: 
                getMenuEntryString("Max digits:" , "digits", 6 , null) +
                getMenuEntryString("Number of panels:" , "panels", 1 , null) +
                getMenuEntryString("Orientation? h/v:" , "orientation", "h" , null) +
                getMenuYesNoString("Hide initial value?:", "hideinitial", null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var digits = $('#digits').val();
                            var orientation = $('#orientation').val();
                            var hideInitial = $("input[name='hideinitial']:checked").val() ;
                            var panels = $('#panels').val();
                            state = 'build';
                            var spacing = digits*40;
                            var newPanelsX = [];
                            var newPanelsY = [];
                            var yPos = 0;
                            for(var i = 0; i < panels ; i++)
                            {
                                
                                if(i%2==0) 
                                {
                                    newPanelsX.push(200)
                                    yPos += 100
                                } else
                                {
                                    newPanelsX.push(240+spacing)
                                }
                                newPanelsY.push(yPos)
                            }
                            var newObject = JSON.parse(JSON.stringify({
                                "numberEntryX":200 , 
                                "numberEntryY":200, 
                                "orientation":orientation , 
                                "displayX":newPanelsX, 
                                "displayY":newPanelsY, 
                                "panelQuantity":panels,
                                "displayDigits":Number(digits),
                                "hideInitialValue":hideInitial
                                })) ;
                            buildNumberEntry(newObject)
                            
                        }
                    }
                }
            }
        );
}

function entryPanelCoordinates(axis)
{
    var returnArray = [];
    if(axis == "x")
    {
        for(var i = 0; i < numberEntryPanels.length; i ++) { returnArray.push(numberEntryPanels[i].x) }
    } else
    {
        for(var i = 0; i < numberEntryPanels.length; i ++) { returnArray.push(numberEntryPanels[i].y) }
    }
    return returnArray;
}