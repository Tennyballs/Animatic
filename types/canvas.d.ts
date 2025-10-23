export class Canvas {
    private element: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private children: Rect[];

    public music: Music | null;
    public autoClear: boolean;
    public width: number;
    public height: number;

    constructor(id: string, width = 1, height = 1);

    // get ctx(): CanvasRenderingContext2D; // never used?
    resize(width: number, height: number): Canvas;
    render(): void;
    addChild(child: Rect | null);
    bindMusic(music: Music);
}