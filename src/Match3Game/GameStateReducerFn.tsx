import {IGameState} from './IGameState';
import {LINE_WIDTH, LINE_WIDTH_2X, LINES} from './config';
import {createGem, IGem} from './IGem';

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
    if (state.table[state.cursor].removing ||
        state.table[state.cursor + 1].removing ||
        (state.table[state.cursor + 1].type === 0 && state.table[state.cursor].type === 0)) return state;

    const nextTable = [...state.table];
    const a = {...nextTable[state.cursor], swapping: 2};
    nextTable[state.cursor] = {...nextTable[state.cursor + 1], swapping: 1};
    nextTable[state.cursor + 1] = a;
    return {...state, table: nextTable};
};

let fallingID = 0;

const applyGravityIteration = (nextTable: IGem[]): boolean => {
    let hasMoving = false;
    for (let i = nextTable.length - 1 - LINE_WIDTH; i > -1; i--) {
        if (nextTable[i + LINE_WIDTH].type === 0 && nextTable[i].type !== 0 && !nextTable[i].removing&& !nextTable[i].falling && !nextTable[i].swapping) {
            if (!hasMoving) fallingID++;
            const temp = nextTable[i + LINE_WIDTH];
            nextTable[i + LINE_WIDTH] = {...nextTable[i], falling: fallingID};
            nextTable[i] = temp;
            hasMoving = true;
        }
    }
    return hasMoving;
}

const applyGravity = (state: IGameState): IGameState => {
    const nextTable = [...state.table];
    applyGravityIteration(nextTable)
    return {...state, table: nextTable};
}

let removingId = 1;

const checkGemsForRemove = (gemsToCheck: IGem[]): boolean => {
    const gems: IGem[] = gemsToCheck.filter(gem =>
        (!gem.removing || gem.removing === removingId)
        && !gem.swapping
        && !gem.falling
        && gem.type === gemsToCheck[0].type
    );
    if (gems.length === 3) {
        gems.forEach(gem => {
            gem.points++;
            gem.removing = removingId;
            gem.swapping = 0;
        });
        return true;
    }
    return false;
}

export const markForRemove = (state: IGameState): IGameState => {
    const nextTable = state.table.map(gem => gem.removing || gem.falling || gem.swapping ? gem : {...gem, points: 0});
    let hasRemovable = false;
    removingId++;
    for (let i = 0; i < nextTable.length; i++) {
        // horizontal
        if (nextTable[i].type !== 0 && i % LINE_WIDTH < LINE_WIDTH - 2) {
            hasRemovable = checkGemsForRemove([nextTable[i], nextTable[i + 1], nextTable[i + 2]]) || hasRemovable;
        }
        // vertical
        if (nextTable[i].type !== 0 && i / LINE_WIDTH < LINES - 2) {
            hasRemovable = checkGemsForRemove([nextTable[i], nextTable[i + LINE_WIDTH], nextTable[i + LINE_WIDTH_2X]]) || hasRemovable;
        }
    }
    return hasRemovable ? {...state, table: nextTable} : state;
}

export const removeGem = (state: IGameState, target: IGem): IGameState => {
    const nextTable = state.table.map(gem => gem.removing === target.removing ? createGem(0) : gem);
    return {...state, table: nextTable, score: state.score + target.points};
}

export const swapEnd = (state: IGameState, target: IGem): IGameState => {
    const nextTable = state.table.map(gem => gem === target ? {...gem, swapping: 0} : gem);
    return {...state, table: nextTable};
}
export const fallEnd = (state: IGameState, target: IGem): IGameState => {
    const nextTable = state.table.map(gem => gem.falling === target.falling ? {...gem, falling: 0} : gem);
    return {...state, table: nextTable};
}

export const gameStateReducerFn = (state: IGameState, action: { type: string, payload?: IGem }): IGameState => {
    switch (action.type) {
        case 'KEY37':
            return moveCursorLeft(state);
        case 'KEY38':
            return moveCursorUp(state);
        case 'KEY39':
            return moveCursorRight(state);
        case 'KEY40':
            return moveCursorDown(state);
        case 'KEY32':
            return markForRemove(applyGravity(swapGems(state)));
        // gravity 1 iteration G button
        case 'KEY71':
            return applyGravity(state);
        // mark for remove gems M Button
        case 'KEY77':
            return markForRemove(state);
        case 'REMOVE':
            return action.payload ? markForRemove(applyGravity(removeGem(state, action.payload))) : state;
        case 'SWAP_END':
            return action.payload ? markForRemove(applyGravity(swapEnd(state, action.payload))) : state;
        case 'FALL_END':
            return action.payload ? markForRemove(applyGravity(fallEnd(state, action.payload))) : state;
    }
    return state;
};
