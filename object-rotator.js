$("#object-rotator").on("mousemove", function(e){
    if(e.buttons == 1) {
        window.newPos = Math.floor(e.pageX / 10);
        if(window.newPos > window.oldPos) {
            //moved right
            console.log("moving right");
            var position = parseInt($("#object-rotator").css("background-position"), 10);
            $("#object-rotator").css("background-position", (position + 270).toString() + "px");
        } else if(window.newPos < window.oldPos) {
            //moved left
            console.log("moving left");
            var position = parseInt($("#object-rotator").css("background-position"), 10);
            $("#object-rotator").css("background-position", (position - 270).toString() + "px");
        } else {
            console.log("not moved");
        }
        window.oldPos = window.newPos;
    }
});
