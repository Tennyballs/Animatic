"use strict";
let song = new Music("./152047_ParagonX9___Chaoz_Impact.mp3");

/**
 * @typedef {import("./types/canvas").Canvas}
 */

song
    .clearBpm()
    .setBpm(150)
    .setOffset()
    .play()
    // .setTime(6.0)
    .volume = 50

let beats = 60 / 150;
const scx = mainCanvas.width / 2;
const scy = mainCanvas.height / 2;
mainCanvas.bindMusic(song);

let r = new Rect(mainCanvas.width, mainCanvas.height);
r.center(scx, scy)

function flip(t)
{
    return 1 - t
}


addFunc(0, beats*16, Ease.flip(Ease.outExpo), function(t){
    r.fillColor.rgba(0, 0, 0, t)
})

addFunc(beats*15.25, beats*4, Ease.flip(Ease.outExpo), function(t){
    r.fillColor.rgba(0, 0, 0, t)
    r.width = t * scx * 2
    r.height = scy * 3
    r.rotation = flip(t) * 20
})




mainLoop();