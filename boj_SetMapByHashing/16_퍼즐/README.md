# 퍼즐

### Level: 골드2

<img class="left" src="https://d2gd6pc034wcta.cloudfront.net/tier/14.svg" style="width: 20px" />

| 시간 제한 | 메모리 제한 |
| -------- | ---------- |
| 1 초 | 32 MB |

## 문제 설명

3×3 표에 다음과 같이 수가 채워져 있다. 오른쪽 아래 가장 끝 칸은 비어 있는 칸이다.

<table class="table table-bordered" style="width:15%">
	<tbody>
		<tr>
			<td style="text-align: center;">1</td>
			<td style="text-align: center;">2</td>
			<td style="text-align: center;">3</td>
		</tr>
		<tr>
			<td style="text-align: center;">4</td>
			<td style="text-align: center;">5</td>
			<td style="text-align: center;">6</td>
		</tr>
		<tr>
			<td style="text-align: center;">7</td>
			<td style="text-align: center;">8</td>
			<td style="text-align: center;">&nbsp;</td>
		</tr>
	</tbody>
</table>

어떤 수와 인접해 있는 네 개의 칸 중에 하나가 비어 있으면, 수를 그 칸으로 이동시킬 수가 있다. 물론 표 바깥으로 나가는 경우는 불가능하다. 우리의 목표는 초기 상태가 주어졌을 때, 최소의 이동으로 위와 같은 정리된 상태를 만드는 것이다. 다음의 예를 보자.

<table class="table table-bordered" style="width:15%">
	<tbody>
		<tr>
			<td style="text-align: center;">1</td>
			<td style="text-align: center;">&nbsp;</td>
			<td style="text-align: center;">3</td>
		</tr>
		<tr>
			<td style="text-align: center;">4</td>
			<td style="text-align: center;">2</td>
			<td style="text-align: center;">5</td>
		</tr>
		<tr>
			<td style="text-align: center;">7</td>
			<td style="text-align: center;">8</td>
			<td style="text-align: center;">6</td>
		</tr>
	</tbody>
</table>

<br>

<table class="table table-bordered" style="width:15%">
	<tbody>
		<tr>
			<td style="text-align: center;">1</td>
			<td style="text-align: center;">2</td>
			<td style="text-align: center;">3</td>
		</tr>
		<tr>
			<td style="text-align: center;">4</td>
			<td style="text-align: center;">&nbsp;</td>
			<td style="text-align: center;">5</td>
		</tr>
		<tr>
			<td style="text-align: center;">7</td>
			<td style="text-align: center;">8</td>
			<td style="text-align: center;">6</td>
		</tr>
	</tbody>
</table>

<br>

<table class="table table-bordered" style="width:15%">
	<tbody>
		<tr>
			<td style="text-align: center;">1</td>
			<td style="text-align: center;">2</td>
			<td style="text-align: center;">3</td>
		</tr>
		<tr>
			<td style="text-align: center;">4</td>
			<td style="text-align: center;">5</td>
			<td style="text-align: center;">&nbsp;</td>
		</tr>
		<tr>
			<td style="text-align: center;">7</td>
			<td style="text-align: center;">8</td>
			<td style="text-align: center;">6</td>
		</tr>
	</tbody>
</table>

<br>

<table class="table table-bordered" style="width:15%">
	<tbody>
		<tr>
			<td style="text-align: center;">1</td>
			<td style="text-align: center;">2</td>
			<td style="text-align: center;">3</td>
		</tr>
		<tr>
			<td style="text-align: center;">4</td>
			<td style="text-align: center;">5</td>
			<td style="text-align: center;">6</td>
		</tr>
		<tr>
			<td style="text-align: center;">7</td>
			<td style="text-align: center;">8</td>
			<td>&nbsp;</td>
		</tr>
	</tbody>
</table>

가장 윗 상태에서 세 번의 이동을 통해 정리된 상태를 만들 수 있다. 이와 같이 최소 이동 횟수를 구하는 프로그램을 작성하시오.

## 입력

세 줄에 걸쳐서 표에 채워져 있는 아홉 개의 수가 주어진다. 한 줄에 세 개의 수가 주어지며, 빈 칸은 0으로 나타낸다.

## 출력

첫째 줄에 최소의 이동 횟수를 출력한다. 이동이 불가능한 경우 -1을 출력한다.

### 예제 입력1 & 예제 출력1

```text
1 0 3
4 2 5
7 8 6

```

```text
3

```

### 예제 입력2 & 예제 출력2

```text
3 6 0
8 1 2
7 4 5

```

```text
-1

```

---

ref: https://www.acmicpc.net/problem/1525