import * as d3 from "d3";
import { GRID_SIZE, addArray } from "../../constants/Constants";

class D3Drawer {
  cellDeltas: number[][];
  endDelta: number[];
  numIterations: number;
  svg: any;
  width: number;
  height: number;
  svgCanvas: any;

  constructor(
    grid: boolean[][],
    startCoords: number[],
    endCoords: number[],
    numIterations: number,
    svg
  ) {
    this.convertToDeltas(grid, startCoords, endCoords);
    this.numIterations = numIterations;
    this.svg = svg;
    this.width = 1000;
    this.height = 1000;

    this.svg.attr("viewBox", `-500 -500 ${this.width} ${this.height}`);
    this.svgCanvas = this.svg.append("g").attr("class", "D3Drawer-svgCanvas");
  }

  convertToDeltas(grid: boolean[][], startCoords: number[], endCoords: number[]) {
    this.cellDeltas = [];
    [
      [0, 1],
      [-1, 0],
      [0, 2],
      [5, 10],
    ];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j]) {
          this.cellDeltas.push([j - startCoords[1], i - startCoords[0]]);
        }
      }
    }
    this.endDelta = [endCoords[1] - startCoords[1], endCoords[0] - startCoords[0]];
  }

  renderIteration(n: number, rotateIdx: number, origin: number[]): number[] {
    // rotateIdx = number of quadrants clockwise (3 -> 270 deg CW)
    // origin = where the iteration starts from
    // returns coordinates of end point

    const rotateDelta: number[][] = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ]; // more translation from rotating about a corner
    let originRotated = addArray(origin, rotateDelta[rotateIdx]);

    if (n === 1) {
      let currentIteration = this.svgCanvas
        .append("g")
        .attr(
          "transform",
          `translate(${originRotated[0]}, ${originRotated[1]}) rotate(${rotateIdx * 90})`
        );
      for (let [dx, dy] of this.cellDeltas) {
        currentIteration
          .append("rect")
          .attr("x", dx)
          .attr("y", dy)
          .attr("width", 1)
          .attr("height", 1)
          .attr("fill", "#000000");
      }

      let [x, y] = this.endDelta;
      switch (rotateIdx) {
        case 0:
          return addArray(origin, [x, y]);
        case 1:
          return addArray(origin, [-y, x]);
        case 2:
          return addArray(origin, [-x, -y]);
        case 3:
          return addArray(origin, [y, -x]);
      }
    } else {
      let newOrigin = this.renderIteration(n - 1, rotateIdx, origin);
      return this.renderIteration(n - 1, (rotateIdx + 1) % 4, newOrigin);
    }
  }

  render() {
    this.renderIteration(this.numIterations, 0, [0, 0]);
    this.extra();
  }

  extra() {
    this.svgCanvas.attr("transform", "scale(8)");
  }
}

export default D3Drawer;
