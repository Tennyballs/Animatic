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


const r = new Rect(250, 250);
r.fillColor = Color.random();

const scx = mainCanvas.width / 2;
const scy = mainCanvas.height / 2;

addFunc(0, 1, Ease.outExpo, function(t){
    r.x = scx * 2 - (t ** 2) * scx
    r.rotation = t * 45
})

addFunc(1, 1, Ease.outExpo, function(t)
{
    r.y = t * scy
    r.rotation = 45 + t * 45;
})

mainLoop();