let video;
let label = "Attendere";
let classifier;
let modelURL1 = 'https://teachablemachine.withgoogle.com/models/lV2EoKSUx/';
let Label="indossare mascherina";
let img;
let audio = new Audio('DPI rilevato.mp3');
let audio1= new Audio('Indossare_DPI (1).mp3');


// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL1 + 'model.json');
}

function setup() {
  createCanvas(1500, 1500);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  
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

  if (label== "Ok") {
    emoji = "Accesso consentito";
    emojiColor='rgb(0,255,0)';
    image(ima,0, 20);  
  }
  if (label=="No elmetto") {
    emoji="Accesso negato";
    emojiColor = 'rgb(255,0,0)';
    image(sino,10, 20);
    
    
  }  
  else if (label == "No mascherina") { 
    emoji="Accesso negato"
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
    if (newlabel== "Ok") {
      audio.play();   
      var button
      button = createButton('PROCEDERE');
      button.mousePressed(gotolink)
      button.style('color:green')
      button.position(500, 500)
      
      function gotolink() {
	window.open('https://portale.myefm.it/archibus/login.axvw');
        
	      
    } }
    else if (newlabel=="No elmetto") {
      audio1.play();
    } else if (newlabel == "No mascherina") { 
      audio1.play();
    } 
    label=newlabel
  }
  classifyVideo();
}
