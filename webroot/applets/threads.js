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
    thread[4]=["5-1","5-2","5-3","5-4","5-5","5-6","5-7"];
    
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