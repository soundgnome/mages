//SEE mages.applets.js for applet definitions
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
var loadScreen1;
var loadScreen2;
var result;
var state='title';
var gridSize = 20;
var titleBack;


function preload() {
    //debug text
    result = 'Math Applet Generator for Elementary School - Basic Architecture - Build Test';
    titleBack = game.load.image('titleBack', 'assets/titleBack.jpg');
    
    
    loadScreen1 = game.add.text(400, 250, "Loading...", {
        font: "bold 60px Arial",
        fill: "red",
        align: "center"
    });
    loadScreen1.anchor.setTo(0.5, 0.5);
    loadScreen2 = game.add.text(400, 300, "The first time may take a while.", {
        font: "bold 30px Arial",
        fill: "red",
        align: "center"
    });
    loadScreen2.anchor.setTo(0.5, 0.5);
    
    //title assets
    game.load.image('title', 'assets/title.png');
    game.load.image('buildButton', 'assets/buildButton.png');
    game.load.image('helpButton', 'assets/helpButton.png');
    game.load.image('loadButton', 'assets/loadButton.png');
    game.load.image('helpScreen1', 'assets/helpScreen1.png');
    game.load.image('helpScreen2', 'assets/helpScreen2.png');
    game.load.image('helpScreen3', 'assets/helpScreen3.png');
    
    
    //widget assets
    game.load.image('whiteBox80', 'assets/whiteBox.png');
    game.load.image('grayBox80', 'assets/grayBox.png');
    game.load.image('grayHundredBox', 'assets/grayHundredBox.png');
    game.load.image('whiteHundredBox', 'assets/whiteHundredBox.png');
    game.load.image('fractionBar', 'assets/fractionBar.png');
    game.load.image('dragToBox', 'assets/dragToBox.png');
    game.load.image('doneButton', 'assets/doneButton.png');
    game.load.image('choiceBox', 'assets/choiceBox.png');
    game.load.image('protractor180deg', 'assets/protractor180deg500pix.png');
    game.load.image('protractorOverlay', 'assets/protractorOverlay.png');
    game.load.image('tallyButtonPlus', 'assets/tallyButtonPlus.png');
    game.load.image('tallyButtonMinus', 'assets/tallyButtonMinus.png');
    game.load.image('numberEntryButton', 'assets/numberEntryButton.svg');
    game.load.image('numberEntryDisplay', 'assets/numberEntryDisplay.svg');
    game.load.image('textureDragBox', 'assets/whiteBox.svg');
    
    
    //gui stuff
    game.load.image('grid', 'assets/grid.png');
    game.load.image('menuButton', 'assets/menuButton.png');
    game.load.image('arrowLeft', 'assets/arrowLeft.png');
    game.load.image('arrowRight', 'assets/arrowRight.png');
    game.load.image('menuClickBox', 'assets/menuClickBox.png');
    game.load.image('menuTextArea', 'assets/menuTextArea.png');
    game.load.image('menuRandomNumber', 'assets/menuRandomNumber.png');
    game.load.image('menuRandomFraction', 'assets/menuRandomFraction.png');
    game.load.image('menuHundredChart', 'assets/menuHundredChart.png');
    game.load.image('menuDoneButton', 'assets/menuDoneButton.png');
    game.load.image('menuRandomDecimal', 'assets/menuRandomDecimal.png');
    game.load.image('menuRandomMixedNumber', 'assets/menuRandomMixedNumber.png');
    game.load.image('menuDraggableNumbers', 'assets/menuDraggableNumbers.png');
    game.load.image('menuDragToBox', 'assets/menuDragToBox.png');
    game.load.image('menuMultipleChoice', 'assets/menuMultipleChoice.png');
    game.load.image('menuProtractorAngle', 'assets/menuProtractorAngle.png');
    game.load.image('menuTallyBox', 'assets/menuTallyBox.png');
    game.load.image('menuDraggableBaseTenBlocks', 'assets/menuDraggableBaseTenBlocks.png');
    game.load.image('menuNumberEntry', 'assets/menuNumberEntry.png');
    game.load.image('menuEvaluatedExpression', 'assets/menuEvaluatedExpression.png');
    game.load.image('menuHiddenNumber', 'assets/menuHiddenNumber.png');
    game.load.image('menuBarGraph', 'assets/menuBarGraph.png');
    game.load.image('menuInequalityEntry', 'assets/menuInequalityEntry.png');
    game.load.image('menuNumberLine', 'assets/menuNumberLine.png');
    game.load.image('menuTTable', 'assets/menuTTable.png');
    
}

function create() {
    titleBack = game.add.sprite(0, 0, 'titleBack');
}

/*******************************************************************************
 *                                  MAIN LOOP
 * ****************************************************************************/
function update() {
    switch(state) {
    case 'loading':
        //function probaly not necessary because we're not loading much sound, but will do anyway
        //loading(); 
        break;
        
    case 'title':
        title();
        break;
        
    case 'help':
        help();
        //a help screen describing the software's use
        break;
        
    case 'appletSelection':
        //call up an applet by ID
        appletSelection();
        break;
        
    case 'applet':
        //run the applet
        runApplet();
        break;
        
    case 'build':
        //build a new applet and print code to console
        build();
        break;
    
    case 'prompt':
        //do nothing until the user is done inputting
        break;
    }
}

/*******************************************************************************
 *                              TITLE SECTION
 * ****************************************************************************/
var titleInitiated=0;
var loadButton;
var buildButton;
var helpButton;
var titleText;
function title() {
    if(titleInitiated==0)
    {
        titleInitiated=1; //only happens once
        loadScreen1.destroy(true);
        loadScreen2.destroy(true);
        defineApplets();  //this is in mages.applets.js
        titleText = game.add.sprite(game.world.centerX, game.world.centerY-100, 'title');
        titleText.anchor.set(0.5);
        game.add.tween(titleText).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        
        loadButton = game.add.sprite(0, 0, 'loadButton');
        loadButton.x = 200;
        loadButton.y = 400;
        loadButton.inputEnabled='true';
        loadButton.events.onInputDown.add(loadButtonClick, this);
        loadButton.anchor.setTo(0.5, 0.5);
        
        buildButton = game.add.sprite(0, 0, 'buildButton');
        buildButton.x = 400;
        buildButton.y = 400;
        buildButton.inputEnabled='true';
        buildButton.events.onInputDown.add(buildButtonClick, this);
        buildButton.anchor.setTo(0.5, 0.5);
        
        helpButton = game.add.sprite(0, 0, 'helpButton');
        helpButton.x = 600;
        helpButton.y = 400;
        helpButton.inputEnabled='true';
        helpButton.events.onInputDown.add(helpButtonClick, this);
        helpButton.anchor.setTo(0.5, 0.5);
    }
}

//the three buttons each change the state
function loadButtonClick() {
    state='appletSelection';
}

function helpButtonClick() {
    helpSprite = game.add.sprite(0, 0, 'helpScreen1');
    state='help';
}

function buildButtonClick() {
    state='build';
}

var helpSprite;
var helpScreen=1;
var helpScreenSpacePressed=0;
function help() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        if(helpScreenSpacePressed==0)
        {
            helpScreen++;
            showHelpScreen(helpScreen);
            helpScreenSpacePressed=1; 
            if(helpScreen>3){
                state='title';
                helpScreen=1;
                
            }
        }
        
    } else
    {
         helpScreenSpacePressed=0;
    }
    
}


function showHelpScreen(helpScreen) {

    if(helpSprite)
    {
        helpSprite.destroy(true);   
    }
    
    switch(helpScreen) {
        case 2:
        helpSprite = game.add.sprite(0, 0, 'helpScreen2');
        break;
        
        case 3:
        helpSprite = game.add.sprite(0, 0, 'helpScreen3');
        break;
    }
    
    
}

/*******************************************************************************
 *                          APPLET LOAD SECTION
 * ****************************************************************************/
var loadAppletID;
function appletSelection() {
    helpButton.destroy(true);
    buildButton.destroy(true);
    titleText.destroy(true);
    loadButton.destroy(true);
    appletIDPrompt();  //this is in mages.dialogs.js
}

var appletInitiated = 0;
var tests = new Array(1000);
function runApplet() {
    if(appletInitiated==0)
    {
        appletInitiated=1;
        this.game.stage.backgroundColor = '#DDDDDD';
        loadApplet();
    } else
    {
        /***********************************************************************
         *                  runApplet() MAIN LOOP
         * ********************************************************************/
        dragNumber();
        dragProtractor();
        dragBaseTenBlock();
        dragNumberLineDot();
    }
}


//this goes through the applet array looking for relevant pieces.  Then it loads them with applet behaviors in place.


var dragToBoxes = [];
function loadApplet() {
    for(var i=0; i<applet.length; i++)
    {
        if(applet[i].appletID == loadAppletID)
        {
            switch(applet[i].type) {
                
            case 0: //click box
            buildClickBox(applet[i]);
            break;
            
            case 1: //text area
            buildTextArea(applet[i]);
            break;
            
            case 2: //random number
            buildRandomNumber(applet[i]);
            break;
            
            case 3: //random fraction
            buildRandomFraction(applet[i]);
            break;
            
            case 4: //hundredChart
            buildHundredChart(applet[i]);
            break;
             
            case 5: //done button
            buildDoneButton(applet[i]);
            break;
            
            case 6: //random decimal
            buildRandomDecimal(applet[i]);
            break;
            
            case 7: //random mixed number
            buildRandomMixedNumber(applet[i]);
            break;
            
            case 8: //draggable numbers
            buildDraggableNumbers(applet[i]);
            break;
            
            case 9: //drag to box
            buildDragToBox(applet[i]);
            break;
            
            case 10: //multiple choice bierarchy
            buildMultipleChoiceNumbers(applet[i]);
            break;
            
            case 11: //protractor and angle
            buildProtractorAngle(applet[i]);
            break;
            
            case 12: //tally box
            buildTally(applet[i]);
            break;
            
            case 13: //base ten clone
            buildBaseTenBlocks(applet[i]);
            break;
            
            case 14: //number entry
            buildNumberEntry(applet[i]);
            break;
            
            case 15: //EvaluatedExpression
            buildEvaluatedExpression(applet[i]);
            break;
            
            case 16: //buildHiddenNumber(item) 
            buildHiddenNumber(applet[i]);
            break;
            
            case 17: //inequality entry (inequalityEntryX, inequalityEntryY, displayX, displayY)
            buildInequalityEntry(applet[i]);
            break;
            
            case 18: //bar graph
            buildBarGraph(applet[i]);
            break;
            
            case 19: //tTable
            buildtTable(applet[i]);
            break;
            
            case 20: //tTable
            buildNumberLine(applet[i]);
            break;
            
            case 21: //texture Area
            buildTextureArea(applet[i]);
            break;
            
            case 99: //buildDrawBox(drawingBoxStartX, drawingBoxStartY, drawingBoxEndX , drawingBoxEndY) 
            buildDrawBox(applet[i]);
            break;
            
            } 
        }
    }
}

/*******************************************************************************
 *                               BUILD SECTION
 * ****************************************************************************/
 
var buildState='setupCanvas';
var currentMenu=0;
var menuShowing = 0;
var dragging=0;
var draggingPiece;
var piece = [];
var menuKeyPressed = 0;
var newAppletID=0;
var applet=[];
var printed = 0;
var appletDoneTest;
                        /*******************************************************
                        *                build() MAIN LOOP
                        * *****************************************************/
function build() {
    switch(buildState) { 
        
    case 'setupCanvas':
        setupCanvas();
        break;
        
    case 'dragging':
        //user is dragging a piece
        buildDragging();
        break;
    
    case 'menu':
        //user is selecting an item from the menu
        menu();
        break;
    }
    //scan for the control key to set buildState to 'menu'
    buildKeyScan();
    dragProtractor();
    drawBox();
}

//run at the beginning of build
function setupCanvas() {
    titleBack.destroy(true);
    helpButton.destroy(true);
    buildButton.destroy(true);
    titleText.destroy(true);
    loadButton.destroy(true);
    var background = game.add.sprite(0, 0, 'grid');
    defineMenu();
    buildState='';
}
        /***********************************************************************
         *                          MENU SECTION
         * ********************************************************************/
var menu0;
var menu1;
var menu2;
var menu3;
var menus;
var id=0;
function defineMenu() {
    menu0=[//PAGE 1
        game.add.sprite(50 , 50, 'menuClickBox'),
        game.add.sprite(300, 50, 'menuTextArea'),
        game.add.sprite(550, 50, 'menuRandomNumber'),
        game.add.sprite(50 , 300, 'menuRandomFraction'),
        game.add.sprite(300, 300, 'menuHundredChart'),
        game.add.sprite(550, 300, 'menuDoneButton'),
        ];

    menu1=[//PAGE 2 
        game.add.sprite(50 , 50, 'menuRandomDecimal'),
        game.add.sprite(300, 50, 'menuRandomMixedNumber'),
        game.add.sprite(550, 50, 'menuDraggableNumbers'),
        game.add.sprite(50 , 300, 'menuDragToBox'),
        game.add.sprite(300, 300, 'menuMultipleChoice'),
        game.add.sprite(550, 300, 'menuProtractorAngle'),
        ];

    menu2=[//PAGE 3 
        game.add.sprite(50 , 50, 'menuTallyBox'),
        game.add.sprite(300, 50, 'menuDraggableBaseTenBlocks'),
        game.add.sprite(550, 50, 'menuNumberEntry'),
        game.add.sprite(50 , 300, 'menuEvaluatedExpression'),
        game.add.sprite(300, 300, 'menuHiddenNumber'),
        game.add.sprite(550, 300, 'menuInequalityEntry'),
        ];
    
    menu3=[//PAGE 4 
        game.add.sprite(50 , 50, 'menuBarGraph'),
        game.add.sprite(300, 50, 'menuTTable'),
        game.add.sprite(550, 50, 'menuNumberLine'),
        game.add.sprite(50 , 300, 'menuButton'),
        game.add.sprite(300, 300, 'menuButton'),
        game.add.sprite(550, 300, 'menuButton'),
        ];
    
    menus=[menu0, menu1, menu2, menu3];
    menus.forEach(function(item){
        for (var i = 0; i < 6; i++)
        {
            item[i].alpha=0;
            item[i].inputEnabled='true';
            item[i].id = id;
            id++;
            item[i].events.onInputDown.add(onBuildMenuClick, item[i]);
            item[i].events.onInputUp.add(onFinishDrag, item[i]);
        }    
    });
}


//this is the run when the user presses SPACE
var arrowLeft;
var arrowRight;
function menu() {
    if (menuShowing == 0)
    {
        for (var i = 0; i < 6; i++)
        {
            menus[currentMenu][i].alpha=1;  //show
        }
        arrowLeft = game.add.sprite(300,550,'arrowLeft');
        arrowRight = game.add.sprite(500,550,'arrowRight');
        arrowLeft.anchor.setTo(0.5, 0.5); 
        arrowRight.anchor.setTo(0.5, 0.5); 
        arrowLeft.inputEnabled='true';
        arrowRight.inputEnabled='true';
        arrowLeft.events.onInputDown.add(leftMenuClick);
        arrowRight.events.onInputDown.add(rightMenuClick);
        menuShowing = 1;
    }
}

function leftMenuClick(){
    clearMenu(currentMenu);
    currentMenu--;
    if(currentMenu < 0)
    {
        currentMenu=menus.length-1;
    }
    redrawMenu(currentMenu);
}

