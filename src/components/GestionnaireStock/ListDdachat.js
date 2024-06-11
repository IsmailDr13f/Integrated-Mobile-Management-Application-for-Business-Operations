import React from 'react'
import HomeStock from './HomeStock';
import Box from '@mui/material/Box';
import HomeDA from './HomeDA';


function ListDdachat() {
  return (
    <div style={{display:'flex'}}>
          <HomeStock />
          <div style={{}}>
                <h2 style={{ marginLeft: 50, fontSize: 30, }}>Demandes d'achat</h2>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 4,height:20,width:1000}}>
                    <HomeDA />
                </Box>
          </div>
    </div>
  )
};
export default ListDdachat;