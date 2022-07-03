export interface IGem {
    type: number;
    points: number;
    id: number;
    removing: number;
    swapping: number;
    falling: number;
}

let idNext = 1;

export function createGem(type: number): IGem {
    return {type, points: 0, id: idNext++, removing: 0, swapping: 0, falling: 0}
}
