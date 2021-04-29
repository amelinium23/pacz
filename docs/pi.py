import math 

n, o, d = int(input()), int(input()), int(input())
pi = 1 / (1+(math.e ** -(-3.97+(0.464*n)+(1.47*o)+(1.06*d))))

if __name__ == "__main__":
    print(pi)