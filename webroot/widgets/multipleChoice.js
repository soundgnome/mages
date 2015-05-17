var answers;
var newEvaluatedAnswers = [];
var multipleChoice = [];
var multipleChoiceCorrectAnswer;
var rightAnswer;
var multSpaceX;
var multSpaceY;

function buildMultipleChoiceNumbers(item) {
    console.log(answers)
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
    answers = shuffleAnswers(answers);
    piece[piece.length-1].multiType='0'; //for number values
    
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

var multipleChoiceBox;
function multipleChoiceClick(item) {
    if(multipleChoiceBox)
    {
        multipleChoiceBox.destroy(true);
    }
    
    multipleChoiceBox = game.add.sprite(item.x+piece[item.parentNumber].x, item.y+piece[item.parentNumber].y, 'choiceBox');
    
    
    //simplest way to determine which answer I am
    if(item.x==0    &&  item.y==0   ){multipleChoiceSelected = 0}
    if(item.x==multSpaceX  &&  item.y==0   ){multipleChoiceSelected = 1}
    if(item.x==0    &&  item.y==multSpaceY  ){multipleChoiceSelected = 2}
    if(item.x==multSpaceX  &&  item.y==multSpaceY  ){multipleChoiceSelected = 3}
    multipleChoiceBox.anchor.setTo(0.02, 0);
    multipleChoiceBox.scale.setTo(newEvaluatedAnswers[multipleChoiceSelected].width/260, newEvaluatedAnswers[multipleChoiceSelected].height/160);
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

//this function take a set of 4 answers and returns the set randomnly shuffled
function shuffleAnswers(answers) {
    var shuffledAnswers = [];
    var correctAnswerShuffled = 0;
    for(var i = 0 ; i < 4 ; i++)
    {
        var shuffleSpot = getRandomInt(0,answers.length-1);
        if(correctAnswerShuffled == 0 && shuffleSpot == 0)
        {
            multipleChoiceCorrectAnswer=i;  
            correctAnswerShuffled=1;
        }
        shuffledAnswers.push( answers.splice(shuffleSpot , 1).toString() );   
    }
    return shuffledAnswers;
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
    'Number/Decimal Values </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="fraction"> Fraction Values </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="mixed"> Mixed Number Values </label> ' +
    
    '</div><div class="radio"> <label for="bold-1"> ' +
    '<input type="radio" name="type" id="bold-1" value="literal"> Literal Values (Strings) </label> ' +
    
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
                    getMultipleChoiceNumberSettings()
                    break;
                    
                case 'fraction':
                    state='build'
                    break;

                case 'number':
                    state='build'
                    break;
                    
                case 'literal':
                    state='build'
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