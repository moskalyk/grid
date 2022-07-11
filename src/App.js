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

import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { sayHello, registerHelloPeer } from './generated/getting-started.js';
// import { sayHello, registerHelloPeer } from './generated/getting-started.js';

const relayNodes = [krasnodar[1], krasnodar[2], krasnodar[3]];

function Aqua() {
    const [isConnected, setIsConnected] = useState(false);
    const [helloMessage, setHelloMessage] = useState(null);

    const [peerIdInput, setPeerIdInput] = useState('');
    const [relayPeerIdInput, setRelayPeerIdInput] = useState('');

    const connect = async (relayPeerId) => {
        try {
            await Fluence.start({ connectTo: relayPeerId });
            setIsConnected(true);
            // Register handler for this call in aqua:
            // HelloPeer.hello(%init_peer_id%)
            registerHelloPeer({
                hello: (from) => {
                    setHelloMessage('Hello from: \n' + from);
                    return 'Hello back to you, \n' + from;
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
        const res = await sayHello(peerIdInput, relayPeerIdInput);
        setHelloMessage(res);
    };

    return (
        <div className="App">
            <header>
                <img src={logo} className="logo" alt="logo" />
            </header>

            <div className="content">
                {isConnected ? (
                    <>
                        <h1>Connected</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="bold">Peer id:</td>
                                    <td className="mono">
                                        <span id="peerId">{Fluence.getStatus().peerId}</span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-clipboard"
                                            onClick={() => copyToClipboard(Fluence.getStatus().peerId)}
                                        >
                                            <i className="gg-clipboard"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bold">Relay peer id:</td>
                                    <td className="mono">
                                        <span id="relayId">{Fluence.getStatus().relayPeerId}</span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-clipboard"
                                            onClick={() => copyToClipboard(Fluence.getStatus().relayPeerId)}
                                        >
                                            <i className="gg-clipboard"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div>
                            <h2>Say hello!</h2>
                            <p className="p">
                                Now try opening a new tab with the same application. Copy paste the peer id and relay
                                from the second tab and say hello!
                            </p>
                            <div className="row">
                                <label className="label bold">Target peer id</label>
                                <input
                                    id="targetPeerId"
                                    className="input"
                                    type="text"
                                    onChange={(e) => setPeerIdInput(e.target.value)}
                                    value={peerIdInput}
                                />
                            </div>
                            <div className="row">
                                <label className="label bold">Target relay</label>
                                <input
                                    id="targetRelayId"
                                    className="input"
                                    type="text"
                                    onChange={(e) => setRelayPeerIdInput(e.target.value)}
                                    value={relayPeerIdInput}
                                />
                            </div>
                            <div className="row">
                                <button className="btn btn-hello" onClick={helloBtnOnClick}>
                                    say hello
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Intro 1: P2P browser-to-browser</h1>
                        <h2>Pick a relay</h2>
                        <ul>
                            {relayNodes.map((x) => (
                                <li key={x.peerId}>
                                    <span className="mono">{x.peerId}</span>
                                    <button className="btn" onClick={() => connect(x.multiaddr)}>
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
    <Container style={{paddingLeft: '460px', paddingTop: '100px'}}>
      <Box sx={{ flexGrow: 1 }} >

      <Grid container spacing={2}>
        <Grid item xs={4}>
            ⏚
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

var fun = 0.0
setInterval(() => {
  fun++
  console.log('here')
}, 1000)

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


const board = `
varying vec3 vUv;
    varying float vTime;
    varying float vZ;
    uniform sampler2D texture_;

    float map(float value, float oldMin, float oldMax, float newMin, float newMax) {
        return newMin + (newMax - newMin) * (value - oldMin) / (oldMax - oldMin);
    }


    void main()
    {
        vec3 colorA = vec3(1.6, 0.1, 66.17);
        vec3 colorB = vec3(0.17, 0.8, .7); 
        vec3 color = mix(colorA, colorB, vUv.x * vUv.y);
        float alpha = map(vZ / 2., -1. / 2., 30. / 2., 0.17, 1.); 
        //vec3 color = vec3(.5, .5, .6);

        gl_FragColor = vec4( color, alpha);
        gl_FragColor = gl_FragColor * texture( texture_, gl_PointCoord );
    }
`

const watermelon = `
vec4 mod289(vec4 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x)
    {
      return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r)
    {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec2 fade(vec2 t) {
      return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    // Classic Perlin noise
    float cnoise(vec2 P)
    {
      vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
      Pi = mod289(Pi); // To avoid truncation effects in permutation
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;

      vec4 i = permute(permute(ix) + iy);

      vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
      vec4 gy = abs(gx) - 0.5 ;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;

      vec2 g00 = vec2(gx.x,gy.x);
      vec2 g10 = vec2(gx.y,gy.y);
      vec2 g01 = vec2(gx.z,gy.z);
      vec2 g11 = vec2(gx.w,gy.w);

      vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
      g00 *= norm.x;
      g01 *= norm.y;
      g10 *= norm.z;
      g11 *= norm.w;

      float n00 = dot(g00, vec2(fx.x, fy.x));
      float n10 = dot(g10, vec2(fx.y, fy.y));
      float n01 = dot(g01, vec2(fx.z, fy.z));
      float n11 = dot(g11, vec2(fx.w, fy.w));

      vec2 fade_xy = fade(Pf.xy);
      vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
      float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
      return 2.3 * n_xy;
    }

    float map(float value, float oldMin, float oldMax, float newMin, float newMax) {
        return newMin + (newMax - newMin) * (value - oldMin) / (oldMax - oldMin);
    }

    varying vec3 vUv;
    varying float vTime;
    varying float vZ;
    uniform float time;
    void main()
    {
        vUv = position;
        vTime = time;
        vec3 newPos = position;
        vec2 peak = vec2(1.0 - abs(.5 - uv.x), 1.0 - abs(.5 - uv.y));
        vec2 noise = vec2(
            map(cnoise(vec2(0.3 * time + uv.x * 5., uv.y * 5.)), 0., 1., -2., (peak.x * peak.y * 30.)),
            map(cnoise(vec2(-0.3 * time + uv.x * 5., uv.y * 5.)), 0., 1., -2., 25.)
        );

        newPos.x += noise.x * 3.;
        newPos.z += noise.x * .06 * noise.y;
        vZ = newPos.z;
        vec4 mvPosition = modelViewMatrix * vec4( newPos, 3.0 );
        gl_PointSize = 5.0;
        gl_Position = projectionMatrix * mvPosition;
    }

`

function WaterMelon(){

  useEffect(()=>{
    const scene = new Scene({
        el: document.querySelector('.container')
    });
  })
  return(
    <>
      <div className="container"></div>


<script id="vertex-shader" type="x-shader/x-vertex">
    {`//
    // GLSL textureless classic 2D noise "cnoise",
    // with an RSL-style periodic variant "pnoise".
    // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
    // Version: 2011-08-22
    //
    // Many thanks to Ian McEwan of Ashima Arts for the
    // ideas for permutation and gradient selection.
    //
    // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
    // Distributed under the MIT license. See LICENSE file.
    // https://github.com/ashima/webgl-noise
    //

    vec4 mod289(vec4 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x)
    {
      return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r)
    {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec2 fade(vec2 t) {
      return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    // Classic Perlin noise
    float cnoise(vec2 P)
    {
      vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
      Pi = mod289(Pi); // To avoid truncation effects in permutation
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;

      vec4 i = permute(permute(ix) + iy);

      vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
      vec4 gy = abs(gx) - 0.5 ;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;

      vec2 g00 = vec2(gx.x,gy.x);
      vec2 g10 = vec2(gx.y,gy.y);
      vec2 g01 = vec2(gx.z,gy.z);
      vec2 g11 = vec2(gx.w,gy.w);

      vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
      g00 *= norm.x;
      g01 *= norm.y;
      g10 *= norm.z;
      g11 *= norm.w;

      float n00 = dot(g00, vec2(fx.x, fy.x));
      float n10 = dot(g10, vec2(fx.y, fy.y));
      float n01 = dot(g01, vec2(fx.z, fy.z));
      float n11 = dot(g11, vec2(fx.w, fy.w));

      vec2 fade_xy = fade(Pf.xy);
      vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
      float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
      return 2.3 * n_xy;
    }

    float map(float value, float oldMin, float oldMax, float newMin, float newMax) {
        return newMin + (newMax - newMin) * (value - oldMin) / (oldMax - oldMin);
    }

    varying vec3 vUv;
    varying float vTime;
    varying float vZ;
    uniform float time;
    void main()
    {
        vUv = position;
        vTime = time;
        vec3 newPos = position;
        vec2 peak = vec2(1.0 - abs(.5 - uv.x), 1.0 - abs(.5 - uv.y));
        vec2 noise = vec2(
            map(cnoise(vec2(0.3 * time + uv.x * 5., uv.y * 5.)), 0., 1., -2., (peak.x * peak.y * 30.)),
            map(cnoise(vec2(-0.3 * time + uv.x * 5., uv.y * 5.)), 0., 1., -2., 25.)
        );

        newPos.x += noise.x * 3.;
        newPos.z += noise.x * .06 * noise.y;
        vZ = newPos.z;
        vec4 mvPosition = modelViewMatrix * vec4( newPos, 3.0 );
        gl_PointSize = 5.0;
        gl_Position = projectionMatrix * mvPosition;
    }`}
    </script>

    <script id="fragment-shader" type="x-shader/x-fragment">
    {`varying vec3 vUv;
    varying float vTime;
    varying float vZ;
    uniform sampler2D texture_;

    float map(float value, float oldMin, float oldMax, float newMin, float newMax) {
        return newMin + (newMax - newMin) * (value - oldMin) / (oldMax - oldMin);
    }


    void main()
    {
        vec3 colorA = vec3(1.6, 0.1, 66.17);
        vec3 colorB = vec3(0.17, 0.8, .7); 
        vec3 color = mix(colorA, colorB, vUv.x * vUv.y);
        float alpha = map(vZ / 2., -1. / 2., 30. / 2., 0.17, 1.); 
        //vec3 color = vec3(.5, .5, .6);

        gl_FragColor = vec4( color, alpha);
        gl_FragColor = gl_FragColor * texture( texture_, gl_PointCoord );
    }`}
    </script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/84/three.min.js'></script><script  src="./script.js"></script>
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
          <Aqua type={type} setType={setType}/>
      }
    </>
  )
}

export default App;
