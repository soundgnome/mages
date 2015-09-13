var battleMode = true;
var battleBackground = null;
var battleButtons = [];
var battleOrders = null;
var battleShips = [];
var battleCombatLabels = [];
var battleFirstRound = true
var torpedoLabel = null;

var arenaLeftEdge = 275
var arenaTopEdge = 110
var arenaGridSpacing = 35;
var arenaRightEdge = arenaLeftEdge + 12*arenaGridSpacing
var arenaBottomEdge = arenaTopEdge + 12*arenaGridSpacing
var hiddenButtons;

function definePlayerShip()
{
    //player ship stuff
    if(typeof currentUser.ship === 'undefined')
    {
        currentUser.ship = {    hp: { now: 40 , total: 40 } , 
                                power: { now: 40 , total: 40 } , 
                                torpedoes: 5,
                                rgb:[255,255,255] ,
                                laserActivated: true ,
                                torpedoActivated: false ,
                                hackArrayActivated: false ,
                                laserLevel: 0,
                                torpedoLevel: 0,
                                hackArrayLevel: 0,
                                heatShieldLevel: 0,
                                blastShieldLevel: 0,
                                firewallLevel: 0,
                                weaponsDisabled: 0,
                                };
    }
    
    var levelScaleAdjustment = ((Math.floor(currentUser.challengesMastered/3))/80*.5)
    battleShips.push(game.add.sprite(arenaLeftEdge + 6*arenaGridSpacing, arenaTopEdge + 12*arenaGridSpacing, buildShip(0.5+levelScaleAdjustment,[parseInt(currentUser.ship.rgb[0]),parseInt(currentUser.ship.rgb[1]),parseInt(currentUser.ship.rgb[2])] , getPlayerShip(Math.floor(currentUser.challengesMastered/3)+1)) ))
    battleShips[0].moving = false;
    battleShips[0].hp = currentUser.ship.hp;
    battleShips[0].power = currentUser.ship.power;
    
    battleShips[0].torpedoActivated = currentUser.ship.torpedoActivated;
    battleShips[0].laserActivated = currentUser.ship.laserActivated;
    battleShips[0].hackArrayActivated = currentUser.ship.hackArrayActivated;
    battleShips[0].laserLevel = currentUser.ship.laserLevel;
    battleShips[0].torpedoLevel = currentUser.ship.torpedoLevel;
    battleShips[0].hackArrayLevel = currentUser.ship.hackArrayLevel;
    battleShips[0].heatShieldLevel = currentUser.ship.heatShieldLevel;
    battleShips[0].blastShieldLevel = currentUser.ship.blastShieldLevel;
    battleShips[0].firewallLevel = currentUser.ship.firewallLevel;
    battleShips[0].torpedoes = currentUser.ship.torpedoes;
            

}
function continueBattle(questID)
{
    battleTargettingWeapon=false;
    if ( battleBackground == null) //redraw the battle arena
    {
        
        

        var rechargeRate = 5;
        if(battleShips[0].power.total-battleShips[0].power.now > 5)
        {
            battleShips[0].power.now = parseInt(battleShips[0].power.now)+rechargeRate

        } else 
        {
            battleShips[0].power.now=battleShips[0].power.total //top it up
        }
        
        if(typeof battleShips[0].weaponsDisabled === 'undefined')
        {
           battleShips[0].weaponsDisabled = 0;
        }
        
        if(battleShips[0].weaponsDisabled > 0)
        {
           battleShips[0].weaponsDisabled--; 
        }
                   
        
        console.log("Drawing arena")
        var buttonPoint = new Phaser.Point(88,120);
        battleBackground = game.add.sprite(0, 0, 'battleBack');
        
        if(battleShips[0].torpedoActivated == 'true')
        {   
            torpedoLabel = game.add.text(370, 20, 'TORPEDOES: ' + battleShips[0].torpedoes ) 
            torpedoLabel.anchor.setTo(1,0.5);
            torpedoLabel.font = 'Michroma';
            torpedoLabel.fontSize = 14;
            torpedoLabel.fill = '#FF0000';
            torpedoLabel.align = 'center';
        }
        if(battleShips.length == 1) //NEW BATTLE: no enemy ship sprites created yet
        {
            battleFirstRound=true
            //player dead? reset -- remove this later
            if(battleShips[0].hp.now <=0 ){battleShips[0].hp.now = battleShips[0].hp.total}
            getQuestShips(questID);
            
        }else
        {
            battleFirstRound = false;
        }
        
        
        var torpedoButton = game.add.sprite(buttonPoint.x-50, buttonPoint.y, 'battleTorpedo')
        battleButtons.push(torpedoButton)
        
        var laserButton = game.add.sprite(buttonPoint.x+50, buttonPoint.y, 'battleBeam')
        battleButtons.push(laserButton)
        
        battleButtons.push(game.add.sprite(buttonPoint.x, buttonPoint.y+80, 'battleRetreat'))
        
        var hackArrayButton = game.add.sprite(buttonPoint.x, buttonPoint.y-60, 'battleHack') 
        battleButtons.push(hackArrayButton)
        
        
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
        
        if(battleShips[0].torpedoActivated == "false" || !battleShips[0].torpedoActivated)
        {
            torpedoButton.alpha = 0;
            torpedoButton.inputEnabled='false';
        }
        
        if(battleShips[0].laserActivated == "false" || !battleShips[0].laserActivated)
        {
            laserButton.alpha = 0;
            laserButton.inputEnabled='false';
        }
        
        if(battleShips[0].hackArrayActivated == "false" || !battleShips[0].hackArrayActivated)
        {
            hackArrayButton.alpha = 0;
            hackArrayButton.inputEnabled='false';
        }
        var playerShipScale = 0.2+(((currentUser.challengesMastered/3)/80)*0.2)
        battleShips[0].scale.setTo(playerShipScale,playerShipScale)
        battleShips[0].anchor.setTo(0.5,0.5)
        
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
        
        
        
        
        

        

        console.log("drawing initial hp bars...")
        for (var i = 0 ; i < battleShips.length ; i ++)
        {
          drawHPBar(i);  
        }

        
        //just make them appear again; we're continuing battle
       battleShips.forEach(function(item){
           if(!item.dead  && item!=null)
           {
                item.alpha=1;
                item.bringToTop()
                item.gridLocation = new Phaser.Point( Math.round((item.x-arenaLeftEdge)/arenaGridSpacing) , Math.round((item.y-arenaTopEdge)/arenaGridSpacing));
                item.x = arenaLeftEdge+item.gridLocation.x*arenaGridSpacing;
                item.y = arenaTopEdge+item.gridLocation.y*arenaGridSpacing
                if(typeof item.shakeTween === 'undefined') {shakeShip(item)  }   
           }

       });  
        
        
        
        battleDrawn = 1;
        if(!inRetreat)
        {
            showPlayerAttack(); //only if it's pending   
        } else
        {
            inRetreat = false;
            if(( threadRecord[threadRecord.length-1] > 0.9 ? true : false))
            {
                //put in a retreat animation
                state = 'shipMenu'
                clearBattle(true)   
            } else
            {
                showEnemyAttacks(1)
            }

        }
        
        console.log("got through attack")
        if(playerMovePending !=null)
        {
            movePlayerAnimation(playerMovePending.xSpaces,playerMovePending.ySpaces);    
        } 
       
        } else  //we've already drawn the arena and ships
        {
            
            //nothing to do here yet...
        }
}

function getPlayerShip(level)  //changes the textures one at a time, 80 levels in all
{
    var bottomWingsOrder =  [6,8,10,9,4,5,7,1,2,3]
    var frontSpireOrder =   [7,2,3,6,8,10,5,4,9,1]
    var hullOrder =         [2,3,4,6,5,7,8,10,9,1]
    var tailSpiresOrder =   [4,6,7,10,8,9,5,3,2,1]
    var topGunnerOrder =    [10,9,8,7,6,5,1,2,3,4]
    var windScreenOrder =   [7,6,2,1,9,3,4,5,8,10]
    var wingGunsOrder =     [9,8,4,10,3,2,1,6,5,7]
    var wingsOrder =        [8,9,7,10,6,5,4,3,2,1]
    
    var changeOrder = [hullOrder, wingsOrder, bottomWingsOrder,windScreenOrder,frontSpireOrder,tailSpiresOrder,topGunnerOrder, wingGunsOrder]
    
    var ship =  { 
                part:
                    {
                    bottomWings:    { label:'bottomWingsDefault',    exists:false,   offsetX: 15,    offsetY: 10,   mirror:true,    texture: null},
                    tailSpires:     { label:'tailSpiresDefault',     exists:false,   offsetX: 40,    offsetY: -70,   mirror:true,   texture: null},
                    frontSpire:     { label:'frontSpireDefault',     exists:false,   offsetX: 0,    offsetY:  25,   mirror:false,   texture: null}, 
                    wings:          { label:'wingsDefault',          exists:false,   offsetX: 40,   offsetY: -30,      mirror:true, texture: null},
                    wingGuns:       { label:'wingGunsDefault',      exists:false,   offsetX: 40,    offsetY: -10,   mirror:true,    texture: null}, 
                    hull:           { label:'hullDefault',           exists:false,   offsetX: 0,    offsetY: -20,      mirror:false,texture: null}, 
                    topGunner:      { label:'topGunnerDefault',      exists:false,  offsetX: 0,    offsetY: -30,   mirror:false,    texture: null}, 
                    windScreen:     { label:'windScreenDefault',     exists:false,  offsetX: 0,    offsetY:  25,   mirror:false,    texture: null}
                    }
                };

    for (var i = 0; i < level ; i ++)
    {
        switch(i%8) {
        case 0:
            ship.part.hull.texture = 'hull'+(changeOrder[i%8][Math.floor(i/8)])
            ship.part.hull.exists = true
        break;
        case 1:
            ship.part.wings.texture = 'wings'+(changeOrder[i%8][Math.floor(i/8)])
             ship.part.wings.exists = true
        break;
        case 2:
            ship.part.bottomWings.texture = 'bottomWings'+(changeOrder[i%8][Math.floor(i/8)])
             ship.part.bottomWings.exists = true
        break;
        case 3:
            ship.part.windScreen.texture = 'windScreen'+(changeOrder[i%8][Math.floor(i/8)])
             ship.part.windScreen.exists = true
        break;
        case 4:
            ship.part.frontSpire.texture = 'frontSpire'+(changeOrder[i%8][Math.floor(i/8)])
             ship.part.frontSpire.exists = true
        break;
        case 5:
            ship.part.tailSpires.texture = 'tailSpires'+(changeOrder[i%8][Math.floor(i/8)])
             ship.part.tailSpires.exists = true
        break;
        case 6:
            ship.part.topGunner.texture = 'topGunner'+(changeOrder[i%8][Math.floor(i/8)])
             ship.part.topGunner.exists = true
        break;
        case 7:
            ship.part.wingGuns.texture = 'wingGuns'+(changeOrder[i%8][Math.floor(i/8)])
             ship.part.wingGuns.exists = true
        break;
}
    }
    return ship;
    
}

function buildShip(scale, tint, ship, angleOffset)
{
    if (typeof tint === 'undefined') 
            {
                tint = [0,0,0]
            }
            else {
            }
    var shipGraphic = game.add.group();
    
    if (typeof ship === 'undefined') 
    { 
        console.log("no ship defined, making one up")
        ship =  { 
                part:
                    {
                    bottomWings:    { label:'bottomWingsDefault',    exists:true,   offsetX: getRandomInt(20,40),    offsetY: -getRandomInt(0,20),   mirror:true,        texture: 'alienBottomWings'+getRandomInt(1,5)},
                    tailSpires:     { label:'tailSpiresDefault',     exists:true,   offsetX: getRandomInt(20,50),    offsetY: -95,   mirror:true,        texture: 'alienTailSpire'+getRandomInt(1,2)},
                    frontSpire:     { label:'frontSpireDefault',     exists:true,   offsetX: 0,    offsetY:  50,   mirror:false,       texture: 'alienFrontSpire'+getRandomInt(1,4)}, 
                    hull:           { label:'hullDefault',           exists:true,   offsetX: 0,    offsetY: getRandomInt(-100,100),      mirror:false,       texture: 'alienHull'+getRandomInt(1,2)}, 
                    wings:          { label:'wingsDefault',          exists:true,   offsetX: getRandomInt(30,90),   offsetY: 0,      mirror:true,        texture: 'alienWings'+getRandomInt(1,4)}, 
                    wingGuns:       { label:'wingGunsDefault',       exists:true,   offsetX: 60,    offsetY: -30,   mirror:true,        texture: 'alienWingGuns'+getRandomInt(1,6)}, 
                    topGunner:      { label:'topGunnerDefault',      exists:true,  offsetX: 0,    offsetY: -50,   mirror:false,       texture: 'alienTopGunner'+getRandomInt(1,5)}, 
                    windScreen:     { label:'windScreenDefault',     exists:true,  offsetX: 0,    offsetY:  10,   mirror:false,       texture: 'alienWindScreen'+getRandomInt(1,4)}
                    }
                };
    }

    
    $.each(ship.part, function(part, partSettings) {
        buildPart(partSettings);
    });
    
    
    
    var returnTexture = shipGraphic.generateTexture();
    returnTexture.scaleOffset = scale;
    if (typeof angleOffset === 'undefined')
    {
        returnTexture.angleOffset = 90;
    } else
    {
        returnTexture.angleOffset=angleOffset;
    }
    shipGraphic.destroy();
    return returnTexture;
    
    function buildPart(part)
    {
        if(part.exists==true)
        {
            var partSprite = game.add.sprite( -part.offsetX , -part.offsetY , part.texture )
            partSprite.anchor.setTo(0.5,0.5);
            partSprite.tint = tint[0] + 256 * tint[1] + 65536 * tint[2];
            shipGraphic.add(partSprite)
            if(part.mirror == true)
            {
                var mirroredPart = shipGraphic.create( part.offsetX , -part.offsetY , part.texture )
                mirroredPart.anchor.setTo(0.5,0.5);
                mirroredPart.scale.setTo(-1,1);
                mirroredPart.tint = tint[0] + 256 * tint[1] + 65536 * tint[2];
                shipGraphic.add(mirroredPart)
            }
        }
    }
}

