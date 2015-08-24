var thread = [];
var threadRecord = [];
var threadMode = 0;
var threadNumber = null;
var threadPoint = null; 
var campaignMode = 0;
var campaignChallenges;
var currentCampaignChallenge;
var campaignFurthestPoint;
var timerRecord = [];
var currentUser;
var userID;

var networkStorage = true;
var networkStandings = { key:'sortUsersByKey' , keyToSort:'challengesMastered' , sorted:'unavailable'} ;
var openWSCollection = 'mages_users';
// go to https://openws-app.herokuapp.com/ to get your own WS api key:
var openWSapiKey = '0527e44c67c8d70e86a8e8a77f1e0bbb';

function loadThreads()
{
    thread[0]=["1-1","1-2","1-3","1-3.1","1-3.2","1-3.3","1-3.4","1-3.5","1-3.6","1-3.7","1-3.8","1-4","1-5","1-6","1-7","1-8","1-9","1-10","1-11","1-12","1-13","1-14","1-15","1-16","1-17","1-18","1-19","1-20","1-21","1-22","1-23","1-24","1-25","1-26","1-27"];
    thread[1]=["2-1","2-2","2-3","2-4","2-5","2-6","2-7","2-8","2-9","2-10","2-11","2-12","2-13","2-14","2-15","2-16","2-17","2-18","2-19"];
    thread[2]=["3-1","3-2","3-3","3-4","3-5","3-6","3-7","3-8","3-9","3-10","3-11","3-12","3-13","3-14","3-15","3-16","3-17","3-18"];
    thread[3]=["4-1","4-2","4-3","4-4","4-5","4-6","4-7","4-8","4-9","4-10", "4-11", "4-12" , "4-13" , "4-14" , "4-15" , "4-16" , "4-17"];
    thread[4]=["5-1","5-2","5-3","5-4","5-5","5-6","5-7","5-8","5-9","5-10","5-11","5-12","5-13","5-14","5-15","5-16","5-17"];
    thread[5]=["6-1","6-2","6-2.1","6-3","6-4","6-5","6-6","6-7","6-8","6-8.5","6-8.7","6-9","9","29","30","6-10","6-11","6-12","6-13","6-14","6-15","6-16","6-17","6-18","6-19","6-20","6-21","6-22","6-23","6-24","6-25"];
}

function loadCampaign()
{
    state = 'prompt';
    getOaklandWeather();
    netUserMaintenance(networkStandings);
    bootbox.prompt("Type user name:", function(result) {                
        if (result == "") {                                             
        } else
        {
            if(networkStorage)
            {
                var query = JSON.stringify({name:result});
                $.get("https://openws.herokuapp.com/"+openWSCollection+"?q="+query+"&apiKey="+openWSapiKey)
                    .done(function(data) {
                    if (typeof data[0] === 'undefined' ) 
                    { 
                        bootbox.alert("User not found in database!")
                    } else
                    {
                        bootbox.prompt({
                            title: "Type password:", 
                            inputType: "password",
                            callback: function(passwordResult) {
                                if(data[0].password == passwordResult)
                                {
                                    loadUser(data[0]);   
                                } else
                                {
                                    bootbox.alert("Incorrect password.")
                                }
                            }
                        });
        
                    }
                  });   
            } else
            {
                var data = localStorage.getObject(result)
                console.log(data)
                if (typeof data === 'undefined' ) 
                    { 
                        bootbox.alert("User not found in database!")
                    } else
                    {
                        bootbox.prompt({
                            title: "Type password:", 
                            inputType: "password",
                            callback: function(passwordResult) {
                                if(data.password == passwordResult)
                                {
                                    loadUser(data);   
                                } else
                                {
                                    bootbox.alert("Incorrect password.")
                                }
                            }
                        });
        
                    }
            }
            
        }
        }); 

    function loadUser(userData)
    {
    userID = userData._id;

    helpButton.destroy(true);
    buildButton.destroy(true);
    titleText.destroy(true);
    loadButton.destroy(true);
    threadButton.destroy(true);
    startCampaignButton.destroy(true);
    continueCampaignButton.destroy(true);

    appletInitiated=0;
    threadMode = 1;
    campaignMode = 1;

    campaignFurthestPoint = [1,5];
    //campaignChallenges = localStorage.getObject("campaignChallenges")
    campaignChallenges = userData.campaignChallenges;
    
    currentUser = {
            name: userData.name,
            password: userData.password,
            campaignChallenges: campaignChallenges,
            chronics: userData.chronics,
            challengesMastered: userData.challengesMastered,
            challengesAttempted: userData.challengesAttempted,
            ship: userData.ship,
            credits: userData.credits
          };
    currentCampaignChallenge = getRandomInt(0,4);
    threadNumber = campaignChallenges[currentCampaignChallenge].threadNumber;
    threadPoint  = campaignChallenges[currentCampaignChallenge].threadPoint;
    loadAppletID=thread[threadNumber-1][threadPoint-1];
    
    showWelcomeMessage();
   // state = 'applet';
    
    titleBack.destroy(true);  
    }
    
}

