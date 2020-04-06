let $navButtons = $("#navGrid").children("a");                              // get all a-tag children of navGrid
var navButtonRef = ["squad.html", undefined, ""];                           // button reference strings
let $squadCard = $("#squadCard");
let $closeSpan = $("sM-content").children("span");
let $sModal = $("squadModel");
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



$closeSpan.onclick = function() {
    $sModal.hide();
    console.log("trying to close modal");
  }
  
  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == $sModal) {
    $sModal.hide();
    console.log("trying to close modal");
    }
}