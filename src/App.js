import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import {CSSTransition} from 'react-transition-group';

import CircularSlider from '@fseehawer/react-circular-slider';
import {prefixes, suffixes, library} from './l/index.js'
function valuetext(value) {
  return `${value}°`;
}

function Linear(props) {

  const [value, setValue] = useState([20]);
  const [calc, setCalc] = useState(0)


    useEffect(() => {
      setTimeout(() => {
        document.getElementsByClassName('MuiSlider-track css-1gv0vcd-MuiSlider-track')[0].style.color = 'transparent'
        document.getElementsByClassName('css-eg0mwd-MuiSlider-thumb')[0].style.width = 0
        document.getElementsByClassName('MuiSlider-rail css-14pt78w-MuiSlider-rail')[0].style.opacity = 1
      }, 0)
      
    })

    const handleChange = (event, newValue) => {
      console.log('newValue')
      console.log(newValue)
      setValue(newValue);
      props.setMood(newValue)
      // setTimeout(() => { // good use of mobx here
        // trigger useState update
        // alert(newValue)
      // }, 1000)
    };
  return (
    <div className="App">
      <Box  style={{paddingLeft: '560px', paddingTop: '300px'}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <p>{Math.round(calc)}</p>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <p>♦</p>
        </Grid>
        <Grid item xs={1}>
          <p onDoubleClick = {
              () => {
                props.type == '☉'
                ?
                  props.setType('-')
                :
                  props.setType('☉')
              }
            
          }>☉</p>

        </Grid>
        <Grid item xs={1}>
          <p>⚘</p>

        </Grid>
        <Grid item xs={1}>
          <p>🜂</p>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <p>7</p>
        </Grid>
        <Grid item xs={1}>
          <p>8</p>

        </Grid>
        <Grid item xs={1}>
          <p>9</p>

        </Grid>
        <Grid item xs={1}>
          <p>🜁</p>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <p>4</p>
        </Grid>
        <Grid item xs={1}>
          <p>5</p>

        </Grid>
        <Grid item xs={1}>
          <p>6</p>

        </Grid>
        <Grid item xs={1}>
          <p>🜃</p>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <p>1</p>
        </Grid>
        <Grid item xs={1}>
          <p>2</p>

        </Grid>
        <Grid item xs={1}>
          <p>3</p>

        </Grid>
        <Grid item xs={1}>
          <p>🜄</p>

        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
        </Grid>
        <Grid item xs={1}>
          <p>.*</p>

        </Grid>
        <Grid item xs={1}>
          <p id='hack'>☌</p>

        </Grid>
      </Grid>
    </Box>
    </div>
  );
}

function Radial(props) {
  const [value, setValue] = useState([20]);
  const [calc, setCalc] = useState(0)
  const [sign, setSign] = useState('')
  const [element, setElement] = useState('')
  const [green, setGreen] = useState('')
  const [greenFee, setGreenFee] = useState(0)
  const [prevValue, setPrevValue] = useState(0)
  const [ring, setRing] = useState(2)

    useEffect(() => {
      setTimeout(() => {
        document.getElementsByClassName('MuiSlider-track css-1gv0vcd-MuiSlider-track')[0].style.color = 'transparent'
        document.getElementsByClassName('css-eg0mwd-MuiSlider-thumb')[0].style.width = 0
        document.getElementsByClassName('MuiSlider-rail css-14pt78w-MuiSlider-rail')[0].style.opacity = 1
      }, 0)
      
    })

    const conjuct = () => {
      document.querySelector('#prompt').classList.add('airplane')
      setSign('𓅣')
    }

    const handleChange = (event, newValue) => {
      console.log('newValue')
      console.log(newValue)
      setValue(newValue);
      props.setMood(newValue)
      // setTimeout(() => { // good use of mobx here
        // trigger useState update
        // alert(newValue)
      // }, 1000)
    };
  return (
    <div className="App">
    <Container style={{paddingLeft: '460px', paddingTop: '300px'}}>
      <Box sx={{ flexGrow: 1 }} >

      <Grid container spacing={2}>
        <Grid item xs={3}>
            {`Ξ${calc / 100 + greenFee}`}
        </Grid>
        <Grid item xs={1} style={{paddingTop: '40px'}}>
          <p>💰</p>
        </Grid>
      </Grid>

      <Grid container spacing={2} id="prompt">
        <Grid item xs={1} style={{paddingTop: '16px'}}>
          <p>{element}</p>
        </Grid>
        <Grid item xs={1} style={{paddingTop: '16px'}}>
          <p>{Math.round(calc)}</p>
        </Grid>
        <Grid item xs={1} style={{paddingTop: '16px'}}>
          <p>{green}</p>
        </Grid>
        <Grid item xs={1} style={{paddingTop: '16px'}}>
          <p>{sign}</p>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={1}>
          <p onClick={() => setSign('♦')}>♦</p>
        </Grid>
        <Grid item xs={1}>
          <p onDoubleClick = {
              () => {
                props.type == '☉'
                ?
                  props.setType('-')
                :
                  props.setType('☉')
              }
            
          }>☉</p>
        </Grid>
        <Grid item xs={1}>
          <p onClick={() => {
            setGreen('⚘')
            setGreenFee(0.0039)
          }}>⚘</p>
        </Grid>
        <Grid item xs={1}>
          <p onClick={() => setElement('🜂')}>🜂</p>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CircularSlider
            width={140}
            label={`${ring}`}
            valueFontSize={0}
            onChange={ (value) => { 
              if((Math.abs(prevValue - value) >= (360 - 1)) && (Math.abs(prevValue - value) <= (360 + 1))){ // TODO: ~(val, thresh)
                setRing(ring => ring + 1)
              }
              setCalc(Number(((((5*(ring**2)-3*ring)/2)*value/360 + (5*((ring-1)**2)-3*(ring-1)) )).toPrecision(4)));
              setPrevValue(value) 
            } }
          >
            <p></p>
        </CircularSlider>
        </Grid>
        <Grid item xs={1}>
          <p className="xor" onClick={() => setElement('🜁')}>🜁</p>
          <p className="xor" onClick={() => setElement('🜃')}>🜃</p>
          <p className="xor" onClick={() => setElement('🜄')}>🜄</p>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
        </Grid>
        <Grid item xs={1} style={{paddingTop: '20px'}}>
          <p>.*</p>

        </Grid>
        <Grid item xs={1} style={{paddingTop: '20px'}}>
          <p id='hack' onClick={() => conjuct()}>☌</p>

        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1} style={{paddingTop: '40px'}}>
          <p>☂</p>
        </Grid>
        <Grid item xs={2}>
          
        </Grid>
        <Grid item xs={1} style={{paddingTop: '40px'}}>
          <p>⚛</p>
        </Grid>
      </Grid>
    </Box>
    </Container>
    </div>
  );
}

