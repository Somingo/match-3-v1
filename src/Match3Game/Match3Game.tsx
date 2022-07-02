import React, {FC, useEffect, useReducer} from 'react';
import {Box, Typography} from '@mui/material';
import {Gem, gemColors, IGem} from './Gem';

const LINE_WIDTH = 7;
const LINES = 11;

interface IGameState {
    cursor: number;
    table: IGem[];
    score: number;
}

const initialState: IGameState = {
    table: new Array(LINE_WIDTH * LINES)
        .fill(0)
        .map(() => Math.floor(Math.random() * gemColors.length))
        .map<IGem>(type => ({type, points: 0})),
    cursor: 35,
    score: 0,
};

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

const removeGems = (state: IGameState): IGameState => {
    if (markForRemove(state.table)) {
        const additionalScore = state.table.reduce((points, gem) => points + gem.points, 0);
        const nextTable = state.table.map(gem => gem.points ? {type: 0, points: 0} : gem);
        return removeGems(applyGravity({...state, table: nextTable, score: state.score + additionalScore}));
    }
    return state;
}

const gameStateReducer = (state: IGameState, action: number): IGameState => {
    switch (action) {
        // move cursor left 37
        case 37:
            return moveCursorLeft(state);
        // move cursor up 38
        case 38:
            return moveCursorUp(state);
        // move cursor right 39
        case 39:
            return moveCursorRight(state);
        // move cursor down 40
        case 40:
            return moveCursorDown(state);
        // swap gems space 32
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

export const Match3Game: FC = () => {
    const [{table, cursor, score}, dispatch] = useReducer(gameStateReducer, initialState, removeGems);

    useEffect(() => {
        const keyPressListener = (e: KeyboardEvent) => {
            dispatch(e.keyCode);
            console.log(e.keyCode);
        };
        document.body.addEventListener('keyup', keyPressListener);
        return () => {
            document.body.removeEventListener('keyup', keyPressListener);
        }
    }, []);

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'block',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Typography variant="h3">Score: {score}</Typography>
            <Box sx={{display: 'flex', width: '100%', maxWidth: '500px', flexWrap: 'wrap'}}>
                {table.map((gem, index) => <Gem gem={gem} cursorLeft={cursor === index}
                                                cursorRight={cursor + 1 === index}/>)}
            </Box>
        </Box>
    );
};
