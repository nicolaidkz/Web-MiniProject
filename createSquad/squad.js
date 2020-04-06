let $navButtons = $("#navGrid").children("a");                              // get all a-tag children of navGrid
var navButtonRef = ["squad.html", undefined, ""];                           // button reference strings
let $squadCard = $("#squadCard");
let $sModal = $("#squadModal");
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