let timer;

function Particle(props){
  // const [fire, setFire] = useState(true)
  const resetTime = () => {
    if(props.max < props.time){
      console.log('set max')
      props.setMax(props.time)
    }

    clearInterval(timer)
    props.setTime(0)
    timer = window.setInterval(() => {
      props.setTime(time => time + 1); // <-- Change this line!
    }, 1000);
  }

  useEffect(() =>{
    document.querySelector(`#hack-${props.id}`).style.animation  = (props.fire) ?  `App-logo-spin infinite ${7 + props.calc/255*20}s linear` : ''
  })
  return(
    <Grid onMouseEnter={
      () => 
      {
        props.setMultiplier(props.multiplier + 1)
        console.log('ho')
      }
    } container spacing={2} id={`hack-${props.id}`} className={props.fire ? "circle" : ''} width={300}>
      <Grid item xs={1} style={{paddingTop: '16px'}}>
        <p onMouseEnter={() => resetTime()} style={{color: props.color}}>{props.fire ? '🔥' : props.sign }</p>
      </Grid>
      <Grid item xs={1} style={{paddingTop: '16px'}}>
        <p onMouseEnter={() => resetTime()} style={{color: props.color}}>{props.fire ? '🔥' : props.element}</p>
      </Grid>
      <Grid item xs={1} style={{paddingTop: '16px'}}>
        <p onMouseEnter={() => resetTime()} style={{color: props.color}}>{props.fire ? '🔥' : props.calc}</p>
      </Grid>
      <Grid item xs={1} style={{paddingTop: '16px'}}>
        <p onMouseEnter={() => resetTime()} style={{color: props.color}}>{props.fire ? '🔥' : props.green }</p>
      </Grid>
      <Grid item xs={1} style={{paddingTop: '16px'}}>
        <p style={{color: props.color}}>{props.label}</p>
      </Grid>
    </Grid>
  )
}

