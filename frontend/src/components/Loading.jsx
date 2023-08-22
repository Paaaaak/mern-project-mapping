import React from 'react';
import { Grid } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='loading-container'>
      <Grid
        color='darkcyan'
        height={50}
        width={50}>
      </Grid>
    </div>
  );
};

export default Loading;