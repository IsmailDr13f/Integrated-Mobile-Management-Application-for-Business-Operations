import React from 'react'
import HomeStock from './HomeStock';
import Box from '@mui/material/Box';
import HomeFacture from './HomeFacture';
import HomeBR from './HomeBR';


function ListBR() {
  return (
      <div style={{display:'flex'}}>
          <HomeStock />
          <div style={{}}>
              
          
          <h2 style={{ marginLeft: 50, fontSize: 30, }}>Bon de Retoure</h2>
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 4,height:20,width:1000}}>
            <HomeBR />
        </Box>
          </div>
          
          
    </div>
  )
}

export default ListBR