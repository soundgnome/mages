var totalBoxes=0;
var randomNumber = [];
var evaluatedExpression = [];
var randomDecimal = [];
var evaluatedNumerator = [];
var evaluatedDenominator = [];
var randomMixedNumber = [];
var multipleChoiceSelected = null;

//BAR GRAPH
function BarGraphConstructor(appletID, type, titleText, min, max, interval, numberLabel, numberedAxis, itemList, itemLabel, itemValueList, startX, startY) {
    this.appletID = appletID;
    this.type = type;
    this.titleText = titleText;
    this.min = min;
    this.max = max;
    this.interval = interval;
    this.numberLabel = numberLabel;
    this.numberedAxis = numberedAxis;
    this.itemList = itemList;
    this.itemLabel = itemLabel;
    this.itemValueList = itemValueList;
    this.startX = startX;
    this.startY = startY;
    this.topValue = topBarGraphValue;
    this.topSpot = topBarGraphSpot;
    this.totalValue = totalBarGraphValue;
}

var barGraph;
function buildBarGraph(item) {
    console.log(item.itemList)
    item.topValue = topBarGraphValue;
    item.topSpot = topBarGraphSpot;
    item.totalValue = totalBarGraphValue;
    min = item.min;
    max = item.max;
    piece[piece.length] = game.add.group();
    barGraph = item;
    
    var chartBottom = Math.floor( (item.max-item.min)/item.interval ) * 30
    //build number and item list and labels
    var newLabel;
    for(var i = item.min ; i <= item.max ; i = i + item.interval )
    {
        newLabel = game.add.text(75, chartBottom-(i/item.interval)*30, i.toString(), {
        font: "18px Arial",
        fill: "black",
        align: 'left'}); 
        piece[piece.length-1].add(newLabel);
        newLabel.draggable = 1;
        newLabel.anchor.setTo(1,0)
    }
    var itemX = [0]
    for(var i = 0 ; i < item.itemList.length ; i++ )
    {
        newLabel = game.add.text(itemX[i]+90, chartBottom+20, item.itemList[i].toString(), {
        font: "18px Arial",
        fill: "black",
        align: 'left'}); 
        piece[piece.length-1].add(newLabel);
        itemX.push(itemX[i]+newLabel.width+20);
        newLabel.draggable = 1;
    }
    //axis labels
    newLabel = game.add.text(70+piece[piece.length-1].width/2, chartBottom+40, item.itemLabel.toString(), {
        font: "24px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.setTo(0.5,0)
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    
    newLabel = game.add.text(30, chartBottom+50 - piece[piece.length-1].height/2 , item.numberLabel.toString(), {
        font: "24px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.set(0.5);
    newLabel.angle = 270
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;

    //title
    newLabel = game.add.text(60+piece[piece.length-1].width/2, chartBottom+40 - piece[piece.length-1].height , item.titleText.toString(), {
        font: "30px Arial",
        fill: "black",
        align: 'center'}); 
    newLabel.anchor.set(0.5);
    piece[piece.length-1].add(newLabel);
    newLabel.draggable = 1;
    
    //box
    var newGraphic = game.add.graphics(0, 0);
    newGraphic.beginFill(0xD0D0D0);
    newGraphic.lineStyle(2, 0x000000, 1);
    newGraphic.drawRect(80, -12, piece[piece.length-1].width-50, chartBottom+24);
    newGraphic.endFill();
    
    //lines
    for(var i = item.min+item.interval ; i <= item.max ; i = i + item.interval )
    {
        newGraphic.moveTo(80, (chartBottom-(i/item.interval)*30)+10)
        newGraphic.lineTo(piece[piece.length-1].width+30,(chartBottom-(i/item.interval)*30)+10);
    }
    
    //draw bars
    item.value = [];
    for(var i = 0 ; i < item.itemValueList.length ; i++)
    {
        item.value.push(eval(item.itemValueList[i]));
    }
    for(var i = 0 ; i < item.itemList.length ; i++ )
    {//redo itemValueList to be itemEvaluatedList
        newGraphic.beginFill(0x707070);
        newGraphic.lineStyle(2, 0x000000, 1);
        newGraphic.drawRect(itemX[i]+83+((itemX[i+1]-itemX[i]-20)/2), 10+((item.max-item.value[i])/item.interval)*30, 15, ((item.value[i]-item.min)/item.interval)*30+2);
    }
    piece[piece.length-1].add(newGraphic);
    
    piece[piece.length-1].forEach(function(item) {
        if(item.draggable == 1)
        {
            item.inputEnabled='true';
            item.events.onInputDown.add(buildGroupPieceClick, this);
            item.events.onInputUp.add(onFinishDrag, draggingPiece);
            item.clicked=0;
            item.ParentPosition=piece.length-1;   
        }
    });
    piece[piece.length-1].x=item.startX;
    piece[piece.length-1].y=item.startY;
    piece[piece.length-1].startX = item.startX;
    piece[piece.length-1].startY = item.startY;
    piece[piece.length-1].type = 18;
    piece[piece.length-1].titleText = item.titleText;
    piece[piece.length-1].min = item.min;
    piece[piece.length-1].max = item.max;
    piece[piece.length-1].interval = item.interval;
    piece[piece.length-1].numberLabel = item.numberLabel;
    piece[piece.length-1].numberedAxis = item.numberedAxis;
    piece[piece.length-1].itemList = item.itemList;
    piece[piece.length-1].itemLabel = item.itemLabel;
    piece[piece.length-1].itemValueList = item.itemValueList;
}

function topBarGraphValue() {
    var topValue = 0;
    for(var i = 0 ; i < this.itemValueList.length ; i++ )
    {
        if(this.value[i] > topValue) 
        {
            topValue = this.value[i];
        }
    }
    return topValue;
}

function topBarGraphSpot() {
    var topValue = 0;
    var topSpot = 0
    for(var i = 0 ; i < this.itemValueList.length ; i++ )
    {
        if(this.value[i] > topValue) 
        {
            topValue = this.value[i]
            topSpot = i;
        }
    }
    return topSpot;
}

function totalBarGraphValue() {
    var returnValue = 0;
    
    for(var i = 0 ; i < this.value.length ; i++)
    {
        returnValue += this.value[i];   
    }
    return returnValue;
}

//BarGraphConstructor(appletID, type, titleText, min, max, interval, numberLabel, numberedAxis, itemList, itemLabel, itemValueList, startX, startY) 
function getBarGraphSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Bar Graph Entry Box Settings",
                message: 
                getMenuEntryString("Graph title:" , "graphtitle", 'Bar Graph' , null) +
                getMenuEntryString("Numbered Axis x/y:" , "numaxis", 'y' , null) +
                getMenuEntryString("Numbered Axis Label:" , "numaxislabel", 'Quantity' , null) +
                getMenuEntryString("Numbered Axis Min:" , "numaxismin", 0 , null) +
                getMenuEntryString("Numbered Axis Max:" , "numaxismax", 10 , null) +
                getMenuEntryString("Numbered Axis Interval:" , "numaxisinterval", 1 , null) +
                getMenuEntryString("Labeled Axis Label" , "labeledaxislabel", "Categories" , null) +
                getMenuEntryString("Labeled Axis Number of Items:" , "labeledaxisnumitems", 4 , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var titleText = $('#graphtitle').val();
                            var min = $('#numaxismin').val();
                            var max = $('#numaxismax').val();
                            var interval = $('#numaxisinterval').val();
                            var numberLabel = $('#numaxislabel').val();
                            var numberedAxis = $('#numaxis').val();
                            var itemLabel = $('#labeledaxislabel').val();
                            var itemList = new Array(0);
                            var itemValueList = new Array(0);
                        
                            getBarGraphItemLabels(0, null, titleText, eval(min), eval(max), eval(interval), numberLabel, numberedAxis, itemList ,itemLabel, itemValueList, eval( $('#labeledaxisnumitems').val()) , 0 ); 
                        }
                    }
                }
            }
        );
}

