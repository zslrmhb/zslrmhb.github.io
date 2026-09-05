import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
export function createScene(container, snapshot, savedView, onStatus) {
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(40,1,.01,100);
 camera.position.fromArray(savedView || [0,2.5,3.1]);
 const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2)); container.append(renderer.domElement);
 renderer.domElement.setAttribute('aria-label','Three-body scene. Drag to orbit, or use the camera buttons.');
 const controls = new OrbitControls(camera,renderer.domElement);
 controls.enablePan=false; controls.minDistance=1.6;controls.maxDistance=8;controls.enableDamping=false;
 let state=snapshot.state.slice(),speed=snapshot.speed,playing=false,frameId=0,last=0,accumulator=0;
 const initial=[-.97000436,.24308753,.466203685,.43236573,.97000436,-.24308753,.466203685,.43236573,0,0,-.93240737,-.86473146];
 const geometry=new THREE.SphereGeometry(.052,32,24);
 const materials=[0,1,2].map(()=>new THREE.MeshStandardMaterial({roughness:.65,metalness:0}));
 const bodies=materials.map(material=>{const body=new THREE.Mesh(geometry,material);scene.add(body);return body});
 scene.add(new THREE.AmbientLight(0xffffff,2));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(-2,4,3);scene.add(light);
 let trailState=initial.slice();const points=[];
 for(let n=0;n<2109;n++){if(n%3===0)points.push(new THREE.Vector3(trailState[0],0,trailState[1]));trailState=window.articleExperiment.integrate(trailState,.003);}
 const trailGeometry=new THREE.BufferGeometry().setFromPoints(points);
 const trailMaterial=new THREE.LineBasicMaterial({transparent:true,opacity:.65});
 const trail=new THREE.LineLoop(trailGeometry,trailMaterial);scene.add(trail);
 const grid=new THREE.GridHelper(3,12);grid.material.transparent=true;grid.material.opacity=.12;grid.position.y=-.075;scene.add(grid);
 const draw=()=>{bodies.forEach((body,i)=>body.position.set(state[i*4],0,state[i*4+1]));controls.update();renderer.render(scene,camera);};
 const theme=()=>{const css=getComputedStyle(document.documentElement);['--trail-one','--trail-two','--trail-three'].forEach((key,i)=>materials[i].color.set(css.getPropertyValue(key).trim()));trailMaterial.color.set(css.getPropertyValue('--muted').trim());grid.material.color.set(css.getPropertyValue('--muted').trim());draw();};
 const resize=()=>{const r=container.getBoundingClientRect();camera.aspect=r.width/r.height;camera.updateProjectionMatrix();renderer.setSize(r.width,r.height);draw();};
 const observer=new ResizeObserver(resize);observer.observe(container);
 const themeObserver=new MutationObserver(theme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 controls.addEventListener('change',()=>renderer.render(scene,camera));
 function pause(){playing=false;cancelAnimationFrame(frameId);last=0;onStatus(false);}
 function frame(now){if(!playing)return;if(last)accumulator+=Math.min((now-last)/1000,.05)*speed;last=now;while(accumulator>=.003){state=window.articleExperiment.integrate(state,.003);accumulator-=.003;}draw();frameId=requestAnimationFrame(frame);}
 function onHidden(){if(document.hidden)pause();}document.addEventListener('visibilitychange',onHidden);
 theme();resize();
 return {
  play(){if(playing)pause();else{playing=true;last=0;onStatus(true);frameId=requestAnimationFrame(frame);}},
  speed(value){speed=value;},
  trails(value){trail.visible=value;draw();},
  view(top){camera.position.set(0,top?3.7:2.5,top ? 0.001 : 3.1);draw();},
  zoom(factor){camera.position.multiplyScalar(factor);camera.position.clampLength(1.6,8);draw();},
  rotate(){camera.position.applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI/8);draw();},
  reset(){pause();state=initial.slice();speed=1;accumulator=0;camera.position.set(0,2.5,3.1);trail.visible=true;draw();},
  dispose(){const result={state:state.slice(),speed,view:camera.position.toArray()};pause();observer.disconnect();themeObserver.disconnect();document.removeEventListener('visibilitychange',onHidden);controls.dispose();geometry.dispose();materials.forEach(m=>m.dispose());trailGeometry.dispose();trailMaterial.dispose();grid.geometry.dispose();grid.material.dispose();renderer.dispose();renderer.domElement.remove();return result;}
 };
}
