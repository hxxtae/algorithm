function solution(users, emoticons) {
  const userLen = users.length;
  const emoLen = emoticons.length;
  const salePrice = (price) => [
    [10, (price * 0.9)],
    [20, (price * 0.8)],
    [30, (price * 0.7)], 
    [40, (price * 0.6)]
  ];
  const saleEmoticons = emoticons.reduce((arr, p) => [...arr, salePrice(p)], []);
  const map = new Map(Array.from({length: emoLen}, (v, i) => [i+1, saleEmoticons[i]]));
  
  let answerArr = [0, 0]; // 최종 - 이모티콘 플러스, 이모티콘 판매가격
  
  // users 데이터 기반 매출 측정
  const usersSales = (sales) => {
    const result = [0, 0]; // 이모티콘 플러스, 이모티콘 판매가격
    for(let i = 0; i < userLen; i++) {
      const [userSale, userPrice] = users[i];
      let totalPrice = 0;
      for(let j = 1; j <= emoLen; j++) {
        const [s, p] = map.get(j)[sales[j-1]];
        // 사용자의 할인가 기준보다 할인율(s)이 낮은 경우
        if(userSale > s) continue;
        totalPrice += p;
        // 사용자의 가격 기준보다 총 합산한 가격이 높은 경우
        if(userPrice <= totalPrice) {
          totalPrice = 0;
          result[0] += 1;
          break;
        }
      }
      result[1] += totalPrice;
      totalPrice = 0;
    }
    return result;
  }
  
  // 모든 할인의 경우의 수(dfs)
  const dfsSales = (len, saleList) => {
    if(saleList.length >= len) {
      // users 데이터 기반 매출 측정
      const result = usersSales(saleList);
      if(result[0] > answerArr[0]) 
        answerArr = [result[0], result[1]];
      else if(result[0] === answerArr[0])
        answerArr[1] = (result[1] > answerArr[1] ? result[1] : answerArr[1]);
      return;
    }
    for(let s = 0; s < 4; s++) {
      saleList.push(s);
      dfsSales(len, saleList);
      saleList.pop();
    }
  }
  dfsSales(emoLen, []);
  return answerArr;
}

// NOTE: DFS