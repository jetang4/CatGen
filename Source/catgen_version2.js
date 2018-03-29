//if want to add more images for different traits, just list in the formnat "[TRAIT]_dominant"...
var images = {
    "coatColor_dominant": "coatColor_dominant.png",
    "coatColor_recessive": "coatColor_recessive.png",
    "coatColor_none": "cat_white.png",

    "coatColorDensity_dominant": "cat_black_dominantSpotted.png",
    "coatColorDensity_recessive": "cat_black_heteroSpotted.png",
    "coatColorDensity_none": "cat_white.png",
};

var images2=[
    ["../Assets/cat_black_dominantSpotted.png","cat_black_heteroSpotted.png"],
    ["../Assets/cat_brown_dominantSpotted.png","cat_brown_heteroSpotted.png"],
]

//lists possible traits
var traits=[
    'coatColor',
    'coatColorDensity',
];

//allele symbol text
var allele_symbols=[
    'B',
    'D',
]


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
    //stores allele symbol for selected traits
    var allele_selections=[];
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
        {
            num_traits_selected++;
            allele_selections.push(allele_symbols[i]);
        }
    }

    console.log("Female selections: "+female_selections.toString()+" | Male selections: "+male_selections.toString());
    console.log("Num traits selected: "+num_traits_selected);

    //populates table based on number of traits user selects to test
    createTable(num_traits_selected);



    //first female's left allele
    //creates matrix where the left half is represented (1s make up the left side, and 0s on the right)
    //EX: [1,1,0,0],
    //    [1,1,0,0],
    //    [1,1,0,0],
    //    [1,1,0,0]

    var female_matrices=[];
    for(var trait_num = 1; trait_num <= num_traits_selected; trait_num++)
    {
        var matrix_row = [];

        //left allele
        var matrix = [];
        for(var x = 0; x < num_traits_selected*2; x++)
        {
            //creates array of size num_traits_selected*2 filled with 0s
            var array=[];
            for(var y = 0; y < num_traits_selected*2; y++)
                array.push(0);

            for(var y = 0; y < num_traits_selected; y++)
                array[y*trait_num] = 1;

            matrix.push(array);
        }
        matrix_row.push(matrix);

        //right allele
        matrix_row.push(mirror_matrix(matrix));

        female_matrices.push(matrix_row);
    }

    console.log(female_matrices);


    var male_matrices=[];
    for(var trait_num = 0; trait_num < num_traits_selected; trait_num++)
    {
        var matrix_row = [];
        //left allele
        matrix_row.push(rotate_matrix(female_matrices[trait_num][0]));
        //right allele
        matrix_row.push(rotate_matrix(female_matrices[trait_num][1]));

        male_matrices.push(matrix_row);
    }

    console.log(male_matrices);


    //matrix of represented alleles with each node being an array of female and male alleles
    var matrix = [];
    for(var x = 0; x < num_traits_selected*2; x++)
    {
        var row=[];
        for(var y = 0; y < num_traits_selected*2; y++)
            row.push([]);
        matrix.push(row);
    }

    console.log(matrix);



    //displays allele text
    for(var trait_num = 0; trait_num < num_traits_selected; trait_num++)
    {
        for(var x = 0; x < num_traits_selected*2; x++)
        {
            var female_text = document.getElementById("female_allele"+(x+1)+"_punnettsquare");
            var male_text = document.getElementById("male_allele"+(x+1)+"_punnettsquare");

            var uppercase = allele_selections[trait_num];
            var lowercase = allele_selections[trait_num].toLowerCase();

            for(var y = 0; y < 2; y++)
            {
                if(female_matrices[trait_num][y][0][x]==1)
                {
                    if(female_selections[trait_num][y]==0)
                        female_text.innerHTML += uppercase
                    else
                        female_text.innerHTML += lowercase
                }
            }

            for(var y = 0; y < 2; y++)
            {
                if(male_matrices[trait_num][y][x][0]==1)
                {
                    if(male_selections[trait_num][y]==0)
                        male_text.innerHTML += uppercase
                    else
                        male_text.innerHTML += lowercase
                }
            }

        }
    }







    //keeps track of punnet square results for later data
    var num_dominant = 0;
    var num_dominant_recessive = 0;
    var num_recessive = 0;
    var possible_offspring = [];
    var possible_alleles = [];

    // var female_rows = [];
    // for(var x = 0; x < num_traits_selected; x++)
    // {
    //     //creates array of size num_traits_selected*2 filled with 0s
    //     var row=[];
    //     for(var y = 0; y < num_traits_selected*2; y++)
    //         row.push(1);

    //     //modified depending on dominant or recessive
    //     for(var y = 0; y < num_traits_selected; y++)
    //     {
    //         if(female_selections[x][0])
    //         row[y*trait_num] = ;
    //     }

    // }


    // for(var trait = 0; trait < num_traits_selected; trait++)
    // {
    //     var trait_shows = [];
    //     for(var x = 0; x < male_selections[trait].length; x++)
    //     {
    //         for(var y = 0; y < female_selections[trait].length; y++)
    //         {
    //             //if 0, then dominant shows, if 1, then recessive shows
    //             var trait_show = male_selections[trait][x] * female_selections[trait][y];

    //         }
    //     }
    // }





    // var trait = traits[0]

    // var trait_show = male_selections[0][0]*female_selections[0][0];
    // if(trait_show==0)
    // {
    //     //displays dominant cat in punnet square
    //     current_img.src = images[trait+'_dominant'];

    //     //add image to beginning of possible offspring for data display and iterate through array for other possibles
    //     if(!findArray(possible_offspring, images[trait+'_dominant']))
    //         possible_offspring.unshift(images[trait+'_dominant']);

    //     //if one was recessive, count as dominant_recessive
    //     if(female_selection[x]==1 || male_selection[y]==1)
    //         num_dominant_recessive++;
    //     else
    //         num_dominant++;
    // }
    // //if recessive trait is shown
    // else
    // {
    //     //displays recessive cat in punnet square
    //     current_img.src = images[trait+'_recessive'];

    //     //add image to end of possible offspring for data display
    //     if(!findArray(possible_offspring, images[trait+'_recessive']))
    //         possible_offspring.push(images[trait+'_recessive']);

    //     num_recessive++;
    // }



    for(var trait_num = 0; trait_num < num_traits_selected; trait_num++)
    {
        for(var x = 0; x < num_traits_selected*2; x++)
        {
            for(var y = 0; y < num_traits_selected*2; y++)
            {

                // var female_text = document.getElementById("female_allele"+(x+1)+"_punnettsquare");
                // var male_text = document.getElementById("male_allele"+(x+1)+"_punnettsquare");

                // var uppercase = allele_selections[trait_num];
                // var lowercase = allele_selections[trait_num].toLowerCase();

                if(trait_num==0)
                {
                    var x_index = x%num_traits_selected;
                    var y_index = y%num_traits_selected;

                    if(x<num_traits_selected)
                        x_index=0;
                    else
                        x_index=1;


                    if(y<num_traits_selected)
                        y_index=0;
                    else
                        y_index=1;
                }
                else
                {
                    var x_index = x%num_traits_selected;
                    var y_index = y%num_traits_selected;
                }


                //if 0, then dominant shows, if 1, then recessive shows
                var trait_show = male_selections[trait_num][x_index] * female_selections[trait_num][y_index];

                //converts 0 to B and 1 to b
                if(trait_num==0)
                {

                    var left_allele = numberToAllele(male_selections[trait_num][x_index], trait_num);
                    var right_allele = numberToAllele(female_selections[trait_num][y_index], trait_num);
                }
                else
                {
                    var left_allele = numberToAllele(male_selections[trait_num][x_index], trait_num);
                    var right_allele = numberToAllele(female_selections[trait_num][y_index], trait_num);
                }


                //retrieves image from relevant square
                var current_square = document.getElementById(x+'|'+y+'_square');
                var current_img = current_square.getElementsByTagName('img')[0];

                console.log("Current image at ("+x+","+y+"): "+current_img);

                var trait = traits[trait_num]

                //if dominant trait is shown
                if(trait_show==0)
                {
                    //displays dominant cat in punnet square
                    if(trait_num==0)
                        current_img.src = images[trait+'_dominant'];
                    else
                    {
                        if(current_img.src.includes("dominant"))
                            current_img.src = images2[0][0];
                        else
                            current_img.src = images2[1][1];
                    }

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
                    if(trait_num==0)
                        current_img.src = images[trait+'_recessive'];
                    else
                    {
                        if(current_img.src.includes("dominant"))
                            current_img.src = images2[0][0];
                        else
                            current_img.src = images2[1][1];
                    }


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
                    document.getElementById(x+'|'+y+'_probability').innerHTML += combine_allele;
                }
                else
                {
                    combine_allele = right_allele+left_allele;
                    document.getElementById(x+'|'+y+'_probability').innerHTML += combine_allele;
                }



                /* Add allele to possible alleles for stats display */
                //adds to possible alleles
                if(!findArray(possible_alleles, combine_allele ))
                    possible_alleles.push( combine_allele );
            }
        }
    }


    // //multiplies traits for female and male
    // for(var x = 0; x < male_selections[0].length; x++)
    // {
    //     for(var y = 0; y < female_selections[0].length; y++)
    //     {
    //         for(var trait = 0; trait < num_traits_selected; trait++)
    //         {
    //             console.log(male_selections[trait])
    //             console.log(female_selections[trait])
    //             //if 0, then dominant shows, if 1, then recessive shows
    //             var trait_show = male_selections[trait][x] * female_selections[trait][y];

    //             //converts 0 to B and 1 to b
    //             var left_allele = numberToAllele(male_selections[trait][x], trait);
    //             var right_allele = numberToAllele(female_selections[trait][y], trait);

    //             console.log(left_allele+right_allele);
    //         }

    //         // return;



    //         // //if 0, then dominant shows, if 1, then recessive shows
    //         // var trait_show = male_selection[x] * female_selection[y];

    //         // //converts 0 to B and 1 to b
    //         // var left_allele = numberToAllele(male_selection[x]);
    //         // var right_allele = numberToAllele(female_selection[y]);



    //         /* Displays appropriate image */

    //         //retrieves image from relevant square
    //         var current_square = document.getElementById(x+'|'+y+'_square');
    //         var current_img = current_square.getElementsByTagName('img')[0];

    //         var trait = traits[0]

    //         //if dominant trait is shown
    //         if(trait_show==0)
    //         {
    //             //displays dominant cat in punnet square
    //             current_img.src = images[trait+'_dominant'];

    //             //add image to beginning of possible offspring for data display and iterate through array for other possibles
    //             if(!findArray(possible_offspring, images[trait+'_dominant']))
    //                 possible_offspring.unshift(images[trait+'_dominant']);

    //             //if one was recessive, count as dominant_recessive
    //             if(female_selection[x]==1 || male_selection[y]==1)
    //                 num_dominant_recessive++;
    //             else
    //                 num_dominant++;
    //         }
    //         //if recessive trait is shown
    //         else
    //         {
    //             //displays recessive cat in punnet square
    //             current_img.src = images[trait+'_recessive'];

    //             //add image to end of possible offspring for data display
    //             if(!findArray(possible_offspring, images[trait+'_recessive']))
    //                 possible_offspring.push(images[trait+'_recessive']);

    //             num_recessive++;
    //         }




    //         /* displays allelle text */


    //         var combine_allele;
    //         //displays dominant allele first by checking if left is dominant, or if right is recessive
    //         if(left_allele==left_allele.toUpperCase() || right_allele==right_allele.toLowerCase())
    //         {
    //             combine_allele = left_allele+right_allele;
    //             document.getElementById(x+'|'+y+'_probability').innerHTML = "Alleles: "+combine_allele;
    //         }
    //         else
    //         {
    //             combine_allele = right_allele+left_allele;
    //             document.getElementById(x+'|'+y+'_probability').innerHTML = "Alleles: "+combine_allele;
    //         }



    //         /* Add allele to possible alleles for stats display */
    //         //adds to possible alleles
    //         if(!findArray(possible_alleles, combine_allele ))
    //             possible_alleles.push( combine_allele );

    //     }
    // }


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
        var columns = "<td class='square_title'><p id='male_allele"+(x+1)+"_punnettsquare' class='square_title_text'></p></td>";
        for(var y = 0; y < num_traits*2; y++)
        {
            columns+= "<td id='"+x+"|"+y+"_square' class='punnettsquare_square'><img src='cat_white.png' /><p id='"+x+"|"+y+"_probability'>Alleles: </p></td>"
        }
        columns += "<td style='padding:20px;''></td>"

        var row = "<tr>"+columns+"</tr>";
        new_table += row;
    }


    table.innerHTML = new_table;
}


//returns a mirror version of matrix
function mirror_matrix(matrix)
{
    var new_matrix = [];

    for(var x = matrix.length-1; x > -1; x--)
    {
        var new_row=[]
        for(var y = matrix[x].length-1; y > -1; y--)
            new_row.push(matrix[x][y]);
        new_matrix.push(new_row);
    }

    return new_matrix;
}

//rotates mirror
function rotate_matrix(matrix)
{
    var new_matrix = [];

    for(var x = 0; x < matrix.length; x++)
    {
        var new_row=[]
        for(var y = matrix[x].length-1; y > -1; y--)
            new_row.push(matrix[y][x]);
        new_matrix.push(new_row);
    }

    return new_matrix;
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
function numberToAllele(number, trait_num){
    //if dominant
    if(number==0)
        return allele_symbols[trait_num];
    else if(number==1)
        return allele_symbols[trait_num].toLowerCase();
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
