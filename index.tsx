/*
* @author Kang Hyo Mun
* Create at 2022
*/
import { Point } from './src/inteface/Point';

const EARTH = 0.000009044289887579477;

export default class BufferPolygon {
  points: Point[];
  buffer: number; // meter unit

  constructor(points?: Point[], buffer?: number) {
    this.points = points || [];
    this.buffer = buffer || -1;
  }

  setPoints(points: Point[]) {
    this.points = points;
  }

  setBuffer(buffer: number) {
    this.buffer = buffer;
  }

  excute(){if(!af(this))return[];const t=this.bf(),e=this.cf(t),a=[];if(e.length>=2)for(let t=0;t<=e.length-1;t+=1){const l={latitude:0,longitude:0};0!==t?(l.latitude=(e[t].varT-e[t-1].varT)/(e[t-1].varX-e[t].varX),l.longitude=l.latitude*e[t-1].varX+e[t-1].varT):(l.latitude=(e[0].varT-e[e.length-1].varT)/(e[e.length-1].varX-e[0].varX),l.longitude=l.latitude*e[e.length-1].varX+e[e.length-1].varT),a.push(l)}return a};

  // Line Equation y=[(yB-yA)/(xB-xA)]x - (xA(yB-yA)/(xB-xA)) + yA
  private cf(e){const{points:t,buffer:a}=this,n=[],r=[];if(Array.isArray(t)&&t.length&&t.length>=2){for(let e=0;e<=t.length-1;e+=1)t[e+1]?n.push({elementA:{xA:t[e].latitude,yA:t[e].longitude},elementB:{xB:t[e+1].latitude,yB:t[e+1].longitude}}):n.push({elementA:{xA:t[e].latitude,yA:t[e].longitude},elementB:{xB:t[0].latitude,yB:t[0].longitude}});n.map(t=>{const{elementA:{xA:n=0,yA:l=0},elementB:{xB:s=0,yB:u=0}}=t;let i={varX:0,varT:0},v={varX:0,varT:0};if(n===s){const e=df(t.elementA,{varX:n,varT:0},a);i={varX:n,varT:e.minus},v={varX:n,varT:e.plus}}else if(l===u){const e=df(t.elementA,{varX:0,varT:l},a);i={varX:0,varT:e.minus},v={varX:0,varT:e.plus}}else{const e=df(t.elementA,{varX:(u-l)/(s-n),varT:l-n*(u-l)/(s-n)},a);i={varX:(u-l)/(s-n),varT:e.minus},v={varX:(u-l)/(s-n),varT:e.plus}}return r.push(ef(e,i,v)),!0})}return r};

  private bf(){const{points:t}=this;let e={latitude:0,longitude:0};if(Array.isArray(t)&&t.length){if(1===t.length){const e=t[0];return{latitude:e.latitude,longitude:e.longitude}}const i=Math.floor(t.length/2);for(let l=0;l<i;l+=1){const d={latitude:(t[l].latitude+t[i+l].latitude)/2,longitude:(t[l].longitude+t[i+l].longitude)/2};0===l?e=d:(e.latitude=(e.latitude+d.latitude)/2,e.longitude=(e.longitude+d.longitude)/2)}}return e};
};

// Get Params Minus, Plus for Line Equation
function df(a={xA:0,yA:0},r={varX:0,varT:0},t=0){const n=t*EARTH,s=r.varX**2;return{minus:-1*n*Math.sqrt(s+1)-r.varX*a.xA- -1*a.yA,plus:n*Math.sqrt(s+1)-r.varX*a.xA- -1*a.yA}}

// Choose Line Valid
function ef(t,a,r){const e=a.varX**2,i=r.varX**2;let n=0;return n=Math.abs(a.varX*t.latitude-t.longitude+a.varT)/Math.sqrt(e+1)>Math.abs(r.varX*t.latitude-t.longitude+r.varT)/Math.sqrt(i+1)?a:r}

function af(r){const{points:e=[],buffer:t=0}=r||{};return Array.isArray(e)&&e.length>2&&t>=0}
