import { IconButton } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { db } from "../../firebase.config";
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';
    
const AjouterFournisseur = ({ CloseEvent }) => {

    const [Réference, setRef] = useState("");
    const [Abrégé, setAbr] = useState("");
    const [Qualité, setQual] = useState(0);
    const [Compte_collectif, setComCol] = useState();
    const [Adresse, setAdr] = useState();
    const [Complément, setComp] = useState();
    const [Code_postale, setCoPo] = useState();
    const [Ville, setVille] = useState();
    const [Pays, setPays] = useState();
    const [Telephone, setTele] = useState();
    const [Email, setEmail] = useState();
    const setRows = useAppStore((state) => state.setRows);


    const empCollectionRef = collection(db, "Fournisseurs");

    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

    const generateReference = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let reference = "F-";
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        reference += characters[randomIndex];
    }
    return reference;
    };



    const createUser = async () => { 
        const reference = generateReference();
        await addDoc(empCollectionRef, {
            Réference: reference ,
            Compte_collectif: Compte_collectif,
            Qualité: Qualité,
            Abrégé: Abrégé,
            Adresse: Adresse,
            Complément: Complément || "",
            Code_postale: Code_postale || "",
            Ville: Ville,
            Pays: Pays,
            Telephone: Telephone,
            Email:Email || "",
        });
        getUsers();
        CloseEvent();
        Swal.fire('Enregistrer avec succés!');
    };

    const handleRefChange = (event) => { 
        setRef(event.target.value);
    }

    const handleAbrChange = (event) => { 
        setAbr(event.target.value);
    }

    const handleQualChange = (event) => { 
        setQual(event.target.value);
    }

    const handleComColChange = (event) => { 
        setComCol(event.target.value);
    }

    const handleAdrChange = (event) => { 
        setAdr(event.target.value);
    }

    const handleCompChange = (event) => { 
        setComp(event.target.value);
    }

    const handleCoPoChange = (event) => { 
        setCoPo(event.target.value);
    }

    const handleVilleChange = (event) => { 
        setVille(event.target.value);
    }

    const handlePaysChange = (event) => { 
        setPays(event.target.value);
    }

    const handleTeleChange = (event) => { 
        setTele(event.target.value);
    }

    const handleEmailChange = (event) => { 
        setEmail(event.target.value);
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
                {/*<Grid item xs={6}>
                    <TextField onChange={handleRefChange} value={Réference} id="outlined-basic" label="Réference" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
    </Grid>*/}
                <Grid item xs={12}>
                    <TextField onChange={handleQualChange} value={Qualité} id="outlined-basic" label="Qualité" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleAbrChange}  value={Abrégé} id="outlined-basic" label="Abrégé" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField  onChange={handleComColChange} value={Compte_collectif} id="outlined-basic" label="Complément collectif" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField  onChange={handleAdrChange} value={Adresse} id="outlined-basic" label="Adresse" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField  onChange={handleCompChange } value={Complément} id="outlined-basic" label="Complément" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type='number' onChange={handleCoPoChange} value={Code_postale} id="outlined-basic" label="Code Postale" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField  onChange={handleVilleChange } value={Ville} id="outlined-basic" label="Ville" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField  onChange={handlePaysChange } value={Pays} id="outlined-basic" label="Pays" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type='number' onChange={handleTeleChange } value={Telephone} id="outlined-basic" label="Telephone" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField  onChange={handleEmailChange  } value={Email} id="outlined-basic" label="Email" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5' align='center'>
                        <Button style={{marginLeft:60}} variant="contained" onClick={createUser}>
                            Ajouter Fournisseur
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />

        </>
    );
}

export default AjouterFournisseur;
