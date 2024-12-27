q = { 1: [[1]] }

def getPartitions(n):
    try:
        return q[n]
    except KeyError:
        pass

    result = [[n]]
    for i in range(1, n):
        a = n - i
        R = getPartitions(i)
        for r in R:
            if r[0] <= a:
                result.append([a] + r)
    q[n] = result
    return result