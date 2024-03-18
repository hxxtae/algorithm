const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [R, C] = input[0].split(' ').map(Number);
const TABLE = input.slice(1);

// -------------
// 풀이
// -------------
function solution(r, c, table) {
    
  const confirmStr = (startRow) => {
    const set = new Set();
    for (let col = 0; col < c; col++) {
      let str = "";
      for (let row = startRow; row < r; row++) {
        str += table[row][col];
      }
      set.add(str);
    }
    // 중복 있음
    if (c !== set.size) return true;
    // 중복 없음
    return false;
  }

  let count = 0;
  let start = 1, end = r - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    const confirm = confirmStr(mid);

    if (confirm) { // 중복 있음
      end = mid - 1;
    } else { // 중복 없음
      start = mid + 1;
      count = mid;
    }
  }

  return count;
}

// -------------
// 출력
// -------------
const result = solution(R, C, TABLE);
console.log(result);

// [접근]
// 각 열의 모든 문자열을 합친 각각의 문자열들 중에서 중복된 문자가 존재하는지,
// 반복해서 맨 위에서 부터 1개의 행을 지우고 또 다시 각 열의 모든 문자열을 합친 각각의 문자열들 중에서 중복된 문자가 존재하는지
// 중복된다면 거기 까지의 카운트를 출력한다.

// 이분탐색이 가능한 이유는 간단하다.
// 위에서 처럼 탐색을 통해 중복된 문자열이 존재한다면, 맨 위의 행에서 부터 지운 문자열 들을 제외하고 남은 문자열들은 모두 같다.

// 예를 들면 이렇다.
// b c d e
// c g a a
// a a k i
// a a k i 이면

//  b   c  d e
//  c   g  a a
// |a| |a| k i
// |a| |a| i k
// 와 같이 두 번째 행을 지우고 나서 부터 중복이 존재하고 나머지 문자열은 모두 같다.

// 이를 이분 탐색으로 구현하면 min = (start+end / 2) 의 행에서 중복이 존재하면 뒤에는 무시해도 되니까 end = (mid - 1)로 할당할 수 있다.
// 만약 mid = (start+end / 2) 의 행에서 중복이 존재하지 않는다면 앞에는 무시해도 되니까 start = (mid + 1)로 할당할 수 있다.



