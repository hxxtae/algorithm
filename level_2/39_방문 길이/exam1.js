function solution(dirs) {
  const mapArr = [];
  for(let y = 5; y >= -5; y--) {
    for(let x = -5; x <= 5; x++) {
      mapArr.push([`${x},${y}`, []]);
    }
  }
  const map = new Map(mapArr);
  let sX = 0, sY = 0;
  let count = 0;
  for(let pos of dirs) {
    const [x, y] = moveLocation(pos);
    if(checkMaxMinLocation(sX + x, sY + y)) continue;
    const nowXY = `${sX},${sY}`;
    const nextXY = `${sX + x},${sY + y}`;
    sX += x;
    sY += y;
    if(checkLocationHistory(nowXY, nextXY, map)) continue;
    count++;
  }
  return count;
}

function moveLocation(c) {
  if(c === 'U') return [0, 1];
  else if(c === 'D') return [0, -1];
  else if(c === 'L') return [-1, 0];
  else if(c === 'R') return [1, 0];
  return [0, 0];
}
  
function checkMaxMinLocation(x, y) {
  const [maxXY, minXY] = [5, -5];
  if(x > maxXY || y > maxXY) return true;
  if(x < minXY || y < minXY) return true;
  return false;
}

function checkLocationHistory(now_xy, next_xy, map) {
  const nowXYhistory = map.get(now_xy);
  const nextXYhistory = map.get(next_xy);
  if(nowXYhistory.includes(next_xy)) return true;
  nowXYhistory.push(next_xy);
  nextXYhistory.push(now_xy);
  return false;
}

// NOTE: 해시 / 그래프

// [접근]
// 모든 좌표에 대한 history를 map에 담아 새로운 좌표와 아닌 좌표를 판별한다.
// 0. map에 (5,5) 부터 (-5,-5) 까지 모든 좌표를 해시로 만든다.
// 1. dirs를 참조하여 루프를 돌면서 이동한 좌표를 map에 기록한다.
//   - dirs의 문자를 통해 좌표를 구한다.
//   - 주어진 좌표의 Max, Min을 넘으면 다음 좌표를 가져온다.
//   - 구한 좌표를 map에 기록하고 비교한다.
//      - 해당 좌표에서 다음 좌표의 기록이 있다면 (중복), 아니면 (처음)
//      - 처음이면 count로 이동 거리를 증가한다.
// 2. 반복

// map
// '0,0': ['1,0', '0,1'] : 배열 최대 길이 4
// '1,0': ['0,0', '1,1']
// '1,1': ['1,0', '0,1']
// '0,1': ['1,1', '0,0']
// ...