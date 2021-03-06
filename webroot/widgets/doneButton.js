function DoneTest(appletID, test) {
    this.appletID = appletID;
    this.test = test;
}

function buildDoneButton(item) {
    piece[piece.length] = game.add.sprite(0, 0, 'doneButton');
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=5;
    if(state != 'build')
    {
        piece[piece.length-1].x = item.startX;
        piece[piece.length-1].y = item.startY;
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].events.onInputDown.add(doneButtonClick, this);
        piece[piece.length-1].anchor.setTo(0.5, 0.5);
    }
}

var timerExists;
//this appletTests the doneStatement; this could trigger a dialog, another applet, etc.
function doneButtonClick(item) {
    if(state != 'transition')
    {
        var correct = 0;
        timerRunning = 0;
        if(threadMode == 0)
        {
            
            if($.isArray(eval(appletTests)))  //partial credit problem
            {
                for(var test = 0 ; test < eval(appletTests).length ; test++ )
                {
                    {
                        correct += eval(eval(appletTests)[test])/(eval(appletTests).length)
                    }    
                }
                console.log(correct)
                if(correct > 0.99) {correct = 1} ; //some partial credit applets don't end up getting to 1
                threadRecord.push(correct);
            } else //singular question
            { 
                if(+eval(appletTests)==1)  //implicitly convert true to 1; also handles selectableScore()
                {
                    correct = 1;
                } 
            }
            if(correct == 1)
            {
                clearCurrentApplet();
            }
            
        } else
        {
            if($.isArray(eval(appletTests))) //partial credit problem
            {
                for(var test = 0 ; test < eval(appletTests).length ; test++ )
                {
                    {
                        correct += eval(eval(appletTests)[test])/(eval(appletTests).length)
                    }    
                }
                if(correct > 0.99) {correct = 1}  //some partial credit applets don't end up getting to 1
                threadRecord.push(correct);
            } else //singular question
            { //will need to form arrays for repeated questions in #challenge mode
            //this adds adds the applet score to the challenge record
                if(+eval(appletTests)>0)
                {
                    threadRecord.push(+eval(appletTests)); //implicitly convert true to 1; also handles selectableScore()
                    correct = +eval(appletTests);
                } else
                {
                    threadRecord.push(0);
                    correct = 0;
                }    
            }
            
            timerExists = 0;
            piece.forEach(function(item){
                if( item.type == 22 ){ timerExists=1};
            });
            
            if(timerExists==1)  //don't run the animation if we're still in a speed round
            {   timerRecord.push(threadRecord[threadRecord.length-1]);
                if(timerRecord.length < timerRepetitions )
                {
                    
                    console.log(timerRecord)
                    clearCurrentApplet();   
                } else //done with speed round
                {
                    correct = 0;
                    timerRecord.forEach(function(item){
                        correct += item/timerRepetitions;  //calculate the speed round score
                    });
                    console.log("precentage: " + correct)
                    appletTransition(correct);
                    
                }
                
            } else
            {
                appletTransition(correct); //run the transition animation
            }
            
        }    
    }
    
    
    
}

function getAnswerRight()
{
    threadRecord.push(1);
    appletTransition(1);
}