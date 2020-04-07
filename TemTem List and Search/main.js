var $mainContainer = $("#mainContent"); // jquery variable
$mainContainer.html("");                // set html to nothing

MakeTemCall();                          // make a TemCall to API

var temNames = [];                      // array to store Temtem names
var temTypes = [];                      // array to store Temtem types

// get *ALL* temtem with *ALL* information
function MakeTemCall()
{
    $.ajax(
    {
        type: 'GET',
        url: 'https://temtem-api.mael.tech/api/temtems',
        dataType: 'json',

        success: function(result)
        {
            TemCallResult(result);
        }
    });
}

// function receiving data from TemCall (use to process result)
function TemCallResult(input)
{
    var images = [];

    input.map((item, index ) => 
    {
        let img = '<div id="'+item.name.toUpperCase()+'" class="imgCard">' + CreateImg(item.wikiPortraitUrlLarge, index, item.name, item.types) + '</div>';
        let nme = CreateName(index, item.name);
        let tpe = CreateType(index, item.types);
        images.push(img);
        temNames.push(nme);
        temTypes.push(tpe);
    })

    $mainContainer.html(images);
    
    // exhange comma for | in types and color types
    
    for (i = 0; i < temNames.length; i++) {
        var temtemtype = document.getElementById("tem"+i+"types")
        temtemtype.innerHTML = temtemtype.innerHTML.replace(/,/g, '  ');
        
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Neutral", "<img src=\"typeimg/neutral.png\" class=\"image\"><span class='neutral'>Neutral</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Fire", "<img src=\"typeimg/fire.png\" class=\"image\"><span class='fire'>Fire</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Water", "<img src=\"typeimg/water.png\" class=\"image\"><span class='water'>Water</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Nature", "<img src=\"typeimg/nature.png\" class=\"image\"><span class='nature'>Nature</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Electric", "<img src=\"typeimg/electric.png\" class=\"image\"><span class='electric'>Electric</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Earth", "<img src=\"typeimg/earth.png\" class=\"image\"><span class='earth'>Earth</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Mental", "<img src=\"typeimg/mental.png\" class=\"image\"><span class='mental'>Mental</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Wind", "<img src=\"typeimg/wind.png\" class=\"image\"><span class='wind'>Wind</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Digital", "<img src=\"typeimg/digital.png\" class=\"image\"><span class='digital'>Digital</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Melee", "<img src=\"typeimg/melee.png\" class=\"image\"><span class='melee'>Melee</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Crystal", "<img src=\"typeimg/crystal.png\" class=\"image\"><span class='crystal'>Crystal</span>");
        temtemtype.innerHTML = temtemtype.innerHTML.replace("Toxic", "<img src=\"typeimg/toxic.png\" class=\"image\"><span class='toxic'>Toxic</span>");
    }
    
    // hide unusable temtems
    $("#AMPLING").hide();
    $("#AMPHATYR").hide();
    $("#VALIAR").hide();
    $("#RAIGNET").hide();
}

// function displaying an image from a url
function CreateImg(url, index, name, types)
{
    let img = '<img id="tem'+index+'img" class="smallImg" src="' + url + '" alt="' + url + '" title="' + name + '" >';
    let names = '<p id="tem'+index+'name" class="temName">' +name + "</p>";
    let type = '<p id="tem'+index+'types" class="temType">' +types + "</p>";
    return img + names + type;
}

function CreateName(index, name)
{
    let names = name.toUpperCase();
    return names;
}

function CreateType(index, types)
{
    let type = types;
    return type;
}


function searchHide(){
    var input, input2, filter, a, b, i;
    input = document.getElementById("myInput");
    input2 = document.getElementById("myType");
    filter = input.value.toUpperCase();
    
    for (i = 0; i < temNames.length; i++) {
        a = temNames[i];
        b = temTypes[i];
        if (a.indexOf(filter) > -1 && input2.value.indexOf(b[0]) > -1){
            $("#"+a).show();
        } else if (a.indexOf(filter) > -1 && input2.value.indexOf(b[1]) > -1){
            $("#"+a).show();
        } else if(a.indexOf(filter) > -1 && input2.value == "Type"){
            $("#"+a).show();
        } else {
            $("#"+a).hide();
        }
    }
    // hide unusable temtems
    $("#AMPLING").hide();
    $("#AMPHATYR").hide();
    $("#VALIAR").hide();
    $("#RAIGNET").hide();
}