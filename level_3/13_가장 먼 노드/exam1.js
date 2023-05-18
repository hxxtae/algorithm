function solution(n, edge) {
  const len = edge.length;
  const matrix = Array.from({length: n+1}, () => []);
  for(let i = 0; i < len; i++) {
    const [s, e] = edge[i];
    // 인접 리스트
    matrix[s].push(e);
    matrix[e].push(s);
  }
  const short = Array.from({length: n+1}, (v, i) => i === 0 || i === 1 ? 0 : Infinity);
  const queue = [[1, 0]];
  while(queue.length) {
    const [pos, dis] = queue.pop();
    for(const re of matrix[pos]) {
      if(short[re] > short[pos] + 1) {
        short[re] = short[pos] + 1;
        queue.push([re, 1]);
      }
    }
  }
  let max = 0;
  max = Math.max(max, ...short);
  return short.filter((num) => num === max).length;
}

// NOTE: BFS, 다익스트라
