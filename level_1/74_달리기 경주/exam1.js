function solution(players, callings) {
  const link = [];
  for(let i = 0, len = players.length; i < len; i++) {
    const [prev, player, next, rank] = [players[i-1], players[i], players[i+1], i+1];
    link.push([player, {prev, next, rank}]);
  }
  const map = new Map(link);
  for(let i = 0, len = callings.length; i < len; i++) {
    const name = callings[i];
    const { prev, next, rank } = map.get(name);
    
    // Set (prev, next, rank) of 추월한 선수
    map.get(name).prev = map.get(prev).prev;
    map.get(name).next = prev;
    map.get(name).rank = map.get(prev).rank;
    if(map.get(prev).prev) map.get(map.get(prev).prev).next = name;

    // Set (prev, next, rank) of 추월 당한 선수
    map.get(prev).prev = name;
    map.get(prev).next = next;
    map.get(prev).rank = rank;
    if(next) map.get(next).prev = prev;
  }
  const result = [...map].sort((a, b) => a[1].rank - b[1].rank).map((arr) => arr[0]);
  return result;
}

// NOTE: LinkedList
