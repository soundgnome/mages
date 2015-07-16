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

function appletTransition(correct) {
    var backGroundImage = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    var spriteImage;
    
    if(correct == 1)
    {
        spriteImage = 'correctTitle';
    } else
    {
        spriteImage = 'incorrectTitle';
    }
    var emitter = game.add.emitter(game.world.centerX/2, game.world.centerY, 200);
    
    if(correct == 1)
    {
        
        emitter.makeParticles('yellowStar');
        emitter.gravity = -50;
        //  The first parameter sets the effect to "explode" which means all particles are emitted at once
        //  The second gives each particle a 2000ms lifespan
        //  The third is ignored when using burst/explode mode
        //  The final parameter (10) is how many particles will be emitted in this single burst
        
        emitter.start(false, 2000, 0, 200);
        game.add.tween(emitter).from( { y: 100 }, 2000, Phaser.Easing.Bounce.Out, true);
        game.add.tween(emitter).from( { x: game.world.centerX*1.5 }, 2000, Phaser.Easing.Bounce.Out, true);
            
    }
    
    var tween;
    var transitionSprite = game.add.sprite(game.world.centerX, game.world.centerY, spriteImage);
	transitionSprite.anchor.set(0.5);
	game.add.tween(transitionSprite).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
	//transitionSprite.alpha = 0;
	tween  = game.add.tween(transitionSprite).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 3000, 0, false);
	tween.onComplete.add(cleanUp, this);
    
    
    function cleanUp () {
        transitionSprite.destroy();
        emitter.destroy();
        clearCurrentApplet();
        backGroundImage.destroy();
        
    }

    
}

