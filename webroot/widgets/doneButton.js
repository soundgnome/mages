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

//this tests the doneStatement; this could trigger a dialog, another applet, etc.
function doneButtonClick(item) {
    if(threadMode == 0)
    {
        if(eval(tests[loadAppletID]))
        {
            clearCurrentApplet();
        } 
    } else
    {
        if(eval(tests[loadAppletID]))
        {
            threadRecord.push(1);
            console.log("correct:" + loadAppletID)
        } else
        {
            threadRecord.push(0);
        }
        clearCurrentApplet();
    }
    
    
}