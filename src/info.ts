import { Container, TextStyle, Text, Application } from "pixi.js";
import { Grid, GameState } from "./grid";

export function info({
  reset,
  grid,
  app
}: { reset: () => void, grid: Grid, app: Application }) {

  const infoContainer = new Container();
  infoContainer.x = grid.container.width;

  const button = new Text('RESETAR');
  button.on('click', reset);
  button.interactive = true;
  infoContainer.addChild(button);

  const flagCount = new Text('');
  flagCount.y = button.height;
  infoContainer.addChild(flagCount);

  // const finalizeGame = new Text('');
  // finalizeGame.y = flagCount.height;
  // infoContainer.addChild(finalizeGame);

  app.ticker.add(() => {

    switch (grid.state) {
      case GameState.progress:

        const bombCount = grid.tiles.filter(tile => tile.isBomb).length;
        const flaggedCount = grid.tiles.filter(tile => tile.flagged).length;

        flagCount.text = (bombCount - flaggedCount).toString();
        break;

      case GameState.win:

        flagCount.text = 'Ganhou!';
        break;

      case GameState.loose:

        flagCount.text = 'Perdeu';
        break;

      default:
        flagCount.text = 'Clique';
        break;
    }
  });

  app.stage.addChild(infoContainer);
}