function rightMenuClick(){
    clearMenu(currentMenu);
    currentMenu++;
    if(currentMenu > menus.length-1)
    {
        currentMenu=0;
    }
    redrawMenu(currentMenu);
}

function clearMenu() {
    for (var i = 0; i < 6; i++)
        {
            menus[currentMenu][i].alpha=0;
        }
}

function redrawMenu() {
    for (var i = 0; i < 6; i++)
        {
            menus[currentMenu][i].alpha=1;
            menus[currentMenu][i].bringToTop();
            
        }
}


//this is run when the user selects from the build menu
var newTextSize =  "40";
var newTextColor = "Black";
var newTextWidth = "300";
var newTextWrap = false;
var newBold = "";
function onBuildMenuClick(item, pointer) {
    if(menuShowing==1)
    {
        buildState = 'dragging';
        menuShowing=0;
        dragging=1;
        
        for (var i = 0; i < 6; i++)
        {
            menus[currentMenu][i].alpha=0;
        }
        arrowLeft.destroy(true);
        arrowRight.destroy(true);
        for (i=0; i< piece.length; i++)
        {
           game.world.bringToTop(piece[i]);
        }
        switch(this.id) {
            case 0: //clickbox
            buildClickBox();
            break;
            
            case 1:  //text area
            getTextAreaSettings(); //in mages.dialogs.js
            break;
            
            case 2: //random number
            getRandomNumberSettings(); //in mages.dialogs.js
            break;
            
            case 3:  //random fraction
            getRandomFractionSettings(); //in mages.dialogs.js
            break;
            
            case 4: //hundred chart
            buildHundredChart();
            break;
            
            case 5:  //done button
            buildDoneButton();
            break;
            
            case 6:  //random decimal
            getRandomDecimalSettings(); //in mages.dialogs.js
            break;
            
            case 7:  //random mixed number
            getRandomMixedNumberSettings(); //in mages.dialogs.js
            break;
            
            case 8:  //draggable numbers
            getDraggableNumbersSettings(); //in mages.dialogs.js
            break;
            
            case 9:  //dragTo box
            getDragToBoxSettings(); //in mages.dialogs.js
            break;
            
            case 10:  //multiple choice
            getMultipleChoiceTypeSetting(); //in mages.dialogs.js
            break;
            
            case 11:  //protractor and random angle
            getProtractorAngleSetting(); //in mages.dialogs.js
            //buildProtractorAngle();
            break;
            
            case 12:  //tally
            getTallySettings(); //in mages.dialogs.js
            break;
            
            case 13:  //base ten blocks
            var newObject = JSON.parse(JSON.stringify({    
                "startX":400, 
                "startY":300 , 
                "dragX":575 , 
                "dragY":300 , 
                "dragWidth":400, 
                "dragHeight":500
                }));
            buildBaseTenBlocks(newObject); //in mages.dialogs.js
            break;
            
            case 14:  //numberEntry
            getNumberEntrySettings() //in mages.dialogs.js
            break;
            
            case 15:  //evaluated expression
            getEvaluatedExpressionSettings() //in mages.dialogs.js
            break;
            
            case 16:  //hidden number
            getHiddenNumberSettings() //in mages.dialogs.js
            break;
            
            case 17:  //inequality entry
            getInequalityEntrySettings() //in mages.dialogs.js
            break;
            
            case 18:  //bar graph
            getBarGraphSettings() //in mages.dialogs.js
            break;
            
            case 19:  //t-table
            gettTableSettings() //in mages.dialogs.js
            break;
            
            case 20:  //number line
            getNumberLineSettings() //in mages.dialogs.js
            break;
            
        }
        if(state != 'prompt')
        {
            adjustNewPiece();
        }
        
    }
}


//common attributes for most pieces
function adjustNewPiece() {
    draggingPiece = piece[piece.length-1];
   //draggingPiece.id=this.id;
    //draggingPiece = piece[piece.length-1];
    draggingPiece.inputEnabled='true';
    
    if(piece[piece.length-1].grouped != 1)
    {
        if(piece[piece.length-1].type !=1  && piece[piece.length-1].type !=2 &&  piece[piece.length-1].type !=11 &&  piece[piece.length-1].type !='14b' &&  piece[piece.length-1].type !='17b' &&  piece[piece.length-1].type !=19) //text is achored left
        {
            draggingPiece.anchor.setTo(0.5, 0.5);     
        }
        
        draggingPiece.events.onInputDown.add(buildRedragPiece, draggingPiece);
        draggingPiece.events.onInputUp.add(onFinishDrag, draggingPiece);
    }
}

        /***********************************************************************
         *                  BUILD DRAG AND DROP BEHAVIOR
         * ********************************************************************/
function buildDragging() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
    {//smooth dragging
        draggingPiece.x=game.input.x;
        draggingPiece.y=game.input.y;
    } else
    {//snap to grid
        draggingPiece.x=Math.round(game.input.x/gridSize)*gridSize;
        draggingPiece.y=Math.round(game.input.y/gridSize)*gridSize;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.D)) 
    {//delete the piece
        draggingPiece.destroy(true);
        draggingPiece.deleted=true;
    }
}

function onFinishDrag(item, pointer) {
    buildState = '';
    dragging=0;
    printed=0; //you can print again
    if(item.type == 11) {
        vertexX=item.x;
        vertexY=item.y;
    }
}

function buildRedragPiece(item, pointer){
    draggingPiece = item;
    buildState = 'dragging';
    dragging=1;
}

//group pieces have to register their parent as the dragging pieces
function buildGroupPieceClick(item) {
    draggingPiece = piece[item.ParentPosition];
    buildState = 'dragging';
    dragging=1;
}

        /***********************************************************************
         *                           BUILD KEYSCAN
         * ********************************************************************/
function buildKeyScan() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {//open the menu
        if(dragging==0  && menuKeyPressed ==0)
        {
            for (var i = 0; i < 6; i++)
            {
                menus[currentMenu][i].alpha=1;
            }
            for (var i = 0; i < 6; i++)
            {
                game.world.bringToTop(menus[currentMenu][i]); //menu above pieces
            }
            buildState= 'menu';
            menuKeyPressed=1;
        }
	} else
	{//close the menu
	    menuKeyPressed=0;
	    if(menuShowing==1) 
	    {
	        buildState = '';
	        menuShowing=0;
	        for (var i = 0; i < 6; i++)
                {
                   menus[currentMenu][i].alpha=0;  //hide
                }
            arrowLeft.destroy(true);
            arrowRight.destroy(true);
            for (i=0; i< piece.length; i++)
                {
                   game.world.bringToTop(piece[i]);  //pieces above menu
                }
            draggingPiece=0;
	    }
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.P))
	{//print the constructor codes
	    if(printed==0)
	    {
	        printed=1;
	        getPrintSettings();
	    }
	}
}

        /***********************************************************************
         *                  CONSTRUCTOR PRINTER
         * ********************************************************************/

//this prints the constructor codes to an alert window
function printPieces(newAppletID, appletDoneTest) {
    var printString = "";
    var openTag='';
    var closeTag = '<br>';
    var constructorString = "";

    for (var item=0; item< piece.length; item++)
    {
        if(!piece[item].deleted)
        {
            switch(piece[item].type) 
            {
                case 0: //clickbox
                var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y ,
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 1: //text area constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "text":encodeURIComponent(piece[item].text).replace(/'/g, "%27") ,
                        "newText":encodeURIComponent(piece[item].text).replace(/'/g, "%27") ,
                        "font":piece[item].font ,
                        "fontString":piece[item].fontString,
                        "fill":piece[item].fill ,
                        "wordWrap":piece[item].wordWrap ,
                        "wordWrapWidth":piece[item].wordWrapWidth ,
                        "alignment":piece[item].alignment
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 2: //random number constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "font":piece[item].fontString ,
                        "fontString":piece[item].fontString,
                        "fill":piece[item].fill ,
                        "randomCeiling":piece[item].randomCeiling,
                        "randomFloor":piece[item].randomFloor,
                        "draggable": piece[item].draggable
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 3: //random fraction constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "font":piece[item].fontString ,
                        "fontString":piece[item].fontString,
                        "fill":piece[item].fill ,
                        "randomCeiling":piece[item].randomCeiling,
                        "randomFloor":piece[item].randomFloor,
                        "numeratorRandomCeiling":piece[item].numeratorRandomCeiling,
                        "numeratorRandomFloor":piece[item].numeratorRandomFloor,
                        "denominatorRandomCeiling":piece[item].denominatorRandomCeiling,
                        "denominatorRandomFloor":piece[item].denominatorRandomFloor,
                        "size":piece[item].size,
                        "draggable": piece[item].draggable
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 4: //hundredChart
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 5: //doneButton
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;     
                    break;
                    
                case 6: //random decimal constructor
                //(appletID, type, startX, startY, font, fill, randomCeiling, randomFloor, randomDigits) {
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "font":piece[item].fontString ,
                        "fontString":piece[item].fontString,
                        "fill":piece[item].fill ,
                        "randomCeiling":piece[item].randomCeiling,
                        "randomFloor":piece[item].randomFloor,
                        "randomDigits":piece[item].randomDigits,
                        "draggable": piece[item].draggable
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                
                case 7: //random mixed number constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "font":piece[item].fontString ,
                        "fontString":piece[item].fontString,
                        "fill":piece[item].fill ,
                        "wholeNumberRandomCeiling":piece[item].wholeNumberRandomCeiling,
                        "wholeNumberRandomFloor":piece[item].wholeNumberRandomFloor,
                        "numeratorRandomCeiling":piece[item].numeratorRandomCeiling,
                        "numeratorRandomFloor":piece[item].numeratorRandomFloor,
                        "denominatorRandomCeiling":piece[item].denominatorRandomCeiling,
                        "denominatorRandomFloor":piece[item].denominatorRandomFloor,
                        "size":piece[item].size,
                        "draggable": piece[item].draggable
                        });
                   constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                
                case 8: //draggable number constructor
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "orientation":piece[item].orientation ,
                        "clonable":piece[item].clonable,
                        "fill":piece[item].fill ,
                        "size":piece[item].size 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                
                case 9: //dragTo Box
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "userScaleX":piece[item].userScaleX ,
                        "userScaleY":piece[item].userScaleY 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                
                case 10: //multiple choice
                    if(piece[item].multiType==0)
                    { 
                        var newObject = JSON.stringify({    
                            "appletID": newAppletID, 
                            "type": piece[item].type, 
                            "startX":piece[item].x , 
                            "startY":piece[item].y , 
                            "correct":piece[item].correct ,
                            "incorrect1":piece[item].incorrect1,
                            "incorrect2":piece[item].incorrect2 ,
                            "incorrect3":piece[item].incorrect3,
                            "multipleChoiceFontSize":piece[item].multipleChoiceFontSize,
                            "spaceX":piece[item].spaceX,
                            "spaceY":piece[item].spaceY
                            });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                     break;
                    }
                    break;
                        
                case 11: //protractor and angle
                    if(piece[item].protractor!=1) {
                        var newObject = JSON.stringify({    
                            "appletID": newAppletID, 
                            "type": piece[item].type, 
                            "angleX":piece[item].x , 
                            "angleY":piece[item].y , 
                            "lowerAngle":piece[item].lowerAngle ,
                            "upperAngle":piece[item].upperAngle,
                            "protractorX":piece[item].protractorX ,
                            "protractorY":piece[item].protractorY
                            });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    }
                    break;
                    
                case 12: //tally box
                //(appletID, type, startX, startY, initialValue) {
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "initialValue":piece[item].initialValue
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 13: //clonable base ten blocks
                //(appletID, type, startX, startY, dragX, dragY, dragWidth, dragHeight) {
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "dragX":piece[item-1].x , 
                        "dragY":piece[item-1].y , 
                        "dragWidth":baseTenDragTo.width, 
                        "dragHeight":baseTenDragTo.height
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 14: //number entry (numberEntryX, numberEntryY, orientation, displayX, displayY,displayDigits)
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "numberEntryX":piece[item].x , 
                        "numberEntryY":piece[item].y , 
                        "orientation":piece[item].orientation , 
                        "displayX":piece[item+1].x, 
                        "displayY":piece[item+1].y, 
                        "displayDigits":piece[item].displayDigits
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 15: //EvaluatedExpression
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "expression":  fixedEncodeURIComponent(piece[item].expression),
                        "font":piece[item].fontString, 
                        "fill":piece[item].fill, 
                        "wordWrap":piece[item].wordWrap, 
                        "wordWrapWidth":piece[item].wordWrapWidth, 
                        "align":piece[item].align ,
                        "draggable": piece[item].draggable
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 16: //HiddenNumberConstructor(appletID, type, expression)
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID,
                        "type": piece[item].type, 
                        "expression": fixedEncodeURIComponent(piece[item].expression)
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 17: //InequalityEntryConstructor(appletID, type,inequalityEntryX, inequalityEntryY, displayX, displayY)
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "inequalityEntryX":piece[item].x , 
                        "inequalityEntryY":piece[item].y ,
                        "displayX":piece[item+1].x , 
                        "displayY":piece[item+1].y 
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 18: //BarGraphConstructor(appletID, type, title, min, max, interval, numberLabel, numberedAxis, itemList, itemLabel, itemValueList, startX, startY)
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x , 
                        "startY":piece[item].y , 
                        "titleText":piece[item].titleText , 
                        "min":piece[item].min, 
                        "max":piece[item].max, 
                        "interval":piece[item].interval, 
                        "numberLabel":piece[item].numberLabel, 
                        "numberedAxis":piece[item].numberedAxis, 
                        "itemList":piece[item].itemList,
                        "itemLabel":piece[item].itemLabel, 
                        "itemValueList":piece[item].itemValueList
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 19: //TTableConstructor(appletID, type, wordLabel, wordList, expressionLabel, expressionList, startX, startY) 
                    for(var itemCounter  = 0; itemCounter < piece[item].expressionList.length ; itemCounter++) {
                            piece[item].expressionList[itemCounter] =fixedEncodeURIComponent(piece[item].expressionList[itemCounter]) 
                    }
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX": piece[item].x , 
                        "startY": piece[item].y , 
                        "wordLabel": piece[item].wordLabel , 
                        "wordList": piece[item].wordList, 
                        "expressionLabel": piece[item].expressionLabel, 
                        "expressionList": piece[item].expressionList
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 20: //Number Line
                    var newObject = JSON.stringify({  
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x,
                        "startY":piece[item].y,
                        "lineOrientation":piece[item].lineOrientation,
                        "lineLength":piece[item].lineLength ,
                        "min": piece[item].min,
                        "minLabel" : piece[item].minLabel , 
                        "max" : piece[item].max , 
                        "maxLabel" : piece[item].maxLabel , 
                        "interval" : piece[item].interval ,
                        "intervalLabel" : piece[item].intervalLabel , 
                        "subDivide" : piece[item].subDivide ,
                        "dotStartX" : piece[item+1].x , 
                        "dotStartY" : piece[item+1].y ,
                        "dotOrientation" : piece[item].dotOrientation , 
                        "dotNumber" : piece[item].dotNumber ,
                        "dotLabel" : piece[item].dotLabel , 
                        "dotSnapping" : piece[item].dotSnapping
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                
                case 21: //Texture Area
                console.log(piece[item].textureExpression)
                    var newObject = JSON.stringify({  
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "startX":piece[item].x,
                        "startY":piece[item].y,
                        "textureExpression": piece[item].textureExpression,
                        "number": piece[item].number ,
                        "draggable": piece[item].draggable
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
                    
                case 99: //DrawBoxConstructor(appletID, type, drawingBoxStartX, drawingBoxStartY, drawingBoxEndX , drawingBoxEndY) 
                    console.log("WRONG- " + piece[item])
                    var newObject = JSON.stringify({    
                        "appletID": newAppletID, 
                        "type": piece[item].type, 
                        "drawingBoxStartX":piece[item].x , 
                        "drawingBoxStartY":piece[item].y , 
                        "drawingBoxEndX": piece[item].drawingBoxEndX,
                        "drawingBoxEndY": piece[item].drawingBoxEndY
                        });
                    constructorString = getConstructorString(newObject);
                    printString = printString + openTag + constructorString + closeTag;
                    break;
            }   
            }
        }
    printString = printString.slice(0, - 5)
    constructorString="<br>SOLUTION: " + appletDoneTest + " ";
    printString = printString + openTag + constructorString + closeTag;  
    state="prompt";
    bootbox.alert({
        size: 'large',
        title: "Applet Constructor Code Output - Add to mages.applets.js",
        message: printString , //this is now possibly quite long
        callback: function(){ state="build"; }  //continue building
    });
}

function getConstructorString(newObject) {
    if (typeof newObject == "object") {
        var json = JSON.stringify(newObject);
    } else {
        var json = newObject;
    }
    return "              " + json + ",";
}

        /***********************************************************************
         *          PIECE CONSTRUCTORS AND FUNCTIONS
         * ********************************************************************/
var textureArea;
function buildTextureArea(item) {
    var newTexture = game.add.sprite(0 ,0 ,  eval(item.textureExpression) )
    var bmd = game.add.bitmapData(newTexture.width,newTexture.height);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,newTexture.width,newTexture.height);
    bmd.ctx.fillStyle = '#CCCCCC';
    bmd.ctx.fill();
    
    piece[piece.length] = game.add.sprite(0, 0 , bmd)

    //textureArea.push(piece[piece.length-1]);
    //lastTexture.clear()
    piece[piece.length-1].x=item.startX
    piece[piece.length-1].y=item.startY
    
    
    piece[piece.length-1].addChild(newTexture)
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, this);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, this);
    piece[piece.length-1].inputEnabled='true';
    console.log(item.textureExpression)
    piece[piece.length-1].textureExpression = item.textureExpression;
    piece[piece.length-1].type = item.type;
    piece[piece.length-1].draggable = item.draggable;
    if(state!='build')
    {
        piece[piece.length-1].number = eval(item.number);
    } else
    {
        piece[piece.length-1].number = item.number;
    }
    console.log(item.draggable)
    if(state!='build' && item.draggable == 1)
    {
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].dragOffsetX = 0
        piece[piece.length-1].dragDoneOffsetX = 0
        piece[piece.length-1].dragOffsetY = 0
        piece[piece.length-1].input.useHandCursor=true;
        piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
        piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
    }
    newTextureTemp.clear()
}

