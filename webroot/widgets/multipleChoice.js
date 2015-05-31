var answers;
var newEvaluatedAnswers = [];
var multipleChoice = [];
var multipleChoiceCorrectAnswer;
var rightAnswer;
var multSpaceX;
var multSpaceY;
var multipleChoiceSelected = null;
function buildMultipleChoiceNumbers(item) {
   // console.log(answers)
    var StartX;
    var StartY;
    multSpaceX=item.spaceX;
    multSpaceY=item.spaceY;
    piece.forEach(function(item) {
        if(item.type == 10)
        {
            item.deleted=true;
            item.destroy(true);
            multipleChoice = [];
        }
    });
    if(state=='build')
    {
        piece[piece.length] = game.add.group();
        piece[piece.length-1].correct=item.answers[0];
        piece[piece.length-1].incorrect1=item.answers[1];
        piece[piece.length-1].incorrect2=item.answers[2];
        piece[piece.length-1].incorrect3=item.answers[3]; 
        startX=400;
        startY=300;
    } else
    {
        piece[piece.length] = game.add.group();
        piece[piece.length-1].correct=item.correct;
        piece[piece.length-1].incorrect1=item.incorrect1;
        piece[piece.length-1].incorrect2=item.incorrect2;
        piece[piece.length-1].incorrect3=item.incorrect3; 
        piece[piece.length-1].x = item.startX;
        piece[piece.length-1].y = item.startY;
    }
        
    answers = [piece[piece.length-1].correct, piece[piece.length-1].incorrect1, piece[piece.length-1].incorrect2, piece[piece.length-1].incorrect3];
    piece[piece.length-1].multiType='0'; //for number values
    answers = shuffleAnswers(answers, piece[piece.length-1].multiType);
    
    
    var newAnswerX;
    var newAnswerY;
    var newEvaluatedAnswer= new Array(4);//move down later
    var answerEvaluated = [0,1,2,3];
  
    answerEvaluated.splice(multipleChoiceCorrectAnswer, 1);
    newEvaluatedAnswer[multipleChoiceCorrectAnswer] = eval(answers[multipleChoiceCorrectAnswer]);
    rightAnswer=newEvaluatedAnswer[multipleChoiceCorrectAnswer]; //this is used for doneStatements
    for(var iterator=0; iterator<3; iterator++)
    {
        newEvaluatedAnswer[answerEvaluated[0]] = findUniqueAnswer(answers[answerEvaluated[0]] , newEvaluatedAnswer); 
        answerEvaluated.splice(0, 1);
    }
    if(newEvaluatedAnswer == null) {
            piece[piece.length-1].destroy(true); 
            bootbox.alert("Your answer definitions are too constrained!");
            newEvaluatedAnswers = [];
    }
    
    for(var answer = 0 ; answer < 4; answer++)
    {
        switch(answer) {
            case 0:
                newAnswerX=0;
                newAnswerY=0;
                newEvaluatedAnswer[0] = 'A. ' + newEvaluatedAnswer[0];
                break;
            case 1:
                newAnswerX=item.spaceX;
                newAnswerY=0;
                newEvaluatedAnswer[1] = 'B. ' + newEvaluatedAnswer[1];
                break;
            case 2:
                newAnswerX=0;
                newAnswerY=item.spaceY;
                newEvaluatedAnswer[2] = 'C. ' + newEvaluatedAnswer[2];
                break;
            case 3:
                newAnswerX=item.spaceX;
                newAnswerY=item.spaceY;
                newEvaluatedAnswer[3] = 'D. ' + newEvaluatedAnswer[3];
                break;
        }
        newEvaluatedAnswers[answer]= game.add.text(newAnswerX, newAnswerY, newEvaluatedAnswer[answer], {
            font: item.multipleChoiceFontSize + 'px Arial',
            fill: 'black',
            align: "left",
            wordWrap: true,
            wordWrapWidth: item.spaceX-10,
        });
        piece[piece.length-1].add(newEvaluatedAnswers[answer]);
    }

    piece[piece.length-1].forEach(function(item) {
        item.inputEnabled='true';
        item.events.onInputDown.add(buildGroupPieceClick, this);
        item.events.onInputUp.add(onFinishDrag, draggingPiece);
        item.clicked=0;
        item.ParentPosition=piece.length-1;
    });
    
    piece[piece.length-1].multipleChoiceFontSize = item.multipleChoiceFontSize;
    piece[piece.length-1].spaceX = item.spaceX;
    piece[piece.length-1].spaceY = item.spaceY;
    piece[piece.length-1].type=10;  
    if(state != 'build')
    {
        piece[piece.length-1].forEach(function(item) {
        item.events.onInputDown.add(multipleChoiceClick, this);
        item.parentNumber = piece.length-1;

        });    
          
    } else
    {
            piece[piece.length-1].grouped=0;
    
    piece[piece.length-1].x=startX; 
    piece[piece.length-1].y=startY; 
    }
}

