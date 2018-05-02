
//the indices are going to be the words, and the values are going to be the definitions
var text_definitions= {

    "autosomal dominant": " A pattern of inheritance in which an affected individual has one copy of a mutant gene and one normal gene on a pair of autosomal chromosomes. (In contrast, autosomal recessive diseases require that the individual have two copies of the mutant gene.)",
    "autosomal recessive": "Autosomal recessive is one of several ways that a trait, disorder, or disease can be passed down through families. An autosomal recessive disorder means two copies of an abnormal gene must be present in order for the disease or trait to develop.",
    "X-linked dominant inheritance": "X-linked dominant inheritance, sometimes referred to as X-linked dominance, is a mode of genetic inheritance by which a dominant gene is carried on the X chromosome. As an inheritance pattern, it is less common than the X-linked recessive type. ",
    "X-linked recessive inheritance": "X-linked inheritance means that the gene causing the trait or the disorder is located on the X chromosome. Females have two X chromosomes, while males have one X and one Y chromosome. Carrier females who have only one copy of the mutation do not usually express the phenotype, although differences in X chromosome inactivation can lead to varying degrees of clinical expression in carrier females since some cells will express one X allele and some will express the other.",
    "codominant": "Relating to two alleles of a gene pair in a heterozygote that are both fully expressed. When alleles for both white and red are present in a carnation, for example, the result is a pink carnation since both alleles are codominant.",
    "gene duplication": "Gene duplication (or chromosomal duplication or gene amplification) is a major mechanism through which new genetic material is generated during molecular evolution. It can be defined as any duplication of a region of DNA that contains a gene.",
    "mutations": "the changing of the structure of a gene, resulting in a variant form that may be transmitted to subsequent generations, caused by the alteration of single base units in DNA, or the deletion, insertion, or rearrangement of larger sections of genes or chromosomes.",
    "chromosomal crossing over": "Crossing over occurs between prophase 1 and metaphase 1 and is the process where homologous chromosomes pair up with each other and exchange different segments of their genetic material to form recombinant chromosomes. It can also happen during mitotic division, which may result in loss of heterozygosity.",
    "alleles": "one of two or more alternative forms of a gene that arise by mutation and are found at the same place on a chromosome.",
    "genotype": "the genetic constitution of an individual organism.",
    "phenotype": "the set of observable characteristics of an individual resulting from the interaction of its genotype with the environment.",
    "offspring": "an animal's young.",
    "heterozygous": " An allele can be dominant or recessive. Individuals, meanwhile, can be homozygous or heterozygous: individuals who are homozygous for a certain gene carry two copies of the same allele. individuals who are heterozygous for a certain gene carry two different alleles.",
    "dominant": "Dominant genes are a result of dominant alleles in chromosomes. When an allele is dominant it is expressed in the phenotype over a recessive allele. ",
    "genetic variation": "Genetic variation means that biological systems – individuals and populations – are different over space. Each gene pool includes various alleles of genes. ... Genetic variation is brought about, fundamentally, by mutation, which is a permanent change in the chemical structure of chromosomes.",
    "recessive": "A recessive gene is a gene that can be masked by a dominant gene. In order to have a trait that is expressed by a recessive gene, such as blue eyes, you must get the gene for blue eyes from both of your parents.",
    "heterozygous": "An allele can be dominant or recessive. Individuals, meanwhile, can be homozygous or heterozygous: individuals who are homozygous for a certain gene carry two copies of the same allele. individuals who are heterozygous for a certain gene carry two different alleles.",
    "recombination": "the rearrangement of genetic material, especially by crossing over in chromosomes or by the artificial joining of segments of DNA from different organisms.",
}
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