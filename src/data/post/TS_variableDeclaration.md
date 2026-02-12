# 变量声明

## 1. `let` / `const` / `var` 的区别

### 1.1 `let`

* **块级作用域**（`{}` 内生效）
* **可重新赋值**
* 存在“暂时性死区（TDZ）”：声明前使用会报错

```ts
let a = 1;
a = 2;

if (true) {
  let a = 100; // 这是一个新的 a（块级）
}
```

### 1.2 `const`

* **块级作用域**
* **必须初始化**
* **不可重新赋值**，是对 let 的一个增强（但对象/数组内部内容可以改）

```ts
const x = 1;
// x = 2; // error

const obj = { n: 1 };
obj.n = 2; // OK（改的是属性，不是重新赋值）
```

### 1.3 `var`（不推荐）

* **函数作用域**（没有块级作用域）
-- var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问，包含它的代码块对此没有什么影响。
```ts
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'
```
* **允许重复声明**
* 会“变量提升”，容易写出隐蔽 bug

```ts
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```

> 默认用 `const`，需要重新赋值才用 `let`，不要用 `var`。

---

## 2. 类型标注与类型推断

### 2.1 类型推断（推荐常用）

```ts
let n = 123;      // number
const s = "hi";   // "hi"（字面量类型，const 更“窄”）
```

### 2.2 显式类型标注

```ts
let n: number = 123;
let s: string = "hi";
```

---

## 3. 何时该用 `const`？

只要变量“引用不变”，就用 `const`（即使对象内部会变）。

```ts
const list: number[] = [];
list.push(1); // OK
```

如果你需要让引用也变化（重新指向新数组/新对象），才用 `let`：

```ts
let list: number[] = [];
list = [1, 2, 3]; // OK
```

---

## 4. 解构声明（Destructuring）

### 4.1 数组解构

```ts
const arr = [10, 20] as const;
const [x, y] = arr; // x: 10, y: 20
```

### 4.2 对象解构

```ts
const user = { id: 1, name: "A" };
const { id, name } = user; // id: number, name: string
```

### 4.3 解构 + 重命名

```ts
const { id: userId } = user; // userId: number
```

### 4.4 解构的类型标注（常见写法）

给“解构出的变量”标注类型，通常写在整体结构上：

```ts
const { id, name }: { id: number; name: string } = { id: 1, name: "A" };
```

---

## 5. 默认值（Default values）

```ts
function greet(name = "guest") {
  // name: string（默认值会影响推断）
  return `hi ${name}`;
}
```

解构默认值：

```ts
const { role = "user" } = { role: undefined as string | undefined };
// role: string
```

---

## 6. `as const`（让常量更“窄”）

默认情况下对象属性会被推成更宽的类型（例如 `"dev"` 会变成 `string`），`as const` 会让它变成只读并保留字面量类型。

```ts
const cfg1 = { mode: "dev" };
// cfg1.mode: string

const cfg2 = { mode: "dev" } as const;
// cfg2.mode: "dev"
```

---

## 7. 变量声明的常见坑

### 7.1 `const` 不是“不可变对象”

```ts
const obj = { a: 1 };
obj.a = 2; // OK
```

想要“深不可变”需要额外类型/工具（比如 `Readonly<T>` 只是浅只读）。

### 7.2 `let` 与 TDZ

```ts
// console.log(a); // error（TDZ）
let a = 1;
```

### 7.3 `var` 的循环闭包问题（经典）

```ts
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3 3 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // 0 1 2
}
```

---

如果你下一节要继续写到 `.md`，通常顺序是：
**作用域与提升 → 解构/默认值 → 类型推断细节（const 字面量）→ readonly/Readonly<T>（可选）**。
