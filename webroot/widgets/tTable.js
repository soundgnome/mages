var tTable;
function buildtTable(item) {
    tTable = item;
    for(var i = 0 ; i < item.expressionList.length ; i ++)
    {
        item.expressionList[i] = decodeURIComponent(item.expressionList[i])
        console.log(item.expressionList[i].toString())
    }
    //item.newText=decodeURIComponent(item.expressionList);
    piece[piece.length] = game.add.group();
    
    var chartBottom = item.wordList.length * 40
    var maxWordLength = item.wordLabel.length
    for (var i = 0 ; i < item.wordList.length; i++)
    {
        if(item.wordList[i].length > maxWordLength)
        {
            maxWordLength=item.wordList[i].length 
        }
    }
    
    
    
    //box
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.beginFill(0xD0D0D0);
    newGraphic.lineStyle(2, 0x000000, 1);
    console.log(item.expressionLabel)
    newGraphic.drawRect(10,0, 10+maxWordLength*5/2+170+maxWordLength*5+item.expressionLabel.length*5/2+item.expressionLabel.length*5+10, (item.wordList.length+1)*40);
    newGraphic.endFill();
    
    for(var i = 0 ; i< item.wordList.length ; i ++)
    {
        newGraphic.moveTo(10, (i+1)*40)    
        newGraphic.lineTo(20+(maxWordLength*5/2)+170+maxWordLength*5+item.expressionLabel.length*5/2+item.expressionLabel.length*5+10, (i+1)*40)
    }
    newGraphic.moveTo(maxWordLength*5/2+100+maxWordLength*5,0)
    newGraphic.lineTo(maxWordLength*5/2+100+maxWordLength*5, (item.wordList.length+1)*40)
    
    
    
    var graphicSprite = game.add.sprite(0, 0, newGraphic.generateTexture());
    newGraphic.clear();
    piece[piece.length-1].add(graphicSprite);
    
    
    
    //build expression and word list and titles
    var newLabel;
    for(var i = 0 ; i < item.wordList.length ; i++ )
    {
        newLabel = game.add.text(maxWordLength*5/2+75, i*40+60, item.wordList[i], {
        font: "18px Arial",
        fill: "black",
        align: 'center'}); 
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    newLabel.anchor.setTo(0.5,0.5)
    }
    item.value = [];
    //
    for(var i = 0 ; i < item.wordList.length ; i++ )
    {
        item.value.push(eval(item.expressionList[i]))
        newLabel = game.add.text(maxWordLength*5/2+maxWordLength*5+160+item.expressionLabel.length*5/2, i*40+60, item.value[i].toString(), {
        font: "18px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.draggable = 1;
    newLabel.anchor.setTo(0.5,0.5)
    piece[piece.length-1].add(newLabel);
    }
    //column labels
    newLabel = game.add.text(maxWordLength*5/2+75, 20, item.wordLabel, {
        font: "24px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.setTo(0.5,0.5)
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    
    newLabel = game.add.text(maxWordLength*5/2+maxWordLength*5+160+item.expressionLabel.length*5/2, 20, item.expressionLabel,{
        font: "24px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.setTo(0.5,0.5)
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    
    piece[piece.length-1].x=item.startX;
    piece[piece.length-1].y=item.startY;
    piece[piece.length-1].startX = item.startX;
    piece[piece.length-1].startY = item.startY;
    piece[piece.length-1].type = 19;
    piece[piece.length-1].wordLabel = item.wordLabel;
    piece[piece.length-1].wordList  = item.wordList;
    piece[piece.length-1].expressionLabel  = item.expressionLabel;
    piece[piece.length-1].expressionList  = item.expressionList;
    
    piece[piece.length-1].forEach(function(item) {
            item.inputEnabled='true';
            item.events.onInputDown.add(buildGroupPieceClick, this);
            item.events.onInputUp.add(onFinishDrag, draggingPiece);
            item.clicked=0;
            item.ParentPosition=piece.length-1;   
    });
}

function gettTableSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "TTable Settings",
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Label for Items:" , "wordlabel", "Items" , null) +
                    getMenuEntryString("Label for Values:" , "expressionlabel", "Values" , null) +
                    getMenuEntryString("Number of Items" , "numitems", 4 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var wordLabel = $('#wordlabel').val();
                            var expressionlabel = $('#expressionlabel').val();
                            var numItems = $('#numitems').val();
                            var newObject = JSON.parse(JSON.stringify({
                                "type": 19, 
                                "startX": 200 , 
                                "startY": 200 , 
                                "wordLabel": wordLabel,
                                "wordList" : [] ,
                                "expressionLabel" : expressionlabel , 
                                "expressionList" : [] ,
                                "numItems" : numItems
                            })) ;
                            gettTableItem(numItems, newObject);
                        }
                    }
                }
            }
        );
}

function gettTableItem(numItems, item) {
    console.log(item.numItems-numItems)
    bootbox.dialog({
                title: 'TTable item: ' + (item.numItems-numItems) ,
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Label:" , "label", "Name" , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            item.wordList.push( $('#label').val() )
                            if(numItems > 1)
                            {
                                gettTableItem(numItems-1, item)        
                            } else
                            {
                                gettTableValue(item.numItems, item)
                            }
                        }
                    }
                }
            }
        );
}

function gettTableValue(numItems, item) {
    bootbox.dialog({
                title: 'TTable value: ' + (item.numItems-numItems),
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Value:" , "label", 1 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            item.expressionList.push( $('#label').val() )
                            if(numItems > 1)
                            {
                                gettTableValue(numItems-1, item)        
                            } else
                            {
                                state = 'build'
                                buildtTable(item)
                            }
                        }
                    }
                }
            }
        );
}
