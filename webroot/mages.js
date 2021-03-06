//SEE mages.applets.js for applet definitions
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
var loadScreen1;
var loadScreen2;
var result;
var state='title';
var lastState;
var gridSize = 20;
var titleBack;

var WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
          families: ['Revalia','Orbitron','Michroma']
        }

    };
    
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
    game.load.image('threadButton', 'assets/threadButton.png');
    game.load.image('helpScreen1', 'assets/helpScreen1.png');
    game.load.image('helpScreen2', 'assets/helpScreen2.png');
    game.load.image('helpScreen3', 'assets/helpScreen3.png');
    game.load.image('startCampaignButton', 'assets/startGameButton.png');
    
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
    game.load.image('clockButton1', 'assets/clockButtonNeg1H.png');
    game.load.image('clockButton2', 'assets/clockButtonNeg5M.png');
    game.load.image('clockButton3', 'assets/clockButtonNeg1M.png');
    game.load.image('clockButton4', 'assets/clockButtonPos1M.png');
    game.load.image('clockButton5', 'assets/clockButtonPos5M.png');
    game.load.image('clockButton6', 'assets/clockButtonPos1H.png');
    
    
    //gui stuff
    game.load.image('grid', 'assets/grid.png');
    game.load.image('menuButton', 'assets/menuButton.png');
    game.load.image('arrowLeft', 'assets/arrowLeft.png');
    game.load.image('arrowRight', 'assets/arrowRight.png');
    game.load.image('menuClickBox', 'assets/menuClickBox.png');
    game.load.image('menuTextArea', 'assets/menuTextArea.png');
    game.load.image('menuRandomNumber', 'assets/menuRandomNumber.png');
    game.load.image('menuEvaluatedFraction', 'assets/menuEvaluatedFraction.png');
    game.load.image('menuHundredChart', 'assets/menuHundredChart.png');
    game.load.image('menuDoneButton', 'assets/menuDoneButton.png');
    game.load.image('menuRandomDecimal', 'assets/menuRandomDecimal.png');
    game.load.image('menuClock', 'assets/menuClock.png');
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
    game.load.image('menuTextureArea', 'assets/menuTextureArea.png');
    game.load.image('menuConcreteFractions', 'assets/menuConcreteFractions.png');
    
    //applet images
    game.load.image('dogPawPrint', 'assets/dogPawPrint.png');
    
    //animation assets
    game.load.image('spaceship1', 'assets/warrior1_0.png');
    game.load.image('spaceship2', 'assets/warrior2_0.png');
    game.load.image('spaceship3', 'assets/nightraiderfixed.png');
            //cc3.0 credit dravenx on opengameart for spaceship
    game.load.image('yellowStar', 'assets/starYellow50pix.png');
    game.load.image('starfield', 'assets/starfield.jpg');
    
    game.load.image('smokeParticle', 'assets/shipParts/alienShip/smokeParticle.png');
    game.load.image('nebulaTrail1', 'assets/shipParts/alienShip/nebulaTrail1.png');
    game.load.image('nebulaTrail2', 'assets/shipParts/alienShip/nebulaTrail2.png');
    
    //ship parts
    game.load.image('alienBottomWings1', 'assets/shipParts/alienShip/bottomWings1.png');
    game.load.image('alienBottomWings2', 'assets/shipParts/alienShip/bottomWings2.png');
    game.load.image('alienBottomWings3', 'assets/shipParts/alienShip/bottomWings3.png');
    game.load.image('alienBottomWings4', 'assets/shipParts/alienShip/bottomWings4.png');
    game.load.image('alienBottomWings5', 'assets/shipParts/alienShip/bottomWings5.png');
    game.load.image('alienTailSpire1', 'assets/shipParts/alienShip/tailSpire1.png');
    game.load.image('alienTailSpire2', 'assets/shipParts/alienShip/tailSpire2.png');
    game.load.image('alienFrontSpire1', 'assets/shipParts/alienShip/frontSpire1.png');
    game.load.image('alienFrontSpire2', 'assets/shipParts/alienShip/frontSpire2.png');
    game.load.image('alienFrontSpire3', 'assets/shipParts/alienShip/frontSpire3.png');
    game.load.image('alienFrontSpire4', 'assets/shipParts/alienShip/frontSpire4.png');
    game.load.image('alienHull1', 'assets/shipParts/alienShip/hull1.png');
    game.load.image('alienHull2', 'assets/shipParts/alienShip/hull2.png');
    game.load.image('alienWingGuns1', 'assets/shipParts/alienShip/wingGuns1.png');
    game.load.image('alienWingGuns2', 'assets/shipParts/alienShip/wingGuns2.png');
    game.load.image('alienWingGuns3', 'assets/shipParts/alienShip/wingGuns3.png');
    game.load.image('alienWingGuns4', 'assets/shipParts/alienShip/wingGuns4.png');
    game.load.image('alienWingGuns5', 'assets/shipParts/alienShip/wingGuns5.png');
    game.load.image('alienWingGuns6', 'assets/shipParts/alienShip/wingGuns6.png');
    game.load.image('alienWings1', 'assets/shipParts/alienShip/wings1.png');
    game.load.image('alienWings2', 'assets/shipParts/alienShip/wings2.png');
    game.load.image('alienWings3', 'assets/shipParts/alienShip/wings3.png');
    game.load.image('alienWings4', 'assets/shipParts/alienShip/wings4.png');
    game.load.image('alienTopGunner1', 'assets/shipParts/alienShip/topGunner1.png');
    game.load.image('alienTopGunner2', 'assets/shipParts/alienShip/topGunner2.png');
    game.load.image('alienTopGunner3', 'assets/shipParts/alienShip/topGunner3.png');
    game.load.image('alienTopGunner4', 'assets/shipParts/alienShip/topGunner4.png');
    game.load.image('alienTopGunner5', 'assets/shipParts/alienShip/topGunner5.png');
    game.load.image('alienWindScreen1', 'assets/shipParts/alienShip/windScreen1.png');
    game.load.image('alienWindScreen2', 'assets/shipParts/alienShip/windScreen2.png');
    game.load.image('alienWindScreen3', 'assets/shipParts/alienShip/windScreen3.png');
    game.load.image('alienWindScreen4', 'assets/shipParts/alienShip/windScreen4.png');
    
    game.load.image('bottomWings1', 'assets/shipParts/humanShip/bottomWings1.png');
    game.load.image('bottomWings2', 'assets/shipParts/humanShip/bottomWings2.png');
    game.load.image('bottomWings3', 'assets/shipParts/humanShip/bottomWings3.png');
    game.load.image('bottomWings4', 'assets/shipParts/humanShip/bottomWings4.png');
    game.load.image('bottomWings5', 'assets/shipParts/humanShip/bottomWings5.png');
    game.load.image('bottomWings6', 'assets/shipParts/humanShip/bottomWings6.png');
    game.load.image('bottomWings7', 'assets/shipParts/humanShip/bottomWings7.png');
    game.load.image('bottomWings8', 'assets/shipParts/humanShip/bottomWings8.png');
    game.load.image('bottomWings9', 'assets/shipParts/humanShip/bottomWings9.png');
    game.load.image('bottomWings10', 'assets/shipParts/humanShip/bottomWings10.png');
    
    game.load.image('frontSpire1', 'assets/shipParts/humanShip/frontSpire1.png');
    game.load.image('frontSpire2', 'assets/shipParts/humanShip/frontSpire2.png');
    game.load.image('frontSpire3', 'assets/shipParts/humanShip/frontSpire3.png');
    game.load.image('frontSpire4', 'assets/shipParts/humanShip/frontSpire4.png');
    game.load.image('frontSpire5', 'assets/shipParts/humanShip/frontSpire5.png');
    game.load.image('frontSpire6', 'assets/shipParts/humanShip/frontSpire6.png');
    game.load.image('frontSpire7', 'assets/shipParts/humanShip/frontSpire7.png');
    game.load.image('frontSpire8', 'assets/shipParts/humanShip/frontSpire8.png');
    game.load.image('frontSpire9', 'assets/shipParts/humanShip/frontSpire9.png');
    game.load.image('frontSpire10', 'assets/shipParts/humanShip/frontSpire10.png');
    
    game.load.image('hull1', 'assets/shipParts/humanShip/hull1.png');
    game.load.image('hull2', 'assets/shipParts/humanShip/hull2.png');
    game.load.image('hull3', 'assets/shipParts/humanShip/hull3.png');
    game.load.image('hull4', 'assets/shipParts/humanShip/hull4.png');
    game.load.image('hull5', 'assets/shipParts/humanShip/hull5.png');
    game.load.image('hull6', 'assets/shipParts/humanShip/hull6.png');
    game.load.image('hull7', 'assets/shipParts/humanShip/hull7.png');
    game.load.image('hull8', 'assets/shipParts/humanShip/hull8.png');
    game.load.image('hull9', 'assets/shipParts/humanShip/hull9.png');
    game.load.image('hull10', 'assets/shipParts/humanShip/hull10.png');
    
    game.load.image('tailSpires1', 'assets/shipParts/humanShip/tailSpire1.png');
    game.load.image('tailSpires2', 'assets/shipParts/humanShip/tailSpire2.png');
    game.load.image('tailSpires3', 'assets/shipParts/humanShip/tailSpire3.png');
    game.load.image('tailSpires4', 'assets/shipParts/humanShip/tailSpire4.png');
    game.load.image('tailSpires5', 'assets/shipParts/humanShip/tailSpire5.png');
    game.load.image('tailSpires6', 'assets/shipParts/humanShip/tailSpire6.png');
    game.load.image('tailSpires7', 'assets/shipParts/humanShip/tailSpire7.png');
    game.load.image('tailSpires8', 'assets/shipParts/humanShip/tailSpire8.png');
    game.load.image('tailSpires9', 'assets/shipParts/humanShip/tailSpire9.png');
    game.load.image('tailSpires10', 'assets/shipParts/humanShip/tailSpire10.png');
    
    game.load.image('topGunner1', 'assets/shipParts/humanShip/topGunner1.png');
    game.load.image('topGunner2', 'assets/shipParts/humanShip/topGunner2.png');
    game.load.image('topGunner3', 'assets/shipParts/humanShip/topGunner3.png');
    game.load.image('topGunner4', 'assets/shipParts/humanShip/topGunner4.png');
    game.load.image('topGunner5', 'assets/shipParts/humanShip/topGunner5.png');
    game.load.image('topGunner6', 'assets/shipParts/humanShip/topGunner6.png');
    game.load.image('topGunner7', 'assets/shipParts/humanShip/topGunner7.png');
    game.load.image('topGunner8', 'assets/shipParts/humanShip/topGunner8.png');
    game.load.image('topGunner9', 'assets/shipParts/humanShip/topGunner9.png');
    game.load.image('topGunner10', 'assets/shipParts/humanShip/topGunner10.png');
    
    game.load.image('windScreen1', 'assets/shipParts/humanShip/windScreen1.png');
    game.load.image('windScreen2', 'assets/shipParts/humanShip/windScreen2.png');
    game.load.image('windScreen3', 'assets/shipParts/humanShip/windScreen3.png');
    game.load.image('windScreen4', 'assets/shipParts/humanShip/windScreen4.png');
    game.load.image('windScreen5', 'assets/shipParts/humanShip/windScreen5.png');
    game.load.image('windScreen6', 'assets/shipParts/humanShip/windScreen6.png');
    game.load.image('windScreen7', 'assets/shipParts/humanShip/windScreen7.png');
    game.load.image('windScreen8', 'assets/shipParts/humanShip/windScreen8.png');
    game.load.image('windScreen9', 'assets/shipParts/humanShip/windScreen9.png');
    game.load.image('windScreen10', 'assets/shipParts/humanShip/windScreen10.png');
    
    game.load.image('wingGuns1', 'assets/shipParts/humanShip/wingGuns1.png');
    game.load.image('wingGuns2', 'assets/shipParts/humanShip/wingGuns2.png');
    game.load.image('wingGuns3', 'assets/shipParts/humanShip/wingGuns3.png');
    game.load.image('wingGuns4', 'assets/shipParts/humanShip/wingGuns4.png');
    game.load.image('wingGuns5', 'assets/shipParts/humanShip/wingGuns5.png');
    game.load.image('wingGuns6', 'assets/shipParts/humanShip/wingGuns6.png');
    game.load.image('wingGuns7', 'assets/shipParts/humanShip/wingGuns7.png');
    game.load.image('wingGuns8', 'assets/shipParts/humanShip/wingGuns8.png');
    game.load.image('wingGuns9', 'assets/shipParts/humanShip/wingGuns9.png');
    game.load.image('wingGuns10', 'assets/shipParts/humanShip/wingGuns10.png');
    
    game.load.image('wings1', 'assets/shipParts/humanShip/wings1.png');
    game.load.image('wings2', 'assets/shipParts/humanShip/wings2.png');
    game.load.image('wings3', 'assets/shipParts/humanShip/wings3.png');
    game.load.image('wings4', 'assets/shipParts/humanShip/wings4.png');
    game.load.image('wings5', 'assets/shipParts/humanShip/wings5.png');
    game.load.image('wings6', 'assets/shipParts/humanShip/wings6.png');
    game.load.image('wings7', 'assets/shipParts/humanShip/wings7.png');
    game.load.image('wings8', 'assets/shipParts/humanShip/wings8.png');
    game.load.image('wings9', 'assets/shipParts/humanShip/wings9.png');
    game.load.image('wings10', 'assets/shipParts/humanShip/wings10.png');
    
    
    
    
    
    //battle gui
    game.load.image('battleBack', 'assets/battleBackground.png');
    game.load.image('battleBeam', 'assets/battleBeam.png');
    game.load.image('battleHack', 'assets/battleHack.png');
    game.load.image('battleRetreat', 'assets/battleRetreat.png');
    game.load.image('battleTorpedo', 'assets/battleTorpedo.png');
    game.load.image('battleNavLarge', 'assets/battleNavLarge.png');
    game.load.image('battleNavSmall', 'assets/battleNavSmall.png');
    game.load.image('battlePass', 'assets/battlePass.png');
    game.load.image('battleShipDetailPane', 'assets/battleShipDetailPane.png');
    game.load.image('battleTarget', 'assets/battleTarget.png');
    game.load.image('battleReticule', 'assets/battleReticule.png');
    game.load.image('laserPink', 'assets/laserPink.png');
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.spritesheet('lightning', 'assets/lightning.png', 320, 80);
    
    // c/o opengameartuser Clint Bellanger
    game.load.spritesheet('sparks', 'assets/sparks.png', 64, 64);
    
    
    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    //ship menu
    game.load.image('shipMenuCombatButton', 'assets/shipMenuCombatButton.png');
    game.load.image('shipMenuCommButton', 'assets/shipMenuCommButton.png');
    game.load.image('shipMenuMiningButton', 'assets/shipMenuMiningButton.png');
    game.load.image('shipMenuShipButton', 'assets/shipMenuShipButton.png');
    game.load.image('shipMenuCombatPane', 'assets/shipMenuCombatPane.png');
    game.load.image('shipMenuCommPane', 'assets/shipMenuCommPane.png');
    game.load.image('shipMenuMiningPane', 'assets/shipMenuMiningPane.png');
    game.load.image('shipMenuShipPane', 'assets/shipMenuShipPane.png');
    
    //flare stuff
    game.load.image('stationAgent', 'assets/portraits/stationAgent.png');
    game.load.image('stationAgentMini', 'assets/portraits/stationAgentMini.png');
    game.load.image('emissary', 'assets/portraits/emissary.png');
    game.load.image('emissaryMini', 'assets/portraits/emissaryMini.png');
    game.load.image('engineer', 'assets/portraits/engineer.png');
    game.load.image('engineerMini', 'assets/portraits/engineerMini.png');
    game.load.image('securityAnalyst', 'assets/portraits/securityAnalyst.png');
    game.load.image('securityAnalystMini', 'assets/portraits/securityAnalystMini.png');
    
    game.load.image('spaceStation', 'assets/spaceStation.png');
    game.load.image('stationField', 'assets/stationField.png');
    
    game.load.image('chatBack', 'assets/chatBack.png');
    game.load.image('logoEditConfirmBack', 'assets/logoEditConfirmBack.png');
    game.load.image('logoEditConfirmButton', 'assets/logoEditConfirmButton.png');
    game.load.image('hexCursor', 'assets/hexCursor.png');
    game.load.json('applets', 'applets/applets.json');
    game.load.json('characters', 'characters.json');
    game.load.json('quests', 'quests.json');
    game.load.image('scoreTableButton', 'assets/scoreTableButton.png');
}

