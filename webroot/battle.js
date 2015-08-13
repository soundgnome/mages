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
        console.log("Drawing arena")
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
                battleShips[i].anchor.setTo(0.5,0.5);
                battleShips[i].inputEnabled='true';
                battleShips[i].enemyID=i;
                battleShips[i].events.onInputDown.add(enemyShipClick, battleShips[i]);
            }
                battleShips[0].hp = {now:40 , total:40};
                battleShips[0].power = {now:40 , total:40};
                
                battleShips[1].hp = {now:10 , total:10};
                battleShips[2].hp = {now:10 , total:10};
                battleShips[3].hp = {now:10 , total:10};
        }   
        

        console.log("drawing initial hp bars...")
        drawHPBar(0);
        drawHPBar(1);
        drawHPBar(2);
        drawHPBar(3);
        
        //just make them appear again; we're continuing battle
       battleShips.forEach(function(item){
           if(!item.dead)
           {
                item.alpha=1;
                item.bringToTop()
                item.gridLocation = new Phaser.Point( (item.x-arenaLeftEdge)/arenaGridSpacing , (item.y-arenaTopEdge)/arenaGridSpacing);
                if(typeof item.shakeTween === 'undefined') {shakeShip(item)  }   
           }

       });  
        
        
        
        battleDrawn = 1;
        showPlayerAttack(); //only if it's pending
        console.log("got through attack")
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
        if(Math.abs(battleShips[0].angle-newAngle)>180) //go the shorter way
        {
            newAngle -= 360;
        }
        var tweenAngle = game.add.tween(battleShips[0]).to( { angle: newAngle}, 1000, Phaser.Easing.Cubic.Out, true);
        tweenAngle.onComplete.add(projectileMove); 
        
        function projectileMove()
        {
            var torpedo = game.add.sprite(battleShips[0].x, battleShips[0].y, 'alienWingGuns2');
            torpedo.scale.setTo(0.5,0.2);
            torpedo.anchor.setTo(0.5,1);
            torpedo.angle = angleBetweenPoints(battleShips[0], battleShips[battleTargetting])+90
            torpedo.hit = ( threadRecord[threadRecord.length-1] > 0.9 ? true : false)
            torpedo.battleTargetting = battleTargetting;
            var distance = lineDistance(battleShips[0], battleShips[battleTargetting]);
            
            var tween = game.add.tween(torpedo).to( { x: battleShips[battleTargetting].x + (torpedo.hit==true ? 0 : getRandomInt(20,40)), y: battleShips[battleTargetting].y + (torpedo.hit==true ? 0 : getRandomInt(20,40))}, distance*4, Phaser.Easing.Quartic.In, true);
            tween.onComplete.add(finishPlayerAttackAnimation, torpedo);
            battleShips[0].bringToTop()    
        }

    } 
    
    function finishPlayerAttackAnimation(torpedo)
    {
        playerAttackDone = true; 
        if(torpedo.hit) { 
                battleShips[torpedo.battleTargetting].tint = 0x555555;
                tintShip() 
                // this calculates the damage dealt to the enemy by the player
                // it is scaled based on how many enemies the opponent faces
                // based on averages it should take more time to defeat more 
                // opponents, but the damage dealt to the opponents is greater.
                // This balance will govern the basic combat formula of the game.
                
                if(battleShips.length == 2)
                {               // enemies: 1
                                // upperRange: 2
                                // lowerRange: 4
                                // 1/3 damage per hit.
                                // Battle lasts: 2.8 rounds.
                    //check for boss here
                    var damage = battleShips[torpedo.battleTargetting].hp.total/(getRandomInt(20,40)/10);
                } else if(battleShips.length == 3)
                {               // enemies: 2
                                // upperRange: 1
                                // blowerRange: 3
                                // 1/3 damage per hit.
                                // Battle lasts: 3.3 rounds.
                    var damage = battleShips[torpedo.battleTargetting].hp.total/(getRandomInt(10,30)/10);
                } else if(battleShips.length == 4)
                {               // enemies: 3
                                // upperRange: 1
                                // lowerRange: 2
                                // 1/4 damage per hit.
                                // Battle lasts: 3.9 rounds.
                    var damage = battleShips[torpedo.battleTargetting].hp.total/(getRandomInt(10,20)/10);
                } 
                
                //This modifier is based on the target's totalHP, not the damage already dealt
                if(typeof torpedo.buff !== 'undefined')
                {
                    console.log("adding a buff: " + torpedo.buff )
                    //torpedo.buff = {name:'extra 25% damage' , range:[4,4]}
                    //torpedo.buff = {name:'extra 10-20% damage' , range:[5,10]}
                    //torpedo.buff = {name:'Heal target 50%!' , range:[-2,-2]}
                    //torpedo.buff = {name:'1 in 10 chance critical hit!' , range:[0,(getRandomInt(0,4)==0?1:0)]}
                    damage += getRandomInt(torpedo.buff.range[0],torpedo.buff.range[1])
                }
                console.log("total damage: " + damage)
                battleShips[torpedo.battleTargetting].hp.now -= damage;
                hpBarHandle[torpedo.battleTargetting].destroy();
                console.log(battleShips[torpedo.battleTargetting].hp.now)
                
                if(battleShips[torpedo.battleTargetting].hp.now <= 0 )
                {
                    battleShips[torpedo.battleTargetting].dead = true;
                    enemyDeathAnimation();
                }
                
                drawHPBar(torpedo.battleTargetting); 
                function tintShip()
                {
                    if(battleShips[torpedo.battleTargetting].tint < 0xFFFFFF)
                    {
                        game.time.events.add(Phaser.Timer.SECOND * getRandomInt(1,10)/100, tintShip, this);
                        battleShips[torpedo.battleTargetting].tint += 0xFFFFFF/15;    //=0x111111 or 1118481  this moves through only the gray shades
                    } else
                    {
                         battleShips[torpedo.battleTargetting].tint = 0xFFFFFF;
                    }
     
                }
                
                function enemyDeathAnimation()
                {
                    newAngle=360;
                    if(Math.abs(battleShips[torpedo.battleTargetting].angle-newAngle)>180)
                    {
                        newAngle -= 360;
                    } 
            
                    var tweenAngle = game.add.tween(battleShips[torpedo.battleTargetting]).to( { angle: newAngle}, 3000, Phaser.Easing.Cubic.Out, true);
                    tweenAngle.onComplete.add(enemyDeathAnimationExit); 
                }
                
                function enemyDeathAnimationExit()
                {
                    var tweenY = game.add.tween(battleShips[torpedo.battleTargetting]).to( { y: battleShips[torpedo.battleTargetting].y-arenaGridSpacing*2}, 3000, Phaser.Easing.Linear.Out, true);
                    var tweenAlpha = game.add.tween(battleShips[torpedo.battleTargetting]).to( { alpha: 0}, 3000, Phaser.Easing.Cubic.Out, true);
                }
                
            }
        showEnemyAttacks(1);
        var explosion = game.add.sprite(torpedo.x, torpedo.y, 'kaboom');
        explosion.anchor.setTo(0.5,0.5)
        var explosionReference = explosion.animations.add('explode');
        explosion.events.onAnimationComplete.add(function(){
            console.log("explosion done")
            explosion.destroy()
            
            
                
                
                
                
                
                
            }, this);
        explosionReference.play('kaboom', 30, false, true);
        torpedo.destroy();
        battleTargetting = false;
        console.log(torpedo.hit==true?"HIT!":"MISS!")    
        
    }
}



