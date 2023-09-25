const CELLSIZE = 8;
let rowWidth = 100;
let MAXGENERATIONS = 120;

let rule30 = [0, 0, 0, 1, 1, 1, 1, 0];
let rule135 = [1, 0, 1, 0, 0, 1, 1, 1];
let generations;
let cellsOne;
let cellsTwo;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rowWidth = Math.floor(windowWidth / CELLSIZE);
  print(rowWidth);
  generations = 0;
  cellsOne = new Array(rowWidth);
  cellsOne.fill(0);
  cellsOne[Math.floor(rowWidth / 2)] = 1;
  cellsTwo = new Array(rowWidth);
  cellsTwo.fill(0);
  cellsTwo[Math.floor(rowWidth / 2)] = 1;
  noStroke();
  
  while (generations < MAXGENERATIONS) {
    frameRate(10);
    displayCells(color(0, 0, 255), color(255, 150, 100), cellsOne);
    cellsOne = computeNextGeneration(cellsOne, rule30);
    displayCells(color(255, 0 ,0, 128), color(0, 255, 0 ,128), cellsTwo);
    cellsTwo = computeNextGeneration(cellsTwo, rule135);
    generations++;
  }
  
}

// draw function used if we want to animate layers beign drawn
/*
function draw() {
  frameRate(10);
  displayCells(color(0, 0, 255), color(255, 150, 100), cellsOne);
  cellsOne = computeNextGeneration(cellsOne, rule30);
  displayCells(color(255, 0 ,0, 128), color(0, 255, 0 ,128), cellsTwo);
  cellsTwo = computeNextGeneration(cellsTwo, rule31);
  generations++;
}
*/

function displayCells(colorA, colorD, cells) {
  for (let i = 0; i < cells.length; i++) {
    // alive cell, fill 
    if (cells[i] == 1) {
      fill(colorA);
      rect(0 + CELLSIZE * i, generations * CELLSIZE, CELLSIZE);
    } else {
      // dead cell, dont fill
      fill(colorD);
      rect(0 + CELLSIZE * i, generations * CELLSIZE, CELLSIZE);
    }
  }
}

function computeNextGeneration(cells, rule) {
  // create new array to fill 
  let nextGenCells = new Array(rowWidth);
  nextGenCells.fill(0);
  for (let i = 0; i < nextGenCells.length; i++) {
    // off left edge, use right most as left bit
    if (i - 1 < 0) {
      nextGenCells[i] = applyRule(
        cells[cells.length - 1],
        cells[i],
        cells[i + 1],
        rule
      );
      // off right edge, use left most as right bit
    } else if (i + 1 == cells.length) {
      nextGenCells[i] = applyRule(cells[i - 1], cells[i], cells[0], rule);
      // in middle area
    } else {
      print(cells);
      nextGenCells[i] = applyRule(cells[i - 1], cells[i], cells[i + 1], rule);
    }
  }
  return nextGenCells;
}

function applyRule(a, b, c, rule) {
  // computing which index to return from
  let index = a * Math.pow(2, 2) + b * Math.pow(2, 1) + c * Math.pow(2, 0);
  // least significant digit is at highest array value. 
  index = (index - 7) * -1;
  // return (a == 1) ^ ((b == 1) | (c == 1)) ? 1 : 0;
  return rule[index];
}
