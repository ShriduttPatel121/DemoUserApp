import React from 'react';
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles({
    loader :{
        fontSize: '10px',
        margin: '50px auto',
        textIndent: '-9999em',
        width: '11em',
        height: '11em',
        borderRadius: '50%',
        fallbacks: 
            [{background: '#0026c6'},{background: '-moz-linear-gradient(left, #0026c6 10%, rgba(0,38,198, 0) 42%)'},{background: '-webkit-linear-gradient(left, #0026c6 10%, rgba(0,38,198, 0) 42%)'},{background: 'linear-gradient(to right, #0026c6 10%, rgba(0,38,198, 0) 42%)'}]
          ,
        position: 'relative',
        animation: '$load3 1.4s infinite linear',
        transform: 'translateZ(0)',
        '&:before' :{
            content: '""',
            width: '50%',
            height: '50%',
            background: props => props.bColor,
            borderRadius: '100% 0 0 0',
            position: 'absolute',
            top: '0',
            left: '0',
          },
          '&:after' :{
            content: '""',
            background: props => props.bColor,
            width: '75%',
            height: '75%',
            borderRadius: '50%',
            margin: 'auto',
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
          },
      },
      '@keyframes load3':{
        '0%' : {
          transform: 'rotate(0deg)',
        },
        '100%' :{
          transform: 'rotate(360deg)',
        }
      }
      
});
const Spinner =  (props) =>{
    const clas = useStyles(props)
    return(<div className={clas.loader}></div>);
};
Spinner.defaultProps = {
    bColor : 'white',
    sColor : '#0026c6'
}
export default Spinner;