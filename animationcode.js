const audio = new Music("./Contagious.ogg");
audio.volume = 10
audio.play().setBpm(115); // add bpm functionality next update



const scx = mainCanvas.width / 2;
const scy = mainCanvas.height / 2;

const bg = new Rect(mainCanvas.width, mainCanvas.height);
bg.center(scx, scy)
bg.fillColor = new Color(0, 0, 0)


const r = new Rect(250, 250);
r.fillColor = new Color(0.1, 0.1, 0.1)

r.x = scx;
r.y = scy;

addFunc(0, 1, Ease.outExpo, function(t){
    r.rotation = t * 90
    r.fillColor.r = t
    r.fillColor.g = t
    r.fillColor.b = t
})


mainLoop();