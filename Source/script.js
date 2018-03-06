function quizValidator(correctAnswer) {
    var x, text;

    // Get the value of the input field with id="numb"
    x = document.getElementById("domrec").value;

    // If x is Not a Number or less than one or greater than 10
    if (x != correctAnswer) {
        text = "Try again";
    } else {
        text = "Correct";
    }
    document.getElementById("domrec_result").innerHTML = text;
}