function buildMultipleChoiceTextures(item) {
   // console.log(answers)
    var StartX;
    var StartY;
    var maxWidth = 0;
    var maxHeight = 0;
    multSpaceX=item.spaceX;
    multSpaceY=item.spaceY;
    piece.forEach(function(item) {
        if(item.type == 10)
        {
            item.deleted=true;
            item.destroy(true);
            multipleChoice = [];
        }
    });
    if(state=='build')
    {
        piece[piece.length] = game.add.group();
        piece[piece.length-1].correct=item.answers[0];
        piece[piece.length-1].incorrect1=item.answers[1];
        piece[piece.length-1].incorrect2=item.answers[2];
        piece[piece.length-1].incorrect3=item.answers[3]; 
        startX=400;
        startY=300;
    } else
    {
        piece[piece.length] = game.add.group();
        piece[piece.length-1].correct=item.correct;
        piece[piece.length-1].incorrect1=item.incorrect1;
        piece[piece.length-1].incorrect2=item.incorrect2;
        piece[piece.length-1].incorrect3=item.incorrect3; 
        piece[piece.length-1].x = item.startX;
        piece[piece.length-1].y = item.startY;
    }
        
    answers = [piece[piece.length-1].correct, piece[piece.length-1].incorrect1, piece[piece.length-1].incorrect2, piece[piece.length-1].incorrect3];
    piece[piece.length-1].multiType='2'; //for texture values
    answers = shuffleAnswers(answers, piece[piece.length-1].multiType);
    
    
    var newAnswerX;
    var newAnswerY;
    var newEvaluatedAnswer= new Array(4);//move down later
    var newTexture= new Array(4);
    var bmd= new Array(4);
    var answerEvaluated = [0,1,2,3];
  
    answerEvaluated.splice(multipleChoiceCorrectAnswer, 1);
    
    for(var answer = 0 ; answer < 4; answer++)
    {
        switch(answer) {
            case 0:
                newEvaluatedAnswer[0] = 'A. ' ;
                break;
            case 1:
                newEvaluatedAnswer[1] = 'B. ';
                break;
            case 2:
                newEvaluatedAnswer[2] = 'C. ';
                break;
            case 3:
                newEvaluatedAnswer[3] = 'D. ';
                break;
        }
        newEvaluatedAnswers[answer]= game.add.text(0, 0, newEvaluatedAnswer[answer], {
            font: '24px Arial',
            fill: 'black',
            align: "left",
            wordWrap: false
        });
        var newTextureGraphic = eval(answers[answer].toString()) ;
        newTexture[answer] = game.add.sprite(0 ,0 , newTextureGraphic  )
        bmd[answer] = game.add.bitmapData(newTexture.width,newTexture.height);
        bmd[answer].ctx.beginPath();
        bmd[answer].ctx.rect(0,0,newTexture.width,newTexture.height);
        bmd[answer].ctx.fillStyle = '#CCCCCC';
        bmd[answer].ctx.fill();
        
        piece[piece.length-1].add(newEvaluatedAnswers[answer]);
        newEvaluatedAnswers[answer].addChild(game.add.sprite(0, 0 , bmd[answer]))
        
        newEvaluatedAnswers[answer].addChild(newTexture[answer])
        newTextureTemp.clear()
        if(newTexture[answer].width > maxWidth)
        {
            maxWidth = newTexture[answer].width;
        }
        if(newTexture[answer].height > maxHeight)
        {
            maxHeight = newTexture[answer].height;
        }
    }
    console.log(maxWidth)
    for(var answer = 0 ; answer < 4; answer++)
    {
        switch(answer) {
            case 0:
                newAnswerX=0;
                newAnswerY=0;
                break;
            case 1:
                newAnswerX=maxWidth+50;
                newAnswerY=0;
                break;
            case 2:
                newAnswerX=0;
                newAnswerY=maxHeight+50;
                break;
            case 3:
                newAnswerX=maxWidth+50;
                newAnswerY=maxHeight+50;
                break;
        }

        newTexture[answer].x += 25
        newTexture[answer].y += 25
        newEvaluatedAnswers[answer].x = newAnswerX
        newEvaluatedAnswers[answer].y = newAnswerY

    }
    multSpaceX=maxWidth+50;
    multSpaceY=maxHeight+50
    
    piece[piece.length-1].forEach(function(item) {
        item.inputEnabled='true';
        item.events.onInputDown.add(buildGroupPieceClick, this);
        item.events.onInputUp.add(onFinishDrag, draggingPiece);
        item.clicked=0;
        item.ParentPosition=piece.length-1;
    });
    
    piece[piece.length-1].multipleChoiceFontSize = item.multipleChoiceFontSize;
    piece[piece.length-1].spaceX = item.spaceX;
    piece[piece.length-1].spaceY = item.spaceY;
    piece[piece.length-1].type=10;  
    if(state != 'build')
    {
        piece[piece.length-1].forEach(function(item) {
        item.events.onInputDown.add(multipleChoiceClick, this);
        item.parentNumber = piece.length-1;

        });    
          
    } else
    {
    piece[piece.length-1].grouped=0;
    
    piece[piece.length-1].x=startX; 
    piece[piece.length-1].y=startY; 
    }
}



