import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Strings from '../res/Strings'
import './style.css';

const {
    delete_label,
    detail_title
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
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            backgroundColor: 'red',
        },
        marginBottom: '2vmin'
    }
};

function Detail(props) {
    const { classes, item, key, callBack } = props;
    const { data, bgColor, } = item;

    return (
        <Grid item xs={12} className='infoView' style={{ backgroundColor: bgColor }}>
            <h4 className='h4'>{detail_title}</h4>
            <p className='p1'>{data}</p>
            <Button
                variant="contained"
                className={classes.buttonStyle}
                onClick={callBack}>
                {delete_label}
            </Button>
        </Grid>
    );
}

export default withStyles(styles)(Detail);
