const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, M] = input[0].split(' ').map(Number);
const ARR_N = input.slice(1, N + 1);
const ARR_M = input.slice(N + 1);

// -------------
// 풀이
// -------------
function solution(n, m, arrN, arrM) {
  const s = new Set(arrN);

  return arrM.filter(name => s.has(name)).length;
}

// -------------
// 출력
// -------------
const result = solution(N, M, ARR_N, ARR_M);
console.log(result);

// [접근]
// ### 방법
// M과 집합 S(N)에 존재하는 이름들의 교집합 개수를 구해야 한다.
// - 조건1 : 집합 S에는 같은 문자열이 여려 번 주어지는 경우는 없다. (N개의 문자열 중에서 중복된 문자열은 없다.)
// - 조건2 : M개의 문자열에서 중복된 문자열이 없다는 조건은 없다. -> 중복된 문자열이 S에 존재할 때, 중복된 문자열도 개수로 포함시켰더니 정답 처리 되었다.
