var timer;
var timerRunning = 0;
var timerStart;
var timerTimeLeft;
var timerLimit;
var timedApplet = 0;

function buildTimer(item) {
    timedApplet = 1;
    var fontString = "bold " + item.size + "px Arial"
    piece[piece.length] = game.add.text(item.startX, item.startY, item.timeLimit.toString() , {
            font: fontString,
            fill: "Green",
            align: "right"
    });
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=22;
    piece[piece.length-1].timeLimit = item.timeLimit;
    piece[piece.length-1].size = item.size;
    timer = piece[piece.length-1];
    timerLimit = item.timeLimit;

    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
  
}

function advanceTimer() {
    if(timedApplet == 1)
    {
        var yellowStyle = {font:"bold " + timer.size + "px Arial", fill:"yellow"};
        var redStyle = {font:"bold " + timer.size + "px Arial", fill:"red"};
        
        if(timerRunning == 0) {
            timerRunning = 1;
            timerStart = game.time.totalElapsedSeconds() ;
        
        } else
        {
            timerTimeLeft = 1+Math.floor((timerStart + parseInt(timerLimit)) - game.time.totalElapsedSeconds() );
            if(timerTimeLeft > timerLimit) {timerTimeLeft = timerLimit}  ;
            timer.setText(timerTimeLeft ) ;
            
            //change color if the user is running out of time	
            if(timerTimeLeft < 1/3*timerLimit) //signal a red warning
            {
            	timer.setStyle(redStyle);	
            } else if(timerTimeLeft < 2/3*timerLimit)
            //signal a yellow warning
            {
            	timer.setStyle(yellowStyle);	
            }
            
            if(timerTimeLeft <1)
            {
                timer.setText( 0 ) ;
            	doneButtonClick();
            	timer.alpha=0
            } 
        }  
    }
    
    
}

function getTimerSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Timer Settings",
                message: 
                getMenuEntryString("TimeLimit:" , "limit", 5, null ) +
                getMenuEntryString("Size:" , "size", 96 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            
                            var newRandomFloor = $('#floor').val();
                            var newRandomCeiling = $('#ceiling').val();
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({   
                                "timeLimit":$('#limit').val(),
                                "size":$('#size').val(),
                                "startX":400,
                                "startY":300
                            })) ;
                            buildTimer(newObject);
                           
                        }
                    }
                }
            }
        );
}