function startCampaign()
{
    getOaklandWeather();
    netUserMaintenance(networkStandings);
    state = 'prompt';
        bootbox.prompt("Type a new user name:", function(result) {   
        if (result === "") {                                             
        } else
        {
            if(networkStorage)
            {
                var query = JSON.stringify({name:result});
                $.get("https://openws.herokuapp.com/"+openWSCollection+"?q="+query+"&apiKey="+openWSapiKey)
                    .done(function(data) {
                        if (typeof data[0] === 'undefined' ) 
                        {
                            getNewPassword(result);  
                        } else
                        {
                            bootbox.alert("That user already exists!") 
                        }
                    });   
            } else
            {
                var data = localStorage.getObject(result)
                if (typeof data === 'undefined' ) 
                {
                    getNewPassword(result);  
                } else
                {
                    bootbox.alert("That user already exists!") 
                }
            }

        }
        }); 
                

    function getNewPassword(userName) {
        bootbox.prompt("Type a password for your new user (minimum 6 characters):", function(result) {                
                if (result === null) {                                             
                   getNewPassword()
                } else if (result.length < 6)
                {
                    bootbox.alert("Must be 6 or more characters!" , getNewPassword)
                } else
                {
                    
                    newCampaign(userName, result);
                }
                }); 
    }
    
    function newCampaign(userName, userPassword)
    {
        helpButton.destroy(true);
        buildButton.destroy(true);
        titleText.destroy(true);
        loadButton.destroy(true);
        threadButton.destroy(true);
        startCampaignButton.destroy(true);
        continueCampaignButton.destroy(true);
        
        appletInitiated=0;
        threadMode = 1;
        campaignMode = 1;
    
        campaignFurthestPoint = [1,5];
        campaignChallenges = [  {threadNumber:1 , threadPoint:1 , mastered:0} , 
                                {threadNumber:1 , threadPoint:2 , mastered:0} ,
                                {threadNumber:1 , threadPoint:3 , mastered:0} ,
                                {threadNumber:1 , threadPoint:4 , mastered:0} ,
                                {threadNumber:1 , threadPoint:5 , mastered:0} ]
        currentCampaignChallenge = getRandomInt(0,4);
        
        currentUser = {
            name: userName,
            password: userPassword,
            campaignChallenges: campaignChallenges,
            challengesMastered: 0
          };
         
        
        if(networkStorage)
        {
            $.post("https://openws.herokuapp.com/"+openWSCollection+"/?apiKey="+openWSapiKey,currentUser)
                .done(function(data) {
                userID= data._id;
                console.log("User saved successfully");
            });   
        } else
        {
           localStorage.setObject(currentUser.name,currentUser) 
        }

        threadNumber = campaignChallenges[currentCampaignChallenge].threadNumber;
        threadPoint  = campaignChallenges[currentCampaignChallenge].threadPoint;
        loadAppletID=thread[threadNumber-1][threadPoint-1];
        showWelcomeMessage();
       // state = 'applet';
        
        titleBack.destroy(true);
    }
}

var threadModeOnly = false;
function threadPrompt() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Thread Menu",
                onEscape: function() {
                    titleInitiated=0;
                    state='title';},
                message: 
                    getMenuEntryString("Thread ID:" , "threadID", "1" , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            appletInitiated=0;
                            threadMode = 1;
                            threadModeOnly = true;
                            threadNumber = $('#threadID').val();
                            threadPoint = 1;
                            loadAppletID=thread[threadNumber-1][threadPoint-1];
                            state = 'applet';
                            titleBack.destroy(true);
                            
                        }
                    }
                }
            }
        );
}
                    


