//DRAGTO BOX FOR DRAGGABLE NUMBER
function DragToConstructor(appletID, type, startX, startY, userScale) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.userScale = userScale;
}

function buildDragToBox(item) {
    var startX;
    var startY;
    if(state!='build')
    {
        startX=item.startX;
        startY=item.startY;
    } else
    {
        startX=400;
        startY=250;
    }
    if (typeof item.userScaleX === 'undefined') { item.userScaleX = item.userScale; }
    if (typeof item.userScaleY === 'undefined') { item.userScaleY = item.userScale; }
    var dragToGraphic = game.add.graphics(0, 0);
    dragToGraphic.beginFill(0xFFFFFF);
    dragToGraphic.lineStyle(2, 0x000000, 1);
    dragToGraphic.drawRect(0, 0, Number(item.userScaleX)*80, Number(item.userScaleY)*80);
    dragToGraphic.endFill();
    
    piece[piece.length] = game.add.sprite(startX, startY, dragToGraphic.generateTexture());
    dragToGraphic.clear()
    piece[piece.length-1].anchor.setTo(0.5, 0.5);
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=9;
    piece[piece.length-1].userScaleX = item.userScaleX;
    piece[piece.length-1].userScaleY = item.userScaleY;
    piece[piece.length-1].occupied = 0;
    piece[piece.length-1].contents = 0;
    dragToBoxes[dragToBoxes.length] = piece[piece.length-1];  //add myself to the dragToBoxes array.
}

//finds the total place value of the dragTo boxes; must be added right to left 
function valueDragToBoxes() {
    var totalValue=0;
    for(var i = 0; i<dragToBoxes.length; i++) {
        
        totalValue += dragToBoxes[i].contents*Math.pow(10, i);
    }
    return totalValue;
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
