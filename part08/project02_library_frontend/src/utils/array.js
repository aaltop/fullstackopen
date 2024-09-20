
// Could also use actual Sets from JS
/**
 * Calculates the set difference of arr1 with arr2, arr1 \ arr2.
 */
function difference(arr1, arr2) {
    return arr2.length === 0
        ? arr1
        : arr1.filter(prop => !arr2.includes(prop))
}


export default {
    difference
}