import React, {FC} from 'react';
import {Box, Typography} from '@mui/material';

export const Match3Game:FC = ()=> {
    return  (
        <Box sx={{
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Typography variant="h3">Game</Typography>
    </Box>
    );
};
