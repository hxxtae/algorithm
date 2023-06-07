function solution(park, routes) {
  const startY = park.findIndex((item) => item.includes('S'));
  const startX = park[startY].indexOf('S');
  const rLen = park.length;
  const cLen = park[0].length;
  const result = [startY, startX];
  const confirmPos = (x, y) => {
    if(x < 0 || y < 0 || x >= cLen || y >= rLen) return false;
    if(park[y][x] === 'X') return false;
    return true;
  }
  const confirmGo = (x, y, op, n) => {
    const OP = ['E', 'S', 'W', 'N'];
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    const way = OP.indexOf(op);
    const initXY = [x, y];
    for(let i = 0; i < n; i++) {
      [x, y] = [x+X[way], y+Y[way]];
      const posState = confirmPos(x, y);
      if(!posState) return initXY;
    }
    return [x, y];
  }
  while(routes.length) {
    const [y, x] = result;
    const [op, n] = routes.shift().split(' ');
    const [nextX, nextY] = confirmGo(x, y, op, +n);
    [result[0], result[1]] = [nextY, nextX];
  }
  return result;
}