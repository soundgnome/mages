var battleMode = true;
var battleBackground = null;
var battleButtons = [];
var battleOrders = null;
var battleShips = [];
var battleCombatLabels = [];

var arenaLeftEdge = 275
var arenaTopEdge = 110
var arenaGridSpacing = 35;
var arenaRightEdge = arenaLeftEdge + 12*arenaGridSpacing
var arenaBottomEdge = arenaTopEdge + 12*arenaGridSpacing

function continueBattle()
{
    
    if ( battleBackground == null) //redraw the battle arena
    {
        console.log("adding image")
        var buttonPoint = new Phaser.Point(88,120);
        battleBackground = game.add.sprite(0, 0, 'battleBack');
        battleButtons.push(game.add.sprite(buttonPoint.x-50, buttonPoint.y, 'battleTorpedo'))
        battleButtons.push(game.add.sprite(buttonPoint.x+50, buttonPoint.y, 'battleBeam'))
        battleButtons.push(game.add.sprite(buttonPoint.x, buttonPoint.y+80, 'battleRetreat'))
        battleButtons.push(game.add.sprite(buttonPoint.x, buttonPoint.y-60, 'battleHack'))
        
        buttonPoint = new Phaser.Point(88,470);
        battleButtons.push(game.add.sprite(buttonPoint.x, buttonPoint.y+60, 'battleNavLarge'))
        battleButtons[battleButtons.length-1].angle=180;
        battleButtons.push(game.add.sprite(buttonPoint.x, buttonPoint.y-60, 'battleNavLarge'))
        battleButtons[battleButtons.length-1].angle=0;
        battleButtons.push(game.add.sprite(buttonPoint.x-60, buttonPoint.y, 'battleNavLarge'))
        battleButtons[battleButtons.length-1].angle=270;
        battleButtons.push(game.add.sprite(buttonPoint.x+60, buttonPoint.y, 'battleNavLarge'))
        battleButtons[battleButtons.length-1].angle=90;
        
        battleButtons.push(game.add.sprite(buttonPoint.x-53, buttonPoint.y+53, 'battleNavSmall'))
        battleButtons[battleButtons.length-1].angle=225;
        battleButtons.push(game.add.sprite(buttonPoint.x+53, buttonPoint.y-53, 'battleNavSmall'))
        battleButtons[battleButtons.length-1].angle=45;
        battleButtons.push(game.add.sprite(buttonPoint.x-53, buttonPoint.y-53, 'battleNavSmall'))
        battleButtons[battleButtons.length-1].angle=315;
        battleButtons.push(game.add.sprite(buttonPoint.x+53, buttonPoint.y+53, 'battleNavSmall'))
        battleButtons[battleButtons.length-1].angle=135;
        
        var buttonID = 0;
        battleButtons.forEach(function(item){
            item.buttonID = buttonID;
            buttonID++;
            item.inputEnabled='true';
            item.anchor.setTo(0.5,0.5)
            item.events.onInputDown.add(battleButtonClick, item);
            item.events.onInputOver.add(battleButtonOver, item);
            item.events.onInputOut.add(battleButtonOut, item);
        });
        
        battleCombatLabels.push( game.add.text(88, 270, "COMBAT") ) ; 
        battleCombatLabels[0].anchor.setTo(0.5,0.5);
        battleCombatLabels[0].font = 'Michroma';
        battleCombatLabels[0].fontSize = 24;
        battleCombatLabels[0].fill = '#FF0000';
        battleCombatLabels[0].align = 'center';
        
        battleCombatLabels.push( game.add.text(88, 355, "NAVIGATION") ) ; 
        battleCombatLabels[1].anchor.setTo(0.5,0.5);
        battleCombatLabels[1].font = 'Michroma';
        battleCombatLabels[1].fontSize = 17;
        battleCombatLabels[1].fill = '#FF6600';
        battleCombatLabels[1].align = 'center';
        

        
        //this needs to build ships to order
        if(battleShips.length == 0) //no ship sprites created yet
        {
            battleShips.push(game.add.sprite(arenaLeftEdge + 6*arenaGridSpacing, arenaTopEdge + 12*arenaGridSpacing, buildShip(0.5,[255,255,255]) ))
            battleShips[0].moving = false;
            
            var enemies = 3;
            battleShips.push(game.add.sprite(arenaLeftEdge + 6*arenaGridSpacing, arenaTopEdge + 1*arenaGridSpacing, buildShip(0.5,[0,255,0]) ))
            if(enemies > 1)
            {
            battleShips.push(game.add.sprite(arenaLeftEdge + 0*arenaGridSpacing, arenaTopEdge + 0*arenaGridSpacing, buildShip(0.5,[0,255,0]) ))    
            }
            if(enemies > 2)
            {
            battleShips.push(game.add.sprite(arenaLeftEdge + 8*arenaGridSpacing, arenaTopEdge + 0*arenaGridSpacing, buildShip(0.5,[0,255,0]) ))    
            }
            
            battleShips.forEach(function(item){
                item.anchor.setTo(0.5,0.5);
                item.scale.setTo(0.2,0.2)
            });    
            for(var i = 1 ; i < battleShips.length ; i ++ )
            {
                battleShips[i].angle=180
                battleShips[i].inputEnabled='true';
                battleShips[i].enemyID=i;
                battleShips[i].events.onInputDown.add(enemyShipClick, battleShips[i]);
            }
        }   
        
        //just make them appear again; we're continuing battle
       battleShips.forEach(function(item){
            item.alpha=1;
            item.bringToTop()
            item.gridLocation = new Phaser.Point( (item.x-arenaLeftEdge)/arenaGridSpacing , (item.y-arenaTopEdge)/arenaGridSpacing);
            if(typeof item.shakeTween === 'undefined') {shakeShip(item)  }
              
           
       });  
        
        
        
        battleDrawn = 1;
        showPlayerAttack(); 
        if(playerMovePending !=null)
        {
            movePlayerAnimation(playerMovePending.xSpaces,playerMovePending.ySpaces);    
        }
       
    } else  //we've already drawn the arena and ships
    {

        //   //if playerAttackDone == false
        
    }

}

