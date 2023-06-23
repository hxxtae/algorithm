function solution(enroll, referral, seller, amount) {
  const userData = enroll.map((name, index) => [name, [referral[index], 0]]);
  const userMap = new Map(userData); // name: [parent, sum]
  const sellArr = [];                // [[name, payoff], ...] ※ 주의: 중복이름 존재

  for(let i = 0, len = seller.length; i < len; i++) 
    sellArr[i] = [seller[i], amount[i] * 100];
  
  const payoffOperation = (name, payoff) => {
    let payoff10 = Math.floor(payoff * 0.1);
    let payoff90 = payoff - payoff10;
    const [parent, sum] = userMap.get(name);
    userMap.get(name)[1] += payoff90;
    if(parent !== "-" && payoff10 >= 1) 
      payoffOperation(parent, payoff10);
  }
  
  for(const [name, payoff] of sellArr) 
    payoffOperation(name, payoff);
  
  return [...userMap.values()].map(arr => +arr[1]);
}

// NOTE: 해시, 재귀