var ricochet=false;
var ricochetTarget = null;
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
        
        

    } 
    function projectileMove()
        {
            //allow for different projectiles with a switch statement on battleTargeting
            switch(weaponSelected) {
                case 3:
                    if(!ricochet)
                    {
                        battleShips[0].power.now -= (20-battleShips[0].hackArrayLevel);
                        hpBarHandle[0].destroy();
                        drawHPBar(0);
                        lightningStrike(battleShips[0], battleShips[battleTargetting], 1)   
                    } else
                    {
                        var newSource = battleTargetting
                        battleTargetting = ricochetTarget
                        lightningStrike(battleShips[newSource], battleShips[battleTargetting], 1)
                    }
                    
                    function lightningStrike(start, finish, scale)
                    {
                        var newAngle = angleBetweenPoints(start, finish )
                        var lightning = game.add.sprite(start.x, start.y, 'lightning');
                        lightning.scale.setTo(0.1*scale,0.3*scale)
                        lightning.anchor.setTo(0.5,0.5)
                        lightning.angle = newAngle;
                        lightning.hit = ( threadRecord[threadRecord.length-1] > 0.9 ? true : false)
                        lightning.battleTargetting = battleTargetting;
                        var lightningReference = lightning.animations.add('strike');
                        lightningReference.play(20, true, false);
                        var tweenLocation = game.add.tween(lightning).to( { x: finish.x , y: finish.y }, 1000, Phaser.Easing.Linear.Out, true);
                        var tweenLength = game.add.tween(lightning.scale).to( { x: 0.3*scale, y: 0.3*scale }, 500, Phaser.Easing.Quartic.Out, true);
                        if(!lightning.hit) //just disappear because you missed
                        {
                            var tweenAlpha = game.add.tween(lightning).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.Out, true);
                        }
                        tweenLocation.onComplete.add(shrinkLightning); 
                        battleShips[0].bringToTop() 
                        function shrinkLightning()
                        {
                            lightning.scale.setTo(0.2*scale,0.8*scale)
                            var tweenScale = game.add.tween(lightning).to( {alpha:0}, 1000, Phaser.Easing.Bounce.Out, true);
                            tweenScale.onComplete.add(destroyLignting); 
                            
                            if(lightning.hit)
                            {
                                var particleArray = [ [0,1,2,3,4,5,6,7],[8,9,10,11,12,13,14,15],[16,17,18,19,20,21,22,23] ][2]  //just light blue for now
        
                                var speed = .1;
                                var emitter = game.add.emitter(finish.x, finish.y, 200);
                                emitter.makeParticles('sparks', particleArray);
                                
                                emitter.forEach(function(trailParticle){
                                        game.add.tween(trailParticle).to( { alpha: 0}, 1000, Phaser.Easing.Linear.Out, true);   
                                    });
                                emitter.maxParticleSpeed.setTo(getRandomInt(500,1500)*speed, getRandomInt(500,1500)*speed);
                                emitter.minParticleSpeed.setTo(getRandomInt(500,1500)*-1*speed, getRandomInt(500,1500)*-1*speed);
                                emitter.minParticleScale = .5;
                                emitter.maxParticleScale = .5;
                                emitter.gravity = 0;
                                emitter.start(true, 1000, 1, 50);    
                            }
                            
                        }
                        
                        function destroyLignting()
                        {
                            finishPlayerAttackAnimation(lightning)
                        }
                    }
                    break;
                case 1:
                    var leftStart = findNewPoint(battleShips[0].x, battleShips[0].y, battleShips[0].angle, 9)
                    var rightStart = findNewPoint(battleShips[0].x, battleShips[0].y, battleShips[0].angle-180, 9)
                    
                    beamStrike(leftStart, battleShips[battleTargetting], 0.2, true)
                    beamStrike(rightStart, battleShips[battleTargetting], 0.2, false)

                    break;
                case 0:  //0 and 2 because retreat isn't done
                    battleShips[0].torpedoes--;
                    torpedoLabel.setText('TORPEDOES: ' + battleShips[0].torpedoes);
                    var torpedo = game.add.sprite(battleShips[0].x, battleShips[0].y, 'alienWingGuns2');
                    torpedo.scale.setTo(0.5,0.2);
                    torpedo.anchor.setTo(0.5,1);
                    torpedo.angle = angleBetweenPoints(battleShips[0], battleShips[battleTargetting])+90
                    torpedo.hit = ( threadRecord[threadRecord.length-1] > 0.9 ? true : false)
                    torpedo.battleTargetting = battleTargetting;
                    torpedo.buff = getTorpedoBuff();
                    var distance = lineDistance(battleShips[0], battleShips[battleTargetting]);
                    var tween = game.add.tween(torpedo).to( { x: battleShips[battleTargetting].x + (torpedo.hit==true ? 0 : getRandomInt(20,40)), y: battleShips[battleTargetting].y + (torpedo.hit==true ? 0 : getRandomInt(20,40))}, distance*4, Phaser.Easing.Quartic.In, true);
                    battleShips.forEach(function(item){
                        if(item!=null)
                        {
                            game.world.bringToTop(item);
                        }
                        });
                    tween.onComplete.add(finishPlayerAttackAnimation, torpedo);
                    break;
                        
                    
            }
            
            function getTorpedoBuff()
            {
                return [
                        { name:'Baseline damage' ,  range:[0,0]},
                        { name:'extra 10% damage' , range:[10,10]},
                        { name:'extra 20% damage' , range:[20,20]},
                        { name:'extra 30% damage' , range:[30,30]},
                        { name:'extra 40% damage' , range:[40,40]},
                        { name:'extra 50% damage' , range:[50,50]},
                        { name:'extra 60% damage' , range:[60,60]},
                        { name:'extra 70% damage' , range:[70,70]},
                        { name:'extra 80% damage' , range:[80,80]},
                        { name:'extra 90% damage' , range:[90,90]},
                        { name:'extra 100% damage' , range:[100,100]}
                        
                    ][currentUser.ship.torpedoLevel]
                ;
            }
                
            function findNewPoint(x, y, angle, span) 
            {
                            var result = {  x: Math.round(Math.cos(angle * Math.PI / 180) * span + x) ,
                                            y: Math.round(Math.sin(angle * Math.PI / 180) * span + y)
                                        };
                        
                            return result;
            }
                      
            function beamStrike(start, finish, width, primary)
            {

                var newAngle = angleBetweenPoints(start, finish )
                var beam = game.add.sprite(start.x, start.y, 'laserPink');

                var distance = lineDistance(start, finish);
                beam.scale.setTo(width,0)
                beam.anchor.setTo(0.5,1)
                beam.angle = newAngle+90;
                beam.hit = ( threadRecord[threadRecord.length-1] > 0.9 ? true : false)
                beam.battleTargetting = battleTargetting;
                beam.primary = primary;
                beam.buff = getBeamBuff();

                var tweenLength = game.add.tween(beam.scale).to( { x: width, y: distance/600 }, distance/2, Phaser.Easing.Linear.In, true);
                 
                tweenLength.onComplete.add(holdBeam); 
                
                battleShips.forEach(function(item){
                    if(item!=null)
                    {
                        game.world.bringToTop(item);   
                    }
                    
                });
                
                function getBeamBuff()
                {
                    return [
                            { name:'Baseline damage' ,  range:[0,0]},
                            { name:'extra 10% damage' , range:[10,10]},
                            { name:'extra 20% damage' , range:[20,20]},
                            { name:'extra 30% damage' , range:[30,30]},
                            { name:'extra 40% damage' , range:[40,40]},
                            { name:'extra 50% damage' , range:[50,50]},
                            { name:'extra 60% damage' , range:[60,60]},
                            { name:'extra 70% damage' , range:[70,70]},
                            { name:'extra 80% damage' , range:[80,80]},
                            { name:'extra 90% damage' , range:[90,90]},
                            { name:'extra 100% damage' , range:[100,100]}
                            
                        ][currentUser.ship.laserLevel]
                    ;
                }
                function holdBeam()
                {

                    game.time.events.add(Phaser.Timer.SECOND * 1.5, shrinkBackBeam, this);
                    if(beam.hit)  //veer the beams away from the target
                    {
                        var smokeEmitter = game.add.emitter(battleShips[battleTargetting].x, battleShips[battleTargetting].y, 200);
                        smokeEmitter.makeParticles('smokeParticle');
                        smokeEmitter.maxParticleSpeed.setTo(    50     ,   50  );
                        smokeEmitter.minParticleSpeed.setTo(    -50     ,   -50  );
                        smokeEmitter.minParticleScale = .02;
                        smokeEmitter.maxParticleScale = .10;
                        smokeEmitter.gravity = 0;
                        smokeEmitter.start(false, 3000, 1, 120);
                        smokeEmitter.forEach(function(trailParticle){
                                game.add.tween(trailParticle).to( { alpha: 0}, 1500, Phaser.Easing.Linear.Out, true);   
                            });    
                    } else
                    {
                        var tweenAngle = game.add.tween(beam).to( { angle: beam.angle+(beam.primary?70:-70) }, 1000, Phaser.Easing.Elastic.In, true);
                        var tweenAlpha = game.add.tween(beam.scale).to( { x: 0 , y: 0.5*distance/600}, 1000, Phaser.Easing.Bounce.In, true);
                    } 
                    

                }
                
                function shrinkBackBeam()
                {
                    //this looks neat
                    var tweenLocation = game.add.tween(beam.anchor).to( { x: 0.5, y: 2 }, distance/2, Phaser.Easing.Linear.In, true);
                    var tweenLength = game.add.tween(beam.scale).to( { x: width, y: 0 }, distance/2, Phaser.Easing.Linear.In, true);
                    tweenLength.onComplete.add(finishBeam); 
                }
                
                function finishBeam()
                {
                    if(beam.primary)  //only one beam ends attack
                    {
                      finishPlayerAttackAnimation(beam)  
                    }
                    
                }
                
                }
   
        }
    function finishPlayerAttackAnimation(projectile)
    {  // battleShips[0].bringToTop() 
        playerAttackDone = true; 
        if(projectile.hit) { 
                if(weaponSelected == 1 || weaponSelected == 0)  //torpedo or laser
                {
                    battleShips[projectile.battleTargetting].tint = 0x555555;
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
                        var damage = battleShips[projectile.battleTargetting].hp.total/(getRandomInt(20,40)/10);
                    } else if(battleShips.length == 3)
                    {               // enemies: 2
                                    // upperRange: 1
                                    // blowerRange: 3
                                    // 1/3 damage per hit.
                                    // Battle lasts: 3.3 rounds.
                        var damage = battleShips[projectile.battleTargetting].hp.total/(getRandomInt(10,30)/10);
                    } else if(battleShips.length == 4)
                    {               // enemies: 3
                                    // upperRange: 1
                                    // lowerRange: 2
                                    // 1/4 damage per hit.
                                    // Battle lasts: 3.9 rounds.
                        var damage = battleShips[projectile.battleTargetting].hp.total/(getRandomInt(10,20)/10);
                    } 
                    
                    //This modifier is based on the target's totalHP, not the damage already dealt
                    if(typeof projectile.buff !== 'undefined')
                    {
                        
                        var buffDamage = getRandomInt(projectile.buff.range[0],projectile.buff.range[1])/100
                        console.log("buffDamage: " + buffDamage*damage)
                        damage += buffDamage*damage;
                    }
                    console.log("total damage: " + damage)
                    battleShips[projectile.battleTargetting].hp.now -= damage;
                    hpBarHandle[projectile.battleTargetting].destroy();
                    
                    if(battleShips[projectile.battleTargetting].hp.now <= 0 )
                    {
                        battleShips[projectile.battleTargetting].dead = true;
                        enemyDeathAnimation();
                    }
                    
                    drawHPBar(projectile.battleTargetting);     
                } else if(weaponSelected == 3) //hackArray
                {
                    //Stil need to do:
                    //apply turnsInactive to enemy ship
                    var minTurnsInactive = 1
                    var turnsInactivePerLevel = 0.25
                    if(ricochet)
                    {
                        battleShips[ricochetTarget].turnsInactive = Math.floor(minTurnsInactive+battleShips[0].hackArrayLevel*turnsInactivePerLevel); 
                    } else
                    {
                        battleShips[battleTargetting].turnsInactive = Math.floor(minTurnsInactive+battleShips[0].hackArrayLevel*turnsInactivePerLevel);    
                    }
                    
                    //chance for a ricochet
                    if(getRandomInt(0,10)<battleShips[0].hackArrayLevel)
                    {
                        console.log("attempting ricochet!")
                        //do a ricochet
                        for(var i = 1 ; i < battleShips.length ; i++)
                        {
                            if(battleShips[i].turnsInactive == null)
                            {
                                ricochet = true;
                                ricochetTarget = i;
                                projectileMove();
                                break;
                            } else
                            {
                                ricochet = false;
                                ricochetTarget = null;
                            }
                        }
                    }else
                    {
                        ricochet = false;
                        ricochetTarget = null;
                    }
                }
                
                
                
            }
        
        if(!ricochet)
        {
            showEnemyAttacks(1);    
            battleTargetting = false;
        }
        
        if(weaponSelected==0) //torpedo explosion
        {
            var explosion = game.add.sprite(projectile.x, projectile.y, 'kaboom');
            explosion.anchor.setTo(0.5,0.5)
            var explosionReference = explosion.animations.add('explode');
            explosion.events.onAnimationComplete.add(function(){
                explosion.destroy()
                }, this);
            explosionReference.play('kaboom', 30, false, true);    
        }
       
        projectile.destroy();
        if(!ricochet)
        {
          battleTargetting = false;  
        }
        
        
        function tintShip()
        {
            if(battleShips[projectile.battleTargetting].tint < 0xFFFFFF)
            {
                game.time.events.add(Phaser.Timer.SECOND * getRandomInt(1,10)/100, tintShip, this);
                battleShips[projectile.battleTargetting].tint += 0xFFFFFF/15;    //=0x111111 or 1118481  this moves through only the gray shades
            } else
            {
                 battleShips[projectile.battleTargetting].tint = 0xFFFFFF;
            }

        }
        
        function enemyDeathAnimation()
        {
            battleShips[projectile.battleTargetting].alpha=0.3
            var tweenAlpha = game.add.tween(battleShips[projectile.battleTargetting]).to( { alpha: .8}, 1000, Phaser.Easing.Cubic.Out, true);
            tweenAlpha.onComplete.add(enemyDeathAnimationTurn);
            
        }
        
        function enemyDeathAnimationTurn()
        {
             newAngle=360;
                if(Math.abs(battleShips[projectile.battleTargetting].angle-newAngle)>180)
                {
                    newAngle -= 360;
                } 
        
                var tweenAngle = game.add.tween(battleShips[projectile.battleTargetting]).to( { angle: newAngle}, 3000, Phaser.Easing.Cubic.Out, true);
                tweenAngle.onComplete.add(enemyDeathAnimationExit);    
        }
        
        function enemyDeathAnimationExit()
        {
            var tweenY = game.add.tween(battleShips[projectile.battleTargetting]).to( { y: battleShips[projectile.battleTargetting].y-arenaGridSpacing*2}, 3000, Phaser.Easing.Linear.Out, true);
            var tweenAlpha = game.add.tween(battleShips[projectile.battleTargetting]).to( { alpha: 0}, 3000, Phaser.Easing.Cubic.Out, true);
            tweenAlpha.onComplete.add(checkForBattleEnd);
        }
        
        function checkForBattleEnd()
        {
            var enemiesAlive = 0;
            for (var i = 1 ; i < battleShips.length ; i++)
            {
                if(!battleShips[i].dead) {enemiesAlive++}
            }
            if(enemiesAlive == 0) //everyone's dead
            {
                enemyAttackSequenceComplete = false; //to prevent attack buttons
                lootCheck()
            }
        }
           
        
    }
}

