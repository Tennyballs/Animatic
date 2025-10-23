new Music("./")

const scx = mainCanvas.width / 2;
const scy = mainCanvas.height / 2;

const bg = new Rect(mainCanvas.width, mainCanvas.height);
bg.center(scx, scy)
bg.fillColor = new Color(0, 0, 0)


const r = new Rect(250, 250);
r.fillColor = new Color(0.1, 0, 0.05)
r.outlineColor = new Color(1, 0, 0.5)
r.lineWidth = 25

r.x = scx;
r.y = scy;

addFunc(0, 5, Ease.instant, function(t)
{
    let speed = 2;

    if(r.x - r.width / 2 - r.lineWidth > mainCanvas.width)
    {
        r.x = - r.width / 2 - r.lineWidth
    }

    r.x+=speed;
})


mainLoop();