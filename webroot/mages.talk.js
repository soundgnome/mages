

function createConversation(character, menuButtons) {
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
    var chatScreen = game.add.group();
    var chatBack = game.add.sprite(0,0,'chatBack')
    chatScreen.add(chatBack)
    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);


    var sprite;
    sprite = game.add.sprite(leftEdge,19);
    chatScreen.add(sprite)
    sprite.width = 800*2/3;
    sprite.height = 600*2/3;
    sprite.filters = [ filter ];
    game.time.events.add(Phaser.Timer.SECOND * 0.1, updateFilter);
    game.time.events.add(Phaser.Timer.SECOND * 0.1, updateComSignal);
    
    console.log(character)
    var comSignal = game.add.sprite(leftEdge,19,character);
    chatScreen.add(comSignal)
    comSignal.alpha=0.5
    comSignal.scale.setTo(2/3,2/3)
    

    var characters = game.cache.getJSON('characters');
    scrollText(characters[character],currentUser.characters[character].startKey, chatScreen, menuButtons);
    console.log(characters[character].defaultKeys)
    
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



var scroller = [];
var currentTalkKeys = null;
function scrollText(talk, key, chatScreen, menuButtons)
{
    console.log(chatScreen)
    console.log(talk);
    console.log("key: " + key)
    var text ;
    if(typeof key === 'undefined') {
        key = 'start';
        text = talk.start.text;

    } else
    {
        if(key == 'name')
        {
            currentUser.characters[talk.keyID].knownName = talk.name.label;

        }
        if(key == 'job')
        {
            currentUser.characters[talk.keyID].knownJob = talk.job.label;
        }
        if(key == 'bounty' || key == 'accept' || key == 'reward'  )
        {
            text = talk[key].text[currentUser.characters[talk.keyID].questPoint];
        } else
        {
            text = talk[key].text;    
        }
        console.log(talk[key])
        
    }
    var location = new Phaser.Point(235,560)
    if(currentTalkKeys == null)
    {
        if(typeof currentUser.characters[talk.keyID].currentKeys === 'undefined')
        {
            currentTalkKeys = [];
            currentUser.characters[talk.keyID].currentKeys = currentTalkKeys;
        } else
        {
            currentTalkKeys = currentUser.characters[talk.keyID].currentKeys;
        }

        
    } 
    
    talk[key].keys.forEach(function(item){
                currentTalkKeys.push(item)
            });
    currentTalkKeys.push("goodbye")  //always have a goodbye
    //check for duplicate keys
    var uniqueKeys = [];
    $.each(currentTalkKeys, function(i, el){
        if($.inArray(el, uniqueKeys) === -1) uniqueKeys.push(el);
    });
    
    currentTalkKeys = uniqueKeys;

    var wrap = 52
    var lines = 6;
    if(scroller.length !=lines)
    {
        scroller = [];
        for (var i = 0; i < lines ; i++)
        {
            scroller[i] = game.add.text(location.x, location.y-i*25, '')
            chatScreen.add(scroller[i] )
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
                                key.input.useHandCursor = true;
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
                                if(typeof currentUser.characters[item.keyID].questPoint === 'undefined')
                                {
                                    currentUser.characters[item.keyID].questPoint = 0;
                                }    
                            }
                            if(item.keyString == 'accept')
                            {
                                currentUser.characters[item.keyID].questPoint++;
                            }
                            if(item.keyString == 'reward')
                            {
                                if(typeof currentUser.credits === 'undefined')
                                {
                                    currentUser.credits = 0;
                                } 
                                var characters = game.cache.getJSON('characters');
                                currentUser.credits += characters[item.keyID].bounty.rewards[currentUser.characters[item.keyID].questPoint];
                            }
                        } 
                        currentTalkKeys.splice(currentTalkKeys.indexOf(item.keyString), 1)
                        if(item.keyString != 'goodbye')
                        {
                            scrollText(item.talk, item.keyString, chatScreen, menuButtons)  
                        } else
                        {
                            currentUser.characters[talk.keyID].currentKeys = currentTalkKeys;
                            currentUser.characters[talk.keyID].currentKeys.push("goodbye")
                            currentUser.characters[talk.keyID].startKey = "acquainted"
                            chatScreen.destroy();
                            menuButtons.forEach(function(button){
                                button.inputEnabled=true;
                            });
                            scroller = [];
                            currentTalkKeys = null;
                        }
                        
                        
                        textKeys.destroy();
                        
                    }
                
                
                 
            }

        }
    }

    
}


