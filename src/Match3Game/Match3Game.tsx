import React, {FC, useEffect, useReducer} from 'react';
import {Box, Typography} from '@mui/material';
import {Gem} from './Gem';
import {GEM_COLORS, LINE_WIDTH, LINES} from './config';
import {createGem, IGem} from './IGem';
import {IGameState} from './IGameState';
import {gameStateReducerFn, removeGems} from './GameStateReducerFn';

const initialState: IGameState = {
    table: new Array(LINE_WIDTH * LINES)
        .fill(0)
        .map(() => Math.floor(Math.random() * GEM_COLORS.length))
        .map<IGem>(createGem),
    cursor: 35,
    score: 0,
};

export const Match3Game: FC = () => {
    const [{table, cursor, score}, dispatch] = useReducer(gameStateReducerFn, initialState, removeGems);

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
            <Typography variant="h3">Score: {score}</Typography>
            <Box sx={{display: 'flex', width: '100%', maxWidth: '500px', flexWrap: 'wrap'}}>
                {table.map((gem, index) => <Gem key={gem.id} gem={gem} cursorLeft={cursor === index}
                                                cursorRight={cursor + 1 === index}/>)}
            </Box>
        </Box>
    );
};
