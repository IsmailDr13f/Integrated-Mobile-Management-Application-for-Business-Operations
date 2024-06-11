import { IconButton } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { db } from "../../../firebase.config";
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import Swal from 'sweetalert2';
import { useAppStore } from '../../../appStore';
    
const AjouterProduit = ({ CloseEvent }) => {

    const [ref, setRef] = useState("");
    const [desg, setDesg] = useState("");
    const [quan, setQuan] = useState("");
    const [prix, setPrix] = useState("");
    const [adr, setAdr] = useState("");
    const [client, setClient] = useState("");
    const [dater, setDatr] = useState("");

    //const [rows, setRows] = useState([]);
    const setRows = useAppStore((state) => state.setRows);


    const empCollectionRef = collection(db, "BR");

    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


    const generateBRReference = () => {
    const prefix = "BR";
    const currentDate = new Date();
    const uniqueId = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    
    const reference = `${prefix}${year}${month}${day}${uniqueId}`;
    return reference;
    };

    



const createUser = async () => {
  const references = prix.split(",");
  const quantities = quan.split(",");

  const products = references.map((reference, index) => ({
    Quantity: quantities[index].trim(),
    Reference: reference.trim(),
  }));

  await addDoc(empCollectionRef, {
    NFacture: ref,
    productR: products,
    Client: client,
    adrees: adr,
    DateR: dater,
    NBR: generateBRReference(),
  });

  getUsers();
  CloseEvent();
  Swal.fire("Enregistrer avec succès!");
};



    const handleAdrChange = (event) => { 
        setAdr(event.target.value);
    }


    const handleDateRChange = (event) => { 
        setDatr(event.target.value);
    }

    const handleRefChange = (event) => { 
        setRef(event.target.value);
    }

    const handleClientChange = (event) => { 
        setClient(event.target.value);
    }

    const handleQuntChange = (event) => { 
        setQuan(event.target.value);
    }

    const handlePrixChange = (event) => { 
        setPrix(event.target.value);
    }






    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
             Ajouter Bon de retoure
            </Typography>
            <IconButton 
                style={{ position: 'absolute', top: 0, right: 0 ,width:50,height:50}}
                onClick={CloseEvent}
            >
                <CloseIcon style={{width:20}}/>
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField  onChange={handleRefChange} value={ref} id="outlined-basic" label="N° Facture" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField  onChange={handleClientChange} value={client} id="outlined-basic" label="Client" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField  onChange={handleAdrChange} value={adr} id="outlined-basic" label="Adresse" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handlePrixChange} value={prix} id="outlined-basic" label="Réference(s) de(s) produit(s)" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleQuntChange}  value={quan} id="outlined-basic" label="Quantité(s)" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleDateRChange}  value={dater} id="outlined-basic" label="Date de Retoure" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                {/*<Grid item xs={12}>
                    <TextField type='number' onChange={handlePrixChange} value={prix} id="outlined-basic" label="Prix UHT (DH)" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
    </Grid>*/}
                <Grid item xs={6}>
                    <Typography variant='h5' align='center'>
                        <Button style={{marginLeft:60}} variant="contained" onClick={createUser}>
                            Ajouter 
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />

        </>
    );
}

export default AjouterProduit;
