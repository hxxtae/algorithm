// 풀이 1.
function solution(tickets) {
  const placeArr = []; // - 공항
  const moveArr = [];  // - 다음 공항 순서
    
  for (let i = 0; i < tickets.length; i++) {
    const start = tickets[i][0];
    const end = tickets[i][1];
    if (!placeArr.includes(start)) {
      placeArr.push(start);
      moveArr.push([end]);
    } else {
      const idx = placeArr.indexOf(start);
      moveArr[idx].push(end);
      moveArr[idx].sort();
    }
  }
  
  const visited = moveArr.map(list => list.map(item => 0));
  const totalLen = tickets.length;
  const arr = ['ICN'];
  let check = false;
  let cnt = 0;
  

  const dfs = (place) => {
    const placeIdx = placeArr.indexOf(place);
    const placeList = moveArr[placeIdx];

    if (cnt === totalLen) {
      check = true;
      return;
    }

    for (let idx in placeList) {
      if (!visited[placeIdx][idx]) {
        visited[placeIdx][idx] = 1;
        const nextPlace = placeList[idx];
        arr.push(nextPlace);
        cnt++;
          
        dfs(nextPlace);
        if (check) return;
        
        cnt--;
        arr.pop();
        visited[placeIdx][idx] = 0;
      }
    }
  }
  
  dfs('ICN');
  return arr;
}

// NOTE: DFS

// 풀이 2.
function solution(tickets) {
  const result = [];
  const ticketArr = [...new Set(tickets.flat())];
  const len = ticketArr.length;
  const tickekLen = tickets.length;
  const map = new Map(Array.from({length: len}, (v, i) => [ticketArr[i], {list:[], visited:[]}]));
  tickets.forEach(([s, e]) => {
    map.get(s).list.push(e);
    map.get(s).list.sort();
    map.get(s).visited.push(0);
  });
  let check = false;
  const dfs = (deep, name) => {
    if(deep === tickekLen) {
      check = true;
      return;
    }
    for(let i = 0; i < map.get(name).list.length; i++) {
      if(map.get(name).visited[i]) continue;
      map.get(name).visited[i] = 1;
      const next = map.get(name).list[i];
            
      result.push(next);
      dfs(deep + 1, next);
      if(check) return;
      result.pop();
            
      map.get(name).visited[i] = 0;
    }
  }
  result.push('ICN')
  dfs(0, 'ICN');
  return result;
}

// NOTE: DFS, 해시
// 풀이2가 풀이1 보다 좀 더 알아보기 쉽고 직관적이다.