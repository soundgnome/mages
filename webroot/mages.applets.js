//this file loads the applet definitions for MAGES.
function defineApplets() {

    console.log("retrieving applet data");
    $.getJSON("applets/applets.json", function(data) {

        console.log("loading applets");
        var section_count = data.applets.length;
        for (var i=0; i<section_count; i++) {
            var problem_count = data.applets[i].problems.length;
            for (var j=0; j<problem_count; j++) {
                applet.push(data.applets[i].problems[j]);
            }
        }

        console.log("loading tests");
        var test_count = data.tests.length;
        for (var i=0; i<test_count; i++) {
            tests[data.tests[i].id] = data.tests[i].test;
        }
        console.log("applets ready");
    });
}

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
