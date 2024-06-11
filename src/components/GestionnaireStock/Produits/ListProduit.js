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
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import AjouterProduit from './AjouterProduit';
import EditProduit from './EditProduit';
import { useAppStore } from '../../../appStore';


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


/*const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 80 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];*/

/*function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}*/

/*const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];*/

export default function ListProduit() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //const [rows, setRows] = useState([]);
    const setRows = useAppStore((state) => state.setRows);
    const rows = useAppStore((state) => state.rows);
    const empCollectionRef = collection(db, "Produits");
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
    const userDoc = doc(db, "Produits", id);
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

    const editData = (id, Réference, PrixUHT, Quantity, Désignation) => {
        const data = {
            id: id,
            Réference: Réference,
            PrixUHT: PrixUHT,
            Quantity:Quantity,
            Désignation:Désignation,
        };
    setFormid(data);
    handleEditOpen();
    };
    
    return (

        <>
      <div>
      {/*<Button onClick={handleOpen}>Open modal</Button>*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/*<Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>*/}
              <AjouterProduit CloseEvent={handleClose} />
        </Box>
        </Modal>
        <Modal
        open={editopen}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/*<Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>*/}
            <EditProduit CloseEvent={handleEditClose} fid={formid} />
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
            Liste des Produits
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
                <TextField {...params} size="small" label="Chercher produit par Réf" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button onClick={handleOpen} style={{marginRight:30,width:'auto'}} variant="contained" endIcon={<AddCircleIcon />}>
              Ajouter produit
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
                  Désignation
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Quantité
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Prix UHT (DH)
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
                          {row.Désignation}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.Quantity}
                        </TableCell>
                        <TableCell key={row.id} align='left'>
                          {row.PrixUHT}
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
                              onClick={() => editData(row.id,row.Réference,row.Quantity,row.PrixUHT,row.Désignation)}
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
  );
}