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
import HomeStock from './HomeStock';
import DownloadIcon from '@mui/icons-material/Download';
import FacturePDF from './CommandesClients/FacturePDF';
import { PDFDownloadLink} from '@react-pdf/renderer';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Text } from 'react';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AddBR from './CommandesClients/AddBR';

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

export default function HomeFacture() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    //const setRows = useAppStore((state) => state.setRows);
    //const rows = useAppStore((state) => state.rows);
    const empCollectionRef = collection(db, "Factures");
    const [open, setOpen] = useState(false);
  const [BLopen, setBLOpen] = useState(false);
  const [BRopen, setBROpen] = useState (false);
  const [formid, setFormid] = useState("");
  const [formida, setFormida] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleBLOpen = () => setBLOpen (true);
    const handleBLClose = () => setBLOpen(false);
    const handleBROpen = () => setBROpen (true);
    const handleBRClose = () => setBROpen(false);
    const storage = getStorage();

    


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
    
    
    const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  };
const BRData = async(id, Client, Mobile, Email, DateD,adress,Commande,NFac,Ref) => {
        const data = {
          id: id,
          Ref: Ref,
            Client: Client,
            Mobile: Mobile,
            Email:Email,
            DateD: DateD,
            adress: adress,
            Commande: Commande,
            NFac: NFac,
            
        };
    setFormida(data);
    handleBROpen();
  };
    
    
    return (

        <>
           
      <Modal
        open={BRopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <AddBR CloseEvent={handleBRClose} fida={formida}/>
        </Box>
          </Modal>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Liste des Factures
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
                <TextField {...params} size="small" label="Chercher une facture par Nom de Client" />
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
                  N° Facture
                </TableCell>
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Client
                </TableCell>
                
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Tele
                </TableCell>
                
                <TableCell align='left' style={{ minWidth: '100px'}}>
                  Adresse email
                </TableCell>                
                <TableCell align='left' style={{ minWidth: '100px'}}>             
                    Télécharger et Ajouter au Storage                    
                </TableCell>            
                
            </TableRow>
          </TableHead>
          <TableBody>
                            {rows && rows.length > 0 ? (
                                rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rw) => {
                                        //const commandeContent = rw.Commande.map((item) => `[${item.id},${item.quantity}, ${item.priceHT},${item.priceTHT}]`).join(", ");
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} >
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.NFac}
                                                </TableCell>
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Client}
                                                </TableCell>
                                    
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.DateD}
                                                </TableCell>
    
                                                <TableCell key={rw.id} align='left'>
                                                    {rw.Email}
                                                </TableCell>
                                                
                                            <TableCell key={rw.id} align='left'>
                                              <PDFDownloadLink document={<FacturePDF bon={rw} />} fileName={rw.NFac+'.pdf'}>
                                              {({ blob, url, loading, error }) => {
                                                  const handleDownload = async () => {
                                                    if (!loading && blob) {
                                                      const storageRef = ref(storage, `factures/${rw.NFac}.pdf`);
                                                      try {
                                                        await uploadBytes(storageRef, blob);
                                                        console.log("PDF uploaded to Firebase Storage");
                                                      } catch (error) {
                                                        console.error("Error uploading PDF to Firebase Storage:", error);
                                                      }
                                                    }
                                                  };

                                                  return (
                                                    <DownloadIcon
                                                      style={{
                                                        fontSize: "20px",
                                                        color: "blue",
                                                        cursor: "pointer",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                      }}
                                                      className="cursor-pointer"
                                                      onClick={handleDownload}
                                                    /> 
                                                      
                                                  );
                                                }}

                                            </PDFDownloadLink>
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
