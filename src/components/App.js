import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const style = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#008000'
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: 2,
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: '#D3D3D3'
  },
  button: {
    color: '#008000',
    marginRight: 13,
    float: 'right'
  },
  table: {
    border: '0px',
    padding: 0
  },
  text: {
    backgroundColor: '#DB7093',
    margin: 6
  },
  container: {
    marginTop: '6%'
  }
};

export default class App extends React.Component {

  state = {
    clientResult: [] // set the state as empty initally
  };

  //fetch the data from mock-server and set state of the data
  componentDidMount() {
    fetch(`http://localhost:3000/clients/12345678`)
      .then(res => res.json())
      .then(data => this.setState({ clientResult: data }))
      .catch((error) => { console.log('Error', error) });
  }

  render() {
    const { clientResult } = this.state;

    const refUrl = 'javascript:;';

    // pick the values of every required data from the updated result of client data
    let name = clientResult && clientResult.clientName;
    let invoiceAccount = clientResult && clientResult.invoiceAccount;
    let clientAddress = clientResult && clientResult.clientAddress;

    return (
      <div className="App">
        <div className="container">
          <AppBar style={style.appBar}>
            <Container maxWidth="lg">
              <Toolbar>
                <IconButton edge="start" style={style.homeButton} color="inherit">
                  <HomeIcon />
                </IconButton>
                <Divider orientation="vertical" />
                <Typography variant="h6" style={style.title}>
                  Accounts and Balances
           </Typography>
                <Divider orientation="vertical" />
                <Typography variant="h6" style={style.title}>
                  Manage Payments
           </Typography>
                <Divider orientation="vertical" />
                <Typography variant="h6" style={style.title}>
                  Audit
           </Typography>
              </Toolbar>
            </Container>
          </AppBar>
          <Container maxWidth="lg" style={style.container}>
            <h1>Client Summary</h1>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <h4>Client details</h4>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={style.table}><h4>Client Id:</h4></TableCell>
                      <TableCell style={style.table}>{clientResult.client_id}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={style.table}><h4>Client Name:</h4></TableCell>
                      <TableCell style={style.table}>{clientResult.clientName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={style.table}><h4>Client status:</h4></TableCell>
                      <TableCell style={style.table}>{clientResult.status}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={style.table}><h4>Password valid for:</h4></TableCell>
                      <TableCell style={style.table}>{clientResult.passwordExpiryPeriod}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={style.table}><h4>Active from:</h4></TableCell>
                      <TableCell style={style.table}>{clientResult.activeFrom}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={6}>
                <h4>Primary Contact</h4>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={style.table}><h4>Name:</h4></TableCell>
                      <TableCell style={style.table}>{name}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={style.table}><h4>UserName:</h4></TableCell>
                      <TableCell style={style.table}>{name && name.toUpperCase()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={style.table}><h4>Client Address:</h4></TableCell>
                      <TableCell style={style.table}>{clientAddress && clientAddress.firstLine} <br />
                        {clientAddress && clientAddress.secondLine} <br />
                        {clientAddress && clientAddress.city}<br />
                        {clientAddress && clientAddress.postcode}<br />
                        {clientAddress && clientAddress.country}<br />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            <Paper style={style.paper}>
              <Table>
                <TableHead style={{borderTop:'5px solid #008000'}}>
                  <TableRow>
                    <TableCell><h3>Invoice Details</h3></TableCell>
                    <TableCell>
                      <Link href={refUrl} style={{ float: 'right', color: '#008000' }}>
                        What are the sort code and account number used for?
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow style={style.tableRow}>
                    <TableCell>Invoice sort code:</TableCell>
                    <TableCell>{invoiceAccount && invoiceAccount.sortCode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Invoice account number:</TableCell>
                    <TableCell>{invoiceAccount && invoiceAccount.accountNumber}</TableCell>
                  </TableRow>
                  <TableRow style={style.tableRow}>
                    <TableCell>Invoice account currency:</TableCell>
                    <TableCell>{invoiceAccount && invoiceAccount.currency}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Invoice account status:</TableCell>
                    <TableCell>
                      <span style={style.text}>Terminated</span>
                      {/* <Button variant="contained" color="secondary">
                        Terminated
                    </Button> */}
                      <br />
                      Please contact your Relationship Manager. Your invoice account is not active</TableCell>
                  </TableRow>
                  <TableRow style={style.tableRow}>
                    <TableCell>Invoice account contact:</TableCell>
                    <TableCell>{clientAddress && clientAddress.firstLine}<br/>
                      {clientAddress && clientAddress.secondLine} <br />
                      {clientAddress && clientAddress.city}<br />
                      {clientAddress && clientAddress.postcode}<br />
                      {clientAddress && clientAddress.country}<br />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" style={style.button}>
                    Edit Details
              </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </div>
      </div>
    );
  }
}
