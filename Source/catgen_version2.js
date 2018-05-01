//if want to add more images for different traits, just list in the formnat "[TRAIT]_dominant"...
var images = {
    "coatColor_dominant": "cat_dominant_black.png",
    "coatColor_recessive": "cat_recessive_brown.png",
    "coatColor_none": "cat_white.png",

    "coatColor_dominant_coatColorDensity_dominant": "cat_dominant_black.png",
    "coatColor_dominant_coatColorDensity_recessive": "cat_recessive_gray.png",
    "coatColor_recessive_coatColorDensity_dominant": "cat_dominant_brown.png",
    "coatColor_recessive_coatColorDensity_recessive": "cat_recessive_lightBrown.png"
};

//the onyly images that *SHOULD* be here are
//black= color DOM, density DOM
///gray = color DOM, density REC
//brown= color REC, density DOM
//lightBrown = color rec, density rec
var images2=[
    ["cat_dominant_black.png","cat_recessive_gray.png"],
    ["cat_dominant_brown.png","cat_recessive_lightBrown.png"],
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
    var img = document.getElementById(sex+"_image");

    //gets the select box and the user's selection
    var select_box_color = document.getElementById(sex+"_"+"coatColor" + "_select");
    var color_selection = select_box_color.value;

    var select_box_density = document.getElementById(sex+"_"+"coatColorDensity" + "_select");
    var density_selection = select_box_density.value;

    //console.log(images[trait+"_none"]);


    //THIS CODE NEEDS TO BE REFACTORED TO HANDLE BOTH ONE OR TWO TRAITS
    //CURRENTLY IT DOES NOT DISPLAY THE APPROPRIATE ICONS
    //displays appropriate image depending on selection
    // if(color_selection=="dominant" || color_selection=="dominant_recessive")
    //     img.src = images[trait+'_dominant'];
    // else if(color_selection==="recessive")
    //     img.src = images[trait+'_recessive'];
    // else
    //     img.src = images[trait+'_none'];

    //INFLEXIBLE CODE, BUT APPROPRIATELY DISPLAYS ICONS FOR COLOR-ONLY AND COLOR+DENSITY CROSSES
    if ((color_selection  === 'dominant' || color_selection  === 'dominant_recessive')  && density_selection === "")
    {
        img.src = images['coatColor_dominant'];
    }

    else if (color_selection  === 'recessive' && density_selection ===  "")
    {
        img.src = images['coatColor_recessive'];
    }

    else if ((color_selection  === 'dominant' || color_selection  === 'dominant_recessive') && (density_selection === 'dominant' || density_selection === 'dominant_recessive'))
    {
        img.src = images['coatColor_dominant_coatColorDensity_dominant'];
    }

    else if ((color_selection  === 'dominant' || color_selection  === 'dominant_recessive') && (density_selection === 'recessive'))
    {
        img.src = images['coatColor_dominant_coatColorDensity_recessive'];
    }

    else if (color_selection  === 'recessive' && density_selection === 'dominant' || density_selection === 'dominant_recessive')
    {
        img.src = images['coatColor_recessive_coatColorDensity_dominant'];
    }

    else if (color_selection  === 'recessive' && density_selection === 'recessive')
    {
        img.src = images['coatColor_recessive_coatColorDensity_recessive'];
    }

    return false;
}