function create() {
    titleBack = game.add.sprite(0, 0, 'starfield');
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }}

/*******************************************************************************
 *                                  MAIN LOOP
 * ****************************************************************************/
function update() {
    if(lastState != state)
    {
        lastState = state;
        console.log('state change to ' + state + ' at ' + Math.round(this.game.time.totalElapsedSeconds()*Math.pow(10,2))/Math.pow(10,2) +'s' );
    }
    
    switch(state) {
    case 'loading':
        //function probaly not necessary because we're not loading much sound, but will do anyway
        break;
        
    case 'title':
        title();
        break;
        
    case 'help':
        help();
        //a help screen describing the software's use
        break;
    
    case 'threadSelection':
        //call up an applet by ID
        threadSelection();
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
        
    case 'transition':
        //update the galaxy filter to animate it
        galaxyFilter.update(game.input.mousePointer);
        break;
        
    case 'battle':
        if(battleMode)
        {
            if(threadModeOnly == false)
            {
                if ( battleBackground == null)
                {
                    
                }
                continueBattle();    
                state = 'battling'
                  
            } else
            {
                state = 'applet';
            }
            
        } else
        {
            state = 'applet';
        }
        
        break;
    }
}

/*******************************************************************************
 *                              TITLE SECTION
 * ****************************************************************************/
