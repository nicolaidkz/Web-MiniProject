let $navButtons = $("#navGrid").children("a");                              // get all a-tag children of navGrid
var navButtonRef = ["squad.html", undefined, ""];                           // button reference strings
let $squadCard = $("#squadCard");

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

function ToggleSquadCard()
{
    console.log("clickety");
    $squadCard.toggleClass("expand collapse");
}

