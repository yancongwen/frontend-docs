// 冒泡排序
function bubbleSort(arr) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
        // 提前退出冒泡循环的标志位
        let flag = true
        for (let j = 0; j < len - i - 1; j++ ) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                flag = false
            }
        }
        if (flag) { break }
    }
    return arr
}

// 插入排序
function insertionSort(arr) {
    const len = arr.length
    for (let i = 1; i < len; i++) {
        let value = arr[i]
        let j = i - 1
        // 选择位置插入
        for (; j > 0; j--) {
            if (arr[j] > value) {
                // 向后移一位
                arr[j + 1] = arr[j]
            } else {
                break
            }
        }
        // 插入
        arr[j + 1] = value
    }
    return arr
}

// 选择排序
function selectionSort(arr) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
        let index = i
        // 找到最小的，放到已排序数组末尾
        for (let j = i; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                index = j + 1
            }
        }
        if (index != i) {
            let temp = arr[index]
            arr[index] = arr[i]
            arr[i] = temp
        }
    }
    return arr
}
