const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n').map(item => item.trim());
for (let i = 1; i < input.length;) {
  const F = +input[i++];
  const FRIENDS = input.slice(i, F + i).map(friend => friend.split(' '));
  const result = solution(F, FRIENDS);
  console.log(result);
  i += F;
}

// -------------
// 풀이
// -------------
function solution(f, friends) {
  const friendSet = new Set(friends.flatMap(item => item));
  const friendMap = new Map([...friendSet].map(name => [name, { master: name, count: 1 }]));
  
  const getParent = (friend, network) => {
    while (friend !== network.get(friend).master) {
      network.set(friend, network.get(network.get(friend).master));
      friend = network.get(friend).master;
    }
    return friend;
  }

  const setParent = (friend1, friend2, network) => {
    const [name1, name2] = [getParent(friend1, network), getParent(friend2, network)];
    const [sizeA, sizeB] = [network.get(name1).count, network.get(name2).count];
    if (sizeA >= sizeB) {
      network.get(name1).count += sizeB;
      network.set(name2, network.get(name1));
      return;
    }
    network.get(name2).count += sizeA;
    network.set(name1, network.get(name2));
  }

  const findParent = (friend1, friend2, network) => {
    const [name1, name2] = [getParent(friend1, network), getParent(friend2, network)];
    if (name1 === name2) return true;
    return false;
  }

  const resultArr = [];
  for (const [friend1, friend2] of friends) {
    if (!findParent(friend1, friend2, friendMap)) {
      setParent(friend1, friend2, friendMap);
    }
    
    // ✨ NOTE: 위에서 setParent 이후 friend1 혹은 friend2의 최신화 된 master(parent)의 count를 가져오기 위해
    //          다시 getParent 함수를 수행한다.
    const name1 = getParent(friend1, friendMap);
    const name2 = getParent(friend2, friendMap);
    resultArr.push(Math.max(friendMap.get(name1).count, friendMap.get(name2).count));
  }
  
  return resultArr.join('\n');
}

// [접근]
// ### 방법
// Union-Find 알고리즘을 통해 각 노드의 값을 정수형으로 설정하였다.
// 그러나 이 문제의 경우, 각 노드의 대표값이 정수가 아니라 문자열인 상황이다.
// 즉, 기존에 Union-Find는 배열의 `index`를 통해 각 노드의 집합을 구성해 주었지만,
// 해당 문제에서는 문자열 이므로 `해시-키`를 통해 각 노드의 집합을 구성해 주어야 한다.

// 예를 들어 Fred와 Barney를 합치는데, Barney의 대표값은 Fred 이다. 즉, Fred가 대표인 집합의 사이즈는 1 이었고
// Barney는 1이었으니 Fred의 집합에 합쳐진다. 또한 Fred가 대표인 집합의 사이즈는 2로 증가한다.
// 중요한건 Barney의 사이즈는 이제 신경쓸 필요가 없으며, 중요한건 대표값인 Fred의 사이즈가 중요하다.
// 다시 말해, 합치기 연산의 대상이었던 Barney의 사이즈가 증가하는 것이 아니라, 대표값인 Fred의 사이즈 값이 1 증가한다.
// (대표값의 기준은 두 친구 네트워크의 사이즈 비교 시 더 큰 값을 대표값으로 설정한다.)

// - 값 설정: key(문자열): { master(parent): 대표값(문자열), count(size): 친구 네트워크 사이즈(숫자) }

