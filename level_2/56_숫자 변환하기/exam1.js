function solution(x, y, n) {
  let queue = [[x, 0]];
  
  // visited: 중복된 값이 queue에 push되는 것을 막기위해
  const visited = [];
  visited[x] = x;
  
  while(queue.length) {
    // const [num, deep] = queue.shift();
    const arr = [];
    for(const [num, deep] of queue) {
      if(num === y) return deep;
      if(((num + n) <= 1_000_000) && !visited[num + n]) {
        arr.push([num + n, deep + 1]);
        visited[num + n] = num + n;
        if((num + n) === y) return deep + 1;
      }
      if(((num * 2) <= 1_000_000) && !visited[num * 2]) {
        arr.push([num * 2, deep + 1]);
        visited[num * 2] = num * 2;
        if((num * 2) === y) return deep + 1;
      }
      if(((num * 3) <= 1_000_000) && !visited[num * 3]) {
        arr.push([num * 3, deep + 1]);
        visited[num * 3] = num * 3;
        if((num * 3) === y) return deep + 1;
      }
    }
    queue = arr;
  }
  return -1;
}

// NOTE: BFS / DP

// [접근]
// BFS를 이용하여 풀이를 진행하면 된다.
// 단, 중복된 값을 다시 queue에 포함시킨다면 시간초과가 발생하게 된다.
// 그러므로 DP의 메모이제이션 개념을 포함하여 중복된 값의 push를 막아주어야 한다.

// [주의할 점]
// 일반적으로 BFS시 'shift'를 통해 queue의 값을 추출하여 사용하곤하는데,
// 해당 문제에서는 '배열과 반복문'을 통해 BFS를 진행해야 한다.
// queue에 push 되는 값들을 queue에 push 하지 않고, 특정 배열에 push 하였다가
// 해당 배열을 queue에 다시 할당하여 반복문을 통해 queue를 추출하는 방식으로 
// 풀이를 진행해야 시간 초과에서 벗어날 수 있다.

// 이유: shift가 보기보다 느리다...