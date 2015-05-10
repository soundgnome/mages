//this file contains the applet definitions for MAGES.  
var testObj
function defineApplets() {
//addition of 3-digit numbers with regrouping
applet.push(JSON.parse('{"appletID":"1","type":2,"startX":580,"startY":100,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":999,"randomFloor":100}'))
applet.push(JSON.parse('{"appletID":"1","type":2,"startX":580,"startY":180,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":999,"randomFloor":100}'))
applet.push(JSON.parse('{"appletID":"1","type":1,"startX":400,"startY":180,"text":"_____","newText":"_____","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"1","type":1,"startX":400,"startY":180,"text":"%2B","newText":"%2B","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"1","type":9,"startX":560,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"1","type":9,"startX":520,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"1","type":9,"startX":480,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"1","type":9,"startX":440,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"1","type":1,"startX":60,"startY":100,"text":"Solve%20the%20addition%20problem%20by%20dragging%20the%20numbers%20into%20place.","newText":"Solve%20the%20addition%20problem%20by%20dragging%20the%20numbers%20into%20place.","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":250,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"1","type":8,"startX":340,"startY":260,"orientation":"v","clonable":"y","fill":"Black","size":"40"}'))
applet.push(JSON.parse('{"appletID":"1","type":1,"startX":420,"startY":40,"text":"You%20can%20use%20the%20draggable%20numbers%20as%20regrouping%20numbers%20too!","newText":"You%20can%20use%20the%20draggable%20numbers%20as%20regrouping%20numbers%20too!","font":"","fontString":" 12px Arial","fill":"Red","wordWrap":true,"wordWrapWidth":200,"alignment":"center"}'))
applet.push(JSON.parse('{"appletID":"1","type":99,"drawingBoxStartX":313,"drawingBoxStartY":27,"drawingBoxEndX":673,"drawingBoxEndY":479}'))
applet.push(JSON.parse('{"appletID":"1","type":5,"startX":580,"startY":420}'))
tests[1]= 'valueDragToBoxes()==randomNumber[0]+randomNumber[1]';

//addition of two digit numbers on the hundred chart
applet.push(JSON.parse('{"appletID":"2","type":1,"startX":40,"startY":40,"text":"Use%20the%20hundred%20chart%20to%20represent%20the%20value.","newText":"Use%20the%20hundred%20chart%20to%20represent%20the%20value.","font":"","fontString":" 40px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"2","type":2,"startX":240,"startY":200,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":50,"randomFloor":10}'))
applet.push(JSON.parse('{"appletID":"2","type":2,"startX":240,"startY":260,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":50,"randomFloor":0}'))
applet.push(JSON.parse('{"appletID":"2","type":1,"startX":100,"startY":260,"text":"____","newText":"____","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"2","type":1,"startX":118,"startY":262,"text":"%2B","newText":"%2B","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"2","type":8,"startX":40,"startY":380,"orientation":"v","clonable":"undefined","fill":"Black","size":"40"}'))
applet.push(JSON.parse('{"appletID":"2","type":4,"startX":580,"startY":220}'))
applet.push(JSON.parse('{"appletID":"2","type":5,"startX":580,"startY":400}'))
tests[2]= 'randomNumber[0]+randomNumber[1]==hundredBoxesClicked';

applet.push(JSON.parse('{"appletID":"3","type":2,"startX":440,"startY":60,"font":" 60px Arial","fontString":" 60px Arial","fill":"Black","randomCeiling":40,"randomFloor":20}'))
applet.push(JSON.parse('{"appletID":"3","type":2,"startX":440,"startY":120,"font":" 60px Arial","fontString":" 60px Arial","fill":"Black","randomCeiling":40,"randomFloor":20}'))
applet.push(JSON.parse('{"appletID":"3","type":1,"startX":330,"startY":122,"text":"____","newText":"____","font":"","fontString":" 60px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"3","type":1,"startX":325,"startY":125,"text":"%2B","newText":"%2B","font":"","fontString":" 60px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"3","type":10,"startX":260,"startY":380,"correct":"randomNumber[0]+randomNumber[1]","incorrect1":"getRandomInt(20,50)","incorrect2":"getRandomInt(20,50)","incorrect3":"getRandomInt(20,50)","multipleChoiceFontSize":40,"spaceX":200,"spaceY":40}'))
applet.push(JSON.parse('{"appletID":"3","type":5,"startX":700,"startY":540}'))
tests[3]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';

//addition of two-digit numbers: multiple choice
applet.push(JSON.parse('{"appletID":"4","type":3,"startX":220,"startY":220,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","numeratorRandomCeiling":6,"numeratorRandomFloor":0,"denominatorRandomCeiling":11,"denominatorRandomFloor":11,"size":72}'))
applet.push(JSON.parse('{"appletID":"4","type":3,"startX":360,"startY":220,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","numeratorRandomCeiling":5,"numeratorRandomFloor":0,"denominatorRandomCeiling":11,"denominatorRandomFloor":11,"size":72}'))
applet.push(JSON.parse('{"appletID":"4","type":1,"startX":269,"startY":175,"text":"%2B","newText":"%2B","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"4","type":1,"startX":418,"startY":177,"text":"%3D","newText":"%3D","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"4","type":9,"startX":540,"startY":180,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"4","type":9,"startX":500,"startY":180,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"4","type":9,"startX":540,"startY":260,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"4","type":9,"startX":500,"startY":260,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"4","type":1,"startX":479,"startY":147,"text":"__","newText":"__","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"4","type":8,"startX":380,"startY":320,"orientation":"h","clonable":"undefined","fill":"Black","size":"40"}'))
applet.push(JSON.parse('{"appletID":"4","type":1,"startX":60,"startY":40,"text":"Drag%20the%20numbers%20to%20represent%20the%20sum.","newText":"Drag%20the%20numbers%20to%20represent%20the%20sum.","font":"","fontString":" 40px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"4","type":5,"startX":380,"startY":460}'))
tests[4]= 'randomNumerator[0]+randomNumerator[1]==dragToBoxes[0].contents+dragToBoxes[1].contents*10&&11==dragToBoxes[2].contents+dragToBoxes[3].contents*10';
//identify parts of a mixed number
applet.push(JSON.parse('{"appletID":"5","type":1,"startX":40,"startY":40,"text":"Click%20the%20boxes%20to%20represent%20the%20value%20of%20the%20numerator.","newText":"Click%20the%20boxes%20to%20represent%20the%20value%20of%20the%20numerator.","font":"","fontString":" 40px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"5","type":7,"startX":520,"startY":140,"font":" 144px Arial","fontString":" 144px Arial","fill":"Black","wholeNumberRandomCeiling":5,"wholeNumberRandomFloor":1,"numeratorRandomCeiling":6,"numeratorRandomFloor":1,"denominatorRandomCeiling":10,"denominatorRandomFloor":6,"size":144}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":400,"startY":280}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":480,"startY":280}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":560,"startY":280}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":640,"startY":280}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":720,"startY":280}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":400,"startY":360}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":480,"startY":360}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":560,"startY":360}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":640,"startY":360}'))
applet.push(JSON.parse('{"appletID":"5","type":0,"startX":720,"startY":360}'))
applet.push(JSON.parse('{"appletID":"5","type":5,"startX":560,"startY":500}'))
tests[5]= 'boxesClicked==randomMixedNumber[0].numerator';

//addition of 4-digit numbers with dragTo numbers and multiple choice
applet.push(JSON.parse('{"appletID":"6","type":2,"startX":480,"startY":120,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":9999,"randomFloor":1000}'))
applet.push(JSON.parse('{"appletID":"6","type":2,"startX":480,"startY":180,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":9999,"randomFloor":0}'))
applet.push(JSON.parse('{"appletID":"6","type":9,"startX":460,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"6","type":9,"startX":420,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"6","type":9,"startX":380,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"6","type":9,"startX":320,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"6","type":9,"startX":280,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"6","type":1,"startX":261,"startY":175,"text":"______","newText":"______","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"6","type":1,"startX":259,"startY":175,"text":"%2B","newText":"%2B","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"6","type":8,"startX":540,"startY":200,"orientation":"v","clonable":"y","fill":"Black","size":"40"}'))
applet.push(JSON.parse('{"appletID":"6","type":10,"startX":60,"startY":480,"correct":"randomNumber[0]+randomNumber[1]","incorrect1":"getCloseAnswer(randomNumber[0]+randomNumber[1], 30)","incorrect2":"getCloseAnswer(randomNumber[0]+randomNumber[1], 30)","incorrect3":"getCloseAnswer(randomNumber[0]+randomNumber[1], 30)","multipleChoiceFontSize":40,"spaceX":200,"spaceY":40}'))
applet.push(JSON.parse('{"appletID":"6","type":5,"startX":660,"startY":520}'))
tests[6]= 'randomNumber[0]+randomNumber[1]==valueDragToBoxes()&&multipleChoiceCorrectAnswer==multipleChoiceSelected';

//subtraction of two digit numbers with multiple choice
applet.push(JSON.parse('{"appletID":"7","type":2,"startX":450,"startY":60,"font":" 80px Arial","fontString":" 80px Arial","fill":"Black","randomCeiling":40,"randomFloor":20}'))
applet.push(JSON.parse('{"appletID":"7","type":2,"startX":450,"startY":140,"font":" 80px Arial","fontString":" 80px Arial","fill":"Black","randomCeiling":9,"randomFloor":0}'))
applet.push(JSON.parse('{"appletID":"7","type":1,"startX":300,"startY":140,"text":"____","newText":"____","font":"","fontString":" 80px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"7","type":1,"startX":307,"startY":142,"text":"-","newText":"-","font":"","fontString":" 80px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"7","type":10,"startX":240,"startY":340,"correct":"randomNumber[0]-randomNumber[1]","incorrect1":"getRandomInt(0,40)","incorrect2":"getRandomInt(0,40)","incorrect3":"getRandomInt(0,40)","multipleChoiceFontSize":40,"spaceX":200,"spaceY":40}'))
applet.push(JSON.parse('{"appletID":"7","type":5,"startX":400,"startY":500}'))
tests[7]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';

//protractor and angle
applet.push(JSON.parse('{"appletID":"8","type":11,"angleX":403,"angleY":302,"lowerAngle":"270","upperAngle":"getRandomInt(90,270)","protractorX":"600","protractorY":"300"}'))
applet.push(JSON.parse('{"appletID":"8","type":10,"startX":100,"startY":400,"correct":"protractorAngle.angle","incorrect1":"Math.abs(getCloseAnswer(protractorAngle.angle, 40) )","incorrect2":"Math.abs(getCloseAnswer(protractorAngle.angle, 40) )","incorrect3":"Math.abs(getCloseAnswer(protractorAngle.angle, 40) )","multipleChoiceFontSize":40,"spaceX":200,"spaceY":40}'))
applet.push(JSON.parse('{"appletID":"8","type":1,"startX":80,"startY":40,"text":"Select%20the%20closest%20angle%20measure%3A","newText":"Select%20the%20closest%20angle%20measure%3A","font":"","fontString":" 40px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"8","type":5,"startX":700,"startY":520}'))
tests[8]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';

//long parts of fraction problem
applet.push(JSON.parse('{"appletID":"9","type":1,"startX":20,"startY":20,"text":"A%20student%20claims%20that%20all%20fractions%20greater%20than%20%20%20%20%20have%20a%20denominator%20less%20than%207.","newText":"A%20student%20claims%20that%20all%20fractions%20greater%20than%20%20%20%20%20have%20a%20denominator%20less%20than%207.","font":"","fontString":" 25px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"9","type":1,"startX":20,"startY":140,"text":"Show%20that%20the%20claim%20of%20the%20students%20is%20only%20sometimes%20true.","newText":"Show%20that%20the%20claim%20of%20the%20students%20is%20only%20sometimes%20true.","font":"","fontString":" 25px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"9","type":1,"startX":20,"startY":280,"text":"A.%20Drag%20one%20number%20into%20each%20box%20to%20create%20a%20fraction%20greater%20than%20%20%20%20%20with%20a%20denominator%20less%20than%207.","newText":"A.%20Drag%20one%20number%20into%20each%20box%20to%20create%20a%20fraction%20greater%20than%20%20%20%20%20with%20a%20denominator%20less%20than%207.","font":"","fontString":" 25px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"9","type":1,"startX":20,"startY":440,"text":"B.%20Drag%20one%20number%20into%20each%20box%20to%20create%20a%20fraction%20greater%20than%20%20%20%20%20with%20a%20denominator%20greater%20than%207.","newText":"B.%20Drag%20one%20number%20into%20each%20box%20to%20create%20a%20fraction%20greater%20than%20%20%20%20%20with%20a%20denominator%20greater%20than%207.","font":"","fontString":" 25px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"9","type":1,"startX":440,"startY":20,"text":"A.%20Denominator%20less%20than%207","newText":"A.%20Denominator%20less%20than%207","font":"","fontString":"bold 25px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"9","type":1,"startX":420,"startY":240,"text":"B.%20Denominator%20greater%20than%207","newText":"B.%20Denominator%20greater%20than%207","font":"","fontString":"bold 25px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"9","type":9,"startX":620,"startY":100,"userScale":0.75}'))
applet.push(JSON.parse('{"appletID":"9","type":9,"startX":620,"startY":180,"userScale":0.75}'))
applet.push(JSON.parse('{"appletID":"9","type":9,"startX":620,"startY":320,"userScale":0.75}'))
applet.push(JSON.parse('{"appletID":"9","type":9,"startX":620,"startY":400,"userScale":0.75}'))
applet.push(JSON.parse('{"appletID":"9","type":1,"startX":563,"startY":98,"text":"_____","newText":"_____","font":"","fontString":" 40px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"9","type":1,"startX":564,"startY":319,"text":"_____","newText":"_____","font":"","fontString":" 40px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"9","type":8,"startX":600,"startY":440,"orientation":"h","clonable":"n","fill":"Black","size":"50"}'))
applet.push(JSON.parse('{"appletID":"9","type":5,"startX":620,"startY":540}'))
tests[9]= 'dragToBoxes[0].contents/dragToBoxes[1].contents > 3/7 && dragToBoxes[2].contents/dragToBoxes[2].contents > 3/7 && dragToBoxes[1].contents < 7 && dragToBoxes[3].contents > 7';
applet.push(JSON.parse('{"appletID":"9","type":3,"startX":272,"startY":70,"font":" 20px Arial","fontString":" 20px Arial","fill":"Black","numeratorRandomCeiling":3,"numeratorRandomFloor":3,"denominatorRandomCeiling":7,"denominatorRandomFloor":7,"size":20}'))
applet.push(JSON.parse('{"appletID":"9","type":3,"startX":82,"startY":363,"font":" 20px Arial","fontString":" 20px Arial","fill":"Black","numeratorRandomCeiling":3,"numeratorRandomFloor":3,"denominatorRandomCeiling":7,"denominatorRandomFloor":7,"size":20}'))
applet.push(JSON.parse('{"appletID":"9","type":3,"startX":81,"startY":523,"font":" 20px Arial","fontString":" 20px Arial","fill":"Black","numeratorRandomCeiling":3,"numeratorRandomFloor":3,"denominatorRandomCeiling":7,"denominatorRandomFloor":7,"size":20}'))

//addition of like denominators to mixed numbers
applet.push(JSON.parse('{"appletID":"10","type":3,"startX":272,"startY":190,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","numeratorRandomCeiling":7,"numeratorRandomFloor":1,"denominatorRandomCeiling":7,"denominatorRandomFloor":7,"size":72}'))
applet.push(JSON.parse('{"appletID":"10","type":3,"startX":419,"startY":190,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","numeratorRandomCeiling":7,"numeratorRandomFloor":1,"denominatorRandomCeiling":7,"denominatorRandomFloor":7,"size":72}'))
applet.push(JSON.parse('{"appletID":"10","type":9,"startX":540,"startY":180,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"10","type":9,"startX":600,"startY":150,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"10","type":9,"startX":600,"startY":208,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"10","type":1,"startX":563,"startY":104,"text":"__","newText":"__","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"10","type":1,"startX":325,"startY":144,"text":"%2B","newText":"%2B","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"10","type":1,"startX":470,"startY":145,"text":"%3D","newText":"%3D","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"10","type":8,"startX":700,"startY":240,"orientation":"v","clonable":"undefined","fill":"Black","size":"40"}'))
applet.push(JSON.parse('{"appletID":"10","type":5,"startX":420,"startY":420}'))
tests[10]= '((randomNumerator[0]+randomNumerator[1])/7 == dragToBoxes[0].contents + (dragToBoxes[2].contents > 0 ? dragToBoxes[1].contents/dragToBoxes[2].contents : dragToBoxes[1].contents ))';

//number of tens/hundreds in 4-digit number
applet.push(JSON.parse('{"appletID":"11","type":2,"startX":460,"startY":140,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":9999,"randomFloor":10}'))
applet.push(JSON.parse('{"appletID":"11","type":1,"startX":60,"startY":80,"text":"Drag%20the%20digits%20to%20show%20the%20number%20of%20tens%20and%20the%20number%20of%20ones%20in%20each%20number.","newText":"Drag%20the%20digits%20to%20show%20the%20number%20of%20tens%20and%20the%20number%20of%20ones%20in%20each%20number.","font":"","fontString":" 18px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"11","type":1,"startX":440,"startY":260,"text":"tens","newText":"tens","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"11","type":9,"startX":380,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"11","type":9,"startX":340,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"11","type":9,"startX":300,"startY":280,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"11","type":9,"startX":380,"startY":380,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"11","type":9,"startX":340,"startY":380,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"11","type":9,"startX":300,"startY":380,"userScale":0.5}'))
applet.push(JSON.parse('{"appletID":"11","type":1,"startX":259,"startY":228,"text":"____","newText":"____","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"11","type":1,"startX":258,"startY":329,"text":"____","newText":"____","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"11","type":8,"startX":160,"startY":320,"orientation":"v","clonable":"undefined","fill":"Black","size":"40"}'))
applet.push(JSON.parse('{"appletID":"11","type":5,"startX":660,"startY":520}'))
tests[11]= 'parseInt(randomNumber[0]/10)==dragToBoxes[0].contents+dragToBoxes[1].contents*10+dragToBoxes[2].contents*100&&parseInt(randomNumber[0]/100)==dragToBoxes[3].contents+dragToBoxes[4].contents*10+dragToBoxes[5].contents*100';
applet.push(JSON.parse('{"appletID":"11","type":1,"startX":440,"startY":360,"text":"hundreds","newText":"hundreds","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
//standard to word form: multiple choice
applet.push(JSON.parse('{"appletID":"12","type":2,"startX":500,"startY":120,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":9999,"randomFloor":1}'))
applet.push(JSON.parse('{"appletID":"12","type":1,"startX":100,"startY":60,"text":"Click%20the%20matching%20number%20in%20word%20form.","newText":"Click%20the%20matching%20number%20in%20word%20form.","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"12","type":10,"startX":60,"startY":300,"correct":"inWordForm(randomNumber[0])","incorrect1":"inWordForm(getCloseAnswer(randomNumber[0], 100))","incorrect2":"inWordForm(getCloseAnswer(randomNumber[0], 100))","incorrect3":"inWordForm(changeDigit(randomNumber[0]))","multipleChoiceFontSize":18,"spaceX":350,"spaceY":60}'))
applet.push(JSON.parse('{"appletID":"12","type":5,"startX":400,"startY":480}'))
tests[12]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';

//standard to expanded form: multiple choice
applet.push(JSON.parse('{"appletID":"13","type":2,"startX":540,"startY":100,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":999999,"randomFloor":1}'))
applet.push(JSON.parse('{"appletID":"13","type":1,"startX":40,"startY":40,"text":"Click%20the%20matching%20number%20in%20expanded%20form.","newText":"Click%20the%20matching%20number%20in%20expanded%20form.","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"13","type":10,"startX":30,"startY":320,"correct":"inExpandedForm(randomNumber[0])","incorrect1":"inExpandedForm(changeDigit(randomNumber[0]))","incorrect2":"inExpandedForm(changeDigit(randomNumber[0]))","incorrect3":"inExpandedForm(getCloseAnswer(randomNumber[0], 100))","multipleChoiceFontSize":18,"spaceX":400,"spaceY":60}'))
applet.push(JSON.parse('{"appletID":"13","type":5,"startX":420,"startY":500}'))
tests[13]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';

//standard to draggable base ten blocks
applet.push(JSON.parse('{"appletID":"14","type":2,"startX":220,"startY":100,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":999,"randomFloor":1}'))
applet.push(JSON.parse('{"appletID":"14","type":1,"startX":40,"startY":40,"text":"Represent%20the%20number%20by%20dragging%20the%20correct%20base%20ten%20blocks%20onto%20the%20mat.","newText":"Represent%20the%20number%20by%20dragging%20the%20correct%20base%20ten%20blocks%20onto%20the%20mat.","font":"","fontString":" 18px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"14","type":13,"startX":180,"startY":220,"dragX":575,"dragY":300,"dragWidth":400,"dragHeight":500}'))
applet.push(JSON.parse('{"appletID":"14","type":5,"startX":180,"startY":520}'))
tests[14]= 'baseTenDragToContents==randomNumber[0]';

//2digitx2digit multiplication with numberEntry
applet.push(JSON.parse('{"appletID":"15","type":2,"startX":440,"startY":80,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":99,"randomFloor":1}'))
applet.push(JSON.parse('{"appletID":"15","type":2,"startX":440,"startY":140,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":99,"randomFloor":1}'))
applet.push(JSON.parse('{"appletID":"15","type":1,"startX":280,"startY":140,"text":"____","newText":"____","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"15","type":1,"startX":310,"startY":140,"text":"x","newText":"x","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"15","type":14,"numberEntryX":140,"numberEntryY":300,"orientation":"h","displayX":260,"displayY":220,"displayDigits":4}'))
applet.push(JSON.parse('{"appletID":"15","type":5,"startX":680,"startY":500}'))
tests[15]= 'numberEntryValue==randomNumber[0]*randomNumber[1]';

//word to number form: multiple choice
applet.push(JSON.parse('{"appletID":"16","type":16,"expression":"getRandomInt(1,1000)"}'))
applet.push(JSON.parse('{"appletID":"16","type":15,"startX":400,"startY":260,"expression":"inWordForm(hiddenNumber[0])","font":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","align":"right"}'))
applet.push(JSON.parse('{"appletID":"16","type":10,"startX":240,"startY":380,"correct":"hiddenNumber[0]","incorrect1":"getCloseAnswer(hiddenNumber[0],30)","incorrect2":"changeDigit(hiddenNumber[0],30)","incorrect3":"changeDigit(hiddenNumber[0],30)","multipleChoiceFontSize":40,"spaceX":200,"spaceY":40}'))
applet.push(JSON.parse('{"appletID":"16","type":1,"startX":80,"startY":60,"text":"Choose%20the%20matching%20number.","newText":"Choose%20the%20matching%20number.","font":"","fontString":" 48px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"16","type":5,"startX":700,"startY":520}'))
tests[16]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';

//expanded to word form: multiple choice
applet.push(JSON.parse('{"appletID":"17","type":16,"expression":"getRandomInt(100,9999)"}'))
applet.push(JSON.parse('{"appletID":"17","type":15,"startX":400,"startY":240,"expression":"inExpandedForm%28hiddenNumber%5B0%5D%29","font":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","align":"center"}'))
applet.push(JSON.parse('{"appletID":"17","type":10,"startX":140,"startY":280,"correct":"inWordForm(hiddenNumber[0])","incorrect1":"inWordForm(getCloseAnswer(hiddenNumber[0] , 50))","incorrect2":"inWordForm(changeDigit(hiddenNumber[0]))","incorrect3":"inWordForm(changeDigit(hiddenNumber[0]))","multipleChoiceFontSize":24,"spaceX":300,"spaceY":80}'))
applet.push(JSON.parse('{"appletID":"17","type":1,"startX":80,"startY":20,"text":"Choose%20the%20matching%20number%20in%20word%20form.","newText":"Choose%20the%20matching%20number%20in%20word%20form.","font":"","fontString":" 48px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":650,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"17","type":99,"drawingBoxStartX":92,"drawingBoxStartY":196,"drawingBoxEndX":722,"drawingBoxEndY":471}'))
applet.push(JSON.parse('{"appletID":"17","type":5,"startX":400,"startY":540}'))
tests[17]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';

//word form to tally box
applet.push(JSON.parse('{"appletID":"18","type":16,"expression":"getRandomInt(10,100)"}'))
applet.push(JSON.parse('{"appletID":"18","type":12,"startX":440,"startY":80,"initialValue":0}'))
applet.push(JSON.parse('{"appletID":"18","type":15,"startX":240,"startY":180,"expression":"inWordForm%28hiddenNumber%5B0%5D%29","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"300","align":"center"}'))
applet.push(JSON.parse('{"appletID":"18","type":1,"startX":120,"startY":100,"text":"Click%20the%20tally%20box%20buttons%20to%20represent%20the%20value.","newText":"Click%20the%20tally%20box%20buttons%20to%20represent%20the%20value.","font":"","fontString":" 18px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"18","type":99,"drawingBoxStartX":97,"drawingBoxStartY":79,"drawingBoxEndX":366,"drawingBoxEndY":269}'))
applet.push(JSON.parse('{"appletID":"18","type":5,"startX":240,"startY":380}'))
tests[18]= 'tallyTotal==hiddenNumber[0]';
applet.push(JSON.parse('{"appletID":"18","type":99,"drawingBoxStartX":53,"drawingBoxStartY":43,"drawingBoxEndX":741,"drawingBoxEndY":545}'))

//4-digt number comparison with inequality entry
applet.push(JSON.parse('{"appletID":"19","type":2,"startX":320,"startY":140,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":9999,"randomFloor":1000}'))
applet.push(JSON.parse('{"appletID":"19","type":2,"startX":640,"startY":140,"font":" 72px Arial","fontString":" 72px Arial","fill":"Black","randomCeiling":9999,"randomFloor":1000}'))
applet.push(JSON.parse('{"appletID":"19","type":17,"inequalityEntryX":220,"inequalityEntryY":240,"displayX":339,"displayY":151}'))
applet.push(JSON.parse('{"appletID":"19","type":99,"drawingBoxStartX":125,"drawingBoxStartY":130,"drawingBoxEndX":652,"drawingBoxEndY":320}'))
applet.push(JSON.parse('{"appletID":"19","type":1,"startX":160,"startY":80,"text":"Click%20the%20button%20to%20make%20the%20inequality%20true.","newText":"Click%20the%20button%20to%20make%20the%20inequality%20true.","font":"","fontString":" 24px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"19","type":5,"startX":380,"startY":420}'))
tests[19]= 'eval(randomNumber[0] + inequality + randomNumber[1])';

//word to standard form with number entry box
applet.push(JSON.parse('{"appletID":"20","type":16,"expression":"getRandomInt(1000,10000)"}'))
applet.push(JSON.parse('{"appletID":"20","type":15,"startX":400,"startY":140,"expression":"inWordForm%28hiddenNumber%5B0%5D%29","font":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","align":"center"}'))
applet.push(JSON.parse('{"appletID":"20","type":99,"drawingBoxStartX":360,"drawingBoxStartY":301,"drawingBoxEndX":360,"drawingBoxEndY":301}'))
applet.push(JSON.parse('{"appletID":"20","type":14,"numberEntryX":180,"numberEntryY":240,"orientation":"h","displayX":300,"displayY":160,"displayDigits":5}'))
applet.push(JSON.parse('{"appletID":"20","type":99,"drawingBoxStartX":14,"drawingBoxStartY":90,"drawingBoxEndX":787,"drawingBoxEndY":327}'))
applet.push(JSON.parse('{"appletID":"20","type":5,"startX":400,"startY":400}'))
tests[20]= 'numberEntryValue==hiddenNumber[0]';
applet.push(JSON.parse('{"appletID":"20","type":1,"startX":20,"startY":20,"text":"Enter%20the%20number.","newText":"Enter%20the%20number.","font":"","fontString":" 48px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))

//expanded to standard form: multiple choice
applet.push(JSON.parse('{"appletID":"21","type":16,"expression":"getRandomInt(1000,100000)"}'))
applet.push(JSON.parse('{"appletID":"21","type":15,"startX":420,"startY":180,"expression":"%22What%20is%20%22%20%2B%20inExpandedForm%28hiddenNumber%5B0%5D%29%20%2B%20%22%20in%20standard%20form%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"300","align":"left"}'))
applet.push(JSON.parse('{"appletID":"21","type":10,"startX":180,"startY":300,"correct":"addCommas(hiddenNumber[0])","incorrect1":"addCommas(changeDigit(hiddenNumber[0]))","incorrect2":"addCommas(changeDigit(hiddenNumber[0]))","incorrect3":"addCommas(changeDigit(hiddenNumber[0]))","multipleChoiceFontSize":40,"spaceX":250,"spaceY":60}'))
applet.push(JSON.parse('{"appletID":"21","type":5,"startX":400,"startY":500}'))
tests[21]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';
applet.push(JSON.parse('{"appletID":"21","type":99,"drawingBoxStartX":140,"drawingBoxStartY":280,"drawingBoxEndX":662,"drawingBoxEndY":573}'))
applet.push(JSON.parse('{"appletID":"21","type":99,"drawingBoxStartX":103,"drawingBoxStartY":20,"drawingBoxEndX":698,"drawingBoxEndY":589}'))

//multiplication 1-digitx2-digit: word problem
applet.push(JSON.parse('{"appletID":"22","type":16,"expression":"getRandomInt(0,100)"}'))
applet.push(JSON.parse('{"appletID":"22","type":16,"expression":"getRandomInt(3,9)"}'))
applet.push(JSON.parse('{"appletID":"22","type":16,"expression":"getRandomInt(15,99)"}'))
applet.push(JSON.parse('{"appletID":"22","type":15,"startX":380,"startY":140,"expression":"girlNames%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20needs%20to%20get%20plywood%20to%20build%20her%20flatbead%20trailer.%20The%20flatbed%20is%20%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%20feet%20by%20%22%20%2B%20hiddenNumber%5B2%5D%20%2B%20%22%20feet.%20What%20is%20the%20area%20of%20the%20flatbed%20%22%20%2B%20girlNames%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20needs%20to%20cover%20with%20plywood%3F%22","font":" 24px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"22","type":14,"numberEntryX":600,"numberEntryY":60,"orientation":"v","displayX":240,"displayY":240,"displayDigits":4}'))
applet.push(JSON.parse('{"appletID":"22","type":1,"startX":440,"startY":260,"text":"sq.%20ft.","newText":"sq.%20ft.","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":400,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"22","type":99,"drawingBoxStartX":152,"drawingBoxStartY":46,"drawingBoxEndX":658,"drawingBoxEndY":536}'))
applet.push(JSON.parse('{"appletID":"22","type":5,"startX":380,"startY":420}'))
tests[22]= 'numberEntryValue==hiddenNumber[1]*hiddenNumber[2]';

//division 3-digit/1-digit: word problem
applet.push(JSON.parse('{"appletID":"23","type":16,"expression":"getRandomInt(0,99)"}'))
applet.push(JSON.parse('{"appletID":"23","type":16,"expression":"getRandomInt(100,999)"}'))
applet.push(JSON.parse('{"appletID":"23","type":16,"expression":"getRandomInt(3,9)"}'))
applet.push(JSON.parse('{"appletID":"23","type":15,"startX":380,"startY":200,"expression":"%22Mrs.%20%22%20%2B%20surnames%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20has%20%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%20photographs%20in%20her%20collection.%20She%20places%20the%20photos%20in%20an%20album%20with%20exactly%20%22%20%2B%20hiddenNumber%5B2%5D%20%2B%20%22%20photos%20on%20each%20page.%20How%20many%20pages%20does%20Mrs.%20%22%20%2B%20surnames%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20fill%20in%20her%20photo%20album%3F%22","font":" 24px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"23","type":14,"numberEntryX":160,"numberEntryY":400,"orientation":"h","displayX":240,"displayY":320,"displayDigits":3}'))
applet.push(JSON.parse('{"appletID":"23","type":1,"startX":380,"startY":340,"text":"pages","newText":"pages","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":400,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"23","type":5,"startX":360,"startY":500}'))
tests[23]= 'Math.floor(hiddenNumber[1]/hiddenNumber[2])==numberEntryValue';
applet.push(JSON.parse('{"appletID":"23","type":99,"drawingBoxStartX":138,"drawingBoxStartY":67,"drawingBoxEndX":638,"drawingBoxEndY":564}'))

//bar graph - relative values: multiple choice items
applet.push(JSON.parse('{"appletID":"24","type":16,"expression":"getRandomInt(0,4)"}'))
applet.push(JSON.parse('{"appletID":"24","type":16,"expression":"getRandomIntExcluding(0,4,hiddenNumber[0])"}'))
applet.push(JSON.parse('{"appletID":"24","type":18,"startX":380,"startY":80,"titleText":"Snowfall Last Winter","min":0,"max":28,"interval":4,"numberLabel":"Inches","numberedAxis":"x","itemList":["Nov.","Dec.","Jan.","Feb.","Mar."],"itemLabel":"Month","itemValueList":["getRandomInt(0,14)*2","getRandomInt(0,14)*2","getRandomInt(0,14)*2","getRandomInt(0,14)*2","getRandomInt(0,14)*2"]}'))
applet.push(JSON.parse('{"appletID":"24","type":15,"startX":200,"startY":140,"expression":"%22During%20which%20month%20was%20the%20amount%20of%20snow%20recorded%20%22%20%2B%20Math.abs(barGraph.value%5BhiddenNumber%5B0%5D%5D-barGraph.value%5BhiddenNumber%5B1%5D%5D)%20%2B%20%22%20inches%20%22%20%2B%20(barGraph.value%5BhiddenNumber%5B0%5D%5D-barGraph.value%5BhiddenNumber%5B1%5D%5D%20%3C%200%20%3F%20%22greater%20%22%20%3A%20%22less%20%22)%20%2B%20%22than%20the%20amount%20of%20snow%20recorded%20in%20%22%20%2B%20barGraph.itemList%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20%3F%22","font":" 24px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"350","align":"left"}'))
applet.push(JSON.parse('{"appletID":"24","type":10,"startX":100,"startY":440,"correct":"barGraph.itemList[hiddenNumber[1]]","incorrect1":"barGraph.itemList[ getRandomIntExcluding(0,4,hiddenNumber[0]) ]","incorrect2":"barGraph.itemList[ getRandomIntExcluding(0,4,hiddenNumber[0]) ]","incorrect3":"barGraph.itemList[ getRandomIntExcluding(0,4,hiddenNumber[0]) ]","multipleChoiceFontSize":40,"spaceX":200,"spaceY":40}'))
applet.push(JSON.parse('{"appletID":"24","type":5,"startX":620,"startY":500}'))
tests[24]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';
applet.push(JSON.parse('{"appletID":"24","type":99,"drawingBoxStartX":11,"drawingBoxStartY":8,"drawingBoxEndX":782,"drawingBoxEndY":419}'))
applet.push(JSON.parse('{"appletID":"24","type":99,"drawingBoxStartX":68,"drawingBoxStartY":420,"drawingBoxEndX":730,"drawingBoxEndY":573}'))

//bar graph - relative values: multiple choice values
applet.push(JSON.parse('{"appletID":"25","type":18,"startX":0,"startY":80,"titleText":"Snowfall Last Winter","min":0,"max":28,"interval":4,"numberLabel":"Inches","numberedAxis":"x","itemList":["Nov.","Dec.","Jan.","Feb.","Mar."],"itemLabel":"Month","itemValueList":["getRandomInt(0,14)*2","getRandomInt(0,14)*2","getRandomInt(0,14)*2","getRandomInt(0,14)*2","getRandomInt(0,14)*2"]}'))
applet.push(JSON.parse('{"appletID":"25","type":16,"expression":"getRandomInt(0,4)"}'))
applet.push(JSON.parse('{"appletID":"25","type":16,"expression":"getRandomIntExcluding(0,4, hiddenNumber[0] )"}'))
applet.push(JSON.parse('{"appletID":"25","type":99,"drawingBoxStartX":645,"drawingBoxStartY":185,"drawingBoxEndX":645,"drawingBoxEndY":185}'))
applet.push(JSON.parse('{"appletID":"25","type":15,"startX":600,"startY":180,"expression":"%22How%20many%20%22%20%2B%20%28barGraph.value%5BhiddenNumber%5B0%5D%20%5D%20%3C%20barGraph.value%5BhiddenNumber%5B1%5D%20%5D%20%3F%20%22fewer%20%22%20%3A%20%22more%20%22%20%29%20%2B%20%22inches%20of%20snow%20were%20recorded%20in%20%22%20%2B%20barGraph.itemList%5B%20hiddenNumber%5B0%5D%20%5D%20%2B%20%22%20than%20were%20recorded%20in%20%22%20%2B%20barGraph.itemList%5B%20hiddenNumber%5B1%5D%20%5D%20%2B%20%22%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"350","align":"left"}'))
applet.push(JSON.parse('{"appletID":"25","type":99,"drawingBoxStartX":594,"drawingBoxStartY":430,"drawingBoxEndX":594,"drawingBoxEndY":430}'))
applet.push(JSON.parse('{"appletID":"25","type":14,"numberEntryX":320,"numberEntryY":400,"orientation":"h","displayX":460,"displayY":320,"displayDigits":3}'))
applet.push(JSON.parse('{"appletID":"25","type":1,"startX":600,"startY":340,"text":"inches","newText":"inches","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"25","type":5,"startX":520,"startY":520}'))
tests[25]= 'numberEntryValue==Math.abs( barGraph.value[ hiddenNumber[0] ] - barGraph.value[ hiddenNumber[1] ] )';
applet.push(JSON.parse('{"appletID":"25","type":99,"drawingBoxStartX":8,"drawingBoxStartY":10,"drawingBoxEndX":784,"drawingBoxEndY":579}'))

//bar graph - toal amount relative to answer: multiple choice
applet.push(JSON.parse('{"appletID":"26","type":16,"expression":"getRandomInt(2,9)"}'))
applet.push(JSON.parse('{"appletID":"26","type":18,"startX":400,"startY":80,"titleText":"Snowfall Last Winter","min":0,"max":28,"interval":4,"numberLabel":"Inches","numberedAxis":"x","itemList":["Nov.","Dec.","Jan.","Feb.","Mar."],"itemLabel":"Month","itemValueList":["getRandomInt(0,14)*2","getRandomInt(0,14)*2","getRandomInt(0,14)*2","getRandomInt(0,14)*2"," ( hiddenNumber[0] > barGraph.totalValue() ? hiddenNumber[0] - barGraph.totalValue() : hiddenNumber[0] - ( barGraph.totalValue()%hiddenNumber[0] ) ) "]}'))
applet.push(JSON.parse('{"appletID":"26","type":15,"startX":208,"startY":229,"expression":"%22The%20total%20amount%20of%20snow%20shown%20in%20the%20graph%20is%20%22%20%2B%20hiddenNumber%5B0%5D%20%2B%20%22%20times%20as%20much%20snow%20as%20was%20recorded%20during%20the%20winter%20of%202014.%20How%20much%20snow%20was%20recorded%20during%20the%20winter%20of%202014%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"350","align":"left"}'))
applet.push(JSON.parse('{"appletID":"26","type":14,"numberEntryX":20,"numberEntryY":540,"orientation":"h","displayX":40,"displayY":460,"displayDigits":3}'))
applet.push(JSON.parse('{"appletID":"26","type":1,"startX":180,"startY":480,"text":"inches","newText":"inches","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":350,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"26","type":5,"startX":640,"startY":540}'))
tests[26]= 'numberEntryValue == barGraph.totalValue() / hiddenNumber[0]';

//this
applet.push(JSON.parse('{"appletID":"27","type":18,"startX":120,"startY":80,"titleText":"Cans Collected","min":0,"max":300,"interval":50,"numberLabel":"Cans","numberedAxis":"x","itemList":["Henderson","Dreyfus","Columbus","Cantor","Reed"],"itemLabel":"Class","itemValueList":["getRandomInt(0,300)","getRandomInt(0,300)","getRandomInt(0,300)","getRandomInt(0,300)","getRandomInt(0,300)"]}'))
applet.push(JSON.parse('{"appletID":"27","type":10,"startX":120,"startY":440,"correct":"barGraph.itemList[ barGraph.topSpot() ]","incorrect1":"barGraph.itemList[ getRandomIntExcluding(0,4,barGraph.topSpot() ) ]","incorrect2":"barGraph.itemList[ getRandomIntExcluding(0,4,barGraph.topSpot() ) ]","incorrect3":"barGraph.itemList[ getRandomIntExcluding(0,4,barGraph.topSpot() ) ]","multipleChoiceFontSize":24,"spaceX":200,"spaceY":40}'))
applet.push(JSON.parse('{"appletID":"27","type":1,"startX":120,"startY":380,"text":"Which%20teacher%27s%20class%20collected%20the%20most%20cans%20of%20all%3F","newText":"Which%20teacher%27s%20class%20collected%20the%20most%20cans%20of%20all%3F","font":"","fontString":" 24px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":600,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"27","type":5,"startX":620,"startY":480}'))
tests[27]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';
applet.push(JSON.parse('{"appletID":"27","type":99,"drawingBoxStartX":99,"drawingBoxStartY":361,"drawingBoxEndX":702,"drawingBoxEndY":550}'))
applet.push(JSON.parse('{"appletID":"27","type":99,"drawingBoxStartX":125,"drawingBoxStartY":16,"drawingBoxEndX":688,"drawingBoxEndY":333}'))

applet.push(JSON.parse('{"appletID":"28","type":20,"startX":100,"startY":340,"lineOrientation":"h","lineLength":600,"min":0,"minLabel":true,"max":10,"maxLabel":true,"interval":1,"intervalLabel":true,"subDivide":4,"dotStartX":100,"dotStartY":260,"dotOrientation":"h","dotNumber":2,"dotLabel":true,"dotSnapping":true}'))
applet.push(JSON.parse('{"appletID":"28","type":1,"startX":40,"startY":40,"text":"Drag%20the%20dots%20to%20the%20numbers%20indicated%3A","newText":"Drag%20the%20dots%20to%20the%20numbers%20indicated%3A","font":"","fontString":" 24px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"28","type":7,"startX":280,"startY":180,"font":" 72px Arial","fontString":" 72px Arial","fill":"Red","wholeNumberRandomCeiling":"10","wholeNumberRandomFloor":"1","numeratorRandomCeiling":"4","numeratorRandomFloor":"1","denominatorRandomCeiling":"4","denominatorRandomFloor":"4","size":"72"}'))
applet.push(JSON.parse('{"appletID":"28","type":7,"startX":460,"startY":180,"font":" 72px Arial","fontString":" 72px Arial","fill":"Orange","wholeNumberRandomCeiling":"9","wholeNumberRandomFloor":"1","numeratorRandomCeiling":"4","numeratorRandomFloor":"1","denominatorRandomCeiling":"4","denominatorRandomFloor":"4","size":"72"}'))
applet.push(JSON.parse('{"appletID":"28","type":1,"startX":420,"startY":120,"text":"B.","newText":"B.","font":"","fontString":" 24px Arial","fill":"Orange","wordWrap":false,"wordWrapWidth":"300","alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"28","type":1,"startX":240,"startY":120,"text":"A.","newText":"A.","font":"","fontString":" 24px Arial","fill":"Red","wordWrap":false,"wordWrapWidth":"300","alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"28","type":5,"startX":400,"startY":460}'))
tests[28]= 'numberLine.dotValue[0]==randomMixedNumber[0].wholeNumber + (randomMixedNumber[0].numerator / randomMixedNumber[0].denominator)&&numberLine.dotValue[1]==randomMixedNumber[1].wholeNumber + (randomMixedNumber[1].numerator / randomMixedNumber[1].denominator)';
applet.push(JSON.parse('{"appletID":"28","type":99,"drawingBoxStartX":21,"drawingBoxStartY":20,"drawingBoxEndX":780,"drawingBoxEndY":558}'))

applet.push(JSON.parse('{"appletID":"29","type":16,"expression":"getRandomInt%281%2C12%29"}'))
applet.push(JSON.parse('{"appletID":"29","type":16,"expression":"getRandomInt%281%2ChiddenNumber%5B0%5D%29"}'))
applet.push(JSON.parse('{"appletID":"29","type":15,"startX":400,"startY":180,"expression":"hiddenNumber%5B1%5D","font":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","align":"right"}'))
applet.push(JSON.parse('{"appletID":"29","type":15,"startX":400,"startY":250,"expression":"hiddenNumber%5B0%5D","font":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","align":"right"}'))
applet.push(JSON.parse('{"appletID":"29","type":1,"startX":340,"startY":134,"text":"___","newText":"___","font":"","fontString":" 72px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","alignment":"center"}'))
applet.push(JSON.parse('{"appletID":"29","type":20,"startX":100,"startY":340,"lineOrientation":"h","lineLength":600,"min":0,"minLabel":false,"max":1,"maxLabel":false,"interval":1,"intervalLabel":false,"subDivide":1,"dotStartX":390,"dotStartY":386,"dotOrientation":"h","dotNumber":1,"dotLabel":false,"dotSnapping":false}'))
applet.push(JSON.parse('{"appletID":"29","type":1,"startX":140,"startY":60,"text":"Drag%20the%20dot%20to%20represent%20the%20fraction%20on%20the%20line%3A","newText":"Drag%20the%20dot%20to%20represent%20the%20fraction%20on%20the%20line%3A","font":"","fontString":" 24px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"29","type":5,"startX":400,"startY":480}'))
tests[29]= 'Math.abs(numberLine.dotValue[0]-hiddenNumber[1]/hiddenNumber[0])<.05';

applet.push(JSON.parse('{"appletID":"42","type":1,"startX":240,"startY":40,"text":"What%20is%20the%20answer%20to%20the%20ultimate%20question%20of%20life%2C%20the%20universe%2C%20and%20everything%3F","newText":"What%20is%20the%20answer%20to%20the%20ultimate%20question%20of%20life%2C%20the%20universe%2C%20and%20everything%3F","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":300,"alignment":"center"}'))
applet.push(JSON.parse('{"appletID":"42","type":14,"numberEntryX":160,"numberEntryY":400,"orientation":"h","displayX":100,"displayY":320,"displayDigits":12}'))
applet.push(JSON.parse('{"appletID":"42","type":5,"startX":360,"startY":500}'))
tests[42]= 'numberEntryValue==42';

applet.push(JSON.parse('{"appletID":"97","type":20,"startX":180,"startY":160,"lineOrientation":"h","lineLength":400,"min":0,"minLabel":true,"max":20,"maxLabel":true,"interval":2,"intervalLabel":true,"subDivide":2,"dotStartX":400,"dotStartY":300,"dotOrientation":"v","dotNumber":3,"staticDots":false ,"dotLabel":true,"dotSnapping":true}'))
applet.push(JSON.parse('{"appletID":"98","type":20,"startX":100,"startY":10,"lineOrientation":"v","lineLength":400,"min":0,"minLabel":true,"max":20,"maxLabel":true,"interval":2,"intervalLabel":true,"subDivide":2,"dotStartX":394,"dotStartY":271,"dotOrientation":"v","dotNumber":3,"staticDots":false ,"dotLabel":true,"dotSnapping":true}'))


//*******************************************4.4.OA.1
//Missing factors - facts to 12
applet.push(JSON.parse('{"appletID":"100","type":1,"startX":140,"startY":80,"text":"Type%20the%20missing%20number%3A","newText":"Type%20the%20missing%20number%3A","font":"","fontString":" 48px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":300,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"100","type":16,"expression":"getRandomInt%281%2C12%29"}'))
applet.push(JSON.parse('{"appletID":"100","type":16,"expression":"getRandomInt%281%2C12%29"}'))
applet.push(JSON.parse('{"appletID":"100","type":16,"expression":"hiddenNumber%5B0%5D%2ahiddenNumber%5B1%5D"}'))
applet.push(JSON.parse('{"appletID":"100","type":15,"startX":480,"startY":220,"expression":"%22x%20%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%20%3D%20%22%20%2B%20hiddenNumber%5B2%5D","font":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"300","align":"left"}'))
applet.push(JSON.parse('{"appletID":"100","type":14,"numberEntryX":200,"numberEntryY":260,"orientation":"h","displayX":320,"displayY":180,"displayDigits":2}'))
applet.push(JSON.parse('{"appletID":"100","type":5,"startX":420,"startY":400}'))
tests[100]= 'numberEntryValue==hiddenNumber[0]';
applet.push(JSON.parse('{"appletID":"100","type":99,"drawingBoxStartX":20,"drawingBoxStartY":19,"drawingBoxEndX":780,"drawingBoxEndY":583}'))

//Properties of multiplication
applet.push(JSON.parse('{"appletID":"101","type":16,"expression":"getRandomInt%280%2C4%29"}'))
applet.push(JSON.parse('{"appletID":"101","type":15,"startX":400,"startY":160,"expression":"%22Which%20equation%20shows%20the%20%22%20%2B%20multiplicationPropertyType%5B%20hiddenNumber%5B0%5D%20%5D%20%2B%20%22%20property%20of%20multiplication%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"500","align":"center"}'))
applet.push(JSON.parse('{"appletID":"101","type":99,"drawingBoxStartX":205,"drawingBoxStartY":443,"drawingBoxEndX":205,"drawingBoxEndY":443}'))
applet.push(JSON.parse('{"appletID":"101","type":10,"startX":140,"startY":300,"correct":"multiplicationProperty( hiddenNumber[0] )","incorrect1":"multiplicationProperty( getRandomIntExcluding(0,4,hiddenNumber[0]))","incorrect2":"multiplicationProperty( getRandomIntExcluding(0,4,hiddenNumber[0]))","incorrect3":"multiplicationProperty( getRandomIntExcluding(0,4,hiddenNumber[0]))","multipleChoiceFontSize":18,"spaceX":325,"spaceY":60}'))
applet.push(JSON.parse('{"appletID":"101","type":5,"startX":400,"startY":480}'))
tests[101]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';
applet.push(JSON.parse('{"appletID":"101","type":99,"drawingBoxStartX":18,"drawingBoxStartY":19,"drawingBoxEndX":781,"drawingBoxEndY":579}'))

//*******************************************4.4.OA.2
//Estimate products: word problems
applet.push(JSON.parse('{"appletID":"102","type":16,"expression":"getRandomInt%280%2C4%29"}'))
applet.push(JSON.parse('{"appletID":"102","type":16,"expression":"getRandomInt%2811%2C99%29"}'))
applet.push(JSON.parse('{"appletID":"102","type":16,"expression":"getRandomInt%288%2C12%29"}'))
applet.push(JSON.parse('{"appletID":"102","type":15,"startX":420,"startY":160,"expression":"%22There%20are%20%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.name%20%2B%20%22%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.preposition%20%2B%20%22%20each%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.group%20%2B%20%22.%20About%20how%20many%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.name%20%2B%22%20are%20there%20%22%2BmakeWordProblemSet%28hiddenNumber%5B0%5D%29.preposition%2B%22%20%22%20%2B%20hiddenNumber%5B2%5D%20%2B%20%22%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.groupPlural%20%2B%22%3F%20Choose%20the%20best%20estimate.%22","font":" 24px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"102","type":10,"startX":260,"startY":260,"correct":"(Math.round(hiddenNumber[1] / 10) * 10) * (hiddenNumber[2] > 10 ? (Math.round(hiddenNumber[2] / 10) * 10) : hiddenNumber[2])","incorrect1":"(Math.round(hiddenNumber[1] / 10) * 10) * (Math.round(hiddenNumber[2] / 10) * 10)+100","incorrect2":"(Math.round(hiddenNumber[1] / 10) * 10) * (Math.round(hiddenNumber[2] / 10) * 10)-100","incorrect3":"(Math.round(hiddenNumber[1] / 10) * 10) * (Math.round(hiddenNumber[2] / 10) * 10)+200","multipleChoiceFontSize":40,"spaceX":200,"spaceY":40}'))
applet.push(JSON.parse('{"appletID":"102","type":5,"startX":400,"startY":420}'))
tests[102]= 'multipleChoiceCorrectAnswer==multipleChoiceSelected';
applet.push(JSON.parse('{"appletID":"102","type":99,"drawingBoxStartX":21,"drawingBoxStartY":20,"drawingBoxEndX":782,"drawingBoxEndY":581}'))

//Multiply a 2-digit number by a 2-digit number: word problems
applet.push(JSON.parse('{"appletID":"103","type":16,"expression":"getRandomInt%280%2C4%29"}'))
applet.push(JSON.parse('{"appletID":"103","type":16,"expression":"getRandomInt%2811%2C99%29"}'))
applet.push(JSON.parse('{"appletID":"103","type":16,"expression":"getRandomInt%2811%2C99%29"}'))
applet.push(JSON.parse('{"appletID":"103","type":99,"drawingBoxStartX":409,"drawingBoxStartY":215,"drawingBoxEndX":409,"drawingBoxEndY":215}'))
applet.push(JSON.parse('{"appletID":"103","type":99,"drawingBoxStartX":410,"drawingBoxStartY":276,"drawingBoxEndX":410,"drawingBoxEndY":276}'))
applet.push(JSON.parse('{"appletID":"103","type":15,"startX":400,"startY":200,"expression":"%22There%20were%20%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.groupPlural%20%2B%20%22%20of%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.name%20%2B%20%22.%20Each%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.group%20%2B%20%22%20contained%20%22%20%2B%20hiddenNumber%5B2%5D%20%2B%20%22%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.name%20%2B%20%22.%20How%20many%20%22%20%2B%20makeWordProblemSet%28hiddenNumber%5B0%5D%29.name%20%2B%20%22%20were%20there%20in%20total%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"103","type":15,"startX":520,"startY":380,"expression":"makeWordProblemSet%28hiddenNumber%5B0%5D%29.name","font":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"103","type":14,"numberEntryX":140,"numberEntryY":60,"orientation":"v","displayX":240,"displayY":340,"displayDigits":5}'))
applet.push(JSON.parse('{"appletID":"103","type":99,"drawingBoxStartX":19,"drawingBoxStartY":21,"drawingBoxEndX":778,"drawingBoxEndY":581}'))
applet.push(JSON.parse('{"appletID":"103","type":5,"startX":600,"startY":480}'))
tests[103]= 'numberEntryValue==hiddenNumber[1]*hiddenNumber[2]';

//Multiply a 2-digit number by a larger number: word problems
applet.push(JSON.parse('{"appletID":"104","type":16,"expression":"getRandomInt%280%2C6%29"}'))
applet.push(JSON.parse('{"appletID":"104","type":16,"expression":"getRandomInt%2811%2C99%29"}'))
applet.push(JSON.parse('{"appletID":"104","type":16,"expression":"getRandomInt%28111%2C999%29"}'))
applet.push(JSON.parse('{"appletID":"104","type":15,"startX":460,"startY":180,"expression":"%22A%20salesperson%20sold%20%22%2BhiddenNumber%5B1%5D%2B%22%20%22%2B%20%5B%22cars%22%20%2C%20%22computers%22%20%2C%20%22cell%20phones%22%20%2C%20%22necklaces%22%20%2C%20%22televisions%22%20%2C%20%22microscopes%22%20%2C%20%22telescopes%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22.%20The%20%22%2B%5B%22circus%20tents%22%20%2C%20%22computers%22%20%2C%20%22cell%20phones%22%20%2C%20%22necklaces%22%20%2C%20%22televisions%22%20%2C%20%22microscopes%22%20%2C%20%22telescopes%22%5D%5BhiddenNumber%5B0%5D%20%5D%2B%22%20cost%20%24%22%2BhiddenNumber%5B2%5D%2B%22%20each.%20What%20was%20the%20total%20price%20of%20the%20%22%2B%5B%22circus%20tents%22%20%2C%20%22computers%22%20%2C%20%22cell%20phones%22%20%2C%20%22necklaces%22%20%2C%20%22televisions%22%20%2C%20%22microscopes%22%20%2C%20%22telescopes%22%5D%5BhiddenNumber%5B0%5D%20%5D%2B%22%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"500","align":"left"}'))
applet.push(JSON.parse('{"appletID":"104","type":14,"numberEntryX":140,"numberEntryY":60,"orientation":"v","displayX":240,"displayY":270,"displayDigits":6}'))
applet.push(JSON.parse('{"appletID":"104","type":1,"startX":520,"startY":280,"text":"dollars","newText":"dollars","font":"","fontString":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":500,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"104","type":5,"startX":540,"startY":440}'))
tests[104]= 'numberEntryValue==hiddenNumber[1]*hiddenNumber[2]';
applet.push(JSON.parse('{"appletID":"104","type":99,"drawingBoxStartX":23,"drawingBoxStartY":23,"drawingBoxEndX":769,"drawingBoxEndY":584}'))

//Multiply numbers ending in zeroes: word problems
applet.push(JSON.parse('{"appletID":"105","type":16,"expression":"getRandomInt%280%2C4%29"}'))
applet.push(JSON.parse('{"appletID":"105","type":16,"expression":"getRandomInt%282%2C9%29%2aMath.pow%2810%2C%20getRandomInt%280%2C3%29%29"}'))
applet.push(JSON.parse('{"appletID":"105","type":16,"expression":"getRandomInt%282%2C9%29%2aMath.pow%2810%2C%20getRandomInt%280%2C3%29%29"}'))
applet.push(JSON.parse('{"appletID":"105","type":15,"startX":400,"startY":200,"expression":"%22A%22%20%2B%20%5B%22n%20university%20library%22%2C%20%22%20boatmaker%22%2C%20%22%20computer%20manufacturer%22%2C%20%22%20truck%20company%20%22%2C%20%22%20toy%20store%22%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20ordered%20%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%20shipments%20of%20%22%20%2B%20hiddenNumber%5B2%5D%20%2B%20%22%20%22%20%2B%20%5B%22textbooks%22%20%2C%20%22bolts%20of%20canvas%20fabric%22%20%2C%20%22components%22%20%2C%20%22barrels%20of%20gasoline%22%20%2C%20%22boxes%20of%20toys%22%20%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22.%20How%20many%20%22%20%2B%20%5B%22textbooks%22%20%2C%20%22bolts%20of%20canvas%20fabric%22%20%2C%20%22components%22%20%2C%20%22barrels%20of%20gasoline%22%20%2C%20%22boxes%20of%20toys%22%20%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20were%20ordered%20in%20total%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"105","type":14,"numberEntryX":120,"numberEntryY":40,"orientation":"v","displayX":220,"displayY":360,"displayDigits":7}'))
applet.push(JSON.parse('{"appletID":"105","type":5,"startX":380,"startY":480}'))
tests[105]= 'numberEntryValue==hiddenNumber[1]*hiddenNumber[2]';
applet.push(JSON.parse('{"appletID":"105","type":99,"drawingBoxStartX":20,"drawingBoxStartY":18,"drawingBoxEndX":777,"drawingBoxEndY":581}'))

//Division facts to 12: word problems
applet.push(JSON.parse('{"appletID":"106","type":16,"expression":"getRandomInt%280%2C4%29"}'))
applet.push(JSON.parse('{"appletID":"106","type":16,"expression":"getRandomInt%282%2C9%29%2aMath.pow%2810%2C%20getRandomInt%280%2C3%29%29"}'))
applet.push(JSON.parse('{"appletID":"106","type":16,"expression":"getRandomInt%282%2C9%29%2aMath.pow%2810%2C%20getRandomInt%280%2C3%29%29"}'))
applet.push(JSON.parse('{"appletID":"106","type":15,"startX":400,"startY":200,"expression":"%22A%22%20%2B%20%5B%22n%20university%20library%22%2C%20%22%20boatmaker%22%2C%20%22%20computer%20manufacturer%22%2C%20%22%20truck%20company%20%22%2C%20%22%20toy%20store%22%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20ordered%20%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%20shipments%20of%20%22%20%2B%20hiddenNumber%5B2%5D%20%2B%20%22%20%22%20%2B%20%5B%22textbooks%22%20%2C%20%22bolts%20of%20canvas%20fabric%22%20%2C%20%22components%22%20%2C%20%22barrels%20of%20gasoline%22%20%2C%20%22boxes%20of%20toys%22%20%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22.%20How%20many%20%22%20%2B%20%5B%22textbooks%22%20%2C%20%22bolts%20of%20canvas%20fabric%22%20%2C%20%22components%22%20%2C%20%22barrels%20of%20gasoline%22%20%2C%20%22boxes%20of%20toys%22%20%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20were%20ordered%20in%20total%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"106","type":14,"numberEntryX":120,"numberEntryY":40,"orientation":"v","displayX":220,"displayY":360,"displayDigits":7}'))
applet.push(JSON.parse('{"appletID":"106","type":5,"startX":380,"startY":480}'))
tests[106]= 'numberEntryValue==hiddenNumber[2]/hiddenNumber[1]';
applet.push(JSON.parse('{"appletID":"106","type":99,"drawingBoxStartX":20,"drawingBoxStartY":18,"drawingBoxEndX":777,"drawingBoxEndY":581}'))

// Divide larger numbers by 2-12: word problems
applet.push(JSON.parse('{"appletID":"107","type":16,"expression":"getRandomInt%280%2C6%29"}'))
applet.push(JSON.parse('{"appletID":"107","type":16,"expression":"getRandomInt%282%2C12%29"}'))
applet.push(JSON.parse('{"appletID":"107","type":16,"expression":"hiddenNumber%5B1%5D%2agetRandomInt%28101%2C199%29"}'))
applet.push(JSON.parse('{"appletID":"107","type":15,"startX":400,"startY":200,"expression":"%22A%20%22%20%2B%20%5B%22boy%22%20%2C%20%22scientist%22%20%2C%20%22coach%22%20%2C%20%22baker%22%20%2C%20%22tailor%22%20%2C%20%22butcher%22%20%2C%20%22farmer%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22%20has%20%24%22%20%2B%20addCommas%28hiddenNumber%5B2%5D%29%20%2B%20%22%20to%20spend%20on%20%22%20%2B%20%5B%22packs%20of%20baseball%20cards%22%20%2C%20%22test%20tubes%22%20%2C%20%22soccer%20balls%22%20%2C%20%22sacks%20of%20flour%22%20%2C%20%22bolts%20of%20cloth%22%20%2C%20%22cuts%20of%20meat%22%20%2C%20%22bags%20of%20seed%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22.%20If%20each%20of%20the%20%22%20%2B%20%5B%22packs%20of%20baseball%20cards%22%20%2C%20%22test%20tubes%22%20%2C%20%22soccer%20balls%22%20%2C%20%22sacks%20of%20flour%22%20%2C%20%22bolts%20of%20cloth%22%20%2C%20%22cuts%20of%20meat%22%20%2C%20%22bags%20of%20seed%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22%20costs%20%24%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%2C%20how%20many%20%22%20%2B%20%5B%22packs%20of%20baseball%20cards%22%20%2C%20%22test%20tubes%22%20%2C%20%22soccer%20balls%22%20%2C%20%22sacks%20of%20flour%22%20%2C%20%22bolts%20of%20cloth%22%20%2C%20%22cuts%20of%20meat%22%20%2C%20%22bags%20of%20seed%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22%20will%20the%20%22%20%2B%20%5B%22boy%22%20%2C%20%22scientist%22%20%2C%20%22coach%22%20%2C%20%22baker%22%20%2C%20%22tailor%22%20%2C%20%22butcher%22%20%2C%20%22farmer%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22%20be%20able%20to%20buy%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"107","type":14,"numberEntryX":120,"numberEntryY":60,"orientation":"v","displayX":220,"displayY":380,"displayDigits":3}'))
applet.push(JSON.parse('{"appletID":"107","type":15,"startX":460,"startY":420,"expression":"%5B%22packs%20of%20baseball%20cards%22%20%2C%20%22test%20tubes%22%20%2C%20%22soccer%20balls%22%20%2C%20%22sacks%20of%20flour%22%20%2C%20%22bolts%20of%20cloth%22%20%2C%20%22cuts%20of%20meat%22%20%2C%20%22bags%20of%20seed%22%5D%5BhiddenNumber%5B0%5D%20%5D","font":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"107","type":5,"startX":380,"startY":500}'))
tests[107]= 'numberEntryValue==hiddenNumber[2]/hiddenNumber[1]';
applet.push(JSON.parse('{"appletID":"107","type":99,"drawingBoxStartX":23,"drawingBoxStartY":17,"drawingBoxEndX":778,"drawingBoxEndY":583}'))

//Divide numbers ending in zeroes by numbers ending in zeroes: word problems
applet.push(JSON.parse('{"appletID":"108","type":16,"expression":"getRandomInt%280%2C4%29"}'))
applet.push(JSON.parse('{"appletID":"108","type":16,"expression":"getRandomInt%282%2C12%29%2aMath.pow%2810%2CgetRandomInt%281%2C3%29%20%29"}'))
applet.push(JSON.parse('{"appletID":"108","type":16,"expression":"getRandomInt%282%2C12%29%2aMath.pow%2810%2CgetRandomInt%281%2C3%29%20%29"}'))
applet.push(JSON.parse('{"appletID":"108","type":15,"startX":400,"startY":240,"expression":"%22A%22%20%2B%20%5B%22n%20university%20library%22%2C%20%22%20boatmaker%22%2C%20%22%20computer%20manufacturer%22%2C%20%22%20truck%20company%22%2C%20%22%20toy%20store%22%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20needs%20to%20prepare%20an%20order%20of%20%22%20%2B%20addCommas%28hiddenNumber%5B1%5D%2ahiddenNumber%5B2%5D%29%20%2B%20%22%20%22%20%2B%5B%22textbooks%22%20%2C%20%22bolts%20of%20canvas%20fabric%22%20%2C%20%22components%22%20%2C%20%22barrels%20of%20gasoline%22%20%2C%20%22boxes%20of%20toys%22%20%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22.%20If%20each%20container%20can%20hold%20%22%20%2B%20addCommas%28hiddenNumber%5B1%5D%29%20%2B%20%22%20%22%20%2B%20%5B%22textbooks%22%20%2C%20%22bolts%20of%20canvas%20fabric%22%20%2C%20%22components%22%20%2C%20%22barrels%20of%20gasoline%22%20%2C%20%22boxes%20of%20toys%22%20%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%2C%20how%20many%20containers%20will%20the%22%20%2B%20%5B%22%20library%22%2C%20%22%20boatmaker%22%2C%20%22%20computer%20manufacturer%22%2C%20%22%20truck%20company%22%2C%20%22%20toy%20store%22%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20need%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"400","align":"left"}'))
applet.push(JSON.parse('{"appletID":"108","type":14,"numberEntryX":120,"numberEntryY":60,"orientation":"v","displayX":200,"displayY":460,"displayDigits":7}'))
applet.push(JSON.parse('{"appletID":"108","type":5,"startX":620,"startY":480}'))
tests[108]= 'numberEntryValue==hiddenNumber[2]';
applet.push(JSON.parse('{"appletID":"108","type":99,"drawingBoxStartX":21,"drawingBoxStartY":21,"drawingBoxEndX":782,"drawingBoxEndY":580}'))

//Divide by 2-digit numbers and interpreting remainders: word problems
applet.push(JSON.parse('{"appletID":"109","type":16,"expression":"getRandomInt%280%2C6%29"}'))
applet.push(JSON.parse('{"appletID":"109","type":16,"expression":"getRandomInt%2812%2C29%29"}'))
applet.push(JSON.parse('{"appletID":"109","type":16,"expression":"getRandomInt%283%2C7%29"}'))
applet.push(JSON.parse('{"appletID":"109","type":16,"expression":"getRandomInt%280%2C9%29"}'))
applet.push(JSON.parse('{"appletID":"109","type":16,"expression":"getRandomInt%280%2C1%29"}'))
applet.push(JSON.parse('{"appletID":"109","type":15,"startX":400,"startY":180,"expression":"%22A%20%22%20%2B%20%5B%22boy%22%20%2C%20%22scientist%22%20%2C%20%22coach%22%20%2C%20%22baker%22%20%2C%20%22tailor%22%20%2C%20%22butcher%22%20%2C%20%22farmer%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22%20has%20%24%22%20%2B%20addCommas%28hiddenNumber%5B1%5D%2ahiddenNumber%5B2%5D%2BhiddenNumber%5B3%5D%29%20%2B%20%22%20to%20spend%20on%20%22%20%2B%20%5B%22packs%20of%20baseball%20cards%22%20%2C%20%22test%20tubes%22%20%2C%20%22soccer%20balls%22%20%2C%20%22sacks%20of%20flour%22%20%2C%20%22bolts%20of%20cloth%22%20%2C%20%22cuts%20of%20meat%22%20%2C%20%22bags%20of%20seed%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22.%20If%20each%20of%20the%20%22%20%2B%20%5B%22packs%22%20%2C%20%22tubes%22%20%2C%20%22balls%22%20%2C%20%22sacks%22%20%2C%20%22bolts%22%20%2C%20%22cuts%22%20%2C%20%22bags%22%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20costs%20%24%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%2C%20%22%20%2B%20%28hiddenNumber%5B4%5D%3D%3D0%20%3F%20%22after%20buying%20as%20many%20%22%20%2B%20%5B%22packs%22%20%2C%20%22tubes%22%20%2C%20%22balls%22%20%2C%20%22sacks%22%20%2C%20%22bolts%22%20%2C%20%22cuts%22%20%2C%20%22bags%22%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20as%20the%20%22%20%2B%20%5B%22boy%22%20%2C%20%22scientist%22%20%2C%20%22coach%22%20%2C%20%22baker%22%20%2C%20%22tailor%22%20%2C%20%22butcher%22%20%2C%20%22farmer%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22%20can%20afford%2C%20how%20much%20money%20will%20the%20%22%20%2B%20%5B%22boy%22%20%2C%20%22scientist%22%20%2C%20%22coach%22%20%2C%20%22baker%22%20%2C%20%22tailor%22%20%2C%20%22butcher%22%20%2C%20%22farmer%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22%20have%20left%3F%22%20%3A%20%22how%20many%20%22%20%2B%20%5B%22packs%22%20%2C%20%22tubes%22%20%2C%20%22balls%22%20%2C%20%22sacks%22%20%2C%20%22bolts%22%20%2C%20%22cuts%22%20%2C%20%22bags%22%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%20can%20the%20%22%20%2B%20%5B%22boy%22%20%2C%20%22scientist%22%20%2C%20%22coach%22%20%2C%20%22baker%22%20%2C%20%22tailor%22%20%2C%20%22butcher%22%20%2C%20%22farmer%22%5D%5BhiddenNumber%5B0%5D%20%5D%20%2B%20%22%20afford%3F%22%20%29","font":" 30px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"500","align":"left"}'))
applet.push(JSON.parse('{"appletID":"109","type":14,"numberEntryX":160,"numberEntryY":380,"orientation":"h","displayX":300,"displayY":300,"displayDigits":2}'))
applet.push(JSON.parse('{"appletID":"109","type":15,"startX":435,"startY":345,"expression":"%28hiddenNumber%5B4%5D%20%3D%3D%201%20%3F%20%5B%22packs%22%20%2C%20%22tubes%22%20%2C%20%22balls%22%20%2C%20%22sacks%22%20%2C%20%22bolts%22%20%2C%20%22cuts%22%20%2C%20%22bags%22%5D%5BhiddenNumber%5B0%5D%5D%20%3A%20%22%22%29","font":" 36px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"500","align":"left"}'))
applet.push(JSON.parse('{"appletID":"109","type":15,"startX":280,"startY":335,"expression":"%28hiddenNumber%5B4%5D%20%3D%3D%201%20%3F%20%22%22%20%3A%20%22%24%22%29","font":" 48px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":"500","align":"right"}'))
applet.push(JSON.parse('{"appletID":"109","type":5,"startX":400,"startY":480}'))
tests[109]= 'numberEntryValue==(hiddenNumber[4] == 1 ? hiddenNumber[2] : hiddenNumber[3] )';
applet.push(JSON.parse('{"appletID":"109","type":99,"drawingBoxStartX":22,"drawingBoxStartY":21,"drawingBoxEndX":780,"drawingBoxEndY":581}'))

//Estimate sums: word problems

//Estimate differences: word problems

//Price lists with multiplication 

applet.push(JSON.parse('{"appletID":"110","type":19,"startX":160,"startY":40,"wordLabel":"Toy","wordList":["Talking Doll","Video Game","RC Truck","Boomerang","Racketball Set"],"expressionLabel":"Price","expressionList":["%27%24%27%2BgetRandomInt%2811%2C29%29","%27%24%27%2BgetRandomInt%2811%2C29%29","%27%24%27%2BgetRandomInt%2811%2C29%29","%27%24%27%2BgetRandomInt%2811%2C29%29","%27%24%27%2BgetRandomInt%2811%2C29%29"]}'))
applet.push(JSON.parse('{"appletID":"110","type":16,"expression":"getRandomInt(0,4)"}'))
applet.push(JSON.parse('{"appletID":"110","type":16,"expression":"getRandomInt(2,12)"}'))
applet.push(JSON.parse('{"appletID":"110","type":15,"startX":340,"startY":340,"expression":"%22What%20is%20the%20cost%20of%20%22%20%2B%20hiddenNumber%5B1%5D%20%2B%20%22%20%22%20%2B%20%5B%22dolls%22%20%2C%20%22video%20games%22%20%2C%20%22trucks%22%20%2C%20%22boomergangs%22%20%2C%20%22racketball%20sets%22%5D%5BhiddenNumber%5B0%5D%5D%20%2B%20%22%3F%22","font":" 36px Arial","fill":"Black","wordWrap":true,"wordWrapWidth":"600","align":"center"}'))
applet.push(JSON.parse('{"appletID":"110","type":14,"numberEntryX":100,"numberEntryY":460,"orientation":"h","displayX":280,"displayY":380,"displayDigits":3}'))
applet.push(JSON.parse('{"appletID":"110","type":1,"startX":240,"startY":380,"text":"%24","newText":"%24","font":"","fontString":" 48px Arial","fill":"Black","wordWrap":false,"wordWrapWidth":600,"alignment":"left"}'))
applet.push(JSON.parse('{"appletID":"110","type":5,"startX":680,"startY":520}'))
tests[110]= 'numberEntryValue== Number( (tTable.value[ hiddenNumber[0] ]).replace(/[^0-9\.]+/g,""))* hiddenNumber[1]';
applet.push(JSON.parse('{"appletID":"110","type":99,"drawingBoxStartX":20,"drawingBoxStartY":21,"drawingBoxEndX":782,"drawingBoxEndY":581}'))

////*******************************************4.4.OA.3
//Rounding

//Divide larger numbers by 1-digit numbers: interpret remainders 

//Multi-step word problems

//HARD:
//Choose numbers with a particular sum, difference, product, or quotient

//Write variable expressions: word problems

//Write variable equations to represent word problems

//Find two numbers based on sum and difference

//Find two numbers based on sum, difference, product, and quotient


////*******************************************4.4.OA.4
//Prime and composite numbers 

//work out multiple select:
//Choose the multiples of a given number up to 12

//Identify factors

//expand draggable numbers to be explicit also
//Choose numbers with a particular product 

//Make a yes/no widget
//Divisibility rules 

////*******************************************4.4.OA.5

//Multiplication input/output tables 

//Input/output tables with addition, subtraction, multiplication, and division

//Geometric growth patterns

//Increasing growth patterns

//Numeric patterns: word problems

//Patterns involving (addition or subtraction) and multiplication

//Shape patterns
}