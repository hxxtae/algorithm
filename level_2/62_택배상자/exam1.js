function solution(order) {
  const len = order.length;
  const orderNum = orderNumReturn(order);
  const arr = [];
  let orderNumCopy = orderNum();
  let count = 0;
  for(let n = 1; n <= len; n++) {
    if(n < orderNumCopy) {
      arr.push(n);
      continue;
    }
    if(n === orderNumCopy) {
      count++;
      orderNumCopy = orderNum();
    }
    while(n > orderNumCopy) {
      if(arr.pop() === orderNumCopy) {
        count++;
        orderNumCopy = orderNum();
      } else return count;
    }
  }
  return count;
}

function orderNumReturn(order) {
  let idx = 0;
  return () => order[idx++];
}

// NOTE: 스택

// [접근]
// 1. order의 제일 앞을 기준 포인터 순서로 지정

// 2. 컨테이너 벨트의 순서가 order의 기준 포인터 순서보다 작을 때
//    -> 보조 컨테이너 벨트 push

// 3. 컨테이너 벨트의 순서가 order의 기준 포인터 순서와 같을 때
//    -> 택배 트럭에 실을 수 있는 count를 1 증가

// 4. 컨테이너 벨트의 순서가 order의 기준 포인터 순서보다 클 때
//    -> 보조 컨테이너 벨트 pop
//    -> if: 해당 pop이 order의 기준 포인터와 다르면 (종료).