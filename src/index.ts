import './style.css';
import { Application } from 'pixi.js';
import { Grid } from './grid';
import { info } from './info';

const app = new Application({
  transparent: true,
});

document.getElementById('content')?.appendChild(app.view);

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).grid = grid;
