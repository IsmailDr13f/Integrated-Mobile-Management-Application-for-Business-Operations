import React from 'react'
import HomeAchat from './HomeAchat';
import Box from '@mui/material/Box';
import ListDemande from './ListDemandes';
//import ListCommande from './CommandesClients/ListCommande';


function DemAchat() {
  return (
      <div style={{display:'flex'}}>
          <HomeAchat />
          <div style={{}}>
              
          
          <h2 style={{ marginLeft: 50, fontSize: 30, }}>Demandes d'achat</h2>
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 4,height:20,width:1000}}>
                  <ListDemande />
        </Box>
          </div>
          
          
    </div>
  )
}

export default DemAchat