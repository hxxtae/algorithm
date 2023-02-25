function solution(arr) {
  let count1 = 0,
      count0 = 0;
  const square = (x, y, level) => { // 재귀
    if(level === 1) return arr[y][x];
    level = level / 2;
      
    const nowArr = [];
    const squareArr = [[x, y], [x + level, y], [x, y + level], [x + level, y + level]];
    for(let [nowX, nowY] of squareArr) {
      nowArr.push(square(nowX, nowY, level));
    }
    const num1Check = nowArr.every(num => num === 1);
    const num0Check = nowArr.every(num => num === 0);
    if(!num1Check && !num0Check) {
      nowArr.forEach((num) => {
        if(num === 1) count1++;
        else if(num === 0) count0++;
      });
    }
    return num1Check ? 1 : num0Check ? 0 : 2;
  }
  const num = square(0, 0, arr.length);
  if(num === 1) count1++;
  if(num === 0) count0++;
  return [count0, count1];
}

// NOTE: 분할 정복 / 재귀
