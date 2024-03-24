filename = 'd:/3.FrontEnd/algorithm/boj_SetMapByHashing/43_콰트로치즈피자/input_4.txt'
f = open(filename, 'r')

# -------------
# 입력
# -------------
input = list(f)
N = int(input[0].rstrip())
TOPPINGS = input[1].rstrip().split(' ')

# -------------
# 풀이
# -------------
import re

def solution(n, toppings):
  kindSet = set()
  for kind in toppings:
    if not bool(re.search('Cheese$', kind)):
      continue

    kindSet.add(kind)
  
  return 'yummy' if len(kindSet) >= 4 else 'sad'


# -------------
# 출력
# -------------
answer = solution(N, TOPPINGS)
print(answer)