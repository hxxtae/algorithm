// 풀이 1.
function solution1(N, road, K) {
  const visited = Array(N + 1).fill(0);
  const roadGraph = Array(N + 1).fill(null).map((row, idx) => Array.from({length: N + 1}, (v, i) => idx === i ? 0 : Infinity ));
  for(let [s, e, k] of road) {
    roadGraph[s][e] = roadGraph[s][e] === Infinity ? k : Math.min(roadGraph[s][e], k);
    roadGraph[e][s] = roadGraph[e][s] === Infinity ? k : Math.min(roadGraph[e][s], k);
  }
  const stack = [...roadGraph[1]]; // 1에서 각 지점의 최단경로들
  const queue = stack.map((k, n) => [n, k]);
  queue.splice(0, 2);
  visited[1] = 1;
    
  while(queue.length) {
    queue.sort((a, b) => a[1] - b[1]);
    const [n, k] = queue.shift();
    visited[n] = 1;
        
    for(let i = 1; i < stack.length; i++) {
      if(visited[i]) continue;
      const kOfn = roadGraph[n][i];
      stack[i] = Math.min(stack[i], (k + kOfn));
      const idx = queue.findIndex(([n, k]) => n === i);
      queue[idx][1] = stack[i];
    }
  }
  return stack.filter(num => num <= K).length;
}
// -> 다익스트라 알고리즘을 모르고 푼 풀이

// 풀이 2.
function solution2(N, road, K) {
  const stack = Array(N + 1).fill(Infinity); // 1에서 각 지점의 최단경로들
  const roadGraph = Array(N + 1).fill(null).map((row, idx) => Array.from({length: N + 1}, (v, i) => idx === i ? 0 : Infinity ));
  for(let [s, e, k] of road) {
    roadGraph[e][s] = Math.min(roadGraph[e][s], k);
    roadGraph[s][e] = Math.min(roadGraph[s][e], k);
  }
  const queue = [[1, 0]];
  stack[1] = 0;
  
  while(queue.length) {
    const [n, k] = queue.shift();
      
    for(let i = 1; i < stack.length; i++) {
      if(!roadGraph[n][i]) continue;
      const [to, dist] = [i, roadGraph[n][i]];
      if(stack[to] > stack[n] + dist) {
        stack[to] = stack[n] + dist;
        queue.push([to, dist]);
      }
    }
  }
  return stack.filter(num => num <= K).length;
}
// -> 다익스트라 알고리즘을 알고 다시 푼 풀이

// 풀이 3.
function solution3(N, road, K) {
  const totalDist = new Array(N+1).fill(Infinity)
  const adj = Array.from({length: N+1}, () => [])

  road.forEach(([a,b,c]) => {
    adj[a].push({to: b, dist: c})
    adj[b].push({to: a, dist: c})
  });

  const queue = [{to: 1, dist: 0}]
  totalDist[1] = 0

  while(queue.length) {
    let {to, dist} = queue.pop()
    adj[to].forEach((step) => {
      // ex): totalDist[3] = totalDist[2](1에서 2까지 최단거리) + step.dist(2에서 3까지 거리)
      // totalDist[step.to] : 1에서 최종 도착 노드 'step.to' 까지의 거리
      // totalDist[to] : 1에서 'to'를 경유하는 최단거리
      // step.dist : 'to' 에서 'step.to' 까지의 거리
      if (totalDist[step.to] > totalDist[to] + step.dist) {
        totalDist[step.to] = totalDist[to] + step.dist
        queue.push(step)
      }
    })
  }
  return totalDist.filter((dist) => dist <= K).length
}

// -> 좀 더 효율적인 다익스트라 알고리즘 풀이

// NOTE: 그래프 / BFS / 다익스트라

// [접근]
// 다익스트라 : 특정 노드에서, 각 노드들과 의 최단거리를 구하는 알고리즘