function buildMultipleChoiceFractions(item) {
    var StartX;
    var StartY;
    var maxWidth = 0;
    var newWidth
    //multSpaceX=item.spaceX;
    //multSpaceY=item.spaceY;
    piece.forEach(function(item) {
        if(item.type == 10)
        {
            item.deleted=true;
            item.destroy(true);
            multipleChoice = [];
        }
    });
    if(state=='build')
    {
        piece[piece.length] = game.add.group();
        piece[piece.length-1].correct=item.answers[0];
        piece[piece.length-1].incorrect1=item.answers[1];
        piece[piece.length-1].incorrect2=item.answers[2];
        piece[piece.length-1].incorrect3=item.answers[3]; 
        startX=400;
        startY=300;
    } else
    {
        piece[piece.length] = game.add.group();
        piece[piece.length-1].correct=item.correct;
        piece[piece.length-1].incorrect1=item.incorrect1;
        piece[piece.length-1].incorrect2=item.incorrect2;
        piece[piece.length-1].incorrect3=item.incorrect3; 
        piece[piece.length-1].x = item.startX;
        piece[piece.length-1].y = item.startY;

    }

    answers = []
    answers.push(piece[piece.length-1].correct)
    answers.push(piece[piece.length-1].incorrect1)
    answers.push(piece[piece.length-1].incorrect2)
    answers.push(piece[piece.length-1].incorrect3)

    piece[piece.length-1].multiType='1'; //for fraction values
    answers = shuffleAnswers(answers, piece[piece.length-1].multiType);

    var newAnswerX=0;
    var newAnswerY=0;
    var newEvaluatedWhole= new Array(4);
    var newEvaluatedDenominator= new Array(4);
    var newEvaluatedNumerator= new Array(4);
    var newEvaluatedAnswer = [];
    for (var test = 0; test <4 ; test++) { newEvaluatedAnswer.push(null)}
    var answerEvaluated = [0,1,2,3];
    answerEvaluated.splice(multipleChoiceCorrectAnswer, 1);
    newEvaluatedAnswer[multipleChoiceCorrectAnswer] = JSON.parse(JSON.stringify({    
                                "whole": eval(answers[multipleChoiceCorrectAnswer].whole), 
                                "numerator": eval(answers[multipleChoiceCorrectAnswer].numerator), 
                                "denominator":eval(answers[multipleChoiceCorrectAnswer].denominator)  
                                }));
    rightAnswer=newEvaluatedWhole[multipleChoiceCorrectAnswer]+newEvaluatedNumerator[multipleChoiceCorrectAnswer]/newEvaluatedDenominator[multipleChoiceCorrectAnswer]; //this is used for doneStatements
    
    for(var iterator=0; iterator<3; iterator++)
    {
        newEvaluatedAnswer[answerEvaluated[0]] = findUniqueFraction(answers[answerEvaluated[0]] , newEvaluatedAnswer); 
        answerEvaluated.splice(0, 1);
        
    }
    if(newEvaluatedAnswer == null) {
            piece[piece.length-1].destroy(true); 
            bootbox.alert("Your answer definitions are too constrained!");
            newEvaluatedAnswer = [];
    }
    
    for(var answer = 0 ; answer < 4; answer++)
    {
        var wholeOffset = 0;
        newEvaluatedAnswers[answer]= game.add.text(newAnswerX, newAnswerY, ['A.','B.','C.','D.'][answer], {
            font: item.multipleChoiceFontSize + 'px Arial',
            fill: 'black',
            align: "center",
            wordWrap: false
        });

        
        newEvaluatedAnswers[answer].addChild(game.add.text(item.multipleChoiceFontSize*1.5-item.multipleChoiceFontSize/2.5, 0, (newEvaluatedAnswer[answer].whole == null ? "" : newEvaluatedAnswer[answer].whole.toString() ) , {
            font: item.multipleChoiceFontSize*2 + 'px Arial',
            fill: 'black',
            align: "center",
            wordWrap: false
        }))   
        if(newEvaluatedAnswer[answer].whole == null)
        {
           
        } else
        {
            wholeOffset = item.multipleChoiceFontSize/12*15 
            if(newEvaluatedAnswer[answer].whole > 9)
            {
               wholeOffset = wholeOffset*2 
            }
            
        }
        
        
        newEvaluatedAnswers[answer].addChild(game.add.text(wholeOffset+item.multipleChoiceFontSize*1.5-item.multipleChoiceFontSize/2.5, 0, '___', {
            font: item.multipleChoiceFontSize + 'px Arial',
            fill: 'black',
            align: "center",
            wordWrap: false
        }))
        newEvaluatedAnswers[answer].addChild(game.add.text(wholeOffset+(newEvaluatedAnswer[answer].numerator>9? item.multipleChoiceFontSize*1.5 : item.multipleChoiceFontSize*1.8 )-item.multipleChoiceFontSize/5, 0, newEvaluatedAnswer[answer].numerator.toString() , {
            font: item.multipleChoiceFontSize + 'px Arial',
            fill: 'black',
            align: "center",
            wordWrap: false
        }))
        newEvaluatedAnswers[answer].addChild(game.add.text(wholeOffset+(newEvaluatedAnswer[answer].denominator>9? item.multipleChoiceFontSize*1.5 : item.multipleChoiceFontSize*1.8 )-item.multipleChoiceFontSize/5, item.multipleChoiceFontSize, newEvaluatedAnswer[answer].denominator.toString() , {
            font: item.multipleChoiceFontSize + 'px Arial',
            fill: 'black',
            align: "center",
            wordWrap: false
        }))
        piece[piece.length-1].add(newEvaluatedAnswers[answer]);
        newWidth = newEvaluatedAnswers[answer].width + newEvaluatedAnswers[answer].children[0].width + newEvaluatedAnswers[answer].children[2].width
        if(newWidth > maxWidth)
        {
            maxWidth = newWidth;
        }
    }
    
    for(var answer = 0 ; answer < 4; answer++)
    {
        switch(answer) {
            case 0:
                newAnswerX=0;
                newAnswerY=0;
                break;
            case 1:
                newAnswerX=maxWidth*1.5+20;
                newAnswerY=0;
                break;
            case 2:
                newAnswerX=0;
                newAnswerY=item.multipleChoiceFontSize*2.5;
                break;
            case 3:
                newAnswerX=maxWidth*1.5+20;
                newAnswerY=item.multipleChoiceFontSize*2.5;
                break;
        }
        newEvaluatedAnswers[answer].x = newAnswerX
        newEvaluatedAnswers[answer].y = newAnswerY
    }
    multSpaceX=maxWidth*1.5+20;
    multSpaceY=item.multipleChoiceFontSize*2.5
    
    piece[piece.length-1].forEach(function(item) {
        item.inputEnabled='true';
        item.events.onInputDown.add(buildGroupPieceClick, this);
        item.events.onInputUp.add(onFinishDrag, draggingPiece);
        item.clicked=0;
        item.ParentPosition=piece.length-1;
    });
    
    piece[piece.length-1].multipleChoiceFontSize = item.multipleChoiceFontSize;
    piece[piece.length-1].spaceX = item.spaceX;
    piece[piece.length-1].spaceY = item.spaceY;
    piece[piece.length-1].type=10;  
    if(state != 'build')
    {
        piece[piece.length-1].forEach(function(item) {
        item.events.onInputDown.add(multipleChoiceClick, this);
        item.parentNumber = piece.length-1;

        });    
          
    } else
    {
            piece[piece.length-1].grouped=0;
    
    piece[piece.length-1].x=startX; 
    piece[piece.length-1].y=startY; 
    }
}

