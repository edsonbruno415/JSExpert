const assert = require('assert')

const _items = Symbol('_items');
class List {
  constructor(...args) {
    this[_items] = args.map(arg => arg.toString());
  }

  *[Symbol.iterator]() {
    for (const item of this[_items]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = new Promise(resolve => setTimeout(resolve, 1500));
    for (const item of this[_items]) {
      await timeout;
      yield item;
    }
  }
}

const list = new List('João', 'Maria', true);

assert.deepStrictEqual([...list], ['João', 'Maria', 'true'])

const listMarket = new List('Maça', 'Uva', 'Banana', NaN, true, 1)

  /*   ; (async () => {
      for await (itemMarket of listMarket) {
        console.log('ITEM MARKET', itemMarket);
      }
    })(); */

// --- keys
const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal Objects', user.userName)
// // sempre único em nivel de endereco de memoria
// console.log('getting normal Objects', user[Symbol("userName")])
// console.log('getting normal Objects', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'value for normal Objects')

// // sempre único em nivel de endereco de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// é dificil de pegar, mas nao é secreto!
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
// --- keys

// Well Known Symbols
const obj = {
  // iterators 
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // remove o ultimo e retorna
        value: this.items.pop()
      }
    }
  })
}

// for( const item of obj) {
//     console.log('item', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError()

    const itens = this[kItems]
      .map(item =>
        new Intl
          .DateTimeFormat("pt-BR", { month: "long", day: "2-digit", year: "numeric" })
          .format(item)
      )

    return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(itens)


  }
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}

const myDate = new MyDate(
  [2020, 03, 01],
  [2018, 02, 02]
)

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2018, 02, 02),
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)

// coercao explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

// implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)

  // ;(async() => {
  //     for await(const item of myDate) {
  //         console.log('asyncIterator', item)
  //     }
  // })()

  ; (async () => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
  })()