var newTextureTemp
function testTexture() {
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
   
    newGraphic.beginFill(0xFF0000, 1);
    newGraphic.drawCircle(90, 90, 180);
    newGraphic.beginFill(0xFFAAAA, 1);
    newGraphic.drawCircle(90, 90, 120);
    newGraphic.beginFill(0xFFDDDD, 1);
    newGraphic.drawCircle(90, 90, 60);
    newGraphic.moveTo(0,0)
    newGraphic.lineTo(180,180)
    newGraphic.moveTo(180,0)
    newGraphic.lineTo(0,180)
    newTextureTemp = newGraphic
    return newGraphic.generateTexture();
}

function drawClock(minutes) {
    var angle;
    var angleHour = (minutes/60-15)/12*360*Math.PI/180
    var angleMinute = (minutes%60-15)*6*Math.PI/180
    var newGraphic = game.add.graphics(0, 0);
    var returnGroup = game.add.group();
    newGraphic.lineStyle(2, 0x000000, 1);
    newGraphic.beginFill(0xDDDDDD, 1);
    newGraphic.drawCircle(90, 90, 200);
    for(var i = 0 ; i < 60 ; i++) {
        angle = i*6*Math.PI/180
        newGraphic.moveTo(90+( (i*6)%5==0 ? 90 : 95 )*Math.cos(angle),90+( (i*6)%5==0 ? 90 : 95 )*Math.sin(angle))
        newGraphic.lineTo(90+100*Math.cos(angle),90+100*Math.sin(angle))  
    } 
    newGraphic.moveTo(90,90)
    newGraphic.lineTo(90+90*Math.cos(angleMinute),90+90*Math.sin(angleMinute))
    newGraphic.moveTo(90,90)
    newGraphic.lineStyle(4, 0x000000, 1);
    newGraphic.lineTo(90+60*Math.cos(angleHour),90+60*Math.sin(angleHour))
    returnGroup.add(newGraphic)
    newTextureTemp = newGraphic
    
    var clockNumber = []
    for(i = 1 ; i < 13 ; i++) {
        angle = (i-3)*30*Math.PI/180
        clockNumber[clockNumber.length] = game.add.text(90+80*Math.cos(angle) , 90+80*Math.sin(angle) , i.toString(), {
            font: 20+"px Arial",
            fill: "black",
            align: 'center'}); 
        clockNumber[clockNumber.length-1].anchor.setTo(0.5,0.4)
        returnGroup.add(clockNumber[clockNumber.length-1])
    }
    var newAMPMLabel = game.add.text(155,170, (minutes>720 ? "PM" : "AM"), {
            font: 20+"px Arial",
            fill: "black",
            align: 'center'}); 
        returnGroup.add(newAMPMLabel)
        
    var returnTexture = returnGroup.generateTexture();
    for(i = 0 ; i < 12 ; i++) {
        clockNumber[i].destroy();
    }
    newAMPMLabel.destroy();
    return returnTexture;
}



var numberLine
function buildNumberLine(item) {
    piece[piece.length] = game.add.group();
    
    item.intervalSpacing = item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ))
    console.log(item.intervalSpacing)
    numberLine = piece[piece.length-1];
    numberLine.dotValue = new Array(7);
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
    if(item.lineOrientation == 'h')
    {
        newGraphic.moveTo(0, 0)
        newGraphic.lineTo(item.lineLength,0);
        newGraphic.moveTo(0, 0)
        for(var i = 0 ; i <= (item.max-item.min)/item.interval ; i++)
        {
            newGraphic.moveTo(i*item.lineLength/( (item.max-item.min) / item.interval),  7)
            newGraphic.lineTo(i*item.lineLength/( (item.max-item.min) / item.interval), -7)        
        }
        for(var i = 0 ; i < (item.max-item.min)/item.interval*item.subDivide ; i++)
        {
            newGraphic.moveTo(i*item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ) ),  3)
            newGraphic.lineTo(i*item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ) ), -3)        
        }    
    } else
    {
        newGraphic.moveTo(0, 0)
        newGraphic.lineTo(0,item.lineLength);
        newGraphic.moveTo(0, 0)
        for(var i = 0 ; i <= (item.max-item.min)/item.interval ; i++)
        {
            newGraphic.moveTo(7,  i*item.lineLength/( (item.max-item.min) / item.interval))
            newGraphic.lineTo(-7, i*item.lineLength/( (item.max-item.min) / item.interval))        
        }
        for(var i = 0 ; i < (item.max-item.min)/item.interval*item.subDivide ; i++)
        {
            newGraphic.moveTo(3,  i*item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ) ))
            newGraphic.lineTo(-3, i*item.lineLength/( (item.max-item.min) / (item.interval/item.subDivide ) ))        
        }     
    }
    console.log(item.max.toString().length)
    var labelFontSize
    if(item.max.toString().length > 3) {
        labelFontSize = 12
    } else
    {
        labelFontSize = 18
    }
    
    piece[piece.length-1].add(game.add.sprite( (item.lineOrientation == 'h' ?  0 : 10) , (item.lineOrientation == 'h' ?  -7 : 15) , newGraphic.generateTexture()) );
    newGraphic.clear();
    if(item.minLabel == true){
            newLabel = game.add.text(0, 20 , item.min.toString(), {
            font: labelFontSize+"px Arial",
            fill: "black",
            align: 'left'}); 
        piece[piece.length-1].add(newLabel);
        newLabel.draggable = 1;
        newLabel.anchor.setTo(0.5,0.5)    
    }
    
    
    if(item.intervalLabel == true) {
        for(var i = item.min + 1 ; i <= (item.max-item.min)/item.interval - 1 ; i++ )
        {
            newLabel = game.add.text((item.lineOrientation == 'h' ?  i*item.lineLength/( (item.max-item.min) / item.interval) : 0), (item.lineOrientation == 'h' ?  0 : i*item.lineLength/( (item.max-item.min) / item.interval))+20 , (i*item.interval).toString(), {
            font: labelFontSize+"px Arial",
            fill: "black",
            align: 'left'}); 
        piece[piece.length-1].add(newLabel);
        newLabel.draggable = 1;
        newLabel.anchor.setTo(0.5,0.5)
        }    
    }
    
    if(item.maxLabel == true){
        newLabel = game.add.text((item.lineOrientation == 'h' ? item.lineLength : 0), (item.lineOrientation == 'h' ? 20 : item.lineLength+20) , item.max.toString(), {
        font: labelFontSize+"px Arial",
        fill: "black",
        align: 'left'}); 
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    newLabel.anchor.setTo(0.5,0.5)
    }
    
    piece[piece.length-1].x = item.startX;
    piece[piece.length-1].y = item.startY;
    piece[piece.length-1].type='20a'
    
    piece[piece.length-1].forEach(function(pieceItem){
        pieceItem.inputEnabled='true';
        pieceItem.events.onInputDown.add(buildGroupPieceClick, this);
        pieceItem.events.onInputUp.add(onFinishDrag, draggingPiece);
        pieceItem.clicked=0;
        pieceItem.ParentPosition=piece.length-1;
    });
    
    
    var dotGraphic = [];
    var dotSprite = [];
    var dotColor = [0xFF0000 , 0xFFA500 , 0xFFFF00 , 0x008000 , 0x0000FF , 0x4B0082 , 0xEE82EE]
    if(item.staticDots == true)
    {
       for(var i = 0; i < item.dotExpressions.length ; i++) 
       {
            dotGraphic.push(game.add.graphics(0, 0) );
            dotGraphic[i].beginFill(dotColor[i], 1);
            dotGraphic[i].drawCircle(0, 0, item.lineLength/600*15);
            numberLine.dotValue[i] = eval(item.dotExpressions[i])
            if(item.lineOrientation == 'h')
            {
                dotSprite.push( game.add.sprite( numberLine.dotValue[i] / item.interval*item.lineLength / ( (item.max-item.min)/item.interval ) - item.lineLength/120 , -item.lineLength/120 , dotGraphic[i].generateTexture() ) ); 
            } else
            {
                dotSprite.push(game.add.sprite(15,  numberLine.dotValue[i] / item.interval*item.lineLength / ( (item.max-item.min)/item.interval ) +12 , dotGraphic[i].generateTexture()) ); 
            }
            dotGraphic[i].clear(); 
            dotSprite[i].number = i
            piece[piece.length-1].addChild(dotSprite[i])
       }
       piece[piece.length] = null
    } else
    { //draggable dots
        if(item.dotNumber > 7) { item.dotNumber = 7 }
        
        for(var i = 0; i < item.dotNumber ; i++) {
            dotGraphic.push(game.add.graphics(0, 0) );
            dotGraphic[i].beginFill(dotColor[i], 1);
            dotGraphic[i].drawCircle(0, 0, item.lineLength/600*15);
            dotSprite.push(game.add.sprite(0, 0, dotGraphic[i].generateTexture()) );
            dotGraphic[i].clear();
            if(item.dotLabel == true){
                newLabel = game.add.text((item.lineOrientation == 'h' ? 0 : 20), (item.lineOrientation == 'h' ? -25 : -5) , ['A','B','C','D','E','F','G'][i], {
                    font: "18px Arial",
                    fill: "black",
                    align: 'center'}); 
                dotSprite[i].addChild(newLabel)
            }
            dotSprite[i].x = (item.dotOrientation == 'h' ? i*35 : 0)
            dotSprite[i].y = (item.dotOrientation == 'v' ? i*40 : 0)
            dotSprite[i].number = i
            numberLine.dotValue[i] = null
        }
     
        piece[piece.length] = game.add.group();
        
        dotSprite.forEach(function(spriteItem){
            spriteItem.inputEnabled='true';
            if(state == 'build')
            {   
                piece[piece.length-1].add(spriteItem);
                spriteItem.events.onInputDown.add(buildGroupPieceClick, this);
                spriteItem.events.onInputUp.add(onFinishDrag, draggingPiece);
                spriteItem.clicked=0;
                spriteItem.ParentPosition=piece.length-1;
            } else
            {
                spriteItem.x = spriteItem.x+item.dotStartX
                spriteItem.y = spriteItem.y+item.dotStartY
                spriteItem.events.onInputDown.add(numberLineDotClick, this);
                spriteItem.events.onInputUp.add(onFinishDragNumberLineDot, draggingPiece);
                spriteItem.input.useHandCursor=true; 
                spriteItem.dotSnapping = item.dotSnapping 
                spriteItem.lineLength = item.lineLength 
                spriteItem.interval = item.interval
                spriteItem.subDivide = item.subDivide
                spriteItem.intervalSpacing = item.intervalSpacing
                spriteItem.min = item.min
                spriteItem.max = item.max
                spriteItem.lineOrientation = item.lineOrientation;
            }
        });   
    }
    
    
    
    if(state == 'build') {
        if(piece[piece.length-1] != null)
        {
            piece[piece.length-1].x=item.dotStartX
            piece[piece.length-1].y=item.dotStartY
            piece[piece.length-1].type='20a'    
            piece[piece.length-2].dotStartX=piece[piece.length-1].x
            piece[piece.length-2].dotStartY=piece[piece.length-1].y
        }
        
        piece[piece.length-2].type=20
        piece[piece.length-2].startX=piece[piece.length-2].x
        piece[piece.length-2].startY=piece[piece.length-2].y
        piece[piece.length-2].lineOrientation=item.lineOrientation
        piece[piece.length-2].lineLength=item.lineLength
        piece[piece.length-2].min=item.min
        piece[piece.length-2].minLabel=item.minLabel
        piece[piece.length-2].max=item.max
        piece[piece.length-2].maxLabel=item.maxLabel
        piece[piece.length-2].interval=item.interval
        piece[piece.length-2].intervalLabel=item.intervalLabel
        piece[piece.length-2].subDivide=item.subDivide
        piece[piece.length-2].dotOrientation=item.dotOrientation
        piece[piece.length-2].dotNumber=item.dotNumber
        piece[piece.length-2].dotLabel=item.dotLabel
        piece[piece.length-2].dotSnapping=item.dotSnapping    
    }
}

var draggingNumberLineDot = 0
var draggingDotHandle
function numberLineDotClick (item) {
    draggingNumberLineDot=1;
    game.world.bringToTop(item);
    draggingDotHandle = item;
}

