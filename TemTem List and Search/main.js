var $mainContainer = $("#mainContent"); // jquery variable
$mainContainer.html("");                // set html to nothing

MakeTemCall();                          // make a TemCall to API
var temNames = [];
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
    console.log(temNames);

    input.map((item, index ) => 
    {
        let img = '<div id="'+item.name.toUpperCase()+'" class="imgCard">' + CreateImg(item.wikiPortraitUrlLarge, index, item.name) + '</div>';
        let nme = CreateName(index, item.name);
        images.push(img);
        temNames.push(nme);
    })

    $mainContainer.html(images);
    $("#AMPLING").hide();
    $("#AMPHATYR").hide();
}

// function displaying an image from a url
function CreateImg(url, index, name)
{
    let img = '<img id="tem'+index+'img" class="smallImg" src="' + url + '" alt="' + url + '" title="' + name + '" >';
    let names = '<p id="tem'+index+'name" class="temName">' +name + "</p>";
    return img + names;
}
function CreateName(index, name)
{
    let names = name.toUpperCase();
    return names;
}

function searchHide(){
    var input, filter, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    for (i = 0; i < temNames.length; i++) {
        a = temNames[i];
        if (a.indexOf(filter) > -1)
        {
            $("#"+a).show();
            $("#AMPLING").hide();
            $("#AMPHATYR").hide();
        } else {
            $("#"+a).hide();
        }
    }
}