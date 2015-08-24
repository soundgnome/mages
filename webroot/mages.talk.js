var characters = {};

function createConversation(character) {
    var leftEdge = 231

    //  From http://glslsandbox.com/e#18578.0
    var filter;
    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "float noise(vec2 pos) {",
            "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
        "}",

        "void main( void ) {",

            "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
            "float pos = (gl_FragCoord.y / resolution.y);",
            "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
            "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

            "pos -= (distortion * distortion) * 0.1;",

            "float c = sin(pos * 400.0) * 0.4 + 0.4;",
            "c = pow(c, 0.2);",
            "c *= 0.2;",

            "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
            "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

            "c += distortion * 0.08;",
            "// noise",
            "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",


            "gl_FragColor = vec4( 0.0, c, 0.0, 1.0 );",
        "}"
    ];

    var chatBack = game.add.sprite(0,0,'chatBack')

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);


    var sprite;
    sprite = game.add.sprite(leftEdge,19);
    sprite.width = 800*2/3;
    sprite.height = 600*2/3;
    sprite.filters = [ filter ];
    game.time.events.add(Phaser.Timer.SECOND * 0.1, updateFilter);
    game.time.events.add(Phaser.Timer.SECOND * 0.1, updateComSignal);
    
    var comSignal = game.add.sprite(leftEdge,19,character);
    comSignal.alpha=0.5
    comSignal.scale.setTo(2/3,2/3)
    
    
    switch(character) {
    case 'stationAgent':
        scrollText(characters.stationAgent,'start')
        break;
    }

    
    
    function updateFilter()
    {
        filter.update(-50,-50);
        game.time.events.add(Phaser.Timer.SECOND * 0.1, updateFilter);
    }
    
    var roll=0;
    function updateComSignal()
    {
        var tweenAlpha = game.add.tween(comSignal).to( { alpha: getRandomInt(40,90)/100}, getRandomInt(400,2000), Phaser.Easing.Bounce.Out, true);
        tweenAlpha.onComplete.add(updateComSignal); 
        // roll++
        // console.log(roll)
        // if(roll==20)
        // {
        //     roll=0
        //     console.log("new texture!")
        //     comSignal.loadTexture(['spaceShipInterior1','spaceShipInterior2','spaceShipInterior3'][getRandomInt(0,2)])
        // }
    }
    
    

}

function defineCharacters()
{
    characters.stationAgent =
                    {     
                    keyID : 'stationAgent',
                    start  : { 
                        text: "Hello, sentient ship, " +  ", how may I help you?" ,
                        keys:['name', 'job'] 
                    },
                    name  : { 
                        text: "My name is Agent Forner.", 
                        keys:[] 
                    },
                    "job"  : { 
                        text: "I am the station agent here at Outpost Station.", 
                        keys:[ "Outpost Station" ] 
                    },
                    "Outpost Station" : { 
                        text: "It's the last edge of Human territory.  Anything beyond the station is under Trad control.", 
                        keys:["Trad"] 
                    },
                    "Trad" : { 
                        text: "The Trad are an evil race of aliens.  They'll attack you on site if they see you.  Of course, you could always attack them, if you want to earn a bounty. ", 
                        keys:["bounty"] 
                    },
                    "bounty" : { 
                        text: [
                            "1I'm paying a bounty right now.  I'm trying to get these Trad ships that keep attacking our communication arrays.  If you accept, I can give you access to the rest of the station.",
                            "2I'm paying a bounty right now.  I'm trying to get these Trad ships that keep attacking our communication arrays.  If you accept, I can give you access to the rest of the station.",
                            "3I'm paying a bounty right now.  I'm trying to get these Trad ships that keep attacking our communication arrays.  If you accept, I can give you access to the rest of the station.",
                            "4I'm paying a bounty right now.  I'm trying to get these Trad ships that keep attacking our communication arrays.  If you accept, I can give you access to the rest of the station.",
                            "5I'm paying a bounty right now.  I'm trying to get these Trad ships that keep attacking our communication arrays.  If you accept, I can give you access to the rest of the station."
                        ], 
                        keys:["accept"] ,
                        rewards:[5,5,5,10,30]
                        },
                    "accept" : { 
                        text: [
                            "1Come back when you're done and I'll pay you the credits.",
                            "2Come back when you're done and I'll pay you the credits.",
                            "3Come back when you're done and I'll pay you the credits.",
                            "4Come back when you're done and I'll pay you the credits.",
                            "5Come back when you're done and I'll pay you the credits."
                        ],
                        keys:[]
                    },
                    "reward" : { 
                        text: [
                            "1Great job!  Here are the credits I promised.",
                            "2Great job!  Here are the credits I promised.",
                            "3Great job!  Here are the credits I promised.",
                            "4Great job!  Here are the credits I promised.",
                            "5Great job!  Here are the credits I promised."
                        ],
                        keys:[]
                    },
                    "goodbye" : { 
                        text: "Goodbye.", 
                        keys:[] 
                    },
                    defaultKeys: [ 'goodbye']
    }
}
    

