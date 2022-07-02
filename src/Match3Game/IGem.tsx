export interface IGem {
    type: number;
    points: number;
    id: number;
}

export function createGem(type: number): IGem {
    return {type, points: 0, id: Math.random()}
}
