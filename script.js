const net = new brain.NeuralNetwork();

const trainingData = [
  { input: { r: 0, g: 0, b: 0 }, output: [1] },
  { input: { r: 1, g: 1, b: 1 }, output: [0] },
];

// net.train(trainingData, {
//   log: (error) => console.log(error),
// });

net.train(trainingData);

//const diagram = document.getElementById("diagram");
// diagram.innerHTML = brain.utilities.toSVG(net);
// console.log(net.run({ r: 1, g: 1, b: 0 }));

const colorEl = document.getElementById('color');
const guessEl = document.getElementById('guess');
const whiteButton = document.getElementById('white-button');
const blackButton = document.getElementById('black-button');
const nextButton = document.getElementById('next-button');
const printButton = document.getElementById('print-button');
let color;
setRandomColor();

function setRandomColor(){
  color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  }
  const guess = net.run(color)[0];
  guessEl.style.color = guess > 0.5 ? '#fff' : '#000';
  colorEl.style.backgroundColor = `rgb(${color.r*255},${color.g*255}, ${color.b*255})`;
}


function chooseColor(value){
  trainingData.push({ 
      input: color, 
      output: [value] 
    });
  
    setRandomColor();
}
function print(){
  console.log(JSON.stringify(trainingData));
}

whiteButton.addEventListener('click',function(e){
  chooseColor(1);
});
blackButton.addEventListener('click',function(e){
  chooseColor(0);
});
nextButton.addEventListener('click',function(e){
  setRandomColor();
});
printButton.addEventListener('click',function(e){
  print();
});



