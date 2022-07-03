export interface IGem {
    type: number;
    points: number;
    id: number;
    removing: boolean;
}

let idNext = 1;

export function createGem(type: number): IGem {
    return {type, points: 0, id: idNext++, removing: false}
}
