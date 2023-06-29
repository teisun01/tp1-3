//lets de sonido
let classifier;
// Label
let label = 'listening...';
let fondo;
// Teachable Machine model URL:
let soundModel = "https://teachablemachine.withgoogle.com/models/3WGOk0E8C/";
let monitorear = false;
let FREC_MIN = 100;
let FREC_MAX = 500;

let AMP_MIN = 0.02;
let AMP_MAX = 0.1;
let vol;
let mic;
let pitch;
let audioContext;
let gestorAmp;
let gestorPitch;
let amp; //variable donde cargo los valores de amplitud del sonido de entrada
let haySonido = false; // vaiable buleana que de define el ESTADO
let antesHabiaSonido = false; //memoria de la variable "haySonido". Guarda el valor de la variable en fotograma anterior
let antesHabiaFrec = false;
let frecuencia; //variable donde cargo los valores de frecuencia del sonido de entrada
let frecuenciaAnterior;
let estado = "inicio";
//color
let tintR, tintG, tintB;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let cuad;
//paleta de colores del fondo
let backgroundColors = [
  [188, 18, 50],   // Rojo
  [88,145,30],   // Verde
  [39, 107, 123],   // celeste
  [	188, 88, 18], // naranja
  [147,154,47],
  [121,75,73],
  [24,48,81],
  // Agrega más colores si lo deseas
];
function preload(){
  classifier = ml5.soundClassifier(soundModel + 'model.json');
  cuadimg = loadImage('img/cuadradoblanco.png')
  diagimg = loadImage('img/diagblanco.png')
  rectimg = loadImage('img/rect.png')
  cuad1 = loadImage('img/cuad1.png')
  cuad2 = loadImage('img/cuad2.png')
  cuad3 = loadImage('img/cuad4.png')
  cuad4 = loadImage('img/cuad5.png')
  cuad5 = loadImage('img/cuad6.png')
}

function setup() {
  const randomColor = random(backgroundColors);
  background(color(randomColor[0], randomColor[1], randomColor[2]));
  fondo = new Fondo();
  frameRate(60)
  translate(600/2,600/2)
  createCanvas(600, 600);
  cuad = new Cuad();
  reset();
  audioContext = getAudioContext(); // inicia el motor de audio
  mic = new p5.AudioIn(); // inicia el micrófono
  mic.start(startPitch); // se enciende el micrófono y le transmito el analisis de frecuencia (pitch) al micrófono. Conecto la libreria con el micrófono

 userStartAudio();// por la dudas para forzar inicio de audio en algunos navegadores

  gestorAmp =  new GestorSenial( AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial( FREC_MIN, FREC_MAX);

  antesHabiaSonido = false;
  elColor = color(0);
  colorInicial = color(255,0,0);
  colorFinal = color(255, 255, 0);
  
classifier.classify(gotResult);
}

function draw() {

  const randomColor = random(backgroundColors);
  //background(fondo.seleccionarColorAleatorio());
  //cuad.dibujar();
  /*fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
*/


  let vol = mic.getLevel(); // cargo en vol la amplitud del micrófono (señal cruda);
  
  gestorAmp.actualizar(vol);
  let valorFiltrado = gestorPitch.filtrada;

  // Mapear el valor filtrado a un rango de colores
  tintR = map(valorFiltrado, 0, 1, 0, 255);
  tintG = map(valorFiltrado, 0, 1, 50, 200);
  tintB = map(valorFiltrado, 0, 1, 100, 150);
  haySonido = gestorAmp.filtrada > 0.1; // umbral de ruido que define el estado haySonido
  let inicioElSonido = haySonido && !antesHabiaSonido; // evendo de INICIO de un sonido
  let finDelSonido = !haySonido && antesHabiaSonido; // evento de fIN de un sonido
  if(inicioElSonido){ //Evento
  }

  if(haySonido){ //Estado
    if(vol){
    elColor = lerpColor( colorInicial, colorFinal, gestorPitch.filtrada);
  }
}
  if(finDelSonido){//Evento
    elColor == colorInicial;
  }
if(estado == "inicio"){
    if (label == 'shh'){
      const randomColor = random(backgroundColors);
      background(color(randomColor[0], randomColor[1], randomColor[2]));
    } else if (label == 'aplauso'){
      //cuad.color();
      cuad.dibujar();
    }
  }
console.log(label);
if (estado == "color"){
  if (label == 'aplauso'){
    //cuad.color();
  }
}
  if(monitorear){
    gestorAmp.dibujar(300,200);
    gestorPitch.dibujar(500, 350);
    console.log(vol);
  }
  antesHabiaSonido = haySonido;
  let frec = map(gestorPitch.filtrada, 0, 1, FREC_MIN, FREC_MAX); //Mapeo para la frecuencia 
}


function reset(){
  const randomColor = random(backgroundColors);
  background(color(randomColor[0], randomColor[1], randomColor[2]));
  //cuad.color();
  cuad.dibujar();
}

/*function mousePressed(){
    reset();
    startPitch();
    if (!audioContext) {
      audioContext = getAudioContext();
      mic = new p5.AudioIn();
      mic.start(startPitch);
      userStartAudio();
    }
}*/


function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {

      gestorPitch.actualizar(frequency);    
      //console.log(frequency);
    } 
    getPitch();
  })
}
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}