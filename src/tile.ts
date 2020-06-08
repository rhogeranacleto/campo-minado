import { Graphics, Text, Container, Sprite } from "pixi.js";
import flagImage from './assets/flag.png';
import bomb from './assets/blast.png';

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
  public bomb: Sprite;

  constructor(
    public x: number,
    public y: number
  ) {

    this.draw();
    this.reset();
  }

  public reset() {

    this.hidden = true;
    this.isBomb = false;
    this.flagged = false;
    this.bombBoundariesCount = 0;
    this.blockText.text = this.bombBoundariesCount.toString();
    this.blockText.style.fill = this.getTextColor();
    this.blockText.visible = false;
    this.flag.visible = false;
    this.bomb.visible = false;
  }

  public draw() {

    this.drawContainer();
    this.drawBlock();
    this.drawBlockText();
    this.drawBomb();
    this.drawFlag();
    this.addComponentsToContainer();
  }

  public drawContainer() {

    this.container = new Container();
    this.container.position.set(
      this.x * this.size,
      this.y * this.size,
    );
  }

  public drawBlock() {

    this.block = new Graphics();
    this.block.beginFill(0xFFFFFF);
    this.block.lineStyle(1, 0xBDBDBD);
    this.block.drawRect(
      0,
      0,
      this.size,
      this.size,
    );
    this.block.endFill();
    this.block.interactive = true;
  }

  public drawBlockText() {

    this.blockText = new Text('0');
    this.blockText.x = this.getBlockMiddle(this.blockText.width);
    this.blockText.y = this.getBlockMiddle(this.blockText.height);
    this.blockText.style.fill = this.getTextColor();
  }

  public drawBomb() {

    this.bomb = Sprite.from(bomb);
    this.bomb.width = this.size * 0.8;
    this.bomb.height = this.size * 0.8;
    this.bomb.x = this.getBlockMiddle(this.bomb.width);
    this.bomb.y = this.getBlockMiddle(this.bomb.height);
  }

  public drawFlag() {

    this.flag = Sprite.from(flagImage);
    this.flag.width = this.size * 0.8;
    this.flag.height = this.size * 0.8;
    this.flag.x = this.getBlockMiddle(this.flag.width);
    this.flag.y = this.getBlockMiddle(this.flag.height);
  }

  public addComponentsToContainer() {

    this.container.addChild(this.block);
    this.container.addChild(this.blockText);
    this.container.addChild(this.flag);
    this.container.addChild(this.bomb);
  }

  private getBlockMiddle(size: number) {
    return (this.size / 2) - (size / 2);
  }

  public setBombBounderiesCount() {

    const bombBounderiesCount = this.boundaryTiles.filter(tile => tile.isBomb).length;

    this.bombBoundariesCount = bombBounderiesCount;
    this.blockText.style.fill = this.getTextColor();
    this.blockText.text = bombBounderiesCount.toString();
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
    this.blockText.text = '';

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
      this.bomb.visible = this.isBomb;

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