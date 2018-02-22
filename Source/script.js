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