function appletTransition(correct) {
    state = 'transition'
    
    //var backGroundImage = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    var backGroundImage = getAnimatedGalaxy();
    //this is the text at the bottom that tells your percentage
    var scoreText = game.add.text(game.world.centerX, game.world.centerY+250, "Your score: " + calculateThreadPercent() + "%");
    scoreText.anchor.setTo(0.5,0.5);
    scoreText.font = 'Orbitron';
    scoreText.fontSize = 72;
    var scoreGrd = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.height);
    scoreGrd.addColorStop(0, '#FFFFFF');   
    scoreGrd.addColorStop(1, '#cccc00'); 
    scoreText.fill = scoreGrd;
    scoreText.align = 'center';
    scoreText.stroke = '#000000';
    scoreText.strokeThickness = 2;
    scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    
    
    //these spell the words correct and incorrect
    var spriteImage;
    if(correct == 1)
    {
        var letterSequence = ["C","O","R","R","E","C","T","!"]; //c-o-r-r-e-c-t-!
    } else if(correct == 0)
    {
        var letterSequence = ["I","N","C","O","R","R","E","C","T","!"]; //i-n-c-o-r-r-e-c-t-!
    } else
    {
        var letterSequence = [(correct).toFixed(2)[2],(correct).toFixed(2)[3],"%"," ","R","I","G","H","T","!"];
    }
    var item;
    var tween;
    var itemArray = []
    for (var i = 0; i < letterSequence.length; i++)
    {
        item = game.add.text((correct == 1? 190: 120) + 64 * i, -100, letterSequence[i]);
        item.anchor.setTo(0.5);
        item.font = 'Orbitron';
        item.fontSize = 84;
        var grd = item.context.createLinearGradient(0, 0, 0, item.canvas.height);
        if (correct == 1)
        {
            grd.addColorStop(0, '#00ff00');   
            grd.addColorStop(1, '#336600');   
        } else
        {
            grd.addColorStop(0, '#996699');   
            grd.addColorStop(1, '#cc0000');
        }
        
        item.fill = grd;
        
        item.align = 'center';
        item.stroke = '#000000';
        item.strokeThickness = 0;
        item.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        itemArray.push(item);
        // Add a simple bounce tween to each character's position.
        tween = game.add.tween(item).to({y: 240}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i, 0);

        // Add another rotation tween to the same character.
        if(correct == 1)
        {
            game.add.tween(item).to({angle: 360}, 2200, Phaser.Easing.Cubic.In, true, 1000 + 400 * i, 0);
        }
        
    }
    

	tween.onComplete.add(fadeOut, this);
    //this is the emitter that goes across the screen
    var direction = getRandomInt(0,1);
    
    //leave outside the if statement so we have something to destroy
    var emitter = game.add.emitter((direction==0 ? -100 : game.world.width+120), game.world.centerY+140, 200);
    
    if(correct == 1) //show the spaceship and emitter
    {
        var shipTint = [getRandomInt(0,255),getRandomInt(0,255),getRandomInt(0,255)];
        //emitter.makeParticles(['smokeParticle','flameParticle1','flameParticle2','flameParticle3','flameParticle4']);
        emitter.makeParticles(['smokeParticle','nebulaTrail1','nebulaTrail2','nebulaTrail1','nebulaTrail2']);

        emitter.minParticleScale = 0.2;
        emitter.maxParticleScale = 0.7;
        emitter.gravity = -50;
        
        emitter.forEach(function(trailParticle){
            if(trailParticle.key.substr(0, 11) == 'nebulaTrail') {trailParticle.tint = shipTint[0] + 256 * shipTint[1] + 65536 * shipTint[1]}
        });
        //  The first parameter sets the effect to "explode" which means all particles are emitted at once
        //  The second gives each particle a 2000ms lifespan
        //  The third is ignored when using burst/explode mode
        //  The final parameter (10) is how many particles will be emitted in this single burst
        emitter.start(false, 2000, 1, 120);
        game.add.tween(emitter).from( { y: 100 }, 2000, Phaser.Easing.Cubic.In, true);
        game.add.tween(emitter).from( { x:(direction==1 ? 100 : game.world.width-100) }, 2000, Phaser.Easing.Cubic.In, true);
        
        var shipTexture;
        switch(getRandomInt(0,1)) //just use the random alien ship generator right now
        {
            case 0:
                console.log("human")
                shipTexture =  buildShip(1,[255,255,255],getRandomHumanShip());
                break;
            case 1:
                console.log("alien")
                shipTexture = buildShip(1,shipTint);  //default ship
                break;
            case 2:
                shipTexture =  buildShip(1, { part: { hull: { label:'ogaSpaceship3', exists:true, offset: 0, texture: 'spaceship3'}}} , 0 );
                break;
            case 3:
                shipTexture = buildShip(1,shipTint);  //default ship
                break;
            
        }
        var spaceship = game.add.sprite((direction==0 ? -130 : game.world.width+130), game.world.centerY+170, shipTexture);
        spaceship.anchor.setTo(0.5,0.5)
        if (direction == 1)
        {
            spaceship.angle=30; //was 30  
        } else
        {
            spaceship.angle=330-180; 
        }
        if (typeof shipTexture.angleOffset === 'undefined')
        {
            
        } else
        {
            spaceship.angle += shipTexture.angleOffset
        }
        
        if (typeof shipTexture.scaleOffset === 'undefined')
        {
            shipTexture.scaleOffset = 1;
        } else
        {
            spaceship.scale.setTo(shipTexture.scaleOffset, shipTexture.scaleOffset); 
        }

        var shipTween = game.add.tween(spaceship).from( { y: 120 }, 2000, Phaser.Easing.Cubic.In, true);
        game.add.tween(spaceship).to( { angle: (direction==0?spaceship.angle+10:spaceship.angle-10) }, 2000, Phaser.Easing.Cubic.In, true);
        spaceship.scale.setTo(0,0)
        game.add.tween(spaceship).from( { x:(direction==1 ? 100 : game.world.width-100)  }, 2000, Phaser.Easing.Cubic.In, true);
        //game.add.tween(spaceship).to( { scale:{ x: 2, y: 2}  }, 2000, Phaser.Easing.Cubic.In, true);
        game.add.tween(spaceship.scale).to((direction==1?{ x: 2*shipTexture.scaleOffset, y: 2*shipTexture.scaleOffset}:{ x: -2*shipTexture.scaleOffset, y: 2*shipTexture.scaleOffset}) , 2000, Phaser.Easing.Cubic.In, true);
        shipTween.onComplete.add(destroyShip, this);
    }
    
    
    function fadeOut () {
        for (var i = 0; i < letterSequence.length; i++)
        {
            tween  = game.add.tween(itemArray[i]).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            if(i==0)
            {
                tween.onComplete.add(cleanUp, this);   
            }
            
        }
    }
    
    function destroyShip() {
        spaceship.destroy();
    }
    
    function cleanUp () {
        //transitionSprite.destroy();
        for (var i = 0; i < letterSequence.length; i++)
        {
            itemArray[i].destroy();
        }
        emitter.destroy();
        clearCurrentApplet();
        backGroundImage.destroy();
        game.world.remove(scoreText);
        state = 'battle';
        if(correct==1){spaceship.destroy()}
    }
}

