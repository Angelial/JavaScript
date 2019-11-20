// promise 是异步编程的解决方案


/*
*  所谓的promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）
*  （1）对象状态不受外界影响。 promise代表一个异步操作，有三种状态
*   pending （进行中）、fulfilled（已完成）和 rejected （已失败）。
*   (2) 一旦状态改变，就不会再变，任何时候都可以得到这个结果。promise对象的状态改变，只有两种可能
*   从pending变为fulfilled和从pending变为rejected。
*
*
*   promise一旦新建它就会立即执行，无法中途取消
*   如果不设置回调函数，promise内部抛出的错误，不会反应到外部
*   当处于pending状态时，无法得知目前进展到哪一个阶段
*
* */

// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
// 它们是两个函数，有JavaScript引擎提供，不用自己部署

const promise = new Promise(function (resolve, reject) {
  const value = 0
  // 异步操作成功
  if (value === 0) {
    resolve(value)
  } else {
    reject('error')
  }
})

// Promise 实例生成后可以用then方法分别指定resolved状态和rejected状态回调函数
// then 方法可以接受两个回调函数作为参数，第一个回调函数是Promise对象的状态变为rejected时调用
// 第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数
promise.then(function (value) {}, function(error) {})

function timeout (ms) {
  return new Promise ((resolve, reject) => {
    // 定时器启动时候，第三个以后的参数是作为第一个func()的参数传进去
    setTimeout(resolve, ms, 'done')
  })
}
timeout(100).then((value) => {
  console.log(value)
})

// Promise 新建后会立即执行
let promise1 = new Promise(function (resolve, reject) {
  console.log('Promise')
  resolve('resolve')
})
console.log('hi')
promise.then(function () {
  console.log('resolved.')
})
console.log('hi')


// 异步加载图片的例子

function loadImageAsync (url) {
  return new Promise(function (resolve, reject) {
    console.log('loadImageAsync')
    const image = new Image() // 单独执行 Promise.js会报错， image对象要有DOM元素存在
    image.onload = function () {
      resolve(image)
    }
    image.onerror = function () {
      reject(new Error('Could not load image at ' + url))
    }
    image.src = url
  })
}
loadImageAsync('https://cdn.xmfineart.com/upload/images/2019/09/30/5d91cbaa2aaa4.png').then(function (img) {
  console.log(img)
}, function (error) {
  console.log(error)
})

// Promise 对象实现Ajax操作例子

const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return
      }
      if (this.state === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatecharge = handler
    client.responseText = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })
  return promise
}
getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});