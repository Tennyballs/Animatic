// setCanvasSize(640, 480);

// setStartTime(-1); // -1 means never start automatically
// setStopTime(-1); // never stop the music.
// setAudioTime(0);
// setAudioOffset(0);

 // seconds, bpm.
 //
 // first one in the array will always no matter
 // the input start at second 0 of the song
// setBpm(0, 140)

// const background = new Rect(canvas.width, canvas.height, new Color(0, 0, 0));

const audio = new Music("./Contagious.ogg");
audio.volume = 10
audio.play().setBpm(115); // add bpm functionality next update



const scx = mainCanvas.width / 2;
const scy = mainCanvas.height / 2;

const r = new Rect(250, 250);
r.fillColor = Color.random();

r.x = scx;
r.y = scy;

for (let i = 0; i < 100; i++) {
    addFunc(i/2, 0.25, Ease.outQuint, function(t){
        r.rotation = t * 45
    })
    addFunc(i/2+0.25, 0.25, Ease.outQuint, function(t){
        r.rotation = t * 45 + 45
    })
}
addFunc(1, 0.25, Ease.bounce, function(t){
    r.x = t * 100 + scx
})
addFunc(1.25, 0.25, Ease.bounce, function(t){
    r.x = t * -100 + scx
})

mainLoop();