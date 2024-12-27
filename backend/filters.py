def getPartitionsOfLength(length, arr):
    result1 = []
    for i in arr:
        if len(i) == length and len(set(i)) == len(i):
            result1.append(i)

    allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    shortResult = []
    for result in result1:
        if all(values in allNums for values in result):
            shortResult.append(result)
    return shortResult


def getPartitionsWithInclusion(inclusionNumbers, arr):
    result2 = []
    for a in arr:
        if all(values in a for values in inclusionNumbers):
            result2.append(a)
    return result2


def getPartitionsWithExclusion(exclusionNumbers, arr):
    result3 = []
    for a in arr:
        flag = 0
        for num in exclusionNumbers:
            if num in a:
                flag = 1
        if flag == 0:
            result3.append(a)

    return result3
