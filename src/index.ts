import { Application, Text, TextStyle, Container } from 'pixi.js';
import { Grid } from './grid';
import { info } from './info';

const app = new Application({
  backgroundColor: 0xCCCCCC
});

document.body.appendChild(app.view);

app.view.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const grid = new Grid(15, 15);

grid.generateTiles();

app.stage.addChild(grid.container);

info({
  reset: () => grid.reset(),
  grid,
  app,
});

(window as any).grid = grid;