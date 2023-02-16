// 풀이 1.
function solution1(word) {
  const words = 'AEIOU';
  let count = 0;
  let state = false;
  const dfs = (str = '') => {
    if(word === str) {
      state = true;
      return count;
    }
    if(str.length >= words.length) return;
    for(let i = 0, len = words.length; i < len; i++) {
      const c = words[i];
        count++;
        dfs(str + c);
        if(state) return;
    }
  }
  dfs('');
  return count;
}

// NOTE: 완전탐색 / DFS / 재귀 / 중복 순열

// 풀이 2. 
function solution2(word) {
  return word.split('').reduce((r, c, i) => r + [781, 156, 31, 6, 1][i] * ['A', 'E', 'I', 'O', 'U'].indexOf(c) + 1, 0);
}

// NOTE: 수학적 접근 방법