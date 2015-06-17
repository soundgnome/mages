var inequality='||';
var inequalityEntryText='';
var inequalitEntryPanelText;
function buildInequalityEntry(item) {
    piece.forEach(function(item) {
        if(item.type == 17 || item.type == '17b')
        {
            console.log("previous inequality entry found - only one per applet");
            item.deleted=true;
            item.destroy(true);
        }
    });
    //inequality entry buttons
    piece[piece.length] = game.add.group();
    var pieceLabel;
    var pieceText;
    for(var i = 0; i < 3; i++)
    {
        switch(i) {
            case 0:
                pieceText = '<'
                break;
            case 1:
                pieceText = '='
                break;
            case 2:
                pieceText = '>'
                break;
        }
        piece[piece.length-1].create(i*120,0,'numberEntryDisplay').value=i;
        pieceLabel = new Phaser.Text(game, i*120+23, -10, pieceText , {
        font: "72px Arial",
        fill: "black",
        align: "center"});
        pieceLabel.value=i;
        piece[piece.length-1].add(pieceLabel);
        
    }
    
    piece[piece.length-1].grouped=1;
    piece[piece.length-1].type=17;
    
    piece[piece.length-1].inequalityEntryX = item.inequalityEntryX;
    piece[piece.length-1].inequalityEntryY = item.inequalityEntryY;
    piece[piece.length-1].displayX = item.displayX;
    piece[piece.length-1].displayY = item.displayY;
    
    piece[piece.length-1].forEach(function(subitem) {
        subitem.inputEnabled='true';
        subitem.events.onInputDown.add(buildGroupPieceClick, this);
        subitem.events.onInputUp.add(onFinishDrag, draggingPiece);  
        subitem.ParentPosition=piece.length-1;
        subitem.displayX = item.displayX;
        subitem.displayY = item.displayY;
    });
    
    //displayPanel
    piece[piece.length]= game.add.sprite(item.displayX,item.displayY,'numberEntryDisplay');
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].type='17b';
    piece[piece.length-1].inputEnabled='true';
    piece[piece.length-1].events.onInputDown.add(buildRedragPiece, draggingPiece);
    piece[piece.length-1].events.onInputUp.add(onFinishDrag, draggingPiece);
    
    if(state!='build')
    {
        piece[piece.length-2].x=item.inequalityEntryX;
        piece[piece.length-2].y=item.inequalityEntryY;
        piece[piece.length-2].forEach(function(item) { //inequality entry button behavior
            item.events.onInputDown.add(inequalityEntryClick, this);
            item.ParentPosition=piece.length-1;
        });
        //new text over entry panel 
        inequalitEntryPanelText = game.add.text(item.displayX+23 , item.displayY-10, inequalityEntryText.toString() , {
            font: "72px Arial",
            fill: "black",
            align: "center"
            }); 
    }
}

function inequalityEntryClick(item) {
    switch(item.value) {
    case 0:
        inequalityEntryText='<'
        break;
    case 1:
        inequalityEntryText='='
        break;
    case 2:
        inequalityEntryText='>'
        break;
    }
    inequalitEntryPanelText.text = inequalityEntryText;
    inequality = (inequalityEntryText=='='?'==':inequalityEntryText);
}

function getInequalityEntrySettings() {
    var newObject = JSON.parse(JSON.stringify({
        "type": 17 , 
        "inequalityEntryX":300 , 
        "inequalityEntryY":200,
        "displayX":200 , 
        "displayY":300 
        })) ;
    buildInequalityEntry(newObject)
    
}