var playerAttackDone = true;
function showPlayerAttack() {
    if(playerAttackDone == false)
    {
        //player attack animation
        var newAngle = angleBetweenPoints(battleShips[0], battleShips[battleTargetting] )+90
        var tweenAngle = game.add.tween(battleShips[0]).to( { angle: newAngle}, 500, Phaser.Easing.Cubic.Out, true);
        tweenAngle.onComplete.add(projectileMove); 
        
        function projectileMove()
        {
            var torpedo = game.add.sprite(battleShips[0].x, battleShips[0].y, 'alienWingGuns2');
            torpedo.scale.setTo(0.5,0.2);
            torpedo.anchor.setTo(0.5,1);
            torpedo.angle = angleBetweenPoints(battleShips[0], battleShips[battleTargetting])+90
            torpedo.hit = ( threadRecord[threadRecord.length-1] > 0.9 ? true : false)
            var distance = lineDistance(battleShips[0], battleShips[battleTargetting]);
            
            var tween = game.add.tween(torpedo).to( { x: battleShips[battleTargetting].x + (torpedo.hit==true ? 0 : getRandomInt(20,40)), y: battleShips[battleTargetting].y + (torpedo.hit==true ? 0 : getRandomInt(20,40))}, distance*3, Phaser.Easing.Quartic.In, true);
            tween.onComplete.add(finishPlayerAttackAnimation, torpedo);
            battleShips[0].bringToTop()    
        }

    } 
    
    function finishPlayerAttackAnimation(torpedo)
    {
       playerAttackDone = true; 
       showEnemyAttacks(0);
       torpedo.destroy();
       battleTargetting = false;
       console.log(torpedo.hit==true?"HIT!":"MISS!")
       if(torpedo.hit)
       {
           cameraShake(5);
       }
    }
}

function showEnemyAttacks(enemyPosition) {
    if(enemyPosition < battleShips.length-1)  //still enemies to attack
    {
        //enemy attack animations using enemy position as index
        showEnemyAttacks(enemyPosition+1);  //next one
    } else  //there is no next one
    {
        if(battleOrders == null)
        {
            //shakeShips() 
           //wait for player to order attack
        } else
        {
            //into math animation
            clearBattle(); 
        }  
    }

}


        
function shakeShip(ship) {
        var min = -2;
        var max = 2;
        var newX = ship.gridLocation.x*arenaGridSpacing+arenaLeftEdge + Math.floor(Math.random() * (max - min + 1)) + min;
        var newY = ship.gridLocation.y*arenaGridSpacing+arenaTopEdge + Math.floor(Math.random() * (max - min + 1)) + min;
        ship.shakeTween = game.add.tween(ship).to( { x: newX, y: newY}, getRandomInt(1000,2000), Phaser.Easing.Linear.Out, true);
        ship.shakeTween.onComplete.add(shakeShip, ship);     
}
    
    

function clearBattle() {
    battleBackground.destroy(true);
    battleButtons.forEach(function(item){
            item.destroy(true)
        });
    battleShips.forEach(function(item){
            item.alpha=0
        });
    battleCombatLabels[0].destroy();
    battleCombatLabels[1].destroy();
    battleCombatLabels = [];
    battleBackground = null;
    battleOrders = null; 
    battleButtons = [];
    state='applet';
}

