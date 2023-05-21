// 풀이 1.
function solution1(jobs) {
  let heap = jobs.sort((a, b) => a[0] - b[0]);
  let totalTime = 0;
  let result = 0;
  const len = heap.length;
  // 우선순위 큐 (최소 힙)
  const minJobPop = (heapList) => {
    const arr = heapList;
    const min = arr[0];
    if(arr.length <= 1) return arr.pop();
    arr[0] = arr.pop();
    let here = 0;
    while(1) {
      let parent = here;
      let left = here * 2 + 1, right = here * 2 + 2;
          
      if(left >= arr.length) break;
      if(arr[parent][1] >= arr[left][1]) parent = left;
          
      if(right >= arr.length) break;
      if(arr[parent][1] >= arr[right][1]) parent = right;
          
      if(here === parent) break;
      [arr[here], arr[parent]] = [arr[parent], arr[here]];
      here = parent;
    }
    return min;
  }
  while(heap.length) {
    const waitHeap = heap.filter((work) => work[0] <= totalTime);
    waitHeap.sort((a, b) => a[1] - b[1]);
    const remainHeap = heap.filter((work) => work[0] > totalTime);
    if(waitHeap.length) {
      const [s, w] = minJobPop(waitHeap); // 최소 힙
      totalTime += w;
      result += (totalTime - s);
    } else {
      totalTime += 1;
    }
    heap = [...waitHeap, ...remainHeap];
  }
  return Math.floor(result / len);
}

// NOTE: 우선순위 큐 / BFS

// 풀이 2.
function solution2(jobs) {
  let heap = jobs.sort((a, b) => a[0] - b[0]);
  let totalTime = 0;
  let result = 0;
  const len = heap.length;
  
  while(heap.length) {
    const waitHeap = heap.filter((work) => work[0] <= totalTime);
    waitHeap.sort((a, b) => a[1] - b[1]);
    const remainHeap = heap.filter((work) => work[0] > totalTime);
    if(waitHeap.length) {
      const [s, w] = waitHeap.shift(); // 최소 힙
      totalTime += w;
      result += (totalTime - s);
    } else {
      totalTime += 1;
    }
    heap = [...waitHeap, ...remainHeap];
  }
  return Math.floor(result / len);
}

// NOTE: 우선순위 큐 / BFS

// [문제 추가 설명]
// - jobs가 요청 시간 순서대로 sorting되어 있지 않다는 점
// - 힙이라는 category로 인해 반드시 힙이나 우선순위 큐(priority Queue)를 쓸 필요가 없다는 점
// - 시작 시간이 0부터가 아닌, 더 큰수에서 할 수 있다는 점(15ms에서의 요청이 처음이 될 수 있음!)