var titleInitiated=0;
var loadButton;
var threadButton;
var buildButton;
var helpButton;
var threadButton;
var startCampaignButton;
var titleText;
function title() {
    if(titleInitiated==0)
    {
        titleInitiated=1; //only happens once
        loadScreen1.destroy(true);
        loadScreen2.destroy(true);
        //defineApplets();  
        loadThreads();
        titleText = game.add.sprite(game.world.centerX, game.world.centerY-100, 'title');
        titleText.anchor.set(0.5);
        game.add.tween(titleText).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        
        loadButton = game.add.sprite(0, 0, 'loadButton');
        loadButton.x = 100;
        loadButton.y = 400;
        loadButton.inputEnabled='true';
        loadButton.events.onInputDown.add(loadButtonClick, this);
        loadButton.anchor.setTo(0.5, 0.5);
        
        threadButton = game.add.sprite(0, 0, 'threadButton');
        threadButton.x = 300;
        threadButton.y = 400;
        threadButton.inputEnabled='true';
        threadButton.events.onInputDown.add(threadButtonClick, this);
        threadButton.anchor.setTo(0.5, 0.5);
        
        buildButton = game.add.sprite(0, 0, 'buildButton');
        buildButton.x = 500;
        buildButton.y = 400;
        buildButton.inputEnabled='true';
        buildButton.events.onInputDown.add(buildButtonClick, this);
        buildButton.anchor.setTo(0.5, 0.5);
        
        helpButton = game.add.sprite(0, 0, 'helpButton');
        helpButton.x = 700;
        helpButton.y = 400;
        helpButton.inputEnabled='true';
        helpButton.events.onInputDown.add(helpButtonClick, this);
        helpButton.anchor.setTo(0.5, 0.5);
        
        startCampaignButton = game.add.sprite(0, 0, 'startCampaignButton');
        startCampaignButton.x = 400;
        startCampaignButton.y = 500;
        startCampaignButton.inputEnabled='true';
        startCampaignButton.events.onInputDown.add(startCampaignButtonClick, this);
        startCampaignButton.anchor.setTo(0.5, 0.5);
        
    }
}