var battleShipDetailPane = null
var targetButton = null;
function enemyShipClick(item) {
    if(battleShipDetailPane == null)
    {
        battleShipDetailPane = game.add.sprite(item.x-(item.width/2)-3, item.y-5, 'battleShipDetailPane');
        battleShipDetailPane.enemyID = item.enemyID;
    } else if(battleShipDetailPane.enemyID == item.enemyID)
    {
        battleShipDetailPane.destroy(true);
        battleShipDetailPane = null
        targetButton = null;
    } else
    {
        battleShipDetailPane.destroy(true);
        battleShipDetailPane = game.add.sprite(item.x-(item.width/2)-3, item.y-5, 'battleShipDetailPane');
        battleShipDetailPane.scale.setTo(0.1,0.9);
        battleShipDetailPane.enemyID = item.enemyID;
    }
    if(battleShipDetailPane != null)
    {
        battleShipDetailPane.anchor.setTo(1,0) 
        battleShipDetailPane.scale.setTo(0.1,0.9);
        var tween = game.add.tween(battleShipDetailPane.scale).to( { x: .9, y: .9}, 300, Phaser.Easing.Sinusoidal.Out, true);
        tween.onComplete.add(populateDetailPane); 
    }
    
    function populateDetailPane() 
    {
        if(battleShipDetailPane != null) //maybe we disappeared it by clicking twice quickly
        {
            console.log(item)
            var modelShipShadow = game.add.sprite(-195, 20, item.generateTexture());
            modelShipShadow.scale.setTo(0.45,0.45);
            modelShipShadow.anchor.setTo(0.45,-0.05)  //this is slightly different from the model that's casting it
            modelShipShadow.tint = 0x000000; //black shadow
            battleShipDetailPane.addChild(modelShipShadow);
            
            var modelShip = game.add.sprite(-195, 20, item.generateTexture());
            modelShip.scale.setTo(0.45,0.45);
            modelShip.anchor.setTo(0.5,0)
            battleShipDetailPane.addChild(modelShip);
            

            
        }
        if(battleTargetting != false)
        {
            //add a targetting button
            targetButton = game.add.sprite(-135, 150, 'battleTarget');
            targetButton.scale.setTo(.9,.9);
            targetButton.anchor.setTo(0.5,0.5)
            targetButton.inputEnabled='true'
            targetButton.events.onInputDown.add(battleTargetClick, targetButton);
            targetButton.events.onInputOver.add(battleTargetOver, item);
            targetButton.events.onInputOut.add(battleTargetOut, item);
            battleShipDetailPane.addChild(targetButton);
            console.log("ready to target")
        }
        function battleTargetClick(targetButton)
        {
            console.log("attack!")
            battleTargetting = battleShipDetailPane.enemyID;
            battleShipDetailPane.destroy(true);
            battleShipDetailPane = null
            targetButton = null;
            playerAttackDone = false;
            battleOrders = 'complete'
            clearBattle(); 
        }
        
        function battleTargetOver(targetButton)
        {
            targetButton.scale.setTo(1,1);
            targetButton.tint = 0xFF0020;
        }
        
        function battleTargetOut(targetButton)
        {
            targetButton.scale.setTo(.9,.9);
            targetButton.tint = 0xFFFFFF;
        }

    }
}

function battleButtonClick(item) {
    switch(item.buttonID) 
    {
        case 0: //torpedo
            playerTargetting(item.buttonID)
            break;
        
        case 1: //beam
            playerTargetting(item.buttonID)
            break;
        
        case 2: //retreat
            playerTargetting(item.buttonID)  //this needs to be another function
            break;
        
        case 3: //hacker
            playerTargetting(item.buttonID)
            break;
            
        case 4: //back
            checkPlayerMove(0, 1)
            break;
            
        case 5: //forward
            checkPlayerMove(0, -1)
            break;
        
        case 6: //left
            checkPlayerMove(-1, 0)
            break;
            
        case 7: //right
            checkPlayerMove(1, 0)
            break;
            
        case 8: //back-left
            checkPlayerMove(-1, 1)
            break;
            
        case 9: //forward-right
            checkPlayerMove(1, -1)
            break;
            
        case 10: //forward-left
            checkPlayerMove(-1, -1)
            break;
            
        case 11: //back-right
            checkPlayerMove(1, 1)
            break;

        default:
            battleOrders = item.buttonID; 
    }
}

var playerMovePending = null
function checkPlayerMove(xSpaces, ySpaces)
{
    if( battleShips[0].gridLocation.x+xSpaces <= (arenaRightEdge-arenaLeftEdge) / arenaGridSpacing 
            && battleShips[0].gridLocation.x+xSpaces >= 0 
            && battleShips[0].gridLocation.y+ySpaces <= (arenaBottomEdge-arenaTopEdge) / arenaGridSpacing 
            && battleShips[0].gridLocation.y+ySpaces >= 0)
        {
            playerMovePending = { xSpaces:xSpaces , ySpaces:ySpaces}
            clearBattle();
        }
        
}

