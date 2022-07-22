import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import {CSSTransition} from 'react-transition-group';

import * as VFX from "react-vfx";
import styled from "styled-components";
import * as THREE from 'three';

import CircularSlider from '@fseehawer/react-circular-slider';
import {prefixes, suffixes, library} from './l/index.js'

import { providers } from "ethers";
import { init } from "@textile/eth-storage";

import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { sayHello, registerHelloPeer } from './generated/getting-started.js';
// import { sayHello, registerHelloPeer } from './generated/getting-started.js';

const relayNodes = [krasnodar[1], krasnodar[2], krasnodar[3]];

const WIDTH = 300
const HEIGHT = 200


function Aqua(props) {
    const [helloMessage, setHelloMessage] = useState(null);

    const connect = async (relayPeerId) => {
        try {
            await Fluence.start({ connectTo: relayPeerId });
            props.setIsConnected(true);
            props.setType('☉');
            console.log(Fluence.getStatus().peerId)
            const fan = setPatP(Fluence.getStatus().peerId)
            console.log(setPhoneme(`~${suffixes[fan[0]]}${suffixes[fan[1]]}-${suffixes[fan[2]]}${suffixes[fan[3]]}`))

            // Register handler for this call in aqua:
            // HelloPeer.hello(%init_peer_id%)
            registerHelloPeer({
                hello: (from) => {
                    setHelloMessage('Hello from: \n' + from);
                    console.log(`dialing message`)
                    const fan = setPatP(Fluence.getStatus().peerId)
                    return 'Hello back to you, from \n' + setPhoneme(`~${suffixes[fan[0]]}${suffixes[fan[1]]}-${suffixes[fan[2]]}${suffixes[fan[3]]}`);
                },
            });
        } catch (err) {
            console.log('Peer initialization failed', err);
        }
    };

    const helloBtnOnClick = async () => {
        if (!Fluence.getStatus().isConnected) {
            return;
        }

        // Using aqua is as easy as calling a javascript funсtion
        const res = await sayHello(props.peerIdInput, props.relayPeerIdInput);
        setHelloMessage(res);
    };

    return (
        <div className="App">
            <div className="content">
                {props.isConnected ? (
                  <>
                  </>
                ) : (
                    <>
                        <ul>
                            {relayNodes.map((x) => (
                                <li key={x.peerId}>
                                    <button className="btn" onClick={() => {
                                      connect(x.multiaddr)
                                      props.setRelayPeerIdInput(x.peerId)
                                    }}>
                                        Connect
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {helloMessage && (
                    <>
                        <h2>Message</h2>
                        <div id="message"> {helloMessage} </div>
                    </>
                )}
            </div>
        </div>
    );
}

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

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
  const [healing, setHealing] = useState('⚘')
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

    const conjuct = async () => {
      document.querySelector('#prompt').classList.add('airplane')
      setSign('𓅣')
      console.log(props.peerIdInput)
      console.log(props.relayPeerIdInput)
      console.log(Fluence.getStatus().peerId)
      const fan = setPatP(Fluence.getStatus().peerId)
      console.log(`~${suffixes[fan[0]]}${suffixes[fan[1]]}-${suffixes[fan[2]]}${suffixes[fan[3]]}`)
      console.log(setPhoneme(`~${suffixes[fan[0]]}${suffixes[fan[1]]}-${suffixes[fan[2]]}${suffixes[fan[3]]}`))
      const res = await sayHello(props.peerIdInput, props.relayPeerIdInput, setPhoneme(`~${suffixes[fan[0]]}${suffixes[fan[1]]}-${suffixes[fan[2]]}${suffixes[fan[3]]}`));
      console.log(res)
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
    <Container style={{paddingLeft: '460px', paddingTop: '100px'}}>
      <Box sx={{ flexGrow: 1 }} >

      <Grid container spacing={2}>
        <Grid item xs={4}>
            ⏚
            <input value={props.peerIdInput}onChange={(e) => {
              console.log(e.target.value)
              props.setPeerIdInput(e.target.value)
            }}></input>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={12}>
            <Metal/>
        </Grid>
      </Grid>
      <br/>
      <br/>
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
          <p>{(sign == '♦') ? sign : <img width="16px" height='16px' src="https://cryptologos.cc/logos/polygon-matic-logo.png"></img>}</p>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={1}>
          <p 
            onDoubleClick = {
              () => {
                sign == '♦'
                ?
                  setSign(`[]`)
                :
                  setSign('♦')
              }
            }
          onClick={() => setSign('♦')}>{
            (sign == '♦') ? sign : <img width="16px" height='16px' src="https://cryptologos.cc/logos/polygon-matic-logo.png"></img>
          }</p>
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
          <p 

          onDoubleClick = {
              () => {
                healing == '⚘'
                ?
                  (healing == '🌊') ? props.setType('🪵') : props.setType('🌊')
                :
                  props.setHealing('⚘')
              }
          }

          onClick={() => {
            setGreen(healing)
            setGreenFee(0.0039)
          }}>{healing}</p>
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
          <p onClick={() => {
            props.setType('☂')
          }}>☂</p>
        </Grid>
        <Grid item xs={2}>
          
        </Grid>
        <Grid item xs={1} style={{paddingTop: '40px'}}>
          <p onClick={() => {
            props.setType('ɸ')
          }}>ɸ</p>
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
      <Grid item xs={1} style={{paddingTop: '16px', padding: '11px'}}>
        <p onMouseEnter={() => resetTime()} style={{color: props.color}}>{props.fire ? '🔥' : props.sign }</p>
      </Grid>
      <Grid item xs={1} style={{paddingTop: '16px', padding: '11px'}}>
        <p onMouseEnter={() => resetTime()} style={{color: props.color}}>{props.fire ? '🔥' : props.element}</p>
      </Grid>
      <Grid item xs={1} style={{paddingTop: '16px', padding: '11px'}}>
        <p onMouseEnter={() => resetTime()} style={{color: props.color}}>{props.fire ? '🔥' : props.calc}</p>
      </Grid>
      <Grid item xs={1} style={{paddingTop: '16px', padding: '11px'}}>
        <p onMouseEnter={() => resetTime()} style={{color: props.color}}>{props.fire ? '🔥' : props.green }</p>
      </Grid>
      <Grid item xs={1} style={{paddingTop: '16px', padding: '11px'}}>
        <p style={{color: props.color}}>{props.label}</p>
      </Grid>
    </Grid>
  )
}

  const setPatP = (larp) => {

    let fan = []
    let rad = (larp[0] == '~') ? 1 : 0

    const alt = [
      larp.slice(rad + 0, rad + 13),
      larp.slice(rad + 13, rad + 26),
      larp.slice(rad + 26, rad + 39),
      larp.slice(rad + 39, rad + 52),
      ]

    // parse larp
    let total = 0
    for(let i = 0; i < alt.length; i++){
      total = 0
      for(let j = 0; j < alt[i].length; j++){
        total += alt[i].charCodeAt(j)
      }
      fan.push(total % 256 )
    }

    // loop and push name
    return fan
  }

  const setFan = (larp) => {

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
    return fan
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


let mouse = {x: WIDTH / 2, y: HEIGHT / 2}

const colors = [
  '#71E2F6',
  '#FFA500',
  '#7AF392',
  '#DDFA9D',
  '#87E967'
]
// Utility Functions
function randomIntFromRange(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


// Objects
function ParticleV(x, y, r, color) {
  const canvas = document.querySelector('#portal')
  const c = canvas.getContext('2d')
  this.x = x
  this.y = y
  this.r = r
  this.color = color
  this.rs = Math.random() * Math.PI * 2
  this.v = .05
  // this.distanceFromCenter = {
  //   x: randomIntFromRange(60, 450),    
  //   y: randomIntFromRange(60, 450)    
  // }
  this.distanceFromCenter = randomIntFromRange(20, 100)
  this.lastMouse = {
    x: x, 
    y: y
  }

  this.update = () => {
    const lastPoint = {
      x: this.x,
      y: this.y
    }
    this.rs += this.v
    
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * .08
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * .08
    
    this.x = this.lastMouse.x + Math.cos(this.rs) * this.distanceFromCenter
    this.y = this.lastMouse.y + Math.sin(this.rs) * this.distanceFromCenter
    this.draw(lastPoint)
  }

  this.draw = lastPoint => {
    c.beginPath()
    // c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)  
    // c.fillStyle = this.color
    // c.fill()
    c.lineWidth = this.r
    c.moveTo(lastPoint.x, lastPoint.y)
    c.lineTo(this.x, this.y)
    c.strokeStyle = this.color
    c.stroke()
    c.closePath()
  }
}
// Implementation
let particles
function initParticles() {
      const canvas = document.querySelector('#portal')
    const c = canvas.getContext('2d')

    canvas.width = 300
    canvas.height = 200
  particles = []

  for (let i = 0; i < 14; i++) {
    const r = (Math.random() * 2) + 1
    particles.push(new ParticleV(canvas.width / 2, canvas.height / 2, r, randomColor(colors)));
  }
}

// Animation Loop
function animateParticles() {
      const canvas = document.querySelector('#portal')
    const c = canvas.getContext('2d')

  requestAnimationFrame(animateParticles)
  c.fillStyle = `rgba(255, 255, 255, .05)`
  c.fillRect(0, 0, canvas.width, canvas.height)


  particles.forEach(particle => {
    particle.update()
  })
}

/// how to overlap with fluence cli args
function History(props){
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

    // Variables
let mouse = {
  x: WIDTH / 2,
  y: HEIGHT / 2 
}
    // Initial Setup
    const canvas = document.querySelector('#portal')
    const c = canvas.getContext('2d')

    canvas.width = WIDTH
    canvas.height = HEIGHT

    initParticles()
    animateParticles()



    return () => {
      window.clearInterval(timer);
    };
  }, []);
  const txs = [
    ['orange','♦','🜂',123,'⚘', '♫'],
    ['blue','♦','🜃',99,'🌊', '♨'],
    ['green','♦','🜃',36,'⚘', '⚛'],
    ['indigo','♦','🜁',9,'🪵', '⚡'],
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

  const stopTime = () => {
    if(max < time){
      console.log('set max')
      setMax(time)
    }
    clearInterval(timer)
    setTime(0)
  }

  return(<>
    <Container style={{border: '1px solid', width: '381px', padding: '40px', boxShadow: '15px 17px #8888'}}>
      <Grid container spacing={6} width={300}>
        <Grid item xs={2}>
          <canvas id="portal"></canvas>
        </Grid>
      </Grid>
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
          <p >{11.05}</p>
        </Grid>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p onClick={() => setFire(true)} >{'🔥'}</p>
        </Grid>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p onClick={() => {
            props.setType('⚛')
            console.log('download')
          }}>⚛</p>
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

const metal = `
uniform vec2 resolution;
uniform float time;
void main()
{
    vec2 coord = gl_FragCoord.xy / resolution.xy;
    vec2 st = coord;
    vec3 line = vec3(0.0);

    coord *= 3.0;

    float len;

    for (int i = 0; i < 15; i++) {
        len = length(vec2(coord.x, coord.y));
        coord.x += cos(coord.y + sin(len)) + cos(time * .07) * 0.2;
        coord.y += sin(coord.x + cos(len)) + sin(time * 0.1);
    }

    len *= cos(len * 0.4);

    len -= 100.;

    for (float i = 0.0; i < 1.0; i++) {
        len += 0.11 / abs(mod(st.x, 1.09 * i) * 200.) * 1.;
    }

    vec3 color = vec3(cos(len + 0.2) * 1.15, cos(len + 0.1), cos(len - 0.05));

    gl_FragColor = vec4(color, 1.0);
}
`;


const Content = styled.div`
  width: 60px;
  height: 600px;
`;

function Metal(){
  return(
    <>
      <div style={{width: "219px"}}>
      <VFX.VFXProvider>
        <VFX.VFXSpan shader={metal}>
          <Content></Content>
        </VFX.VFXSpan>
      </VFX.VFXProvider>
      </div>
    </>
  )
}


class Scene {
    constructor(options) {
        this.$el = options.el;
        this.time = 0;

        this.bindAll();
        this.init();
    }
    
    bindAll() {
        this.render = this.render.bind(this);
        this.resize = this.resize.bind(this);
    }
    
    init() {
        this.textureLoader = new THREE.TextureLoader();
        this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
        this.camera.position.z = 350;
        this.camera.position.y = 200;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.$el.appendChild( this.renderer.domElement );
        

        this.createParticles();
        this.bindEvents();
        this.resize();
        this.render();
    }
    
    createParticles() {        
        const plane = new THREE.PlaneBufferGeometry(500, 250, 250, 125);
        
        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = '';
        
        const material = new THREE.ShaderMaterial( {
            uniforms: {
                time: { value: 1.0 },
                texture:   { value: textureLoader.load( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1081752/spark1.png" ) },
                resolution: { value: new THREE.Vector2() }

            },

            vertexShader: document.getElementById( 'vertex-shader' ).textContent,
            fragmentShader: document.getElementById( 'fragment-shader' ).textContent,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true

        } );
        
        console.log(material.uniforms.texture);
    console.log(document.getElementById('vertex-shader').textContent)
    console.log(document.getElementById('fragment-shader').textContent)
        
        //const material = new THREE.PointsMaterial( { size: 1 } );
        this.particles = new THREE.Points( plane, material );
        this.particles.rotation.x = this.degToRad(-180);

        this.scene.add(this.particles);
    }

    
    bindEvents() {
        // window.addEventListener('mousemove', this.mousemove);
        window.addEventListener('resize', this.resize);
    }

    
    resize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.renderer.setSize(w,h);
        this.camera.aspect = w/h;
        this.camera.updateProjectionMatrix();
    }
    
    moveParticles() {
        this.particles.material.uniforms.time.value = this.time;
        // this.particles.material.needsUpdate = true;
    }

    // Animations
    
    render() {
        requestAnimationFrame(this.render);
        this.time += .01;
     
        this.moveParticles();
        this.renderer.render(this.scene, this.camera);
    }
    
    // Utils
    degToRad(angle) {
        return angle * Math.PI / 180;
    }
    
}

function Explorer(props) {

  const dwnload = async () => {
    await window.ethereum.enable();
    const provider = new providers.Web3Provider(window.ethereum);
    const wallet = provider.getSigner();

    const storage = await init(wallet);

    const canvas = document.getElementById('canvas-tx')
    const img    = canvas.toDataURL('image/png')

    const blob = new Blob([img], { type: "text/plain" });
    const file = new File([blob], "welcome.txt", {
      type: "text/plain",
      lastModified: new Date().getTime()
    });

    await storage.addDeposit();

    const { id, cid } = await storage.store(file);
    console.log(cid)
    // TODO, set some interface for clicking on button to open, and display in a data:png
  }

  useEffect(() => {
    var c = document.getElementById("canvas-tx");
    var ctx = c.getContext("2d");
    const fan = setFan('~milbyt-moszod')
    console.log(fan)
    const tt = setPatP(Fluence.getStatus().peerId)
    console.log(tt)
    for(let i = 0; i < prefixes.length;i++){
      for(let j = 0; j < suffixes.length; j++){
        for(let k = 0; k < tt.length; k++){
          if(i == tt[k]|| j == tt[k]){
            console.log('HIII')
            // console.log(i)
            // console.log(j)
            // console.log(tt[k])
            ctx.fillRect(i, j, 1, 1);
            ctx.fillRect(j, i, 1, 1);
          }
        }
      }
    }
    
  })

  return(
    <>
      <Grid container spacing={6} width={500} style={{paddingLeft: '460px', paddingTop: '100px'}}>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <canvas id="canvas-tx"></canvas>
        </Grid>

        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p onClick={() => {
            props.setType('☉')
          }}>☉</p>
        </Grid>
        <Grid item xs={8} style={{paddingTop: '16px'}}>
        </Grid>
        <Grid item xs={2} style={{paddingTop: '16px'}}>
          <p onClick={() => {
            // props.setType('☉')
            dwnload()
            console.log('download')
          }}>▼</p>
        </Grid>
      </Grid>
    </>
  )
}


const PI ="☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☌☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁☂☼☿♃♄♅♆♇☮♣♤♥♦♧♨⚑☘⚘★☁";

// var p = document.getElementById("piCircle");

var i = 0;

function myLoop() {
  setTimeout(function () {
    var div = document.createElement("div");
    div.className = "box";
    div.innerHTML = PI[i];
    div.style.transform = "rotate(-" + (i * 360 * 6.5) / PI.length + "deg)";
    var frac = 0.5;
    div.style.paddingTop = frac * i + "px";
    div.style.height = 400 - frac * i + "px";
    // document.getElementById("numbers").appendChild(div);

    i++;
    if (i < PI.length) {
      myLoop();
    }
  }, 50);
}

function Umbrella(props){
  useEffect(() => {
    myLoop();
  })

  return(
    <>
      <div id="container">
        <h1>DEX</h1>
      </div>
      <Aqua 
        type={props.type}
        setType={props.setType}
        peerIdInput={props.peerIdInput}
        isConnected={props.isConnected}
        setIsConnected={props.setIsConnected}
        setPeerIdInput={props.setPeerIdInput}
        relayPeerIdInput={props.relayPeerIdInput}
        setRelayPeerIdInput={props.setRelayPeerIdInput}
      />
    </>
  )
}

function Dex(){
  const [type, setType] = useState('☂')
  const [isConnected, setIsConnected] = useState(false);
  const [peerIdInput, setPeerIdInput] = useState('');
  const [relayPeerIdInput, setRelayPeerIdInput] = useState('');

  const renderer = () => {
    switch(type){
      case '☂':
        return <Umbrella
                  type={type}
                  setType={setType}
                  peerIdInput={peerIdInput}
                  isConnected={isConnected}
                  setIsConnected={setIsConnected}
                  setPeerIdInput={setPeerIdInput}
                  relayPeerIdInput={relayPeerIdInput}
                  setRelayPeerIdInput={setRelayPeerIdInput}
                />
      case '☉':
        return <Radial 
                  type={type}
                  setType={setType}
                  peerIdInput={peerIdInput}
                  isConnected={isConnected}
                  setIsConnected={setIsConnected}
                  setPeerIdInput={setPeerIdInput}
                  relayPeerIdInput={relayPeerIdInput}
                  setRelayPeerIdInput={setRelayPeerIdInput}
                />
        break;
      case 'ɸ':
        return <History 
                  type={type}
                  setType={setType}
                />
        break
      case '⚛':
        return <Explorer
                  type={type}
                  setType={setType}
                />
        break
      default:
        return '404'
    }
  }
  return(
    <>
      {renderer()}
    </>
  )
}

// function App(props) {
//   const [type, setType] = useState('~')
//   return (
//     <>
//       {
//         type == "☉" 
//         ? 
//           <Radial type={type} setType={setType}/>
//         :
//           <Aqua type={type} setType={setType}/>
//       }
//     </>
//   )
// }

export default Dex;
