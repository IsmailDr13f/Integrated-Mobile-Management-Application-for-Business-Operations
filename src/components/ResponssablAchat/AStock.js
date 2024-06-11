import React from 'react';
import HomeAchat from './HomeAchat';
import Box from '@mui/material/Box';
import ListFrournisseur from './ListFournisseur';



function aStock() {
  return (
      <div style={{display:'flex'}}>
          <HomeAchat />
           
          <div style={{}}>
              
          
          <h2 style={{ marginLeft: 50, fontSize: 30, }}>Fournisseurs</h2>
              <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 4, height: 20, width: 1000 }}>
                  
                  <ListFrournisseur />
        </Box>
          </div>
          
          
    </div>
  )
}

export default aStock;