var scroller = [];
var currentTalkKeys = null;
function scrollText(talk, key)
{
    console.log("key: " + key)
    var text ;
    if(typeof key === 'undefined') {
        key = 'start';
        text = talk.start.text;
    } else
    {
        if(key == 'bounty' || key == 'accept' || key == 'reward'  )
        {
            text = talk[key].text[characters[talk.keyID].questPoint];
        } else
        {
            text = talk[key].text;    
        }
        console.log(talk[key])
        
    }
    var location = new Phaser.Point(235,560)
    if(currentTalkKeys == null)
    {
        console.log("default keys")
        currentTalkKeys = talk.defaultKeys;
    } 
    
    talk[key].keys.forEach(function(item){
                currentTalkKeys.push(item)
            });
    
    var wrap = 52
    var lines = 6;
    if(scroller.length !=lines)
    {
        scroller = [];
        for (var i = 0; i < lines ; i++)
        {
            scroller[i] = game.add.text(location.x, location.y-i*25, '')
            scroller[i].anchor.setTo(0,0)
            scroller[i].font ='Michroma';
            scroller[i].fontSize = 16
            scroller[i].fill = 'white'
        }    
    }

    
    typeCharacters()
    
    function typeCharacters()
    {
        if(text.charAt(0) == " ")
        {
            if(text.substring(1).indexOf(" ") >= wrap - scroller[0].text.length)
            {
                text = text.substring(1); 
                shiftText();
            } else
            {
                addCharacter();
            } 
        } else 
        {
            if(scroller[0].text.length<wrap)
            {
                addCharacter();
                  
            } else
            {
               shiftText(); 
            }
        }
        
        function addCharacter()
        {
            scroller[0].setText(scroller[0].text + text.charAt(0))
            text = text.substring(1); 
            if(text.length > 0)
            {
                game.time.events.add(Phaser.Timer.SECOND * .02, typeCharacters);    
            } else
            {
                shiftText()
            }
            
        }
        function shiftText()
        {
            var tweenScale = game.add.tween(scroller[scroller.length-1]).to( { alpha:0} , 250, Phaser.Easing.Quartic.Out, true);
            tweenScale.onComplete.add(moveLines)
            
            function moveLines()
            {
                doShift();
                function doShift()
                {
                    for(var i = scroller.length-1 ; i > 0 ; i--)
                    {
                        console.log("shifting")
                        scroller[i].setText(scroller[i-1].text);
    
                    }
                    scroller[0].setText("")
                    scroller[scroller.length-1].alpha = 1    
                }
                
                if(text.length > 0)
                {
                    typeCharacters();  
                } else
                {   

                    console.log("complete")
                    var textKeys = game.add.group();

                    var keyX = location.x;
                    var keyLineLength = 0;
                    currentTalkKeys.forEach(function(item){
                        
                        keyLineLength += item.length+1;
                        console.log(keyLineLength)
                        if(keyLineLength >= wrap)
                        {
                            console.log("too many keys for one line")
                            keyLineLength = item.length+1;
                            keyX = location.x;
                            doShift();
                            textKeys.forEach(function(item){
                                item.y -= 25;
                            });
                            
                        }
                        if( Object.prototype.toString.call( item ) === '[object Array]' ) {
                            item.forEach(function(keyString){
                                keyText = game.add.text( keyX ,location.y, keyString)
                                keyText.keyString = keyString;
                                keyX += keyText.width+12*(parseInt(keyText.fontSize)/20);
                                textKeys.add(keyText)
                            });
                        } else
                        {
                            keyText = game.add.text( keyX ,location.y, item)
                            keyText.keyString = item;
                            keyX += keyText.width+12*(parseInt(keyText.fontSize)/20);
                            textKeys.add(keyText)
                        }
                        
                        textKeys.forEach(function(key){
                                key.inputEnabled='true';
                                key.events.onInputDown.add(loadKey, item);
                                key.talk = talk;
                                key.talk.scroller = scroller;
                                key.fill = '#FF91AF'
                                key.font ='Michroma';
                                key.fontSize = 16;
                                key.keyID = talk.keyID;
                            });
                        
                        
                        
                        console.log(keyX)
                        
                    });

                    
                    
                }
                function loadKey(item)
                    {
                        console.log(item)

                        if(item.keyString == 'bounty'  || item.keyString == 'accept'  || item.keyString == 'reward' )
                        {
                            if(item.keyString == 'bounty')
                            {
                                if(typeof characters[item.keyID].questPoint === 'undefined')
                                {
                                    characters[item.keyID].questPoint = 0
                                } else
                                {
                                    characters[item.keyID].questPoint++
                                }   
                            }
                            if(item.keyString == 'accept')
                            {
                                if(typeof currentUser.quests === 'undefined')
                                {
                                    currentUser.quests = {}
                                } 
                                currentUser.quests[item.keyID] =  characters[item.keyID].questPoint
                            }
                            if(item.keyString == 'reward')
                            {
                                if(typeof currentUser.credits === 'undefined')
                                {
                                    currentUser.credits = 0;
                                } 
                                currentUser.credits += characters[item.keyID].bounty.rewards[characters[item.keyID].questPoint];
                            }
                        } 
                        currentTalkKeys.splice(currentTalkKeys.indexOf(item.keyString), 1)
                        scrollText(item.talk, item.keyString)  
                        
                        textKeys.destroy();
                        
                    }
                
                
                 
            }

        }
    }

    
}