function onFinishDragNumberLineDot(item) {
    draggingNumberLineDot=0;
    if(draggingDotHandle.lineOrientation == 'h')
        {
            if( draggingDotHandle.x+draggingDotHandle.lineLength/600*5 >= numberLine.x && draggingDotHandle.x+draggingDotHandle.lineLength/600*5 <= numberLine.x+numberLine.width && draggingDotHandle.y == numberLine.y-4 )
            {
            } else
            {
                numberLine.dotValue[draggingDotHandle.number]= null
            }    
        } else
        {
            if( draggingDotHandle.y+draggingDotHandle.lineLength/600*5 >= numberLine.y && draggingDotHandle.y+draggingDotHandle.lineLength/600*5 <= numberLine.y+numberLine.height && draggingDotHandle.x == numberLine.x+14 )
            {
            } else
            {
                numberLine.dotValue[draggingDotHandle.number]= null
            }     
        }
}

function dragNumberLineDot(item) {
    if(draggingNumberLineDot==1)
    {

        draggingDotHandle.x=game.input.x;
        draggingDotHandle.y=game.input.y;
        if(draggingDotHandle.lineOrientation == 'h')
        {
            if(draggingDotHandle.x+5 > numberLine.x && draggingDotHandle.x-5 < numberLine.x+numberLine.width && Math.abs(draggingDotHandle.y+4-numberLine.y) < 20) 
            {//I'm close to a vertex.  Snap to it.
                draggingDotHandle.y=numberLine.y-4;
    
                if(draggingDotHandle.dotSnapping == 1) {
                   draggingDotHandle.x = parseInt(draggingDotHandle.x/draggingDotHandle.intervalSpacing)*draggingDotHandle.intervalSpacing+(numberLine.x%draggingDotHandle.intervalSpacing)-5
                   numberLine.dotValue[draggingDotHandle.number] = (draggingDotHandle.x+5 - numberLine.x) / draggingDotHandle.intervalSpacing * draggingDotHandle.interval/draggingDotHandle.subDivide
                } else
                {
                    numberLine.dotValue[draggingDotHandle.number] =  ( (draggingDotHandle.x+draggingDotHandle.lineLength/600*5 - numberLine.x) /  draggingDotHandle.lineLength ) * draggingDotHandle.max-draggingDotHandle.min
                }
                
            }   
        } else
        {
            if(draggingDotHandle.y+12 > numberLine.y && draggingDotHandle.y+12 < numberLine.y+numberLine.height && Math.abs(draggingDotHandle.x-14-numberLine.x) < 20) 
            {//I'm close to a vertex.  Snap to it.
                draggingDotHandle.x=numberLine.x+14;
                if(draggingDotHandle.dotSnapping == true) {
                   draggingDotHandle.y = parseInt(draggingDotHandle.y/draggingDotHandle.intervalSpacing)*draggingDotHandle.intervalSpacing+(numberLine.y%draggingDotHandle.intervalSpacing)+12
                   numberLine.dotValue[draggingDotHandle.number] = (draggingDotHandle.y-12 - numberLine.y) / draggingDotHandle.intervalSpacing * draggingDotHandle.interval/draggingDotHandle.subDivide
                } else
                {
                    numberLine.dotValue[draggingDotHandle.number] =  ( (draggingDotHandle.x+draggingDotHandle.lineLength/600*5 - numberLine.x) /  draggingDotHandle.lineLength ) * draggingDotHandle.max-draggingDotHandle.min
                }
            }
        }
    }
}

var totalBoxes=0;
var randomNumber = [];
var evaluatedExpression = [];
var randomDecimal = [];
var randomNumerator = [];
var randomDenominator = [];
var randomMixedNumber = [];
var multipleChoiceSelected = null;

//BAR GRAPH
function BarGraphConstructor(appletID, type, titleText, min, max, interval, numberLabel, numberedAxis, itemList, itemLabel, itemValueList, startX, startY) {
    this.appletID = appletID;
    this.type = type;
    this.titleText = titleText;
    this.min = min;
    this.max = max;
    this.interval = interval;
    this.numberLabel = numberLabel;
    this.numberedAxis = numberedAxis;
    this.itemList = itemList;
    this.itemLabel = itemLabel;
    this.itemValueList = itemValueList;
    this.startX = startX;
    this.startY = startY;
    this.topValue = topBarGraphValue;
    this.topSpot = topBarGraphSpot;
    this.totalValue = totalBarGraphValue;
}

