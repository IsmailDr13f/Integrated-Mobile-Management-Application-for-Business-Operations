import { Document, Page, View, Text, StyleSheet,Image } from '@react-pdf/renderer';
import logo from '../assets/SMCV-PARTNER_Plan-de-travail-1-1.png';
import React, { useEffect, useRef, useState } from 'react';




const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      borderWidth: 1,
      borderColor: "black",
    padding: 10,
  },
    address: {
      marginTop: 50,
    marginBottom: 30,
  },
    infoSection: {
      fontSize: 12,
    marginBottom: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  productTable: {
    marginBottom: 20,
    borderWidth: 1,
    borderTopColor: 'black',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeaderCell: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  tableCell: {
    fontSize: 10,
    flex: 1,
    margin: 0,
    textAlign: 'center',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    padding:10,
  },
  signature: {
    marginTop: 20,
    },
  rightText: {
    //textAlign: 'right',
    fontSize: 12,
    marginBottom: 20,
    marginLeft:330
    },
    qrCodeContainer: {
    //alignSelf: 'center',
    //marginTop: 20,
    },
    bottomText: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    fontSize: 10,
    textAlign: 'center',
    position: 'absolute',
    bottom:10,
    left: 0,
    right: 0,
    
  },
  logo: {
    width: 90,
    height: 60,
    margin: 5,
    },
  qrCodeContainer: {
    width: 170,
    height: 70,
    borderColor: 'black',
    borderWidth:1,
    position: 'absolute',
      bottom: 50,
      left: 20,
      borderRadius: 10,
      justifyContent: 'center',
    alignItems: 'center',
  },
});

const BCPDF = ({ bon }) => {
    
    
        
  return (
    <Document>
      <Page>
              <View style={styles.container}>
                  <Image style={styles.logo} src={logo} />
                  
          <Text style={styles.title}>Bon de Commande: {bon.NBC}</Text>
          <View style={styles.infoSection}>
            <Text style={styles.address}>
              <Text style={{fontSize:15,fontWeight:'bold'}}>Société Marocaine des Compteurs-SMCV</Text> {"\n"}
              Boulevard du cadi tazi - BP.99, Mohammédia 20880{"\n"}
              05233-10684
            </Text>
            <Text style={styles.rightText}>
                <Text style={{textAlign:'left'}}>
                    Fournisseur: {bon.Fournisseur}{"\n"}
                    Adresse: {bon.adress}{"\n"}
                    Email: {bon.Email}{"\n"}
                    Télé: {bon.Tele}
                </Text>
              
            </Text>
          </View>
          <View style={styles.productTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Référence</Text>
              <Text style={styles.tableHeaderCell}>Désignation</Text>
              <Text style={styles.tableHeaderCell}>Unité</Text>
                <Text style={styles.tableHeaderCell}>Quantité</Text>
                <Text style={styles.tableHeaderCell}>Prix UHT</Text>
              <Text style={styles.tableHeaderCell}>Prix THT</Text>
            </View>
            
              <View style={styles.tableRow} >
                <Text style={styles.tableCell}>{bon.Réference}</Text>
                <Text style={styles.tableCell}>{bon.Désignation}</Text>
                <Text style={styles.tableCell}>U</Text>
                <Text style={styles.tableCell}>{bon.Quantity}</Text>
                <Text style={styles.tableCell}>{bon.PrixUHT}</Text>
                <Text style={styles.tableCell}>{bon.PrixUHT*bon.Quantity}</Text>
              </View>
          
          </View>
          <Text style={{fontSize:12,fontWeight:'bold',marginLeft:20,marginBottom:10,marginTop:0}}>Adresse: {bon.adress}</Text>
          <Text style={{fontSize:12,fontWeight:'bold',marginLeft:20}}>Date de livraison: {bon.Date}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold',marginTop:30, marginRight:30,marginBottom:10,marginLeft:20, }}>Cachet et signature </Text>
                  <View style={{
                      borderWidth: 1,
                      height: 90,
                      width: 170,
                      marginLeft: 340,
                      marginBottom: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                  }}>
                      <View style={{flexDirection:'row',borderBottomColor:'black',borderBottomWidth:1,width:170,height:30}}>
                          <Text style={{marginLeft:10,justifyContent: 'center',alignItems: 'center',fontSize:12, textAlign:'center',borderRightColor:'black',borderRightWidth:1,width:85,}}>Prix HT (DHs)</Text>
                          <Text style={{marginLeft:10,justifyContent: 'center',alignItems: 'center',fontSize:12, textAlign:'center'}}>{bon.PrixUHT*bon.Quantity}</Text>
                      </View>
                      <View style={{flexDirection:'row',borderBottomColor:'black',borderBottomWidth:1,width:170,height:30}}>
                          <Text style={{marginLeft:10,justifyContent: 'center',alignItems: 'center',fontSize:12, textAlign:'center',borderRightColor:'black',borderRightWidth:1,width:85}}>TVA XX.XX% (DHs)</Text>
                          <Text style={{marginLeft:10,justifyContent: 'center',alignItems: 'center',fontSize:12, textAlign:'center'}}> </Text>
                      </View>
                      <View style={{flexDirection:'row',borderBottomColor:'black',borderBottomWidth:1,width:170,height:30}}>
                          <Text style={{marginLeft:10,justifyContent: 'center',alignItems: 'center',fontSize:12, textAlign:'center',borderRightColor:'black',borderRightWidth:1,width:85}}>Total (DHs)</Text>
                          <Text style={{marginLeft:10,justifyContent: 'center',alignItems: 'center',fontSize:12, textAlign:'center'}}>{bon.PrixUHT*bon.Quantity}</Text>
                      </View>
                      
                </View>
                    <View style={styles.qrCodeContainer}>
                      <Text style={{fontSize:13,color:"gray",textAlign:'center'}}>Elect-Sign:{bon.id} </Text>
                    </View>
                  <Text style={styles.bottomText}>
                        Société Marocaine des Compteurs-SMCV, Boulevard du cadi tazi - BP.99,{"\n"} Mohammédia 20880--05233-10684--
                    </Text>
        </View>
      </Page>
    </Document>
  );
};

export default BCPDF;

