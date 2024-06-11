import { IconButton } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { db } from "../../firebase.config";
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';
import { query, where } from "firebase/firestore";

    
const AddBC = ({fid, CloseEvent, commandeId, commandeQuantity }) => {

    const [Quantity, setQuant] = useState('');
    const [Désignation, setDesg] = useState('');
    const [Tele, setTele] = useState();
    const [Réference, setRef] = useState();
    const [adress, setAdr] = useState();
    const [Email,setEmail] = useState();
    const [Fournisseur,setFour] = useState();
    const [date, setDate] = useState();
    const [PrixUHT, setUHT] = useState();
    const setRows = useAppStore((state) => state.setRows);


    const empCollectionRef = collection(db, "DemmandeD");


    useEffect(() => {
        
        setDesg(fid.Désignation);
        setQuant(fid.Quantity);
        setRef(fid.Réference );
        
    }, []);
    


    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

    const generateBLReference = () => {
    const prefix = "BC";
    const currentDate = new Date();
    const uniqueId = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    
    const reference = `${prefix}-${year}${month}-${uniqueId}`;
    return reference;
    };





    const createUser = async() => { 
        await addDoc(collection(db, "BC"), {
            Réference: Désignation,
            Quantity: Quantity,
            Désignation: Réference,
            Fournisseur: Fournisseur || "",
            Date: date || "",
            Email: Email || "",
            Tele: Tele || "",
            adress: adress || "",
            PrixUHT: PrixUHT || "",
            NBC:(generateBLReference()).toString(),
           
        });
        getUsers();
        CloseEvent();
        Swal.fire('Enregistrer avec succés!');
       
    };

    const handleDateDChange = (event) => { 
        setDate(event.target.value);
    }

    const handleFourChange = (event) => { 
        setFour(event.target.value);
    }

    const handleTeleChange = (event) => { 
        setTele(event.target.value);
    }

    const handleEmailChange = (event) => { 
        setEmail(event.target.value);
    }

    const handleadressChange = (event) => { 
        setAdr(event.target.value);
    }

    const handleRefChange = (event) => { 
        setRef(event.target.value);
    }

    const handleQuantChange = (event) => { 
        setQuant(event.target.value);
    }

     const handleDesgChange = (event) => { 
        setDesg(event.target.value);
    }

    const handleUHTChange = (event) => { 
        setUHT(event.target.value);
    }




    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
             Créer Bon de Commande
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
                    <TextField onChange={handleRefChange} value={Désignation} id="outlined-basic" label="Réference de Produit" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid >
                <Grid item xs={6}>
                    <TextField onChange={handleQuantChange} value={Quantity} id="outlined-basic" label="Quantité" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={7}>
                    <TextField onChange={handleDesgChange} value={Réference} id="outlined-basic" label="Désignation de Produit" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={5}>
                    <TextField onChange={handleUHTChange} value={PrixUHT} id="outlined-basic" label="Prix UHT" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleDateDChange} value={date} id="outlined-basic" label="Date" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleFourChange} value={Fournisseur} id="outlined-basic" label="Fournisseur" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleTeleChange} value={Tele} id="outlined-basic" label="Tele" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleEmailChange} value={Email} id="outlined-basic" label="Email" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleadressChange} value={adress} id="outlined-basic" label="Adresse" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5' align='center'>
                        <Button style={{marginLeft:60}} variant="contained" onClick={createUser}>
                            Creer BC
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />

        </>
    );
}

export default AddBC;