var barGraph;
function buildBarGraph(item) {
    console.log(item.itemList)
    item.topValue = topBarGraphValue;
    item.topSpot = topBarGraphSpot;
    item.totalValue = totalBarGraphValue;
    min = item.min;
    max = item.max;
    piece[piece.length] = game.add.group();
    barGraph = item;
    
    var chartBottom = Math.floor( (item.max-item.min)/item.interval ) * 30
    //build number and item list and labels
    var newLabel;
    for(var i = item.min ; i <= item.max ; i = i + item.interval )
    {
        newLabel = game.add.text(75, chartBottom-(i/item.interval)*30, i.toString(), {
        font: "18px Arial",
        fill: "black",
        align: 'left'}); 
        piece[piece.length-1].add(newLabel);
        newLabel.draggable = 1;
        newLabel.anchor.setTo(1,0)
    }
    var itemX = [0]
    for(var i = 0 ; i < item.itemList.length ; i++ )
    {
        newLabel = game.add.text(itemX[i]+90, chartBottom+20, item.itemList[i].toString(), {
        font: "18px Arial",
        fill: "black",
        align: 'left'}); 
        piece[piece.length-1].add(newLabel);
        itemX.push(itemX[i]+newLabel.width+20);
        newLabel.draggable = 1;
    }
    //axis labels
    newLabel = game.add.text(70+piece[piece.length-1].width/2, chartBottom+40, item.itemLabel.toString(), {
        font: "24px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.setTo(0.5,0)
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    
    newLabel = game.add.text(30, chartBottom+50 - piece[piece.length-1].height/2 , item.numberLabel.toString(), {
        font: "24px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.set(0.5);
    newLabel.angle = 270
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;

    //title
    newLabel = game.add.text(60+piece[piece.length-1].width/2, chartBottom+40 - piece[piece.length-1].height , item.titleText.toString(), {
        font: "30px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.set(0.5);
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    
    //box
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.beginFill(0xD0D0D0);
    newGraphic.lineStyle(2, 0x000000, 1);
    newGraphic.drawRect(80, -12, piece[piece.length-1].width-50, chartBottom+24);
    newGraphic.endFill();
    
    //lines
    for(var i = item.min+item.interval ; i <= item.max ; i = i + item.interval )
    {
        newGraphic.moveTo(80, (chartBottom-(i/item.interval)*30)+10)
        newGraphic.lineTo(piece[piece.length-1].width+30,(chartBottom-(i/item.interval)*30)+10);
    }
    
    //draw bars
    item.value = [];
    for(var i = 0 ; i < item.itemValueList.length ; i++)
    {
        item.value.push(eval(item.itemValueList[i]));
    }
    for(var i = 0 ; i < item.itemList.length ; i++ )
    {//redo itemValueList to be itemEvaluatedList
        newGraphic.beginFill(0x707070);
        newGraphic.lineStyle(2, 0x000000, 1);
        newGraphic.drawRect(itemX[i]+83+((itemX[i+1]-itemX[i]-20)/2), 10+((item.max-item.value[i])/item.interval)*30, 15, ((item.value[i]-item.min)/item.interval)*30+2);
    }
    piece[piece.length-1].add(newGraphic);
    
    piece[piece.length-1].forEach(function(item) {
        if(item.draggable == 1)
        {
            item.inputEnabled='true';
            item.events.onInputDown.add(buildGroupPieceClick, this);
            item.events.onInputUp.add(onFinishDrag, draggingPiece);
            item.clicked=0;
            item.ParentPosition=piece.length-1;   
        }
    });
    piece[piece.length-1].x=item.startX;
    piece[piece.length-1].y=item.startY;
    piece[piece.length-1].startX = item.startX;
    piece[piece.length-1].startY = item.startY;
    piece[piece.length-1].type = 18;
    piece[piece.length-1].titleText = item.titleText;
    piece[piece.length-1].min = item.min;
    piece[piece.length-1].max = item.max;
    piece[piece.length-1].interval = item.interval;
    piece[piece.length-1].numberLabel = item.numberLabel;
    piece[piece.length-1].numberedAxis = item.numberedAxis;
    piece[piece.length-1].itemList = item.itemList;
    piece[piece.length-1].itemLabel = item.itemLabel;
    piece[piece.length-1].itemValueList = item.itemValueList;
}

function topBarGraphValue() {
    var topValue = 0;
    for(var i = 0 ; i < this.itemValueList.length ; i++ )
    {
        if(this.value[i] > topValue) 
        {
            topValue = this.value[i];
        }
    }
    return topValue;
}

function topBarGraphSpot() {
    var topValue = 0;
    var topSpot = 0
    for(var i = 0 ; i < this.itemValueList.length ; i++ )
    {
        if(this.value[i] > topValue) 
        {
            topValue = this.value[i]
            topSpot = i;
        }
    }
    return topSpot;
}

function totalBarGraphValue() {
    var returnValue = 0;
    
    for(var i = 0 ; i < this.value.length ; i++)
    {
        returnValue += this.value[i];   
    }
    return returnValue;
}

//T-TABLE
function TTableConstructor(appletID, type, wordLabel, wordList, expressionLabel, expressionList, startX, startY) {
    this.appletID = appletID;
    this.type = type;
    this.wordLabel=wordLabel;
    this.wordList=wordList;
    this.expressionLabel=expressionLabel;
    this.expressionList=expressionList;
    this.startX = startX;
    this.startY = startY;
}

var tTable;
function buildtTable(item) {
    
    for(var i = 0 ; i < item.expressionList.length ; i ++)
    {
        item.expressionList[i] = decodeURIComponent(item.expressionList[i])
        console.log(item.expressionList[i].toString())
    }
    //item.newText=decodeURIComponent(item.expressionList);
    
    piece[piece.length] = game.add.group();
    tTable = item;
    var chartBottom = item.wordList.length * 40
    var maxWordLength = item.wordLabel.length
    for (var i = 0 ; i < item.wordList.length; i++)
    {
        if(item.wordList[i].length > maxWordLength)
        {
            maxWordLength=item.wordList[i].length 
        }
    }
    
    
    
    //box
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.beginFill(0xD0D0D0);
    newGraphic.lineStyle(2, 0x000000, 1);
    console.log(item.expressionLabel)
    newGraphic.drawRect(10,0, 10+maxWordLength*5/2+170+maxWordLength*5+item.expressionLabel.length*5/2+item.expressionLabel.length*5+10, (item.wordList.length+1)*40);
    newGraphic.endFill();
    
    for(var i = 0 ; i< item.wordList.length ; i ++)
    {
        newGraphic.moveTo(10, (i+1)*40)    
        newGraphic.lineTo(20+(maxWordLength*5/2)+170+maxWordLength*5+item.expressionLabel.length*5/2+item.expressionLabel.length*5+10, (i+1)*40)
    }
    newGraphic.moveTo(maxWordLength*5/2+100+maxWordLength*5,0)
    newGraphic.lineTo(maxWordLength*5/2+100+maxWordLength*5, (item.wordList.length+1)*40)
    
    
    
    var graphicSprite = game.add.sprite(0, 0, newGraphic.generateTexture());
    newGraphic.clear();
    piece[piece.length-1].add(graphicSprite);
    
    
    
    //build expression and word list and titles
    var newLabel;
    for(var i = 0 ; i < item.wordList.length ; i++ )
    {
        newLabel = game.add.text(maxWordLength*5/2+75, i*40+60, item.wordList[i], {
        font: "18px Arial",
        fill: "black",
        align: 'center'}); 
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    newLabel.anchor.setTo(0.5,0.5)
    }
    item.value = [];
    //
    for(var i = 0 ; i < item.wordList.length ; i++ )
    {
        item.value.push(eval(item.expressionList[i]))
        newLabel = game.add.text(maxWordLength*5/2+maxWordLength*5+160+item.expressionLabel.length*5/2, i*40+60, item.value[i].toString(), {
        font: "18px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.draggable = 1;
    newLabel.anchor.setTo(0.5,0.5)
    piece[piece.length-1].add(newLabel);
    }
    //column labels
    newLabel = game.add.text(maxWordLength*5/2+75, 20, item.wordLabel, {
        font: "24px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.setTo(0.5,0.5)
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    
    newLabel = game.add.text(maxWordLength*5/2+maxWordLength*5+160+item.expressionLabel.length*5/2, 20, item.expressionLabel,{
        font: "24px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.setTo(0.5,0.5)
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    
    piece[piece.length-1].x=item.startX;
    piece[piece.length-1].y=item.startY;
    piece[piece.length-1].startX = item.startX;
    piece[piece.length-1].startY = item.startY;
    piece[piece.length-1].type = 19;
    piece[piece.length-1].wordLabel = item.wordLabel;
    piece[piece.length-1].wordList  = item.wordList;
    piece[piece.length-1].expressionLabel  = item.expressionLabel;
    piece[piece.length-1].expressionList  = item.expressionList;
    
    piece[piece.length-1].forEach(function(item) {
            item.inputEnabled='true';
            item.events.onInputDown.add(buildGroupPieceClick, this);
            item.events.onInputUp.add(onFinishDrag, draggingPiece);
            item.clicked=0;
            item.ParentPosition=piece.length-1;   
    });
}

//PROTRACTOR ANGLE
function ProtractorAngleConstructor(appletID, type, startX, startY, lowerAngle, upperAngle, protractorX, protractorY) {
    this.appletID = appletID;
    this.type=type;
    this.angleX= startX;
    this.angleY = startY;
    this.lowerAngle = lowerAngle;
    this.upperAngle = upperAngle;
    this.protractorX = protractorX;
    this.protractorY = protractorY;
    this.startDragging = startDraggingProtractor;
    this.stopDragging = stopDraggingProtractor;
    this.drag = dragProtractor;
}

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
    var oldLowerAngle=item.lowerAngle;
    item.lowerAngle = item.lowerAngle * Math.PI / 180;
    var lowerEndX   = legLength * Math.sin(item.lowerAngle);
    var lowerEndY   = legLength * Math.cos(item.lowerAngle);
    
    item.upperAngleExpression = item.upperAngle;
    item.upperAngle=eval(item.upperAngle)
    var oldUpperAngle=item.upperAngle;
    item.upperAngle = item.upperAngle * Math.PI / 180;
    var upperEndX   = legLength * Math.sin(item.upperAngle);
    var upperEndY   = legLength * Math.cos(item.upperAngle);
    //add the angle
    angleGraphic = drawAngle(legLength, lowerEndX, lowerEndY, upperEndX, upperEndY) ;
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

function drawAngle(legLength, lowerEndX, lowerEndY, upperEndX, upperEndY) {
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


//DRAW BOX
function DrawBoxConstructor(appletID, type, drawingBoxStartX, drawingBoxStartY, drawingBoxEndX , drawingBoxEndY) { 
    this.appletID = appletID;
    this.type=type;
    this.drawingBoxStartX=drawingBoxStartX;
    this.drawingBoxStartY=drawingBoxStartY;
    this.drawingBoxEndX=drawingBoxEndX;
    this.drawingBoxEndY=drawingBoxEndY;
}

var drawingBox = 0;
    var drawingBoxStartX;
    var drawingBoxStartY;
    var drawingBoxEndX;
    var drawingBoxEndY;
    var drawingBoxGraphic
function drawBox() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.B))
    {
        if(drawingBox == 0)
        {
            drawingBox = 1;
            drawingBoxStartX = game.input.x;  
            drawingBoxStartY = game.input.y;
            drawingBoxGraphic = game.add.graphics(0, 0);
        } else
        {
            drawingBoxEndX = game.input.x;
            drawingBoxEndY = game.input.y;
            
            drawingBoxGraphic.clear();
            drawingBoxGraphic.lineStyle(2, 0x000000, 1);
            drawingBoxGraphic.drawRect(drawingBoxStartX, drawingBoxStartY, drawingBoxEndX-drawingBoxStartX, drawingBoxEndY-drawingBoxStartY);
        }   
    } else
    {
        if(drawingBox==1)
        {//drawingBoxGraphic.generateTexture()
            drawingBox = 0;
            drawingBoxGraphic.clear();
            drawingBoxGraphic.lineStyle(2, 0x000000, 1);
            drawingBoxGraphic.drawRect(drawingBoxStartX, drawingBoxStartY, drawingBoxEndX-drawingBoxStartX, drawingBoxEndY-drawingBoxStartY);
            piece[piece.length] = game.add.sprite(drawingBoxStartX,drawingBoxStartY,drawingBoxGraphic.generateTexture());
            drawingBoxGraphic.clear();
            piece[piece.length-1].inputEnabled='true';
            piece[piece.length-1].input.useHandCursor=true; 
            piece[piece.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
            piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece); 
            piece[piece.length-1].type=99;
            piece[piece.length-1].drawingBoxStartX=drawingBoxStartX;
            piece[piece.length-1].drawingBoxStartY=drawingBoxStartY;
            piece[piece.length-1].drawingBoxEndX=drawingBoxEndX;
            piece[piece.length-1].drawingBoxEndY=drawingBoxEndY;
            piece[piece.length-1].drawingBoxEndX=(piece[piece.length-1].x+Math.abs(piece[piece.length-1].drawingBoxStartX-piece[piece.length-1].drawingBoxEndX)) , 
            piece[piece.length-1].drawingBoxEndY=Math.abs(piece[piece.length-1].drawingBoxStartY-piece[piece.length-1].drawingBoxEndY)
        }
    }
}

function buildDrawBox(item) {
    drawingBoxGraphic = game.add.graphics(0, 0);
    drawingBoxGraphic.lineStyle(2, 0x000000, 1);
    drawingBoxGraphic.drawRect(item.drawingBoxStartX, item.drawingBoxStartY, item.drawingBoxEndX-item.drawingBoxStartX, item.drawingBoxEndY-item.drawingBoxStartY);
    piece[piece.length] = game.add.sprite(drawingBoxStartX,drawingBoxStartY,drawingBoxGraphic.generateTexture());
    drawingBoxGraphic.clear();
    piece[piece.length-1].type=99;
    piece[piece.length-1].drawingBoxStartX=item.drawingBoxStartX
    piece[piece.length-1].drawingBoxStartY=item.drawingBoxStartY
    piece[piece.length-1].drawingBoxEndX=item.drawingBoxEndX;
    piece[piece.length-1].drawingBoxEndY=item.drawingBoxEndY;
    piece[piece.length-1].x=item.drawingBoxStartX
    piece[piece.length-1].y=item.drawingBoxStartY

    
}



//NUMBER ENTRY
function NumberEntryConstructor(appletID, type, numberEntryX, numberEntryY, orientation, displayX, displayY,displayDigits) {
    this.appletID = appletID;
    this.type=type;
    this.numberEntryX= numberEntryX;
    this.numberEntryY = numberEntryY;
    this.orientation = orientation;
    this.displayX = displayX;
    this.displayY = displayY;
    this.displayDigits = displayDigits;
}

var numberEntryValue=0;
var numberEntryPanelText;
function buildNumberEntry(item) {
    
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
    for(var i = 0; i < 11; i++)
    {
        if(item.orientation == "h")
        {                           
            piece[piece.length-1].create(i*40,0,'numberEntryButton').value=i;
            pieceLabel = new Phaser.Text(game, i*40+10, 0, (i< 10 ? i.toString() : "X" ), {
            font: "36px Arial",
            fill: "black",
            align: "right"});
            pieceLabel.value=i;
            piece[piece.length-1].add(pieceLabel);
        } else
        {
            piece[piece.length-1].create(0,i*40+10,'numberEntryButton').value=i;
            pieceLabel = new Phaser.Text(game, 10, i*40+10, (i< 10 ? i.toString() : "X" ), {
            font: "36px Arial",
            fill: "black",
            align: "right"});
            pieceLabel.value=i;
            piece[piece.length-1].add(pieceLabel);
        }
        
    }
    
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=14;
    piece[piece.length-1].orientation = item.orientation;
    piece[piece.length-1].numberEntryX = item.numberEntryX;
    piece[piece.length-1].numberEntryY = item.numberEntryY;
    piece[piece.length-1].displayX = item.displayX;
    piece[piece.length-1].displayY = item.displayY;
    piece[piece.length-1].displayDigits = item.displayDigits;
    
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
    game.add.sprite(0,newTextSize/40*-4,'fractionBar');
    var panelGraphic = game.add.graphics(0, 0);
    panelGraphic.beginFill(0xFFFFFF);
    panelGraphic.drawRect(0, 0, item.displayDigits*40 + Math.floor((item.displayDigits-1)/3)*20, 60); 
    panelGraphic.endFill();
    piece[piece.length] = game.add.sprite(item.displayX,item.displayY,panelGraphic.generateTexture());
    panelGraphic.clear();
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type='14b';
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
    
    if(state!='build')
    {
        piece[piece.length-2].x=item.numberEntryX;
        piece[piece.length-2].y=item.numberEntryY;
        piece[piece.length-2].forEach(function(subItem) { //number entry button behavior
            subItem.events.onInputDown.add(numberEntryClick, this);
            subItem.displayDigits = item.displayDigits
            subItem.displayX = item.displayX;
            //item.events.onInputUp.add(numberEntryFinishClick, this);  
            subItem.ParentPosition=piece.length-1;
        });
        //new text over entry panel
        numberEntryPanelText = game.add.text(item.displayX + ((item.displayDigits-1)*40) + Math.floor((item.displayDigits-1)/3) *20, item.displayY-9, numberEntryValue.toString(), {
            font: "72px Arial",
            fill: "black",
            align: "right"
            }); 
    }
}

function numberEntryClick (item) {
    if(item.value<10 && numberEntryValue.toString().length < item.displayDigits)
    {
        numberEntryValue = numberEntryValue*10+item.value;
        numberEntryPanelText.text = addCommas( numberEntryValue.toString() );
        if(numberEntryValue.toString().length >1)
        {
            if( (numberEntryValue.toString().length-1)%3 == 0)
            {
               numberEntryPanelText.x -= 60  
            } else
            {
               numberEntryPanelText.x -= 40 
            }
        }
    } else
    {
        numberEntryValue = 0;
        numberEntryPanelText.x = item.displayX + ((item.displayDigits-1)*40) + Math.floor((item.displayDigits-1)/3)*20
        numberEntryPanelText.text = numberEntryValue.toString();
    }
}

//INEQUALITY ENTRY
function InequalityEntryConstructor(appletID, type,inequalityEntryX, inequalityEntryY, displayX, displayY)  {
    this.appletID = appletID;
    this.type=type;
    this.inequalityEntryX= inequalityEntryX;
    this.inequalityEntryY = inequalityEntryY;
    this.displayX = displayX;
    this.displayY = displayY;
}

var inequality='||';
var inequalityEntryText='';
var inequalitEntryPanelText;
function buildInequalityEntry(item) {
    piece.forEach(function(item) {
        if(item.type == 17 || item.type == '17b')
        {
            console.log("previous inequality entry found - only one per applet");
            item.deleted=true;
            item.destroy(true);
        }
    });
    //inequality entry buttons
    piece[piece.length] = game.add.group();
    var pieceLabel;
    var pieceText;
    for(var i = 0; i < 3; i++)
    {
        switch(i) {
            case 0:
                pieceText = '<'
                break;
            case 1:
                pieceText = '='
                break;
            case 2:
                pieceText = '>'
                break;
        }
        piece[piece.length-1].create(i*120,0,'numberEntryDisplay').value=i;
        pieceLabel = new Phaser.Text(game, i*120+23, -10, pieceText , {
        font: "72px Arial",
        fill: "black",
        align: "center"});
        pieceLabel.value=i;
        piece[piece.length-1].add(pieceLabel);
        
    }
    
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=17;
    
    piece[piece.length-1].inequalityEntryX = item.inequalityEntryX;
    piece[piece.length-1].inequalityEntryY = item.inequalityEntryY;
    piece[piece.length-1].displayX = item.displayX;
    piece[piece.length-1].displayY = item.displayY;
    
    piece[piece.length-1].forEach(function(subitem) {
        subitem.inputEnabled='true';
        subitem.events.onInputDown.add(buildGroupPieceClick, this);
        subitem.events.onInputUp.add(onFinishDrag, draggingPiece);  
        subitem.ParentPosition=piece.length-1;
        subitem.displayX = item.displayX;
        subitem.displayY = item.displayY;
    });
    
    //displayPanel
    piece[piece.length]= game.add.sprite(item.displayX,item.displayY,'numberEntryDisplay');
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type='17b';
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
    
    if(state!='build')
    {
        piece[piece.length-2].x=item.inequalityEntryX;
        piece[piece.length-2].y=item.inequalityEntryY;
        piece[piece.length-2].forEach(function(item) { //inequality entry button behavior
            item.events.onInputDown.add(inequalityEntryClick, this);
            item.ParentPosition=piece.length-1;
        });
        //new text over entry panel 
        inequalitEntryPanelText = game.add.text(item.displayX+23 , item.displayY-10, inequalityEntryText.toString() , {
            font: "72px Arial",
            fill: "black",
            align: "center"
            }); 
    }
}

function inequalityEntryClick(item) {
    switch(item.value) {
    case 0:
        inequalityEntryText='<'
        break;
    case 1:
        inequalityEntryText='='
        break;
    case 2:
        inequalityEntryText='>'
        break;
    }
    inequalitEntryPanelText.text = inequalityEntryText;
    inequality = inequalityEntryText;
}


//DRAGGABLE NUMBERS
var draggableNumbers = [];
function DraggableNumbersConstructor(appletID, type, startX, startY, orientation, clonable, size, fill) {
    this.appletID = appletID;
    this.type=type;
    this.orientation=orientation;
    this.clonable=clonable;
    this.startX = startX;
    this.startY = startY;
    this.size = size;
    this.fill = fill;
}

//this makes a copy of the original number that can now make a copy of itself
function draggableNumbersClickClone(item) {
    var newClone = game.add.text(item.x, item.y, item.number.toString(), {
                    font: item.fontString,
                    fill: item.fill,
                    align: "center"
                    }); 
    newClone.inputEnabled='true';
    newClone.events.onInputDown.add(draggableNumbersClickClone, this); 
    newClone.events.onInputDown.add(startDraggingNumber, this); 
    newClone.events.onInputUp.add(stopDraggingNumber, this); 
    
    newClone.number = item.number;
    newClone.size = Number(item.size);
    newClone.fontString = item.fontString;
    newClone.fill = item.fill;
    newClone.dragOffsetX = item.dragOffsetX;
    newClone.dragDoneOffsetX = item.dragDoneOffsetX;
    newClone.dragOffsetY = 0
    
   
    newClone.x = item.x;
    newClone.y = item.y;
    draggableNumbers.push(newClone);
}

var draggablePieces = [];
function buildDraggableNumbers(item) {
    piece.forEach(function(item) {
        if(item.type == 8)
        {
            console.log("previous number strip found - only one per applet");
            item.deleted=true;
            item.destroy(true);
        }
    });
    var loadOffsetX=0;
    var loadOffsetY=0;
    piece[piece.length] = game.add.group();   
    var fontString;
    
    if(state!='build')
    {
        fontString = item.size + "px Arial";
        loadOffsetX=item.startX;
        loadOffsetY=item.startY;
    } else
    {
        item.startX=400;
        item.startY=250;
        fontString=item.size + "px Arial";
    }
    
    for(var i = 0; i < 10; i++)
    {
        if(item.orientation == "h")
        {                           
            draggablePieces[i] = game.add.text((i-5)*item.size/1.5+loadOffsetX, 0+loadOffsetY, i.toString(), {
            font: fontString,
            fill: item.fill,
            align: "center"
            }); 
        } else
        {
            draggablePieces[i] = game.add.text(0+loadOffsetX, (i-5)*item.size/1.1+loadOffsetY, i.toString(), {
            font: item.size + "px Arial",
            fill: item.fill,
            align: "center"
            }); 
        }
        draggableNumbers.push(draggablePieces[i]);
    }
    

    if(state!='build')
    {
        for(var slot = 0; slot < 10; slot++)
        {
            draggableNumbers[slot].inputEnabled='true';
            draggableNumbers[slot].number=slot;
            draggableNumbers[slot].type=8;
            piece[piece.length-1].startX = loadOffsetX;
            piece[piece.length-1].startY = loadOffsetY;
            
            draggableNumbers[slot].fontString=item.size + "px Arial";
            draggableNumbers[slot].size=item.size;
            draggableNumbers[slot].inputEnabled='true';
            draggableNumbers[slot].input.useHandCursor=true; 
            draggableNumbers[slot].dragOffsetX = 0;
            draggableNumbers[slot].dragDoneOffsetX = 0;
            draggableNumbers[slot].dragOffsetY = 0
            if(item.clonable != "n") //"n" is default
            {//clonable; add a cloning function
                draggableNumbers[slot].events.onInputDown.add(draggableNumbersClickClone, this); 
            }  
            draggableNumbers[slot].events.onInputDown.add(startDraggingNumber, this);
            draggableNumbers[slot].events.onInputUp.add(stopDraggingNumber, this); 
            
        }
    } else
    {
            for(i = 0; i < 10; i++)
            {
                piece[piece.length-1].add(draggablePieces[i]);
            }
            piece[piece.length-1].grouped=1;
            
            piece[piece.length-1].x = item.startX;
            piece[piece.length-1].y = item.startY;
            
            
            piece[piece.length-1].forEach(function(item) {
                item.inputEnabled='true';
                item.events.onInputDown.add(buildGroupPieceClick, this);
                item.events.onInputUp.add(onFinishDrag, draggingPiece);
                item.clicked=0;
                item.ParentPosition=piece.length-1;
        });
    }
    piece[piece.length-1].type=8;
    piece[piece.length-1].orientation = item.orientation;
    console.log(item.clonable)
    piece[piece.length-1].clonable = item.clonable;
    piece[piece.length-1].size = item.size;
    piece[piece.length-1].fill = item.fill;
    
}

var draggingNumber=0;
var draggingNumberID=-1;
var draggingNumberHandle=null;
function startDraggingNumber(item) {
    
    draggingNumber=1;
    game.world.bringToTop(item);  //bring the number above the boxes
    //draggingNumberID++;  //new ID
    //item.draggingNumber=draggingNumberID;  //set it to the current ID
    item.events.onInputDown.remove(draggableNumbersClickClone, this); //we don't want it to clone over and over
    if (item.occupying != null && item.type!=52) //I'm in a box already
    {//clear the box
        dragToBoxes[item.occupying].occupied=0;  
        dragToBoxes[item.occupying].contents= null;
        item.occupying = null  ;
    }
    draggingNumberHandle=item;
} 

function stopDraggingNumber(item) {
    draggingNumber=0;
    for (var i=0; i<dragToBoxes.length; i++ )  //check all the dragToBoxes
    {   
        if(item.x==dragToBoxes[i].x-draggingNumberHandle.width/2+draggingNumberHandle.dragOffsetX+draggingNumberHandle.dragDoneOffsetX && item.y==dragToBoxes[i].y-draggingNumberHandle.height/2+draggingNumberHandle.dragOffsetY && dragToBoxes[i].occupied == 0) 
        {
            item.x=dragToBoxes[i].x-draggingNumberHandle.width/2+draggingNumberHandle.dragOffsetX+draggingNumberHandle.dragDoneOffsetX;
            item.y=dragToBoxes[i].y-draggingNumberHandle.height/2+3+draggingNumberHandle.dragOffsetY;
            //set the box as occupied
            item.occupying = i;  
            dragToBoxes[i].occupied=1;
            dragToBoxes[i].contents=item.number;
        } 
    }
}

function dragNumber() {
    if(draggingNumberHandle!=null && draggingNumber==1)
    {
        draggingNumberHandle.x=game.input.x-draggingNumberHandle.dragOffsetX
        draggingNumberHandle.y=game.input.y-draggingNumberHandle.height/2+draggingNumberHandle.dragOffsetY;
        for (var i=0; i<dragToBoxes.length; i++ )
        {//every drag to box
            if(Math.abs(draggingNumberHandle.x - dragToBoxes[i].x + draggingNumberHandle.width/2 +draggingNumberHandle.dragOffsetX ) < draggingNumberHandle.width && Math.abs(draggingNumberHandle.y-dragToBoxes[i].y+draggingNumberHandle.height/2-draggingNumberHandle.dragOffsetY) < draggingNumberHandle.height/2 && dragToBoxes[i].occupied == 0) 
            {//I'm close to a box.  Snap to it.
                draggingNumberHandle.x=dragToBoxes[i].x-draggingNumberHandle.width/2+draggingNumberHandle.dragOffsetX+draggingNumberHandle.dragDoneOffsetX;
                draggingNumberHandle.y=dragToBoxes[i].y-draggingNumberHandle.height/2+draggingNumberHandle.dragOffsetY;
            } 
        }    
    }
    
}


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

//DRAGGABLE BASE TEN BLOCKS
function BaseTenCloneConstructor(appletID, type, startX, startY, dragX, dragY, dragWidth, dragHeight) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.dragX = dragX;
    this.dragY = dragY;
    this.dragHeight = dragHeight;
    this.dragWidth = dragWidth;
}
var hundredBlock;
var tenBlock;
var oneBlock;
var baseTenDragToContents = 0;

function buildBaseTenBlocks(item) {
    buildBaseTenDragTo(item.dragX,item.dragY, item.dragWidth, item.dragHeight);
    adjustNewPiece();
    
    
    piece[piece.length] = game.add.group();
    oneBlock = piece[piece.length-1].create(0, 0, drawBaseTenOne().generateTexture());
    oneBlock.value = 1;
    baseTenGraphic.clear();
    tenBlock = piece[piece.length-1].create(0, 50, drawBaseTenTen().generateTexture());
    tenBlock.value = 10;
    baseTenGraphic.clear();
    hundredBlock = piece[piece.length-1].create(0, 150, drawBaseTenHundred().generateTexture());

    hundredBlock.value = 100;
    baseTenGraphic.clear();

    piece[piece.length-1].x=item.startX;
    piece[piece.length-1].y=item.startY;
    piece[piece.length-1].startX=item.startX;
    piece[piece.length-1].startY=item.startY;
    
    if (state !='build') {
        fixBaseTenBlocks(oneBlock, item.startX, item.startY)
        fixBaseTenBlocks(tenBlock, item.startX, item.startY)
        fixBaseTenBlocks(hundredBlock, item.startX, item.startY)
    } else
    {
        oneBlock.anchor.setTo(0.5,0.5)
        tenBlock.anchor.setTo(0.5,0.5)
        hundredBlock.anchor.setTo(0.5,0.5)
    }
    piece[piece.length-1].forEach(function(item) {
        
        if(state != 'build')
        {
        } else
        {
            item.inputEnabled='true';
            item.ParentPosition=piece.length-1;
            item.startX = item.startX;
            item.startY = item.startY;
            item.events.onInputDown.add(buildGroupPieceClick, this);
            item.events.onInputUp.add(onFinishDrag, draggingPiece);
        }
    });
    
    piece[piece.length-1].type=13;
    piece[piece.length-1].grouped=1;
    
    
    
}

function fixBaseTenBlocks(item, startX, startY) {
    var newClone
    switch(item.value) {
    case 1:
        newClone = game.add.sprite(startX+0, startY+0, drawBaseTenOne().generateTexture());
        newClone.value = 1;
        baseTenGraphic.clear();
        break;
        
    case 10:
        newClone = game.add.sprite(startX+0, startY+50, drawBaseTenTen().generateTexture());
        newClone.value = 10;
        baseTenGraphic.clear();
        break;
        
    case 100:
        newClone = game.add.sprite(startX+0, startY+150, drawBaseTenHundred().generateTexture());
        newClone.value = 100;
        baseTenGraphic.clear();
        break;
}
    newClone.inputEnabled='true';
    newClone.input.useHandCursor=true; 
    newClone.anchor.setTo(0.5, 0.5);
    newClone.events.onInputDown.add(baseTenBlocksClickClone, this); 
    newClone.events.onInputDown.add(startDraggingBaseTenBlocks, this);
    newClone.events.onInputUp.add(stopDraggingBaseTenBlocks, this); 
    newClone.startX = startX;
    newClone.startY = startY;
    item.destroy(true);
    
    
}
function baseTenBlocksClickClone(item) {
    var newClone = game.add.group();
    switch(item.value) {
    case 1:
        newClone = newClone.create(0, 0, drawBaseTenOne().generateTexture());
        newClone.value = 1;
        baseTenGraphic.clear();
        break;
        
    case 10:
        newClone = newClone.create(0, 50, drawBaseTenTen().generateTexture());
        newClone.value = 10;
        baseTenGraphic.clear();
        break;
        
    case 100:
        newClone = newClone.create(0, 150, drawBaseTenHundred().generateTexture());
        newClone.value = 100;
        baseTenGraphic.clear();
        break;
}
    newClone.x = newClone.x+item.startX
    newClone.y = newClone.y+item.startY
    newClone.anchor.setTo(0.5,0.5)
    newClone.inputEnabled='true';
    newClone.input.useHandCursor=true; 
    newClone.events.onInputDown.add(baseTenBlocksClickClone, this); 
    newClone.events.onInputDown.add(startDraggingBaseTenBlocks, this);
    newClone.events.onInputUp.add(stopDraggingBaseTenBlocks, this); 
    newClone.bringToTop();
    newClone.value = item.value
    newClone.startX = item.startX;
    newClone.startY = item.startY;
    newClone.ParentPosition = item.ParentPosition;
}

function stopDraggingBaseTenBlocks(item) {
    draggingBlock=0;
     if(Math.abs(baseTenDragTo.startX-draggingBlockHandle.x) < baseTenDragTo.width/2 && Math.abs(baseTenDragTo.startY-draggingBlockHandle.y) < baseTenDragTo.height/2 ) {
         draggingBlockHandle.occupying = 1;
     }
    if(draggingBlockHandle.occupying == 1)
    {
        baseTenDragToContents += item.value;   
    }
}

var draggingBlockHandle;
var draggingBlock=0;
function startDraggingBaseTenBlocks(item) {
    if(item.occupying == 1)
    {
        baseTenDragToContents -= item.value;
    }
    draggingBlock=1;
    game.world.bringToTop(item);  //bring the number above the boxes
    draggingBlockHandle=item;
    item.events.onInputDown.remove(baseTenBlocksClickClone, this); //we don't want it to clone over and over
}

function dragBaseTenBlock() {
    if(draggingBlock==1)
    {
        draggingBlockHandle.occupying = 0;
        draggingBlockHandle.x=game.input.x;
        draggingBlockHandle.y=game.input.y;
        if(Math.abs(baseTenDragTo.startX-draggingBlockHandle.x) < baseTenDragTo.width/2+(draggingBlockHandle.value < 10 ? 10 : 50) && Math.abs(baseTenDragTo.startX-draggingBlockHandle.x) > baseTenDragTo.width/2-(draggingBlockHandle.value < 10 ? 10 : 50) ) {
            if(Math.abs(baseTenDragTo.startY-draggingBlockHandle.y) < baseTenDragTo.height/2) {
               if(draggingBlockHandle.x > baseTenDragTo.startX)
               {
                  draggingBlockHandle.x =  baseTenDragTo.startX + baseTenDragTo.width/2 - (draggingBlockHandle.value < 10 ? 10 : 50)
               } else
               {
                  draggingBlockHandle.x =  baseTenDragTo.startX - baseTenDragTo.width/2 + (draggingBlockHandle.value < 10 ? 10 : 50)
               }
            }
        }
        if(Math.abs(baseTenDragTo.startY-draggingBlockHandle.y) < baseTenDragTo.height/2+(draggingBlockHandle.value < 100 ? 10 : 50) && Math.abs(baseTenDragTo.startY-draggingBlockHandle.y) > baseTenDragTo.height/2-(draggingBlockHandle.value < 100 ? 10 : 50) ) {
            if(Math.abs(baseTenDragTo.startX-draggingBlockHandle.x) < baseTenDragTo.width/2) {
               if(draggingBlockHandle.y > baseTenDragTo.startY)
               {
                  draggingBlockHandle.y =  baseTenDragTo.startY + baseTenDragTo.height/2 - (draggingBlockHandle.value < 100 ? 10 : 50)
               } else
               {
                  draggingBlockHandle.y =  baseTenDragTo.startY - baseTenDragTo.height/2 + (draggingBlockHandle.value < 100 ? 10 : 50)
               }
            }
        }
    }
}


var baseTenGraphic
function drawBaseTenOne() {
    baseTenGraphic = game.add.graphics(0, 0);
    baseTenGraphic.beginFill(0xFFFFFF);
    baseTenGraphic.lineStyle(3, 0x000000, 1);
    baseTenGraphic.drawRect(0, 0, 10, 10);
    baseTenGraphic.endFill();
    return baseTenGraphic;
}

function drawBaseTenTen() {
    baseTenGraphic = game.add.graphics(0, 0);
    baseTenGraphic.beginFill(0xFFFFFF);
    for(var i=0 ; i<10 ; i++) {
        baseTenGraphic.lineStyle(3, 0x000000, 1);
        baseTenGraphic.drawRect(i*10, 0, 10, 10);
    }
    baseTenGraphic.endFill();
    return baseTenGraphic;
}

function drawBaseTenHundred() {
    baseTenGraphic = game.add.graphics(0, 0);
    baseTenGraphic.beginFill(0xFFFFFF);
    for(var i=0 ; i<10 ; i++) {
        for (var j=0; j<10 ; j++) {
            baseTenGraphic.lineStyle(3, 0x000000, 1);
            baseTenGraphic.drawRect(i*10, j*10, 10, 10);    
        }
    }
    baseTenGraphic.endFill();
    return baseTenGraphic;
}

//TALLY BOX
function TallyConstructor(appletID, type, startX, startY, initialValue) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.initialValue = initialValue;
}

var tallyPiece;
var tallyGraphic;
var tallyChart;
var tallyTotal;
function buildTally(item) {
    tallyTotal=item.initialValue;
    var tallyPlus;
    var tallyMinus;
    
    piece[piece.length] = game.add.group();
    tallyChart = piece[piece.length-1].create(0, 0, drawTally(item.initialValue).generateTexture());
    tallyGraphic.clear();
    
    
    tallyMinus = piece[piece.length-1].create(0+50, 0+310, 'tallyButtonMinus');
    
    tallyPlus = piece[piece.length-1].create(0+150, 0+310, 'tallyButtonPlus');

    piece[piece.length-1].forEach(function(item) {
        item.inputEnabled='true';
        item.events.onInputDown.add(buildGroupPieceClick, this);
        item.events.onInputUp.add(onFinishDrag, draggingPiece);
        item.clicked=0;
        item.ParentPosition=piece.length-1;
    });
    
    if(state != 'build')
    {
        tallyPlus.events.onInputDown.add(tallyPlusClick, this);
        tallyMinus.events.onInputDown.add(tallyMinusClick, this);
    } else
    {
        item.startX=400;
        item.startY=300;
    }
    
    piece[piece.length-1].x=item.startX;
    piece[piece.length-1].y=item.startY;
    piece[piece.length-1].initialValue=item.initialValue;
    piece[piece.length-1].type=12;
    piece[piece.length-1].grouped=1;
    tallyPiece=piece.length-1;
}


function tallyPlusClick() {
    if(tallyTotal<100)
    {
        tallyTotal++;
        setTally(tallyTotal); 
    }
}

function tallyMinusClick() {
    if(tallyTotal>0)
    {
        tallyTotal--;
        setTally(tallyTotal);   
    }
}

function setTally(tallyValue) {
    tallyChart.loadTexture(drawTally(tallyValue).generateTexture());
    tallyGraphic.clear();
}

function drawTally(tallyValue) {
    tallyGraphic = game.add.graphics(400, 300);
    tallyGraphic.lineStyle(6, 0x000000, 1);
    tallyGraphic.drawRect(0, 0, 250, 300);
    var drawingTally= 0;
    var tallyX;
    var tallyY=7;
    for(var i =0; i<tallyValue; i++)
    {
        drawingTally++;
        if(drawingTally % 5 != 0)
        {
            tallyX = ((drawingTally % 20)*12)+5;
            tallyGraphic.moveTo(tallyX,tallyY);
            tallyGraphic.lineTo(tallyX, tallyY+45);
        } else 
        {
            tallyGraphic.moveTo(tallyX-48,tallyY);
            tallyGraphic.lineTo(tallyX+12, tallyY+45);
        }
            if(drawingTally%20 == 0)
        {
            tallyY+=60;
        } 
    }
    return tallyGraphic;
}

//MULTIPLE CHOICE VALUES
function MultipleChoiceNumberConstructor(appletID, type, multiType, startX, startY, correct, incorrect1, incorrect2, incorrect3, multipleChoiceFontSize, spaceX, spaceY) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.multiType = multiType;
    this.correct = correct;
    this.incorrect1 = incorrect1;
    this.incorrect2 = incorrect2;
    this.incorrect3 = incorrect3;
    this.multipleChoiceFontSize=multipleChoiceFontSize;
    this.spaceX=spaceX;
    this.spaceY=spaceY;
}

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

//GENERIC ORIGINAL PIECE CONSTRUCTOR
//TO DO: BREAK INTO SPECIFIC CONSTRUCTORS
function PieceConstructor(appletID, type, startX, startY, text, font, fill, wordWrap, wordWrapWidth, randomCeiling, randomFloor, alignment) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.text = text;
    this.newText = text;
    this.font = font;
    this.fontString = font;
    this.fill = fill;
    this.wordWrap = wordWrap;
    this.wordWrapWidth = wordWrapWidth;
    this.randomCeiling = randomCeiling;
    this.randomFloor = randomFloor;
    this.alignment = alignment;
}

var boxesClicked=-1;
function buildClickBox(item) {
    piece[piece.length] = game.add.sprite(0, 0, 'whiteBox80');
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=0;
    if(state!='build')
    {
        totalBoxes++;
        boxesClicked=0;
        piece[piece.length-1].x = item.startX;
        piece[piece.length-1].y = item.startY;
        piece[piece.length-1].clicked = 0;
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].events.onInputDown.add(clickBoxClick, this);
        piece[piece.length-1].anchor.setTo(0.5, 0.5);    
    }
}

function clickBoxClick(item) {
    if(item.clicked == 0)
    {
        item.clicked = 1;
        boxesClicked++;
        item.loadTexture('grayBox80');
    } else
    {
        item.clicked = 0;
        boxesClicked--;
        item.loadTexture('whiteBox80');
    }    
}


function buildTextArea(item) {
    if (typeof item.alignment === 'undefined') { item.alignment = 'left'; }
    item.newText=decodeURIComponent(item.newText);
    var startX;
    var startY;
    if(state!='build')
    {
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        startX=item.startX;
        startY=item.startY;
    } else
    {
        item.fontString="" + newBold + " " + newTextSize + "px Arial";
        startX=400;
        startY=250;
    }
    piece[piece.length] = game.add.text(startX, startY, item.newText, {
            font: item.fontString,
            fill: newTextColor,
            align: item.alignment,
            wordWrap: newTextWrap,
            wordWrapWidth: newTextWidth
    });
    piece[piece.length-1].type=1;
    piece[piece.length-1].fontString=item.fontString
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].alignment = item.alignment;  
}

function buildRandomNumber(item) {
    var newRandom = getRandomInt(Number(item.randomFloor), Number(item.randomCeiling) );
    var startX;
    var startY;
    var fontString;
    randomNumber.push(newRandom);
    if(state!='build')
    {
        fontString=item.font;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        startX=item.startX;
        startY=item.startY;
    } else
    {
        startX=400;
        startY=250;
        fontString="" + newBold + " " + newTextSize + "px Arial";
    }
    
    piece[piece.length] = game.add.text(startX, startY, addCommas(newRandom), {
            font: fontString,
            fill: newTextColor,
            align: "right"
    });
    piece[piece.length-1].anchor.setTo(1, 0);
    piece[piece.length-1].randomFloor = item.randomFloor;
    piece[piece.length-1].randomCeiling = item.randomCeiling;
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=2;
    piece[piece.length-1].fontString=fontString; 
    piece[piece.length-1].draggable = item.draggable;
    if(state!='build' && item.draggable == 1)
    {
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].dragOffsetX = -piece[piece.length-1].width
        piece[piece.length-1].dragOffsetY = 0
        piece[piece.length-1].dragDoneOffsetX = piece[piece.length-1].width*2
        piece[piece.length-1].input.useHandCursor=true;
        piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
        piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
        piece[piece.length-1].number = newRandom;
        
    }
}

var hundredBoxesClicked=-1;
function buildHundredChart(item) {
    piece[piece.length] = game.add.group();
    for(var i=0; i<10; i++)
    {
        for(var j=0; j<10; j++)
        {
            piece[piece.length-1].create((i-5)*20,(j-5)*20,'whiteHundredBox');
        }
    }
    piece[piece.length-1].forEach(function(item) {
        item.inputEnabled='true';
        item.events.onInputDown.add(buildGroupPieceClick, this);
        item.events.onInputUp.add(onFinishDrag, draggingPiece);
        item.clicked=0;
        item.ParentPosition=piece.length-1;
    });
    if(state!= 'build')
    {
        piece[piece.length-1].x = item.startX;
        piece[piece.length-1].y = item.startY;
        piece[piece.length-1].forEach(function(item) {
            item.inputEnabled='true';
            item.events.onInputDown.add(hundredBoxClick, this);
            item.parentNumber = piece.length-1;
        });    
    }
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=4; 
    hundredBoxesClicked=0;
}

function hundredBoxClick(item) {
    piece[item.parentNumber].forEach(function(item) {
        item.events.onInputOver.add(hundredBoxClick, this);  //this is the right place to add it; we want mouseover behavior too
    });
    
    if(game.input.mousePointer.isDown)
    {
        if(item.clicked == 0)
        {
            item.clicked = 1;
            hundredBoxesClicked++;
            item.loadTexture('grayHundredBox');
        } else
        {
            item.clicked = 0;
            hundredBoxesClicked--;
            item.loadTexture('whiteHundredBox');
        }   
    }
}

//RANDOM DECIMAL
function RandomDecimalConstructor(appletID, type, startX, startY, font, fill, randomCeiling, randomFloor, randomDigits) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.font = font;
    this.fill = fill;
    this.randomCeiling = randomCeiling;
    this.randomFloor = randomFloor;
    this.randomDigits = randomDigits;
    this.fontString = font;
}

function buildRandomDecimal(item) {
    var startX;
    var startY;
    var fontString;
    
    if(state!='build')
    {
        fontString=item.font;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        newTextSize = item.size;
        startX=item.startX;
        startY=item.startY;
    } else
    {
        fontString="" + newBold + " " + newTextSize + "px Arial";
        startX=400;
        startY=250;
    }
    
    var newRandom = getRandomDecimal(Number(item.randomFloor), Number(item.randomCeiling) , Number(item.randomDigits) );
    randomDecimal.push(newRandom);
    piece[piece.length] = game.add.text(startX, startY, newRandom.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    piece[piece.length-1].randomFloor = item.randomFloor;
    piece[piece.length-1].randomCeiling = item.randomCeiling;
    piece[piece.length-1].randomDigits = item.randomDigits;
    piece[piece.length-1].fontString=fontString;
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].anchor.setTo(0.5, 0.5);
    piece[piece.length-1].type=6;
    
}

//EVALUATED EXPRESSION
function EvaluatedExpressionConstructor(appletID, type, startX, startY, expression , font, fill, wordWrap, wordWrapWidth , align ) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.expression = expression;
    this.font = font;
    this.fill = fill;
    this.fontString = font;
    this.wordWrap = wordWrap;
    this.wordWrapWidth = wordWrapWidth;
    this.align = align;
}

function buildEvaluatedExpression(item) {
     item.expression=decodeURIComponent(item.expression);   
    
    evaluatedExpression.push(eval(item.expression));
    if(state!='build')
    {
        fontString=item.font;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap
        newTextWidth=item.wordWrapWidth
        startX=item.startX;
        startY=item.startY;
    } else
    {
        startX=400;
        startY=250;
        fontString="" + newBold + " " + newTextSize + "px Arial";
    }
    piece[piece.length] = game.add.text(startX, startY, evaluatedExpression[evaluatedExpression.length-1].toString(), {
            font: fontString,
            fill: newTextColor,
            align: item.align,
            wordWrap: newTextWrap,
            wordWrapWidth: newTextWidth
    });
    
    piece[piece.length-1].anchor.setTo(0.5, 0.5);
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type=15;
    piece[piece.length-1].fontString=fontString;
    piece[piece.length-1].fill=newTextColor;
    piece[piece.length-1].expression=item.expression;
    piece[piece.length-1].draggable = item.draggable;
    if(state!='build' && item.draggable == 1)
    {
        piece[piece.length-1].inputEnabled='true';
        console.log(item.align)
        piece[piece.length-1].dragOffsetX = 0
        piece[piece.length-1].dragDoneOffsetX = piece[piece.length-1].width/2
        piece[piece.length-1].dragOffsetY = piece[piece.length-1].height/2
        piece[piece.length-1].input.useHandCursor=true;
        piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
        piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
        piece[piece.length-1].number = evaluatedExpression[evaluatedExpression.length-1];
        
    }
}

//HIDDEN NUMBER
function HiddenNumberConstructor(appletID, type, expression) { 
    this.appletID = appletID;
    this.type=type;
    this.expression = expression;
}

var hiddenNumber = [];
function buildHiddenNumber(item) {
    item.expression = decodeURIComponent(item.expression)
    hiddenNumber.push(eval(item.expression));
    piece[piece.length] = game.add.sprite(0,0);
    piece[piece.length-1].expression = item.expression;
    piece[piece.length-1].type=16;
}


//RANDOM MIXED NUMBER
function MixedNumberConstructor(wholeNumber , numerator , denominator) {
    this.wholeNumber = wholeNumber;
    this.numerator = numerator;
    this.denominator = denominator;
}

function RandomMixedNumberConstructor(appletID, type, startX, startY, font, size, fill, wholeNumberRandomCeiling, wholeNumberRandomFloor, numeratorRandomCeiling, numeratorRandomFloor, denominatorRandomCeiling, denominatorRandomFloor) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.font = font;
    this.size = size;
    this.fill = fill;
    this.wholeNumberRandomCeiling = wholeNumberRandomCeiling;
    this.wholeNumberRandomFloor = wholeNumberRandomFloor;
    this.numeratorRandomCeiling = numeratorRandomCeiling;
    this.numeratorRandomFloor = numeratorRandomFloor;
    this.denominatorRandomCeiling = denominatorRandomCeiling;
    this.denominatorRandomFloor = denominatorRandomFloor;
}

