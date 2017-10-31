var cat=
    {
        femalegenotype: "",
        malegenotype: ""
    };
// when selecting cat, colors of cat will change.
function changeCatColor()
{
    var img = document.getElementById("femaleselectimage");
    img.src = this.value;
    return false;
}
document.getElementById("cat1").onchange = changeCatColor;
function changeCatColor2()
{
    var img = document.getElementById("maleselectimage");
    img.src = this.value;
    return false;
}
document.getElementById("cat2").onchange = changeCatColor2;
function assignGenotype()
{
    if (document.getElementById("brownF").selected)
    {
        cat.femalegenotype="homozygousrecessive";
    }
    else if (document.getElementById("heteroblackF").selected)
    {
        cat.femalegenotype="heterozygous";
    }
    else if (document.getElementById("homoblackF").selected)
    {
        cat.femalegenotype="homozygousdominant";
    }
    if (document.getElementById("brownM").selected)
    {
        cat.malegenotype="homozygousrecessive";
    }
    else if (document.getElementById("heteroblackM").selected)
    {
        cat.malegenotype="heterozygous";
    }
    else if (document.getElementById("homoblackM").selected)
    {
        cat.malegenotype="homozygousdominant";
    }
}
function fillPunnettSquare()
{
    //both dominant
    if (cat.malegenotype === "homozygousdominant" && cat.femalegenotype === "homozygousdominant")
    {
        document.getElementById("topleft").src= "./cat_black.png";
        document.getElementById("topright").src= "./cat_black.png";
        document.getElementById("bottomleft").src= "./cat_black.png";
        document.getElementById("bottomright").src= "./cat_black.png";
    }
    //both recessive
    else if (cat.malegenotype === "homozygousrecessive" && cat.femalegenotype ==="homozygousrecessive")
    {
        document.getElementById("topleft").src= "./cat_brown.png";
        document.getElementById("topright").src= "./cat_brown.png";
        document.getElementById("bottomleft").src= "./cat_brown.png";
        document.getElementById("bottomright").src= "./cat_brown.png";
    }
    //both heterozygous
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("topleft").src= "./cat_black.png";
        document.getElementById("topright").src= "./cat_black.png";
        document.getElementById("bottomleft").src= "./cat_black.png";
        document.getElementById("bottomright").src= "./cat_brown.png";
    }
    //one dominant, one recessive (and vice versa pair)
    else if (cat.malegenotype == "homozygousdominant" && cat.femalegenotype == "homozygousrecessive")
    {
        document.getElementById("topleft").src= "./cat_black.png";
        document.getElementById("topright").src= "./cat_black.png";
        document.getElementById("bottomleft").src= "./cat_black.png";
        document.getElementById("bottomright").src= "./cat_black.png";
    }
    //one dominant, one het (and vice versa pair)
    else if (cat.malegenotype == "homozygousdominant" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("topleft").src= "./cat_black.png";
        document.getElementById("topright").src= "./cat_black.png";
        document.getElementById("bottomleft").src= "./cat_black.png";
        document.getElementById("bottomright").src= "./cat_black.png";
    }
    //one recessive, one het (and vice versa pair)
    else if (cat.malegenotype == "homozygousrecessive" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("topleft").src= "./cat_black.png";
        document.getElementById("topright").src= "./cat_black.png";
        document.getElementById("bottomleft").src= "./cat_brown.png";
        document.getElementById("bottomright").src= "./cat_brown.png";
    }else if (cat.malegenotype == "homozygousrecessive" && cat.femalegenotype == "homozygousdominant")
    {
        document.getElementById("topleft").src= "./cat_black.png";
        document.getElementById("topright").src= "./cat_black.png";
        document.getElementById("bottomleft").src= "./cat_black.png";
        document.getElementById("bottomright").src= "./cat_black.png";
    }
    //one dominant, one het (and vice versa pair)
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "homozygousdominant")
    {
        document.getElementById("topleft").src= "./cat_black.png";
        document.getElementById("topright").src= "./cat_black.png";
        document.getElementById("bottomleft").src= "./cat_black.png";
        document.getElementById("bottomright").src= "./cat_black.png";
    }
    //one recessive, one het (and vice versa pair)
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "homozygousrecessive")
    {
        document.getElementById("topleft").src= "./cat_black.png";
        document.getElementById("topright").src= "./cat_black.png";
        document.getElementById("bottomleft").src= "./cat_brown.png";
        document.getElementById("bottomright").src= "./cat_brown.png";
    }
}
//prints a summary at very bottom to show possible outcomes from parents
function showPossibleData()
{
    if (cat.malegenotype === "homozygousdominant" && cat.femalegenotype === "homozygousdominant")
    {
        document.getElementById("offspring").src= "./cat_black.png";
        document.getElementById("data").innerHTML = "Possible offsprings " +
            "<br>GENOTYPE: BB" +
            "<br>Black: 100%" +
            "<br>Brown: 0%" +
            "<br>100% homozygous dominant" +
            "<br>0% heterozygous" +
            "<br>0% homozygous recessive"
    }
    //both recessive
    else if (cat.malegenotype === "homozygousrecessive" && cat.femalegenotype ==="homozygousrecessive")
    {
        document.getElementById("offspring").src= "./cat_brown.png";
        document.getElementById("data").innerHTML = "Possible offsprings " +
            "<br>GENOTYPE: bb" +
            "<br>Black: 0%" +
            "<br>Brown: 100%" +
            "<br>0% homozygous dominant" +
            "<br>0% heterozygous" +
            "<br>100% homozygous recessive"
    }
    //both heterozygous
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("offspring").src= "./cat_black.png";
        document.getElementById("offspringtype2").src= "./cat_brown.png";
        document.getElementById("data").innerHTML = "Possible offsprings " +
            "<br>GENOTYPE: BB, Bb, bb" +
            "<br>Black: 75%" +
            "<br>Brown: 25%" +
            "<br>50% homozygous dominant" +
            "<br>25% heterozygous" +
            "<br>25% homozygous recessive"
    }
    //one dominant, one recessive (and vice versa pair)
    else if (cat.malegenotype == "homozygousdominant" && cat.femalegenotype == "homozygousrecessive")
    {
        document.getElementById("offspring").src= "./cat_black.png";
        document.getElementById("data").innerHTML = "Possible offsprings " +
            "<br>GENOTYPE: Bb" +
            "<br>Black: 100%" +
            "<br>Brown: 0%" +
            "<br>0% homozygous dominant" +
            "<br>100% heterozygous" +
            "<br>0% homozygous recessive"
    }
    //one dominant, one het (and vice versa pair)
    else if (cat.malegenotype == "homozygousdominant" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("offspring").src= "./cat_black.png";
        document.getElementById("data").innerHTML = "Possible offsprings " +
            "<br>GENOTYPE: BB, Bb" +
            "<br>Black: 100%" +
            "<br>Brown: 0%" +
            "<br>50% homozygous dominant" +
            "<br>50% heterozygous" +
            "<br>0% homozygous recessive"
    }
    //one recessive, one het (and vice versa pair)
    else if (cat.malegenotype == "homozygousrecessive" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("offspring").src= "./cat_black.png";
        document.getElementById("offspringtype2").src= "./cat_brown.png";
        document.getElementById("data").innerHTML = "Possible offsprings " +
            "<br>GENOTYPE: Bb, bb" +
            "<br>Black: 50%" +
            "<br>Brown: 50%" +
            "<br>0% homozygous dominant" +
            "<br>50% heterozygous" +
            "<br>50% homozygous recessive"
    }
    else if (cat.malegenotype == "homozygousrecessive" && cat.femalegenotype == "homozygousdominant")
    {
        document.getElementById("offspring").src= "./cat_black.png";
        document.getElementById("data").innerHTML = "Possible offsprings" +
            "<br>GENOTYPE: Bb" +
            "<br>Black: 100%" +
            "<br>Brown: 0%" +
            "<br>0% homozygous dominant" +
            "<br>100% heterozygous" +
            "<br>0% homozygous recessive"
    }
    //one dominant, one het (and vice versa pair)
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "homozygousdominant")
    {
        document.getElementById("offspring").src= "./cat_black.png";
        document.getElementById("data").innerHTML = "Possible offsprings" +
            "<br>GENOTYPE: BB, Bb" +
            "<br>Black: 100%" +
            "<br>Brown: 0%" +
            "<br>50% homozygous dominant" +
            "<br>50% heterozygous" +
            "<br>0% homozygous recessive"
    }
    //one recessive, one het (and vice versa pair)
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "homozygousrecessive")
    {
        document.getElementById("offspring").src= "./cat_black.png";
        document.getElementById("offspringtype2").src= "./cat_brown.png";
        document.getElementById("data").innerHTML = "Possible offsprings " +
            "<br>GENOTYPE: Bb, bb" +
            "<br>Black: 50%" +
            "<br>Brown: 50%" +
            "<br>0% homozygous dominant" +
            "<br>50% heterozygous" +
            "<br>50% homozygous recessive"
    }
}
//will print parent female and male genotypes
function fillFemaleGenotypeAllele1()
{
    if(cat.femalegenotype == "homozygousdominant")
    {
        document.getElementById("printfgenotype1").innerHTML = "B";
    }
    if(cat.femalegenotype == "homozygousrecessive")
    {
        document.getElementById("printfgenotype1").innerHTML = "b";
    }
    if(cat.femalegenotype == "heterozygous")
    {
        document.getElementById("printfgenotype1").innerHTML = "B";
    }
}
function fillMaleGenotypeAllele1()
{
    if(cat.malegenotype == "homozygousdominant")
    {
        document.getElementById("printmgenotype1").innerHTML = "B";
    }
    if(cat.malegenotype == "homozygousrecessive")
    {
        document.getElementById("printmgenotype1").innerHTML = "b";
    }
    if(cat.malegenotype == "heterozygous")
    {
        document.getElementById("printmgenotype1").innerHTML = "B";
    }
}
function fillFemaleGenotypeAllele2()
{
    if(cat.femalegenotype == "homozygousdominant")
    {
        document.getElementById("printfgenotype2").innerHTML = "B";
    }
    if(cat.femalegenotype == "homozygousrecessive")
    {
        document.getElementById("printfgenotype2").innerHTML = "b";
    }
    if(cat.femalegenotype == "heterozygous")
    {
        document.getElementById("printfgenotype2").innerHTML = "b";
    }
}
function fillMaleGenotypeAllele2()
{
    if(cat.malegenotype == "homozygousdominant")
    {
        document.getElementById("printmgenotype2").innerHTML = "B";
    }
    if(cat.malegenotype == "homozygousrecessive")
    {
        document.getElementById("printmgenotype2").innerHTML = "b";
    }
    if(cat.malegenotype == "heterozygous")
    {
        document.getElementById("printmgenotype2").innerHTML = "b";
    }
}
//will print out all individual alleles
function getGenotype()
{
    //both dominant
    if (cat.malegenotype === "homozygousdominant" && cat.femalegenotype === "homozygousdominant")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: BB";
        document.getElementById("toprightallele").innerHTML = "Alleles: BB";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: BB";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: BB";
    }
    //both recessive
    else if (cat.malegenotype === "homozygousrecessive" && cat.femalegenotype ==="homozygousrecessive")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: bb";
        document.getElementById("toprightallele").innerHTML = "Alleles: bb";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: bb";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: bb";
    }
    //both heterozygous
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: BB";
        document.getElementById("toprightallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: bb";
    }
    //one dominant, one recessive (and vice versa pair)
    else if (cat.malegenotype == "homozygousdominant" && cat.femalegenotype == "homozygousrecessive")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("toprightallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: Bb";
    }
    //one dominant, one het (and vice versa pair)
    else if (cat.malegenotype == "homozygousdominant" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: BB";
        document.getElementById("toprightallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: BB";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: Bb";
    }
    //one recessive, one het (and vice versa pair)
    else if (cat.malegenotype == "homozygousrecessive" && cat.femalegenotype == "heterozygous")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("toprightallele").innerHTML = "Alleles: bb";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: bb";
    }else if (cat.malegenotype == "homozygousrecessive" && cat.femalegenotype == "homozygousdominant")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("toprightallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: Bb";
    }
    //one dominant, one het (and vice versa pair)
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "homozygousdominant")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: BB";
        document.getElementById("toprightallele").innerHTML = "Alleles: BB";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: Bb";
    }
    //one recessive, one het (and vice versa pair)
    else if (cat.malegenotype == "heterozygous" && cat.femalegenotype == "homozygousrecessive")
    {
        document.getElementById("topleftallele").innerHTML = "Alleles: Bb";
        document.getElementById("toprightallele").innerHTML = "Alleles: Bb";
        document.getElementById("bottomleftallele").innerHTML = "Alleles: bb";
        document.getElementById("bottomrightallele").innerHTML = "Alleles: bb";
    }
}