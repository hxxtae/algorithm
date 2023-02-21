function solution(bridge_length, weight, truck_weights) {
  const bridge = Array(bridge_length).fill(0);
  const bridge_weights = [];
  let time = 0;
  
  while(bridge.length) {
    const currWeight = bridge.shift();
    if(currWeight) bridge_weights.shift();
    time++;
      
    if(truck_weights.length) {
      if(weight >= bridge_weights.reduce((sum, wei) => sum + wei, truck_weights[0])) {
        const prevWeight = truck_weights.shift();
        bridge.push(prevWeight);
        bridge_weights.push(prevWeight);
      }
      else {
        bridge.push(0);
      }
    }
  }
  return time;
}

// NOTE: 스택 / 큐

// [접근]
// Queue(큐) bridge의 길이(birdge_lenght)를 항상 유지하면서

// Queue(큐)인 birdge를 빠져나온(shift) 값이 무게 이면, 다리 위의 트럭 무게 차감!
// Queue(큐)인 birdge를 빠져나온(shift) 값이 무게가 아니면, 무시

// 무게가 허용되면 트럭 무게를 bridge에 push! (bridge_weights에도 push!)
// 무게가 허용되지 않으면 0을 bridge에 push!