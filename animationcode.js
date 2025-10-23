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


for (let i = 0; i < 100; i++) {
    const r = new Rect(10, 10);
    r.x = i * 1
    r.fillColor = Color.random();
}

addFunc(function(time)
{
    mainCanvas.hueShift(time/100)
})

mainLoop();