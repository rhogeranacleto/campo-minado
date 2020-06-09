import { Container, Graphics, Sprite, Text } from 'pixi.js';
import bomb from './assets/blast.png';
import flagImage from './assets/flag.png';
import { getTextColor } from './helpers';

export class Tile {
  public size = 30;
  public hidden: boolean;
  public isBomb: boolean;
  public boundaryTiles: Tile[];
  public flagged: boolean;
  public container: Container;
  public block: Graphics;
  public blockText: Text;
  public flag: Sprite;
  public bomb: Sprite;

  constructor(public x: number, public y: number) {
    this.boundaryTiles = [];
    this.draw();
    this.reset();
  }

  private get bombBoundariesCount() {
    return this.boundaryTiles.filter((tile) => tile.isBomb).length;
  }

  public setAsBomb() {
    this.isBomb = true;
    this.blockText.text = '';

    this.boundaryTiles.forEach((tile) => tile.setBombBounderiesCount());
  }

  public toggleFlag(flagged: boolean) {
    if (this.hidden) {
      this.flagged = flagged;
      this.flag.visible = flagged;
    }
  }

  public show(showSiblings: boolean) {
    if (this.hidden && !this.flagged) {
      this.hidden = false;
      this.blockText.visible = true;
      this.bomb.visible = this.isBomb;

      if (showSiblings && this.bombBoundariesCount === 0) {
        this.showSiblings();
      }
    }
  }

  public revealRemainingSiblings() {
    const flagAroundCount = this.boundaryTiles.filter((tile) => tile.flagged)
      .length;

    if (flagAroundCount === this.bombBoundariesCount) {
      this.showSiblings();
    }
  }

  public reset() {
    this.hidden = true;
    this.isBomb = false;
    this.flagged = false;
    this.blockText.text = this.bombBoundariesCount.toString();
    this.blockText.style.fill = getTextColor(this.bombBoundariesCount);
    this.blockText.visible = false;
    this.flag.visible = false;
    this.bomb.visible = false;
  }

  private draw() {
    this.drawContainer();
    this.drawBlock();
    this.drawBlockText();
    this.drawBomb();
    this.drawFlag();
    this.addComponentsToContainer();
  }

  private drawContainer() {
    this.container = new Container();
    this.container.position.set(this.x * this.size, this.y * this.size);
  }

  private drawBlock() {
    this.block = new Graphics();
    this.block.beginFill(0xffffff);
    this.block.lineStyle(1, 0xbdbdbd);
    this.block.drawRect(0, 0, this.size, this.size);
    this.block.endFill();
    this.block.interactive = true;
  }

  private drawBlockText() {
    this.blockText = new Text('0');
    this.blockText.x = this.getBlockMiddle(this.blockText.width);
    this.blockText.y = this.getBlockMiddle(this.blockText.height);
    this.blockText.style.fill = getTextColor(this.bombBoundariesCount);
  }

  private drawBomb() {
    this.bomb = Sprite.from(bomb);
    this.bomb.width = this.size * 0.8;
    this.bomb.height = this.size * 0.8;
    this.bomb.x = this.getBlockMiddle(this.bomb.width);
    this.bomb.y = this.getBlockMiddle(this.bomb.height);
  }

  private drawFlag() {
    this.flag = Sprite.from(flagImage);
    this.flag.width = this.size * 0.8;
    this.flag.height = this.size * 0.8;
    this.flag.x = this.getBlockMiddle(this.flag.width);
    this.flag.y = this.getBlockMiddle(this.flag.height);
  }

  private addComponentsToContainer() {
    this.container.addChild(this.block);
    this.container.addChild(this.blockText);
    this.container.addChild(this.flag);
    this.container.addChild(this.bomb);
  }

  private showSiblings() {
    for (const boundaryTile of this.boundaryTiles) {
      boundaryTile.show(true);
    }
  }

  private setBombBounderiesCount() {
    const bombBoundariesCount = this.bombBoundariesCount;
    this.blockText.style.fill = getTextColor(bombBoundariesCount);
    this.blockText.text = bombBoundariesCount.toString();
  }

  private getBlockMiddle(size: number) {
    return this.size / 2 - size / 2;
  }
}
