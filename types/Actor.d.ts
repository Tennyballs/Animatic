import { Color } from "./Color";

export interface Entity {
    x: number;
    y: number;
    rotation: number;
    character: {
        type: Entity.CharacterType,
        colors: Color[]
    };
    light: {
        type: Entity.LightType,
        brightness: number,
        radialFalloff: number,
        angularFalloff: number,
        color: Color
    };
}

declare namespace Entity {
    export enum CharacterType {
        null = -1, // not any kind of character.
        PlayerCharacter = 0,
        NPC_Character = 1,
        AI = 2,
    }
    export enum LightType {
        null = -1, // not any kind of light source.
        Point = 0,
        Ambient = 1,
        Spot = 2,
        Directional = 3,
        Area = 4,
        Surface = 5
    }
}
