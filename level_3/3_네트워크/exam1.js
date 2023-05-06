function solution(n, computers) {
  const visited = Array(n).fill(0);
  const len = computers.length;
  let count = 0;
  const dfs = (arr, com) => {
    for(let i = 0; i < len; i++) {
      const conn = arr[i];
      if(conn === 0 || com === i) continue;
      if(visited[i]) continue;
      visited[i] = 1;
      dfs(computers[i], i);
    }
  }
  for(let i = 0; i < len; i++) {
    if(visited[i]) continue;
    dfs(computers[i], i);
    count++;
  }
  return count;
}

// NOTE: DFS


function solution(n, computers) {
const visited = Array.from({ length: n }, () => 0);

const bfs = (computer) => {
  const queue = [];
  queue.push(computer);
  visited[computer] = 1;

  while (queue.length) {
    const com = queue.shift();
    
    computers[com].forEach((connectCom, idx) => {
      if (!visited[idx]) {
        if (connectCom === 1) {
          visited[idx] = 1;
          queue.push(idx);
        }
      }
    });
  }
};

let cnt = 0;
for (let i = 0; i < n; i++) {
  if (!visited[i]) {
    cnt++;
    bfs(i);
  }
}

return cnt;
}

// NOTE: BFS