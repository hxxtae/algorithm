function solution(n, k, cmd) {
  const data = [];
  const result = [];
  const removeList = [];
  // NOTE: 효율성 테스트 시간 초과로 result, data 동시에 생성
  for(let i = 0; i < n; i++) {
    const obj = {
      id: i, 
      prev: i > 0 ? i-1 : null,
      next: i < n-1 ? i+1 : null
    }
    data.push([i, obj]);
    result.push('O');
  }
  const map = new Map(data);
  const len = cmd.length;
  // 표 항목 위 & 아래 이동
  const moveOrderFunc = (order, k, move) => {
    if(order === 'U') 
      while(move--)  k = map.get(k).prev ?? k;
    else if(order === 'D') 
      while(move--) k = map.get(k).next ?? k;
    return k;
  }
  // 표 항목 삭제 & 되돌리기
  const workOrderFunc = (order, k) => {
    if(order === 'C') {
      removeList.push(map.get(k));
      const {prev, next} = map.get(k);
      prev != null && (map.get(prev).next = next);
      next != null && (map.get(next).prev = prev);
      result[k] = 'X';
      k = next ?? prev;
    }
    else if(order === 'Z') {
      const {id, prev, next} = removeList.pop();
      prev != null && (map.get(prev).next = id);
      next != null && (map.get(next).prev = id);
      result[id] = 'O';
    }
    return k;
  }
  // 실행
  for(let i = 0; i < len; i++) {
    const [order, move] = cmd[i].split(' ');
    if(move) k = moveOrderFunc(order, k, +move);
    else k = workOrderFunc(order, k);
  }
  return result.join('');
}

// NOTE: 연결리스트(Linked List)

// 장점: 모든 객체가 서로 연결되어 있어 순서 보장은 되나, 
// 단점: 길이가 길면 메모리 차지가 크고 속도가 느리다.
