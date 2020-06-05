import { Graphics, Text, Container, Sprite } from "pixi.js";
// @ts-ignore
import flagImage from './flag.png';

export class Tile {

  public size = 30;
  public hidden: boolean;
  public isBomb: boolean;
  public bombBoundariesCount: number;
  public boundaryTiles: Tile[];
  public flagged: boolean;
  public container: Container;
  public block: Graphics;
  public blockText: Text;
  public flag: Sprite;

  constructor(
    public x: number,
    public y: number
  ) {

    this.hidden = true;
    this.isBomb = false;
    this.flagged = false;
    this.bombBoundariesCount = 0;
    this.container = new Container();
    this.block = new Graphics();
    this.blockText = new Text(this.bombBoundariesCount.toString());
    this.flag = Sprite.from(flagImage);

    this.startDraw();
  }

  public reset() {

    this.hidden = true;
    this.isBomb = false;
    this.flagged = false;
    this.bombBoundariesCount = 0;
    this.blockText.text = this.bombBoundariesCount.toString();
    this.blockText.visible = false;
    this.flag.visible = false;
  }

  public startDraw() {

    this.container.position.set(
      this.x * this.size,
      this.y * this.size,
    );
    this.block.beginFill(0xFFFFFF);
    this.block.lineStyle(1, 0xBDBDBD);
    this.block.drawRect(
      0,
      0,
      this.size,
      this.size,
    );
    this.block.endFill();

    this.blockText.x = (this.size / 2) - (this.blockText.width / 2);
    this.blockText.y = (this.size / 2) - (this.blockText.height / 2);
    this.blockText.style.fill = this.getTextColor();

    this.flag.width = this.size;
    this.flag.height = this.size;

    this.block.interactive = true;
    this.blockText.visible = false;
    this.flag.visible = false;

    this.container.addChild(this.block);
    this.container.addChild(this.blockText);
    this.container.addChild(this.flag);
  }

  public setBombBounderiesCount() {

    const bombBounderiesCount = this.boundaryTiles.filter(tile => tile.isBomb).length;

    this.bombBoundariesCount = bombBounderiesCount;
    this.blockText.style.fill = this.getTextColor();

    if (!this.isBomb) {

      this.blockText.text = bombBounderiesCount.toString();
    }
  }

  public getTextColor() {

    switch (this.bombBoundariesCount) {
      case 0: return '#ccc';
      case 1: return '#428cc1';
      case 2: return '#42c187';
      case 3: return '#d8c623';
      case 4: return '#e86a2c';
      case 5: return '#d63838';
      case 6: return '#7f0eb7';
      default: return '#ff03bc';
    }
  }

  public setAsBomb() {

    this.isBomb = true;
    this.blockText.text = 'X';

    this.boundaryTiles.forEach(tile => tile.setBombBounderiesCount());
  }

  public toggleFlag(flagged: boolean) {

    if (this.hidden) {

      this.flagged = flagged;
      this.flag.visible = flagged;
    }
  }

  public show(showSiblings: boolean) {

    if (!this.flagged && this.hidden) {

      this.hidden = false;
      this.blockText.visible = true;

      if (showSiblings && this.bombBoundariesCount === 0) {

        this.showSiblings();
      }
    }
  }

  public showSiblings() {

    for (const boundaryTile of this.boundaryTiles) {

      boundaryTile.show(true);
    }
  }

  public revealRemainingSiblings() {

    const flagAroundCount = this.boundaryTiles.filter(tile => tile.flagged).length;

    if (flagAroundCount === this.bombBoundariesCount) {

      this.showSiblings();
    }
  }
}