function buildRandomMixedNumber(item) {
    //(applet[i].wholeNumberRandomFloor, applet[i].wholeNumberRandomCeiling, applet[i].numeratorRandomFloor, applet[i].numeratorRandomCeiling, applet[i].denominatorRandomFloor, applet[i].denominatorRandomCeiling, i);
    var newWholeNumberRandom = getRandomInt(Number(item.wholeNumberRandomFloor), Number(item.wholeNumberRandomCeiling) );
    var newNumeratorRandom = getRandomInt(Number(item.numeratorRandomFloor), Number(item.numeratorRandomCeiling) );
    var newDenominatorRandom = getRandomInt(Number(item.denominatorRandomFloor), Number(item.denominatorRandomCeiling) );
    randomMixedNumber.push(new MixedNumberConstructor(newWholeNumberRandom, newNumeratorRandom, newDenominatorRandom));
    if(state!='build')
    {
        fontString=item.font;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        newTextSize = item.size;

    } else
    {
  
    }
        var fontString = newTextSize + "px Arial";
        var bigFontString = newTextSize*2 + "px Arial";
    var newWholeNumberRandomText = game.add.text(newTextSize/2, 0, newWholeNumberRandom.toString(), {
            font: bigFontString,
            fill: newTextColor,
            align: "right"
    });
    
    var newNumeratorRandomText = game.add.text(newTextSize*1.5, 0, newNumeratorRandom.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    var newDenominatorRandomText = game.add.text(newTextSize*1.5, newTextSize, newDenominatorRandom.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    
    var fractionBarText = game.add.text(newTextSize*1.5, 0, "___", {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    
    var boxLength = Number(newTextSize)
    var boxGraphic = game.add.graphics(0, 0);
    boxGraphic.lineStyle(2, 0x000000, 1)
    boxGraphic.drawCircle(0, -boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(0, boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(boxLength*3, -boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(boxLength*3, boxLength, 0.01);//these four dots keep the whole thing centered
    
    
    piece[piece.length] = game.add.sprite(0,0, boxGraphic.generateTexture());
    boxGraphic.clear();
    newNumeratorRandomText.anchor.setTo(0.5,0)
    newDenominatorRandomText.anchor.setTo(0.5,0)
    fractionBarText.anchor.setTo(0.5,0)
    newWholeNumberRandomText.anchor.setTo(1,0)
    //piece[piece.length] = game.add.sprite(0,0,'fractionBar');
    piece[piece.length-1].addChild(fractionBarText);
    piece[piece.length-1].addChild(newNumeratorRandomText);
    piece[piece.length-1].addChild(newDenominatorRandomText);
    piece[piece.length-1].addChild(newWholeNumberRandomText);
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].x=400;
    piece[piece.length-1].draggable = item.draggable;
    if(state != 'build')
    {
        piece[piece.length-1].x=item.startX;
        piece[piece.length-1].y=item.startY;
        
        if(item.draggable == 1)
        {
            piece[piece.length-1].align = 'center'
            piece[piece.length-1].input.useHandCursor=true;
            piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
            piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
            piece[piece.length-1].number = newWholeNumberRandom+newNumeratorRandom/newDenominatorRandom;
            
            piece[piece.length-1].dragOffsetX = piece[piece.length-1].width/2.8 ;
            piece[piece.length-1].dragDoneOffsetX = 0
            piece[piece.length-1].dragOffsetY = 0
        }
    }
    

    
    piece[piece.length-1].events.onInputDown.add(buildGroupPieceClick, this);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
    piece[piece.length-1].clicked=0;
    piece[piece.length-1].ParentPosition=piece.length-1;

    piece[piece.length-1].wholeNumberRandomFloor = item.wholeNumberRandomFloor;
    piece[piece.length-1].wholeNumberRandomCeiling = item.wholeNumberRandomCeiling;
    piece[piece.length-1].numeratorRandomFloor = item.numeratorRandomFloor;
    piece[piece.length-1].numeratorRandomCeiling = item.numeratorRandomCeiling;
    piece[piece.length-1].denominatorRandomFloor = item.denominatorRandomFloor;
    piece[piece.length-1].denominatorRandomCeiling = item.denominatorRandomCeiling;
    piece[piece.length-1].fontString="" + newBold + " " + newTextSize + "px Arial";
    piece[piece.length-1].fill = newTextColor;
    piece[piece.length-1].size = newTextSize;
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=7;
}

//BASE TEN DRAG TO
function BaseTenDragToConstructor(startX, startY, width, height) {
    this.startX = startX;
    this.startY = startY;
    this.width = width;
    this.height = height;
}

var dragToGraphic;
var baseTenDragTo;

function buildBaseTenDragTo(startX, startY, boxWidth, boxHeight) {
    baseTenDragTo = (new BaseTenDragToConstructor(startX, startY, boxWidth, boxHeight));
    piece[piece.length] = game.add.sprite(0, 0, drawBaseTenDragTo(boxWidth, boxHeight).generateTexture());
    dragToGraphic.clear();
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type='13a';
    if(state != 'build')
    {
        piece[piece.length-1].x = startX;
        piece[piece.length-1].y = startY;
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].events.onInputDown.add(doneButtonClick, this);
        piece[piece.length-1].anchor.setTo(0.5, 0.5);
    }
}

function drawBaseTenDragTo(width, height) {
    dragToGraphic = game.add.graphics(0, 0);
    dragToGraphic.beginFill(0xFFFFFF);
    dragToGraphic.drawRect(0, 0, width, height); 
    dragToGraphic.endFill();
    return dragToGraphic;
}

//RANDOM FRACTION
function RandomFractionConstructor(appletID, type, startX, startY, font, size, fill, numeratorRandomCeiling, numeratorRandomFloor, denominatorRandomCeiling, denominatorRandomFloor) {
    this.appletID = appletID;
    this.type=type;
    this.startX = startX;
    this.startY = startY;
    this.font = font;
    this.size = size;
    this.fill = fill;
    this.numeratorRandomCeiling = numeratorRandomCeiling;
    this.numeratorRandomFloor = numeratorRandomFloor;
    this.denominatorRandomCeiling = denominatorRandomCeiling;
    this.denominatorRandomFloor = denominatorRandomFloor;
}

function buildRandomFraction(item) {
    var fontString;
    //piece[piece.length] = game.add.group();
    var newNumeratorRandom = getRandomInt(Number(item.numeratorRandomFloor), Number(item.numeratorRandomCeiling) );
    var newDenominatorRandom = getRandomInt(Number(item.denominatorRandomFloor), Number(item.denominatorRandomCeiling) );
    randomNumerator.push(newNumeratorRandom);
    randomDenominator.push(newDenominatorRandom);
    if(state!='build')
    {
        fontString=item.fontString;
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        newTextSize = item.size;
    } else
    {
        fontString="" + newBold + " " + newTextSize + "px Arial";
    }
    
    
    //build start coordinates; will change down below if we're running an applet

    var newNumeratorRandomText = game.add.text(newTextSize/2.5, 0, newNumeratorRandom.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    console.log(newNumeratorRandomText.font)
    var newDenominatorRandomText = game.add.text(newTextSize/2.5, newTextSize, newDenominatorRandom.toString(), {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    
    var fractionBarText = game.add.text(-newTextSize/2.5, 0, "___", {
            font: fontString,
            fill: newTextColor,
            align: "center"
    });
    
    var boxLength = Number(newTextSize)
    var boxGraphic = game.add.graphics(0, 0);
    boxGraphic.lineStyle(2, 0x000000, 1)
    boxGraphic.drawCircle(0, -boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(0, boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(boxLength, -boxLength, 0.01);//these four dots keep the whole thing centered
    boxGraphic.drawCircle(boxLength, boxLength, 0.01);//these four dots keep the whole thing centered
    
    piece[piece.length] = game.add.sprite(0,0, boxGraphic.generateTexture());
    boxGraphic.clear();
    newNumeratorRandomText.anchor.setTo(0.5,0)
    newDenominatorRandomText.anchor.setTo(0.5,0)
    //piece[piece.length] = game.add.sprite(0,0,'fractionBar');
    piece[piece.length-1].anchor.setTo(0.2,0)
    piece[piece.length-1].addChild(fractionBarText);
    piece[piece.length-1].addChild(newNumeratorRandomText);
    piece[piece.length-1].addChild(newDenominatorRandomText);
    
    piece[piece.length-1].scale.setTo(newTextSize/40, newTextSize/40);
    
    piece[piece.length-1].fontString="" + newBold + " " + newTextSize + "px Arial";
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].anchor.setTo(0.5, 0.5); 
    if(state != 'build')
    {
        piece[piece.length-1].x=item.startX;
        piece[piece.length-1].y=item.startY;
        if(item.draggable == 1)
        {
            piece[piece.length-1].inputEnabled='true';
            piece[piece.length-1].input.useHandCursor=true;
            piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
            piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
            piece[piece.length-1].number = newNumeratorRandom/newDenominatorRandom;
            piece[piece.length-1].dragOffsetX = 0
            piece[piece.length-1].dragDoneOffsetX = 0
            piece[piece.length-1].dragOffsetY = 0
        }
    } else
    {
        piece[piece.length-1].x=400;
        piece[piece.length-1].y=300;
        
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].events.onInputDown.add(buildGroupPieceClick, this);
        piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
        piece[piece.length-1].clicked=0;
        piece[piece.length-1].ParentPosition=piece.length-1;
        piece[piece.length-1].numeratorRandomFloor = item.numeratorRandomFloor;
        piece[piece.length-1].numeratorRandomCeiling = item.numeratorRandomCeiling;
        piece[piece.length-1].denominatorRandomFloor = item.denominatorRandomFloor;
        piece[piece.length-1].denominatorRandomCeiling = item.denominatorRandomCeiling;
        piece[piece.length-1].fontString="" + newBold + " " + newTextSize + "px Arial";
        piece[piece.length-1].fill = newTextColor;
        piece[piece.length-1].size = newTextSize;
        piece[piece.length-1].grouped=1;
        piece[piece.length-1].type=3;
    }
        
    
}


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
    if(eval(tests[loadAppletID]))
    {
        item.alpha=0;
    } 
    
}



        /***********************************************************************
         *                  USEFUL FUNCTIONS
         * ********************************************************************/
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//keeps an angle positive
function positiveAngle (angle) {
    if(angle > 360) {angle=angle-360;}
    if(angle < 0) {angle=angle+360;}
    return angle;
}

function getRandomDecimal (min, max, digits) {
    return (Math.random() * (max - min) + min).toFixed(digits);
}

//picks an answer from a provided list e.g.[5,8,9,10,15]
function pickRandomAnswer(answerArray) {
    return answerArray[getRandomInt(0, answerArray.length-1)];
}

//gets a random answer within proximity of given answer
function getCloseAnswer(answer, proximity) {
    return answer+getRandomInt(-proximity, proximity);
}



function render () {
    //game.debug.text("test", 10, 20);
}



function inWordForm( num ) {

    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];

    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    var c = ['', 'million', 'thousand']; 

    num = num.toString();

    if ( num.length > 9 ) { 

        return ''; // Number is larger than what function can deal with

    }

    num = ( '000000000' + num ).substr( -9 ); // // Make number into a predictiable nine character string
  
    num = num.match( /.{3}/g ); // Split string into chunks of three numbers then reverse order of returned array

    var words = '';

    for( var i = 0; i < c.length; i++ ) {

        var n = num[i];

        var str = '';

        str += ( words != '' ) ?  c[i] + ( ( n[0] != 0 ) ? ', ' : ' ' ): '';

        str += ( n[0] != 0 ) ? ( a[Number( n[0] )] + 'hundred ' ) : '';

        n = n.substr( 1 );

        str += ( n != 0 ) ? ( ( str != '' ) ? '' : '' ) + ( a[Number( n )] || ( (n[1] > 0) ? b[n[0]] + '-' : b[n[0]] + ' ')  + a[n[1]] ) : '';

        words += str;

    }
    return words;
}

function inExpandedForm(num) {
    var returnString = "";
    num = num.toString();
    for(var i = 0; i < num.length ; i++) {
        if(Number(num.charAt(i)) > 0 )
        {
            returnString += addCommas(Number(num.charAt(i) ) * Math.pow(10, num.length-i-1))   
        }
        if(i<num.length-1 && Number(num.charAt(i+1)) > 0 )
        {
            returnString += ' + '
        }
    }
    return returnString;
}

var multiplicationPropertyType = ["associative" , "identity" , "distributive" , "zero" , "commutative"]
function multiplicationProperty(type) {
    var returnString;
    var equationSide1 = "";
    var equationSide2 = "";
    var term1 = getRandomInt(2,12);
    var term2 = getRandomIntExcluding(2,12, term1);
    var term3 = getRandomInt(2,12);
    
    switch(type) {
    case 0: //associative
        equationSide1 = "(" + term1 + " x " + term2 + ") x " + term3;
        equationSide2 = term1 + " x (" + term2 + " x " + term3 + ")";
        break;
    case 1: //identity
        equationSide1 = term1 + " x 1";
        equationSide2 = term1;
        break;
    case 2: //distributive
        equationSide1 = "(" + term1 + " x " + term3 + ") + (" + term2 + " x " + term3 + ")";
        equationSide2 = term1+term2 + " x " + term3;
        break;
    case 3: //zero
        equationSide1 = term1 + " x 0";
        equationSide2 = "0";
        
        break;
    case 4: //commutative
        equationSide1 = term1 + " x " + term2
        equationSide2 = term2 + " x " + term1
        
        break;
    }
    if(getRandomInt(0,1) == 0)
    {
        returnString = equationSide1 + " = " + equationSide2
    } else
    {
        returnString = equationSide2 + " = " + equationSide1    
    }
    return returnString;
}


function addCommas( num ) {
    var returnString = "";
    num = num.toString();
    
    for(var i = 0; i < num.length ; i++) {
        returnString += Number(num.charAt(i))
        if( i<num.length-1 && (num.length-i-1)%3==0) {
            returnString += ','
        }
    }
    return returnString;
}

function changeDigit( num ) {
    var returnValue = "";
    num = num.toString();
    var randomIndex = getRandomInt(0, num.length-1);
    return num.substr(0, randomIndex) + getRandomInt(0, 9)  + num.substr(randomIndex+1);

}

function listString(list) {
    var returnString = "[ ";
    for (var i = 0; i< list.length ; i++)
    {
        console.log(list[i])
        console.log(returnString)
        returnString += ' "' + list[i] + '" ';
        if(list.length-1 > i)
        {
            returnString += ","
        }
    }
    returnString += " ]"
    return returnString;
}

function getRandomIntExcluding(min, max, exclude) {
    var returnValue = getRandomInt(min,max);
    for(var i = 1 ; i < 100 ; i++)
    {
        if(returnValue == exclude)
        {
            returnValue = getRandomInt(min,max);   
        }
    }
    return returnValue;
}

var girlNames = [ 'Sophia' , 'Emma' , 'Olivia' , 'Ava' , 'Isabella' , 'Mia' , 
'Zoe' , 'Lily' , 'Emily' , 'Madelyn' , 'Madison' , 'Chloe' , 'Charlotte' , 
'Aubrey' , 'Avery' , 'Abigail' , 'Kaylee' , 'Layla' , 'Harper' , 'Ella' , 
'Amelia' , 'Arianna' , 'Riley' , 'Aria' , 'Hailey' , 'Hannah' , 'Aaliyah' , 
'Evelyn' , 'Addison' , 'Mackenzie' , 'Adalyn' , 'Ellie' , 'Brooklyn' , 'Nora' , 
'Scarlett' , 'Grace' , 'Anna' , 'Isabelle' , 'Natalie' , 'Kaitlyn' , 
'Lillian' , 'Sarah' , 'Audrey' , 'Elizabeth' , 'Leah' , 'Annabelle' , 'Kylie' , 
'Mila' , 'Claire' , 'Victoria' , 'Maya' , 'Lila' , 'Elena' , 'Lucy' , 
'Savannah' , 'Gabriella' , 'Callie' , 'Alaina' , 'Sophie' , 'Makayla' , 
'Kennedy' , 'Sadie' , 'Skyler' , 'Allison' , 'Caroline' , 'Charlie' , 
'Penelope' , 'Alyssa' , 'Peyton' , 'Samantha' , 'Liliana' , 'Bailey' , 'Maria' , 
'Reagan' , 'Violet' , 'Eliana' , 'Adeline' , 'Eva' , 'Stella' , 'Keira' , 
'Katherine' , 'Vivian' , 'Alice' , 'Alexandra' , 'Camilla' , 'Kayla' , 
'Alexis' , 'Sydney' , 'Kaelyn' , 'Jasmine' , 'Julia' , 'Cora' , 'Lauren' , 
'Piper' , 'Gianna' , 'Paisley' , 'Bella' , 'London' , 'Clara' , 'Cadence'];

var boyNames = [ 'Jackson' , 'Aiden' , 'Liam' , 'Lucas' , 'Noah' , 'Mason' , 
'Ethan' , 'Caden' , 'Jacob' , 'Logan' , 'Jayden' , 'Elijah' , 'Jack' , 'Luke' , 
'Michael' , 'Benjamin' , 'Alexander' , 'James' , 'Jayce' , 'Caleb' , 'Connor' , 
'William' , 'Carter' , 'Ryan' , 'Oliver' , 'Matthew' , 'Daniel' , 'Gabriel' , 
'Henry' , 'Owen' , 'Grayson' , 'Dylan' , 'Landon' , 'Isaac' , 'Nicholas' , 
'Wyatt' , 'Nathan' , 'Andrew' , 'Cameron' , 'Dominic' , 'Joshua' , 'Eli' , 
'Sebastian' , 'Hunter' , 'Brayden' , 'David' , 'Samuel' , 'Evan' , 'Gavin' , 
'Christian' , 'Max' , 'Anthony' , 'Joseph' , 'Julian' , 'John' , 'Colton' , 
'Levi' , 'Muhammad' , 'Isaiah' , 'Aaron' , 'Tyler' , 'Charlie' , 'Adam' , 
'Parker' , 'Austin' , 'Thomas' , 'Zachary' , 'Nolan' , 'Alex' , 'Ian' , 
'Jonathan' , 'Christopher' , 'Cooper' , 'Hudson' , 'Miles' , 'Adrian' , 
'Leo' , 'Blake' , 'Lincoln' , 'Jordan' , 'Tristan' , 'Jason' , 'Josiah' , 
'Xavier' , 'Camden' , 'Chase' , 'Declan' , 'Carson' , 'Colin' , 'Brody' , 
'Asher' , 'Jeremiah' , 'Micah' , 'Easton' , 'Xander' , 'Ryder' , 'Nathaniel' , 
'Elliot' , 'Sean' , 'Cole' ];

var surnames = [ 'Smith' , 'Johnson' , 'Williams' , 'Jones' , 'Brown' , 
'Davis' , 'Miller' , 'Wilson' , 'Moore' , 'Taylor' , 'Anderson' , 'Thomas' , 
'Jackson' , 'White' , 'Harris' , 'Martin' , 'Thompson' , 'Garcia' , 
'Martinez' , 'Robinson' , 'Clark' , 'Rodriguez' , 'Lewis' , 'Lee' , 'Walker' , 
'Hall' , 'Allen' , 'Young' , 'Hernandez' , 'King' , 'Wright' , 'Lopez' , 
'Hill' , 'Scott' , 'Green' , 'Adams' , 'Baker' , 'Gonzalez' , 'Nelson' , 
'Carter' , 'Mitchell' , 'Perez' , 'Roberts' , 'Turner' , 'Phillips' , 
'Campbell' , 'Parker' , 'Evans' , 'Edwards' , 'Collins' , 'Stewart' , 
'Sanchez' , 'Morris' , 'Rogers' , 'Reed' , 'Cook' , 'Morgan' , 'Bell' , 
'Murphy' , 'Bailey' , 'Rivera' , 'Cooper' , 'Richardson' , 'Cox' , 'Howard' , 
'Ward' , 'Torres' , 'Peterson' , 'Gray' , 'Ramirez' , 'James' , 'Watson' , 
'Brooks' , 'Kelly' , 'Sanders' , 'Price' , 'Bennett' , 'Wood' , 'Barnes' , 
'Ross' , 'Henderson' , 'Coleman' , 'Jenkins' , 'Perry' , 'Powell' , 'Long' , 
'Patterson' , 'Hughes' , 'Flores' , 'Washington' , 'Butler' , 'Simmons' , 
'Foster' , 'Gonzales' , 'Bryant' , 'Alexander' , 'Russell' , 'Griffin' , 
'Diaz' , 'Hayes'];

function WordProblemSet(name, preposition, group, groupPlural) { 
    this.name = name;
    this.group=group;
    this.preposition = preposition;
    this.groupPlural = groupPlural;
}

function makeWordProblemSet(returnNumber) {
    var setArray = []
    setArray.push(new WordProblemSet("flowers","in","basket","baskets") )
    setArray.push(new WordProblemSet("cookies","in","box","boxes") )
    setArray.push(new WordProblemSet("students","in","class","classes") )
    setArray.push(new WordProblemSet("wolves","in","pack","packs") )
    setArray.push(new WordProblemSet("birds","in","flock","flocks") )
    return setArray[returnNumber]
}

//test

function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*"+]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

