function solution(n) {
  const arr = [];
  let count = 0;
  const posChk = (r) => {
    for(let j = 0; j < r; j++) {
      if(arr[r] === arr[j]) return false; // 열 비교(가로 비교)
      if(Math.abs(r - j) === Math.abs(arr[r] - arr[j])) return false; // 기울기 비교(대각선 비교)
    }
    return true;
  }
  const dfs = (deep) => {
    if(deep === n) {
      count++;
      return;
    }
    for(let i = 0; i < n; i++) {
      arr[deep] = i;
      if(posChk(deep)) {
        dfs(deep + 1);
      }
    }
  }
  dfs(0);
  return count;
}

// NOTE: DFS

// 접근이 간단하지만 어려움... (단순하게 생각하면 되지만 그게 어려움)

// [접근]
// 배열의 인덱스가 행번호, 배열의 값이 열번호를 가지는 일차원 배열로 비교.
// <0  1  2  3 = deep>
// [0, 0, -, -]
// [-, 1, -, -] 
// [-, 2, -, -]
// [-, -, -, -]

// [0, 0, 0, 0]
// [1, 1, -, 1]
// [-, 2, -, 2]
// [-, 3, -, -]
// -> count + 1

// ...
