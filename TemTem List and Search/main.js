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
let $2gList = $("#E2Gimg");
let $1gBox = $("#E1GList");
let $2gBox = $("#E2GList");
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
        if(document.cookie != "") $("#login").html(document.cookie);   
    });      
}

// get *ONE* temtem with *SOME* information
function MakeTemCallSolo(searchName, query)
{
    $.ajax(
    {
        type: 'GET',
        url: 'https://temtem-api.mael.tech/api/temtems',
        dataType: 'json',
        data: { names: searchName, fields: query},

        success: function(result)
        {
            return result;
        }
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
            //console.log(typeof result); 
            ServerDataFetch(result, url);
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
    //console.log("clickety");
    if($squadCard.hasClass("expand")) CloseModal();
    $squadCard.toggleClass("expand collapse");
}

function CloseModal() 
{
    $sModal.hide();
    //console.log("trying to close modal");
}

function ToggleModal(id)
{
    if($sModal.is(":visible")) 
    {
        $sModal.slideUp("slow");  // we should save choice of temtem (if any) before closing
    }
    else{
        $sModal.slideDown("fast");
        //console.log(id); // here we know which squad placement is being changed   
    }
}

function EnemyCloseModal() 
{
    $eModal.hide();
    //console.log("trying to close modal");
}

function EnemyToggleModal(id)
{
    if($eModal.is(":visible")) 
    {
        $eModal.slideUp("slow");  // we should save choice of temtem (if any) before closing USE temListUpdate HERE !!!
    }
    else{
        $eModal.slideDown("fast");
        //console.log(id); // here we know which squad placement is being changed   
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
        let img4 = '<div id="'+item.name.toUpperCase()+'1GList"'+' class="enemyModalResult") onclick=GSelect("'+item.name+'",' +1+')>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 400+index, item.name) + '</div>';
        let img5 = '<div id="'+item.name.toUpperCase()+'2GList"'+' class="enemyModalResult") onclick=GSelect("'+item.name+'",' +2+')>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 500+index, item.name) + '</div>';
        let img6 = '<div id="'+item.name.toUpperCase()+'good1"'+' class="compareResult")>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 600+index, item.name) + '</div>';
        let img7 = '<div id="'+item.name.toUpperCase()+'good12"'+' class="compareResult")>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 700+index, item.name) + '</div>';
        let img8 = '<div id="'+item.name.toUpperCase()+'good2"'+' class="compareResult")>' + CreateImgNoTypeNoButton(item.wikiPortraitUrlLarge, 800+index, item.name) + '</div>';
        images8.push(img8);
        images7.push(img7);
        images6.push(img6);
        images5.push(img5);
        images4.push(img4);
        images3.push(img3);
        images2.push(img2);
    })

    $mainContainer.html(images);
    $modalResult.html(images2);
    $enemyModalResult.html(images3);
    $1gList.html(images4);
    $2gList.html(images5);
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

function TemCallWeakResult(input)
{             
        temWeakness.push(input);
}

function ServerDataFetch(input, dataType)
{   

    switch(dataType)
    {
        case "authen_login":
            alert('Success! WELCOME ' + input );
            document.cookie = input;    // save the username as a cookie
            console.log("cookie saved: " + document.cookie);
            $("#login").html(input);    // update the login button to relfect the username!
            // here we should make a temListFetch to update the squad list.
            PopulateSquad(["Oree", "Ganki", "Loali", "Zaobian", "Granpah", "Hidody"]);
            // we should probably also change the content of login.html to just be "hi dave!" and a logout button?
            break;
        case "createUser":
            alert('Successfully created user');
            // here we should make an authen_login request to log in the newly created user
            break;
        case "temListFetch":
            // since we are fetching the squad, we want to populate that squad with method PopulateSquad(input).
            break;
        case "temListUpdate":
            // here we have updated the temList in DB. It should always be the last step and just return some confirmation.
            alert(input);
            break;
        default:
            // the response we got did not look familiar, time to panic and eat butter biscuits.
            alert("unknown response: " + input);
            break;
    }

}

function PopulateSquad(squadArray)
{   if(squadArray.length == 6)
    {   
        // here we want to update the images in the squad list to match the names in squadArray.
        $("#t1").html(createSquadImg(squadArray[0]));
        $("#t2").html(createSquadImg(squadArray[1]));
        $("#t3").html(createSquadImg(squadArray[2]));
        $("#t4").html(createSquadImg(squadArray[3]));
        $("#t5").html(createSquadImg(squadArray[4]));
        $("#t6").html(createSquadImg(squadArray[5]));
    }
    else console.log("error on squadArray length >> " + squadArray);
}
function createSquadImg(name)
{
    // url = NameToUrl (so call to API i guess..)
    url = MakeTemCallSolo(name, "wikiPortraitUrlLarge" ); 
    console.log("url is: " + url);
    let img = '<img class="squadImg" src=' + url + '>';
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
function GSearchHide(temName, id){
    var filter; 
    filter = temName.toUpperCase();
    if(id == 1)
    {
        $1gBox.html(images4);
        // add all the temtem images to the modal and hide/show here

        for(i = 0; i < temNames.length; i++)
        {
            let a = temNames[i];
            if(a.indexOf(filter) > -1)
            {
                $("#" + a + "1GList").show();
                $("#" + a + "1GList").attr("onclick", "showGList(1)");
            }
            else {
                $("#" + a + "1GList").hide();
                $("#" + a + "1GList").attr("onclick", "GSelect("+ temName + '",'+ id + ")");
            }

        }
        temWeaknessCalc(temName, 1);
    }
    else if (id == 2)
    {
        $2gBox.html(images5);
        // add all the temtem images to the modal and hide/show here

        for(i = 0; i < temNames.length; i++)
        {
            let a = temNames[i];
            if(a.indexOf(filter) > -1)
            {
                $("#" + a + "2GList").show();
                $("#" + a + "2GList").attr("onclick", "showGList(2)");
            }
            else {
                $("#" + a + "2GList").hide();
                $("#" + a + "2GList").attr("onclick", "GSelect("+ temName + '",'+ id + ")");
            }

        }
    temWeaknessCalc(temName, 2);
    }
}

var weakAgainst1, weakAgainst2, strongAgainst1, strongAgainst2, neutralAgainst1, neutralAgainst2;
function GoodESearchHide(temName, id){
    if (id == 1){
        weakAgainst1 = weakAgainst;
        neutralAgainst1 = neutralAgainst;
        strongAgainst1 = strongAgainst;
        $good1.html(images6);
        var b;
        for(i = 0; i < temNames.length; i++)
        {
            var score = 0;
            b = temTypes[i];
            a = temNames[i];
            $("#" + a + "good1").hide();                    
            for(j = 0; j < weakAgainst.length; j++){
                if(typeof weakAgainst[0] !== 'undefined'){
                    if(weakAgainst[j].indexOf(b[0]) > -1)
                    {
                        $("#" + a + "good1").show();
                        score = score +2;
                    }
                    if(weakAgainst[j].indexOf(b[1]) > -1)
                    {
                        score = score+2;
                        $("#" + a + "good1").show();
                    }
                }

            }
            for(j = 0; j < strongAgainst.length; j++){
                if(typeof strongAgainst[0] !== 'undefined'){
                    if(strongAgainst[j].indexOf(b[0]) > -1)
                    {
                        $("#" + a + "good1").hide();
                    }
                    else if(strongAgainst[j].indexOf(b[1]) > -1)
                    {
                        $("#" + a + "good1").hide();
                    }
                }
            }    
        }
        $("#AMPLINGgood1").hide();
        $("#AMPHATYRgood1").hide();
        $("#VALIARgood1").hide();
        $("#RAIGNETgood1").hide();
        calcMidBox();
    }
    if (id == 2){
        weakAgainst2 = weakAgainst;
        neutralAgainst2 = neutralAgainst;
        strongAgainst2 = strongAgainst;
        $good2.html(images8);
        var b;
        for(i = 0; i < temNames.length; i++)
        {
            var score = 0;
            b = temTypes[i];
            a = temNames[i];
            $("#" + a + "good2").hide();                    
            for(j = 0; j < weakAgainst.length; j++){
                
                
                
                if(typeof weakAgainst[0] !== 'undefined'){
                    if(weakAgainst[j].indexOf(b[0]) > -1)
                    {
                        $("#" + a + "good2").show();
                        score = score +2;
                    }
                    if(weakAgainst[j].indexOf(b[1]) > -1)
                    {
                        score = score+2;
                        $("#" + a + "good2").show();
                    }
                }

            }
            for(j = 0; j < strongAgainst.length; j++){
                if(typeof strongAgainst[0] !== 'undefined'){
                    if(strongAgainst[j].indexOf(b[0]) > -1)
                    {
                        $("#" + a + "good2").hide();
                    }
                    else if(strongAgainst[j].indexOf(b[1]) > -1)
                    {
                        $("#" + a + "good2").hide();
                    }
                }
            }    
        }
        $("#AMPLINGgood2").hide();
        $("#AMPHATYRgood2").hide();
        $("#VALIARgood2").hide();
        $("#RAIGNETgood2").hide();
    }
    
    function calcMidBox(){
    if (weakAgainst1 != null && weakAgainst2 != null)
    {
        $good12.html(images7);
        for(i = 0; i < temNames.length; i++)
            {
                var score = 0;
                b = temTypes[i];
                a = temNames[i];
                $("#" + a + "good12").hide();                    
                for(j = 0; j < weakAgainst1.length; j++){
                    if(typeof weakAgainst1[0] !== 'undefined'){
                        if(weakAgainst1[j].indexOf(b[0]) > -1)
                        {
                            $("#" + a + "good12").show();
                            score = score +2;
                        }
                        if(weakAgainst1[j].indexOf(b[1]) > -1)
                        {
                            score = score+2;
                            $("#" + a + "good12").show();
                        }
                    }
                }
                for(j = 0; j < weakAgainst2.length; j++){
                    if(typeof weakAgainst2[0] !== 'undefined'){
                        if(weakAgainst2[j].indexOf(b[0]) > -1)
                        {
                            $("#" + a + "good12").show();
                            score = score +2;
                        }
                        if(weakAgainst2[j].indexOf(b[1]) > -1)
                        {
                            score = score+2;
                            $("#" + a + "good12").show();
                        }
                    }
                }
                for(j = 0; j < strongAgainst1.length; j++){
                    if(typeof strongAgainst1[0] !== 'undefined'){
                        if(strongAgainst1[j].indexOf(b[0]) > -1)
                        {
                            $("#" + a + "good12").hide();
                        }
                        else if(strongAgainst1[j].indexOf(b[1]) > -1)
                        {
                            $("#" + a + "good12").hide();
                        }
                    }
                }
                for(j = 0; j < strongAgainst2.length; j++){
                    if(typeof strongAgainst2[0] !== 'undefined'){
                        if(strongAgainst2[j].indexOf(b[0]) > -1)
                        {
                            $("#" + a + "good12").hide();
                        }
                        else if(strongAgainst2[j].indexOf(b[1]) > -1)
                        {
                            $("#" + a + "good12").hide();
                        }
                    }
                }
            }
        }  
    }
    $("#AMPLINGgood12").hide();
    $("#AMPHATYRgood12").hide();
    $("#VALIARgood12").hide();
    $("#RAIGNETgood12").hide();
}
    
function showGList(id)
{
    if(id == 1) $1gList.show();
    else if (id == 2) $2gList.show();   
}
function GSelect(temName, id)
{
    if(id == 1) $1gList.hide(); GSearchHide(temName, id);
    if(id == 2) $2gList.hide(); GSearchHide(temName, id);   
    
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
    MakeServerCall('temListFetch', dataField);
}

var weakAgainst = [];
var strongAgainst = [];
var neutralAgainst = [];

function temWeaknessCalc(temName, id){
    //console.log(temName.toUpperCase());
    //console.log(id);
    var weaknessArray1 = [];
    var weaknessArray2 = [];
    var masterArray = [];
    weakAgainst = [];
    strongAgainst = [];
    neutralAgainst = [];
    for (i = 0; i < temNames.length; i++)      
    {
        if (temName.toUpperCase() == temNames[i])
        {
                //console.log(temTypes[i]);
                if (temTypes[i][0] == "Crystal"){
                    weaknessArray1 = temWeakness[0].Crystal;
                    weaknessArray1.Crystal = 1;
                }
                else if (temTypes[i][0] == "Digital"){
                    weaknessArray1 = temWeakness[0].Digital;
                    weaknessArray1.Digital = 1;
                }
                else if (temTypes[i][0] == "Earth"){
                    weaknessArray1 = temWeakness[0].Earth;
                    weaknessArray1.Earth = 1;
                }
                else if (temTypes[i][0] == "Electric"){
                    weaknessArray1 = temWeakness[0].Electric;
                    weaknessArray1.Electric = 1;
                }
                else if (temTypes[i][0] == "Fire"){
                    weaknessArray1 = temWeakness[0].Fire;
                    weaknessArray1.Fire = 1;
                }
                else if (temTypes[i][0] == "Melee"){
                    weaknessArray1 = temWeakness[0].Melee;
                    weaknessArray1.Melee = 1;
                }
                else if (temTypes[i][0] == "Mental"){
                    weaknessArray1 = temWeakness[0].Mental;
                    weaknessArray1.Mental = 1;
                }
                else if (temTypes[i][0] == "Nature"){
                    weaknessArray1 = temWeakness[0].Nature;
                    weaknessArray1.Nature = 1;
                }
                else if (temTypes[i][0] == "Neutral"){
                    weaknessArray1 = temWeakness[0].Neutral;
                    weaknessArray1.Neutral = 1;
                }
                else if (temTypes[i][0] == "Toxic"){
                    weaknessArray1 = temWeakness[0].Toxic;
                    weaknessArray1.Toxic = 1;
                }
                else if (temTypes[i][0] == "Water"){
                    weaknessArray1 = temWeakness[0].Water;
                    weaknessArray1.Water = 1;
                }
                else if (temTypes[i][0] == "Wind"){
                    weaknessArray1 = temWeakness[0].Wind;
                    weaknessArray1.Wind = 1;
                }
                if (temTypes[i][1] == "Crystal"){
                    weaknessArray2 = temWeakness[0].Crystal;
                    weaknessArray2.Crystal = 1;
                }
                else if (temTypes[i][1] == "Digital"){
                    weaknessArray2 = temWeakness[0].Digital;
                    weaknessArray2.Digital = 1;
                }
                else if (temTypes[i][1] == "Earth"){
                    weaknessArray2 = temWeakness[0].Earth;
                    weaknessArray2.Earth = 1;
                }
                else if (temTypes[i][1] == "Electric"){
                    weaknessArray2 = temWeakness[0].Electric;
                    weaknessArray2.Electric = 1;
                }
                else if (temTypes[i][1] == "Fire"){
                    weaknessArray2 = temWeakness[0].Fire;
                    weaknessArray2.Fire = 1;
                }
                else if (temTypes[i][1] == "Melee"){
                    weaknessArray2 = temWeakness[0].Melee;
                    weaknessArray2.Melee = 1;
                }
                else if (temTypes[i][1] == "Mental"){
                    weaknessArray2 = temWeakness[0].Mental;
                    weaknessArray2.Mental = 1;
                }
                else if (temTypes[i][1] == "Nature"){
                    weaknessArray2 = temWeakness[0].Nature;
                    weaknessArray2.Nature = 1;
                }
                else if (temTypes[i][1] == "Neutral"){
                    weaknessArray2 = temWeakness[0].Neutral;
                    weaknessArray2.Neutral = 1;
                }
                else if (temTypes[i][1] == "Toxic"){
                    weaknessArray2 = temWeakness[0].Toxic;
                    weaknessArray2.Toxic = 1;
                }
                else if (temTypes[i][1] == "Water"){
                    weaknessArray2 = temWeakness[0].Water;
                    weaknessArray2.Water = 1;
                }
                else if (temTypes[i][1] == "Wind"){
                    weaknessArray2 = temWeakness[0].Wind;
                    weaknessArray2.Wind = 1;
                }
            
            if (weaknessArray2.length == 0){
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
                }
            else{
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
            
            var j = 0;
            var types = ["Crystal", "Digital", "Earth", "Electric", "Fire", "Melee", "Mental", "Nature", "Neutral", "Toxic", "Water", "Wind"];
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
    
    //console.log(temName + " is weak against "+ weakAgainst);
    //console.log(temName + " is neutral against "+ neutralAgainst);
    //console.log(temName + " is strong against "+ strongAgainst);
    //console.log(weaknessArray1);
    //console.log(weaknessArray2);
    GoodESearchHide(temName, id);
}