function lootCheck()
{
    var lootOverlay = game.add.group();
    var lootBoxGraphic = game.add.graphics(0, 0);
    lootBoxGraphic.beginFill(0x000066);  //dark blue
    lootBoxGraphic.lineStyle(0, 0x000000, 1);
    lootBoxGraphic.drawRect(0, 0, 600, 300);
    lootBoxGraphic.endFill();
    currentUser.characters[currentUser.currentQuest].questComplete = 'true';
    var lootBox = game.add.sprite(100,150,lootBoxGraphic.generateTexture())
    lootBoxGraphic.destroy();
    lootBox.alpha = 0.7
    lootOverlay.add(lootBox)
    
    
    var lootedCredits = ((currentUser.challengesMastered/3)*getRandomInt(30,50)/10+2).toFixed(0);

    var creditLootText = game.add.text(125,175,"You scavenged " + lootedCredits + " credits.")
    creditLootText.font = 'Michroma'
    creditLootText.fontSize = 16
    creditLootText.fill='white'
    lootOverlay.add(creditLootText)
    if(typeof currentUser.credits === 'undefined') { currentUser.credits = 0 }
    currentUser.credits = parseInt(currentUser.credits) + parseInt(lootedCredits);
    updateUserData()  //in mages.js
    
    
    var continueButton = game.add.group();
    
    var continueButtonBoxGraphic = game.add.graphics(0, 0);
    continueButtonBoxGraphic.beginFill(0x666666);  //dark gray
    continueButtonBoxGraphic.lineStyle(0, 0x000000, 1);
    continueButtonBoxGraphic.drawRect(0, 0, 150, 50);
    continueButtonBoxGraphic.endFill();
    
    var continueButtonBox = game.add.sprite(400,400,continueButtonBoxGraphic.generateTexture())
    continueButtonBox.inputEnabled='true'
    continueButtonBox.events.onInputDown.add(continueButtonClick);
    continueButtonBox.events.onInputOver.add(continueButtonOver);
    continueButtonBox.events.onInputOut.add(continueButtonOut);
    continueButtonBox.anchor.setTo(0.5,0.25)
    continueButtonBoxGraphic.destroy();
    continueButtonBox.alpha = 0.7
    continueButton.add(continueButtonBox)
    
    var continueText = game.add.text(340,400,"CONTINUE")
    continueText.anchor.setTo=(0.5,0.5)
    continueText.font = 'Michroma'
    continueText.fontSize = 16;
    continueText.fill='white'
    
    function continueButtonClick()
    {
        lootOverlay.destroy();
        continueButton.destroy();
        continueText.destroy();
        state = 'shipMenu'
        clearBattle(true)
    }
    
    function continueButtonOver()
    {
        continueText.fontSize = 17;
        continueText.x -= 5;
    }
    
    function continueButtonOut()
    {
        continueText.fontSize = 16;
        continueText.x += 5;
    }
}

