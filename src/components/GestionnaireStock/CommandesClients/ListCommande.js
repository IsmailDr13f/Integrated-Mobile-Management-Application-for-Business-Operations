import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Divider from "@mui/material/Divider";
import { useState, useEffect } from 'react';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../../firebase.config";
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,getDoc} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import EditProduit from './EditProduit';
import { useAppStore } from '../../../appStore';
import AddBL from './AddBL';
import { query, where } from "firebase/firestore";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Checkbox from "@mui/material/Checkbox";
import TaskIcon from '@mui/icons-material/Task';
import AddFacture from './AddFacture';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ListCommande() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    //const setRows = useAppStore((state) => state.setRows);
    //const rows = useAppStore((state) => state.rows);
    const empCollectionRef = collection(db, "Commandes");
    const [open, setOpen] = useState(false);
  const [BLopen, setBLOpen] = useState(false);
  const [Factopen, setFactOpen] = useState (false);
  const [formid, setFormid] = useState("");
  const [formida, setFormida] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const handleBLOpen = () => setBLOpen(true);
  const handleFactOpen = () => setFactOpen (true);
  const handleBLClose = () => setBLOpen(false);
  const handleFactClose = () => setFactOpen(false);
    const [livreeState, setLivreeState] = useState({});

    


  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
    
    
    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };
    const deleteUser = (id) => {
    Swal.fire({
      title: "êtes-Vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
        confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
    };
    const deleteApi = async (id) => {
    const userDoc = doc(db, "Commandes", id);
    await deleteDoc(userDoc);
    Swal.fire("Supprimé !", "Votre Produit a été supprimé.", "succès");
    getUsers();
    };
    
    const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  };

    const BLData = async(id, Client, Mobile, Email, DateD,adress,Commande,NCommande,Ref) => {
        const data = {
            id: id,
            Client: Client,
            Mobile: Mobile,
            Email:Email,
            DateD: DateD,
            adress: adress,
            Commande: Commande,
            NCommande: NCommande,
            Ref: Ref,
        };
    setFormid(data);
    handleBLOpen();
  };
  


  const FactData = async(id, Client, Mobile, Email, DateD,adress,Commande,NCommande,Ref) => {
        const data = {
            id: id,
            Client: Client,
            Mobile: Mobile,
            Email:Email,
            DateD: DateD,
            adress: adress,
            Commande: Commande,
            NCommande: NCommande,
            Ref: Ref,
        };
    setFormida(data);
    handleFactOpen();
  };


const handleLivreeChange = async (event, id) => {
  const updatedLivreeState = { ...livreeState, [id]: event.target.checked };
  setLivreeState(updatedLivreeState);

  // Update the corresponding "État" value in the database
  const commandeDocRef = doc(db, "Commandes", id);
  try {
    await updateDoc(commandeDocRef, {
      Ref: event.target.checked ? "Validé" : "en Cours...",
    });
    console.log("État value updated in the database");

    // Update the stock quantity of ordered products
    if (event.target.checked) {
      const commandeSnapshot = await getDoc(commandeDocRef);
      const commande = commandeSnapshot.data();
      const products = commande.Commande;

      for (const product of products) {
        // Get the product document reference using the 'id' field
        const productQuery = query(collection(db, "Produits"), where("Réference", "==", product.id));
        const productQuerySnapshot = await getDocs(productQuery);

        if (!productQuerySnapshot.empty) {
          const productDocRef = productQuerySnapshot.docs[0].ref;

          // Get the current stock quantity
          const productSnapshot = await getDoc(productDocRef);

          if (productSnapshot.exists()) {
            const currentQuantity = parseInt(productSnapshot.data().Quantity);

            // Get the ordered quantity
            const orderedQuantity = parseInt(product.quantity);

            // Calculate the new stock quantity
            const newQuantity = currentQuantity - orderedQuantity;

            // Update the stock quantity in the database
            await updateDoc(productDocRef, { Quantity: String(newQuantity) });
          } else {
            console.error(`Product with ID ${product.id} not found or Quantity field missing.`);
          }
        } else {
          console.error(`Product with ID ${product.id} not found.`);
        }
      }

      console.log("Stock quantities updated in the database");
    }
  } catch (error) {
    console.error("Error updating État value:", error);
  }
};

    
    return (

        <>
      <div>
      
      <Modal
        open={BLopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <AddBL CloseEvent={handleBLClose} fid={formid}/>
        </Box>
          </Modal>
          <Modal
        open={Factopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <AddFacture CloseEvent={handleFactClose} fida={formida}/>
        </Box>
    </Modal>
    </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Liste des Commandes
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack style={{marginBottom:15}} direction="row" spacing={2} className="my-2 mb-2">
              <Autocomplete
                  style={{marginLeft: 30,width:600
                }}
              disablePortal
              id="combo-box-demo"
              options={rows}
            sx={{ width: 300 }}
                popupIcon={false}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.Client || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Chercher une Commande par Nom de Client" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
                    
             </Stack >
          <Divider />
          <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  N° Commande
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Client
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Commande
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Date de Livraison
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Tele
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Email
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Adresse de Livraison
                </TableCell>                
                <TableCell align='left' style={{ minWidth: '100px'}}>             
                  Créer BL                     
                </TableCell>            
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Êtat 
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Livrée 
                  </TableCell>
                  <TableCell align='left' style={{ minWidth: '100px'}}>             
                    Génerer facture          
                </TableCell>  
            </TableRow>
          </TableHead>
          <TableBody>
                            {rows && rows.length > 0 ? (
                                rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rw) => {
                                        const commandeContent = rw.Commande.map((item) => `[${item.id},${item.quantity}, ${item.priceHT},${item.priceTHT}]`).join(", ");
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} >
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.NCommande}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Client}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {commandeContent}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.DateD}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Mobile}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Email}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.adress}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    <AddCircleOutlineIcon style={{fontSize: "20px",color: "blue",cursor: "pointer",}} className="cursor-pointer"
                                                        onClick={() => BLData(rw.id, rw.Client, rw.DateD, rw.Email,rw.Mobile,rw.adress,rw.Commande,rw.NCommande,rw.productDesignations,rw.Ref)} />
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Ref}
                                                </TableCell>
                                                <TableCell key={rw.id} align="left">
                                                  <Checkbox
                                                    checked={livreeState[rw.id] || false}
                                                    onChange={(event) => handleLivreeChange(event, rw.id)}
                                                    color="primary"
                                                  />
                                            </TableCell>
                                            <TableCell key={rw.id} align='left'>
                                                    <TaskIcon style={{fontSize: "20px",color: "blue",cursor: "pointer",}} className="cursor-pointer"
                                                        onClick={() => FactData(rw.id, rw.Client, rw.DateD, rw.Email,rw.Mobile,rw.adress,rw.Commande,rw.NCommande,rw.productDesignations,rw.Ref)} />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })) : (
                                <TableRow>
                                    <TableCell colSpan={9}>Loading...</TableCell>
                                </TableRow>
                            )}
              
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </Paper>
        
    </>
  );
}