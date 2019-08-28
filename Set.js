console.log("====Set数据容器，这是一个能够存储无重复值的有序列表===");
// ES6中提供了Set数据容器，这是一个能够存储无重复值的有序列表。
// 通过 new Set() 可以创建Set, 同时可以使用数组来构造Set, 或者说具有迭代器的对象都可以用来构造Set，并且Set构造器会确保不会存在重复的数据项：
let set = new Set([4,5,6,7,9,4,5,3,7, 0, -0]);

// 通过 add 方法能够向Set中添加数据项
set.add(10)
set.add('10')

// Set内部使用Object.is()方法来判断两个数据项是否相等，唯一不同的是+0和-0在Set中被判断为是相等的
console.log(set, 'set的长度', set.size);

console.log('检测某个值是否存在于Set中 has', set.has('10'), set.has(8));
// 删除值，用delete()方法
set.delete('10')
console.log(set)
// 删除所有值 clear() 方法
// set.clear()
// console.log(set);

// 可以使用forEach方法来遍历Set中的数据项，该方法传入一个回调函数callback, 还可以传入一个this，用于回调函数中
// 回调函数callback中三个参数 元素值 元素索引 将要遍历的对象
// Set中的Value和key 是相同的，这是为了让set的forEach方法和数组以及Map的ForEach方法保持一致，都具有三个参数
set.forEach(function (value,key,ownerSet) {
  if (value === 4) {
    console.log(value, 'value === 4');
    console.log(key, 'value === 4');
    console.log(ownerSet);
  }
})

let set1 = new Set([1,2,3,3,3,3])
let operation ={

  print(value){
    console.log(value);
  },
  iterate(set=[]){
    // 如果回调函数使用箭头函数，可以省略this的入参，这是因为箭头函数会通过作用域链找到当前的this对象。
    set.forEach(function(value,key,ownerSet){
      this.print(value);
      this.print(key);
    }, this);
  }
}
operation.iterate(set1);


// 将Set转换成数组
let [...arr] = set
console.log('将Set转换成数组:', arr)

// set 是强引用的方式，如果存储的对象被置为null，但是Set实际仍然存在的话，对象依然无法被垃圾回收器回收，从而无法释放内容
set.clear()
console.log('删除所有set数据项', set, set.size)

let key = {}
let key2 = {
  name: 'li',
  age: 23
}

set.add(key)
set.add(key2)
console.log(set, set.size)

key = null

console.log('存储的对象被置为null', set, set.size)

set.delete(key2)

console.log('删除某一项',set, set.size)

set = null
console.log(set)


console.log('========= 分割线 week set 存放的是对象的弱引用 ============')
// week set 存放的是对象的弱引用，当对象只被Set弱引用的话，并不会阻止对象实例被回收
let weak_set = new WeakSet()
weak_set.add(key2)
console.log(key2, weak_set)
console.log(weak_set.has(key2))
weak_set.delete(key2)
console.log(weak_set.has(key2)) //false

/*
 * 对于Weak Set和Set之间的重要差异：
 * 1. 对于Weak Set实例，若调用了add()方法时传入了非对象的参数，则会抛出错误。如果在has()或者delete()方法中传入了非对象的参数则会返回false；
 * 2. Weak Set不可迭代，因此不能用于for-of循环；
 * 3. Weak Set 无法暴露出任何迭代器（例如 keys() 与 values() 方法） ，因此没有任何编程手段可用于判断 Weak Set 的内容；
 * 4. Weak Set没有forEach()方法；
 * 5. Weak Set没有size属性；
 * */



console.log('========= 分割线 Object.is() 判断两个值是否相等 ============')
// Object.is() Polyfill -- Polyfill是一个js库，主要抚平不同浏览器之间对js实现的差异。
if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y
    }
  };
}
console.log('Object.is()判断两个值是否相同', Object.is(NaN, NaN), Object.is(0, -0))
