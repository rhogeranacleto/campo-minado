const Container = jest.fn(() => ({
  position: {
    set: jest.fn()
  },
  addChild: jest.fn()
}));

const Graphics = jest.fn(() => ({
  beginFill: jest.fn(),
  lineStyle: jest.fn(),
  drawRect: jest.fn(),
  endFill: jest.fn(),
  on: jest.fn()
}));

const Text = jest.fn(() => ({
  style: {
    fill: ''
  }
}));

module.exports = {
  Container,
  Graphics,
  Text,
  Sprite: {
    from: jest.fn(() => ({}))
  }
}