var clockSetTime; 
function buildClock(object)
{
    clockSetTime = eval(object.minutes);
    piece.forEach(function(item) {
        if(item.type == 23)
        {
            console.log("previous settable clock entry found - only one per applet");
            item.deleted=true;
            item.destroy(true);
        }
    });
    piece[piece.length] = game.add.group();
    piece[piece.length-1].type = 23;
    piece[piece.length-1].minutes = object.minutes
    
    var clockSprite = game.add.sprite(60,6,drawClock(clockSetTime))
    piece[piece.length-1].add(clockSprite)
    newTextureTemp.clear();
    
    var buttonSpacing = 55;
    piece[piece.length-1].create(5+0*buttonSpacing,215,'clockButton1').timeChange = -60;
    piece[piece.length-1].create(5+1*buttonSpacing,215,'clockButton2').timeChange = -5;
    piece[piece.length-1].create(5+2*buttonSpacing,215,'clockButton3').timeChange = -1;
    piece[piece.length-1].create(5+3*buttonSpacing,215,'clockButton4').timeChange = 1;
    piece[piece.length-1].create(5+4*buttonSpacing,215,'clockButton5').timeChange = 5;
    piece[piece.length-1].create(5+5*buttonSpacing,215,'clockButton6').timeChange = 60;
    
    piece[piece.length-1].grouped=1;
    var iteration = 0
    piece[piece.length-1].forEach(function(subitem) {
        subitem.inputEnabled='true';
        subitem.events.onInputDown.add(buildGroupPieceClick, this);
        subitem.events.onInputUp.add(onFinishDrag, draggingPiece);  
        subitem.ParentPosition=piece.length-1;
    });
    
    if(state!='build')
    {
        piece[piece.length-1].x = object.startX
        piece[piece.length-1].y = object.startY
        piece[piece.length-1].forEach(function(item) { //inequality entry button behavior
            if (typeof item.timeChange === 'undefined') 
            { } else
            {
                item.events.onInputDown.add(clockButtonClick, this);
                item.ParentPosition=piece.length-1;  
            }

        });
        
    }
    
    function clockButtonClick(item) {
        clockSetTime += item.timeChange;
        if(clockSetTime > 60*24 ) {clockSetTime -= 60*24} else
        if(clockSetTime < 0 ) {clockSetTime += 60*24}
        clockSprite.loadTexture(drawClock(clockSetTime))
        newTextureTemp.clear();
    }
    
}

function drawClock(minutes) {
    var angle;
    var angleHour = (minutes/60-15)/12*360*Math.PI/180;
    var angleMinute = (minutes%60-15)*6*Math.PI/180;
    var newGraphic = game.add.graphics(0, 0);
    var returnGroup = game.add.group();
    newGraphic.lineStyle(2, 0x000000, 1);
    newGraphic.beginFill(0xDDDDDD, 1);
    newGraphic.drawCircle(90, 90, 200);
    for(var i = 0 ; i < 60 ; i++) {
        angle = i*6*Math.PI/180;
        newGraphic.moveTo(90+( (i*6)%5==0 ? 90 : 95 )*Math.cos(angle),90+( (i*6)%5==0 ? 90 : 95 )*Math.sin(angle));
        newGraphic.lineTo(90+100*Math.cos(angle),90+100*Math.sin(angle))  ;
    } 
    newGraphic.moveTo(90,90);
    newGraphic.lineTo(90+90*Math.cos(angleMinute),90+90*Math.sin(angleMinute));
    newGraphic.moveTo(90,90);
    newGraphic.lineStyle(4, 0x000000, 1);
    newGraphic.lineTo(90+60*Math.cos(angleHour),90+60*Math.sin(angleHour));
    returnGroup.add(newGraphic);
    newTextureTemp = newGraphic;
    
    var clockNumber = [];
    for(i = 1 ; i < 13 ; i++) {
        angle = (i-3)*30*Math.PI/180;
        clockNumber[clockNumber.length] = game.add.text(90+80*Math.cos(angle) , 90+80*Math.sin(angle) , i.toString(), {
            font: 20+"px Arial",
            fill: "black",
            align: 'center'}); 
        clockNumber[clockNumber.length-1].anchor.setTo(0.5,0.4);
        returnGroup.add(clockNumber[clockNumber.length-1]);
    }
    var newAMPMLabel = game.add.text(155,170, (minutes>720 ? "PM" : "AM"), {
            font: 20+"px Arial",
            fill: "black",
            align: 'center'}); 
        returnGroup.add(newAMPMLabel);
        
    var returnTexture = returnGroup.generateTexture();
    for(i = 0 ; i < 12 ; i++) {
        clockNumber[i].destroy();
    }
    newAMPMLabel.destroy();
    return returnTexture;
}

function getClockSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Settable Clock Settings",
                onEscape: function() {state='build'},
                message: 
                getMenuEntryString("Initial time:" , "minutes", "getRandomInt(0,1440)", "In minutes 0-1440" ) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({   
                                "minutes":$('#minutes').val()
                            })) ;
                            buildClock(newObject);
                           
                        }
                    }
                }
            }
        );
}