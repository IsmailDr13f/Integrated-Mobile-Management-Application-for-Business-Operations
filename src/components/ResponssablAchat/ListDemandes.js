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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase.config";
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import { query, where } from "firebase/firestore";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Checkbox from "@mui/material/Checkbox";
import TaskIcon from '@mui/icons-material/Task';

import AddBC from './AddBC';





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

export default function ListDemande() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    //const setRows = useAppStore((state) => state.setRows);
    //const rows = useAppStore((state) => state.rows);
    const empCollectionRef = collection(db, "DemmandeD");
    const [open, setOpen] = useState(false);
    const [BLopen, setBLOpen] = useState (false);
    const [formid, setFormid] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleBLOpen = () => setBLOpen (true);
    const handleBLClose = () => setBLOpen(false);
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

    const BLData = async(id, Désignation, Réference, Quantity) => {
        const data = {
            id: id,
            Désignation: Désignation,
            Réference: Réference,
            Quantity:Quantity,
            
        };
    setFormid(data);
    handleBLOpen();
  };
  


  const handleLivreeChange = async (event, id) => {
  const updatedLivreeState = { ...livreeState, [id]: event.target.checked };
  setLivreeState(updatedLivreeState);
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
            <AddBC CloseEvent={handleBLClose} fid={formid}/>
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
            Liste des Demandes
          </Typography>
          <Divider />
          {/*<Box height={10} />
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
          <Divider />*/}
          <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Réference de Produit demander
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Désignation
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Quantité requise 
                </TableCell>  
                <TableCell align='left' style={{ minWidth: '100px'}}>             
                  Créer BC                    
                </TableCell>            
               
            </TableRow>
          </TableHead>
          <TableBody>
                            {rows && rows.length > 0 ? (
                                rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rw) => {
                                        
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} >
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Réference}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Désignation}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Quantity}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    <AddCircleOutlineIcon style={{fontSize: "20px",color: "blue",cursor: "pointer",}} className="cursor-pointer"
                                                        onClick={() => BLData(rw.id, rw.Réference, rw.Désignation, rw.Quantity)} />
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