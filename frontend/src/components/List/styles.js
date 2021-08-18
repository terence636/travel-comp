import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 115, marginBottom: '20px',
  },
  formControlRating: {
    margin: theme.spacing(1), minWidth: 70, marginBottom: '20px',
  },
  formControlLabel: {
    marginTop: '10px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '700px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px',
    backgroundColor: 'rgb(170,218,254)',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '80vh', overflow: 'auto',
  },
  join: {
    height: '65vh',
  },
}));