function calculateThreadPercent() {
    var threadTotal = 0;  // Variable to hold your total
            
            for(var i = 0, len = threadRecord.length; i < len; i++) 
            {
                threadTotal += threadRecord[i];
            }
    return Math.round((threadTotal/threadRecord.length)*100)
}

function getRandomHumanShip()
{
    return { 
                part:
                    {
                    bottomWings:    { label:'bottomWingsDefault',    exists:true,   offsetX: 15,    offsetY: 10,   mirror:true,           texture: 'bottomWings'+getRandomInt(1,10)},
                    tailSpires:     { label:'tailSpiresDefault',     exists:true,   offsetX: 40,    offsetY: -70,   mirror:true,                           texture: 'tailSpires'+getRandomInt(1,10)},
                    frontSpire:     { label:'frontSpireDefault',     exists:true,   offsetX: 0,    offsetY:  25,   mirror:false,                                            texture: 'frontSpire'+getRandomInt(1,10)}, 
                   
                    wings:          { label:'wingsDefault',          exists:true,   offsetX: 40,   offsetY: -30,      mirror:true,                           texture: 'wings'+getRandomInt(1,10)},
                     wingGuns:       { label:'wingGunsDefault',       exists:true,   offsetX: 40,    offsetY: -10,   mirror:true,                                            texture: 'wingGuns'+getRandomInt(1,10)}, 
                    hull:           { label:'hullDefault',           exists:true,   offsetX: 0,    offsetY: -20,      mirror:false,                     texture: 'hull'+getRandomInt(1,10)}, 
                    topGunner:      { label:'topGunnerDefault',      exists:true,  offsetX: 0,    offsetY: -30,   mirror:false,                                             texture: 'topGunner'+getRandomInt(1,10)}, 
                    windScreen:     { label:'windScreenDefault',     exists:false,  offsetX: 0,    offsetY:  25,   mirror:false,                                             texture: 'windScreen'+getRandomInt(1,10)}
                    
                    
                    
                    }
                };
}



