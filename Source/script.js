function validateForm() {
    var x = document.forms["myForm"]["dominantAllele"].value;
    if (x == "DD") {
        alert("Name must be filled out");
        return false;
    }
}

function quizValidator() {
    var x, text;

    // Get the value of the input field with id="numb"
    x = document.getElementById("domrec").value;

    // If x is Not a Number or less than one or greater than 10
    if (x != "ff") {
        text = "Try again";
    } else {
        text = "Correct";
    }
    document.getElementById("result").innerHTML = text;
}

//JAVASCRIPT CODE TO HIDE/DISPLAY PAGES WHEN NAVIGATION BAR IS CLICKED
function show(elementID) {
    var ele = document.getElementById(elementID);
    if (!ele) {
        alert("no such element");
        return;
    }
    var pages = document.getElementsByClassName('page');
    for(var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    ele.style.display = 'block';
}