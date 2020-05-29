export const getPosition = (i: number, x: number) => [i % x, Math.floor(i / x)];

export const getIndexByPosition = (x: number, y: number, width: number) => y * width + x;

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
    ...getPositionHorizontalSibings(verticalPositions[0][0], verticalPositions[0][1]),
    ...getPositionHorizontalSibings(verticalPositions[1][0], verticalPositions[1][1])
  ]
};

export const filterInvalidPositions = (positions: number[][], width: number, height: number) => {

  return positions.filter(position => {

    const [x, y] = position;

    return x >= 0 && y >= 0 && x < width && y < height;
  });
};