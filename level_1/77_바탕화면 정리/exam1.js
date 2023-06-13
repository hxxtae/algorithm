function solution(wallpaper) {
  const confirmXY = (arr, x, y) => {
    const [minY, minX, maxY, maxX] = arr;
    return [Math.min(minY, y), Math.min(minX, x), Math.max(maxY, y+1), Math.max(maxX, x+1)];
  }
  const result = wallpaper.reduce((result, items, y) => 
    [...items].reduce((arr, item, x) => 
      arr = (item === '#' ? confirmXY(arr, x, y) : arr), result), [Infinity, Infinity, 0, 0]);
  return result;
}

// [접근]
// Node(0, 0)에 위치하는 파일(#)은 다음과 같다.
// ->
// Node(y, x)
// S(0, 0), E(1, 1)
// S(y, x), E(y+1, x+1)
// S(min(y), min(x)), E(max(y+1), max(x+1))
// S(minY, minX), E(maxY, maxX)

// 간단히 말하자면, 파일(#)이 위치하는 모든 좌표를 탐색하여 좌표의 최대(E), 최소(S) 좌표 [Sy, Sx, Ey, Ex]를 구한다.