var newMultipleChoiceNumbers = [];
var multipleChoiceFontSize = 40;
function getBarGraphItemLabels(appletID, type, titleText, min, max, interval, numberLabel, numberedAxis, itemList, itemLabel, itemValueList, numItems, startPrompt)  {

    var barGraphTitleString = new Array(numItems);
    barGraphTitleString[startPrompt]='Bar Graph Item Labels Settings: #' + startPrompt;   

    
    
    bootbox.alert({
        size: 'large',
        title: barGraphTitleString[startPrompt],
        message: getMenuEntryString("Label:" , "label", 'item' , null) +
                getMenuEntryString("Value:" , "value", 'getRandomInt(min,max)' , null), 
        callback: function()
        { 
            itemList.push( $('#label').val() )
            itemValueList.push( $('#value').val() )
            
            if(startPrompt < numItems-1)
            {
                getBarGraphItemLabels(0, null, titleText, min, max, interval, numberLabel, numberedAxis, itemList ,itemLabel, itemValueList, numItems , startPrompt+1);
            } else
            {
                
                var newObject = JSON.parse(JSON.stringify({    
                    "appletID": appletID, 
                    "type": 18, 
                    "startX":200 , 
                    "startY":200 , 
                    "titleText":titleText , 
                    "min":min, 
                    "max":max, 
                    "interval":interval, 
                    "numberLabel":numberLabel, 
                    "numberedAxis":numberedAxis, 
                    "itemList":itemList,
                    "itemLabel":itemLabel, 
                    "itemValueList":itemValueList
                    }));
                    console.log(newObject)
                buildBarGraph(newObject);
                state='build'            
                
            }
        }
    });
}