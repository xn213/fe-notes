# 后端

## 算法面试题

-------------------------------------------------------------

> 1. A bottle of Coke is $1. You can exchange two empty bottles for a bottle of Coke. You have $20 now in your pocket. So how many bottles of Coke can you drink at most?

1. 模拟喝汽水的过程.
当时写算法的时候，面试官很看重的是可读性，例如变量名的定义.
作为一个 Python 程序员，以后也在这方面也要更加注意.

```py
def cal_drinks(n):
  avail_drinks = n
  sum_drunk = 0
  empty_drinks = 0

  while avail_drinks > 0:
    # consume available drinks
    sum_drunk += avail_drinks
    empty_drinks += avail_drinks

    # replace empty bottles to drinks
    avail_drinks = empty_drinks // 2
    empty_drinks = empty_drinks % 2

  return sum_drunk
```
2. 递归
写递归最重要的就是找到那个推倒式.
```py
# n 个空瓶: f(n) = n/2 + f(n/2 + n%2)
# n 块钱:  F(n) = n + f(n)
def cal_drinks_by_empty(n):
  if n <= 1:
    sum_drunk = 0
  else:
    sum_drunk = n//2 + cal_drinks_by_empty(n//2 + n%2)

  return sum_drunk

def cal_drinks(n):
  return n + cal_drinks_by_empty(n)
```
3. ???
就是为什么结果是 n + (n-1), 是因为这个推导式有什么简化的方法吗？

-------------------------------------------------------------
-------------------------------------------------------------