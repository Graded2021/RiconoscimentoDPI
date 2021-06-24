let video;
let label = "Attendere";
let classifier;
let modelURL1 = 'https://teachablemachine.withgoogle.com/models/n-1Puqs6w/';
let Label="indossare mascherina";
let img;
let audio = new Audio('DPI_rilevato.mp3');
let audio1= new Audio('No_DPI.mp3');
var button

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL1 + 'model.json');
}

function setup() {
  createCanvas(1500, 1500);
  
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  
      button = createButton('AREA UTENTI AUTORIZZATI');
      button.mousePressed(gotolink)
      button.style('color:green')
      button.size(300,60)
      button.position(150,530)
      button.hide();
         
  function gotolink() {
	window.open('https://form.jotform.com/211742056314043');
        
    }
  
  //Import Image
  
  ima=loadImage('aa.jpg');
  obbligo=loadImage('cc.jpg');
  sino=loadImage('bb.jpg');
  attesa=loadImage('attesa.jpg');
  
  
  // STEP 2: Start classifying
  classifyVideo();
}
// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  
  background(0);
  
  image(video, 0, 0); 

  // Pick an emoji, the "default" is train
  let emoji = "VERIFICA DEI D.P.I. IN CORSO...";
  let emojiColor = 'rgb(0,0,0)';

  if (label== "SI") {
    emoji = "Accesso consentito";
    emojiColor='rgb(0,255,0)';
    image(ima,0, 20);  
  }
  if (label=="NO") {
    emoji="Accesso negato, indossare DPI";
    emojiColor = 'rgb(255,0,0)';
    image(sino,10, 20);
    
    
  }  
  else if (label == "No") { 
    emoji="Accesso negato, indossare DPI"
    emojiColor = 'rgb(255,0,0)';
    image(obbligo, 10, 20);
    
  } 

  // Drawing the emoji
  textAlign(CENTER, CENTER);
  textSize(25);
  textStyle(BOLDITALIC);
  fill(emojiColor);
  text(emoji, width -1200 , height - 1000 );
}
// STEP 3: Get the classification!
function gotResults(error, results) {
  
  if (error) {
    console.error(error);
    return;
  }
  // Storing the label and classifying again!
  let newlabel = results[0].label;
  if (newlabel != label) { 
    audio.pause();
    audio1.pause();
    if (newlabel== "SI") {
      audio.play();
      button.show();
    }
    else if (newlabel=="NO") {
      audio1.play();
      button.hide()
    }  
    label=newlabel
  }
  classifyVideo();
}
