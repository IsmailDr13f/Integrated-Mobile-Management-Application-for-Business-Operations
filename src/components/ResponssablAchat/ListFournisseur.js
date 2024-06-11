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
import { db } from "../../firebase.config";
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
//import AjouterProduit from './AjouterProduit';
//import EditProduit from './EditProduit';
import { useAppStore } from '../../appStore';
import AjouterFournisseur from './AjouterFournisseur';
import EditFournisseur from './EditFournisseur';


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







function ListFournisseur() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //const [rows, setRows] = useState([]);
    const setRows = useAppStore((state) => state.setRows);
    const rows = useAppStore((state) => state.rows);
    const empCollectionRef = collection(db, "Fournisseurs");
    const [open, setOpen] = useState(false);
    const [editopen, setEditOpen] = useState (false);
    const [formid, setFormid] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = () => setEditOpen (true);
    const handleEditClose = () => setEditOpen(false);



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
    const userDoc = doc(db, "Fournisseurs", id);
    await deleteDoc(userDoc);
    Swal.fire("Supprimé !", "Le fournisseur a été supprimé.", "succès");
    getUsers();
    };
    
    const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
    };
    

    const editData = (id, Réference, Compte_collectif,
    Qualité,Abrégé,Adresse,Complément,Code_postale,Ville,Pays,Telephone,Email) => {
        const data = {
            id: id,
            Réference: Réference ,
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
        };
    setFormid(data);
    handleEditOpen();
    };
    

  return (
    <div>
      <>
      <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
            <AjouterFournisseur CloseEvent={handleClose} />
        </Box>
        </Modal>
        <Modal
        open={editopen}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
            <EditFournisseur CloseEvent={handleEditClose} fid={formid} />
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
            Liste des Fournisseurs
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
              getOptionLabel={(rows) => rows.Réference || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Chercher Fournisseur par Réf" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button onClick={handleOpen} style={{marginRight:30,width:'auto'}} variant="contained" endIcon={<AddCircleIcon />}>
              Ajouter Fournisseur
            </Button>
          </Stack>
          <Divider />
          <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Réference
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Abrégé
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Qualité
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Compte collectif
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Adresse
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Complément
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Code postale
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Ville
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Pays
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Telephone
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Email
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Modifier/supprimer
                </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >  
                        <TableCell key={row.id} align='left'>
                          {row.Réference}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Abrégé}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Qualité}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Compte_collectif}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Adresse}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Complément}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Code_postale}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Ville}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Pays}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Telephone}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Email}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                                    onClick={() => editData(row.id, row.Réference, row.Abrégé, row.Qualité, row.Compte_collectif, row.Adresse,
                                    row.Complément,row.Code_postale,row.Ville,row.Pays,row.Telephone,row.Email)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>

                  </TableRow>
                );
              })}
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
    </div>
  )
}

export default ListFournisseur