var multipleChoiceBox;
function multipleChoiceClick(item) {
    if(multipleChoiceBox)
    {
        multipleChoiceBox.clear()
    }
    multipleChoiceBox = game.add.graphics(item.x+piece[item.parentNumber].x, item.y+piece[item.parentNumber].y);
    multipleChoiceBox.lineStyle(2, 0x0000FF, 1);
    
    //simplest way to determine which answer I am
    if(item.x==0    &&  item.y==0   ){multipleChoiceSelected = 0}
    if(item.x==multSpaceX  &&  item.y==0   ){multipleChoiceSelected = 1}
    if(item.x==0    &&  item.y==multSpaceY  ){multipleChoiceSelected = 2}
    if(item.x==multSpaceX  &&  item.y==multSpaceY  ){multipleChoiceSelected = 3}

    if(piece[item.parentNumber].multiType == 1) //fraction
    {
        multipleChoiceBox.drawRect(-5, 0, 20+1.05*(newEvaluatedAnswers[multipleChoiceSelected].width+newEvaluatedAnswers[multipleChoiceSelected].children[0].width+newEvaluatedAnswers[multipleChoiceSelected].children[1].width), newEvaluatedAnswers[multipleChoiceSelected].height*1.7);    
    } else if(piece[item.parentNumber].multiType == 2)
    {
        multipleChoiceBox.drawRect(-5, 0, newEvaluatedAnswers[multipleChoiceSelected].children[0].width-10, newEvaluatedAnswers[multipleChoiceSelected].children[0].height-10);
    } else //number
    {
        multipleChoiceBox.drawRect(-5, 0, newEvaluatedAnswers[multipleChoiceSelected].width, newEvaluatedAnswers[multipleChoiceSelected].height*.9);    
    }
}


