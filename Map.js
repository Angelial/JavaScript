// Map 能够存放键值对，其中，键的去重是通过Object.is()方法进行比较，
// 键的数据类型可以是基本类型数据也可以是对象，而值也可以是任意类型数据

let map = new Map()
let key = [1, 3, 4, 5, 7]
let key2 = {
  name:  'key2',
  age: 23
}
// 使用set()方法可以给Map添加键值对
map.set('title', 'hello world')
map.set('year', '2018')

map.set(key, '2018')
map.set(key2, key)
map.set(key2, key) // 不重复

console.log(map, map.size)

// 通过get()方法可以从Map中提取值

console.log('get()方法从Map中提取值:', map.get('title'), ':', map.get('year'))

console.log ('Map键是对象:', map.get(key2))

// has() 检查某个数据项是否存在于Map中
// delete() 从Map中删除一个数据项
// clear() 删除Map中所有的数据项
console.log('检查某个数据项是否存在于Map中:', map.has('year'))
console.log('从Map中删除一个数据项:', map.delete('year'), map.has('year'))
map.clear()
console.log('删除Map中所有的数据项:',map, map.size)

// 与Set的初始化一样，Map也可以用数组来初始化Map，
// 该数组的每一个数据项也是数组，数组的第一个数据项代表键值对，第二个数据项是键值对的值
let mapArr = new Map([['name', 'Map用数组初始化'], ['第一个数据项代表键值对', '第二个数据项是键值对的值']])
console.log(mapArr.has('name'), mapArr.get('第一个数据项代表键值对'), mapArr.size)

// 与Set一样，Map也有forEach方法，该方法也接收一个回调函数，该回调函数有三个参数
// 键值对的值、键值对的键、当前Map对象引用
// 与Set的forEach一样，可以回调函数中传入this引用

mapArr.forEach((value, key, ownerMap) => {
  console.log(value, '--- 键值对的值')
  console.log(key, '--- 键值对的键')
})


console.log('=========== Weak Map =============')
// Weak Map （Weak Map对Map而言，就像是Weak Set相对于Set一样）
// Weak Map（或Weak Set）都是存储对象弱引用的方式，在Weak Map(或Weak Set)中，
// 所有的键都必须是对象（尝试使用非对象会报错），而且这些对象都是弱引用，不会干扰垃圾回收。
// 当Weak Map 中的键在 Weak Map 之外不存在引用时，该键值对会被移除

//Weak Map的键必须是对象，值可以是任意类型，初始化同Map一样，也可是使用数组来创建一个 Weak Map ：


//Weak Map 只为它们的内容提供了很小的可见度，
// 因此你不能使用 forEach() 方法、size 属性或 clear() 方法来管理其中的项。

let weakMap = new WeakMap([[key, 'hello'], [key2, 'world']])

console.log(weakMap, weakMap.get(key)) // hello
console.log(weakMap.get(key2)) // world

console.log('has()',weakMap.has(key))

weakMap.delete(key)
console.log('删除',weakMap.has(key))


console.log('========= 分割线 数组的forEach ============')

// 数组的forEach方法，该方法也接收一个回调函数和this，该回调函数有三个参数
// 当前元素、当前元素的索引值、当前元素所属的数组对象
let array = [4, 9, 16, 25]
array.forEach(function(currentValue, index, arr) {
  if (currentValue === 9) {
    console.log(currentValue, '必需。当前元素')
    console.log(index, '可选。当前元素的索引值。')
    console.log(arr, '可选。当前元素所属的数组对象。')
  }
})


/*
*                                总结
*
* 1.Set 是无重复值的有序列表。根据 Object.is()方法来判断其中的值不相等，以保证无重复。
*   Set 会自动移除重复的值，因此你可以使用它来过滤数组中的重复值并返回结果。
*   Set并不是数组的子类型，所以你无法随机访问其中的值。
*   但你可以使用has() 方法来判断某个值是否存在于 Set 中，或通过 size 属性来查看其中有多少个值。
*   Set 类型还拥有forEach()方法，用于处理每个值。
*
* 2.Weak Set 是只能包含对象的特殊 Set。
*   其中的对象使用弱引用来存储，意味着当 Weak Set中的项是某个对象的仅存引用时，它不会屏蔽垃圾回收。
*   由于内存管理的复杂性， Weak Set的内容不能被检查，因此最好将 Weak Set 仅用于追踪需要被归组在一起的对象。
*
* 3.Map 是有序的键值对，其中的键允许是任何类型。
*   与 Set 相似，通过调用 Object.is()方法来判断重复的键，这意味着能将数值 5 与字符串 "5" 作为两个相对独立的键。
*   使用set() 方法能将任何类型的值关联到某个键上，并且该值此后能用 get() 方法提取出来。
*   Map 也拥有一个 size 属性与一个 forEach() 方法，让项目访问更容易。
*
* 4.Weak Map 是只能包含对象类型的键的特殊 Map。
*   与 Weak Set 相似，键的对象引用是弱引用，因此当它是某个对象的仅存引用时，也不会屏蔽垃圾回收。
*   当键被回收之后，所关联的值也同时从 Weak Map 中被移除。
*
* */


console.log('===========================================')
console.log('===========================================')
console.log('==================== [\'1\', \'2\', \'3\'].map(parseInt) =======================')
// ['1', '2', '3'].map(parseInt)

// 实际执行的代码
const parse = ['1', '2', '10'].map((item, index) => {
  return parseInt(item, index)
})
console.log(parse) // 1 nan 2

// 解析 ：parseInt()函数解析一个字符串参数，并返回一个指定基数的整数
// const intValue = parseInt(string[, radix]);
// string 要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用 ToString 抽象操作)。// 字符串开头的空白符将会被忽略
// radix  一个介于2和36之间的整数，表示上述字符串的基数。默认为10。
// 返回值  返回一个整数或NaN



// 多维数组变为一维数组 使用flat()

let Array2 = [1, [2, 3], [4, [5,6], 5], 5]
// const res = Array2.flat(Infinity)
