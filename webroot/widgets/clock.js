function drawClock(minutes) {
    var angle;
    var angleHour = (minutes/60-15)/12*360*Math.PI/180;
    var angleMinute = (minutes%60-15)*6*Math.PI/180;
    var newGraphic = game.add.graphics(0, 0);
    var returnGroup = game.add.group();
    newGraphic.lineStyle(2, 0x000000, 1);
    newGraphic.beginFill(0xDDDDDD, 1);
    newGraphic.drawCircle(90, 90, 200);
    for(var i = 0 ; i < 60 ; i++) {
        angle = i*6*Math.PI/180;
        newGraphic.moveTo(90+( (i*6)%5==0 ? 90 : 95 )*Math.cos(angle),90+( (i*6)%5==0 ? 90 : 95 )*Math.sin(angle));
        newGraphic.lineTo(90+100*Math.cos(angle),90+100*Math.sin(angle))  ;
    } 
    newGraphic.moveTo(90,90);
    newGraphic.lineTo(90+90*Math.cos(angleMinute),90+90*Math.sin(angleMinute));
    newGraphic.moveTo(90,90);
    newGraphic.lineStyle(4, 0x000000, 1);
    newGraphic.lineTo(90+60*Math.cos(angleHour),90+60*Math.sin(angleHour));
    returnGroup.add(newGraphic);
    newTextureTemp = newGraphic;
    
    var clockNumber = [];
    for(i = 1 ; i < 13 ; i++) {
        angle = (i-3)*30*Math.PI/180;
        clockNumber[clockNumber.length] = game.add.text(90+80*Math.cos(angle) , 90+80*Math.sin(angle) , i.toString(), {
            font: 20+"px Arial",
            fill: "black",
            align: 'center'}); 
        clockNumber[clockNumber.length-1].anchor.setTo(0.5,0.4);
        returnGroup.add(clockNumber[clockNumber.length-1]);
    }
    var newAMPMLabel = game.add.text(155,170, (minutes>720 ? "PM" : "AM"), {
            font: 20+"px Arial",
            fill: "black",
            align: 'center'}); 
        returnGroup.add(newAMPMLabel);
        
    var returnTexture = returnGroup.generateTexture();
    for(i = 0 ; i < 12 ; i++) {
        clockNumber[i].destroy();
    }
    newAMPMLabel.destroy();
    return returnTexture;
}

function getClockSettings() {
    
}