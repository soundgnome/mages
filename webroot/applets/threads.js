var thread = [];
var threadRecord = [];
var threadMode = 0;
var threadNumber = null;
var threadPoint = null; 
function loadThreads()
{
    thread[0]=["1-1","1-2","1-3","1-4","1-5","1-6","1-7","1-8","1-9","1-10","1-11","1-12","1-13","1-14","1-15","1-16","1-17","1-18","1-19","1-20","1-21","1-22","1-23","1-24","1-25","1-26","1-27"]
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
                loadAppletID=result+"-1";
                threadPoint = 1;
                state = 'applet';
                titleBack.destroy(true);
                
            }
        }
    });
}