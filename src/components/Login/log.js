import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './log.css';
import imag from "../assets/welcome.jpg";
import { auth } from '../../firebase.config'; // Importez l'instance d'authentification Firebase
import MuiAlert from '@mui/material/Alert';// Importez le module firebase/app
import 'firebase/auth';
import { signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const [resetPassword, setResetPassword] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbaropen, setSnackbaropen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
  signInWithEmailAndPassword(auth,username, password)
    .then((userCredential) => {
      // L'utilisateur est connecté avec succès
      const user = userCredential.user;
      console.log(user);
      
      // Rediriger l'utilisateur vers la page appropriée en fonction du rôle
      if (user.email === "ismail.drief-etu@etu.univh2c.ma") {
        navigate("/Stock");
      } else if (user.email === "imadnifdal99@gmail.com") {
        navigate("/AStock");
      } else {
        console.log("Identifiants invalides");
        setErrorMessage("Mot de passe ou email incorrect");
      }
    })
    .catch((error) => {
      // Une erreur s'est produite
      console.error(error);
      setErrorMessage("Mot de passe ou email incorrect");
    });
  };
  

  const handleForgotPassword = (e) => {
  e.preventDefault();
  
  sendPasswordResetEmail(auth,username)
    .then(() => {
      console.log("Email de réinitialisation du mot de passe envoyé");
      setResetPasswordError("Email de réinitialisation du mot de passe envoyé");
      setSnackbaropen(true);
    })
    .catch((error) => {
      console.error(error);
        setResetPasswordError(error.message);
       setSnackbarOpen(true);
    });
  };
  

const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};


  return (
    
    <div className="login-container">
      <Snackbar style={{}} open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose} >
      <MuiAlert severity="warning" sx ={{}} >
        Vous n'avez pas entre votre email pour vous envoyé le lien de réinitialisation de mot de passe--{resetPasswordError}--
      </MuiAlert>
      </Snackbar>
      <Snackbar style={{}} open={snackbaropen} autoHideDuration={5000} onClose={handleSnackbarClose} >
      <MuiAlert severity="success" sx ={{}} >
        Email de réinitialisation du mot de passe envoyé{resetPassword}
      </MuiAlert>
    </Snackbar>
      <div className="card" style={{display:'flex'}}>
        <div className="left-half">
          <h2 style={{color:'#fff'}}> Bonjour ! </h2>
          <h6 style={{marginRight:120}}> Adresse Email </h6>
        <input
          type="text"
          placeholder="Entre Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
          
           <h6 style={{marginRight:120}}> Mot de passe </h6>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <a href='' style={{fontSize:10,textDecoration:'underline',marginLeft:120,color:'#fff'}} onClick={handleForgotPassword}>Mot de passe oublier? </a>
        <br />
          <button onClick={handleLogin}>Login</button> 
          
          {errorMessage && <p style={{
            color: 'red',
            fontSize:12
          }}>{errorMessage}</p>}
      </div>
        <div className="right-half" style={{flexDirection:'column'}}>
          <h2 style={{ color:'blue',marginBottom:20,textAlign:'center' }}>Login pour Commencer! </h2>
        <img src={imag} alt="welcome" />
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
