let obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}
let obj2 = {
  a: 1,
  b: 2,
  c: 3
}
const obj = {...obj1, ...obj2}
console.log(obj)

let arr1 = [1, 3, 4, 5, 5]
let arr2  = [2, 4, 5, 4, 5]
let arr = [...arr1, ...arr2]
let set = new Set(arr)
let [...arr3] = set
arr3.sort((a, b) => a - b)
console.log(arr, set, arr3)