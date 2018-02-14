<!DOCTYPE html>
<html lang="en">
<head>
    // <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    // <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
          integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">

<style>
    #linkBox
    {
        style: margin: 0 auto;
    }

    .individualBoxes
    {
        border:2px solid black
    }

    img
    {
        height: 100px;
        width: 250px;
    }

    th
    {
        background-color: pink;
    }
</style>
</head>

<body>

<div class="row">
    <div class="col-sm-6">

        <table id= "mendelianGenetics" class="linkBox">
            <tr>
                <th>
            Linked

            </th>
                <th>
                    [empty]

                </th>
            </tr>

            <tr>
                <td id= "topLeftBox" class="individualBoxes">
                    <img id= "thumbnail" src="../Assets/inheritanceThumbnail.jpg">
                    <p>Inheritance</p>
                </td>
                <td id= "topRightBox" class="individualBoxes">
                    <img id= "123" src="../Assets/mendelThumbnail.jpg">
                    <p>Mendelian Genetics</p>
                </td>

            </tr>
            <tr>
                <td id= "bottomLeftBox" class="individualBoxes">
                    <img src="../Assets/probabilityThumbnail.jpg">
                    <p>Probability</p>
                </td>
                <td id= "bottomrightBox" class="individualBoxes">
                    <img src="https://thestudentchannel.files.wordpress.com/2011/10/pizza_slice-60140003.jpg">
                    <p>Punnett Squares</p>
                </td>

            </tr>

        </table>
    </div>



    <div class="col-sm-6">
        <div class="row">
            <table id="linkBox" style="margin: 0 auto;">
                <tr>
                    <td style="border:0 solid green; padding: 0;"></td>
                    <td style="border:0 solid red; padding: 0px;"><b><p style="font-size:40px" id="female_allele1_punnettsquare"></p></b></td>
                    <td style="border:0 solid orange; padding: 0px;"><b><p style="font-size:40px" id="female_allele2_punnettsquare"></p></b></td>
                    <td style="padding:0px;"></td>
                </tr>
                <tr>
                    <td style="border:0px solid black; padding: 0px;"><b><p style="font-size:40px" id="male_allele2_punnettsquare"></p></b></td>
                    <td id= "header" style="border:2px solid black;">
                        <p id="1|0_probability">Navigation</p>
                    </td>
                    <td id= "header2" style="border:2px solid black; padding: 0px;">
                        <p id="1|1_probability">Unneeded</p>
                    </td>
                    <td style="padding:20px;"></td>

                </tr>
                <tr>
                    <td style="border:0px solid black; padding: 20px;"><b><p style="font-size:40px" id="male_allele1_punnettsquare"></p></b></td>
                    <td id= "topLeftBox" style="border:2px solid black; padding: 0;">
                        <img src="https://tse1-2.mm.bing.net/th?id=OIP.97EFzqXYC7YbyMeHzxM_sQHaEy&w=257&h=166&c=7&o=5&dpr=2&pid=1.7" height="100" width="200"/>
                        <p>Cookie</p>
                    </td>
                    <td id= "topRightBox" style="border:2px solid black; padding: 0px;">
                        <img src="http://inmessycursive.files.wordpress.com/2010/07/1097101_967717791.jpg" height="100" width="200"/>
                        <p>Hamburger</p>
                    </td>
                    <td style="padding:20px;">
                    </td>

                </tr>
                <tr>
                    <td style="border:0px solid black; padding: 00px;"><b><p style="font-size:40px" id="male_allele2_punnettsquare"></p></b></td>
                    <td id= "bottomLeftBox" style="border:2px solid black; padding: 0px;">
                        <img src="https://tse2-2.mm.bing.net/th?id=OIP.FW8LTAMVHRmdTHCiByFYXgHaEf&w=287&h=174&c=7&o=5&dpr=2&pid=1.7" height="100" width="200"/>
                        <p>Sandwich</p>
                    </td>
                    <td id= "bottomrightBox" style="border:2px solid black; padding: 0px;">
                        <img src="https://thestudentchannel.files.wordpress.com/2011/10/pizza_slice-60140003.jpg" height="100" width="200"/>
                        <p>Pizza</p>
                    </td>
                    <td style="padding:20px;"></td>

                </tr>

            </table>
        </div>
    </div>
</div>
</body>