//this function takes a testAnswer expression and an existing set of answers and
//evaluated the testAnswer expression over and over (possibly only once) until it
//finds an answer unique against the set of answers.  If it can't find one after
//100 tries, it gives up and returns null 
function findUniqueAnswer(testAnswer , answers) {
    var duplicateAnswer;
    for(var testIteration = 0 ; testIteration < 100 ; testIteration++)
    {
        duplicateAnswer = 0; //start with a fresh duplicate boolean
        var evaluatedAnswerTest = eval(testAnswer);  //try a new evaluated answer
        for(var testAgainstSlot = 0 ; testAgainstSlot < answers.length ; testAgainstSlot++)
        {
            if(evaluatedAnswerTest == answers[testAgainstSlot])
            {
                duplicateAnswer=1; //no good
            }
        }
        if(duplicateAnswer == 0)
        {
        return evaluatedAnswerTest;  //this is a good answer
        }
    }
    return null; //too constrained
}

function findUniqueFraction(testAnswer , answers) {
    var duplicateAnswer;
    //console.log(answers)
    for(var testIteration = 0 ; testIteration < 100 ; testIteration++)
    {
        duplicateAnswer = 0; //start with a fresh duplicate boolean
        var evaluatedAnswerTestWhole = eval(testAnswer.whole);  //try a new evaluated answer
        var evaluatedAnswerTestNumerator = eval(testAnswer.numerator);  //try a new evaluated answer
        var evaluatedAnswerTestDenominator = eval(testAnswer.denominator);  //try a new evaluated answer
        for(var testAgainstSlot = 0 ; testAgainstSlot < answers.length ; testAgainstSlot++)
        {
            //console.log(answers)
            if (answers[testAgainstSlot] == null) { 
                
            } else
            
            {
                if(evaluatedAnswerTestWhole + evaluatedAnswerTestNumerator/evaluatedAnswerTestDenominator == answers[testAgainstSlot].whole +answers[testAgainstSlot].numerator/answers[testAgainstSlot].denominator)
                    {
                        duplicateAnswer=1; //no good
                    }  
                 
                
            }
            
        }
        if(duplicateAnswer == 0)
        {
        return JSON.parse(JSON.stringify({    
                                "whole": evaluatedAnswerTestWhole, 
                                "numerator": evaluatedAnswerTestNumerator, 
                                "denominator":evaluatedAnswerTestDenominator  
                                }));  //this is a good answer
        }
    }
    return null; //too constrained
}

