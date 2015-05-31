var totalBoxes=0;
var boxesClicked=-1;
function buildClickBox(item) {
    if (typeof item.userScale === 'undefined') { item.userScale = 1; }
    piece[piece.length] = game.add.sprite(0, 0, drawClickableBox(4*item.userScale, 0));
    newTextureTemp.clear();
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=0;
    piece[piece.length-1].x = item.startX;
    piece[piece.length-1].y = item.startY;
    piece[piece.length-1].userScale = item.userScale;
    if(state!='build')
    {
        totalBoxes++;
        boxesClicked=0;
        piece[piece.length-1].clicked = 0;
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].events.onInputDown.add(clickBoxClick, this);
        piece[piece.length-1].anchor.setTo(0.5, 0.5);    
    }
}

function drawClickableBox(scale, clicked){
    var hundredBoxOneGraphic = game.add.graphics(0, 0);
    hundredBoxOneGraphic.lineStyle(2, 0x000000, 1);
    (clicked == 0 ? hundredBoxOneGraphic.beginFill(0xFFFFFF)  : hundredBoxOneGraphic.beginFill(0xA8A8A8) ) ;
    hundredBoxOneGraphic.drawRect(0, 0, 20*scale, 20*scale); 
    hundredBoxOneGraphic.endFill();
    newTextureTemp = hundredBoxOneGraphic;
    return hundredBoxOneGraphic.generateTexture();
    
}

function clickBoxClick(item) {
    if(item.clicked == 0)
    {
        item.clicked = 1;
        boxesClicked++;
        item.loadTexture(drawClickableBox(4*item.userScale, 1));
        newTextureTemp.clear();
    } else
    {
        item.clicked = 0;
        boxesClicked--;
        item.loadTexture(drawClickableBox(4*item.userScale, 0));
        newTextureTemp.clear();
    }    
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