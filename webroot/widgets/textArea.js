function buildTextArea(item) {
    if (typeof item.alignment === 'undefined') { item.alignment = 'left'; }
    item.newText=decodeURIComponent(item.newText);
    var startX;
    var startY;
    if(state!='build')
    {
        newTextColor=item.fill;
        newTextWrap=item.wordWrap;
        newTextWidth=item.wordWrapWidth;
        startX=item.startX;
        startY=item.startY;
    } else
    {
        item.fontString="" + newBold + " " + newTextSize + "px Arial";
        startX=400;
        startY=250;
    }
    piece[piece.length] = game.add.text(startX, startY, item.newText, {
            font: item.fontString,
            fill: newTextColor,
            align: item.alignment,
            wordWrap: newTextWrap,
            wordWrapWidth: newTextWidth
    });
    piece[piece.length-1].type=1;
    piece[piece.length-1].fontString=item.fontString
    piece[piece.length-1].grouped=0;
    piece[piece.length-1].alignment = item.alignment;  
}

function getTextAreaSettings() {

    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Text Area Settings",
                onEscape: function() {state='build'},
                message: 
                    getMenuEntryString("Text:" , "newtext", "Hello world.", null ) +
                    getMenuEntryString("Color:" , "color", newTextColor , null) +
                    getMenuEntryString("Size:" , "size", newTextSize , null) +
                    getMenuEntryString("Word wrap width:" , "wrapWidth", 0 , "Enter 0 to turn off wrap.") +
                    getMenuEntryString("Alignment? l/c/r:" , "alignment", "l" , null) +
                    getMenuYesNoString("Bold?", "bold", null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            if($("input[name='bold']:checked").val() == "Yes")
                            {
                                newBold="bold";
                            } else
                            {
                                newBold="";
                            }
                            var newText = $('#newtext').val();
                            newTextColor =  $('#color').val();
                            newTextSize = $('#size').val();
                            if($("input[name='bold']:checked").val() == "Yes")
                            {
                                newBold="bold";
                            } else
                            {
                                newBold="";
                            }
                            
                            var alignment;
                            switch($('#alignment').val() ) {
                                case 'l':
                                    alignment = 'left'
                                    break;
                                case 'c':
                                    alignment = 'center'
                                    break;
                                case 'r':
                                    alignment = 'right'
                                    break;
                            }
                            
                            //newTextWrap = prompt("Word wrap?" , newTextWrap);
                            if($('#wrapWidth').val() > 0)
                            {
                                newTextWrap=true;
                                newTextWidth = $('#wrapWidth').val() ;
                            } else
                            {
                                newTextWrap=false;
                            }
                            state = 'build';
                            
                            
                            var newObject = JSON.parse(JSON.stringify({   
                                "type": 1, 
                                "startX":400 , 
                                "startY":300 , 
                                "newText":newText ,
                                "alignment":alignment
                                })) ;
                            
                            buildTextArea(newObject);
                            
                        adjustNewPiece();
                            
                        }
                    }
                }
            }
        );

}