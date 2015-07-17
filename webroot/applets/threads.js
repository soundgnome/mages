var thread = [];
var threadRecord = [];
var threadMode = 0;
var threadNumber = null;
var threadPoint = null; 
function loadThreads()
{
    thread[0]=["1-1","1-2","1-3","1-3.1","1-3.2","1-3.3","1-3.4","1-3.5","1-3.6","1-3.7","1-3.8","1-4","1-5","1-6","1-7","1-8","1-9","1-10","1-11","1-12","1-13","1-14","1-15","1-16","1-17","1-17","1-17","1-18","1-19","1-20","1-21","1-22","1-23","1-24","1-25","1-26","1-27"];
    thread[1]=["2-1","2-1","2-1","2-1","2-1","2-1","2-1","2-1","2-1","2-1","2-2","2-3","2-4","2-4","2-4","2-5","2-6","2-7","2-8","2-9","2-10","2-11","2-12","2-13","2-14","2-15","2-16","2-17","2-18","2-19"];
    thread[2]=["3-1","3-1","3-1","3-1","3-1","3-1","3-1","3-1","3-1","3-1","3-2","3-3","3-4","3-5","3-6","3-7","3-8","3-9","3-10","3-11","3-12","3-13","3-14","3-15","3-16","3-17","3-18"];
    thread[3]=["4-1","4-2","4-3","4-4","4-5","4-6","4-7","4-8","4-9","4-10", "4-11", "4-12" , "4-13" , "4-14" , "4-15" , "4-16" , "4-17"];
    thread[4]=["5-1","5-2","5-3","5-4","5-5","5-6","5-7","5-8","5-9","5-10","5-11"];
    
}


function threadPrompt() {
    this.savedState=state;
    threadRecord = [];
    state='prompt';
    bootbox.prompt({
        title: "Enter ThreadID#:",
        value: "1",
        callback: function(result) {
            if (result === null) 
            {
                //Example.show("Prompt dismissed");
            } else 
            {
                appletInitiated=0;
                threadMode = 1;
                threadNumber = result;
                threadPoint = 1;
                loadAppletID=thread[threadNumber-1][threadPoint-1];
                state = 'applet';
                titleBack.destroy(true);
                
            }
        }
    });
}

var inTransition = 0;
function appletTransition(correct) {
    inTransition = 1;
    
    var backGroundImage = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    
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
        spriteImage = 'correctTitle';
        var letterSequence = ["C","O","R","R","E","C","T","!"]; //c-o-r-r-e-c-t-!
    } else
    {
        spriteImage = 'incorrectTitle';
        var letterSequence = ["I","N","C","O","R","R","E","C","T","!"]; //i-n-c-o-r-r-e-c-t-!
    }
    
    //this is the emitter that goes across the screen
    var direction = getRandomInt(0,1);
    
    //leave outside the if statement so we have something to destroy
    var emitter = game.add.emitter((direction==0 ? -100 : game.world.width+100), game.world.centerY*1.6, 200);
    
    if(correct == 1) //show the spaceship and emitter
    {
        emitter.makeParticles('yellowStar');
        emitter.gravity = -50;
        //  The first parameter sets the effect to "explode" which means all particles are emitted at once
        //  The second gives each particle a 2000ms lifespan
        //  The third is ignored when using burst/explode mode
        //  The final parameter (10) is how many particles will be emitted in this single burst
        emitter.start(false, 2000, 1, 120);
        game.add.tween(emitter).from( { y: 100 }, 2000, Phaser.Easing.Cubic.In, true);
        game.add.tween(emitter).from( { x:(direction==1 ? 100 : game.world.width-100) }, 2000, Phaser.Easing.Cubic.In, true);
        
        var shipTexture;
        switch(getRandomInt(0,2)) 
        {
            case 0:
                shipTexture = 'spaceship1'
                break;
            case 1:
                shipTexture = 'spaceship2'
                break;
            case 2:
                shipTexture = 'spaceship3'
                break;
            
        }
        var spaceship = game.add.sprite((direction==0 ? -100 : game.world.width+100), game.world.centerY, shipTexture);
        if (direction == 1)
        {
            spaceship.angle=30   
        } else
        {
            spaceship.angle=330 
        }


        var shipTween = game.add.tween(spaceship).from( { y: 100 }, 2000, Phaser.Easing.Cubic.In, true);
        spaceship.scale.setTo(0,0)
        game.add.tween(spaceship).from( { x:(direction==1 ? 100 : game.world.width-100)  }, 2000, Phaser.Easing.Cubic.In, true);
        //game.add.tween(spaceship).to( { scale:{ x: 2, y: 2}  }, 2000, Phaser.Easing.Cubic.In, true);
        game.add.tween(spaceship.scale).to((direction==1?{ x: 2, y: 2}:{ x: -2, y: 2}) , 2000, Phaser.Easing.Cubic.In, true);
        shipTween.onComplete.add(destroyShip, this);
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
        inTransition = 0;
        if(correct==1){spaceship.destroy()}
    }
}


function testTest() {
    var text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nrocking with\ngoogle web fonts");
    text.anchor.setTo(0.5);

    text.font = 'Revalia';
    text.fontSize = 60;
}