var enemyAttackSequenceInactive = true;
function showEnemyAttacks(enemyPosition) {
    if(enemyPosition == battleShips.length)
    {
        console.log("Enemy attacks sequence complete.");
        enemyAttackSequenceInactive = true;
    } else
    {
        enemyAttackSequenceInactive = false;
    }
    if(enemyPosition < battleShips.length)  //still enemies to attack
    {
        //enemy attack animations using enemy position as index
        if(battleShips[enemyPosition].dead)
        {
            showEnemyAttacks(enemyPosition+1) //skip it, he's dead
        } else
        {
            showEnemyAttackAnimation(enemyPosition)   
        }
        
    } 

    function showEnemyAttackAnimation(enemyPosition) {
        

        var newAngle = angleBetweenPoints(battleShips[0], {x:battleShips[enemyPosition].x,y:battleShips[enemyPosition].y} )+270
        if(Math.abs(battleShips[enemyPosition].angle-newAngle)>180)
        {
            newAngle -= 360;
        } 

        var tweenAngle = game.add.tween(battleShips[enemyPosition]).to( { angle: newAngle}, 1000, Phaser.Easing.Cubic.Out, true);

        tweenAngle.onComplete.add(enemyProjectileMove); 
        function enemyProjectileMove()
        {
            var torpedo = game.add.sprite(battleShips[enemyPosition].x, battleShips[enemyPosition].y, 'alienWingGuns2');
            torpedo.scale.setTo(0.5,0.2);
            torpedo.anchor.setTo(0.5,1);
            torpedo.angle = angleBetweenPoints(battleShips[enemyPosition], battleShips[0])+90
            torpedo.hit = (getRandomInt(0,1)==1);
            
            var distance = lineDistance(battleShips[0], battleShips[enemyPosition]);
            
            var tween = game.add.tween(torpedo).to( { x: battleShips[0].x + (torpedo.hit==1 ? 0 : getRandomInt(20,40)), y: battleShips[0].y + (torpedo.hit==1 ? 0 : getRandomInt(20,40))}, distance*4, Phaser.Easing.Quartic.In, true);
            battleShips[enemyPosition].bringToTop()
            enemyPosition++;
            tween.onComplete.add(cycleEnemyAttacks, torpedo);
        }
        
        function cycleEnemyAttacks(torpedo)
        {
            showEnemyAttacks(enemyPosition)
            console.log(enemyPosition)
            var explosion = game.add.sprite(torpedo.x, torpedo.y, 'kaboom');
            explosion.anchor.setTo(0.5,0.5)
            var explosionReference = explosion.animations.add('explode');
            explosion.events.onAnimationComplete.add(function(){
                explosion.destroy()
            }, this);
            explosionReference.play('kaboom', 30, false, true);
            if(torpedo.hit==1) {
                cameraShake(5);
                for(var i =0; i<getRandomInt(1,4); i++)
                {
                    sparkBlast(getRandomInt(10,130),getRandomInt(10,600),getRandomInt(5,10)/10);    
                }
                //player hp damage
                if(battleShips.length == 2)
                {   
                    // enemies: 1
                    // upperRange: 5
                    // lowerRange: 18
                    // 1/20 damage per hit.
                    // Player lives: 20 rounds. (with 50% chance of hit)
                    var damage = battleShips[0].hp.total/getRandomInt(5,18);
                    //check for boss here
                } else if(battleShips.length == 3)
                {                       
                    // enemies: 2
                    // upperRange: 12
                    // lowerRange: 30
                    // 1/48 damage per hit.
                    // Player lives: 20 rounds. (with 50% chance of hit)
                    var damage = battleShips[0].hp.total/getRandomInt(12,30);
                } else if(battleShips.length == 4)
                {   // enemies: 3
                    // upperRange: 16
                    // lowerRange: 50
                    // 1/60 damage per hit.
                    // Player lives: 20 rounds. (with 50% chance of hit)
                    var damage = battleShips[0].hp.total/getRandomInt(16,50);
                } 
                
                //This modifier is based on the target's totalHP, not the damage already dealt
                if(typeof torpedo.buff !== 'undefined')
                {
                    //torpedo.buff = {name:'extra 25% damage' , range:[4,4]}
                    //torpedo.buff = {name:'extra 10-20% damage' , range:[5,10]}
                    //torpedo.buff = {name:'Heal target 50%!' , range:[-2,-2]}
                    //torpedo.buff = {name:'1 in 10 chance critical hit!' , range:[0,(getRandomInt(0,4)==0?1:0)]}
                    damage += getRandomInt(torpedo.buff.range[0],torpedo.buff.range[1])
                }
                battleShips[0].hp.now -= damage;
                hpBarHandle[0].destroy();
                drawHPBar(0);
            }
            torpedo.destroy();
            

        }
    
    } 
}


        
function shakeShip(ship) {
    if(!ship.dead)
    {
        var min = -2;
        var max = 2;
        var newX = ship.gridLocation.x*arenaGridSpacing+arenaLeftEdge + Math.floor(Math.random() * (max - min + 1)) + min;
        var newY = ship.gridLocation.y*arenaGridSpacing+arenaTopEdge + Math.floor(Math.random() * (max - min + 1)) + min;
        ship.shakeTween = game.add.tween(ship).to( { x: newX, y: newY}, getRandomInt(1000,2000), Phaser.Easing.Linear.Out, true);
        ship.shakeTween.onComplete.add(shakeShip, ship);      
    }
          
}
    
    