//the three buttons each change the state
function loadButtonClick() {
    appletSelection();
}

function threadButtonClick() {
    state='threadSelection';
}


function helpButtonClick() {
    helpSprite = game.add.sprite(0, 0, 'helpScreen1');
    state='help';
}

function buildButtonClick() {
    state='build';
}

function startCampaignButtonClick() {
    startGame();
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
    threadButton.destroy(true);
    startCampaignButton.destroy(true);
    appletIDPrompt();  //this is in mages.dialogs.js
}

function threadSelection() {
    helpButton.destroy(true);
    buildButton.destroy(true);
    titleText.destroy(true);
    loadButton.destroy(true);
    threadButton.destroy(true);
    startCampaignButton.destroy(true);
    threadPrompt(); 
}

var appletInitiated = 0;
var appletTests = [];
var appletSummary;
function runApplet() {
    if(appletInitiated==0)
    {
        defineApplet(loadAppletID)
        appletInitiated=1;
        this.game.stage.backgroundColor = '#DDDDDD';
    } else
    {
        /***********************************************************************
         *                  runApplet() MAIN LOOP
         * ********************************************************************/
        dragNumber();
        dragProtractor();
        dragBaseTenBlock();
        dragNumberLineDot();
        advanceTimer();
        dragFractionBar();
        scanKeyboard();
    }
}

//this function loads the applet definition from the json file for the loadApplet() function.
// function defineApplet_bak(loadID) {
//     console.log("retrieving applet data");
//     $.getJSON("applets/applets.json", function(appletData) 
//     {
//         var applet = [];
//         var applet_count = appletData.applets.length;
//         for (var i=0; i < applet_count; i++) 
//         {
//             if(appletData.applets[i].appletID == loadID)  //find the applet that matches the loadID
//             {
//                 var piece_count = appletData.applets[i].pieces.length;
//                 for (var j=0; j < piece_count ; j++) 
//                 {
//                     //build up an applet array of the piece definitions
//                     applet.push(appletData.applets[i].pieces[j]);
//                     if ("doneStatement" in appletData.applets[i]) 
//                     {
//                         appletTests = decodeURIComponent(appletData.applets[i].doneStatement);
//                     }
//                     if ("summary" in appletData.applets[i]) 
//                     {
//                         appletSummary = appletData.applets[i].summary;
//                     }
//                 }
//             }
//         }
    
//     //now that I have an applet array consisting of all the pieces, I can load the applet
//     loadApplet(applet)
//     });
// }

function defineApplet(loadID) {
    var appletData = game.cache.getJSON('applets');
    
    console.log("retrieving applet data");
    var applet = [];
        var applet_count = appletData.applets.length;
        for (var i=0; i < applet_count; i++) 
        {
            if(appletData.applets[i].appletID == loadID)  //find the applet that matches the loadID
            {
                var piece_count = appletData.applets[i].pieces.length;
                for (var j=0; j < piece_count ; j++) 
                {
                    //build up an applet array of the piece definitions
                    applet.push(appletData.applets[i].pieces[j]);
                    if ("doneStatement" in appletData.applets[i]) 
                    {
                        appletTests = decodeURIComponent(appletData.applets[i].doneStatement);
                    }
                    if ("summary" in appletData.applets[i]) 
                    {
                        appletSummary = appletData.applets[i].summary;
                    }
                }
            }
        }
    
    //now that I have an applet array consisting of all the pieces, I can load the applet
    loadApplet(applet)
}

