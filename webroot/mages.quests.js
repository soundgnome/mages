function getQuestShips(questID)
{
    var questShips;
    
    switch(questID) {
    case 'name1':
        //code block
        break;
    default:
        questShips = [
            {   gridX: 6 , 
                gridY: 3 , 
                toughness: 1.25 , 
                torpedoes: 2 , 
                hacks: 0, 
                hp:{now:10 , total:10},
                part:
                        {
                        bottomWings:    { label:'bottomWingsDefault',    exists:true,   offsetX: 30,    offsetY: -10,   mirror:true,        texture: 'alienBottomWings5'},
                        tailSpires:     { label:'tailSpiresDefault',     exists:true,   offsetX: 35,    offsetY: -95,   mirror:true,        texture: 'alienTailSpire2'},
                        frontSpire:     { label:'frontSpireDefault',     exists:true,   offsetX: 0,    offsetY:  50,   mirror:false,       texture: 'alienFrontSpire3'}, 
                        hull:           { label:'hullDefault',           exists:true,   offsetX: 0,    offsetY: 0,      mirror:false,       texture: 'alienHull2'}, 
                        wings:          { label:'wingsDefault',          exists:true,   offsetX: 60,   offsetY: 0,      mirror:true,        texture: 'alienWings1'}, 
                        wingGuns:       { label:'wingGunsDefault',       exists:true,   offsetX: 60,    offsetY: -30,   mirror:true,        texture: 'alienWingGuns6'}, 
                        topGunner:      { label:'topGunnerDefault',      exists:true,  offsetX: 0,    offsetY: -50,   mirror:false,       texture: 'alienTopGunner5'}, 
                        windScreen:     { label:'windScreenDefault',     exists:true,  offsetX: 0,    offsetY:  10,   mirror:false,       texture: 'alienWindScreen4'}
                        }
            },
            {   gridX: 4 , 
                gridY: 1 , 
                toughness: 1 , 
                torpedoes: 0 , 
                hacks: 1, 
                hp:{now:10 , total:10},
                part:
                        {
                        bottomWings:    { label:'bottomWingsDefault',    exists:true,   offsetX: 30,    offsetY: -10,   mirror:true,        texture: 'alienBottomWings5'},
                        tailSpires:     { label:'tailSpiresDefault',     exists:true,   offsetX: 35,    offsetY: -95,   mirror:true,        texture: 'alienTailSpire2'},
                        frontSpire:     { label:'frontSpireDefault',     exists:true,   offsetX: 0,    offsetY:  50,   mirror:false,       texture: 'alienFrontSpire4'}, 
                        hull:           { label:'hullDefault',           exists:true,   offsetX: 0,    offsetY: 0,      mirror:false,       texture: 'alienHull2'}, 
                        wings:          { label:'wingsDefault',          exists:true,   offsetX: 60,   offsetY: 0,      mirror:true,        texture: 'alienWings4'}, 
                        wingGuns:       { label:'wingGunsDefault',       exists:true,   offsetX: 60,    offsetY: -30,   mirror:true,        texture: 'alienWingGuns6'}, 
                        topGunner:      { label:'topGunnerDefault',      exists:true,  offsetX: 0,    offsetY: -50,   mirror:false,       texture: 'alienTopGunner5'}, 
                        windScreen:     { label:'windScreenDefault',     exists:true,  offsetX: 0,    offsetY:  10,   mirror:false,       texture: 'alienWindScreen4'}
                        }
            },
            {   gridX: 8 , 
                gridY: 1 , 
                toughness: 1 , 
                torpedoes: 0 , 
                hacks: 0, 
                hp:{now:10 , total:10},
                part:
                        {
                        bottomWings:    { label:'bottomWingsDefault',    exists:true,   offsetX: 30,    offsetY: -10,   mirror:true,        texture: 'alienBottomWings5'},
                        tailSpires:     { label:'tailSpiresDefault',     exists:true,   offsetX: 35,    offsetY: -95,   mirror:true,        texture: 'alienTailSpire2'},
                        frontSpire:     { label:'frontSpireDefault',     exists:true,   offsetX: 0,    offsetY:  50,   mirror:false,       texture: 'alienFrontSpire4'}, 
                        hull:           { label:'hullDefault',           exists:true,   offsetX: 0,    offsetY: 0,      mirror:false,       texture: 'alienHull2'}, 
                        wings:          { label:'wingsDefault',          exists:true,   offsetX: 60,   offsetY: 0,      mirror:true,        texture: 'alienWings4'}, 
                        wingGuns:       { label:'wingGunsDefault',       exists:true,   offsetX: 60,    offsetY: -30,   mirror:true,        texture: 'alienWingGuns6'}, 
                        topGunner:      { label:'topGunnerDefault',      exists:true,  offsetX: 0,    offsetY: -50,   mirror:false,       texture: 'alienTopGunner5'}, 
                        windScreen:     { label:'windScreenDefault',     exists:true,  offsetX: 0,    offsetY:  10,   mirror:false,       texture: 'alienWindScreen4'}
                        }
            }]
    }
    for(var i = 0 ; i < questShips.length ; i++)
    {
        console.log("adding ship")
        var shipScale = 0.2 + ((questShips[i].toughness-1)/5)
        battleShips.push(game.add.sprite(arenaLeftEdge + questShips[i].gridX*arenaGridSpacing, arenaTopEdge + questShips[i].gridY*arenaGridSpacing, buildShip(0.5,[0,255,0],questShips[i]) )) 
        battleShips[battleShips.length-1].toughness = questShips[i].toughness;
        battleShips[battleShips.length-1].torpedoes = questShips[i].torpedoes;
        battleShips[battleShips.length-1].hacks = questShips[i].hacks;
        battleShips[battleShips.length-1].hp = questShips[i].hp;
        battleShips[battleShips.length-1].anchor.setTo(0.5,0.5);
        battleShips[battleShips.length-1].scale.setTo(shipScale,shipScale);
        battleShips[battleShips.length-1].inputEnabled='true';
        battleShips[battleShips.length-1].enemyID=i+1;
        battleShips[battleShips.length-1].events.onInputDown.add(enemyShipClick, battleShips[i]);
        battleShips[battleShips.length-1].angle=180
    }
}