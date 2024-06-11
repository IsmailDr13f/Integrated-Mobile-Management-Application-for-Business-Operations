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
    const [quan, setQuan] = useState(0);
    const [prix, setPrix] = useState(0);
    //const [rows, setRows] = useState([]);
    const setRows = useAppStore((state) => state.setRows);


    const empCollectionRef = collection(db, "Produits");

    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };



    const createUser = async() => { 
        await addDoc(empCollectionRef, {
            Réference: ref,
            PrixUHT: prix,
            Quantity: quan,
            Désignation: desg,
        });
        getUsers();
        CloseEvent();
        Swal.fire('Enregistrer avec succés!');
    };

    const handleRefChange = (event) => { 
        setRef(event.target.value);
    }

    const handleDesgChange = (event) => { 
        setDesg(event.target.value);
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
             Ajouter
            </Typography>
            <IconButton 
                style={{ position: 'absolute', top: 0, right: 0 ,width:50,height:50}}
                onClick={CloseEvent}
            >
                <CloseIcon style={{width:20}}/>
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField type='number' onChange={handleRefChange} value={ref} id="outlined-basic" label="Réference" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={handleQuntChange} value={quan} id="outlined-basic" label="Quantité" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleDesgChange}  value={desg} id="outlined-basic" label="Désignation" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField type='number' onChange={handlePrixChange} value={prix} id="outlined-basic" label="Prix UHT (DH)" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5' align='center'>
                        <Button style={{marginLeft:60}} variant="contained" onClick={createUser}>
                            Ajouter Produit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />

        </>
    );
}

export default AjouterProduit;
