# JS 浮点数的二进制表示

## IEEE 754 double float

<div><pre>sign       exponent                              fraction
├─┼─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┼─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬────────────┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
├─┼───────────────────┼─┼──────────────────────────────────────────────────────┼─┤
 63                    53                                                       0  </pre></div>
* sign（1 bit）符号，0 代表正值，1 代表负值
* exponent （11 bit） 指数
* fraction（52 bit）有效数字

在二进制中，第一个有效数字必然是 `1`，为了节省内存，同时又可以多存储 1 位小数保持精度（当然还是会有就读丢失），这个 1 并不会被存储，所以 `fraction` 存储的是有效数字的 52 位小数部分

**高位放在低地址就是大端法，低位放在低地址就是小端法**

上图中标注的即为小端法

了解了这些前置知识，我们接着来看为什么 JS 中 0.1 + 0.2 !== 0.3

`JavaScript` 采用 IEEE 754 双精度浮点型标准，众所周知，计算机中存储的都是二进制，而 0.1、0.2 转成二进制都是无限循环小数，由于 IEEE 754 双精度浮点型标准只能存储 64 bit，所以会对超出的小数部分进行取舍，造成精度丢失 

0.1 的二进制表示方法如下（也可以[点击这里](/index.html)）：

```js
/*
 * sign  exponent                        fraction
 *   0 01111111011 100110011001100110011001100110011001100110011010
 *   +1 * 2^-4 * 1.100110011001100110011001100110011001100110011010
 * 为了处理负指数的情况，实际的指数值按要求需要加上一个偏置（Bias）值作为保存在指数段中的值。
 *（单精度是 127，双精度是 1023）
 *   -4 = 0b01111111011 - 1023
*/
```


* Number.EPSILON

```js
0.1 + 0.2 - 0.3 < Number.EPSILON // true
```

我们可以将 0.1 与 0.2 的和与 0.3 做差，只要小于 `Number.EPSILON`，我们就可以认为他们是相等的。当然，这种操作也并非完全安全，如果两个数的二进制精度同向丢失（都比原来的值偏大或偏小），这个结果也会不符合预期。


