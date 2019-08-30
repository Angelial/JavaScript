/*
* 函数防抖 （debounce）
* 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次。
* 如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
*
* */
let i = 0

const time = setInterval(debounce(handler, 1500), 1000)

function debounce (fn, wait) {
  let timeOut = null
  return function () {
    if (timeOut !== null) {
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(fn, wait)
    i++
    console.log(i)
    if (i === 10) {
      clearInterval(time)
    }
  }
}

function handler () {
  console.log(99)
}