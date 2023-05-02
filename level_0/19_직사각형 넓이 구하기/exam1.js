function solution(dots) {
  const listX = [...new Set(dots.map(([x, y]) => x))];
  const listY = [...new Set(dots.map(([x, y]) => y))];
  const w = Math.abs(listX[0] - listX[1]);
  const h = Math.abs(listY[0] - listY[1]);
  return w * h;
}

// NOTE: 문제 구현 능력