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

function loadCampaign()
{
    state = 'prompt';

    
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
    campaignChallenges = localStorage.getObject("campaignChallenges")
    currentCampaignChallenge = getRandomInt(0,4);
    threadNumber = campaignChallenges[currentCampaignChallenge].threadNumber;
    threadPoint  = campaignChallenges[currentCampaignChallenge].threadPoint;
    console.log(threadNumber)
    console.log(threadPoint)
    loadAppletID=thread[threadNumber-1][threadPoint-1];
    
    state = 'applet';
    
    titleBack.destroy(true);
}

function startCampaign()
{
    if (typeof localStorage.campaignChallenges === 'undefined') 
            { 
                newCampaign() 
            } else
            {
                state = 'prompt';
                bootbox.prompt("Type delete to remove the previous user's profile.", function(result) {                
                if (result === null) {                                             
                      
                } else if(result == 'delete') 
                {
                    newCampaign() ;
                }
                });  
            }

    
    
    function newCampaign()
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
        localStorage.setObject("campaignChallenges",campaignChallenges)
        threadNumber = campaignChallenges[currentCampaignChallenge].threadNumber;
        threadPoint  = campaignChallenges[currentCampaignChallenge].threadPoint;
        console.log(threadNumber)
        console.log(threadPoint)
        loadAppletID=thread[threadNumber-1][threadPoint-1];
        
        state = 'applet';
        
        titleBack.destroy(true);
    }
}

function loadThreads()
{
    thread[0]=["1-1","1-2","1-3","1-3.1","1-3.2","1-3.3","1-3.4","1-3.5","1-3.6","1-3.7","1-3.8","1-4","1-5","1-6","1-7","1-8","1-9","1-10","1-11","1-12","1-13","1-14","1-15","1-16","1-17","1-18","1-19","1-20","1-21","1-22","1-23","1-24","1-25","1-26","1-27"];
    thread[1]=["2-1","2-2","2-3","2-4","2-5","2-6","2-7","2-8","2-9","2-10","2-11","2-12","2-13","2-14","2-15","2-16","2-17","2-18","2-19"];
    thread[2]=["3-1","3-2","3-3","3-4","3-5","3-6","3-7","3-8","3-9","3-10","3-11","3-12","3-13","3-14","3-15","3-16","3-17","3-18"];
    thread[3]=["4-1","4-2","4-3","4-4","4-5","4-6","4-7","4-8","4-9","4-10", "4-11", "4-12" , "4-13" , "4-14" , "4-15" , "4-16" , "4-17"];
    thread[4]=["5-1","5-2","5-3","5-4","5-5","5-6","5-7","5-8","5-9","5-10","5-11","5-12","5-13","5-14","5-15","5-16","5-17"];
    thread[5]=["6-1","6-2","6-3","6-4","6-5","6-6","6-7","6-8","6-8.5","6-9","9","29","30"];
}
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
        switch(getRandomInt(3,3)) //just use the random alien ship generator right now
        {
            case 0:
                shipTexture =  buildShip(1, { part: { hull: { label:'ogaSpaceship1', exists:true, offset: 0, texture: 'spaceship1'}}} , 0 );
                break;
            case 1:
                shipTexture =  buildShip(1, { part: { hull: { label:'ogaSpaceship2', exists:true, offset: 0, texture: 'spaceship2'}}} , 0 );
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
        state = 'applet'
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
        ship =  { 
                part:
                    {
                    bottomWings:    { label:'bottomWingsDefault',    exists:true,   offsetX: getRandomInt(20,40),    offsetY: -getRandomInt(0,20),   mirror:true,        texture: 'alienBottomWings'+getRandomInt(1,5)},
                    tailSpires:     { label:'tailSpiresDefault',     exists:true,   offsetX: getRandomInt(20,50),    offsetY: -95,   mirror:true,        texture: 'alienTailSpire'+getRandomInt(1,2)},
                    gunners:        { label:'gunnersDefault',        exists:false,  offsetX: 0,    offsetY: -200,   mirror:true,        texture: 'gunners'}, 
                    frontSpire:     { label:'frontSpireDefault',     exists:true,   offsetX: 0,    offsetY:  50,   mirror:false,       texture: 'alienFrontSpire'+getRandomInt(1,4)}, 
                    hull:           { label:'hullDefault',           exists:true,   offsetX: 0,    offsetY: getRandomInt(-100,-100),      mirror:false,       texture: 'alienHull'+getRandomInt(1,2)}, 
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