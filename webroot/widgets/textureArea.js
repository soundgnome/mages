var textureArea;
var newTextureTemp
function buildTextureArea(item) {
    var newTexture = game.add.sprite(0 ,0 ,  eval(item.textureExpression) )
    var bmd = game.add.bitmapData(newTexture.width,newTexture.height);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,newTexture.width,newTexture.height);
    bmd.ctx.fillStyle = '#DDDDDD';
    bmd.ctx.fill();
    
    piece[piece.length] = game.add.sprite(0, 0 , bmd)

    piece[piece.length-1].x=item.startX
    piece[piece.length-1].y=item.startY
    
    
    piece[piece.length-1].addChild(newTexture)
    
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, this);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, this);
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].textureExpression = item.textureExpression;
    piece[piece.length-1].type = item.type;
    piece[piece.length-1].draggable = item.draggable;
    piece[piece.length-1].selectable = item.selectable;
    piece[piece.length-1].selectedExpression = item.selectedExpression;
    if(state!='build')
    {
        piece[piece.length-1].number = eval(item.number);
    } else
    {
        piece[piece.length-1].number = item.number;
    }
    piece[piece.length-1].dragOffsetX = 0
    piece[piece.length-1].dragOffsetY = 0
    piece[piece.length-1].dragDoneOffsetX = 0
    if(state!='build' && item.draggable == 1)
    {
        piece[piece.length-1].inputEnabled='true';
        
        piece[piece.length-1].input.useHandCursor=true;
        piece[piece.length-1].events.onInputDown.add(startDraggingNumber, this);
        piece[piece.length-1].events.onInputUp.add(stopDraggingNumber, this);   
    }
    if(item.selectable == 1)
    {
        addSelectionBehavior()   
    }
    
    if (typeof newTextureTemp === 'undefined') 
            { } else
            {
                newTextureTemp.clear()
            }
    
}


function testTexture() {
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
   
    newGraphic.beginFill(0xFF0000, 1);
    newGraphic.drawCircle(90, 90, 180);
    newGraphic.beginFill(0xFFAAAA, 1);
    newGraphic.drawCircle(90, 90, 120);
    newGraphic.beginFill(0xFFDDDD, 1);
    newGraphic.drawCircle(90, 90, 60);
    newGraphic.moveTo(0,0)
    newGraphic.lineTo(180,180)
    newGraphic.moveTo(180,0)
    newGraphic.lineTo(0,180)
    newTextureTemp = newGraphic
    return newGraphic.generateTexture();
}


function dotTexture(diameter) {
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(0, 0x000000, 1);
   
    newGraphic.beginFill(0x000000, 1);
    newGraphic.drawCircle(0, 0, diameter);
    newTextureTemp = newGraphic
    return newGraphic.generateTexture();
}


function rectangleFigureTexture(width, height, red, green, blue, label, scale) {
    if (typeof scale === 'undefined') {scale = 1};
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(2, 0x000000, 1);
    var decColor = red + 256 * green + 65536 * blue;
    newGraphic.beginFill(decColor, 1);
    newGraphic.drawRect(0, 0, width*scale, height*scale);
    var image = game.add.group();
    image.add(newGraphic);

    width = width + " " + label
    height = height + " " + label
    
    newLabel = game.add.text(newGraphic.width/2-(width.toString().length*5),-21, width.toString(), {
        font: "18px Arial",
        fill: "black",
        align: 'left'}); 
    image.add(newLabel);
    
    newLabel = game.add.text(0,newGraphic.height/2-10, height.toString(), {
        font: "18px Arial",
        fill: "black",
        align: 'left'}); 
    image.add(newLabel);
    newLabel.x = -(newLabel.width+3)
    var newGraphic = image.generateTexture();
    image.destroy();
    return newGraphic;
}

function imageArrayTexture(textureImage, quantity, orientation) {
    var image = game.add.group();
    var offSet = 0;
    for(var i = 0 ; i < quantity ; i++)
    {
        if(orientation == 'v')
        {
            image.create(0, image.height+offSet, textureImage);  
        } else
        {
            image.create(image.width+offSet, 0, textureImage); 
        }
        
        if(offSet == 0) {offSet = 5};
    }
    var newGraphic = image.generateTexture();
    image.destroy();
    return newGraphic;
}



function blockPattern(activeDirections, lengths) {
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.lineStyle(3, 0x000000, 1);
    newGraphic.beginFill(0xFFFFFF);
    newGraphic.drawRect(0, 0, 10, 10);
   
    
    for(var directionI = 0; directionI < activeDirections.length ; directionI++)
    {
        var blockX = 0;
        var blockY = 0;
        for(var i=0 ; i<lengths[directionI] ; i++) 
        {
            switch(activeDirections[directionI]) {
            case 1:
            blockX += 10;
            blockY += 0;
            break;
            
            case 2:
            blockX += 0;
            blockY += 10;
            break;
            
            case 3:
            blockX += -10;
            blockY += 0;
            break;
            
            default: //extend up only
            blockX += 0;
            blockY += -10;
            }
            newGraphic.drawRect(blockX, blockY, 10, 10);
        }    
    }
    
    newGraphic.endFill();
    newTextureTemp = newGraphic
    return newGraphic.generateTexture();
}


function getTextureAreaSettings(item) {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Teture Area Settings",
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Texture expression?" , "texture", "testTexture()" , null) +
                    getMenuEntryString("Texture value?" , "number", "1" , null) +
                    getMenuStaticDraggagbleSelectableString("Applet behavior: ", "behavior", "This describes the behavior at applet runtime.") +
                    //getMenuYesNoString("Draggable?", "draggable", "Allow user to drag.") + 
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var newObject = JSON.parse(JSON.stringify({
                                "type": 21, 
                                "startX":100 ,
                                "startY":10,
                                "textureExpression": $('#texture').val(),
                                "number": $('#number').val(),
                                "static" : ($("input[name='behavior']:checked").val() == "Static" ? 1 : 0) ,
                                "draggable" : ($("input[name='behavior']:checked").val() == "Draggable" ? 1 : 0) ,
                                "selectable" : ($("input[name='behavior']:checked").val() == "Selectable" ? 1 : 0)
                            })) ;
                            state = 'build';
                            buildTextureArea(newObject)
                            if(newObject.draggable == 1) {getClonableSettings()}
                        }
                    }
                }
            }
        );
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