//This loads the widget pieces with applet behaviors in place
function loadApplet(applet) {
    console.log("loading applet: " + loadAppletID + " - " + appletSummary)
    for(var i=0; i < applet.length; i++)
    {
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
            
            case 3: //evaluated fraction
            buildEvaluatedFraction(applet[i]);
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
            if(applet[i].multiType == 1)
            {
                buildMultipleChoiceFractions(applet[i]); 
            } else if(applet[i].multiType == 2)
            {
                buildMultipleChoiceTextures(applet[i]); 
            } else
            { 
                buildMultipleChoiceNumbers(applet[i]);    
            }
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
            
            case 17: //inequality entry 
            buildInequalityEntry(applet[i]);
            break;
            
            case 18: //bar graph
            buildBarGraph(applet[i]);
            break;
            
            case 19: //tTable
            buildtTable(applet[i]);
            break;
            
            case 20: //number line
            buildNumberLine(applet[i]);
            break;
            
            case 21: //texture Area
            buildTextureArea(applet[i]);
            break;
            
            case 22: //timer
            buildTimer(applet[i]);
            break;
            
            case 23: //clock
            buildClock(applet[i]);
            break;
            
            case 24: //fraction bar
            buildFractionBar(applet[i]);
            break;
            
            case 25: //fractionbar dragto
            buildFractionBarDragToBox(applet[i]);
            break;
            
            case 98: //draw line
            buildDrawLine(applet[i]);
            break;
            
            case 99: //draw box
            buildDrawBox(applet[i]);
            break;
            
            } 
        }
    }
    console.log('Finished loading applet at ' + Math.round(this.game.time.totalElapsedSeconds()*Math.pow(10,2))/Math.pow(10,2) +'s' );
}

