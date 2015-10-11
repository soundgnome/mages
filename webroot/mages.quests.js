function getQuestShips(questID)
{
    var questShips = (game.cache.getJSON('quests'))[questID];
    console.log("new questShips: " + questShips)
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
        battleShips[battleShips.length-1].input.useHandCursor = true;
        battleShips[battleShips.length-1].enemyID=i+1;
        battleShips[battleShips.length-1].events.onInputDown.add(enemyShipClick, battleShips[i]);
        battleShips[battleShips.length-1].angle=180
    }
}