var galaxyFilter;
function getAnimatedGalaxy () {
    
    //  From http://glslsandbox.com/e#18043.4

    var fragmentSrc = [

        "precision mediump float;",
        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "// Posted by Trisomie21",
        "// modified by @hintz",

        "// from http://glsl.heroku.com/e#5248.0",
        "#define BLADES 6.0",
        "#define BIAS 0.1",
        "#define SHARPNESS 3.0",

        "vec3 star(vec2 position, float t)",
        "{",
            "float d2D = 4.0 / length(position) + t * 5.0;",
            "float a2D = atan(position.y, position.x);",
            "float qq = d2D * 0.1 + sin(d2D) * 0.2 * cos(a2D * 3.0) + sin(d2D * 0.2) * 0.3 * cos(a2D * 8.0)",
            "+ max(0.0, sin(d2D * 0.1 + 10.0) - 0.5) * cos(a2D * 20.0 + sin(d2D * 0.2) * 5.0)",
            "+ max(0.0, sin(d2D * 0.03 + 18.0) - 0.5) * cos(a2D * 5.0 + sin(d2D * 0.2) * 5.0);",
            "vec3 color = vec3(sin(qq * 2.0), sin(qq * 3.0), sin(qq * 5.0));",

            "color = color * 0.2;",

            "float blade = clamp(pow(sin(atan(position.y,position.x )*BLADES)+BIAS, SHARPNESS), 0.0, 1.0);",

            "color += mix(vec3(-0.34, -0.5, -1.0), vec3(0.0, -0.5, -1.0), (position.y + 1.0) * 0.25);",
            "color += (vec3(0.95, 0.65, 0.30) * 1.0 / distance(vec2(0.0), position) * 0.075);",
            "color += vec3(0.95, 0.45, 0.30) * min(1.0, blade *0.7) * (1.0 / distance(vec2(0.0, 0.0), position)*0.075);",

            "return color;",
        "}",


        "// Tweaked from http://glsl.heroku.com/e#4982.0",
        "float hash(float n) { return fract(sin(n)*43758.5453); }",

        "float noise(in vec2 x)",
        "{",
            "vec2 p = floor(x);",
            "vec2 f = fract(x);",
            "f = f*f*(3.0-2.0*f);",
            "float n = p.x + p.y*57.0;",
            "float res = mix(mix(hash(n+0.0), hash(n+1.0),f.x), mix(hash(n+57.0), hash(n+58.0),f.x),f.y);",

            "return res;",
        "}",

        "vec3 cloud(vec2 p)",
        "{",
            "float f = 0.0;",
            "f += 0.50000*noise(p*1.0*10.0);",
            "f += 0.25000*noise(p*2.0*10.0);",
            "f += 0.12500*noise(p*4.0*10.0);",
            "f += 0.06250*noise(p*8.0*10.0);",
            "f *= f;",

            "return vec3(f*.65, f*.45, f)*.6;",
        "}",

        "const float LAYERS = 7.0;",
        "const float SPEED  = 0.005;",
        "const float SCALE  = 8.0;",
        "const float DENSITY    = 0.5;",
        "const float BRIGHTNESS = 2.0;",
        "vec2 ORIGIN    = resolution.xy*.5;",

        "float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }",

        "void main(void)",
        "{",
            "vec2   pos = gl_FragCoord.xy - ORIGIN;",
            "float dist = length(pos) / resolution.y;",
            "vec2 coord = vec2(pow(dist, 0.1), atan(pos.x, pos.y) / (3.1415926*2.0));",

            "// Nebulous cloud",
            "vec3 color = cloud(pos/resolution);",

            "// Background stars",
            "float a = pow((1.0-dist), 20.0);",
            "float t = time*-0.05;",
            "float r = coord.x - (t*SPEED);",
            "float c = fract(a+coord.y + 0.0*0.543);",
            "vec2  p = vec2(r, c*0.5)*4000.0;",
            "vec2 uv = fract(p)*2.0-1.0;",
            "float m = clamp((rand(floor(p))-0.9)*BRIGHTNESS, 0.0, 1.0);",
            "color +=  clamp((1.0-length(uv*2.0))*m*dist, 0.0, 1.0);",

            "// Flying stars into black hole",
            "for (float i = 1.0; i < (LAYERS+1.0); ++i)",
            "{",
                "float a = pow((1.0-dist),20.0);",
                "float t = i*10.0 + time*i*i;",
                "float r = coord.x - (t*SPEED);",
                "float c = fract(a+coord.y + i*.543);",
                "vec2  p = vec2(r, c*.5)*SCALE*(LAYERS/(i*i));",
                "vec2 uv = fract(p)*2.0-1.0;",
                "float m = clamp((rand(floor(p))-DENSITY/i)*BRIGHTNESS, 0.0, 1.0);",
                "color +=  clamp(star(uv*0.5, time+i*10.0)*m*dist, 0.0, 1.0);",
            "}",


            "gl_FragColor = vec4(color, 1.0);",
        "}"
    ];

    galaxyFilter = new Phaser.Filter(game, null, fragmentSrc);
    galaxyFilter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ galaxyFilter ];

    return sprite;
}

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

