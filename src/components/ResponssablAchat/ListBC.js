import React from 'react'
import HomeAchat from './HomeAchat';
import Box from '@mui/material/Box';
import HomeBC from './HomeBC';


function ListBC() {
  return (
      <div style={{display:'flex'}}>
          <HomeAchat />
          <div style={{}}>
              
          
          <h2 style={{ marginLeft: 50, fontSize: 30, }}>Bons de Commandes</h2>
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 4,height:20,width:1000}}>
            <HomeBC />
        </Box>
          </div>
          
          
    </div>
  )
}

export default ListBC