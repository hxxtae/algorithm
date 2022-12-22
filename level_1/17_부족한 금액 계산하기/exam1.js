function solution(price, money, count) {
  let totalPay = 0;
  for(let i = 1; i <= count; i++) totalPay += (i * price);
  return (totalPay - money) > 0 ? (totalPay - money) : 0;
}