//this clears the current applet
function clearCurrentApplet()
{
    dragToBoxes.forEach(function(item){
        
        item.destroy(true); 
    });
    dragToBoxes = [];
    
    fractionBarDragToBoxes.forEach(function(item){
        
        item.destroy(true); 
    });
    fractionBarDragToBoxes = [];
    
    
    if (typeof numberLine !== 'undefined') {numberLine.destroy(true)}
    
    numberLineDots.forEach(function(item){
        
        item.destroy(true); 
    });
    numberLineDots = [];
    
    piece.forEach(function(item){
        
        item.destroy(true); 
    });
    piece = [];
    
    draggableNumbers.forEach(function(item){
        
        item.destroy(true); 
    });
    draggableNumbers = [];
    
    baseTenBlocks.forEach(function(item){
        
        item.destroy(true); 
    });
    baseTenBlocks = [];
    
    selectionBoxGraphics.forEach(function(item){
        if (item != null) { item.destroy(true); }
    });
    selectionBoxGraphics = [];
    
    numberEntryPanelText.forEach(function(item){
        item.destroy(true); 
    });
    numberEntryPanelText = [];
    inequality='==';
    
    inequalityEntryText='';
    
    numberEntryPanels.forEach(function(item){
        item.destroy(true); 
    });
    numberEntryPanels = [];

    

    activeEntryPanel = 0;
    numberEntryValue=[];
    numberEntryButtons = [];

    
    evaluatedExpression = [];
    
    randomNumber = [];
    draggablePieces = [];
    multipleSelection = [];
    evaluatedNumerator = [];
    evaluatedDenominator = [];
    evaluatedWhole = [];
    hiddenNumber = [];
    newEvaluatedAnswers = [];
    multipleChoice = [];
    newMultipleChoiceNumbers = [];
    multipleChoiceSelected = null;
    randomDecimal = [];
    randomMixedNumber = [];
    randomNumber = [];

    totalBoxes=0;
    boxesClicked=-1;
    if (typeof inequalityEntryPanelText !== 'undefined') {inequalityEntryPanelText.destroy(true)}
    if (typeof multipleChoiceBox !== 'undefined') {multipleChoiceBox.destroy(true)}
    if (typeof numberEntryPanelBox !== 'undefined') {numberEntryPanelBox.destroy(true)}
    
    timedApplet = 0;


    if(threadMode == 0)
    {
        appletIDPrompt(); 
    } else
    { //this is where #challenge mode goes
        
        
            if(campaignMode == 1)  //battle mode
            {
                    if(timerExists == 0)
                    {
                        if (typeof currentUser.challengesAttempted === 'undefined') 
                                { currentUser.challengesAttempted = 1 }
                        else    { currentUser.challengesAttempted++ }
                
                        if( threadRecord[threadRecord.length-1] > 0.9 ) //close enough
                        {
                            campaignChallenges[currentCampaignChallenge].mastered++;
                        } else
                        {
                            campaignChallenges[currentCampaignChallenge].mastered--;
                            
                            //this was removed to accomodate chronic
                            //if(campaignChallenges[currentCampaignChallenge].mastered < 0)
                            //{campaignChallenges[currentCampaignChallenge].mastered = 0 }
                            
                        }

                        currentUser.campaignChallenges =  campaignChallenges;
                        
                        checkCampaignChallenges();
                        updateUserData();

        
                        
                    } else  //this won't work, we need to repeat the timer applet here, not in the thread
                    {
                      if(timerRecord.length == timerRepetitions)
                      {
                            if (typeof currentUser.challengesAttempted === 'undefined') 
                                { currentUser.challengesAttempted = 1 }
                            else    { currentUser.challengesAttempted++ }
                            
                            var timerRecordTotal = 0;
                            timerRecord.forEach(function(item) {
                                timerRecordTotal += item;
                            });
                            if(timerRecordTotal > 7)
                            {
                                console.log("passed time test")
                                campaignChallenges[currentCampaignChallenge].mastered++; 
                            }
                            checkCampaignChallenges();
                            updateUserData();
                            timerRecord = [];
                            currentCampaignChallenge = getRandomIntExcluding(0,4,currentCampaignChallenge);
                      } else
                      {
                            
                      }

                    }
            }
            else
            {
                if(threadPoint < thread[threadNumber-1].length)
                {
                    if(timerExists == 0)
                    {
                        threadPoint++ ;
                        
                    } else
                    {
                        if(timerRecord.length == timerRepetitions){ 
                            threadPoint++ ; 
                            timerRecord = [];
                        }
    
                    }     
                } else
                {
                    bootbox.alert("Your score: " + calculateThreadPercent() + "%" , 
                    function(){             
                        titleInitiated=0;
                        state='title'; 
                        //reload title background
                    });}
                    
    
                }


        

        
    loadAppletID=thread[threadNumber-1][threadPoint-1];
    appletInitiated=0; 
    }
    
    //this function checks to see if a challenge is mastered and adds the correct next challenge to the campaignChallenges
    function checkCampaignChallenges()
    {
        // This is the Mages adaptive algorithm
        // The user is assigned the first n starting applets.  This number is 
        // static and does not change.  Each applet the mastery level up and down
        // from its initial starting point of 0.  If the mastery reaches the
        // masteryLevel variable, the applet is now mastered, and is removed 
        // from the potential applets.  If the master level reaches the chronicLevel
        // variable, it goes into the chronic stack, and a new applet is added.
        // When an applet is mastered, it has a 1 in chronicFrequency+1 chance of
        // pulling a random applet from the chronic stack, again with a masteryLevel
        // of 0.  Otherwise it pulls the next applet 
        
        
        var masteryLevel = 3;  //the level that determines when an applet has been mastered
        var chronicLevel = -5; //the level that determines when an applet goes chronic
        var chronicFrequency = 2 //0 chosen from 0 to this number
        var chronicsAllowed = 5 //the number of chronics before they repeat
        
        checkFurthestPoint();
        for(var i = 0 ; i < campaignChallenges.length ; i++)
        {
            if( campaignChallenges[i].mastered >= masteryLevel )  //mastery
            {
                console.log("challenge " + i + " mastered")
                
                if (typeof currentUser.challengesMastered === 'undefined') 
                        { currentUser.challengesMastered = 0 }
                else    { currentUser.challengesMastered++ }
                
                
                campaignChallenges.splice(i,1)
                if (typeof currentUser.chronics === 'undefined')
                { currentUser.chronics = [] }
                
                
                if(getRandomInt(0,chronicFrequency) == 0 && currentUser.chronics.length > 1 ) //pull a chronic
                {
                    console.log("adding a chronic")
                    campaignChallenges.unshift(currentUser.chronics.splice(getRandomInt(0,currentUser.chronics.length-1),1)[0][0])
                } else
                {
                    console.log("adding " + addPoint)
                    campaignChallenges.push({threadNumber:addPoint[0] , threadPoint:addPoint[1] , mastered:0}) 
                    checkFurthestPoint();
                }
                
                
            }
            
            if( campaignChallenges[i].mastered <= chronicLevel )  //chronic
            {
                console.log("challenge " + i + " chronic; adding " + addPoint)
                campaignChallenges[i].mastered = 0; //reset for next time it gets added
                
                if (typeof currentUser.chronics === 'undefined') 
                        { currentUser.chronics =   [campaignChallenges.splice(i,1)] }
                else    { currentUser.chronics.push(campaignChallenges.splice(i,1))}
                
                campaignChallenges.push({threadNumber:addPoint[0] , threadPoint:addPoint[1] , mastered:0})
                checkFurthestPoint();
                
            }
              
        }
    currentUser.campaignChallenges = campaignChallenges;
    currentCampaignChallenge = getRandomIntExcluding(0,4,currentCampaignChallenge);
    threadNumber =campaignChallenges[currentCampaignChallenge].threadNumber;
    threadPoint = campaignChallenges[currentCampaignChallenge].threadPoint;
    }
    
    function checkFurthestPoint()
        {
            if(campaignFurthestPoint[0] < campaignChallenges[campaignChallenges.length-1].threadNumber || campaignFurthestPoint[1] < campaignChallenges[campaignChallenges.length-1].threadPoint)
            {
                campaignFurthestPoint = [ campaignChallenges[campaignChallenges.length-1].threadNumber , campaignChallenges[campaignChallenges.length-1].threadPoint]; 
                console.log("new furthest point: " + campaignFurthestPoint )
            }
            
            addPoint = [ parseInt(campaignFurthestPoint[0]) , parseInt(campaignFurthestPoint[1])+1];
            console.log("next add point: " + addPoint)
            if(addPoint[1] > thread[campaignChallenges[campaignChallenges.length-1].threadNumber-1].length)
            { 
                addPoint = [ parseInt(campaignChallenges[campaignChallenges.length-1].threadNumber)+1 , 1]
                console.log("addpoint past end of thread; new add point: " + addPoint)
            }   
        }
    
    
}

function updateUserData()
    {
        if(networkStorage)
        {
            console.log(currentUser.lastLogoEdit)
            if(typeof currentUser.lastLogoEdit !== 'undefined')
            {
                currentUser.lastLogoEdit = currentUser.lastLogoEdit.toString();   
            }
            
            game.ref.child("users").child(game.authData.google.id).set({
              userData:currentUser,
              credits:currentUser.credits,
              challengesMastered:currentUser.challengesMastered,
              battlesWon:currentUser.battlesWon
            });
            console.log("Network Userdata updated");
        } else
        {
            localStorage.setObject(currentUser.name,currentUser);
            console.log("Local Userdata updated");
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
    drawLine();
}

//run at the beginning of build
function setupCanvas() {
    titleBack.destroy(true);
    helpButton.destroy(true);
    buildButton.destroy(true);
    titleText.destroy(true);
    loadButton.destroy(true);
    threadButton.destroy(true);
    startCampaignButton.destroy(true);
    var background = game.add.sprite(0, 0, 'grid');
    defineMenu();
    buildState='';
}

function buildOnApplet() {
    defineMenu();
    buildState='';
    state='build'
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
        game.add.sprite(50 , 300, 'menuEvaluatedFraction'),
        game.add.sprite(300, 300, 'menuHundredChart'),
        game.add.sprite(550, 300, 'menuDoneButton'),
        ];

    menu1=[//PAGE 2 
        game.add.sprite(50 , 50, 'menuRandomDecimal'),
        game.add.sprite(300, 50, 'menuClock'),
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
        game.add.sprite(50 , 300, 'menuTextureArea'),
        game.add.sprite(300, 300, 'menuConcreteFractions'),
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
        if (typeof colorSwatchHandle === 'undefined') 
            { } else
            {
                colorSwatchHandle.destroy()  
            }
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
            getClickBoxSettings();
            break;
            
            case 1:  //text area
            getTextAreaSettings(); //in mages.dialogs.js
            break;
            
            case 2: //random number
            getRandomNumberSettings(); //in mages.dialogs.js
            break;
            
            case 3:  //random fraction
            getEvaluatedFractionSettings(); //in mages.dialogs.js
            break;
            
            case 4: //hundred chart
            getHundredChartSettings();
            break;
            
            case 5:  //done button
            buildDoneButton();
            break;
            
            case 6:  //random decimal
            getRandomDecimalSettings(); //in mages.dialogs.js
            break;
            
            case 7:  //random mixed number
            getClockSettings(); 
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
            
            case 21:  //texture area
            getTextureAreaSettings() //in mages.dialogs.js
            break;
            
            case 22:  //texture area
            getConcreteFractionTypeTypeSetting() //in mages.dialogs.js
            break;
        }
        if(state != 'prompt')
        {
            adjustNewPiece();
        }
        
    }
}


