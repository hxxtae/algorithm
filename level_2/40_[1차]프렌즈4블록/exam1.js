function solution(m, n, board) {
  board = board.map(str => [...str]);
  const count = new Set();
  let bingoBlocks = [];
  let step = 1;
  while(1) {
    for(let row = 0; row < m - 1; row++) {
      for(let col = 0; col < n - 1; col++) {
        if(findBingo(row, col, board)) bingoBlocks.push([row, col]);
      }
    }
    if(!bingoBlocks.length) break;
    changeZero(bingoBlocks, step, count, board);
    changeCols(m, n, board);
    bingoBlocks = [];
    step++;
  }
  return count.size;
}

function findBingo(row, col, board) {
  const item = board[row][col];
  if(item === '0') return false;
  if(item !== board[row][col+1]) return false;
  if(item !== board[row+1][col]) return false;
  if(item !== board[row+1][col+1]) return false;
  return true;
}

function changeZero(list, step, count, board) {
  for(let i = 0, len = list.length; i < len; i++) {
    const [row, col] = list[i];
    count.add(`${step}_${row}_${col}`);
    count.add(`${step}_${row}_${col + 1}`);
    count.add(`${step}_${row + 1}_${col}`);
    count.add(`${step}_${row + 1}_${col + 1}`);
    board[row][col] = '0';
    board[row][col + 1] = '0';
    board[row + 1][col] = '0';
    board[row + 1][col + 1] = '0';
  }
}

function changeCols(rLen, cLen, board) {
  for(let col = 0; col < cLen; col++) {
    const cols = [];
    for(let row = 0; row < rLen; row++) {
      const item = board[row][col];
      if(item === '0') continue;
      else cols.push(item);
    }
    if(!cols.length) continue;
    const strCols = cols.join('').padStart(rLen, '0');
    for(let n = 0; n < rLen; n++) {
      board[n][col] = strCols[n];
    }
  }
}

// [접근]
// 1. 터지는 기준 블록 찾기
//   board를 루프하면서 터지는 블록의 기준 블록을 찾는다. -> 터지는 기준 블록 push

// 2. (터지는 기준 블록을 통해)터지는 블록들 체크 및 카운트
//   터지는 모든 블록을 카운트한다. -> Set.add()
//   터지는 모든 블록의 index의 value를 0으로 변경한다.

// 3. 블록을 모두 아래로 재정렬한다.
//   각 열(세로) 기준으로 동일한 열(세로)에서 유효한 행의 값을 새로운 배열에 추가 하고
//   나머지는 행의 길이에 맞게 배열에 0을 추가 한다. 
//   그리고 board의 index에 열 기준으로 변경된 블록들을 수정해준다.

// 반복 -> 더 이상 터지는 블록이 없으면 결과값 반환 및 종료.

