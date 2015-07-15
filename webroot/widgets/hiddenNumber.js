var hiddenNumber = [];
function buildHiddenNumber(item) {
    //item.expression = decodeURIComponent(item.expression)
    hiddenNumber.push(eval(decodeURIComponent(item.expression)));
    piece[piece.length] = game.add.sprite(0,0);
    piece[piece.length-1].expression = item.expression;
    piece[piece.length-1].type=16;
}

function getHiddenNumberSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Hidden Number #" + hiddenNumber.length + " Settings",
                onEscape: function() {state='build'},
                message: 
                getMenuEntryString("Expression:" , "expression", '2+2' , null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var expression = $('#expression').val();
                            state = 'build';
                        var newObject = JSON.parse(JSON.stringify({
                            "expression":fixedEncodeURIComponent(expression)
                            })) ;
                        buildHiddenNumber(newObject)
                        }
                    }
                }
            }
        );
}