var enemyAttackSequenceComplete = false;
function showEnemyAttacks(enemyPosition) {
    var nextEnemy = enemyPosition+1;
    if(nextEnemy <= battleShips.length)  //still enemies to attack
    {
        if(typeof battleShips[enemyPosition].turnsInactive === 'undefined')
        {
            battleShips[enemyPosition].turnsInactive=0;
        }
        enemyAttackSequenceComplete = false;
        //enemy attack animations using enemy position as index
        if(battleShips[enemyPosition].dead)
        {
            showEnemyAttacks(enemyPosition+1) //skip it, he's dead
        } else if(battleShips[enemyPosition].turnsInactive > 0)
        {
                if(nextEnemy <= battleShips.length)
                {
                    console.log("Skipping an idle enemy");
                    enemyAttackSequenceComplete = false;
                    battleShips[enemyPosition].turnsInactive--;
                    showEnemyAttacks(enemyPosition+1);
                } else
                {
                    console.log("Enemy attacks sequence complete after idle enemies.");
                    enemyAttackSequenceComplete = true;
                    

                }
        }else
        {
            showEnemyAttackAnimation(enemyPosition)   
        }
        
    }   else
    {
        console.log("Enemy attacks sequence complete.");
        enemyAttackSequenceComplete = true;
    }
    
    

    function showEnemyAttackAnimation(enemyPosition) {
        var projectile;
        if(battleShips[enemyPosition].hacks > 0)
        {
            enemyAttack('hack')
        } else if(battleShips[enemyPosition].torpedoes > 0) 
        {
            enemyAttack('torpedo')
        } else if(checkLaserRange()) 
        {
            enemyAttack('laser')
        } else
        {
            moveTowardPlayer();
        }
        
        function moveTowardPlayer()
        {
            var topScore = null;
            var moveScores = [];
            for(var xPos = -1 ; xPos < 2 ; xPos++)
            {
                for(var yPos = -1 ; yPos < 2 ; yPos++)
                {
                    //check to see if another enemy occupies it (we should never get that close to player)
                    var occupied = false;
                    for (var enemyNumber = 1 ; enemyNumber < battleShips.length ; enemyNumber++)
                    {
                        var enemyBoundary = (battleShips[enemyPosition].scale.x <= 0.3 ? 1 : 2)
                        if(enemyNumber != enemyPosition)  //don't check to see if we occupy the space
                        {
                            var newPosition = {x: battleShips[enemyPosition].gridLocation.x+xPos , y: battleShips[enemyPosition].gridLocation.y+yPos}
                            if(Math.abs(battleShips[enemyNumber].gridLocation.x - newPosition.x) <= enemyBoundary && Math.abs(battleShips[enemyNumber].gridLocation.y - newPosition.y) <= enemyBoundary)
                            {
                                if(battleShips[enemyNumber].dead != true)
                                occupied = true
                            } 
                            
                        }
                    }
                    
                    if(!occupied)
                    {
                        var betterDirection;
                        var worseDirection;
                        var betterDistance;
                        var worseDistance;
                        
                        if(Math.abs(battleShips[0].gridLocation.x - battleShips[enemyPosition].gridLocation.x) > Math.abs(battleShips[0].gridLocation.y - battleShips[enemyPosition].gridLocation.y))
                        {
                            betterDirection = 'y'
                            worseDirection = 'x'
                            betterDistance = Math.abs(battleShips[0].gridLocation.y - battleShips[enemyPosition].gridLocation.y);
                            worseDistance = Math.abs(battleShips[0].gridLocation.x - battleShips[enemyPosition].gridLocation.x);
                        } else
                        {
                            betterDirection = 'x'
                            worseDirection = 'y'
                            worseDistance = Math.abs(battleShips[0].gridLocation.y - battleShips[enemyPosition].gridLocation.y);
                            betterDistance = Math.abs(battleShips[0].gridLocation.x - battleShips[enemyPosition].gridLocation.x);
                        }
                        
                        //these nested ifs score the move based on how they improve/make worse the two directions
                        if(typeof battleShips[enemyPosition].previousGridLocation === 'undefined')
                        {
                            battleShips[enemyPosition].previousGridLocation = battleShips[enemyPosition].gridLocation
                        }
                        
                        if(battleShips[enemyPosition].previousGridLocation.x == battleShips[enemyPosition].gridLocation.x+xPos  && battleShips[enemyPosition].previousGridLocation.y == battleShips[enemyPosition].gridLocation.y+yPos)
                        {
                            //don't go back to previous spot
                            moveScores.push({xPos:xPos, yPos:yPos, score: 11})
                        } else if( Math.abs(battleShips[enemyPosition].gridLocation[betterDirection]+(betterDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[betterDirection]) < betterDistance)
                        {
                            if( Math.abs(battleShips[enemyPosition].gridLocation[worseDirection]+(worseDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[worseDirection]) < worseDistance)
                            {
                                //score 1  improve both
                                moveScores.push({xPos:xPos, yPos:yPos, score: 1})
                            } else if( Math.abs(battleShips[enemyPosition].gridLocation[worseDirection]+(worseDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[worseDirection]) == worseDistance)
                            {
                                //score 3  improve better one; leave worse same
                                moveScores.push({xPos:xPos, yPos:yPos, score: 3})
                            } else if( Math.abs(battleShips[enemyPosition].gridLocation[worseDirection]+(worseDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[worseDirection]) > worseDistance)
                            {
                                //score 5 improve better one; make worse worse
                                moveScores.push({xPos:xPos, yPos:yPos, score: 5})
                            }
                        } else if( Math.abs(battleShips[enemyPosition].gridLocation[worseDirection]+(worseDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[worseDirection]) < worseDistance)
                        {
                            if( Math.abs(battleShips[enemyPosition].gridLocation[betterDirection]+(betterDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[betterDirection]) == betterDistance)
                            { 
                                //score 2 improve worse one; leave better same
                                moveScores.push({xPos:xPos, yPos:yPos, score: 2})
                            } else if( Math.abs(battleShips[enemyPosition].gridLocation[betterDirection]+(betterDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[betterDirection]) > betterDistance)
                            { 
                                //score 4 improve worse one; make better worse
                                moveScores.push({xPos:xPos, yPos:yPos, score: 4})
                            }
                        } else if( Math.abs(battleShips[enemyPosition].gridLocation[worseDirection]+(worseDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[worseDirection]) == worseDistance)
                        {
                            if( Math.abs(battleShips[enemyPosition].gridLocation[betterDirection]+(betterDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[betterDirection]) > betterDistance)
                            { 
                                //score 6 leave worse same; make better worse
                                moveScores.push({xPos:xPos, yPos:yPos, score: 6})
                            }
                        } else if( Math.abs(battleShips[enemyPosition].gridLocation[betterDirection]+(betterDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[betterDirection]) == betterDistance)
                        {
                            if( Math.abs(battleShips[enemyPosition].gridLocation[worseDirection]+(worseDirection=='y'?yPos:xPos) - battleShips[0].gridLocation[worseDirection]) > worseDistance)
                            {
                                //score 7 leave better same; make worse worse   
                                moveScores.push({xPos:xPos, yPos:yPos, score: 7})
                            }
                        } else
                        {
                            //score 9 make both worse
                            moveScores.push({xPos:xPos, yPos:yPos, score: 9})
                        }
                    } else
                    {
                        //score 10 for staying in place 
                        //this shouldn't really happen
                        moveScores.push({xPos:xPos, yPos:yPos, score: 10})
                    }
                }    
            }
            
            var currentBestMoveScore=10;
            var bestMove;
            moveScores.forEach(function(item){
                    if(item.score<currentBestMoveScore)
                    {
                        currentBestMoveScore = item.score;
                        bestMove = item;
                    }
                });
            
            var newAngle = angleBetweenPoints(battleShips[enemyPosition], { x: battleShips[enemyPosition].x+bestMove.xPos*arenaGridSpacing , y: battleShips[enemyPosition].y+bestMove.yPos*arenaGridSpacing } )+90
            
            if(newAngle- battleShips[enemyPosition].angle > 180 )
            {
                newAngle -=360
            }
            var tweenAngle = game.add.tween(battleShips[enemyPosition]).to( { angle: newAngle}, 1000, Phaser.Easing.Cubic.Out, true);
            tweenAngle.onComplete.add(animateMove); 
            
            function animateMove()
            {
                battleShips[enemyPosition].shakeTween.stop();
                var tween = game.add.tween(battleShips[enemyPosition]).to( { x: arenaLeftEdge+((battleShips[enemyPosition].gridLocation.x+bestMove.xPos)*arenaGridSpacing) , y: arenaTopEdge+((battleShips[enemyPosition].gridLocation.y+bestMove.yPos)*arenaGridSpacing) }, 1500, Phaser.Easing.Cubic.Out, true);
                var tween = game.add.tween(hpBarHandle[enemyPosition]).to( { x: hpBarHandle[enemyPosition].x+bestMove.xPos*arenaGridSpacing , y: hpBarHandle[enemyPosition].y+bestMove.yPos*arenaGridSpacing }, 1500, Phaser.Easing.Cubic.Out, true);
                tween.onComplete.add(allDone);     
            }
            
            function allDone()
            {
                battleShips[enemyPosition].previousGridLocation = battleShips[enemyPosition].gridLocation 
                battleShips[enemyPosition].gridLocation = new Phaser.Point( Math.round((battleShips[enemyPosition].x-arenaLeftEdge)/arenaGridSpacing) , Math.round((battleShips[enemyPosition].y-arenaTopEdge)/arenaGridSpacing));
                shakeShip(battleShips[enemyPosition])
                showEnemyAttacks(enemyPosition+1)
                var newAngle = angleBetweenPoints(battleShips[enemyPosition], battleShips[0] )+90
            
                if(newAngle- battleShips[enemyPosition].angle > 180 )
                {
                    newAngle -=360
                }
                game.add.tween(battleShips[enemyPosition]).to( { angle: newAngle}, 1000, Phaser.Easing.Cubic.Out, true);
                
            }
        }
        
        function checkLaserRange() 
        {
            //if we're in range
            var inRange;
            var weaponRange = 6*battleShips[enemyPosition].toughness;
            var distanceToPlayer = lineDistance(battleShips[enemyPosition].gridLocation, battleShips[0].gridLocation)
            if(distanceToPlayer <= weaponRange)
            {
                inRange = true;
            } else
            {
                inRange = false;
            }
            return inRange;
        }
        
        function enemyAttack(type)
        {
            var newAngle = angleBetweenPoints(battleShips[0], {x:battleShips[enemyPosition].x,y:battleShips[enemyPosition].y} )+270
            if(Math.abs(battleShips[enemyPosition].angle-newAngle)>180)
            {
                newAngle -= 360;
            } 
    
            var tweenAngle = game.add.tween(battleShips[enemyPosition]).to( { angle: newAngle}, 1000, Phaser.Easing.Cubic.Out, true);
    
            tweenAngle.onComplete.add(callMove); 
            function callMove()
            {
                enemyProjectileMove(type)
            }
        }
        
        function enemyProjectileMove(type)
        {

            switch(type) {
            case 'torpedo':
                    projectile = game.add.sprite(battleShips[enemyPosition].x, battleShips[enemyPosition].y, 'alienWingGuns2');
                    battleShips[enemyPosition].torpedoes--
                    projectile.type = type;
                    projectile.hit = (getRandomInt(0,1)==1);
                    projectile.scale.setTo(0.5,0.2);
                    projectile.anchor.setTo(0.5,1);
                    
                break;
            case 'hack':
                    projectile = game.add.sprite(battleShips[enemyPosition].x, battleShips[enemyPosition].y, 'lightning');
                    battleShips[enemyPosition].hacks--
                    projectile.type = type;
                    projectile.hit = (getRandomInt(0,1)==1);
                    projectile.scale.setTo(0.1,0.3)
                    projectile.anchor.setTo(0.5,0.5)
                    var lightningReference = projectile.animations.add('strike');
                    lightningReference.play(20, true, false);
                    var tweenLength = game.add.tween(projectile.scale).to( { x: 0.3, y: 0.3 }, 500, Phaser.Easing.Quartic.Out, true);
                    if(!projectile.hit) //just disappear because you missed
                    {
                        var tweenAlpha = game.add.tween(projectile).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.Out, true);
                    }
                break;
             case 'laser':
                    projectile = game.add.sprite(battleShips[enemyPosition].x, battleShips[enemyPosition].y, 'laserPink');
                    projectile.type = type;
                    projectile.hit = (getRandomInt(0,1)==1);
                    beamStrike(battleShips[enemyPosition], battleShips[0], 0.2)
                break;
            }
            
            projectile.angle = angleBetweenPoints(battleShips[enemyPosition], battleShips[0])+90
            if(projectile.type == 'hack')
            {
                projectile.angle +=90;
            }
            
            
            
            var distance = lineDistance(battleShips[0], battleShips[enemyPosition]);
            if(projectile.type != 'laser')
            {
                var tween = game.add.tween(projectile).to( { x: battleShips[0].x + (projectile.hit==1 ? 0 : getRandomInt(20,40)), y: battleShips[0].y + (projectile.hit==1 ? 0 : getRandomInt(20,40))}, distance*4, Phaser.Easing.Quartic.In, true);
                tween.onComplete.add(cycleEnemyAttacks);    
            }
            
            
            battleShips[enemyPosition].bringToTop()
            enemyPosition++;
            battleShips[0].bringToTop();
            
        }
        
        function cycleEnemyAttacks()
        {
            if(projectile.type == 'hack')
            {
                shrinkLightning()
            } else if(projectile.type == 'torpedo')
            {
                torpedoExplosion();
            }
            showEnemyAttacks(enemyPosition)
            
            if(projectile.hit==1) {
                if(projectile.type == 'torpedo')
                {
                    cameraShake(5);    
                }
                
                for(var i =0; i<getRandomInt(1,4); i++)
                {
                    sparkBlast(getRandomInt(10,130),getRandomInt(10,600),getRandomInt(5,10)/10);    
                }
                //player hp damage
            if(projectile.type != 'hack')
            {
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
                if(typeof projectile.buff !== 'undefined')
                {
                    //projectile.buff = {name:'extra 25% damage' , range:[4,4]}
                    //projectile.buff = {name:'extra 10-20% damage' , range:[5,10]}
                    //projectile.buff = {name:'Heal target 50%!' , range:[-2,-2]}
                    //projectile.buff = {name:'1 in 10 chance critical hit!' , range:[0,(getRandomInt(0,4)==0?1:0)]}
                    damage += getRandomInt(projectile.buff.range[0],projectile.buff.range[1])
                }
                battleShips[0].hp.now -= damage;
                hpBarHandle[0].destroy();
                drawHPBar(0);
                } else
                {
                   
                   if(projectile.hit)
                   {
                       battleShips[0].weaponsDisabled = getRandomInt(1,3)
                   }
                }
                console.log("TYPE:  " + projectile.type)
                

            } 
            
            if(projectile.type=='torpedo')
            {
                projectile.destroy();
            }
                
            

        }
        
        function torpedoExplosion()
        {
            var explosion = game.add.sprite(projectile.x, projectile.y, 'kaboom');
            explosion.anchor.setTo(0.5,0.5)
            var explosionReference = explosion.animations.add('explode');
            explosion.events.onAnimationComplete.add(function(){
                explosion.destroy();
                
            }, this);
            explosionReference.play('kaboom', 30, false, true);
        }
        
        function shrinkLightning()
        {
            projectile.scale.setTo(0.2,0.8)
            var tweenScale = game.add.tween(projectile).to( {alpha:0}, 1000, Phaser.Easing.Bounce.Out, true);
            tweenScale.onComplete.add(destroyLignting); 
            
            if(projectile.hit)
            {
                var particleArray = [ [0,1,2,3,4,5,6,7],[8,9,10,11,12,13,14,15],[16,17,18,19,20,21,22,23] ][2]  //just light blue for now

                var speed = .1;
                var emitter = game.add.emitter(battleShips[0].x, battleShips[0].y, 200);
                emitter.makeParticles('sparks', particleArray);
                
                emitter.forEach(function(trailParticle){
                        game.add.tween(trailParticle).to( { alpha: 0}, 1000, Phaser.Easing.Linear.Out, true);   
                    });
                emitter.maxParticleSpeed.setTo(getRandomInt(500,1500)*speed, getRandomInt(500,1500)*speed);
                emitter.minParticleSpeed.setTo(getRandomInt(500,1500)*-1*speed, getRandomInt(500,1500)*-1*speed);
                emitter.minParticleScale = .5;
                emitter.maxParticleScale = .5;
                emitter.gravity = 0;
                emitter.start(true, 1000, 1, 50);    
            }
            
        }
        
        function destroyLignting()
        {
            projectile.destroy();
        }
        
        function beamStrike(start, finish, width)
        {
            var newAngle = angleBetweenPoints(start, finish )
            var beam = projectile
            var distance = lineDistance(start, finish);
            beam.scale.setTo(width,0)
            beam.anchor.setTo(0.5,1)
            beam.angle = newAngle+90;
        
        
            var tweenLength = game.add.tween(beam.scale).to( { x: width, y: distance/600 }, distance/2, Phaser.Easing.Linear.In, true);
             
            tweenLength.onComplete.add(holdBeam, projectile); 
            
            battleShips.forEach(function(item){
                if(item!=null)
                {
                    game.world.bringToTop(item);   
                }
                
            });
            
        
            function holdBeam()
            {
                game.time.events.add(Phaser.Timer.SECOND * 1.5, shrinkBackBeam);
                if(beam.hit)  //veer the beams away from the target
                {
                    var smokeEmitter = game.add.emitter(battleShips[0].x, battleShips[0].y, 200);
                    smokeEmitter.makeParticles('smokeParticle');
                    smokeEmitter.maxParticleSpeed.setTo(    50     ,   50  );
                    smokeEmitter.minParticleSpeed.setTo(    -50     ,   -50  );
                    smokeEmitter.minParticleScale = .02;
                    smokeEmitter.maxParticleScale = .10;
                    smokeEmitter.gravity = 0;
                    smokeEmitter.start(false, 3000, 1, 120);
                    smokeEmitter.forEach(function(trailParticle){
                            game.add.tween(trailParticle).to( { alpha: 0}, 1500, Phaser.Easing.Linear.Out, true);   
                        });    
                } else
                {
                    var tweenAngle = game.add.tween(beam).to( { angle: beam.angle }, 1000, Phaser.Easing.Elastic.In, true);
                    var tweenAlpha = game.add.tween(beam.scale).to( { x: 0 , y: 0.5*distance/600}, 1000, Phaser.Easing.Bounce.In, true);
                } 
                
        
            }
            
            function shrinkBackBeam()
            {
                //this looks neat
                cycleEnemyAttacks();
                var tweenLocation = game.add.tween(beam.anchor).to( { x: 0.5, y: 2 }, distance/2, Phaser.Easing.Linear.In, true);
                var tweenLength = game.add.tween(beam.scale).to( { x: width, y: 0 }, distance/2, Phaser.Easing.Linear.In, true);
                tweenLength.onComplete.add(finishBeam, projectile); 
            }
            
            function finishBeam()
            {
        
                projectile.destroy();
            }
            
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
    
    

function clearBattle(end) {
//     var battleShipDetailPane = null
// var targetButton = null;
    battleBackground.destroy(true);
    if(battleShipDetailPane != null)
    {
        
        battleShipDetailPane.destroy(true);
        battleShipDetailPane=null;
        targetButton = null;
    }
    
    if(torpedoLabel != null)
    {
        torpedoLabel.destroy();
        torpedoLabel = null;
    }
    
    if(battleReticule != null)
    {
        battleReticule.lines.forEach(function(item){
                    item.destroy();
                });
        battleReticule.destroy();
        battleReticule = null;
    }
    
    battleButtons.forEach(function(item){
            item.destroy(true)
        });
    battleShips.forEach(function(item){
        if(item!=null)
        {
           item.alpha=0 
        }
            
        });
    hpBarHandle.forEach(function(item){
        if(item!=null)
        {
            item.destroy();
        }
            
        });
    battleCombatLabels[0].destroy();
    battleCombatLabels[1].destroy();
    battleCombatLabels = [];
    battleBackground = null;
    battleOrders = null; 
    battleButtons = [];
    // if everyone's dead clear stuff and run lootcheck
    if(end)
    {
        for (var i = 1; i < battleShips.length ; i++)  //enemy ships
        {
            battleShips[i].destroy();
        }
        
        battleShips = [battleShips[0]]  //just keep the player ship

        hpBarHandle.forEach(function(item){
            if(item != null)
            {
                item.destroy();    
            }
        });
        
        hiddenButtons.forEach(function(button){
                    button.group.alpha = 1;
                    button.inputEnabled=true;
                    button.input.useHandCursor = true;
                });
        hiddenButtons.spaceStationScene.alpha=1;
    } else
    {
        //go to the queued applet
        state='applet'; 
    }

}

var battleShipDetailPane = null
var battleReticule = null
var targetButton = null;
var enemyClickReady = true;
function enemyShipClick(item) {
    var reticuleYOffset = 4*item.height/55
    if(enemyAttackSequenceComplete || battleFirstRound )
    {
        if(enemyClickReady && !battleShips[item.enemyID].dead && battleShips[item.enemyID].alpha == 1){
            buildPaneAndReticule()   
            enemyClickReady = false;
            game.time.events.add(Phaser.Timer.SECOND * .3, resetClickTimer);
        }
        
    }
    
    function resetClickTimer()
    {
        enemyClickReady = true;
    }
    function buildPaneAndReticule()
    {

    
        if(battleReticule != null && battleShipDetailPane !=null)
        {
            if (battleShipDetailPane.enemyID == item.enemyID)  //clicked again
            {
                addDetailPane();
            } else
            {
                game.add.tween(battleReticule).to( { x: item.x, y: item.y}, 300, Phaser.Easing.Quartic.In, true);
                var tween = game.add.tween(battleReticule.scale).to( { x: 0.45*item.width/45, y: 0.45*item.height/55}, 300, Phaser.Easing.Sinusoidal.Out, true);
                tween.onComplete.add(addDetailPane);    
            }
    
            
            
            
            
        } else
        {
            battleReticule = game.add.sprite(item.x, item.y, 'battleReticule');
            battleReticule.scale.setTo(0.45*item.width/45,0.45*item.height/55);
            battleReticule.anchor.setTo(0.5,0.5);
            battleReticule.lines = [];
    
            reticuleLines(true);  
            battleShips.forEach(function(item){
                if(item!=null)
                {
                    game.world.bringToTop(item);   
                }
                    
                });
            game.world.bringToTop(battleReticule);  
            hpBarHandle.forEach(function(item){
                if(item!=null)
                {
                    game.world.bringToTop(item);   
                }
                    
                });
            addDetailPane();
        }    
    }
    
    
    function reticuleLines(fresh)
    {
        var line = game.add.graphics(0, 0);
        line.lineStyle(2, 0x000066, 1);
        line.lineTo(600, 0);
        for(var i = 0; i < 4 ; i ++)
        {
            var reticuleLineXOffset=0;
            var reticuleLineYOffset=0;
            var reticuleLineLengthScale ;
            var reticuleLineAngle;
            switch(i) {
            case 0:
                reticuleLineXOffset += battleReticule.width/2
                reticuleLineYOffset += 0 
                reticuleLineLengthScale = (arenaRightEdge+arenaGridSpacing/1.2-(battleReticule.x+reticuleLineXOffset))/600
                reticuleLineAngle = 0
                break;
            case 1:
                reticuleLineXOffset += -battleReticule.width/2
                reticuleLineYOffset += 0
                reticuleLineLengthScale =   (((battleReticule.x+reticuleLineXOffset)-arenaLeftEdge+arenaGridSpacing/1.2))/600
                reticuleLineAngle = 180     
                break;
            case 2:
                reticuleLineXOffset += 0
                reticuleLineYOffset += +battleReticule.height/2
                reticuleLineLengthScale = (arenaBottomEdge+arenaGridSpacing/1.2-(battleReticule.y+reticuleLineYOffset))/600
                reticuleLineAngle = 90
                break;
            case 3:
                reticuleLineXOffset += 0
                reticuleLineYOffset += -battleReticule.height/2
                reticuleLineLengthScale = (((battleReticule.y+reticuleLineYOffset)-arenaTopEdge+arenaGridSpacing/1.2))/600
                reticuleLineAngle = 270
                break;

            }
            if(reticuleLineLengthScale<0.01){reticuleLineLengthScale=0}

            if(fresh)
            {
                battleReticule.lines[i] = game.add.sprite( battleReticule.x+reticuleLineXOffset , battleReticule.y+reticuleLineYOffset , line.generateTexture())    
                battleReticule.lines[i].scale.setTo(reticuleLineLengthScale,1);
                battleReticule.lines[i].angle = reticuleLineAngle;
                battleReticule.lines[i].anchor.setTo(0,0.5)
            } else
            {
                game.add.tween( battleReticule.lines[i]).to( { x: battleReticule.x+reticuleLineXOffset, y: battleReticule.y+reticuleLineYOffset}, 300, Phaser.Easing.Quartic.In, true);
                game.add.tween( battleReticule.lines[i].scale).to( { x: reticuleLineLengthScale, y: 1}, 300, Phaser.Easing.Quartic.In, true);
            }

            
        }
        line.destroy();
    }
    
    function addDetailPane()
    {
        reticuleLines(false)
        if( (enemyAttackSequenceComplete && !item.dead) || battleFirstRound )
        {
            if(battleShipDetailPane == null)
            {
                battleShipDetailPane = game.add.sprite(battleReticule.x-(battleReticule.width/2), battleReticule.y-(battleReticule.height/2)+reticuleYOffset, 'battleShipDetailPane');
                battleShipDetailPane.enemyID = item.enemyID
            } else if(battleShipDetailPane.enemyID == item.enemyID) //clicked again
            {

                battleReticule.lines.forEach(function(line){
                    line.destroy();

                });
                battleReticule.destroy()
                
                hpBarHandle[battleShipDetailPane.enemyID].destroy();
                drawHPBar(battleShipDetailPane.enemyID);

                battleShipDetailPane.destroy(true);
                battleShipDetailPane = null
                targetButton = null;
                
                battleReticule=null

            } else
            {
                hpBarHandle[battleShipDetailPane.enemyID].destroy();
                drawHPBar(battleShipDetailPane.enemyID);
                battleShipDetailPane.destroy(true);
                battleShipDetailPane = game.add.sprite(battleReticule.x-(battleReticule.width/2), battleReticule.y-(battleReticule.height/2)+reticuleYOffset, 'battleShipDetailPane');
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
    
            
               
        }    
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
                modelShip.inputEnabled='true';
                modelShip.input.useHandCursor = true;
                modelShip.events.onInputDown.add(showMoreEnemyDetail, modelShip);
                hpBarHandle[item.enemyID].destroy();
                drawHPBar(item.enemyID,1,new Phaser.Point(battleShipDetailPane.x,battleShipDetailPane.y));
                
    
                
            }
            if(battleTargettingWeapon != false)
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

            }
            function battleTargetClick(targetButton)
            {
                
                //check range on laser weapon
                var minLaserRange = 6;
                var rangePerLaserLevel = 0.5;
                console.log("setting target to enemy id")
                battleTargetting = battleShipDetailPane.enemyID;
                //if(weaponSelected == 1  && lineDistance(battleShips[0], battleShips[battleTargetting]) > ((battleShips[0].laserLevel*rangePerLaserLevel+minLaserRange)*arenaGridSpacing))
                if(weaponSelected == 1  && lineDistance(battleShips[0].gridLocation, battleShips[battleTargetting].gridLocation) > ((battleShips[0].laserLevel*rangePerLaserLevel+minLaserRange)))
                {
                    outOfRange()
                    battleTargetting = false;

                } else if(weaponSelected == 0  && battleShips[0].torpedoes<1)
                {
                    outOfTorpedoes()
                    battleTargetting = false;

                } else if(weaponSelected == 3  && battleShips[0].power.now<(20-battleShips[0].hackArrayLevel))
                {
                    outOfPower()
                    battleTargetting = false;

                } else
                {
                    hpBarHandle[battleShipDetailPane.enemyID].destroy();
                    drawHPBar(battleShipDetailPane.enemyID)
                    
                    battleShipDetailPane.destroy(true);
                    battleShipDetailPane = null
                    targetButton = null;
                    if(battleShipDetailPane != null)
                    {
                        
                        battleShipDetailPane.destroy(true);
                        battleShipDetailPane=null;
                        targetButton = null;
                    }
                    if(battleReticule != null)
                    {
                        battleReticule.lines.forEach(function(item){
                                    item.destroy();
                                });
                        battleReticule.destroy();
                        battleReticule = null;
                    }

                    playerAttackDone = false;
                    battleOrders = 'complete'
                    clearBattle();  
                }
                function outOfRange()
                {
                    //put up a temporary out of range warning that fades after a few seconds
                    console.log("out of range")
                    battleAlert("The target is out of range.")
                }
                function outOfTorpedoes()
                {
                    //put up a temporary out of range warning that fades after a few seconds
                    console.log("out of torpedoes")
                    battleAlert("You are out of torpedoes.")
                }
                function outOfPower()
                {
                    //put up a temporary out of range warning that fades after a few seconds
                    console.log("out of power")
                    battleAlert("You are out of power.")
                }

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

function showMoreEnemyDetail(ship)
{
    console.log(ship.parent.enemyID)
    var quests = game.cache.getJSON('quests');
    var shipTorpedoes = quests[currentUser.currentQuestID ][ship.parent.enemyID-1].torpedoes
    var shipHacks = quests[currentUser.currentQuestID][ship.parent.enemyID-1].hacks
    var weaponRange = 6*quests[currentUser.currentQuestID][ship.parent.enemyID-1].toughness;
    var alertText = (shipTorpedoes > 0 ? "Torpedoes: " + shipTorpedoes + " " : "") + (shipHacks > 0 ? "Hack Charges: " + shipHacks + " " : "")
    if(alertText != "") {battleAlert(alertText)}
    drawRangeCircle()
    function drawRangeCircle()
    {
        if(typeof battleShips[ship.parent.enemyID].rangeCircleDrawn === 'undefined')
        {
            battleShips[ship.parent.enemyID].rangeCircleDrawn = false
        }
        
        if(battleShips[ship.parent.enemyID].rangeCircleDrawn == false)
        {
            battleShips[ship.parent.enemyID].rangeCircleDrawn = true
            var rangeEnemyID = ship.parent.enemyID
            var circleGraphic = game.add.graphics(0,0)
            circleGraphic.beginFill(0xFF0000, 1);
            circleGraphic.drawCircle(0, 0, weaponRange*arenaGridSpacing*2);
            var circleSprite = game.add.sprite(battleShips[ship.parent.enemyID].x-weaponRange*arenaGridSpacing,battleShips[ship.parent.enemyID].y-weaponRange*arenaGridSpacing,circleGraphic.generateTexture())
            circleGraphic.destroy();
            circleSprite.alpha=0.3;
            game.world.bringToTop(battleShips[ship.parent.enemyID]);
            game.world.bringToTop(battleReticule)
            game.time.events.add(Phaser.Timer.SECOND * 1.5, fadeOut);
        }
        
        function fadeOut()
        {
            var tweenAlpha = game.add.tween(circleSprite).to( { alpha:0 }, 1500, Phaser.Easing.Cubic.Out, true);
            tweenAlpha.onComplete.add(deleteRangeCircle);    
        }

        
        function deleteRangeCircle()
        {

            battleShips[rangeEnemyID].rangeCircleDrawn = false    

            circleSprite.destroy();
        }
        
    }
}
var inRetreat = false;
function retreat()
{
    
    inRetreat = true;              
    battleTargetting = null;
    battleTargettingWeapon = false;
    if(battleShipDetailPane != null)
        {
            battleShipDetailPane.destroy(true);
            battleShipDetailPane=null;
            targetButton = null;
        }
    targetButton = null;
    
    if(battleReticule != null)
    {
        battleReticule.lines.forEach(function(item){
                    item.destroy();
                });
        battleReticule.destroy();
        battleReticule = null;
    }

    playerAttackDone = false;
    battleOrders = 'complete'
    clearBattle();  
}

function battleButtonClick(item) {
    if(enemyAttackSequenceComplete || battleFirstRound )
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
                retreat()
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
            if(checkPlayerBoundaries() )
            {
                playerMovePending = { xSpaces:xSpaces , ySpaces:ySpaces}
                clearBattle();   
            }

        } 
    
    function checkPlayerBoundaries()
    {
        var pathFree = true;
        
        for(var i =1; i < battleShips.length ; i++)
        {
            console.log(Math.round(Math.abs(battleShips[0].gridLocation.x + xSpaces - battleShips[i].gridLocation.x )))
            var enemyBoundary = (battleShips[i].scale.x <= 0.3 ? 1 : 2) 
            
            if(Math.round(Math.abs(battleShips[0].gridLocation.x + xSpaces - battleShips[i].gridLocation.x ) <= enemyBoundary) )
            {
                if(Math.round(Math.abs(battleShips[0].gridLocation.y + ySpaces - battleShips[i].gridLocation.y ) <= enemyBoundary) )
                {
                    pathFree = false
                }    
            }
        }
        return pathFree;
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
                
            
        }  else
        {
           showEnemyAttacks(1);  
        }
        
    }
    function animateMove()
            {
                battleShips[0].shakeTween.stop();
                battleShips[0].moving = true;
                var tween = game.add.tween(battleShips[0]).to( { x: arenaLeftEdge+((battleShips[0].gridLocation.x+xSpaces)*arenaGridSpacing) , y: arenaTopEdge+((battleShips[0].gridLocation.y+ySpaces)*arenaGridSpacing) }, 1500, Phaser.Easing.Cubic.Out, true);
                var tween = game.add.tween(hpBarHandle[0]).to( { x: hpBarHandle[0].x+xSpaces*arenaGridSpacing , y: hpBarHandle[0].y+ySpaces*arenaGridSpacing }, 1500, Phaser.Easing.Cubic.Out, true);
                tween.onComplete.add(resetPlayerGridLocation);     
            }
            
            function resetPlayerGridLocation() 
            {
                battleShips[0].gridLocation = new Phaser.Point( battleShips[0].gridLocation.x+xSpaces , battleShips[0].gridLocation.y+ySpaces)
                battleOrders = 'complete'
                battleShips[0].moving = false;
                shakeShip(battleShips[0])
                showEnemyAttacks(1);  
            }
    
}

function battleButtonOver(item){
    if(battleShips[0].weaponsDisabled == 0  || item.buttonID>3)
    {
        if(battleTargettingWeapon == false && (enemyAttackSequenceComplete || battleFirstRound ))
        {
            if(battleShipDetailPane != null)
            {
                hpBarHandle[battleShipDetailPane.enemyID].destroy();
                
                battleReticule.lines.forEach(function(line){
                        line.destroy();
                    });
                drawHPBar(battleShipDetailPane.enemyID);
                battleShipDetailPane.destroy(true);
                battleShipDetailPane = null 
                if(battleReticule != null)
                {
                    
                    battleReticule.destroy();
                    battleReticule = null;   
                }
                
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
   
}

function battleButtonOut(item){
    if(battleTargettingWeapon == false)
    {
        item.tint = 0xFFFFFF;
        item.scale.setTo(1)    
    }
    
}

var battleTargettingWeapon = false;
var battleTargetting = false; 
var weaponSelected = null;
function playerTargetting(buttonID) {
    if(battleShips[0].weaponsDisabled > 0)
    {
            console.log("weapons disabled")
            battleAlert("Weapons are temporarilly disabled due to enemy hack.")
    } else
    {
        weaponSelected = buttonID;
        if(battleTargettingWeapon == false)
        {
            battleTargettingWeapon = buttonID+1; //cannot be 0 due to implicit conversion of 0 to false
            battleButtons[buttonID].tint = 0xFF0000;
            battleButtons[buttonID].scale.setTo(1)
        } else if(battleTargettingWeapon-1 == buttonID)
        {
            battleTargettingWeapon = false;
            battleButtons[buttonID].tint = 0xFFFFFF;
        } else
        {
            console.log("setting target")
            battleButtons[battleTargettingWeapon-1].tint = 0xFFFFFF;
            battleTargettingWeapon = buttonID+1;
            battleButtons[buttonID].tint = 0xFF0000;
            battleButtons[buttonID].scale.setTo(1)
        }   
    }
    
}

var totalShakes = null;
function cameraShake(shakes) {
    if(totalShakes == null)
    {
        totalShakes = shakes;
    }
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
        barPoint = new Phaser.Point(battleShips[shipID].x-scale*25,battleShips[shipID].y+scale*30*(battleShips[shipID].height/50));
    } else
    {
        barPoint = new Phaser.Point(differentLocation.x-199,differentLocation.y+140);  //why?
    }


    
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

}





function parkingMovement()
{
    // defineCharacters();
    var starsSprite = game.add.sprite(400,300, 'starfield');
    starsSprite.anchor.setTo(0.5,0.5)
    var spaceStation = game.add.group();
    spaceStation.add(game.add.sprite(-460, -355, 'spaceStation'))
    var parkingSpots = [
            {x: 597, y: 7, angle: 190, iterations: 190 , finalOffset: {x: -20, y: -10}},
            {x: 681, y: 103, angle: 260, iterations:240, finalOffset: {x: 0, y: 30}},
            {x: 820, y: 240, angle: 245, iterations:280, finalOffset: {x: 10, y: -20}},
            {x: 796, y: 364, angle: 315, iterations: 330, finalOffset: {x: 10, y: 10}},
            {x: 770, y: 559, angle: 305, iterations: 370, finalOffset: {x: 10, y: -25}},
            {x: 648, y: 608, angle: 370, iterations: 435, finalOffset: {x: -10, y: -30}},
            {x: 478, y: 700, angle: 355, iterations: 465, finalOffset: {x: -30, y: 0}},
            {x: 372, y: 641, angle: 425, iterations: 525, finalOffset: {x: 30, y: -15}},
            {x: 181, y: 575, angle: 405, iterations: 565, finalOffset: {x: -25, y: -20}},
            {x: 159, y: 449, angle: 475, iterations: 615, finalOffset: {x: 30, y: 22}},
            {x: 98, y: 261, angle: 455, iterations: 650, finalOffset: {x: -10, y: 25}},
            {x: 184, y: 166, angle: 165+360, iterations: 710, finalOffset: {x: 0, y: -25}},
            {x: 296, y: 16, angle: 150+360, iterations: 740, finalOffset: {x: -30, y: 0}},
            {x: 425, y: 30, angle: 220, iterations: 170, finalOffset: {x: 5, y: -15}}
        ];
    
    var emptySpot=getRandomInt(0,13);
    //var emptySpot=1;
    parkingSpots.forEach(function(spot){
            if (parkingSpots.indexOf(spot) != emptySpot)
            {
                var parkedShip = game.add.sprite(spot.x-460, spot.y-355, buildShip(1,[255,255,255],getRandomHumanShip()))
                parkedShip.scale.setTo(1/3,1/3);
                parkedShip.anchor.setTo(0.5,0.3)
                parkedShip.angle = spot.angle
                spaceStation.add(parkedShip)   
            }

        });
        
    var playerSprite = game.add.sprite(400, 300,  buildShip(1,[255,255,255],getPlayerShip(currentUser.challengesMastered/3+1))); //set to currentUser.challengesMastered/3+1
    
    var radius = 700;
    
    playerSprite.angle = 180;
    playerSprite.alpha=0
    playerSprite.scale.setTo(0,0);
    
    playerSprite.anchor.setTo(0.5,0.5)
    spaceStation.scale.setTo(0,0);
    
    
    var iterations=0;
    game.add.tween(playerSprite).to( {alpha:1}, 3000, Phaser.Easing.Linear.Out, true);
    game.add.tween(playerSprite.scale).to( {x:1/3,y:1/3}, 2000, Phaser.Easing.Linear.Out, true);
    var tweenScale = game.add.tween(spaceStation.scale).to( {x:1.5,y:1.5}, 2000, Phaser.Easing.Sinusoidal.Out, true);
                tweenScale.onComplete.add(startMovement); 
    var frameRate = 30;
    var finalSpotCoordinates = startMovement()
    var parking = false;
    function startMovement()
    {
        starsSprite.x = 400 + (((spaceStation.x+400-750)/750)*50)
        starsSprite.y = 300 + (((spaceStation.y+300-750)/750)*50)
        iterations++;
        var period = iterations*.01
        spaceStation.x = 400 + Math.cos(period) * radius;
        spaceStation.y = 300 + Math.sin(period) * radius;
        playerSprite.angle = angleBetweenPoints(spaceStation,playerSprite)+180
        if(iterations < parkingSpots[emptySpot].iterations)
        {
            game.time.events.add(Phaser.Timer.SECOND/frameRate, startMovement, this);
            if(parkingSpots[emptySpot].iterations-iterations<frameRate*1)
            {
                frameRate=frameRate*0.95
            
            } 
            
        }  else if(!parking)
        {
            parking=true;

            var finalSpotCoordinates = new Phaser.Point((spaceStation.x-460+parkingSpots[emptySpot].x), (spaceStation.y-355+parkingSpots[emptySpot].y))
            
            var newAngle=angleBetweenPoints(playerSprite, finalSpotCoordinates)+90
            game.add.tween(playerSprite).to( {angle: newAngle}, 1000, Phaser.Easing.Linear.In, true);
            var slowDown = game.add.tween(playerSprite).to( {x: playerSprite.x+Math.cos(playerSprite.angle+90)*30 , y: playerSprite.y+Math.sin(playerSprite.angle+90)*30}, 1500, Phaser.Easing.Sinusoidal.Out, true);
            slowDown.onComplete.add(parkShip)
        } 
        
        function parkShip()
        {
            var newX = spaceStation.x+400-(spaceStation.x-460*1.5+parkingSpots[emptySpot].x*1.5)+parkingSpots[emptySpot].finalOffset.x
            var newY = spaceStation.y+300-(spaceStation.y-355*1.5+parkingSpots[emptySpot].y*1.5)+parkingSpots[emptySpot].finalOffset.y

             var moveStation = game.add.tween(spaceStation).to( {x: newX , y: newY}, 1500, Phaser.Easing.Sinusoidal.Out, true);
             game.add.tween(playerSprite).to( {angle:parkingSpots[emptySpot].angle-360}, 1500, Phaser.Easing.Sinusoidal.Out, true);
             moveStation.onComplete.add(callStationAgent)
        }
        
        function callStationAgent()
        {
            // starsSprite.destroy();
            // spaceStation.destroy();
            // playerSprite.destroy();
            spaceStation.orginalX = spaceStation.x
            spaceStation.orginalY = spaceStation.y
            playerSprite.orginalX = playerSprite.x
            playerSprite.orginalY = playerSprite.y
            
            shakeStation();
            var spaceStationScene = game.add.group()
            spaceStationScene.add(starsSprite)
            spaceStationScene.add(spaceStation)
            spaceStationScene.add(playerSprite)
            
            buildShipMenu(spaceStationScene)
            
            //createConversation('stationAgent');
        }
        
        function shakeStation() {
            var min = -2;
            var max = 2;
            var newX =  Math.floor(Math.random() * (max - min + 1)) + min;
            var newY =  Math.floor(Math.random() * (max - min + 1)) + min;
            var duration = getRandomInt(1000,2000)
            spaceStation.shakeTween = game.add.tween(spaceStation).to( { x: spaceStation.orginalX+newX, y: spaceStation.orginalY + newY}, duration, Phaser.Easing.Linear.Out, true);
            game.add.tween(playerSprite).to( { x: playerSprite.orginalX+newX, y: playerSprite.orginalY + newY}, duration, Phaser.Easing.Linear.Out, true);
            spaceStation.shakeTween.onComplete.add(shakeStation);      

          
        }


    }


    
}

function buildShipMenu(spaceStationScene)
{
    state = 'shipMenu'
    var buttons = []
    var menuAlpha = 0.8
    var menuItems = game.add.group();
    buttons.push(game.add.sprite(10,50,  'shipMenuCombatButton'));
    buttons.push(game.add.sprite(10,190, 'shipMenuShipButton'));
    buttons.push(game.add.sprite(10,330, 'shipMenuCommButton'));
    buttons.push(game.add.sprite(10,470, 'shipMenuMiningButton'));
    
    var panelTextures = ['shipMenuCombatPane', 'shipMenuShipPane'  , 'shipMenuCommPane' , 'shipMenuMiningPane' ]
    var buttonLabels = ['COMBAT' , 'SHIP' , 'COMM' , 'MINING']
    var buttonCount = 0;
    buttons.forEach(function(button){
            menuItems.add(button)
            button.id = buttonCount;
            button.paneLoaded = false;
            button.scale.setTo(5/6,5/6)
            button.alpha=menuAlpha
            button.inputEnabled='true';
            button.input.useHandCursor = true;
            button.events.onInputDown.add(buttonClick, button);
            
            var buttonLabel = game.add.text(button.x+button.width/2,button.y+button.height/2, buttonLabels[buttonCount] )
            button.group = game.add.group();
            button.group.add(button)
            button.group.add(buttonLabel)
            buttonLabel.anchor.setTo(0.5,0.5);
            buttonLabel.font = 'Michroma';
            buttonLabel.fontSize = 18;
            buttonLabel.fill = '#FFFFFF';
            buttonLabel.align = 'center';
            buttonCount++;
        });
    
    function buttonClick(button)
    {
        buttons.forEach(function(button){
                if(button.paneLoaded == true)
                {
                    if(typeof button.pane.group !== 'undefined')
                    {
                        button.pane.group.destroy();
                    }

                    button.pane.destroy();
                    button.paneLoaded == false
                }
            });

        button.paneLoaded = true;
        button.pane = game.add.sprite(button.x+148,button.y, panelTextures[button.id])
        button.pane.alpha=menuAlpha
        if(button.id == 3)
        {
            button.pane.anchor.setTo(0,1)
            button.pane.y += button.height
            button.pane.x += 6
        }
        button.pane.scale.setTo(0,5/6)
        var tweenScale = game.add.tween(button.pane.scale).to( { x:5/6 , y:5/6}, 500, Phaser.Easing.Cubic.In, true);
        game.add.tween(button.pane).to( { x:button.pane.x-11 , y:button.pane.y}, 500, Phaser.Easing.Cubic.In, true);
        tweenScale.onComplete.add(populatePane)
        game.world.bringToTop(button.group);
        
        function populatePane()
        {
            var logo = [];
            var shipShadowModel;
            var shipModel;
            var swatchCursor = null;
            button.pane.group = game.add.group();
            var swatchArray = [];
            var swatchCursorMoving = false;
            switch(button.id) 
            {
                case 0:
                    //Combat
                    //startBattle()
                    questSelection(0);
                    console.log("Combat stuff here")
                    break;
                case 1:
                    //Ship
                    shipShadowModel= game.add.sprite(650,300,battleShips[0].generateTexture())
                    shipShadowModel.anchor.setTo(0.45,0.45)
                    shipShadowModel.tint = 0x000000
                    shipShadowModel.alpha=0.5
                    button.pane.group.add(shipShadowModel)
                    
                    shipModel= game.add.sprite(650,300,battleShips[0].generateTexture())
                    shipModel.anchor.setTo(0.5,0.5)
                    button.pane.group.add(shipModel)
                    

                    var shipLevelLabels = ['LASERS:' , 'TORPEDOES:' , 'HACK ARRAY:' , 'HEAT SHIELD:' , 'BLAST SHIELD:' , 'FIREWALL:']
                    var shipLevelKeys = ['laserLevel', 'torpedoLevel' , 'hackArrayLevel' , 'heatShieldLevel' , 'blastShieldLevel' , 'firewallLevel']
                    var shipLevelLocations = [{x:400,y:450},{x:400,y:490},{x:400,y:530},{x:650,y:450},{x:650,y:490},{x:650,y:530}]
                    
                    drawShipLevelBar(shipLevelLocations[0], shipLevelKeys[0] , shipLevelLabels[0])
                    
                    if(currentUser.ship.torpedoActivated == 'true')
                    {
                        drawShipLevelBar(shipLevelLocations[1], shipLevelKeys[1] , shipLevelLabels[1])    
                    }
                    
                    if(currentUser.ship.hackArrayActivated == 'true')
                    {
                        drawShipLevelBar(shipLevelLocations[2], shipLevelKeys[2] , shipLevelLabels[2])    
                    }
                    
                    for (var i = 3 ; i < 6 ; i++)
                    {
                        drawShipLevelBar(shipLevelLocations[i], shipLevelKeys[i] , shipLevelLabels[i])
                    }
                    
                    
                    logoMenu('display');
                    
                    
                    
                    console.log("Ship stuff here")
                    break;
                case 2:
                    //Comm
                    commMenu(0)

                    console.log("Comm stuff here")
                    break;
                case 3:
                    //Mining
                    console.log("Mining stuff here")
                    break;
                
                
            }
        function startBattle(questCharacter)
        {
            console.log(questCharacter)
            turnOffMenu(true);  //this menu needs to be public so I can turn it back on upon returning
            currentUser.currentQuest = questCharacter.characterID;
            var characters = game.cache.getJSON('characters');
            if(currentUser.characters[questCharacter.characterID].questPoint > characters[questCharacter.characterID].bounty.rewards.length)
            {
                currentUser.currentQuestID = questCharacter.characterID + 'Default'
                continueBattle(currentUser.currentQuestID);
                
            } else
            {
                currentUser.currentQuestID = questCharacter.questID
                continueBattle(questCharacter.questID);   
            }
            
            
        }
        
        function questSelection(page)
        {
            console.log("drawing quest page: " + page)
            //build portraits
            if(!button.pane.group.alive)
            {
                button.pane.group = game.add.group();
            }
            var portraitsPerPage = 3
            var spacing = 150;
            for(var i = page*portraitsPerPage ; i < (page+1)*portraitsPerPage ; i++)
            {
                //exclude completed quests
                if(typeof currentUser.questCharacters !== 'undefined' && typeof currentUser.characters[currentUser.questCharacters[i]] !== 'undefined' && typeof currentUser.characters[currentUser.questCharacters[i]].questPoint !== 'undefined'  && currentUser.characters[currentUser.questCharacters[i]].questPoint > 0)
                {
                    if(currentUser.characters[currentUser.questCharacters[i]].questComplete == 'false')
                    {
                        console.log("slot: " + i)
                        var backBox = game.add.graphics(0, 0);
                        backBox.beginFill(0xe6a353);  //purple
                        backBox.lineStyle(0, 0x000000, 1);
                        backBox.drawRect(-50, -50, 100, 100);
                        backBox.endFill();
                        
                        
                        var backBoxSprite = game.add.sprite(350, 120+(i-page*portraitsPerPage)*spacing, backBox.generateTexture());
                        backBoxSprite.characterID = currentUser.questCharacters[i]
                        backBox.destroy();
                        backBoxSprite.anchor.setTo(0.5,0.5);
                        backBoxSprite.alpha=0.5
                        backBoxSprite.inputEnabled='true';
                        backBoxSprite.questID =  currentUser.questCharacters[i] + currentUser.characters[currentUser.questCharacters[i]].questPoint
                        backBoxSprite.events.onInputDown.add(startBattle, this);
                        backBoxSprite.input.useHandCursor = true;
                        button.pane.group.add(backBoxSprite); 
                        
                        var portrait = game.add.sprite(backBoxSprite.x,backBoxSprite.y,currentUser.charactersActivated[i]+'Mini')
                        portrait.characterID = currentUser.questCharacters[i]
                        portrait.anchor.setTo(0.5,0.5);
                        portrait.inputEnabled='true';
                        portrait.questID =  currentUser.questCharacters[i] + currentUser.characters[currentUser.questCharacters[i]].questPoint
                        portrait.events.onInputDown.add(startBattle, this);
                        portrait.input.useHandCursor = true;
                        button.pane.group.add(portrait); 
                        
                        
                        //name label
                        if(typeof currentUser.characters[currentUser.charactersActivated[i]].knownName !== 'undefined')
                        {
                            var nameText = game.add.text(backBoxSprite.x,backBoxSprite.y+65,currentUser.characters[currentUser.charactersActivated[i]].knownName)
                            nameText.anchor.setTo(0.5,0.5);
                            nameText.font = 'Michroma';
                            nameText.fontSize = 12;
                            nameText.fill = '#FFFFFF';
                            nameText.align = 'center';   
                            button.pane.group.add(nameText); 
                        }
                        
                        //job label
                        if(typeof currentUser.characters[currentUser.charactersActivated[i]].knownJob !== 'undefined')
                        {
                            var jobText = game.add.text(backBoxSprite.x,backBoxSprite.y+80,currentUser.characters[currentUser.charactersActivated[i]].knownJob)
                            jobText.anchor.setTo(0.5,0.5);
                            jobText.font = 'Michroma';
                            jobText.fontSize = 12;
                            jobText.fill = '#FFFFFF';
                            jobText.align = 'center';   
                            button.pane.group.add(jobText); 
                        } 
                        
                        //get all the character attributes
                        var characters = game.cache.getJSON('characters');
                        
                        //summary label
                        
                        var summaryText = game.add.text(backBoxSprite.x+65,backBoxSprite.y-50,"SUMMARY: " + characters[currentUser.questCharacters[i]].bounty.summaryText[currentUser.characters[currentUser.questCharacters[i]].questPoint-1])
                        if(currentUser.characters[currentUser.questCharacters[i]].questPoint > characters[currentUser.questCharacters[i]].bounty.rewards.length)
                        {
                            summaryText.setText("SUMMARY: " + characters[currentUser.questCharacters[i]].bounty.defaultSummary);
                        }
                        summaryText.anchor.setTo(0,0);
                        summaryText.font = 'Michroma';
                        summaryText.fontSize = 12;
                        summaryText.fill = '#FFFFFF';
                        summaryText.align = 'left';   
                        summaryText.inputEnabled='true';
                        summaryText.questID =  currentUser.questCharacters[i] + currentUser.characters[currentUser.questCharacters[i]].questPoint
                        summaryText.events.onInputDown.add(startBattle, this);
                        summaryText.input.useHandCursor = true;
                        summaryText.wordWrap =  true;
                        summaryText.wordWrapWidth = 350; 
                        button.pane.group.add(summaryText); 
                        
                        
                        //reward label
                        var rewardText = game.add.text(backBoxSprite.x+65,summaryText.y+summaryText.height,"BOUNTY: " + characters[currentUser.questCharacters[i]].bounty.rewards[currentUser.characters[currentUser.questCharacters[i]].questPoint-1] + " credits")
                        if(currentUser.characters[currentUser.questCharacters[i]].questPoint > characters[currentUser.questCharacters[i]].bounty.rewards.length)
                        {
                            rewardText.setText("BOUNTY: " + characters[currentUser.questCharacters[i]].bounty.defaultReward);
                        }
                        rewardText.anchor.setTo(0,0);
                        rewardText.font = 'Michroma';
                        rewardText.fontSize = 12;
                        rewardText.fill = '#FFFFFF';
                        rewardText.align = 'left';   
                        rewardText.inputEnabled='true';
                        rewardText.questID =  currentUser.questCharacters[i] + currentUser.characters[currentUser.questCharacters[i]].questPoint
                        rewardText.events.onInputDown.add(startBattle, this);
                        rewardText.input.useHandCursor = true;
                        button.pane.group.add(rewardText); 
                            
                        
                        
                        //get all the quest attributes
                        var quests = game.cache.getJSON('quests');
                        var questShipsLabel = game.add.group()
                        
                        //if I've gone past the questLimit
                        var questKey;
                        if(currentUser.characters[currentUser.questCharacters[i]].questPoint > characters[currentUser.questCharacters[i]].bounty.rewards.length)
                        {
                            questKey = currentUser.questCharacters[i] + "Default"
                        } else
                        {
                            questKey = currentUser.questCharacters[i] + currentUser.characters[currentUser.questCharacters[i]].questPoint;
                        
                        }
                        
                        var shipLabelArray = []
                        var shipSpriteQuestID =  currentUser.questCharacters[i] + currentUser.characters[currentUser.questCharacters[i]].questPoint
                        for(var i = 0; i < quests[questKey].length  ; i++)
                        {
                            var shipSprite = game.add.sprite(i==0 ? backBoxSprite.x+70 : shipLabelArray[i-1].x+shipLabelArray[i-1].width+10 , rewardText.y+rewardText.height , buildShip(0.2 , [0,255,0], quests[questKey][i] ))
                            shipLabelArray.push(shipSprite)
                            shipSprite.anchor.setTo(0,0);
                            shipSprite.scale.setTo(0.2*quests[questKey][i].toughness,0.2*quests[questKey][i].toughness);
                            shipSprite.inputEnabled='true';
                            shipSprite.questID = shipSpriteQuestID
                            shipSprite.events.onInputDown.add(startBattle, this);
                            shipSprite.input.useHandCursor = true;
                            button.pane.group.add(shipSprite); 
                            
                        }
       
                    }
                    
            }
            
            

        }
        
        //add arrows
        if(typeof currentUser.questCharacters !== 'undefined')
        {
            if(currentUser.questCharacters.length > (page+1)*portraitsPerPage)
            {
                //add right arrow
                console.log("adding right arrow")
                var arrow = drawQuestArrow('right')
                arrow.inputEnabled='true';
                arrow.direction = 'right'
                arrow.events.onInputDown.add(turnQuestPage, this);
                arrow.input.useHandCursor = true;
                
            }    
        }
        
        
        if(page > 0)
        {
            var arrow = drawQuestArrow('left')
            arrow.inputEnabled='true';
            arrow.direction = 'left'
            arrow.events.onInputDown.add(turnQuestPage, this);
            arrow.input.useHandCursor = true;
        }
        
        function drawQuestArrow(direction)
        {
            console.log("drawing " + direction + " arrow.")
            var arrowGraphic = game.add.graphics(0, 0);
            // var arrowLocation = (direction == 'left' ? new Phaser.Point(285,425) : new Phaser.Point(740,425))
            var arrowLocation = (direction == 'left' ? new Phaser.Point(button.pane.x+120,button.pane.y+250) : new Phaser.Point(button.pane.x+610,button.pane.y+250))
            arrowGraphic.beginFill(0xe6a353)
            var height = 50
            var width = (direction == 'right' ? 30 : -30 )
           // arrowGraphic.lineStyle(0, 0x000000, 1);
            var points = [  new Phaser.Point(0,0),
                        new Phaser.Point(0,height),
                        new Phaser.Point(width,0),
                        new Phaser.Point(0,-height),
                        new Phaser.Point(0,0)
                        ]
            arrowGraphic.drawPolygon(points);
            
            var sprite = game.add.sprite(arrowLocation.x, arrowLocation.y , arrowGraphic.generateTexture() ) 
            sprite.anchor.setTo(0.5,0.5)
            button.pane.group.add(sprite)
            arrowGraphic.destroy();
            return sprite
        }
        
        function turnQuestPage(arrow)
        {
            console.log(arrow.direction)
            //clear portraits
            button.pane.group.destroy();
            button.pane.group.alive = false;
            //load correct page
            if(arrow.direction == 'left')
            {
                questSelection(page-1);
            } else
            {
                console.log("loading page: " + (page+1))
                questSelection((page+1));
            }
        }
        

        }
        function commMenu(page)
        {
            console.log("drawing comm page: " + page)
            //build portraits
            if(!button.pane.group.alive)
            {
                button.pane.group = game.add.group();
            }
            var portraitsPerPage = 3
            var spacing = 140;
            for(var i = page*portraitsPerPage ; i < (page+1)*portraitsPerPage ; i++)
            {
                if(typeof currentUser.charactersActivated[i] !== 'undefined')
                {
                    console.log("slot: " + i)
                    var backBox = game.add.graphics(0, 0);
                    backBox.beginFill(0xe6a353);  //pink
                    backBox.lineStyle(0, 0x000000, 1);
                    backBox.drawRect(-50, -50, 100, 100);
                    backBox.endFill();
                    
                    
                    var backBoxSprite = game.add.sprite(375+(i-page*portraitsPerPage)*spacing, 425, backBox.generateTexture());
                    backBoxSprite.characterID = currentUser.charactersActivated[i]
                    backBox.destroy();
                    backBoxSprite.anchor.setTo(0.5,0.5);
                    backBoxSprite.alpha=0.5
                    backBoxSprite.inputEnabled='true';
                    backBoxSprite.events.onInputDown.add(loadConversation, this);
                    backBoxSprite.input.useHandCursor = true;
                    button.pane.group.add(backBoxSprite); 
                    
                    var portrait = game.add.sprite(backBoxSprite.x,backBoxSprite.y,currentUser.charactersActivated[i]+'Mini')
                    portrait.characterID = currentUser.charactersActivated[i]
                    portrait.anchor.setTo(0.5,0.5);
                    portrait.inputEnabled='true';
                    portrait.events.onInputDown.add(loadConversation, this);
                    portrait.input.useHandCursor = true;
                    button.pane.group.add(portrait); 
                    
                    
                    if(typeof currentUser.characters[currentUser.charactersActivated[i]].knownName !== 'undefined')
                    {
                        var nameText = game.add.text(backBoxSprite.x,backBoxSprite.y+65,currentUser.characters[currentUser.charactersActivated[i]].knownName)
                        nameText.anchor.setTo(0.5,0.5);
                        nameText.font = 'Michroma';
                        nameText.fontSize = 12;
                        nameText.fill = '#FFFFFF';
                        nameText.align = 'center';   
                        button.pane.group.add(nameText); 
                    }
                    
                    if(typeof currentUser.characters[currentUser.charactersActivated[i]].knownJob !== 'undefined')
                    {
                        var jobText = game.add.text(backBoxSprite.x,backBoxSprite.y+80,currentUser.characters[currentUser.charactersActivated[i]].knownJob)
                        jobText.anchor.setTo(0.5,0.5);
                        jobText.font = 'Michroma';
                        jobText.fontSize = 12;
                        jobText.fill = '#FFFFFF';
                        jobText.align = 'center';   
                        button.pane.group.add(jobText); 
                    }    
            }
            
            

        }
        
        //add arrows
        if(currentUser.charactersActivated.length > (page+1)*portraitsPerPage)
        {
            //add right arrow
            console.log("adding right arrow")
            var arrow = drawArrow('right')
            arrow.inputEnabled='true';
            arrow.direction = 'right'
            arrow.events.onInputDown.add(turnPage, this);
            arrow.input.useHandCursor = true;
            
        }
        
        if(page > 0)
        {
            var arrow = drawArrow('left')
            arrow.inputEnabled='true';
            arrow.direction = 'left'
            arrow.events.onInputDown.add(turnPage, this);
            arrow.input.useHandCursor = true;
        }
        
        function drawArrow(direction)
        {
            console.log("drawing " + direction + " arrow.")
            var arrowGraphic = game.add.graphics(0, 0);
            // var arrowLocation = (direction == 'left' ? new Phaser.Point(285,425) : new Phaser.Point(740,425))
            var arrowLocation = (direction == 'left' ? new Phaser.Point(button.pane.x+145,button.pane.y+95) : new Phaser.Point(button.pane.x+590,button.pane.y+95))
            arrowGraphic.beginFill(0xCC6464)
            var height = 50
            var width = (direction == 'right' ? 30 : -30 )
           // arrowGraphic.lineStyle(0, 0x000000, 1);
            var points = [  new Phaser.Point(0,0),
                        new Phaser.Point(0,height),
                        new Phaser.Point(width,0),
                        new Phaser.Point(0,-height),
                        new Phaser.Point(0,0)
                        ]
            arrowGraphic.drawPolygon(points);
            
            var sprite = game.add.sprite(arrowLocation.x, arrowLocation.y , arrowGraphic.generateTexture() ) 
            sprite.anchor.setTo(0.5,0.5)
            button.pane.group.add(sprite)
            arrowGraphic.destroy();
            return sprite
        }
        
        function turnPage(arrow)
        {
            console.log(arrow.direction)
            //clear portraits
            button.pane.group.destroy();
            button.pane.group.alive = false;
            //load correct page
            if(arrow.direction == 'left')
            {
                commMenu(page-1);
            } else
            {
                console.log("loading page: " + (page+1))
                commMenu((page+1));
            }
        }
        
            
        function loadConversation(character)
        {
            turnOffMenu(false)
            
            createConversation(character.characterID, buttons)    
        }
        

        }
            
        function turnOffMenuButtons()
        {
            buttons.forEach(function(button){
                    button.inputEnabled=false;
                });
        }
        function turnOnMenuButtons()
        {
            buttons.forEach(function(button){
                    button.input.useHandCursor = true;
                    button.inputEnabled=true;
                });
        }
        
        function turnOffMenu(disappear)
        {
            //turn off menu buttons and delete any loaded panes
                hiddenButtons = buttons;
                hiddenButtons.spaceStationScene = spaceStationScene;
                buttons.forEach(function(button){
                    button.inputEnabled=false;
                    
                    if(disappear)
                    {
                        button.group.alpha = 0; 
                        spaceStationScene.alpha = 0;
                    }
                    
                    if(button.paneLoaded == true)
                    {
                        if(typeof button.pane.group !== 'undefined')
                        {
                            button.pane.group.destroy();
                        }
    
                        button.pane.destroy();
                        button.paneLoaded == false
                    }
                    });
        }
        function drawShipLevelBar(barPoint, key , label)
        {
            var back = game.add.graphics(barPoint.x, barPoint.y);
            back.beginFill(0xcc9bcc);  //purple
            back.lineStyle(0, 0x000000, 1);
            back.drawRect(0, 0, 100, 20);
            back.endFill();
            button.pane.group.add(back)
            var current = game.add.graphics(barPoint.x, barPoint.y);
            current.beginFill(0xCC6464);  //pink
            current.lineStyle(0, 0x000000, 1);
            current.drawRect(0, 0, 100*(parseInt(currentUser.ship[key])/10), 20);
            current.endFill();
            button.pane.group.add(current)
            var label = game.add.text(barPoint.x-5, barPoint.y+13 , label)
            label.anchor.setTo(1,0.5)
            label.font = 'Michroma';
            label.fontSize = 12;
            label.fill = '#FFFFFF';
            label.align = 'center';
            button.pane.group.add(label)
        }
        
        
        function swatchBoxDisplayClick()
        {
            console.log("building confirm menu")
            turnOffMenuButtons();
            logo.forEach(function(box){
                    box.inputEnabled=false;
                });
            var confirmMenu = game.add.group();

            var confirmBack = game.add.sprite(400,300,'logoEditConfirmBack')
            confirmMenu.add(confirmBack)
            confirmBack.scale.setTo(0.8,0.5)
            
            var confirmButtonYes = game.add.sprite(300,325,'logoEditConfirmButton')
            confirmMenu.add(confirmButtonYes)
            confirmButtonYes.scale.setTo(0.8,0.4)
            confirmButtonYes.anchor.setTo(0.5,0.5)
            confirmButtonYes.inputEnabled='true';
            confirmButtonYes.events.onInputDown.add(checkLastLogin);
            confirmButtonYes.input.useHandCursor = true;
            
            var confirmButtonNo = game.add.sprite(500,325,'logoEditConfirmButton')
            confirmMenu.add(confirmButtonNo)
            confirmButtonNo.scale.setTo(0.8,0.4)
            confirmBack.anchor.setTo(0.5,0.5)
            confirmButtonNo.anchor.setTo(0.5,0.5)
            confirmButtonNo.inputEnabled='true';
            confirmButtonNo.events.onInputDown.add(declineEditLogo);
            confirmButtonNo.input.useHandCursor = true;
            
            
            var questionLabel = game.add.text(confirmBack.x, confirmBack.y-14 , "ARE YOU READY TO EDIT YOUR LOGO?") 
            confirmMenu.add(questionLabel)
            questionLabel.font = 'Michroma';
            questionLabel.fontSize = 24;
            questionLabel.fill = '#FFFFFF';
            questionLabel.align = 'center';
            questionLabel.anchor.setTo(0.5,0.5)
            
            var yesLabel = game.add.text(confirmButtonYes.x-30, confirmButtonYes.y-12 , "YES") 
            confirmMenu.add(yesLabel)
            yesLabel.font = 'Michroma';
            yesLabel.fontSize = 20;
            yesLabel.fill = '#FFFFFF';
            yesLabel.align = 'center';
        
            
            var noLabel = game.add.text(confirmButtonNo.x-24, confirmButtonNo.y-12 , "NO")
            confirmMenu.add(noLabel)
            noLabel.font = 'Michroma';
            noLabel.fontSize = 20;
            noLabel.fill = '#FFFFFF';
            noLabel.align = 'center';
            
            function checkLastLogin()
            {
                console.log("checking login")
                if(typeof currentUser.lastLogoEdit === 'undefined')
                    {
                        currentUser.lastLogoEdit = new Date(0);
                    }
                var lastLogin = new Date(currentUser.lastLogoEdit)
                var currentTime = new Date();
                if(currentTime - lastLogin > 86400000)//one day in ms
                {
                    currentUser.lastLogoEdit = new Date()
                    editLogo() //change me
                } else
                {
                    var waitTime = (24-Math.round((currentTime - lastLogin)/3600000))
                    var waitText = "You must wait " + waitTime + " hour" + (waitTime >1? 's':'')+ "."
                    battleAlert(waitText)
                    confirmMenu.destroy();
                    turnOnMenuButtons();
                }
            }
            
            function editLogo()
            {
                
                confirmMenu.destroy();
                shipModel.destroy();
                shipShadowModel.destroy();
                logo.forEach(function(box){
                    box.destroy();
                });

                
                logoMenu('edit')
                startEditTimer(60);
            }
            
            function startEditTimer(time)
            {
                var timerText = game.add.text(665,400 , time.toString())
                timerText.font = 'Michroma';
                timerText.fontSize = 24;
                timerText.fill = '#FFFFFF';
                timerText.align = 'center';
                timerText.anchor.setTo(0.5,0.5)
                game.time.events.add(Phaser.Timer.SECOND * 1, cycleTimer);  
                
                function cycleTimer()
                {
                    timerText.destroy();
                    if(time > 1)
                    {
                        startEditTimer(time-1);    
                    } else
                    {
                        turnOnMenuButtons();
                        buttons.forEach(function(button){
                            if(button.paneLoaded == true)
                                {
                                    if(typeof button.pane.group !== 'undefined')
                                    {
                                        button.pane.group.destroy();
                                    }
                
                                    button.pane.destroy();
                                    button.paneLoaded == false
                                }
                        });
                        for(var i = 0; i < logo.length ; i++)
                        {
                            currentUser.logo[i] = logo[i].tintNumber;
                        }
                        updateUserData()
                    }

                }
            }
            function declineEditLogo()
            {

                confirmMenu.destroy();
                logo.forEach(function(box){
                    box.inputEnabled=true;
                });
                turnOnMenuButtons();
            }
            
        }
        
        var lastBox = null;
        function swatchBoxEditClick(box)
        {
            lastBox = box.boxNumber;
            console.log(box)
            var swatchBox = game.add.graphics(box.x, box.y);
            swatchBox.lineStyle(1, 0x000000, 1);
            button.pane.group.add(swatchBox)
            logo[box.boxNumber] = swatchBox
            swatchBox.beginFill(swatchCursor.tintString);   
            swatchBox.drawRect(box.logoOffsetX+box.row*box.squareSize, box.logoOffsetY+box.column*box.squareSize, box.squareSize, box.squareSize);
            swatchBox.endFill(); 
            swatchBox.tintNumber = swatchCursor.tintNumber
            swatchBox.boxNumber = box.boxNumber;
            swatchBox.inputEnabled='true';
            swatchBox.input.useHandCursor = true;
            swatchBox.events.onInputDown.add(swatchBoxEditClick, this);    
            swatchBox.boxNumber = box.boxNumber;
            swatchBox.logoOffsetX = box.logoOffsetX
            swatchBox.logoOffsetY= box.logoOffsetY
            swatchBox.row= box.row
            swatchBox.column= box.column
            swatchBox.squareSize= box.squareSize
            box.destroy();
            
                
        }   
        //this function displays and allows editing of the user logo
        function logoMenu(type)
        {
            var boxX
            var boxY
            if(type=='display')
            {
                boxX = 180;
                boxY = 200;
            } else
            {
                boxX = 180;
                boxY = 200;
            }
            
            
            
            var swatchColorBox;
            var swatchColorSprite;
            var rowLength;
            var tints = [0xFFFFFF , 0x000000 ];
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
            
            var squareSize = 20
            var logoOffsetX = 130;
            var logoOffsetY = 10;

            if(typeof currentUser.logo === 'undefined')
            {
                console.log("making first logo")
                currentUser.logo = []
                for (var i = 0 ; i < 100 ; i++)
                {
                    currentUser.logo.push(getRandomInt(2,tints.length-1))
                }
            }
            
            var boxNumber = 0;
            for(var row = 0 ; row < 10 ; row++)
            {
              for(var column = 0 ; column < 10 ; column++)
                {
                    var swatchBox = game.add.graphics(boxX, boxY);
                    swatchBox.lineStyle(1, 0x000000, 1);
                    button.pane.group.add(swatchBox)
                    logo.push(swatchBox)
                    swatchBox.beginFill(tints[currentUser.logo[boxNumber]]); 
                    swatchBox.tintNumber = currentUser.logo[boxNumber];
                    swatchBox.drawRect(logoOffsetX+row*squareSize, logoOffsetY+column*squareSize, squareSize, squareSize);
                    swatchBox.endFill(); 
                    swatchBox.boxNumber = boxNumber;
                    swatchBox.row=row
                    swatchBox.column=column
                    swatchBox.logoOffsetX=logoOffsetX
                    swatchBox.logoOffsetY=logoOffsetY
                    swatchBox.squareSize =squareSize
                    swatchBox.inputEnabled='true';
                    swatchBox.input.useHandCursor = true;
                    if(type=='edit')
                    {
                        swatchBox.events.onInputDown.add(swatchBoxEditClick, this);    
                    } else
                    {
                        swatchBox.events.onInputDown.add(swatchBoxDisplayClick, this); //this shouldn't go here   
                    }
                    
                    boxNumber++;
                }  
            }
            if(type=='edit')
            {
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
                        
                        
                        var swatchOffsetX = 470;
                        var swatchOffsetY = 0;
                        swatchColorHex.lineStyle(1, 0x000000, 1);
                        var points = [  new Phaser.Point(10,0),
                                    new Phaser.Point(5,-9),
                                    new Phaser.Point(-5,-9),
                                    new Phaser.Point(-10,0),
                                    new Phaser.Point(-5,9),
                                    new Phaser.Point(5,9)
                                    ]
                        swatchColorHex.drawPolygon(points);
                        
                        swatchColorSprite = game.add.sprite(boxX+swatchOffsetX+j*20+(i<5?-i*10:i*10-80), boxY+swatchOffsetY+i*18,swatchColorHex.generateTexture() ) 
                        swatchColorSprite.tintNumber = tintNumber;
                        tintNumber++;
                        swatchArray.push(swatchColorSprite)
                        swatchColorSprite.angle += 30;
                        swatchColorSprite.color = currentTint;
                        swatchColorSprite.inputEnabled='true';
                        swatchColorSprite.events.onInputDown.add(chooseSwatchColor, this);
                        button.pane.group.add(swatchColorSprite)
                        game.world.bringToTop(swatchBox);
                        game.world.bringToTop(swatchColorHex);
                        swatchColorHex.clear()
                    }    
                }   
            swatchCursor = game.add.sprite(swatchArray[0].x,swatchArray[0].y,'hexCursor')
            swatchCursor.tintString = swatchArray[0].tint;
            swatchCursor.tintNumber = swatchArray[0].tintNumber
            button.pane.group.add(swatchCursor)
            swatchCursor.anchor.setTo(0.35,0.1)
            swatchCursor.scale.setTo(0.45,0.45)
            swatchCursor.alpha = 0.8
            
            
            function chooseSwatchColor(hex)
            {
                if(!swatchCursorMoving)
                {
                    swatchCursorMoving = true
                    var tweenLocation = game.add.tween(swatchCursor).to( { x: hex.x , y: hex.y }, 300, Phaser.Easing.Cubic.Out, true);
                    tweenLocation.onComplete.add(resetFlag);
                    swatchCursor.tintString = tints[hex.tintNumber];
                    swatchCursor.tintNumber = hex.tintNumber
                }
                
                
                
                function resetFlag()
                {
                    swatchCursorMoving = false
                }
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
        }
    }
}


function battleAlert(text)
{
    var alertBoxGraphic = game.add.graphics(0, 0);
    alertBoxGraphic.beginFill(0x555555);  //dark blue
    alertBoxGraphic.lineStyle(0, 0x000000, 1);
    alertBoxGraphic.drawRect(0, 0, 600, 50);
    alertBoxGraphic.endFill();
    var alertBox = game.add.sprite(400,550,alertBoxGraphic.generateTexture())
    alertBoxGraphic.destroy();
    alertBox.alpha = 0.8
    alertBox.anchor.setTo(0.5,0.5)
    var alertText = game.add.text(alertBox.x, alertBox.y, text)
    alertText.anchor.setTo(0.5,0.5);
    alertText.font = 'Michroma';
    alertText.fontSize = 18;
    alertText.fill = '#FFFFFF';
    alertText.align = 'center';
    var alert = game.add.group();
    alert.add(alertBox)
    alert.add(alertText)
    game.time.events.add(Phaser.Timer.SECOND * 1.5, fadeOut, this);
    
    function fadeOut()
    {
        var tweenAlpha = game.add.tween(alert).to( { alpha:0 }, 800, Phaser.Easing.Cubic.Out, true);
        tweenAlpha.onComplete.add(deleteAlert);    
    }

    
    function deleteAlert()
    {
        alert.destroy();
    }

}