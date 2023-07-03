function solution(n, roads, sources, destination) {
  const list = Array.from({length: n+1}, () => []);
  for(let i = 0, len = roads.length; i < len; i++) {
    const [a, b] = roads[i];
    list[a].push(b);
    list[b].push(a);
  }
  const range = Array(n+1).fill(Infinity);
  range[destination] = 0;
  const queue = [[destination, 0]];
  let queueIdx = 0;
  while(queue.length !== queueIdx) { // while 조건 부분이 기존 다익스트라와 다름
    const [wp, r] = queue[queueIdx];
    queueIdx++;
    for(const end of list[wp]) {
      if(range[end] > r + 1) {
        range[end] = r + 1;
        queue.push([end, range[end]]);
      }
    }
  }
  const result = sources.map((item) => range[item] === Infinity ? -1 : range[item]);
  return result;
}

// NOTE: 다익스트라 (좀 더 빠른 알고리즘)

// [접근]
// 도착 지점인 destination을 시작 지점으로 생각하고, 
// destination에서 부터 시작하여 각 노드 까지 최단 거리(다익스트라)를 구합니다.

// 기존의 다익스트라 알로리즘의 경우 heap을 통해 각 노드를 추가(push)하고 불러와(shift) 처리하였지만,
// 조금 더 빠른 방법으로는 똑같이 heap에 새로운 최단거리 노드를 추가(push) 하면서
// shift 대신에 queueIdx를 노드 탐색 시 마다 1씩 증가하여 heap의 길이와 queueIdx의 길이가 같아질 때 까지 최단거리 탐색을 수행합니다.