import React, {FC} from 'react';
import {Box, SxProps, Theme} from '@mui/material';

const cursorLeftSx: SxProps<Theme> = {
  border: '#000 solid',
  borderWidth: '1px 0 1px 1px',
};

const cursorRightSx: SxProps<Theme> = {
  border: '#000 solid',
  borderWidth: '1px 1px 1px 0',
};

export const Gem: FC<{type: number, cursorLeft: boolean, cursorRight: boolean}> = ({type, cursorLeft, cursorRight}) => {
    return <Box sx={{flex: '14% 0 0', paddingTop: '14%', backgroundColor: type?'#00f':'#fff', border: '1px solid #fff',
      ...(cursorLeft?cursorLeftSx:{}),
      ...(cursorRight?cursorRightSx:{}),
    }}/>
}
