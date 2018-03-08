function quizValidator(correctAnswer, inputBox) {
    var x, text;
    console.log(inputBox);
    // Get the value of the input field with id="numb"
    x = document.getElementById(inputBox).value;

    // If x is Not a Number or less than one or greater than 10
    if (x !== correctAnswer) {
        text = "Try again";
    } else {
        text = "Correct";
    }
    var inputResult = inputBox + "-result";
    document.getElementById(inputResult).innerHTML = text;
    console.log(document.getElementById(inputResult));
}

