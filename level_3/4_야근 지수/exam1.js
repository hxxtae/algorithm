function solution(n, works) {
  const heap = [...works].sort((a, b) => b - a);
  const maxChange = () => {
    const arr = heap;
    arr[0] -= 1;
    if(arr.length <= 1) return;
    let here = 0;
    while(1) {
      let left = here * 2 + 1, right = here * 2 + 2;
      if(left >= arr.length) break;
          
      let parent = here;
      if(arr[parent] < arr[left]) parent = left;
      if(right < arr.length && arr[parent] < arr[right]) parent = right;
      if(here === parent) break;
      [arr[here], arr[parent]] = [arr[parent], arr[here]];
      here = parent;
    }
  }
  for(let i = 1; i <= n; i++) {
    if(heap[0] <= 0) return 0;
    maxChange();
  }
  return heap.reduce((sum, work) => sum + work**2, 0);
}

// NOTE: 우선순위 큐