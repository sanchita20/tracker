import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import Strings from './res/Strings'
import './App.css';
import Detail from './component/Detail';

const resp = {
  "state_id": "FL",
  "city_name": "Miami",
  "city_id": "Miami",
  "state_name": "Florida",
  "country_id": "US",
  "country_name": "United States",
  "file_url": "https://d4bx546bchh9w.cloudfront.net/node_download.pdf"
}

const {
  issueTracker,
  label,
  critical_label,
  norma_label,
  info_label,
  submit,
  alert_label
} = Strings;

const styles = {
  criticalStyle: {
    backgroundColor: 'red',
    padding: '0.5vmin',
    color: 'white'
  },
  normalStyle: {
    backgroundColor: 'green',
    padding: '0.5vmin',
    color: 'white'
  },
  infoStyle: {
    backgroundColor: 'gray',
    padding: '0.5vmin',
    color: 'white'
  },
  buttonStyle: {
    height: '5vmin',
    backgroundColor: 'green',
    color: 'white',
    marginTop: '2vmin',
    '&:hover': {
      backgroundColor: 'green',
    },
    marginBottom: '2vmin'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      selectedType: '',
      showInfo: 'false'
    }
    this.infoStack = []
  }

  componentDidMount = () => {
    const config = {
      headers: {
        // "Access-Control-Allow-Origin": 'http://localhost:3000',
        'Authorization': 'ZiPcoDeDetAiLs'
      }
    }

    axios.get(`http://lms.labyrinthelab.com/api/ws_get_zipcode_details.php`, { zipcode: 33186 }, config)
      .then(res => {
        console.log(res);
      })
  }

  onTextChange = (e) => {
    const { value } = e.target;
    this.setState({ inputText: value })
  }

  onTypeChange = (e) => {
    const { value } = e.target;
    this.setState({ selectedType: value })
  }

  getBgColor(type) {
    switch (type) {
      case critical_label:
        return 'red';
      case norma_label:
        return 'green';
      case info_label:
        return 'gray';
      default:
        return 'white';
    }
  }

  onSubmit = (data, type) => {
    this.infoStack.push({
      data,
      bgColor: this.getBgColor(type)
    });
    this.setState({ showInfo: true, inputText: '', selectedType: '' })
  }

  onDelete = (e) => {
    console.log(e.target.value);
  }

  createTable = () => {
    this.table = [];
    for (let [key, value] of Object.entries(resp)) {
      this.table.push({
        [key]: value
      })
    }

    return this.table.map((item, index) => {
      let key = Object.keys(item)[0]
      return (
        <tr key={Object.keys(item)[0]}>
          <td className='tableData'>{Object.keys(item)[0]}</td>
          <td className='tableData'>{item[key]}</td>
        </tr>
      )
    })
  }

  render() {
    const { classes } = this.props;
    const { inputText, selectedType, showInfo } = this.state;

    return (
      <div className="App">
        <Grid container className='gridContainer'>
          <Grid item xs={12}>
            <h1 className='h1'>{issueTracker}</h1>
            <p className='p'>{label}</p>
            <TextField
              id="outlined-basic"
              variant="outlined"
              multiline
              fullWidth
              onChange={(e) => this.onTextChange(e)}
            />
            <RadioGroup row aria-label="issue" name="issue1" onChange={(e) => this.onTypeChange(e)}>
              <FormControlLabel
                value={critical_label}
                control={<Radio color="black" />}
                label={critical_label}
                classes={{
                  label: classes.criticalStyle,
                }} />
              <FormControlLabel
                value={norma_label}
                control={<Radio color="black" />}
                label={norma_label}
                classes={{
                  label: classes.normalStyle,
                }} />
              <FormControlLabel
                value={info_label}
                control={<Radio color="black" />}
                label={info_label}
                classes={{
                  label: classes.infoStyle,
                }} />
            </RadioGroup>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className={classes.buttonStyle}
                fullWidth
                onClick={() => inputText !== '' && selectedType !== '' ? this.onSubmit(inputText, selectedType) : alert(alert_label)}>
                {submit}
              </Button>
            </Grid>
            {
              showInfo && this.infoStack.length > 0 && this.infoStack.map((item, index) => (
                <Detail item={item} callBack={this.onDelete} key={index} />
              ))
            }
          </Grid>
          <table>
            <tbody>
              {this.createTable()}
            </tbody>
          </table>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
