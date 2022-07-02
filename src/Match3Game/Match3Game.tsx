import React, {FC, useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {Gem} from './Gem';

const LINE_WIDTH = 7;
const HEIGHT = 11*LINE_WIDTH-1;

export const Match3Game:FC = ()=> {

    const [table, setTable] = useState([
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
    ]);

    const [cursor, setCursor] = useState(21);

    useEffect(()=>{
        const keyPressListener = (e: KeyboardEvent)=> {
            switch (e.keyCode) {
                // left 37
                case 37: setCursor((prevState => prevState%LINE_WIDTH-1>-1?prevState-1:prevState)); break;
                // up 38HEIGHT
                case 38: setCursor((prevState => prevState-LINE_WIDTH>-1?prevState-LINE_WIDTH:prevState)); break;
                // right 39
                case 39: setCursor((prevState => prevState%LINE_WIDTH+2<LINE_WIDTH?prevState+1:prevState)); break;
                // down 40
                case 40: setCursor((prevState => prevState+LINE_WIDTH<HEIGHT?prevState+LINE_WIDTH:prevState)); break;
            }
        };
        document.body.addEventListener('keyup', keyPressListener);
       return ()=> {
           document.body.removeEventListener('keyup', keyPressListener);
       }
    }, [setCursor, setTable]);

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
