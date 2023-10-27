// main.js

const SVG = require('svg.js');

function getUserInput() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    let input = {
      text: "",
      textColor: "",
      shape: "",
      shapeColor: ""
    };

    const getInput = (prompt, property) => {
      return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
          input[property] = answer;
          resolve();
        });
      });
    };

    getInput("Enter up to three characters: ", "text")
      .then(() => getInput("Enter text color: ", "textColor"))
      .then(() => getInput("Choose a shape (circle, triangle, square): ", "shape"))
      .then(() => getInput("Enter shape color: ", "shapeColor"))
      .then(() => {
        rl.close();
        resolve(input);
      });
  });
}

function generateSVG(input) {
  const draw = SVG('logo').size(300, 200);

  // Logic to create the SVG logo based on user input goes here
  // This is a simplified example, you need to adapt it to your requirements

  // Example: Creating a rectangle with text
  draw.rect(100, 100).fill(input.shapeColor);
  draw.text(input.text).fill(input.textColor).move(50, 50);
}

async function main() {
  const userInput = await getUserInput();
  generateSVG(userInput);
  console.log("Generated logo.svg");
}

if (require.main === module) {
  main();
}

module.exports = {
  getUserInput,
  generateSVG
};
