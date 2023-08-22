import React from 'react';
import { Grid } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div>
      <Grid
        color='rgba(0, 139, 139, 0.4)'
        height={40}
        width={40}>
      </Grid>
    </div>
  );
};

export default Loading;