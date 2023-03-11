// ******
// A function that returns true if the resulting array 
// consists of an ascending sequence of numbers. 
// Or if only in one (or more) element to swap two digits once - also returns true. 
// Otherwise, it returns false.
// ******

// Swaps two array elements
function SwapElemets(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]]
    return +array.join('')
}

// Compare adjacent array elements
function CheckElemets(current, prevElement, ascending = true) {

    // Convert number to array
    let num = current;
    let currentArray = [];
    while(num > 0){
        currentArray.unshift(num % 10);
        num = num / 10 | 0;
    }

    // We go through all possible combinations of permutations of digits in a number
    const arrayNumbers = [];
    currentArray.forEach(function(item, i, currentArray) {
        currentArray.forEach(function(_item, _i, currentArray) {
            const num = SwapElemets(currentArray, i, _i)
            const direction = ascending ? 1 : -1
            // We cut off numbers that do not satisfy the conditions
            if (num * direction > prevElement * direction) { 
                arrayNumbers.push(num)
            }
        });
    });
    // Choose the nearest number
    let newElement;
    if (ascending) {
        newElement = Math.min(...arrayNumbers);
    }
    else {
        newElement = Math.max(...arrayNumbers);
    }
    // console.log('arrayNumbers: ', arrayNumbers)
    // console.log('newElement: ', newElement)
    return newElement
}

// Checking the array
function CheckArray(array) {
    // console.log('array', array)
    let result
    let numberChanges = 0
    const limitChanges = 1 // count of possible changes
    for (let i = 0; i < array.length; i++)
    {
        if (i == 0) {
            // console.log(i, ':', array[i])
            result = array
        }
        else if (array[i-1] < array[i]) {
            // console.log(i, ':', array[i])
            result = array
        }
        // If the number does not meet the conditions, and it can be changed
        else if(array[i] > 9 && numberChanges < limitChanges) {
            numberChanges++
            // console.log(i, ':', '--', array[i])

            let newElement = CheckElemets(array[i], array[i-1], true)

            // console.log(i, ':', newElement)
            const current = array[i]
            array[i] = newElement
            // If increasing the current number did not give a positive result, 
            // we try to decrease the previous one
            if (newElement == 'Infinity') {
                // console.log('current', current)
                // console.log('prevElement', array[i-1])
                newElement = CheckElemets(array[i-1], current, false)
                // console.log(i - 1, ':', newElement)
                array[i - 1] = newElement
                array[i] = current
                if (i > 1 && array[i - 1] <= array[i - 2]) {
                    result = false
                    break
                }
            }

            result = array
        }
        else {
            // console.log(i, ':', '--0')
            result = false
            break
        }

    }
    return result
}

function Solution(numbers) {

    if (numbers.length > 1) {
        let result = CheckArray(numbers)
        // console.log('newNumbers', numbers)
        // console.log('result', result)
        if (result == false) {
            return false
        }
        else {
            return true
        }
        return result
    }
    else {
        // console.log('result', false)
        return false
    }

}
const a1 = [1, 5, 10, 20]
const a2 = [1, 3, 900, 10]
const a3 = [13, 31, 30]
const a4 = [111]
const a5 = [1000, 10, 100]
const a6 = [527, 516, 216, 965, 951]
const a7 = [68, 105, 131, 396, 438, 754, 744, 817]
const a8 = [92, 121, 193, 293, 328, 345, 343, 475, 478, 154, 250, 706, 929]
const a9 = [64, 281, 219, 239, 291, 299, 308, 352, 371, 421, 405, 497, 875, 648, 725, 832, 877, 911, 925, 929, 954]
const a10 = [43, 46, 68, 79, 94, 109, 131, 140, 172, 192, 193, 195, 426, 294, 3020, 359, 436, 439, 517, 520, 607, 619, 692, 807, 714, 753, 796, 803, 807, 879, 890, 899, 945, 962]

    
console.log('a1 : ', Solution(a1))
console.log('a2 : ', Solution(a2))
console.log('a3 : ', Solution(a3))
console.log('a4 : ', Solution(a4))
console.log('a5 : ', Solution(a5))
console.log('a6 : ', Solution(a6))
console.log('a7 : ', Solution(a7))
console.log('a8 : ', Solution(a8))
console.log('a9 : ', Solution(a9))
console.log('a10 : ', Solution(a10))