//this function take a set of 4 answers and returns the set randomnly shuffled
function shuffleAnswers(answers, multiType) {
    var shuffledAnswers = [];
    var correctAnswerShuffled = 0;
    var shuffledFractions = new Array(4); 
//console.log(answers)
    for(var i = 0 ; i < 4 ; i++)
    {
        var shuffleSpot = getRandomInt(0,answers.length-1);
        if(correctAnswerShuffled == 0 && shuffleSpot == 0)
        {
            multipleChoiceCorrectAnswer=i;  
            correctAnswerShuffled=1;
        }
        
        if(multiType == 0){
            shuffledAnswers.push( answers.splice(shuffleSpot , 1).toString() );  
            
        }
        if(multiType == 1){
            shuffledFractions[i] = answers[shuffleSpot]
            answers.splice(shuffleSpot , 1) ;  
            
        }
        if(multiType == 2){
            shuffledAnswers.push( answers.splice(shuffleSpot , 1) );   
        }
         
    }
    if(multiType == 0){
            return shuffledAnswers; 
    }
    if(multiType == 1){
        return shuffledFractions;
    }
    if(multiType == 2){
            return shuffledAnswers; 
    }
    
    
}

function getMultipleChoiceTypeSetting() {
    menuKeyPressed =0
    state = 'prompt';
    var multChoiceString = new Array(4);
    multChoiceString[0] = 
    '<div class="row">  ' +
    '<div class="col-md-12"> ' +
    '<form class="form-horizontal"> ' +
    '<div class="form-group"> ' +'<label class="col-md-4 control-label" for="type">Select Type:</label> ' +
    '<div class="col-md-4">' + '<div class="row">  ' +
    
    '</div><div class="radio"> <label for="bold-0"> ' +
    '<input type="radio" name="type" id="bold-0" value="number" checked="checked"> ' +
    'Eavluated Expression </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="fraction"> Fraction/Mixed Number Values </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="texture"> Texture </label> ' +
    
    '</div> '
    bootbox.alert({
        size: 'large',
        title: "Multiple Choice",
        message: multChoiceString[0], //this is now possibly quite long
        callback: function()
        { 
            var selection = $("input[name='type']:checked").val();
            switch(selection) {
                case 'number':
                    getMultipleChoiceNumberSettings();
                    break;
                    
                case 'fraction':
                    getMultipleChoiceFractionSettings();
                    break;
                    
                case 'texture':
                    getMultipleChoiceTextureSettings();
                    break;
            }
            
        }
    });
}

var newMultipleChoiceNumbers = [];
var multipleChoiceFontSize = 40;
function getMultipleChoiceNumberSettings(startPrompt) {
    
    if(startPrompt == null)
    {
        startPrompt=0;
    }
    var multChoiceTitleString = new Array(5);
    multChoiceTitleString[0]='Multiple Choice Number Settings: Correct Answer';
    multChoiceTitleString[1]='Multiple Choice Number Settings: Incorrect Answer #1';
    multChoiceTitleString[2]='Multiple Choice Number Settings: Incorrect Answer #2';
    multChoiceTitleString[3]='Multiple Choice Number Settings: Incorrect Answer #3';
    
    var multChoiceMessageString = new Array(5);
    multChoiceMessageString[0] = getMenuEntryString("Correct answer expression:" , "correct", 1 , "Enter an expression that respresents the correct answer.");
    multChoiceMessageString[1] = getMenuEntryString("Inorrect answer #1 expression:" , "incorrect1", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect answer. ");
    multChoiceMessageString[2] = getMenuEntryString("Inorrect answer #2 expression:" , "incorrect2", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect answer. ");
    multChoiceMessageString[3] = getMenuEntryString("Inorrect answer #3 expression:" , "incorrect3", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect answer. ");


    bootbox.alert({
        size: 'large',
        title: multChoiceTitleString[startPrompt],
        message: multChoiceMessageString[startPrompt], 
        callback: function()
        { 
            
            switch(startPrompt) 
            {
                case 0:
                    newMultipleChoiceNumbers.push( $('#correct').val() ); 
                    break;
                case 1:
                    newMultipleChoiceNumbers.push( $('#incorrect1').val() );
                    break;
                case 2:
                    newMultipleChoiceNumbers.push( $('#incorrect2').val() );
                    break;
                case 3:
                    newMultipleChoiceNumbers.push( $('#incorrect3').val() );
                    break;
            }
            if(startPrompt <3)
            {
                getMultipleChoiceNumberSettings(startPrompt+1);
            } else
            {
                bootbox.dialog({
                title: "Multiple Choice Settings",
                message: 
                getMenuEntryString("Font size:" , "fontsize", multipleChoiceFontSize ) +
                getMenuEntryString("Horizontal Spacing:" , "spacex", 200 ) +
                getMenuEntryString("Vertical Spacing:" , "spacey", 40 ) +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            spaceX = $('#spacex').val();
                            spaceY = $('#spacey').val();
                            multipleChoiceFontSize = $('#fontsize').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({    
                                "answers": newMultipleChoiceNumbers, 
                                "spaceX": spaceX, 
                                "spaceY":spaceY , 
                                "multipleChoiceFontSize":multipleChoiceFontSize
                                }));      
                            buildMultipleChoiceNumbers(newObject);
                            newMultipleChoiceNumbers = [];
                                }
                            }
                        }
                    }
                );
                
                
            }
        }
    });
}

