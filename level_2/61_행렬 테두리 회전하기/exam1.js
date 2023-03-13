function solution(rows, columns, queries) {
  const arr = Array
      .from({length: rows}, (row, rowI) => Array
            .from({length: columns}, (col, colI) => (rowI * columns) + colI + 1));
  
  const result = [];
  for(let i = 0, len = queries.length; i < len; i++) {
      const num = cycleOfArr(...queries[i], arr, Infinity);
      result.push(num);
  }
  return result;
}

function cycleOfArr(y1, x1, y2, x2, arr, min) {
  x1 -= 1;
  x2 -= 1;
  y1 -= 1;
  y2 -= 1;
  let next = arr[y1][x1],
      now = 0;
  for(let x = x1; x < x2; x++) {
      now = next;
      next = arr[y1][x + 1];
      arr[y1][x + 1] = now;
      min = Math.min(min, now);
  }
  for(let y = y1; y < y2; y++) {
      now = next;
      next = arr[y + 1][x2];
      arr[y + 1][x2] = now;
      min = Math.min(min, now);
  }
  for(let x = x2; x > x1; x--) {
      now = next;
      next = arr[y2][x - 1];
      arr[y2][x - 1] = now;
      min = Math.min(min, now);
  }
  for(let y = y2; y > y1; y--) {
      now = next;
      next = arr[y - 1][x1];
      arr[y - 1][x1] = now;
      min = Math.min(min, now);
  }
  return min;
}
