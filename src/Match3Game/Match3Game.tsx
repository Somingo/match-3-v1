import React, {FC} from 'react';
import {Box, Typography} from '@mui/material';
import {Gem} from './Gem';

export const Match3Game:FC = ()=> {

    const table = [
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
    ];

    const cursor = 21;

    return  (
        <Box sx={{
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Typography variant="h3">Game</Typography>
            <Box sx={{display: 'flex', width:'100%', maxWidth: '500px', flexWrap: 'wrap'}}>
                {table.map((n, index)=> <Gem type={n} cursorLeft={cursor===index} cursorRight={cursor+1===index}/>)}
            </Box>
    </Box>
    );
};
