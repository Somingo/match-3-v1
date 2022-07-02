import React, {FC} from 'react';
import {Box} from '@mui/material';

export const Gem: FC<{type: number}> = ({type}) => {
    return <Box sx={{flex: '14% 0 0', paddingTop: '14%', backgroundColor: type?'#00f':'#fff'}}/>
}
