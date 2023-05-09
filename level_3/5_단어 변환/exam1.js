function solution(begin, target, words) {
  if(words.indexOf(target) < 0) return 0;
  
  const len = words.length;
  const visited = Array(len).fill(0);
  let min = len;
  let count = 0;
  
  const wordValidate = (word, comword) => {
    let chkCnt = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== comword[i]) {
        chkCnt++;
        if (chkCnt > 1) return false;
      }
    }
    return true;
  }
  
  const dfs = (word) => {
    if(word === target) {
      min = Math.min(count, min);
      return;
    }
    for(let i = 0; i < len; i++) {
      if(visited[i]) continue;
      const next = words[i];
      const match = wordValidate(word, next);
      if(match) {
        visited[i] = 1;
        count++;
              
        dfs(next);
              
        visited[i] = 0;
        count--;
      }
    }
  }
  dfs(begin);
  return min;
}

// NOTE: DFS

// [반례]
// aaa, aab 인 경우의 단어도 생각해야 한다.

function solution(begin, target, words) {
  if(words.indexOf(target) < 0) return 0;

  const visited = Array.from({ length: words.length }, () => 0);
  let result = 0;

  const wordValidate = (word, comword) => {
    let chkCnt = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== comword[i]) {
        chkCnt++;
        if (chkCnt > 1) return false;
      }
    }
    return true;
  }
  
  const bfs = () => {
    const queue = [];
    queue.push([begin, 0]); // word, depth
    
    while (queue.length) {
      const [temp, depth] = queue.shift();

      if (temp === target) {
          result = depth;
          break;
      }
      
      words.forEach((word, idx) => {
        if (!visited[idx]) {
          const chk = wordValidate(temp, word);
          if (chk) {
            visited[idx] = 1;
            queue.push([word, depth + 1]);
          }
        }
      });
    }
  }

  bfs();
  return result;
}

// NOTE: BFS
