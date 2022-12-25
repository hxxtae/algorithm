// 1.
function solution(board, moves) {
  let count = 0;
  const stack = [];
  const yLen = board.length;
  for(let i = 0, len = moves.length; i < len; i++) {
    const x = moves[i] - 1;
    for(let y = 0; y < yLen; y++) {
      const item = board[y][x];
      if(item) {
        stack.push(item);
        board[y][x] = 0;
        break;
      }
    }
    if(stack.length > 1) {
      if(stack.at(-1) === stack.at(-2)) {
        stack.pop();
        stack.pop();
        count += 2;
      }
    }
  }
  return count;
}

// NOTE: 스택 사용
// 2019 카카오 개발자 겨율 인턴십

// 2. 다르게 풀이

