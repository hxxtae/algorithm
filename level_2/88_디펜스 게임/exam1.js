function solution(n, k, enemy) {
  const prevEnemy = [];
  const len = enemy.length;

  // 우선순위 큐 (삽입)
  const push = (newValue) => {
    const heap = prevEnemy;
    heap.push(newValue);
    let index = heap.length - 1, parent = Math.floor((index - 1) / 2);
    while(index > 0 && heap[index] > heap[parent]) {
      [heap[index], heap[parent]] = [heap[parent], heap[index]];
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  }

  // 우선순위 큐 (삭제)
  const pop = () => {
    const heap = prevEnemy;
    if(heap.length <= 1) return heap.pop();
    const max = heap[0];
    heap[0] = heap.pop();
    let index = 0;
    while(1) {
      let left = (index * 2) + 1, right = (index * 2) + 2;
      let parent = index;
          
      if(left >= heap.length) break;
      if(heap[left] > heap[parent]) parent = left;
          
      if(right >= heap.length) break;
      if(heap[right] > heap[parent]) parent = right;
          
      if(parent === index) break;
          
      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
    }
    return max;
  }

  let stage = 0;
  for(let i = 0; i < len; i++) {
    const num = enemy[i];
    n -= num;
    push(num);
    // 병사 수 부족
    if(n < 0) {
      // 무적권 남아있음
      if(k > 0 && prevEnemy.length > 0) {
        const highEnemy = pop();
        n += highEnemy;
        stage++;
        k--;
        continue;
      }
      // 무적권 없음
      break;
    }
    // 병사 수 충분
    stage++;
  }
  return stage;
}

// NOTE: heap(힙) / 우선순위 큐(최대 힙)

// [접근]
// 라운드를 돌파하면서, 적과 마주 싸우고, n에서 enemy[i] 만큼 감소하면 됩니다.
// 그리고, n이 0 미만이 된다면, 무적권을 사용하면 됩니다.

// 중요한건 여기서 핵심이 있습니다.
// 문제에서는 무적권을 해당 라운드에서만 사용해야 할 것처럼 속이고 있습니다.
// 물론 게임 규칙에서는 해당 라운드에서만 무적권을 사용해야합니다.
// 하지만, 우리는 결론만 구하면 되기에, 지나온 라운드에도 무적권을 사용해도 상관없습니다.

// 즉, 지나온 라운드 중에서 가장 적의 수가 많았던 라운드에 무적권을 사용하면 됩니다.
// 그리고 무적권을 사용했으니 그만큼 n에 가산해주면 됩니다.
// 그럼, 지나온 라운드중에서 가장 적이 많았던 라운드를 어떻게 알아낼까요?
// heap구조를 사용하면 됩니다. 그 중에서도 최대힙을 사용하면 됩니다.

// ※ TIP
// 최대힙을 간단하게 만들려면, 그냥 숫자를 음수로 바꾸어서 저장하면 됩니다.
// 그럼, 수가 전체적으로 반전이 되어, 가장 큰 수가 가장 작은 수가 되죠.
// heap자료구조는 삽입, 꺼내기 연산이 O(logN)의 속도로 매우 빠른 연산 능력을 보여주는 좋은 자료구조입니다.

// [결론]
// 결론적으로, n이 부족하여(음수가 되었을 때), 무적권을 사용할 때, 과거에 가장 많은 적을 만났던 라운드의 값에 사용하여, n에 그대로 더해주면 됩니다.