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
let $1gList = $("#E1Gimg");
let $1gBox = $("#enemy1G");
let $2gBox = $("#enemy2G");
let $good1 = $("#good1Content");
let $good12 = $("#good12Content");
let $good2 = $("#good2Content");
MakeTemCall();                          // make a TemCall to API
//MakeServerCall();


//makeCorsRequest();

var temNames = [];                      // array to store Temtem names
var temTypes = [];                      // array to store Temtem types
var temWeakness = [];

MakeTemWeakCall();

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
function MakeTemWeakCall()
{
    $.ajax(
    {
        type: 'GET',
        url: 'https://temtem-api.mael.tech/api/weaknesses',
        dataType: 'json',

        success: function(result)
        {
            TemCallWeakResult(result);
        }
    });
}
function MakeServerCall()
function MakeServerCall(url,  dataField)
{
    $.ajax(
    {
        type: 'POST',
        url: 'http://localhost/login/'+ url +'.php',
        //dataType: 'json',
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
var images4 = []; // for showing enemy 1 in compare
var images5 = []; // for showing enemy 2 in compare
var images6 = []; // for showing good against enemy 1
var images7 = []; // for showing good against enemy 2
var images8 = []; // for showing good against both enemies
// function receiving data from TemCall (use to process result)
function TemCallResult(input)
{
    var images = [];    // for showing search
    var images2 = [];   // for showing squad modal
    var images3 = [];   // for showing enemy modal
    
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
        let img4 = '<div id="'+item.name.toUpperCase()+'1GList"'+' class="enemyModalResult") onclick=OneGSelect("'+item.name+'")>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 400+index, item.name) + '</div>';
        let img6 = '<div id="'+item.name.toUpperCase()+'modal"'+' class="compareResult")>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 600+index, item.name) + '</div>';
        let img7 = '<div id="'+item.name.toUpperCase()+'modal"'+' class="compareResult")>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 700+index, item.name) + '</div>';
        let img8 = '<div id="'+item.name.toUpperCase()+'modal"'+' class="compareResult")>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 800+index, item.name) + '</div>';
        images8.push(img8);
        images7.push(img7);
        images6.push(img6);
        //images5.push(img5);
        images4.push(img4);
        images3.push(img3);
        images2.push(img2);
    })

    $mainContainer.html(images);
    $modalResult.html(images2);
    $enemyModalResult.html(images3);
    $1gList.html(images4);
    $good1.html(images6);
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
    
    temWeaknessCalc("Platox");
}

function TemCallWeakResult(input)
{             
        temWeakness.push(input);
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
function OneGSearchHide(temName){
    var filter; 
    filter = temName.toUpperCase();
    $1gBox.html(images4);
    // add all the temtem images to the modal and hide/show here

    for(i = 0; i < temNames.length; i++)
    {
        let a = temNames[i];
        if(a.indexOf(filter) > -1)
        {
            $("#" + a + "1GList").show();
            $("#" + a + "1GList").attr("onclick", "show1GList()");
        }
        else {
            $("#" + a + "1GList").hide();
            $("#" + a + "1GList").attr("onclick", "OneGSelect("+ temName + ")");
        }

    }
}
function show1GList()
{
    console.log("clickety");
    $1gList.show();
    // ERROR: E1Gimg DISAPPEARS?!!!
}
function OneGSelect(temName)
{
    console.log("im here too");
    $1gList.hide();
    OneGSearchHide(temName);
}
function CreateUserBut()
{
    username = document.getElementById("cuser").value;
    pass = document.getElementById("cpass").value;   
    dataField = {user : username , pass : pass };
    MakeServerCall('createUser', dataField);
}

var weakAgainst = [];
var strongAgainst = [];
var neutralAgainst = [];
function LoginUserBut()
{
    username = document.getElementById("luser").value;
    pass = document.getElementById("lpass").value;
    dataField = {user : username , pass : pass };
    MakeServerCall('authen_login', dataField);
    MakeServerCall('temListFetch', dataField);
}

function temWeaknessCalc(temName){
    console.log(temName.toUpperCase());
    var weaknessArray1 = [];
    var weaknessArray2 = [];
    var masterArray = [];
    for (i = 0; i < temNames.length; i++)      
    {
        if (temName.toUpperCase() == temNames[i])
        {
            if (temTypes[i].length = 1){
                if (temTypes[i][0] == "Crystal"){
                    weaknessArray1 = temWeakness[0].Crystal;
                }
                else if (temTypes[i][0] == "Digital"){
                    weaknessArray1 = temWeakness[0].Digital;
                }
                else if (temTypes[i][0] == "Earth"){
                    weaknessArray1 = temWeakness[0].Earth;
                }
                else if (temTypes[i][0] == "Electric"){
                    weaknessArray1 = temWeakness[0].Electric;
                }
                else if (temTypes[i][0] == "Fire"){
                    weaknessArray1 = temWeakness[0].Fire;
                }
                else if (temTypes[i][0] == "Melee"){
                    weaknessArray1 = temWeakness[0].Melee;
                }
                else if (temTypes[i][0] == "Mental"){
                    weaknessArray1 = temWeakness[0].Mental;
                }
                else if (temTypes[i][0] == "Nature"){
                    weaknessArray1 = temWeakness[0].Nature;
                }
                else if (temTypes[i][0] == "Neutral"){
                    weaknessArray1 = temWeakness[0].Neutral;
                }
                else if (temTypes[i][0] == "Toxic"){
                    weaknessArray1 = temWeakness[0].Toxic;
                }
                else if (temTypes[i][0] == "Water"){
                    weaknessArray1 = temWeakness[0].Water;
                }
                else if (temTypes[i][0] == "Wind"){
                    weaknessArray1 = temWeakness[0].Wind;
                }
                
                masterArray.Crystal = weaknessArray1.Crystal;
                masterArray.Digital = weaknessArray1.Digital;
                masterArray.Earth = weaknessArray1.Earth;
                masterArray.Electric = weaknessArray1.Electric;
                masterArray.Fire = weaknessArray1.Fire;
                masterArray.Melee = weaknessArray1.Melee;
                masterArray.Mental = weaknessArray1.Mental;
                masterArray.Nature = weaknessArray1.Nature;
                masterArray.Neutral = weaknessArray1.Neutral;
                masterArray.Toxic = weaknessArray1.Toxic;
                masterArray.Water = weaknessArray1.Water;
                masterArray.Wind = weaknessArray1.Wind;
                console.log(masterArray);
            }
            
            if (temTypes[i].length = 2)
            {
                if (temTypes[i][1] == "Crystal"){
                    weaknessArray2 = temWeakness[0].Crystal;
                }
                else if (temTypes[i][1] == "Digital"){
                    weaknessArray2 = temWeakness[0].Digital;
                }
                else if (temTypes[i][1] == "Earth"){
                    weaknessArray2 = temWeakness[0].Earth;
                }
                else if (temTypes[i][1] == "Electric"){
                    weaknessArray2 = temWeakness[0].Electric;
                }
                else if (temTypes[i][1] == "Fire"){
                    weaknessArray2 = temWeakness[0].Fire;
                }
                else if (temTypes[i][1] == "Melee"){
                    weaknessArray2 = temWeakness[0].Melee;
                }
                else if (temTypes[i][1] == "Mental"){
                    weaknessArray2 = temWeakness[0].Mental;
                }
                else if (temTypes[i][1] == "Nature"){
                    weaknessArray2 = temWeakness[0].Nature;
                }
                else if (temTypes[i][1] == "Neutral"){
                    weaknessArray2 = temWeakness[0].Neutral;
                }
                else if (temTypes[i][1] == "Toxic"){
                    weaknessArray2 = temWeakness[0].Toxic;
                }
                else if (temTypes[i][1] == "Water"){
                    weaknessArray2 = temWeakness[0].Water;
                }
                else if (temTypes[i][1] == "Wind"){
                    weaknessArray2 = temWeakness[0].Wind;
                }
                
                if ( weaknessArray1.length == 2){
                    masterArray.Crystal = weaknessArray1.Crystal * weaknessArray2.Crystal;
                    masterArray.Digital = weaknessArray1.Digital * weaknessArray2.Digital;
                    masterArray.Earth = weaknessArray1.Earth * weaknessArray2.Earth;
                    masterArray.Electric = weaknessArray1.Electric * weaknessArray2.Electric;
                    masterArray.Fire = weaknessArray1.Fire * weaknessArray2.Fire;
                    masterArray.Melee = weaknessArray1.Melee * weaknessArray2.Melee;
                    masterArray.Mental = weaknessArray1.Mental * weaknessArray2.Mental;
                    masterArray.Nature = weaknessArray1.Nature * weaknessArray2.Nature;
                    masterArray.Neutral = weaknessArray1.Neutral * weaknessArray2.Neutral;
                    masterArray.Toxic = weaknessArray1.Toxic * weaknessArray2.Toxic;
                    masterArray.Water = weaknessArray1.Water * weaknessArray2.Water;
                    masterArray.Wind = weaknessArray1.Wind * weaknessArray2.Wind;
                }
            }    
            
            var j = 0;
            var types = ["Crystal", "Digital", "Earth", "Electric", "Fire", "Melee", "Mental", "Nature", "Neutral", "Toxic", "Water", "Wind"];
            console.log(types);
            for( var key in masterArray ) {
                var value = masterArray[key];
                if (value > 1){
                    strongAgainst.push(types[j]);
                }
                if (value == 1){
                    neutralAgainst.push(types[j]);
                }
                if (value < 1){
                    weakAgainst.push(types[j]);
                }
                j++;
            }
        }
    }
    
    console.log(temName + " is weak against "+ weakAgainst);
    console.log(temName + " is neutral against "+ neutralAgainst);
    console.log(temName + " is strong against "+ strongAgainst);
}