function getMultipleChoiceTextureSettings(startPrompt) {
    
    if(startPrompt == null)
    {
        startPrompt=0;
    }
    var multChoiceTitleString = new Array(5);
    multChoiceTitleString[0]='Multiple Choice Texture Settings: Correct Answer';
    multChoiceTitleString[1]='Multiple Choice Texture Settings: Incorrect Answer #1';
    multChoiceTitleString[2]='Multiple Choice Texture Settings: Incorrect Answer #2';
    multChoiceTitleString[3]='Multiple Choice Texture Settings: Incorrect Answer #3';
    
    var multChoiceMessageString = new Array(5);
    multChoiceMessageString[0] = getMenuEntryString("Correct texture expression:" , "correctExpression", "testTexture()" , "Enter an expression that respresents the correct answer.");
    multChoiceMessageString[1] = getMenuEntryString("Inorrect texture #1 expression:" , "incorrect1Expression", "testTexture()" , "Enter an expression that respresents an incorrect answer. ");
    multChoiceMessageString[2] = getMenuEntryString("Inorrect texture #2 expression:" , "incorrect2Expression", "testTexture()" , "Enter an expression that respresents an incorrect answer. ");
    multChoiceMessageString[3] = getMenuEntryString("Inorrect texture #3 expression:" , "incorrect3Expression", "testTexture()" , "Enter an expression that respresents an incorrect answer. ");

    bootbox.alert({
        size: 'large',
        title: multChoiceTitleString[startPrompt],
        message: multChoiceMessageString[startPrompt], 
        callback: function()
        { 
            
            switch(startPrompt) 
            {
                case 0:
                    newMultipleChoiceNumbers.push( $('#correctExpression').val() ); 
                    break;
                case 1:
                    newMultipleChoiceNumbers.push( $('#incorrect1Expression').val() );
                    break;
                case 2:
                    newMultipleChoiceNumbers.push( $('#incorrect2Expression').val() );
                    break;
                case 3:
                    newMultipleChoiceNumbers.push( $('#incorrect3Expression').val() );
                    break;
            }
            if(startPrompt <3)
            {
                getMultipleChoiceTextureSettings(startPrompt+1);
            } else
            {
                state = 'build';
                var newObject = JSON.parse(JSON.stringify({    
                    "answers": newMultipleChoiceNumbers, 
                    }));      
                buildMultipleChoiceTextures(newObject);
                newMultipleChoiceNumbers = [];
            }
        }
    });
}