//this is used to delete an individual user from the openWS user data collection
function deleteNetUser(userName)
{
    if(networkStorage)
    {
        var query = JSON.stringify( { name : userName } );
        $.get("https://openws.herokuapp.com/"+openWSCollection+"?q="+query+"&apiKey="+openWSapiKey)
            .done(function(data) {
            if (typeof data[0] !== 'undefined') {
                var deleteID = data[0]._id ;
                $.ajax({
                url: "https://openws.herokuapp.com/"+openWSCollection+"/"+deleteID+"?apiKey="+openWSapiKey,
                type: 'DELETE',
                success: function(result) {
                      console.log('User deleted: "' + userName +'"');
                    },
                    error: function() {
                      console.log("Error");
                    }
                });    
            } else
            {
                console.log('User "' + userName + '" does not exist!' )
            }
        });    
    } else
    {
        console.log("Network storage is inactive!");
    }
    
}


function netUserMaintenance(order)
{
    $.get("https://openws.herokuapp.com/" + openWSCollection + "?apiKey=" + openWSapiKey)
        .done(function(data) {
            console.log("Users retrieved.");
            switch(order.key) 
            {
                case 'sortUsersByKey':
                    //var order = { key:'sortUsersByKey' , keyToSort:'challengesMastered' }
                    order.sorted = data.sort(function(a, b) {
                            var y = a[order.keyToSort]; var x = b[order.keyToSort];
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        });
                break;
                
                case 'setDefaultValueForAll':
                    //var order = { key:'setDefaultValueForAll' , newKey:'challengesMastered' , newValue:0 }
                    data.forEach(function(user) { 
                        if (typeof user[order.newKey] === 'undefined') 
                        { user[order.newKey] = order.newValue}
                    });
                    
                    console.log(data)
                    saveUserData();
                break; 

            }
            
            function saveUserData()
            {   
                data.forEach(function(user) { 
                        $.ajax({
                            url: "https://openws.herokuapp.com/"+openWSCollection+"/"+user._id+"?apiKey="+openWSapiKey,
                            type: "PUT",
                            data: user
                        });
                         
                    });
                    
                
            }
        });    
    }

