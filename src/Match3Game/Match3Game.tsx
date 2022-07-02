import React, {FC, useEffect, useReducer} from 'react';
import {Box, Typography} from '@mui/material';
import {Gem} from './Gem';

const LINE_WIDTH = 7;

interface IGameState {
    cursor: number;
    table: number[];
}

const initialState: IGameState = {
    table: [
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 1, 0,
        0, 0, 1, 0, 0, 1, 1,
        0, 0, 1, 1, 0, 1, 1,
    ], cursor: 35,
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
const applyGravityIteration = (nextTable: number[]):boolean => {
    let hasMoving = false;
    for (let i = nextTable.length-1-LINE_WIDTH; i > -1; i--) {
        if (nextTable[i+LINE_WIDTH] === 0 && nextTable[i] !== 0) {
            nextTable[i+LINE_WIDTH] = nextTable[i];
            nextTable[i] = 0;
            hasMoving = true;
        }
    }
    return hasMoving;
}
const applyGravity = (state: IGameState): IGameState => {
    const nextTable = [...state.table];
    while(applyGravityIteration(nextTable)) {}
    return {...state, table: nextTable};
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
            return applyGravity(swapGems(state));
        // gravity 1 iteration G button
        case 71:
            return applyGravity(state);
    }
    return state;
};

export const Match3Game: FC = () => {
    const [{table, cursor}, dispatch] = useReducer(gameStateReducer, initialState);

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
            <Typography variant="h3">Game</Typography>
            <Box sx={{display: 'flex', width: '100%', maxWidth: '500px', flexWrap: 'wrap'}}>
                {table.map((n, index) => <Gem type={n} cursorLeft={cursor === index}
                                              cursorRight={cursor + 1 === index}/>)}
            </Box>
        </Box>
    );
};
