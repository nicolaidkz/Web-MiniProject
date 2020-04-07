var $mainContainer = $("#mainContent"); // jquery variable
$mainContainer.html("");                // set html to nothing
let $navButtons = $("#navGrid").children("a");                              // get all a-tag children of navGrid
let $squadCard = $("#squadCard");
var navButtonRef = ["../createSquad/squad.html", "main.html", ""];
let $sModal = $("#squadModal");
var temNames = [];

onload = function()
{
    // lets do things to the navButtons!
    $navButtons.addClass("navButton");                                      // give them style
    $navButtons.each(function(index)
    {
        if(navButtonRef[index])                                             // is it TRUTHY ? (not true)
        {
            $(this).attr("href", navButtonRef[index]);                      // maybe give them a href?
        }
        else console.log(`missing URL for navButton  ${(index+1)} in navButtonRef!`);     
    });      
}

MakeTemCall();                          // make a TemCall to API


function ToggleSquadCard()
{
    console.log("clickety");
    if($squadCard.hasClass("expand")) CloseModal();
    $squadCard.toggleClass("expand collapse");
}

function CloseModal() 
{
    $sModal.hide();
    console.log("trying to close modal");
}

function ToggleModal(id)
{
    if($sModal.is(":visible")) 
    {
        $sModal.slideUp("slow");  // we should save choice of temtem (if any) before closing
    }
    else{
        $sModal.slideDown("fast");
        console.log(id); // here we know which squad placement is being changed   
    }
}

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
function searchHideModal(){
    var input, filter;
    input = document.getElementById("modalInput");
    filter = input.value.toUpperCase();
    // add all the temtem images to the modal and hide/show here
}