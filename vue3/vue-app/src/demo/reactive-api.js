
let count = 2
const getDouble = n => n * 2
let double = getDouble(count)

// console.log(double)
// count = 3
// console.log(double)

/* * * * * * * * * * * * * * * * * * * */
// defineProperty

const obj = {}
Object.defineProperty(obj, 'count', {
  get () {
    return count
  },
  set (val) {
    count = val
    double = getDouble(val)
  }
})

// console.log(double)
// obj.count = 3
// console.log('defineProperty : ', double)


// delete obj.count
// console.log('defineProperty delete : ', double)


/* * * * * * * * * * * * * * * * * * * */
// proxy
const p = new Proxy(obj, {
  get (obj, prop) {
    return obj[prop]
  },
  set (obj, prop, val) {
    obj[prop] = val
    if (prop === 'count') getDouble(val)
  },
  deleteProperty (obj, prop) {
    delete obj[prop]
    if (prop === 'count') double = NaN
  }
})

// console.log(double)
// p.count = 3
// console.log('proxy : ', double)

// delete p.count
// console.log('proxy delete :', double)

/* * * * * * * * * * * * * * * * * * * */
// value setter

let _value = 1

let counter = {
  get value () {
    return _value
  },
  set value (val) {
    _value = val
    double = getDouble(_value)
  }
}

counter.value = 100
console.log('value setter : ', double)

