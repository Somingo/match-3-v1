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

const gameStateReducer = (s: IGameState, a: number): IGameState => {
    switch (a) {
        // left 37
        case 37:
            return {...s, cursor: s.cursor % LINE_WIDTH - 1 > -1 ? s.cursor - 1 : s.cursor};
        // up 38HEIGHT
        case 38:
            return {...s, cursor: s.cursor - LINE_WIDTH > -1 ? s.cursor - LINE_WIDTH : s.cursor};
        // right 39
        case 39:
            return {...s, cursor: s.cursor % LINE_WIDTH + 2 < LINE_WIDTH ? s.cursor + 1 : s.cursor};
        // down 40
        case 40:
            return {
                ...s,
                cursor: s.cursor + LINE_WIDTH < s.table.length - 1 ? s.cursor + LINE_WIDTH : s.cursor,
            };
        // space 32
        case 32:
            const nextState = [...s.table];
            const a = nextState[s.cursor];
            nextState[s.cursor] = nextState[s.cursor + 1];
            nextState[s.cursor + 1] = a;
            return {...s, table: nextState};

    }
    return s;
};

export const Match3Game: FC = () => {
    const [{table, cursor}, dispatch] = useReducer(gameStateReducer, initialState);

    useEffect(() => {
        const keyPressListener = (e: KeyboardEvent) => {
            dispatch(e.keyCode);
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
