const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' '));
const N = +input[0];
const ARR_N = input.slice(1, N + 1);
const M = +input[N + 1];
const ARR_M = input.slice(N + 2);

// -------------
// 입력
// -------------
function solution(n, arr_n, m, arr_m) {
  const graph = Array.from({ length: 26 }, () => Array(26).fill(Infinity));

  const charFormatIndex = (charA, charB) => {
    return [charA.charCodeAt() - 97, charB.charCodeAt() - 97];
  }
  
  for (let [a, _, b] of arr_n) {
    [a, b] = charFormatIndex(a, b);
    graph[a][b] = 1;
  }

  for (let k = 0; k < 26; k++) {
    for (let r = 0; r < 26; r++) {
      for (let c = 0; c < 26; c++) {
        if (graph[r][c] > (graph[r][k] + graph[k][c])) {
          graph[r][c] = graph[r][k] + graph[k][c];
        }
      }
    }
  }

  const resultArr = [];
  for (let [a, _, b] of arr_m) {
    [a, b] = charFormatIndex(a, b);
    if (graph[a][b] !== Infinity) {
      resultArr.push('T');
      continue;
    }
    resultArr.push('F');
  }
  
  return resultArr.join('\n');
}

// -------------
// 입력
// -------------
const result = solution(N, ARR_N, M, ARR_M);
console.log(result);

// [접근]
// 전형적인 플로이드-와샬 알고리즘 유형의 문제이다.

// 접근은 단순하다. a is b는 a는 b라고 전제를 두고있다. a -> b

// 위의 예시를 바탕으로 이를 연결 그래프로 나타낸다면 a -> b -> c -> d 이다.

// 여기서 노드간의 연결된 간선의 길이를 1로 둔다.

// 이를 바탕으로 각 노드들에서 각 노드들까지의 최단경로를 구하는 플로이드-와샬 알고리즘을 적용시켜본다.
// ```text
// a -> a / a -> b / a -> c / a -> d
// b -> a / b -> b / b -> c / b -> d
// c -> a / c -> b / c -> c / c -> d
// d -> a / d -> b / d -> c / d -> d
// ```

// 결과는 아래와 같을 것이다.
// ```text
// a -> a : - / a -> b : 1 / a -> c : 2 / a -> d : 3
// b -> a : - / b -> b : - / b -> c : 1 / b -> d : 2
// c -> a : - / c -> b : - / c -> c : - / c -> d : 1
// d -> a : - / d -> b : - / d -> c : - / d -> d : -
// ```

// 마지막으로 결과 출력은 m개의 관계 graph와 비교하여 값(유한한 길이의 값)이 존재하면
// 해당 관계는 참(T), 아니면 거짓(F)으로 판별한다.