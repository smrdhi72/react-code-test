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
    // marginBottom: 2,
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: '#D3D3D3'
  },
  button: {
    color:'#008000',
    marginRight: 13
  }
};

export default class App extends React.Component {

  state = {
    clientResult: []
  };

  componentDidMount() {
    fetch(`http://localhost:3000/clients/12345678`)
      .then(res => res.json())
      .then(data => this.setState({ clientResult: data }))
      .catch((error) => { console.log('Error', error) });
  }

  render() {
    const { clientResult } = this.state;

    let name = clientResult && clientResult.clientName;
    let sortCode = clientResult && clientResult.invoiceAccount && clientResult.invoiceAccount.sortCode;
    let accountNumber = clientResult && clientResult.invoiceAccount && clientResult.invoiceAccount.accountNumber;
    let currency = clientResult && clientResult.invoiceAccount && clientResult.invoiceAccount.currency;
    let status = clientResult && clientResult.invoiceAccount && clientResult.invoiceAccount.accountStatus;
    let address = clientResult && clientResult.invoiceAccount && clientResult.clientAddress && clientResult.clientAddress.firstLine;

    let addressFirstLine = clientResult && clientResult.invoiceAccount && clientResult.clientAddress && clientResult.clientAddress.firstLine;
    let addressSecondLine = clientResult && clientResult.invoiceAccount && clientResult.clientAddress && clientResult.clientAddress.secondLine;
    let city = clientResult && clientResult.invoiceAccount && clientResult.clientAddress && clientResult.clientAddress.city;
    let country = clientResult && clientResult.invoiceAccount && clientResult.clientAddress && clientResult.clientAddress.country;
    let postcode = clientResult && clientResult.invoiceAccount && clientResult.clientAddress && clientResult.clientAddress.postcode;

    return (
      <div className="App">
        <div className="container">
          <AppBar style={style.appBar}>
            <Container maxWidth="lg">
              <Toolbar>
                <IconButton edge="start" style={style.homeButton} color="inherit" aria-label="home">
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
          <Container maxWidth="lg">
            <h1>Client Summary</h1>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <h4>Client details</h4>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><h4>Client Id:</h4></TableCell>
                      <TableCell>{clientResult.client_id}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><h4>Client Name:</h4></TableCell>
                      <TableCell>{clientResult.clientName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><h4>Client status:</h4></TableCell>
                      <TableCell>{clientResult.status}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><h4>Password valid for:</h4></TableCell>
                      <TableCell>{clientResult.passwordExpiryPeriod}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><h4>Active from:</h4></TableCell>
                      <TableCell>{clientResult.activeFrom}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={6}>
                <h4>Primary Contact</h4>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name:</TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>UserName:</TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Client Address:</TableCell>
                      <TableCell>{addressFirstLine} <br />
                        {addressSecondLine} <br />
                        {city}<br />
                        {postcode}<br />
                        {country}<br />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            <Paper style={style.paper}>
              <Table style = {{borderCollapse: 'collapse'}}>
                <TableHead>
                  <TableRow>
                    <TableCell><h3>Invoice Details</h3></TableCell>
                    <TableCell><a>What are the sort code and account number used for?</a></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow style={style.tableRow}>
                    <TableCell>Invoice sort code:</TableCell>
                    <TableCell>{sortCode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Invoice account number:</TableCell>
                    <TableCell>{accountNumber}</TableCell>
                  </TableRow>
                  <TableRow style={style.tableRow}>
                    <TableCell>Invoice account currency:</TableCell>
                    <TableCell>{currency}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Invoice account status:</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary">
                        Terminated
                    </Button>
                      <br />
                      Please contact your Relationship Manager. Your invoice account is not active</TableCell>
                  </TableRow>
                  <TableRow style={style.tableRow}>
                    <TableCell>Invoice account contact:</TableCell>
                    <TableCell>{address}</TableCell>
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
