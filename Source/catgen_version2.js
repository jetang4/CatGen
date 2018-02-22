//if want to add more images for different traits, just list in the formnat "[TRAIT]_dominant"...
var images = {
    "coatColor_dominant": "../Assets/cat_black.png",
    "coatColor_recessive": "../Assets/cat_brown.png",
    "coatColor_none": "../Assets/cat_white.png",
    //"spot_dominant": "./cat_spot_dom.png",
    //"spot_recessive": "./car_spot_rec.png",
    //"spot_none": "./cat_spot.png"

    "coatColorDensity_dominant": "../Assets/cat_black.png",
    "coatColorDensity_recessive": "../Assets/cat_brown.png",
    "coatColorDensity_none": "../Assets/cat_white.png",
};

//lists possible traits
var traits=[
    'coatColor',
    'coatColorDensity',
];


//provided the trait and sex, will change the image for the cat when
//selectbox is changed
//can be applied to any textbox with the id naming format "colorSelect_"
function changeTrait(trait, sex)
{
    //gets the image associated with the select box
    var img = document.getElementById(sex+"_"+trait+"_image");

    //gets the select box and the user's selection
    var select_box = document.getElementById(sex+"_"+trait+"_select");
    var selection = select_box.value;

    //displays appropriate image depending on selection
    if(selection=="dominant" || selection=="dominant_recessive")
        img.src = images[trait+'_dominant'];
    else if(selection=="recessive")
        img.src = images[trait+'_recessive'];
    else
        img.src = images[trait+'_none'];

    return false;
}

//returns user selection for the trait and sex of the cat in a 0 or 1 format
function getSelection(trait, sex)
{
    //gets the user's selection for the provided trait and sex
    var select_box = document.getElementById(sex+"_"+trait+"_select");
    var selection = select_box.value;

    //returns alleles in number format for multiplication
    if(selection=="dominant")
        return [0,0];
    else if(selection=="dominant_recessive")
        return [0,1];
    else if(selection=="recessive")
        return [1,1];
    //user didn't select anything
    else
        return [-1,-1];
}