/// how to overlap with fluence cli args
function History(){
  const [fire, setFire] = useState(false)
  const [wind, setWind] = useState(false)
  const [max, setMax] = useState(0)
  const [time, setTime] = useState(0)
  const [multiplier, setMultiplier] = useState(1)

    React.useEffect(() => {
    if(!wind && fire){
      timer = window.setInterval(() => {
        setTime(time => time + 1); // <-- Change this line!
      }, 1000);
    }
    return () => {
      window.clearInterval(timer);
    };
  }, []);
  const txs = [
    ['orange','♦','🜂',123,'⚘', '♫'],
    ['blue','♦','🜃',108,'⚘', '♨'],
    ['green','♦','🜃',36,'⚘', '⚛'],
    ['indigo','♦','🜁',9,'⚘', '⚡'],
  ]
  // get a list of txs -> particle
  const particles = txs.map((tx, i) => {
    return <Particle max={max} setMax={setMax} fire={fire} multiplier={multiplier} setMultiplier={setMultiplier} time={time} setTime={setTime} id={i} color={tx[0]}sign={tx[1]} element={tx[2]} calc={tx[3]} green={tx[4]} label={tx[5]}/>
  })

  const resetTime = () => {
      console.log(max)
      console.log(time)
    if(max < time){
      console.log('set max')
      setMax(time)
    }

    clearInterval(timer)

    setTime(0)

    timer = window.setInterval(() => {
      setTime(time => time + 1); // <-- Change this line!
    }, 1000);

  }

  const setPhoneme = (larp) => {

    let fan = []
    let rad = (larp[0] == '~') ? 1 : 0

    const alt = [
      larp.slice(rad + 0, rad + 3),
      larp.slice(rad + 3, rad + 6),
      larp.slice(rad + 7, rad + 10),
      larp.slice(rad + 10, rad + 13),
      ]

    // parse larp

    for(let i = 0; i < suffixes.length; i++){
      for(let j = 0; j < alt.length; j++){
        if(suffixes[i] == alt[j] || prefixes[i] == alt[j]) {
          fan.push(library[i]) //0 = fool, 188 = etamin star, 212 = opposition, 231 = creature
        }
      }
    }

    // loop and push name
    return `${fan[0]}·${fan[1]}·${fan[2]}·${fan[3]}`
  }

  const stopTime = () => {
    if(max < time){
      console.log('set max')
      setMax(time)
    }
    clearInterval(timer)
    setTime(0)
  }

  return(<>
    <Container >
      <Grid container spacing={6} width={300}>
        <Grid item xs={2} >
          <p style={{paddingLeft: '2px'}}>{'♦'}</p>
        </Grid>
        <Grid item xs={2} >
          <p >{3.23}</p>
        </Grid>
        <Grid item xs={2} >
          <p style={{paddingLeft: '4px'}}>{'⚘'}</p>
        </Grid>
        <Grid item xs={2} >
          <p>{122}</p>
        </Grid>
      </Grid>
      <Grid container spacing={6} width={300} onMouseEnter={() => stopTime()}>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p >{'☉'}</p>
        </Grid>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p >{11.14}</p>
        </Grid>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p onClick={() => setFire(true)} >{'🔥'}</p>
        </Grid>
      </Grid>
      <br/>
      <br/>
      <div id="reset" style={{width: '200px', padding: '20px', border: fire ? '1px solid' : "" }} onMouseEnter={() => resetTime()} onMouseLeave={() => stopTime()}>
        {particles}
      </div>
      <br/>      <br/>
      <br/>
      <br/>

      <hr/>
      <br/>
      <Grid container spacing={6} width={300}>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p >HS</p>
        </Grid>
        <Grid item xs={8} style={{paddingTop: '16px'}}>
          <p >{'ALT'}</p>
        </Grid>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p >SCORE</p>
        </Grid>
      </Grid>
      <Grid container spacing={6} width={300}>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p >{max}</p>
        </Grid>
        <Grid item xs={8} style={{paddingTop: '16px'}}>
          <p style={{fontSize: '14px', marginTop: '18px'}} >{setPhoneme('~milbyt-moszod')}</p>
        </Grid>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p >{time}</p>
        </Grid>
      </Grid>
    </Container>
  </>)
}

function Umbrella() {
  return(
    <>
      
    </>
  )
}

function App(props) {
  const [type, setType] = useState('~')
  return (
    <>
      {
        type == "☉" 
        ? 
          <Radial type={type} setType={setType}/>
        :
          <Linear type={type} setType={setType}/>
      }
    </>
  )
}

export default App;