function getMultipleChoiceFractionSettings(startPrompt) {
    
    if(startPrompt == null)
    {
        startPrompt=0;
    }
    var multChoiceTitleString = new Array(5);
    multChoiceTitleString[0]='Multiple Choice Fraction Settings: Correct Answer';
    multChoiceTitleString[1]='Multiple Choice Fraction Settings: Incorrect Answer #1';
    multChoiceTitleString[2]='Multiple Choice Fraction Settings: Incorrect Answer #2';
    multChoiceTitleString[3]='Multiple Choice Fraction Settings: Incorrect Answer #3';
    
    var multChoiceNumeratorMessageString = new Array(5);
    multChoiceNumeratorMessageString[0] = getMenuEntryString("Correct answer numerator expression:" , "correctnumerator", 1 , "Enter an expression that respresents the correct numerator.");
    multChoiceNumeratorMessageString[1] = getMenuEntryString("Incorrect answer #1 numerator expression:" , "incorrect1numerator", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect numerator. ");
    multChoiceNumeratorMessageString[2] = getMenuEntryString("Incorrect answer #2 numerator expression:" , "incorrect2numerator", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect numerator. ");
    multChoiceNumeratorMessageString[3] = getMenuEntryString("Incorrect answer #3 numerator expression:" , "incorrect3numerator", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect numerator. ");

    var multChoiceDenominatorMessageString = new Array(5);
    multChoiceDenominatorMessageString[0] = getMenuEntryString("Correct answer denominator expression:" , "correctdenominator", 1 , "Enter an expression that respresents the correct denominator.");
    multChoiceDenominatorMessageString[1] = getMenuEntryString("Incorrect answer #1 denominator expression:" , "incorrect1denominator", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect denominator. ");
    multChoiceDenominatorMessageString[2] = getMenuEntryString("Incorrect answer #2 denominator expression:" , "incorrect2denominator", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect denominator. ");
    multChoiceDenominatorMessageString[3] = getMenuEntryString("Incorrect answer #3 denominator expression:" , "incorrect3denominator", "getRandomInt(0,10)" , "Enter an expression that respresents an incorrect denominator. ");
    
    var multChoiceWholeMessageString = new Array(5);
    multChoiceWholeMessageString[0] = getMenuEntryString("Correct answer whole number expression:" , "correctwhole", null , "Enter an expression that respresents the correct whole. (null for a regular fraction.)");
    multChoiceWholeMessageString[1] = getMenuEntryString("Incorrect answer #1 whole expression:" , "incorrect1whole", null , "Enter an expression that respresents an incorrect whole. (null for a regular fraction.)");
    multChoiceWholeMessageString[2] = getMenuEntryString("Incorrect answer #2 whole expression:" , "incorrect2whole", null , "Enter an expression that respresents an incorrect whole. (null for a regular fraction.)");
    multChoiceWholeMessageString[3] = getMenuEntryString("Incorrect answer #3 whole expression:" , "incorrect3whole", null , "Enter an expression that respresents an incorrect whole. (null for a regular fraction.)");

    bootbox.alert({
        size: 'large',
        title: multChoiceTitleString[startPrompt],
        message:    multChoiceWholeMessageString[startPrompt] +
                    multChoiceNumeratorMessageString[startPrompt] +
                    multChoiceDenominatorMessageString[startPrompt], 
        callback: function()
        { 
            var fractionObject;
            switch(startPrompt) 
            {
                case 0:
                    fractionObject = JSON.parse(JSON.stringify({    
                                "whole": $('#correctwhole').val(), 
                                "numerator": $('#correctnumerator').val(), 
                                "denominator":$('#correctdenominator').val()
                                }));
                    newMultipleChoiceNumbers.push( fractionObject ); 
                    break;
                case 1:
                    fractionObject = JSON.parse(JSON.stringify({    
                                "whole": $('#incorrect1whole').val(), 
                                "numerator": $('#incorrect1numerator').val(), 
                                "denominator":$('#incorrect1denominator').val()
                                }));
                    newMultipleChoiceNumbers.push( fractionObject ); 
                    break;
                case 2:
                    fractionObject = JSON.parse(JSON.stringify({    
                                "whole": $('#incorrect2whole').val(), 
                                "numerator": $('#incorrect2numerator').val(), 
                                "denominator":$('#incorrect2denominator').val()
                                }));
                    newMultipleChoiceNumbers.push( fractionObject ); 
                    break;
                case 3:
                    fractionObject = JSON.parse(JSON.stringify({    
                                "whole": $('#incorrect3whole').val(), 
                                "numerator": $('#incorrect3numerator').val(), 
                                "denominator":$('#incorrect3denominator').val()
                                }));
                    newMultipleChoiceNumbers.push( fractionObject ); 
                    break;
            }
            if(startPrompt <3)
            {
                getMultipleChoiceFractionSettings(startPrompt+1);
            } else
            {
                bootbox.dialog({
                title: "Multiple Choice Fraction Settings",
                message: 
                getMenuEntryString("Font size:" , "fontsize", multipleChoiceFontSize ) +
                getMenuEntryString("Horizontal Spacing:" , "spacex", 200 ) +
                getMenuEntryString("Vertical Spacing:" , "spacey", 100 ) +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            spaceX = $('#spacex').val();
                            spaceY = $('#spacey').val();
                            multipleChoiceFontSize = $('#fontsize').val();
                            state = 'build';
                            var newObject = JSON.parse(JSON.stringify({    
                                "answers": newMultipleChoiceNumbers, 
                                "spaceX": spaceX, 
                                "spaceY":spaceY , 
                                "multipleChoiceFontSize":multipleChoiceFontSize
                                }));      
                            buildMultipleChoiceFractions(newObject);
                            newMultipleChoiceNumbers = [];
                                }
                            }
                        }
                    }
                );
                
                
            }
        }
    });
}
