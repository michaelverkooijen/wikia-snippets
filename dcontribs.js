/**
* @author: Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @version: 1.0
* @license: CC-BY-SA 3.0
* @description: Creates a link in Special:Contributions to the user's posts on discussions.
*/

function addDContribLinks(userId) {
    var divContentSub = document.getElementById("contentSub");
    var aDContribs = document.createElement("a");
    aDContribs.href = "/d/u/" + userId;
    var aDContribsText = document.createTextNode(" Discussion posts");
    aDContribs.appendChild(aDContribsText);
    divContentSub.appendChild(aDContribs);
}

//Is there a better way to get the user id?
function getUserIdByName(username) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var arr = JSON.parse(request.responseText);
            userId = arr["query"]["allusers"][0].id;
            if (Boolean(userId)) {
                addDContribLinks(userId);
            }
        }
    };
    request.open("GET", "/api.php?action=query&list=allusers&aufrom=" + username + "&format=json&aulimit=1", true);
    request.send();
}

function createDContribLinks() {
    if (wgCanonicalSpecialPageName == "Contributions") {
        var userName = wgPageName.split("/")[1]; //Can usernames contain slashes?
        getUserIdByName(userName);
    }
}

addOnloadHook(createDContribLinks);