function movePlayerAnimation(xSpaces, ySpaces)
{
    if(battleShips[0].moving == false)
    {
        if( threadRecord[threadRecord.length-1] > 0.9 ? true : false)
        {
            playerMovePending = null;
            var newAngle = angleBetweenPoints(battleShips[0], { x: battleShips[0].x+xSpaces*arenaGridSpacing , y: battleShips[0].y+ySpaces*arenaGridSpacing } )+90
            console.log(newAngle)
            var tweenAngle = game.add.tween(battleShips[0]).to( { angle: newAngle}, 500, Phaser.Easing.Cubic.Out, true);
            tweenAngle.onComplete.add(animateMove); 
                
            function animateMove()
            {
                console.log(battleShips[0].angle)
                battleShips[0].shakeTween.stop();
                battleShips[0].moving = true;
                var tween = game.add.tween(battleShips[0]).to( { x: battleShips[0].x+xSpaces*arenaGridSpacing , y: battleShips[0].y+ySpaces*arenaGridSpacing }, 1500, Phaser.Easing.Cubic.Out, true);
                tween.onComplete.add(resetPlayerGridLocation);     
            }

            function resetPlayerGridLocation() 
            {
                battleShips[0].gridLocation = new Phaser.Point( (battleShips[0].x-arenaLeftEdge)/arenaGridSpacing , (battleShips[0].y-arenaTopEdge)/arenaGridSpacing)
                battleOrders = 'complete'
                battleShips[0].moving = false;
                shakeShip(battleShips[0])
            }
        }   
    }
    
}

function battleButtonOver(item){
    if(battleTargetting == false)
    {
        if(battleShipDetailPane != null)
        {
            battleShipDetailPane.destroy(true);
            battleShipDetailPane = null   
        }

        
        battleButtons.forEach(function(button){
            button.tint = 0xFFFFFF;
            button.scale.setTo(1)
        });
        console.log(item.buttonID)
        if(item.buttonID<4)
        {
          item.tint = 0xFF0000;  
        } else
        {
           item.tint = 0x00FF00;   
        }
        
        item.scale.setTo(1.1)
    
    }

}

function battleButtonOut(item){
    if(battleTargetting == false)
    {
        item.tint = 0xFFFFFF;
        item.scale.setTo(1)    
    }
    
}

var battleTargetting = false;  
function playerTargetting(buttonID) {
    if(battleTargetting == false)
    {
        battleTargetting = buttonID+1; //cannot be 0 due to implicit conversion of 0 to false
        battleButtons[buttonID].tint = 0xFF0000;
        battleButtons[buttonID].scale.setTo(1)
    } else if(battleTargetting-1 == buttonID)
    {
        battleTargetting = false;
        battleButtons[buttonID].tint = 0xFFFFFF;
    } else
    {
        battleButtons[battleTargetting-1].tint = 0xFFFFFF;
        battleTargetting = buttonID+1;
        battleButtons[buttonID].tint = 0xFF0000;
        battleButtons[buttonID].scale.setTo(1)
    }
}

var totalShakes = null;
function cameraShake(shakes) {
    if(totalShakes == null)
    {
        totalShakes = shakes;
    }
    console.log("shaking " + shakes + " times")
    if(shakes > 0)
    {
        console.log(shakes)
        var min = -100*shakes/totalShakes;
        var max = 100*shakes/totalShakes;
        var range = Math.abs(min-max)
        game.world.setBounds(-range/2, -range/2, game.width+range, game.height+range);
        game.stage.backgroundColor = 0x000000;
        var newX = Math.floor(Math.random() * (max - min + 1)) + min ;
        var newY = Math.floor(Math.random() * (max - min + 1)) + min ;
        console.log("going to: " + newX + " , " + newY)
        var tween = game.add.tween(this.game.camera).to( { x: newX , y: newY }, getRandomInt(10,200), Phaser.Easing.Bounce.Out, true);
        shakes = shakes -1
        console.log(shakes)
        tween.onComplete.add(reshakeCamera);     
    } 
    
    function reshakeCamera()
    {
        console.log("Now at: " + game.camera.x  + " , " + game.camera.y)
        if(shakes == 0)
        {
            console.log("back to start")
            game.camera.x = 0 
            game.camera.y = 0  
            game.world.setBounds(0, 0, game.width, game.height);
            game.stage.backgroundColor = 0xFFFFFF;
            console.log("x: " + game.camera.x + " y: " + game.camera.y)
            totalShakes = null;
        } else
        {
            cameraShake(shakes)    
        }
        
    }
}