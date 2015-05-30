var vertexX;
var vertexY;
var protractorAngle;
function buildProtractorAngle(item) {
    protractorAngle = item;
    if(state=='build')
    {
    item.angleX = 200; 
    item.angleY = 300;
    item.protractorX = 600;
    item.protractorY = 300;    
    }
    
    var angleGraphic;
    var legLength=270;
    item.lowerAngleExpression = item.lowerAngle;
    item.lowerAngle=eval(item.lowerAngle)
    item.upperAngleExpression = item.upperAngle;
    item.upperAngle=eval(item.upperAngle)
    var oldLowerAngle=item.lowerAngle;
    var oldUpperAngle=item.upperAngle;
    
    angleGraphic = drawAngle(legLength, item.lowerAngle, item.upperAngle ) ;

    item.lowerAngle = item.lowerAngle * Math.PI / 180;
    var lowerEndX   = legLength * Math.sin(item.lowerAngle);
    var lowerEndY   = legLength * Math.cos(item.lowerAngle);

    item.upperAngle = item.upperAngle * Math.PI / 180;
    var upperEndX   = legLength * Math.sin(item.upperAngle);
    var upperEndY   = legLength * Math.cos(item.upperAngle);
    
    //add the angle
    
    piece[piece.length] = game.add.sprite(item.angleX+3, item.angleY+1, angleGraphic);
    adjustNewPiece();
    piece[piece.length-1].type=11;
    vertexX=item.angleX+4;
    vertexY=item.angleY;
    
    item.angle=oldLowerAngle-oldUpperAngle;
    if(item.angle < 0)
    {
        item.angle+=360;
    }

    //angleGraphic.destroy(true);
    //add the protractor
    piece[piece.length] = game.add.sprite(item.protractorX, item.protractorY, 'protractor180deg');
    piece[piece.length-1].anchor.setTo(0.50, 0.90);
    piece[piece.length-1].type=11;
    piece[piece.length-1].protractor=1;
    
    //set attributes in the angle object because that's who prints
    piece[piece.length-2].protractorX = item.protractorX;
    piece[piece.length-2].protractorY = item.protractorY;
    piece[piece.length-2].lowerAngle = item.lowerAngleExpression;
    piece[piece.length-2].upperAngle = item.upperAngleExpression;
    
    //use the applet behavior for dragging the protractor so we can snap to the vertex
    //this makes it easier to print them aligned
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].input.useHandCursor=true; 
    piece[piece.length-1].events.onInputDown.add(startDraggingProtractor, this);
    piece[piece.length-1].events.onInputUp.add(stopDraggingProtractor, this);  
}

function drawAngle(legLength, lowerAngle, upperAngle ) {
    lowerAngle = lowerAngle * Math.PI / 180;
    var lowerEndX   = legLength * Math.sin(lowerAngle);
    var lowerEndY   = legLength * Math.cos(lowerAngle);

    upperAngle = upperAngle * Math.PI / 180;
    var upperEndX   = legLength * Math.sin(upperAngle);
    var upperEndY   = legLength * Math.cos(upperAngle);

    var angleGraphic = game.add.graphics(0, 0);
    angleGraphic.lineStyle(2, 0x000000);
    angleGraphic.moveTo(0,0);
    angleGraphic.lineTo(lowerEndX, lowerEndY);
    angleGraphic.moveTo(0,0);
    angleGraphic.lineTo(upperEndX,upperEndY);
    angleGraphic.lineStyle(1, 0x000000);
    angleGraphic.beginFill(0x000000, 1);
    angleGraphic.drawCircle(0, 0, 5);

    angleGraphic.drawCircle(legLength, legLength, 0.01);//these four dots keep the whole thing centered
    angleGraphic.drawCircle(-legLength, legLength, 0.01);
    angleGraphic.drawCircle(legLength, -legLength, 0.01);
    angleGraphic.drawCircle(-legLength, -legLength, 0.01);   

    
    newTextureTemp = angleGraphic
    return angleGraphic.generateTexture()
}

var draggingProtractor=0;
var draggingProtractor
function startDraggingProtractor(item) {
    draggingProtractor=1;
    game.world.bringToTop(item);  //bring the protractor above everything

}

function stopDraggingProtractor(item) {
    draggingProtractor=0;
}


function dragProtractor() {
    if(draggingProtractor==1)
    {
        game.world.forEach(function(item) {
            if (item.protractor==1)  //I'm being dragged
            {//go to mouse pointer
                item.x=game.input.x;
                item.y=game.input.y;
                if(Math.abs(item.x-vertexX) < 20 && Math.abs(item.y-vertexY) < 20) 
                {//I'm close to a vertex.  Snap to it.
                    item.x=vertexX;
                    item.y=vertexY;
                } 
                if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
                {
                    item.rotation -= .01;
                }
                if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
                {
                    item.rotation += .01;
                }
                
            }
            
        });   
    }
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