jQuery.support.cors = true;
var $mainContainer = $("#mainContent"); // jquery variable
$mainContainer.html("");                // set html to nothing
let $navButtons = $("#navGrid").children("a");                              // get all a-tag children of navGrid
let $squadCard = $("#squadCard");
var navButtonRef = ["main.html", "compare.html", "login.html"];
let $sModal = $("#squadModal");
let $eModal = $("#enemyModal");
let $modalResult = $("#resultList");
let $enemyModalResult = $("#resultList2");

MakeTemCall();                          // make a TemCall to API
//MakeServerCall();


//makeCorsRequest();

var temNames = [];                      // array to store Temtem names
var temTypes = [];                      // array to store Temtem types

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
function MakeServerCall(url,  dataField)
{
    $.ajax(
    {
        type: 'POST',
        url: 'http://localhost/login/'+ url +'.php',
        dataType: 'json',
        data : dataField,
        //data: { user: "John", pass: "Boston" },
        
        success: function(result)
        {
            console.log(typeof result); 
            ServerDataFetch(result);
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        },
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
function EnemyCloseModal() 
{
    $eModal.hide();
    console.log("trying to close modal");
}

function EnemyToggleModal(id)
{
    if($eModal.is(":visible")) 
    {
        $eModal.slideUp("slow");  // we should save choice of temtem (if any) before closing
    }
    else{
        $eModal.slideDown("fast");
        console.log(id); // here we know which squad placement is being changed   
    }
}

// function receiving data from TemCall (use to process result)
function TemCallResult(input)
{
    var images = [];
    var images2 = [];
    var images3 = [];
    input.map((item, index ) => 
    {
        let img = '<div id="'+item.name.toUpperCase()+'" class="imgCard" '+'onclick=clickEvent('+item.name.toUpperCase()+')>' + CreateImg(item.wikiPortraitUrlLarge, index, item.name, item.types) + '</div>';
        let nme = CreateName(index, item.name);
        let tpe = CreateType(index, item.types);
        images.push(img);
        temNames.push(nme);
        temTypes.push(tpe);
        let img2 = '<div id="'+item.name.toUpperCase()+'modal"'+' class="modalResult")>' + CreateImgNoType(item.wikiPortraitUrlLarge, 100+index, item.name) + '</div>';
        let img3 = '<div id="'+item.name.toUpperCase()+'enemyModal"'+' class="enemyModalResult") onclick=alert("'+item.name+'")>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 200+index, item.name) + '</div>';
        images3.push(img3);
        images2.push(img2);
    })

    $mainContainer.html(images);
    $modalResult.html(images2);
    $enemyModalResult.html(images3);
    // exhange comma for | in types and color types
    console.log(window.location.href);
    if (window.location.href.includes("main.html")){
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
    }
    
    // hide unusable temtems
    $("#AMPLING").hide();
    $("#AMPHATYR").hide();
    $("#VALIAR").hide();
    $("#RAIGNET").hide();
}

function ServerDataFetch(input)
{
    // let test = JSON.parse(input);
    // //console.log(typeof test);
    // console.log(test);
    alert('Success!' + input );
    console.log("successfully logged in or created user..");
}

// function displaying an image from a url
function CreateImgNoType(url, index, name)
{
    let img = '<img id="mTem'+index+'img" class="smallImgModal" src="' + url + '" alt="' + url + '" title="' + name + '" >';
    let names = '<p id="mTem'+index+'name" class="temNameModal">' +name + "</p>";
    let but = '<img id="buttonFor' + index + '" src="typeimg/plus.png" class="modalSelectButton">' + '</img>';
    return img + names + but;
}
function CreateImgNoTypeNoButton(url, index, name)
{
    let img = '<img id="mTem'+index+'img" class="smallImgModal" src="' + url + '" alt="' + url + '" title="' + name + '" >';
    let names = '<p id="mTem'+index+'name" class="temNameModal">' +name + "</p>";
    return img + names;
}

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

function searchHideModal(){
    var input, filter;
    input = document.getElementById("modalInput");
    filter = input.value.toUpperCase();
    // add all the temtem images to the modal and hide/show here

    for(i = 0; i < temNames.length; i++)
    {
        let a = temNames[i];
        if(a.indexOf(filter) > -1)
        {
            $("#" + a + "modal").show();
        }
        else $("#" + a + "modal").hide();

    }
}
function enemySearchHideModal(){
    var input, filter;
    input = document.getElementById("enemyModalInput");
    filter = input.value.toUpperCase();
    // add all the temtem images to the modal and hide/show here

    for(i = 0; i < temNames.length; i++)
    {
        let a = temNames[i];
        if(a.indexOf(filter) > -1)
        {
            $("#" + a + "enemyModal").show();
        }
        else $("#" + a + "enemyModal").hide();

    }
}


function CreateUserBut()
{
    username = document.getElementById("cuser").value;
    pass = document.getElementById("cpass").value;   
    dataField = {user : username , pass : pass };
    MakeServerCall('createUser', dataField);
}

function LoginUserBut()
{
    username = document.getElementById("luser").value;
    pass = document.getElementById("lpass").value;
    dataField = {user : username , pass : pass };
    MakeServerCall('authen_login', dataField);
}

// // Create the XHR object.
// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // XHR for Chrome/Firefox/Opera/Safari.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // XDomainRequest for IE.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     // CORS not supported.
//     xhr = null;
//   }
//   return xhr;
// }

// // Helper method to parse the title tag from the response.
// function getTitle(text) {
//   return text.match('<title>(.*)?</title>')[1];
// }

// // Make the actual CORS request.
// function makeCorsRequest() {
//   // This is a sample server that supports CORS.
//   var url = 'http://localhost/login/login.php';

//   var xhr = createCORSRequest('GET', url);
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   }

//   // Response handlers.
//   xhr.onload = function() {
//     //var title = getTitle(text);
//     alert('Response from CORS request to ');
//   };

//   xhr.onerror = function() {
//     alert('Woops, there was an error making the request.');
//   };

//   xhr.send();
// }