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

function trueFalseValidator(formName)
{
    var text;
    var trueValue = formName + '-true';

    if(document.getElementById(trueValue).checked === true)
    {
        text = "Sorry, the answer is False. Think about why.";
    }
    else
    {
        text = "Correct!"
    }
    var inputResult = formName + '-result';
    document.getElementById(inputResult).innerHTML = text;
}

function multipleChoiceValidator(formName)
{
    var text;
    var correctValue = formName + '-correct';

    if(document.getElementById(correctValue).checked === true)
    {
        text = "Correct!";
    }
    else
    {
        text = "Please review the above activity and try again!"
    }
    var inputResult = formName + '-result';
    document.getElementById(inputResult).innerHTML = text;
}