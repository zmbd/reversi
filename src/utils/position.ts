export const getPosition = (i: number, columns: number) => {
  return { row: Math.floor(i / columns), col: Math.floor(i % columns) };
}
