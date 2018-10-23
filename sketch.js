var song;
var fft;
var button;
var mysong;



function toggleSong(){
  if (song.isPlaying()){
    song.pause();
    mysong.play();
  } else{
    mysong.pause();
    song.play();
  }
}

function preload(){
  // put preload code here
  song = loadSound("./assets/mytown.mp3");
  mysong = loadSound('./assets/moonlight.mp3');
}

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  //c1 = color(204, 102, 0);
  //c2 = color(0, 102, 153);

  //angleMode(DEGREES);
  button = createButton ('toggle');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0,256);
  //w = width/256;

}

function draw() {
  // put drawing code here
  background(0);
  var spectrum = fft.analyze();
  noStroke();
  translate(width/2,height/2);

   if (song.isPlaying()){

       for (var i = 0; i<spectrum.length; i++){
         var angle = map(i, 0, spectrum.length, 0, 360);
         var amp = spectrum[i];
         var r = map(amp, 0, 256, 20, 350);
         //var y = map (amp, 0, 256, height, 0);
         //var x = map (amp, 0, 256, width, 0);
         rotate(frameCount/150);
         var x = r*cos(angle);
         var y = r*sin(angle);

         //var c = lerpColor(c1, c2);
         strokeWeight(2);
         stroke(255,i,255);
         line(0,0,x,y);
       }

  } else if(mysong.isPlaying()){
    for (var i = 0; i<spectrum.length; i++){
      var angle = map(i, 0, spectrum.length, 0, 360);
      var amp = spectrum[i];
      var r = map(amp, 0, 256, 20, 350);
      rotate(frameCount/100);
      var x = r*cos(angle);
      var y = r*sin(angle);
      strokeWeight(1);
      stroke(255,i,255);
      line(0,0,x,y);
    }
  }

  myRate = map(mouseY,0, height,0,2);
  song.rate(myRate);
  // mysong.rate(myRate);



}
