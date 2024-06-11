/*import { Document, Page, View, Text } from '@react-pdf/renderer';




const BonLivraisonPDF = ({ bon }) => {
  return (
    <Document>
      <Page>
        <View>
                    <Text>Référence: {bon.NBL}</Text>
                    <Text>
                            Société Marocaine des Compteurs-SMCV  
                           boulevard du cadi tazi - BP.99, Mohammédia 20880
                            05233-10684
                    </Text>
                    <Text>
                      Client: {bon.Client} <br/>
                      Adresse: {bon.adress}<br/>
                      Email: {bon.Email}<br/>
                      Tele: {bon.DateD}<br/>
                  </Text>
                  <Text>
                      Réference: {bon.Réference} <br/>
                      Désignation: {bon.Désignation}<br/>
                      Unité:U<br/>
                      Quantité: {bon.Quantity}<br/>
                  </Text>
                  <Text>Adresse de livraison: {bon.adress} </Text>
                  <Text>Date de livraison: {bon.Tele}</Text>
                  <Text>cachet et signature</Text>
          
        </View>
      </Page>
    </Document>
  );
};

export default BonLivraisonPDF;*/

import QRCode from "react-qr-code";
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
        padding: 20,
      margin: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
      fontWeight: 'bold',
    textAlign: 'center',
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
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    textAlign:'center',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
    margin: 10,
    textAlign:'center',
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
});

const BonLivraisonPDF = ({ bon }) => {
    const qrCodeValue = `BL: ${bon.NBL}\nClient: ${bon.Client}\nDate: ${bon.DateD}`;
  return (
    <Document>
      <Page>
        <View style={styles.container}>
          <Text style={styles.title}>Bon de Livraison: {bon.NBL}</Text>
          <View style={styles.infoSection}>
            <Text style={styles.address}>
              <Text style={{fontSize:15,fontWeight:'bold'}}>Société Marocaine des Compteurs-SMCV</Text> {"\n"}
              Boulevard du cadi tazi - BP.99, Mohammédia 20880{"\n"}
              05233-10684
            </Text>
            <Text style={styles.rightText}>
                <Text style={{textAlign:'left'}}>
                    Client: {bon.Client}{"\n"}
                    Adresse: {bon.adress}{"\n"}
                    Email: {bon.Email}{"\n"}
                    Télé: {bon.DateD}
                </Text>
              
            </Text>
          </View>
          <View style={styles.productTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Référence</Text>
              <Text style={styles.tableHeaderCell}>Désignation</Text>
              <Text style={styles.tableHeaderCell}>Unité</Text>
              <Text style={styles.tableHeaderCell}>Quantité</Text>
            </View>
            {bon.Réference.map((ref, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{ref}</Text>
                <Text style={styles.tableCell}>{bon.Désignation[index]}</Text>
                <Text style={styles.tableCell}>U</Text>
                <Text style={styles.tableCell}>{bon.Quantity[index]}</Text>
              </View>
            ))}
          </View>
          <Text style={{fontSize:12,fontWeight:'bold',marginLeft:20,marginBottom:10,marginTop:30}}>Adresse de livraison: {bon.adress}</Text>
          <Text style={{fontSize:12,fontWeight:'bold',marginLeft:20}}>Date de livraison: {bon.Tele}</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: 'right',marginRight:30,marginBottom:10 }}>Cachet et signature de client</Text>
                  <View style={{
                      borderWidth: 2,
                      height: 100,
                      width: 170,
                      borderRadius: 10,
                      marginLeft:350,
                  }}>
                  </View>  
                  <View>
                    < QRCode value={qrCodeValue}/>
                </View>
                  <View style={{borderTopWidth:1,borderTopColor:'black',marginTop:120}}>
                      <Text style={{fontSize:10,textAlign:'center'}}>Société Marocaine des Compteurs-SMCV,Boulevard du cadi tazi - BP.99,{"\n"} Mohammédia 20880--05233-10684--</Text>
                  </View>
        </View>
      </Page>
    </Document>
  );
};

export default BonLivraisonPDF;
