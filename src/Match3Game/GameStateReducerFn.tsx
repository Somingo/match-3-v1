import {IGameState} from './IGameState';
import {LINE_WIDTH, LINES} from './config';
import {IGem} from './IGem';

const moveCursorLeft = (state: IGameState): IGameState => ({
    ...state,
    cursor: state.cursor % LINE_WIDTH - 1 > -1 ? state.cursor - 1 : state.cursor,
});

const moveCursorUp = (state: IGameState): IGameState => ({
    ...state,
    cursor: state.cursor - LINE_WIDTH > -1 ? state.cursor - LINE_WIDTH : state.cursor,
});

const moveCursorRight = (state: IGameState): IGameState => ({
    ...state,
    cursor: state.cursor % LINE_WIDTH + 2 < LINE_WIDTH ? state.cursor + 1 : state.cursor,
});

const moveCursorDown = (state: IGameState): IGameState => ({
    ...state,
    cursor: state.cursor + LINE_WIDTH < state.table.length - 1 ? state.cursor + LINE_WIDTH : state.cursor,
});

const swapGems = (state: IGameState): IGameState => {
    const nextTable = [...state.table];
    const a = nextTable[state.cursor];
    nextTable[state.cursor] = nextTable[state.cursor + 1];
    nextTable[state.cursor + 1] = a;
    return {...state, table: nextTable};
};

const applyGravityIteration = (nextTable: IGem[]): boolean => {
    let hasMoving = false;
    for (let i = nextTable.length - 1 - LINE_WIDTH; i > -1; i--) {
        if (nextTable[i + LINE_WIDTH].type === 0 && nextTable[i].type !== 0) {
            const temp = nextTable[i + LINE_WIDTH];
            nextTable[i + LINE_WIDTH] = nextTable[i];
            nextTable[i] = temp;
            hasMoving = true;
        }
    }
    return hasMoving;
}

const applyGravity = (state: IGameState): IGameState => {
    const nextTable = [...state.table];
    while (applyGravityIteration(nextTable)) {
    }
    return {...state, table: nextTable};
}

const markForRemove = (nextTable: IGem[]): boolean => {
    let hasRemovable = false;
    nextTable.forEach(gem => {
        gem.points = 0
    });
    // horizontal
    for (let i = 0; i < nextTable.length; i++) {
        if (nextTable[i].type !== 0 && i % LINE_WIDTH < LINE_WIDTH - 2 && nextTable[i].type === nextTable[i + 1].type && nextTable[i].type === nextTable[i + 2].type) {
            nextTable[i].points++;
            nextTable[i + 1].points++;
            nextTable[i + 2].points++;
            hasRemovable = true;
        }
    }
    // vertical
    for (let i = 0; i < nextTable.length; i++) {
        if (nextTable[i].type !== 0 && i / LINE_WIDTH < LINES - 2 && nextTable[i].type === nextTable[i + LINE_WIDTH].type && nextTable[i].type === nextTable[i + LINE_WIDTH * 2].type) {
            nextTable[i].points++;
            nextTable[i + LINE_WIDTH].points++;
            nextTable[i + LINE_WIDTH * 2].points++;
            hasRemovable = true;
        }
    }
    return hasRemovable;
}

export const removeGems = (state: IGameState): IGameState => {
    if (markForRemove(state.table)) {
        const additionalScore = state.table.reduce((points, gem) => points + gem.points, 0);
        const nextTable = state.table.map(gem => gem.points ? {type: 0, points: 0} : gem);
        return removeGems(applyGravity({...state, table: nextTable, score: state.score + additionalScore}));
    }
    return state;
}

export const gameStateReducerFn = (state: IGameState, action: number): IGameState => {
    switch (action) {
        case 37:
            return moveCursorLeft(state);
        case 38:
            return moveCursorUp(state);
        case 39:
            return moveCursorRight(state);
        case 40:
            return moveCursorDown(state);
        case 32:
            return removeGems(applyGravity(swapGems(state)));
        // gravity 1 iteration G button
        case 71:
            return applyGravity(state);
        // mark for remove gems M Button
        case 77:
            return removeGems(state);
    }
    return state;
};
