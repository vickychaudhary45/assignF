import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export const CustomizedRating = ({value, onChange, onClick, name, onChangeActive}) => {

  return (
    <Box sx={{'& > legend': { mt: 2 },}}>
      <Rating name={name} value={value} max={5} onChange={onChange} precision={1} size={'small'} 
        onChangeActive={onChangeActive} 
        iconSpacing={'10px'} 
      />
    </Box>
  );
}
