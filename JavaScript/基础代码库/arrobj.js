const arrobj = {
  // Math:
  /**
   * 1
   * [求最大值]
   * @param {Array} arr
   * @param {function} fn
   * @example
   * maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 8
   * maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 8
   */
  maxBy: (arr, fn) => Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn])),
  /**
   * 2
   * [求最小值]
   * @param {Array} arr
   * @param {function} fn
   * @example
   * minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 2
   * minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 2
   */
  minBy: (arr, fn) => Math.min(...arr.map(typeof fn === 'function' ? fn : val => val[fn])),
  /**
   * 3
   * [求平均值]
   * @param {Array} arr
   * @param {function} fn
   * @example
   * averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
   * averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5
   */
  averageBy: (arr, fn) => arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) / arr.length,
  /**
   * 4
   * [求总和]
   * @param {Array} arr
   * @param {function} fn
   * @example
   * sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 20
   * sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 20
   */
  sumBy: (arr, fn) => arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0),
  // Array:
  /**
   * 1
   * [排除元素]
   * [返回数组a排除数组b中的元素后组成的新数组]
   * @param {Array} a [要检查的数组]
   * @param {Array} b [要排除的值]
   * @param {function} fn
   * @example
   * differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
   * differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]
   */
  differenceBy: (a, b, fn) => {
    const s = new Set(b.map(v => fn(v)));
    return a.filter(x => !s.has(fn(x)));
  },
  /**
   * 2
   * [移除元素]
   * [移除数组a中所有和数组b相同的元素]
   * 注意： 不同于differenceBy, 这个方法会改变数组 a
   * @param {Array} a [要检查的数组]
   * @param {Array} b [要移除的数组元素]
   * @param {function} fn
   * @example
   * var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
   * pullBy(myArray, [{ x: 1 }, { x: 3 }], o => o.x); // myArray = [{ x: 2 }]
   */
  pullBy: (arr, ...args) => {
    const length = args.length;
    let fn = length > 1 ? args[length - 1] : undefined;
    fn = typeof fn == 'function' ? (args.pop(), fn) : undefined;
    let argState = (Array.isArray(args[0]) ? args[0] : args).map(val => fn(val));
    let pulled = arr.filter((v, i) => !argState.includes(fn(v)));
    arr.length = 0;
    pulled.forEach(v => arr.push(v));
  },
  /**
   * 3
   * [交集元素]
   * [返回数组a与数组b产生交集的元素组成的新数组]
   * @param {Array} a [要检查的数组]
   * @param {Array} b [要检查的数组]
   * @param {function} fn
   * @example
   * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
   * intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], v=> v.x); // => [{ 'x': 1 }]
   */
  intersectionBy: (a, b, fn) => {
    const s = new Set(b.map(x => fn(x)));
    return a.filter(x => s.has(fn(x)));
  },
  /**
   * 4
   * [并集元素]
   * [返回数组a与数组b产生并集的元素组成的新数组]
   * @param {Array} a [要检查的数组]
   * @param {Array} b [要检查的数组]
   * @param {function} fn
   * @example
   * sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0
   */
  unionBy:(a, b, fn) => {
    const s = new Set(a.map(v => fn(v)));
    return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]));
  },
  /**
   * 5
   * [查找索引值]
   * [返回数组b在数组a中的索引位置]
   * @param {Array} a [要检查的数组]
   * @param {Array} b [要查找索引的元素]
   * @param {function} fn
   * @example
   * sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0
   */
  sortedIndexBy: (arr, n, fn) => {
    const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
    const val = fn(n);
    const index = arr.findIndex(el => (isDescending ? val >= fn(el) : val <= fn(el)));
    return index === -1 ? arr.length : index;
  },
};