//fills punnet square for specified traits
//modifications will have to be made to support multiple traits
function fillPunnetSquare()
{
    var female_selections=[];
    var male_selections=[];
    var num_traits_selected=0;

    //gets possible traits
    for(var i = 0; i < traits.length; i++)
    {
        var trait = traits[i];

        //gets number format for female's alleles
        var female_selection = getSelection(trait, "female");
        female_selections.push(female_selection);
        //gets number format for male's alleles
        var male_selection = getSelection(trait, "male");
        male_selections.push(male_selection);

        //if user properly specified this trait to tests
        if(female_selection[0]!==-1 && male_selection[0]!==-1)
            num_traits_selected++;
    }

    console.log("Female selections: "+female_selections.toString()+" | Male selections: "+male_selections.toString());
    console.log("Num traits selected: "+num_traits_selected);

    //populates table based on number of traits user selects to test
    createTable(num_traits_selected);

    return;





    //displays female alleles as top row
    for(var x = 0; x < female_selection.length; x++)
        document.getElementById("female_allele"+(x+1)+"_punnettsquare").innerHTML = numberToAllele(female_selection[x]);

    //displays male alleles as left column
    for(var x = 0; x < male_selection.length; x++)
        document.getElementById("male_allele"+(x+1)+"_punnettsquare").innerHTML = numberToAllele(male_selection[x]);





    //keeps track of punnet square results for later data
    var num_dominant = 0;
    var num_dominant_recessive = 0;
    var num_recessive = 0;
    var possible_offspring = [];
    var possible_alleles = [];

    //multiplies traits for female and male
    for(var x = 0; x < male_selection.length; x++)
    {
        for(var y = 0; y < female_selection.length; y++)
        {
            //if 0, then dominant shows, if 1, then recessive shows
            var trait_show = male_selection[x] * female_selection[y];

            //converts 0 to B and 1 to b
            var left_allele = numberToAllele(male_selection[x]);
            var right_allele = numberToAllele(female_selection[y]);



            /* Displays appropriate image */

            //retrieves image from relevant square
            var current_square = document.getElementById(x+'|'+y+'_square');
            var current_img = current_square.getElementsByTagName('img')[0];

            //if dominant trait is shown
            if(trait_show==0)
            {
                //displays dominant cat in punnet square
                current_img.src = images[trait+'_dominant'];

                //add image to beginning of possible offspring for data display and iterate through array for other possibles
                if(!findArray(possible_offspring, images[trait+'_dominant']))
                    possible_offspring.unshift(images[trait+'_dominant']);

                //if one was recessive, count as dominant_recessive
                if(female_selection[x]==1 || male_selection[y]==1)
                    num_dominant_recessive++;
                else
                    num_dominant++;
            }
            //if recessive trait is shown
            else
            {
                //displays recessive cat in punnet square
                current_img.src = images[trait+'_recessive'];

                //add image to end of possible offspring for data display
                if(!findArray(possible_offspring, images[trait+'_recessive']))
                    possible_offspring.push(images[trait+'_recessive']);

                num_recessive++;
            }




            /* displays allelle text */


            var combine_allele;
            //displays dominant allele first by checking if left is dominant, or if right is recessive
            if(left_allele==left_allele.toUpperCase() || right_allele==right_allele.toLowerCase())
            {
                combine_allele = left_allele+right_allele;
                document.getElementById(x+'|'+y+'_probability').innerHTML = "Alleles: "+combine_allele;
            }
            else
            {
                combine_allele = right_allele+left_allele;
                document.getElementById(x+'|'+y+'_probability').innerHTML = "Alleles: "+combine_allele;
            }



            /* Add allele to possible alleles for stats display */
            //adds to possible alleles
            if(!findArray(possible_alleles, combine_allele ))
                possible_alleles.push( combine_allele );

        }
    }


    /* displays bottom data */

    //displays possible offspring
    document.getElementById("offspring_images").innerHTML = "";
    for(var x = 0; x < possible_offspring.length; x++)
    {
        document.getElementById("offspring_images").innerHTML += "<img src='"+possible_offspring[x]+"'>";
    }

    var total = num_dominant + num_dominant_recessive + num_recessive;

    //displays stats
    document.getElementById("data").innerHTML = "Possible offsprings " +
        "<br>GENOTYPE: "+possible_alleles +
        "<br>Black: "+( (num_dominant+num_dominant_recessive)/total*100 )+"%" +
        "<br>Brown: "+( (num_recessive)/total*100 )+"%" +
        "<br>"+( (num_dominant)/total*100 )+"% homozygous dominant" +
        "<br>"+( (num_dominant_recessive)/total*100 )+"% heterozygous" +
        "<br>"+( (num_recessive)/total*100 )+"% homozygous recessive"

}


//creates html table for population
function createTable(num_traits){

    var table = document.getElementById('punnettsquare');
    table.innerHTML = "";

    var new_table="";

    //sets first row, which is the allele text
    var columns = "";
    for(var i = 0; i < num_traits; i++)
    {
        columns += "<td class='square_title'><p id='female_allele"+(i*2+1)+"_punnettsquare' class='square_title_text'></p></td>";
        columns += "<td class='square_title'><p id='female_allele"+(i*2+2)+"_punnettsquare' class='square_title_text'></p></td>";
    }
    var allele_row = "<tr><td style='border:0px solid black; padding: 0px;''></td>"+columns+"<td style='padding:20px;''></td></tr>";

    new_table += allele_row;


    //sets second row, which is the first row of the punnett square
    for(var x = 0; x < num_traits*2; x++)
    {
        //start off columns with the male allele text
        var columns = "<td class='square_title'><p id='male_allele1_punnettsquare' class='square_title_text'></p></td>";
        for(var y = 0; y < num_traits*2; y++)
        {
            columns+= "<td id='"+x+"|"+y+"_square' class='punnettsquare_square'><img src='../Assets/cat_white.png' /><p id='"+x+"|"+y+"_probability'></p></td>"
        }
        columns += "<td style='padding:20px;''></td>"

        var row = "<tr>"+columns+"</tr>";
        new_table += row;
    }


    table.innerHTML = new_table;
}




//converts B to 0 and b to 1
function alleleToNumber(allele){
    //if dominant
    if(allele===allele.toUpperCase())
        return 0;
    else
        return 1;
}

//converts 0 to B and 1 to b
function numberToAllele(number){
    //if dominant
    if(number==0)
        return 'B';
    else if(number==1)
        return 'b';
}

//returns if to_find is found in array
function findArray(array, to_find)
{
    for(var x = 0; x < array.length; x++)
    {
        if(array[x]===to_find)
            return true;
    }

    return false;
}