//common attributes for most pieces
//this sucks and I should get rid of it
function adjustNewPiece() {
    draggingPiece = piece[piece.length-1];
   //draggingPiece.id=this.id;
    //draggingPiece = piece[piece.length-1];
    draggingPiece.inputEnabled='true';
    
    if(piece[piece.length-1].grouped != 1)
    {
        if(piece[piece.length-1].type !=1  && piece[piece.length-1].type !=2 &&  piece[piece.length-1].type !=11 &&  piece[piece.length-1].type !='14b' &&  piece[piece.length-1].type !='17b' &&  piece[piece.length-1].type !=19 &&  piece[piece.length-1].type !=24 &&  piece[piece.length-1].type !=25) //text is achored left
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
        buildState="";
        dragging=0 ;
        menuKeyPressed =0;
        
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

function buildRedragPiece(item){

    console.log("dragging")
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
         *          PIECE APPLET RUNTIME BEHAVIORS
         * ********************************************************************/
        



var selectionBoxGraphics = []
function clickSelectable(item) {
    if(item.selected == 0)
    {
        item.selected = true;
        selectionBoxGraphics[item.selectionSlot] = game.add.graphics(item.x+item.dragOffsetX, item.y+item.dragOffsetY);   
        selectionBoxGraphics[item.selectionSlot].lineStyle(2, 0x0000FF, 1);
        selectionBoxGraphics[item.selectionSlot].drawRect(-10, -10, item.width+20, item.height+20);
    } else
    {
        item.selected = false;
        selectionBoxGraphics[item.selectionSlot].clear();
    }
}

var multipleSelection = []; 
function selectableScore() {
    var score = 0;
    if(multipleSelection.length > 0)
    {
        for(var i = 0; i < multipleSelection.length; i++) {
            if(multipleSelection[i].selected == eval(decodeURIComponent(multipleSelection[i].selectedExpression) ) )
            {
                score++
            }
        }
        return score/multipleSelection.length 
    } else
    {
        return null
    }
}

function addSelectionBehavior() {
    if(state!='build')
    {
        piece[piece.length-1].selectionSlot = multipleSelection.length
        multipleSelection.push(piece[piece.length-1])
        selectionBoxGraphics.push(null)
        piece[piece.length-1].selected = 0;
        piece[piece.length-1].inputEnabled='true';
        piece[piece.length-1].input.useHandCursor=true;
        piece[piece.length-1].events.onInputDown.add(clickSelectable, this);
    }
    if(state=='build') {getSelectionExpressionSettings(); }//in mages.dialogs.js 
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
    item.events.onInputDown.remove(evaluatedExpressionClickClone, this);
    if (item.occupying != null && item.type!=52) //I'm in a box already
    {//clear the box
        dragToBoxes[item.occupying].occupied=0;  
        dragToBoxes[item.occupying].contents= null;
        dragToBoxes[item.occupying].contentsID = null;
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
            dragToBoxes[i].contentsID = item.contentsID;
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
    return getRandomIntExcluding(answer-proximity,answer+proximity,answer)
}



function render () {
    //game.debug.text("Mages Public Alpha.47 - Start campaign to demo.", 10, 20);
    //game.debug.text(battleTargetting, 10, 20);
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
    var returnString = num;
    if(num > 999)
    {
        returnString = "";
        num = num.toString();
        
        for(var i = 0; i < num.length ; i++) {
            returnString += Number(num.charAt(i))
            if( i<num.length-1 && (num.length-i-1)%3==0) {
                returnString += ','
            }
        }   
    }
    
    return returnString;
}

function quotientWithRemainder(dividend,divisor) 
{
    return addCommas(Math.floor(dividend/divisor)) + ' R' + (dividend%divisor)
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
        if($.isArray(exclude))
        {
            var matched = 0;
            exclude.forEach(function(item) { 
                if(returnValue == item)
                {
                    matched = 1;
                } 
            }); 
            
            if(matched == 0)
                {
                  return returnValue;  
                } else
                {
                  return getRandomIntExcluding(min, max, exclude) 
                }
        } else
        {
            if(returnValue == exclude)
            {
                return getRandomIntExcluding(min, max, exclude)
            } else
            {
                return returnValue;  
            }
            
        }
        
    
}

function getFunctionExcluding(outputFunction, args, exclude) {
    var returnValue = outputFunction(args);
    for(var i = 1 ; i < 100 ; i++)
    {
        if(exclude.toString().length == 1)
        {
            if(returnValue == exclude)
            {
            returnValue = outputFunction(args);   
            }    
        } else
        {
            exclude.forEach(function(item) { 
            if(returnValue == item)
            {
                returnValue = outputFunction(args);   
            }
            });   
        }
        
    }
    return returnValue;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getLeastFactors(number)
{
    var factors = [];
    for (var i = 1 ; i <= Math.sqrt(number) ; i++ )
    {
        if((number/i) % 1 === 0)
        {
            factors = [i , number/i]
        }
    }
    return factors; 
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

function randomName () {
    return (getRandomInt(0,1)==0?boyNames[getRandomInt(0,99)] : girlNames[getRandomInt(0,99)])
}

function getPrimeComposite(prime) {
    var returnValue;
    
    if(prime == 1)
    {
        returnValue = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97][getRandomInt(0,24)]
    } else
    {
        returnValue = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 57, 58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74, 75, 76, 77, 78, 80, 81, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99 , 100][getRandomInt(0,73)] 
    }
    return returnValue;
}


function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

var treeTypes = ['Ash', 'Birch' , 'Cherry' , 'Elm' , 'Fir' , 'Hickory' , 'Larch' , 'Locus' , 'Maple' , 'Oak' , 'Pine' , 'Spruce' , 'Willow']

var rainbow = [0xFF0000 , 0xFFA500 , 0xFFFF00 , 0x008000 , 0x0000FF , 0x4B0082 , 0xEE82EE]

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
function modulus(dividend, divisor)
{
    return(dividend%divisor)
}

function lineDistance( point1, point2 )
    {
      var xs = 0;
      var ys = 0;
      
      xs = point2.x - point1.x;
      xs = xs * xs;
     
      ys = point2.y - point1.y;
      ys = ys * ys;
     
      return Math.sqrt( xs + ys );
    }

function angleBetweenPoints(p1, p2)
{
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}
function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*"+]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}



var colorSwatchHandle;
function colorSwatch() {
    if (typeof colorSwatchHandle === 'undefined') 
    { } else
    {
      colorSwatchHandle.destroy()  
    }
    var boxX = 5
    var boxY = 425
    colorSwatchHandle = game.add.group();
    var swatchBox = game.add.graphics(boxX, boxY);
    swatchBox.beginFill(0xD0D0D0);
    swatchBox.lineStyle(2, 0x000000, 1);
    swatchBox.drawRect(0, 0, 128, 173);
    swatchBox.endFill();
    colorSwatchHandle.add(swatchBox)
    //swatchBox.clear()
    
    var swatchColorBox;
    var swatchColorSprite;
    var rowLength;
    var tints = [0x000000, 0xFFFFFF];
    var tintNumber = 0;
    var frequency = .15;
    
    
    var redFrequency = .1;
    var grnFrequency = .1;
    var bluFrequency = .1;
    var center = 255;
    var width = 0;
 
    //http://krazydad.com/tutorials/makecolors.php
    for (var i = 0; i < 32; ++i)
    {
       red   = Math.sin(redFrequency*i + 0) * center + width;
       green = Math.sin(grnFrequency*i + 2*Math.PI/3) * center + width;
       blue  = Math.sin(bluFrequency*i + 4*Math.PI/3) * center + width;
    
       tints.push(RGB2Color(red,green,blue))
    }


    for(var i = 0; i<9 ; i++)
    {
        

        if(i==0)
        {
            rowLength=2;   
        } else if(i < 5)
        {
            rowLength++;
        } else
        {
            rowLength--;
        }
        
        for (var j = 0; j < rowLength; j++)
        {
            var swatchColorHex = game.add.graphics(0, 0);

            swatchColorHex.beginFill(tints[tintNumber])
            var currentTint = tints[tintNumber];
            tintNumber++;
    
            swatchColorHex.lineStyle(1, 0x000000, 1);
            var points = [  new Phaser.Point(10,0),
                        new Phaser.Point(5,-9),
                        new Phaser.Point(-5,-9),
                        new Phaser.Point(-10,0),
                        new Phaser.Point(-5,9),
                        new Phaser.Point(5,9)
                        ]
            swatchColorHex.drawPolygon(points);
            
            swatchColorSprite = game.add.sprite(boxX+50+j*20+(i<5?-i*10:i*10-80), boxY+i*18,swatchColorHex.generateTexture() ) 
            swatchColorSprite.angle += 30;
            swatchColorSprite.color = currentTint;
            swatchColorSprite.inputEnabled='true';
            swatchColorSprite.events.onInputDown.add(colorSwatchColorClick, this);
    
            colorSwatchHandle.add(swatchColorSprite ) 
            swatchColorHex.clear()
        }    
    }
    
    function RGB2Color(r,g,b)
      {
        return '0x' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
      }   
    function byte2Hex(n)
      {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
      }
}

var lastLineColor = 0x000000
function colorSwatchColorClick(item) {
    switch(piece[piece.length-1].type) {
        case 99:
            var drawingBoxGraphic = game.add.graphics(0, 0);
            drawingBoxGraphic.lineStyle(2, item.color, 1);
            drawingBoxGraphic.drawRect(piece[piece.length-1].drawingBoxStartX, piece[piece.length-1].drawingBoxStartY, piece[piece.length-1].drawingBoxEndX-piece[piece.length-1].drawingBoxStartX, piece[piece.length-1].drawingBoxEndY-piece[piece.length-1].drawingBoxStartY);
            piece[piece.length-1].loadTexture(drawingBoxGraphic.generateTexture(), 0);
            drawingBoxGraphic.clear();
            break;
        case 98:
            var drawingLineGraphic = game.add.graphics(0, 0);
            drawingLineGraphic.lineStyle(2, item.color, 1);
            drawingLineGraphic.moveTo(piece[piece.length-1].drawingLineEndX, piece[piece.length-1].drawingLineEndY)
            drawingLineGraphic.lineTo(piece[piece.length-1].drawingLineStartX, piece[piece.length-1].drawingLineStartY)
            piece[piece.length-1].loadTexture(drawingLineGraphic.generateTexture());
            drawingLineGraphic.clear();
            break;
    }
    lastLineColor = item.color
    piece[piece.length-1].color = item.color;
    colorSwatchHandle.destroy()

}

