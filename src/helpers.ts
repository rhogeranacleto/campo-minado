export const getPosition = (i: number, x: number) => [i % x, Math.floor(i / x)];

export const getIndexByPosition = (x: number, y: number, width: number) =>
  y * width + x;

export const getPositionHorizontalSibings = (x: number, y: number) => [
  [x - 1, y],
  [x + 1, y],
];

export const getPositionVerticalSibings = (x: number, y: number) => [
  [x, y - 1],
  [x, y + 1],
];

export const getBoundariesPositions = (x: number, y: number) => {
  const verticalPositions = getPositionVerticalSibings(x, y);

  return [
    ...getPositionHorizontalSibings(x, y),
    ...verticalPositions,
    ...getPositionHorizontalSibings(
      verticalPositions[0][0],
      verticalPositions[0][1],
    ),
    ...getPositionHorizontalSibings(
      verticalPositions[1][0],
      verticalPositions[1][1],
    ),
  ];
};

export const filterInvalidPositions = (
  positions: number[][],
  width: number,
  height: number,
) => {
  return positions.filter((position) => {
    const [x, y] = position;

    return x >= 0 && y >= 0 && x < width && y < height;
  });
};

export const getTextColor = (bombBoundariesCount: number) => {
  switch (bombBoundariesCount) {
    case 0:
      return '#ccc';
    case 1:
      return '#428cc1';
    case 2:
      return '#42c187';
    case 3:
      return '#d8c623';
    case 4:
      return '#e86a2c';
    case 5:
      return '#d63838';
    case 6:
      return '#7f0eb7';
    default:
      return '#ff03bc';
  }
};