function clearBattle() {
    battleBackground.destroy(true);
    battleButtons.forEach(function(item){
            item.destroy(true)
        });
    battleShips.forEach(function(item){
            item.alpha=0
        });
    hpBarHandle.forEach(function(item){
            item.destroy();
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
    if(enemyAttackSequenceInactive)
    {
        if(battleShipDetailPane == null)
        {
            battleShipDetailPane = game.add.sprite(item.x-(item.width/2)-3, item.y-5, 'battleShipDetailPane');
            battleShipDetailPane.enemyID = item.enemyID;
        } else if(battleShipDetailPane.enemyID == item.enemyID)
        {
            hpBarHandle[battleShipDetailPane.enemyID].destroy();
            drawHPBar(battleShipDetailPane.enemyID);
            battleShipDetailPane.destroy(true);
            battleShipDetailPane = null
            targetButton = null;
        } else
        {
            hpBarHandle[battleShipDetailPane.enemyID].destroy();
            drawHPBar(battleShipDetailPane.enemyID);
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
    
                var modelShipShadow = game.add.sprite(-195, 20, item.generateTexture());
                modelShipShadow.scale.setTo(0.45,0.45);
                modelShipShadow.anchor.setTo(0.45,-0.05)  //this is slightly different from the model that's casting it
                modelShipShadow.tint = 0x000000; //black shadow
                battleShipDetailPane.addChild(modelShipShadow);
                
                var modelShip = game.add.sprite(-195, 20, item.generateTexture());
                modelShip.scale.setTo(0.45,0.45);
                modelShip.anchor.setTo(0.5,0)
                battleShipDetailPane.addChild(modelShip);
                
                hpBarHandle[item.enemyID].destroy();
                drawHPBar(item.enemyID,1,new Phaser.Point(battleShipDetailPane.x,battleShipDetailPane.y));
                
    
                
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
    
}

function battleButtonClick(item) {
    if(enemyAttackSequenceInactive)
    {
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
        playerMovePending = null;
        if( threadRecord[threadRecord.length-1] > 0.9 ? true : false)
        {
            var newAngle = angleBetweenPoints(battleShips[0], { x: battleShips[0].x+xSpaces*arenaGridSpacing , y: battleShips[0].y+ySpaces*arenaGridSpacing } )+90
            var tweenAngle = game.add.tween(battleShips[0]).to( { angle: newAngle}, 1000, Phaser.Easing.Cubic.Out, true);
            tweenAngle.onComplete.add(animateMove); 
                
            function animateMove()
            {
                battleShips[0].shakeTween.stop();
                battleShips[0].moving = true;
                var tween = game.add.tween(battleShips[0]).to( { x: battleShips[0].x+xSpaces*arenaGridSpacing , y: battleShips[0].y+ySpaces*arenaGridSpacing }, 1500, Phaser.Easing.Cubic.Out, true);
                var tween = game.add.tween(hpBarHandle[0]).to( { x: hpBarHandle[0].x+xSpaces*arenaGridSpacing , y: hpBarHandle[0].y+ySpaces*arenaGridSpacing }, 1500, Phaser.Easing.Cubic.Out, true);
                tween.onComplete.add(resetPlayerGridLocation);     
            }

            function resetPlayerGridLocation() 
            {
                battleShips[0].gridLocation = new Phaser.Point( (battleShips[0].x-arenaLeftEdge)/arenaGridSpacing , (battleShips[0].y-arenaTopEdge)/arenaGridSpacing)
                battleOrders = 'complete'
                battleShips[0].moving = false;
                shakeShip(battleShips[0])
                showEnemyAttacks(1);  
            }
        }  else
        {
           showEnemyAttacks(1);  
        }
    }
    
}

function battleButtonOver(item){
    if(battleTargetting == false && enemyAttackSequenceInactive)
    {
        if(battleShipDetailPane != null)
        {
            hpBarHandle[battleShipDetailPane.enemyID].destroy();
            drawHPBar(battleShipDetailPane.enemyID);
            battleShipDetailPane.destroy(true);
            battleShipDetailPane = null   
        }

        
        battleButtons.forEach(function(button){
            button.tint = 0xFFFFFF;
            button.scale.setTo(1)
        });
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
        var min = -100*shakes/totalShakes;
        var max = 100*shakes/totalShakes;
        var range = Math.abs(min-max)
        game.world.setBounds(-range/2, -range/2, game.width+range, game.height+range);
        game.stage.backgroundColor = 0x000000;
        var newX = Math.floor(Math.random() * (max - min + 1)) + min ;
        var newY = Math.floor(Math.random() * (max - min + 1)) + min ;
        var tween = game.add.tween(this.game.camera).to( { x: newX , y: newY }, getRandomInt(10,200), Phaser.Easing.Bounce.Out, true);
        shakes = shakes -1
        tween.onComplete.add(reshakeCamera);     
    } 
    
    function reshakeCamera()
    {
        if(shakes == 0)
        {
            game.camera.x = 0 
            game.camera.y = 0  
            game.world.setBounds(0, 0, game.width, game.height);
            game.stage.backgroundColor = 0xFFFFFF;
            totalShakes = null;
        } else
        {
            cameraShake(shakes)    
        }
        
    }
}

function sparkBlast(xPos, yPos, speed)
{
    var emitter = game.add.emitter(xPos, yPos, 200);
    var smokeEmitter = game.add.emitter(xPos, yPos, 200);
    smokeEmitter.makeParticles('smokeParticle');
    smokeEmitter.maxParticleSpeed.setTo(    70     ,   100  );
    smokeEmitter.minParticleSpeed.setTo(    -70      ,   0    );
    smokeEmitter.minParticleScale = .1;
    smokeEmitter.maxParticleScale = .5;
    smokeEmitter.gravity = -300;
    smokeEmitter.start(true, 3000, 1, 120);
    smokeEmitter.forEach(function(trailParticle){
            game.add.tween(trailParticle).to( { alpha: 0}, 1500, Phaser.Easing.Linear.Out, true);   
        });
    
    var particleArray = [ [0,1,2,3,4,5,6,7],[8,9,10,11,12,13,14,15],[16,17,18,19,20,21,22,23] ][getRandomInt(0,2)]
    
    
    
    emitter.makeParticles('sparks', particleArray);
    
    emitter.forEach(function(trailParticle){
            game.add.tween(trailParticle).to( { alpha: 0}, 1000, Phaser.Easing.Linear.Out, true);   
        });
    emitter.maxParticleSpeed.setTo(getRandomInt(500,1500)*speed, getRandomInt(500,1500)*speed);
    emitter.minParticleSpeed.setTo(getRandomInt(500,1500)*-1*speed, getRandomInt(500,1500)*-1*speed);
    emitter.minParticleScale = 1;
    emitter.maxParticleScale = 1;
    emitter.gravity = 600;
    emitter.start(true, 3000, 1, 50);
}

var hpBarHandle = [null,null,null,null]
function drawHPBar(shipID, scale, differentLocation) {  //different location is optional
    var barPoint;
        if(typeof scale === 'undefined')
    {
        scale = 1;
    }
    if(typeof differentLocation === 'undefined')
    {
        barPoint = new Phaser.Point(battleShips[shipID].x-scale*25,battleShips[shipID].y+scale*30);
    } else
    {
        barPoint = new Phaser.Point(differentLocation.x-199,differentLocation.y+140);
    }
    console.log("shipID: " + shipID)
    console.log("scale: " + shipID)
    console.log("differentLocation: " + differentLocation)
    console.log("barPoint: " + barPoint)

    
    hpBarHandle[shipID] = game.add.group();
    var healthBack = game.add.graphics(barPoint.x, barPoint.y);
    healthBack.beginFill(0x000066);  //dark blue
    healthBack.lineStyle(0, 0x000000, 1);
    healthBack.drawRect(0, 0, 50*scale, 5*scale);
    healthBack.endFill();
    hpBarHandle[shipID].add(healthBack)
    
    var healthCurrent = game.add.graphics(barPoint.x, barPoint.y);
    healthCurrent.beginFill(0xFF0000);  //dark red
    healthCurrent.lineStyle(0, 0x000000, 1);
    healthCurrent.drawRect(0, 0, 50*scale*(battleShips[shipID].hp.now/battleShips[shipID].hp.total), 5*scale);
    healthCurrent.endFill();
    hpBarHandle[shipID].add(healthCurrent)
    
    if(shipID == 0)
    {
    var powerBack = game.add.graphics(barPoint.x, barPoint.y+5*scale);
    powerBack.beginFill(0xa4a4a4);  //light gray
    powerBack.lineStyle(0, 0x000000, 1);
    powerBack.drawRect(0, 0, 50*scale, 5*scale);
    powerBack.endFill();
    hpBarHandle[shipID].add(powerBack)
    
    var powerCurrent = game.add.graphics(barPoint.x, barPoint.y+5*scale);
    powerCurrent.beginFill(0x0099CC);  //light blue
    powerCurrent.lineStyle(0, 0x000000, 1);
    powerCurrent.drawRect(0, 0, 50*scale*(battleShips[shipID].power.now/battleShips[shipID].power.total), 5*scale);
    powerCurrent.endFill();
    hpBarHandle[shipID].add(powerCurrent)   
    } else if( battleShips[shipID].hp.now <= 0 )
    {
        hpBarHandle[shipID].alpha = 0;
    }
    
}

function testRollsVsPlayer()
{
    var upperRange = 10;
    var lowerRange = 36;
    var enemies = 1;
    
    var iterations = 1000
    var record = []
    var sum = 0;
    for (var i = 0 ; i < iterations ; i++)
    {
        record.push(1/getRandomInt(upperRange,lowerRange))
        sum += record[record.length-1]
    }
    
    var avg = sum/record.length;
    console.log("enemies: " + enemies)
    console.log("upperRange: " + upperRange)
    console.log("lowerRange: " + lowerRange)
    console.log("1/"+Math.round(1/(avg) ) + " damage per hit.")
    console.log("Player lives: " + Math.round(1/(avg*enemies)) + " rounds.")
}

function testRollsVsEnemy()
{
    var upperRange = 1;
    var lowerRange = 4;
    var enemies = 2;
    
    var iterations = 1000
    var record = []
    var sum = 0;
    for (var i = 0 ; i < iterations ; i++)
    {
        record.push(1/getRandomInt(upperRange,lowerRange))
        sum += record[record.length-1]
    }
    
    var avg = sum/record.length;
    console.log("enemies: " + enemies)
    console.log("upperRange: " + upperRange)
    console.log("lowerRange: " + lowerRange)
    console.log("1/"+Math.round(enemies/(avg) ) + " damage per hit.")
    console.log("Battle lasts: " + (enemies/avg).toFixed(1) + " rounds.")
}