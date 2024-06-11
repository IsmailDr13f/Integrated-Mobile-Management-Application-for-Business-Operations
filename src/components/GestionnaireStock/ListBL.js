import React from 'react'
import HomeStock from './HomeStock';
import Box from '@mui/material/Box';
import HomeBL from './HomeBL';


function ListBL() {
  return (
      <div style={{display:'flex'}}>
          <HomeStock />
          <div style={{}}>
              
          
          <h2 style={{ marginLeft: 50, fontSize: 30, }}>Bons de Livraison</h2>
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 4,height:20,width:1000}}>
            <HomeBL />
        </Box>
          </div>
          
          
    </div>
  )
}

export default ListBL
