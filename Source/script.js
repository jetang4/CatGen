
//the indices are going to be the words, and the values are going to be the definitions
var text_definitions={

    "allele": "the definition",
    "offspring": "its this is a really long definition to test the text boundaries and whatnot but it shouldn't make a difference sinc ehte width of the box is static, and there's apdding so there shouldn't be overflow or whatever",
};


function quizValidator(correctAnswer, inputBox) {
    var x, text;
    console.log(inputBox);
    // Get the value of the input field with id="numb"
    x = document.getElementById(inputBox).value;
    console.log(correctAnswer, x);
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

function popupBox(word)
{
    //shows popup box
    $('#popup_box_container').show();

    //sets so that the popup dissappeared if the user clicks
    $('#popup_box_background').attr("onClick", "$('#popup_box_container').hide();");

    //displays the word
    $('#popup_box_title').text(word);

    //gets the definition associated with the word
    var definition = text_definitions[word];

    //displays the definition
    $('#popup_box_content').text(definition);
}