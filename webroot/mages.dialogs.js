function appletIDPrompt() {
    this.savedState=state;
    state='prompt';
    bootbox.prompt({
        title: "Enter appletID#:",
        value: "1",
        callback: function(result) {
            if (result === null) 
            {
                //Example.show("Prompt dismissed");
            } else 
            {
                appletInitiated=0;
                loadAppletID=result;
                state = 'applet';
                titleBack.destroy(true);
                
            }
        }
    });
}

function getClonableSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Draggable Clone Settings",
                onEscape: function() {state='build'},
                message: 
                getMenuYesNoString("Clonable?", "clonable", null) +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                           // newAppletID = Number(prompt("Enter new applet ID#:"));  
	                        // appletDoneTest = new DoneTest(newAppletID, prompt("Enter new doneTest:"));
                            piece[piece.length-1].clonable = ($("input[name='clonable']:checked").val() == "Yes" ? 1 : 0);
                            state = 'build';
                            
                        }
                    }
                }
            }
        );
}



function getMenuEntryString(label, key, defaultValue, help) {
    var helpString = '';
    if(help != null)
    {
        helpString='<span class="help-block">' + help + '</span> '
    }
    return '<div class="row">  ' +
            '<div class="col-md-12"> ' +
            '<form class="form-horizontal"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="' + key + '">'+ label +'</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="' + key + '" name="' + key + '" type="text" value="'+ defaultValue +'" class="form-control input-md"> ' +
            helpString +
            '</div> ' +
            '</div> '
}

function getMenuYesNoString(label, key, help) {
    var helpString = '';
    if(help != null)
    {
        helpString='<span class="help-block">' + help + '</span> </div> '
    }
    return '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="bold">' + label + '</label> ' +
            '<div class="col-md-4"> <div class="radio"> <label for="bold-0"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-0" value="No" checked="checked"> ' +
            'No </label> ' +
            '</div><div class="radio"> <label for="' + key + '-1"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-1" value="Yes"> Yes </label> ' +
            helpString +
            '</div></div></div>' 
}

function getMenuStaticDraggagbleSelectableString(label, key, help) {
    var helpString = '';
    if(help != null)
    {
        helpString='<span class="help-block">' + help + '</span> </div> '
    }
    return  '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="bold">' + label + '</label> ' +
            '<div class="col-md-4"> <div class="radio"> <label for="bold-0"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-0" value="Static" checked="checked"> ' +
            'Static </label> ' +
            '</div><div class="radio"> <label for="' + key + '-1"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-1" value="Draggable"> Draggable </label> ' +
            '</div><div class="radio"> <label for="' + key + '-1"> ' +
            '<input type="radio" name="' + key + '" id="' + key + '-1" value="Selectable"> Selectable </label> ' +
            helpString +
            '</div> ' 
}

function getSelectionExpressionSettings() {
    menuKeyPressed ==0;
    state = 'prompt';
    bootbox.dialog({
                title: "Selectable expression setting",
                message: 
                getMenuEntryString("Selected expression:", "selectedExpression", true , "The expression's value will be evaluated as true or false to determine if the item should be clicked.") +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            piece[piece.length-1].selectedExpression = encodeURI($('#selectedExpression').val());
                            state = 'build';
                        }
                    }
                }
            }
        );

    
}