function showWelcomeMessage2()
{
    if(networkStorage)
    {
        
        bootbox.dialog({
          message: 'Hello, ' + currentUser.name + ' and welcome to Mages Online. ' + oaklandWeatherString + 
        '<br><br>Lately much of the work has gone into starting to develop battle mode and improving the adaptive algorithm. '+
        'Mages is still in development, so do not expect stable software.'+
        '<br><br><b>You have reached a mastery level on ' + currentUser.challengesMastered + 
        ' applets after attempting ' + currentUser.challengesAttempted + '.' +
        '<br>The highest ranked user is ' + networkStandings.sorted[0].name + ' with ' + networkStandings.sorted[0].challengesMastered + ' applets mastered.',
          title: "Welcome",
          buttons: {
            success: {
              label: "Ready!",
              className: "btn-success",
              callback: function() {
                continueBattle();
              }
            }
          }
        });     
    }
    
}

function showWelcomeMessage()
{
    var welcomeOverlay = game.add.group();
    var welcomeBoxGraphic = game.add.graphics(0, 0);
    welcomeBoxGraphic.beginFill(0x000066);  //dark blue
    welcomeBoxGraphic.lineStyle(0, 0x000000, 1);
    welcomeBoxGraphic.drawRect(0, 0, 600, 300);
    welcomeBoxGraphic.endFill();
    
    var welcomeBox = game.add.sprite(100,150,welcomeBoxGraphic.generateTexture())
    welcomeBoxGraphic.destroy();
    welcomeBox.alpha = 0.7
    welcomeOverlay.add(welcomeBox)
    

    var message = 'Hello, ' + currentUser.name + ' and welcome to Mages Online. ' + oaklandWeatherString + 
        '  Lately much of the work has gone into starting to develop battle mode and improving the adaptive algorithm. '+
        'Mages is still in development, so do not expect stable software.  '+
        'You have reached a mastery level on ' + currentUser.challengesMastered + 
        ' applets after attempting ' + currentUser.challengesAttempted + '.  ' +
        'The highest ranked user is ' + networkStandings.sorted[0].name + ' with ' + networkStandings.sorted[0].challengesMastered + ' applets mastered.'
    var welcomeText = game.add.text(125,175,message)
    welcomeText.font = 'Michroma'
    welcomeText.wordWrap=true;
    welcomeText.wordWrapWidth = 550;
    welcomeText.fontSize = 14;
    welcomeText.fill='white'
    welcomeOverlay.add(welcomeText)
    if(typeof currentUser.credits === 'undefined') { currentUser.credits =0 }

    
    
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
        welcomeOverlay.destroy();
        continueButton.destroy();
        continueText.destroy();
        if(battleMode)
        {
            continueBattle()
        } else
        {
            state = 'applet'
        }
        
    }
    
    function continueButtonOver()
    {
        continueText.fontSize = 17;
        continueText.x -= 5;
        console.log("over")
    }
    
    function continueButtonOut()
    {
        continueText.fontSize = 16;
        continueText.x += 5;
        console.log("out")
    }
}


var oaklandWeatherString = "Here in Oakland, CA the weather is Beautiful."
function getOaklandWeather () 
{
    var conditons = ["tornado","tropical storm","hurricane","severe thunderstorms",
    "thunderstorms","mixed rain and snow","mixed rain and sleet","mixed snow and sleet",
    "freezing drizzle","drizzle","freezing rain","showers","showers","snow flurries",
    "light snow showers","blowing snow","snow","hail","sleet","dust","foggy","haze",
    "smoky","blustery","windy","cold","cloudy","mostly cloudy tonight",
    "mostly cloudy today","partly cloudy tonight","partly cloudy today","clear tonight",
    "sunny","fair tonight","fair today","mixed rain and hail","hot",
    "isolated thunderstorms","scattered thunderstorms","scattered thunderstorms",
    "scattered showers","heavy snow","scattered snow showers","heavy snow",
    "partly cloudy","thundershowers","snow showers","isolated thundershowers"];
    $.simpleWeather({
    location: 'Oakland, CA',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      oaklandWeatherString = "Here in Oakland, CA the weather is " + weather.temp + ' degrees ' + weather.units.temp + ' and ' + conditons[weather.code] + '.';
  
    },
    error: function(error) {
      console.log("error")
    }
  });
    
}
