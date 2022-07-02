import React, {FC} from 'react';
import {Box, Typography} from '@mui/material';

export const Home: FC = () => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant="h3">Home</Typography>
        </Box>
    );
};
