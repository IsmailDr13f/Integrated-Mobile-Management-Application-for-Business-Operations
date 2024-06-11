import { IconButton } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { db } from "../../../firebase.config";
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import Swal from 'sweetalert2';
import { useAppStore } from '../../../appStore';
import { query, where } from "firebase/firestore";

    
const AddFacture = ({fida, CloseEvent, commandeId, commandeQuantity,commandeUHT,commandeTHT}) => {

    const [DateD, setDateD] = useState('');
    const [Client, setClient] = useState('');
    const [Mobile, setTele] = useState();
    const [Email, setEmail] = useState();
    const [adress, setAdr] = useState();
    const [commandeIdValue, setCommandeIdValue] = useState(commandeId);
    const [commandeQuantityValue, setCommandeQuantityValue] = useState(commandeQuantity);
    const [commandeUHTValue, setCommandeUHTValue] = useState(commandeUHT);
    const [commandeTHTValue, setCommandeTHTValue] = useState(commandeTHT);
    //const [rows, setRows] = useState([]);
    const setRows = useAppStore((state) => state.setRows);
    const [isValidated, setIsValidated] = useState();

    const empCollectionRef = collection(db, "Commandes");


    useEffect(() => {
        console.log(fida.NCommande);
        console.log(fida.Client);
        setClient(fida.Client);
        setDateD(fida.DateD);
        setEmail(fida.Email );
        setTele(fida.Mobile);
        setAdr(fida.adress);
        setCommandeIdValue(fida.Commande.map((item) => item.id));
        setCommandeQuantityValue(fida.Commande.map((item) => item.quantity));
        setCommandeUHTValue(fida.Commande.map((item) => item.priceHT));
        setCommandeTHTValue(fida.Commande.map((item) => item.priceTHT));
        
    }, []);
    


    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

    const generateBLReference = () => {
    const prefix = "fact";
    const currentDate = new Date();
    const uniqueId = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    
    const reference = `${prefix}-${year}${month}${day}${uniqueId}`;
    return reference;
    };


        const getDesignations = async (references) => {
        const produitsRef = collection(db, "Produits");
        const designations = [];

        await Promise.all(
            references.map(async (reference) => {
            const querySnapshot = await getDocs(query(produitsRef, where("Réference", "==", reference)));

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data();
                const designation = docData.Désignation;
                designations.push(designation);
            }
            })
        );

        return designations;
        };




    const createUser = async() => { 
        const designation = await getDesignations(commandeIdValue);
        if (designation) {
        await addDoc(collection(db, "Factures"), {
            Réference: commandeIdValue,
            Quantity: commandeQuantityValue,
            PrixUHT: commandeUHTValue,
            PrixTHT: commandeTHTValue,
            Désignation: designation,
            Client: Client,
            DateD: DateD,
            Email: Email,
            Tele: Mobile,
            adress: adress,
            NFac: generateBLReference().toString(),
        });
        
        getUsers();
        CloseEvent();
        Swal.fire("Enregistrer avec succès!");
        } else {
            console.log("No matching designation found");
            console.log(commandeIdValue);
        }
    };

    const handleDateDChange = (event) => { 
        setDateD(event.target.value);
    }

    const handleClientChange = (event) => { 
        setClient(event.target.value);
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
        setCommandeIdValue(event.target.value);
    }

    const handleQuantChange = (event) => { 
        setCommandeQuantityValue(event.target.value);
    }

    const handleUHTChange = (event) => { 
        setCommandeUHTValue(event.target.value);
    }

    const handleTHTChange = (event) => { 
        setCommandeTHTValue(event.target.value);
    }





    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
             Créer Facture
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
                    <TextField onChange={handleRefChange} value={commandeIdValue} id="outlined-basic" label="Réference(s)" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid >
                <Grid item xs={6}>
                    <TextField onChange={handleQuantChange} value={commandeQuantityValue} id="outlined-basic" label="Quantité(s)" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={handleUHTChange} value={commandeUHTValue} id="outlined-basic" label="Prix(s) UHT" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid >
                <Grid item xs={6}>
                    <TextField onChange={handleTHTChange} value={commandeTHTValue} id="outlined-basic" label="Prix(s) THT" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleDateDChange} value={DateD} id="outlined-basic" label="Tele" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleClientChange} value={Client} id="outlined-basic" label="Client" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleTeleChange} value={Mobile} id="outlined-basic" label="Date de livraison" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleEmailChange} value={Email} id="outlined-basic" label="Email" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={handleadressChange} value={adress} id="outlined-basic" label="Adresse de livraison" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5' align='center'>
                        <Button  style={{marginLeft:60}} variant="contained" onClick={createUser}>
                            Créer Facture
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />

        </>
    );
}

export default AddFacture;








