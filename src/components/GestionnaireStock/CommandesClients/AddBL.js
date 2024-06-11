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

    
const AddBL = ({fid, CloseEvent, commandeId, commandeQuantity }) => {

    const [DateD, setDateD] = useState('');
    const [Client, setClient] = useState('');
    const [Mobile, setTele] = useState();
    const [Email, setEmail] = useState();
    const [adress, setAdr] = useState();
    const [commandeIdValue, setCommandeIdValue] = useState(commandeId);
    const [commandeQuantityValue, setCommandeQuantityValue] = useState(commandeQuantity);
    //const [rows, setRows] = useState([]);
    const setRows = useAppStore((state) => state.setRows);


    const empCollectionRef = collection(db, "Commandes");


    useEffect(() => {
        console.log(fid.NCommande);
        console.log(fid.Client);
        setClient(fid.Client);
        setDateD(fid.DateD);
        setEmail(fid.Email );
        setTele(fid.Mobile);
        setAdr(fid.adress);
        setCommandeIdValue(fid.Commande.map((item) => item.id));
        setCommandeQuantityValue(fid.Commande.map((item) => item.quantity));
        
    }, []);
    


    const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

    const generateBLReference = () => {
    const prefix = "BL";
    const currentDate = new Date();
    const uniqueId = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    
    const reference = `${prefix}-${year}${month}${day}-${uniqueId}`;
    return reference;
    };





        /*const getDesignation = async (reference) => {
        const produitsRef = collection(db, "Produits");
        const querySnapshot = await getDocs(query(produitsRef, where("Réference", "==", reference.join())));

        if (querySnapshot.empty) {
            console.log("No matching documents found");
            console.log(reference.join());
            return null;
        }

        const docData = querySnapshot.docs[0].data();
        const designation = docData.Désignation;
        return designation;
        };*/
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
        /*await addDoc(collection(db, "BL"), {
            Réference: commandeIdValue,
            Quantity: commandeQuantityValue,
            Désignation: "productDesignations",
            Client: Client,
            DateD: DateD,
            Email: Email,
            Tele: Mobile,
            adress: adress,
            NBL:(generateBLReference()).toString(),
           
        });
        getUsers();
        CloseEvent();
        Swal.fire('Enregistrer avec succés!');*/
        const designation = await getDesignations(commandeIdValue);
        if (designation) {
        await addDoc(collection(db, "BL"), {
            Réference: commandeIdValue,
            Quantity: commandeQuantityValue,
            Désignation: designation,
            Client: Client,
            DateD: DateD,
            Email: Email,
            Tele: Mobile,
            adress: adress,
            NBL: generateBLReference().toString(),
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

    




    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
             Créer Bon de Livraison
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
                        <Button style={{marginLeft:60}} variant="contained" onClick={createUser}>
                            Creer BL
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />

        </>
    );
}

export default AddBL;