//returns user selection for the trait and sex of the cat in a 0 or 1 format
function getSelection(trait, sex)
{
    //gets the user's selection for the provided trait and sex
    var select_box = document.getElementById(sex+"_"+trait+"_select");
    var selection = select_box.value;

    //returns alleles in number format for multiplication
    if(selection==="dominant")
        return [0,0];
    else if(selection==="dominant_recessive")
        return [0,1];
    else if(selection==="recessive")
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




    //keeps track of punnet square results for later data
    var num_dominant = 0;
    var num_dominant_recessive = 0;
    var num_recessive = 0;
    var possible_offspring = [];
    var possible_alleles = [];



    function box_calculation(trait_num, col, row, female_num, male_num)
    {
        var trait_show = female_selections[trait_num][female_num]*male_selections[trait_num][male_num];

        var left_allele = numberToAllele(male_selections[trait_num][male_num], trait_num);
        var right_allele = numberToAllele(female_selections[trait_num][female_num], trait_num);


        //retrieves image from relevant square
        var current_square = document.getElementById(row+'|'+col+'_square');
        var current_img = current_square.getElementsByTagName('img')[0];

        console.log("Current image at ("+row+","+col+"): "+current_img);

        var trait = traits[trait_num]

        //if dominant trait is shown
        if(trait_show==0)
        {
            //displays dominant cat in punnet square
            if(trait_num==0)
            {
                current_img.src = images[trait+'_dominant'];
                possible_offspring.push(images[trait+'_dominant']);
            }
            else
            {
                if(current_img.src.includes("dominant"))
                {
                    current_img.src = images2[0][0];
                    possible_offspring.push(images2[0][0]);
                }
                else
                {
                    current_img.src = images2[1][0];
                    possible_offspring.push(images2[1][0]);
                }
            }

            //add image to beginning of possible offspring for data display and iterate through array for other possibles
            // if(!findArray(possible_offspring, images[trait+'_dominant']))
            // possible_offspring.push(images[trait+'_dominant']);

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
            {
                current_img.src = images[trait+'_recessive'];
                possible_offspring.push(images[trait+'_recessive']);
            }
            else
            {
                if(current_img.src.includes("dominant"))
                {
                    current_img.src = images2[0][1];
                    console.log("0|1: "+images2[0][1]);
                    possible_offspring.push(images2[0][1]);
                }
                else
                {
                    current_img.src = images2[1][1];
                    possible_offspring.push(images2[1][1]);
                }
            }


            //add image to end of possible offspring for data display
            // if(!findArray(possible_offspring, images[trait+'_recessive']))
            // possible_offspring.push(images[trait+'_recessive']);

            num_recessive++;
        }




        /* displays allelle text */


        var combine_allele;
        //displays dominant allele first by checking if left is dominant, or if right is recessive
        if(left_allele===left_allele.toUpperCase() || right_allele===right_allele.toLowerCase())
        {
            combine_allele = left_allele+right_allele;
            document.getElementById(row+'|'+col+'_probability').innerHTML += combine_allele;
        }
        else
        {
            combine_allele = right_allele+left_allele;
            document.getElementById(row+'|'+col+'_probability').innerHTML += combine_allele;
        }



        /* Add allele to possible alleles for stats display */
        //adds to possible alleles
        if(!findArray(possible_alleles, combine_allele ))
            possible_alleles.push( combine_allele );
    }



    //Below code calculates whether trait will be dominant or recessive for each punnet square

    var trait_num = 0;
    var col = 0;
    var row = 0;
    //tracks which part of female allele to consider
    var female_num = 0;
    var male_num = 0;

    //user selected one trait
    if(num_traits_selected==1)
    {
        //(0,0)
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,0)
        col++;
        female_num++;
        box_calculation(trait_num, col, row, female_num, male_num);

        //(0,1)
        row++;
        col=0;
        female_num=0;
        male_num=1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,1)
        col++;
        female_num++;
        box_calculation(trait_num, col, row, female_num, male_num);

    }
    //user selected two traits
    else
    {
        //16 calculations for the first trait

        //(0,0)
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,0)
        col++;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(2,0)
        col++;
        female_num++;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(3,0)
        col++;
        box_calculation(trait_num, col, row, female_num, male_num);

        //(0,1)
        row++;
        col=0;
        female_num=0;
        male_num=0;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,1)
        col++;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(2,1)
        col++;
        female_num++;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(3,1)
        col++;
        box_calculation(trait_num, col, row, female_num, male_num);

        //(0,2)
        row++;
        col=0;
        female_num=0;
        male_num=1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,2)
        col++;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(2,2)
        col++;
        female_num++;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(3,2)
        col++;
        box_calculation(trait_num, col, row, female_num, male_num);

        //(0,3)
        row++;
        col=0;
        female_num=0;
        male_num=1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,3)
        col++;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(2,3)
        col++;
        female_num++;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(3,3)
        col++;
        box_calculation(trait_num, col, row, female_num, male_num);



        //redoes the 16 calculations for the 2nd trait

        var trait_num = 1;
        var col = 0;
        var row = 0;
        var female_num = 0;
        var male_num = 0;
        possible_offspring=[];


        //(0,0)
        female_num = 0;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,0)
        col++;
        female_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(2,0)
        col++;
        female_num = 0;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(3,0)
        col++;
        female_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);

        //(0,0)
        row++;
        col = 0;
        female_num = 0;
        male_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,0)
        col++;
        female_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(2,0)
        col++;
        female_num = 0;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(3,0)
        col++;
        female_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);

        //(0,0)
        row++;
        col = 0;
        female_num = 0;
        male_num = 0;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,0)
        col++;
        female_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(2,0)
        col++;
        female_num = 0;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(3,0)
        col++;
        female_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);

        //(0,0)
        row++;
        col = 0;
        female_num = 0;
        male_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(1,0)
        col++;
        female_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(2,0)
        col++;
        female_num = 0;
        box_calculation(trait_num, col, row, female_num, male_num);
        //(3,0)
        col++;
        female_num = 1;
        box_calculation(trait_num, col, row, female_num, male_num);
    }




    //first female's left allele
    //creates matrix where the left half is represented (1s make up the left side, and 0s on the right)
    //female left allele
    //EX: [1,1,0,0],
    //    [1,1,0,0],
    //    [1,1,0,0],
    //    [1,1,0,0]

    //female right allele (mirror version)
    //EX: [0,0,1,1],
    //    [0,0,1,1],
    //    [0,0,1,1],
    //    [0,0,1,1]

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

        //right allele is mirror version
        //female right allele (mirror version)
        //EX: [0,0,1,1],
        //    [0,0,1,1],
        //    [0,0,1,1],
        //    [0,0,1,1]
        matrix_row.push(mirror_matrix(matrix));

        female_matrices.push(matrix_row);
    }

    console.log(female_matrices);


    //EX: [1,0,1,0],
    //    [1,0,1,0],
    //    [1,0,1,0],
    //    [1,0,1,0]

    //to 

    //EX: [0,0,0,0],
    //    [1,1,1,1],
    //    [0,0,0,0],
    //    [1,1,1,1]
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


    // //matrix of represented alleles with each node being an array of female and male alleles
    // var matrix = [];
    // for(var x = 0; x < num_traits_selected*2; x++)
    // {
    //     var row=[];
    //     for(var y = 0; y < num_traits_selected*2; y++)
    //         row.push([]);
    //     matrix.push(row);
    // }

    // console.log(matrix);



    //displays allele text
    for(var trait_num = 0; trait_num < num_traits_selected; trait_num++)
    {
        for(var x = 0; x < num_traits_selected*2; x++)
        {
            var female_text = document.getElementById("female_allele"+(x+1)+"_punnettsquare");
            var male_text = document.getElementById("male_allele"+(x+1)+"_punnettsquare");

            var uppercase = allele_selections[trait_num];
            var lowercase = allele_selections[trait_num].toLowerCase();

            //runs twice because 2 allele parts of each traita
            for(var y = 0; y < 2; y++)
            {
                if(female_matrices[trait_num][y][0][x]==1)
                {
                    //if dominant display
                    if(female_selections[trait_num][y]==0)
                        female_text.innerHTML += uppercase
                    else
                        female_text.innerHTML += lowercase
                }
            }

            //runs twice because 2 allele parts of each traita
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


    /* displays bottom data */

    //displays possible offspring

    //wipes out previous results
    document.getElementById("offspring_images").innerHTML = "";

    //counts the number of times we see each image
    var image_array = {};
    for(var x = 0; x < possible_offspring.length; x++)
    {
        if(possible_offspring[x]!=undefined)
        {
            if(possible_offspring[x] in image_array)
                image_array[possible_offspring[x]]++;
            else
                image_array[possible_offspring[x]] = 1;
        }
    }

    console.log(image_array);

    var keys = Object.keys(image_array)
    for(var x = 0; x < keys.length; x++)
    {
        document.getElementById("offspring_images").innerHTML += "<span>"+image_array[keys[x]]+"</span><img src='"+keys[x]+"'>";
    }

    var total = num_dominant + num_dominant_recessive + num_recessive;

    //displays stats
    document.getElementById("data").innerHTML = "Possible offsprings " +
        "<br>GENOTYPE: "+possible_alleles;

    //only display stats if user selected 1 trait to calculate since it doesn't work with 2
    if(num_traits_selected==1)
    {
        document.getElementById("data").innerHTML +=
            "<br>Black: "+( (num_dominant+num_dominant_recessive)/total*100 )+"%" +
            "<br>Brown: "+( (num_recessive)/total*100 )+"%" +
            "<br>"+( (num_dominant)/total*100 )+"% homozygous dominant" +
            "<br>"+( (num_dominant_recessive)/total*100 )+"% heterozygous" +
            "<br>"+( (num_recessive)/total*100 )+"% homozygous recessive";
    }


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
