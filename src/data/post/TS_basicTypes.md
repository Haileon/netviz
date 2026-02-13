---
title: 'TS'
publishDate: 2026-01-22
draft: false
excerpt: '...'
category: 'Web'
tags: ['TS']
metadata: {}
---

# TypeScript 基础类型（Basics）

> TS 的类型分两大类：**值类型（value types）**和**结构/组合类型（union、intersection、literal 等）**。这里先覆盖最常用的基础类型与常见写法。

## 1. boolean

```ts
let isDone: boolean = false;
```

## 2. number

TS 里不区分 int/float，统一 `number`（JS 的 `Number`）。

```ts
let count: number = 42;
let pi: number = 3.14159;
```

## 3. string

```ts
let name: string = 'Alice';
let msg: string = `hello, ${name}`;
```

## 4. null / undefined

`null` 和 `undefined` 各自是独立类型。是否能赋值给其它类型，取决于 `tsconfig` 的 `strictNullChecks`：

- `strictNullChecks: true`（推荐）：`null/undefined` **不能**赋给 `string/number/...`，除非显式写成联合类型。

```ts
let a: string = 'ok';
// a = null; // error (strictNullChecks=true)

let b: string | null = null;
b = 'hi';
```

## 5. bigint

需要 ES2020+，字面量用 `n` 后缀。

```ts
let big: bigint = 9007199254740993n;
```

## 6. symbol

```ts
const s1: symbol = Symbol('id');
const s2: symbol = Symbol('id'); // s1 !== s2
```

## 7. object（不推荐滥用）

`object` 表示“非原始类型”（不是 string/number/boolean/bigint/symbol/null/undefined）。

```ts
let o: object = { x: 1 };
o = [1, 2, 3];
o = () => {};
```

更常用的是写“对象结构类型”：

```ts
let user: { id: number; name: string } = { id: 1, name: 'A' };
```

## 8. Array

两种写法等价：

```ts
let nums: number[] = [1, 2, 3];
let nums2: Array<number> = [1, 2, 3]; // 使用数组泛型，Array<元素类型>
```

## 9. Tuple（元组）

“定长 + 每个位置类型固定”的数组：

```ts
let pair: [number, string] = [1, 'one'];
// pair = ["one", 1]; // error
```

可读性更强的写法（带标签）：

```ts
let point: [x: number, y: number] = [10, 20];
```

## 10. enum（枚举）

### 10.1 数字枚举

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

### 10.2 字符串枚举（更直观，常用于业务常量）

```ts
enum Role {
  Admin = 'admin',
  User = 'user',
}
```

注意：`enum` 会生成运行时代码（不是纯类型），如果你只要类型层面的常量，后面可以用 `as const` + 联合字面量替代。

## 11. any（尽量少用）

在编程阶段还不清楚类型的变量指定一个类型，类型检查器不对这些值进行检查而是直接让它们通过编译阶段的检查。

```ts
let x: any = 1;
x = 'hi';
x.foo.bar(); // 不报错，但运行可能炸
```

> 在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。
> 你可能认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法。

```ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

## 12. unknown（比 any 安全）

`unknown` 表示“我不知道它是什么”，使用前必须收窄（narrowing）。

```ts
let x: unknown = JSON.parse('{"a":1}');

if (typeof x === 'object' && x !== null) {
  // 这里 x 仍然是 object，需要更具体的判断/断言
}
```

## 13. void（无返回值）

常见于函数，表示没有任何类型。

```ts
function log(msg: string): void {
  console.log(msg);
}
```

## 14. never（永不发生）

永不存在的值的类型，表示“不会正常结束”的情况：抛异常/死循环/不可能分支。  
never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

```ts
function fail(msg: string): never {
  throw new Error(msg);
}

function infinite(): never {
  while (true) {}
}
```

## 15. 类型推断（Type Inference）

不写类型时，TS 会根据初始值推断类型：

```ts
let n = 123; // 推断为 number
let s = 'hi'; // 推断为 string
```

## 16. Union（联合类型，基础但非常常用）

值可能是多种类型之一：

```ts
let id: number | string;
id = 1;
id = '1';
```

## 17. Literal Types（字面量类型）

把值当作类型使用（常用于状态/配置）：

```ts
let mode: 'dev' | 'prod';
mode = 'dev';
// mode = "test"; // error
```

配合 `as const`：

```ts
const config = { mode: 'dev' } as const;
// config.mode 的类型是 "dev"，不是 string
```

## 18. Type Assertions（类型断言）

你“告诉编译器”某个值的类型。不会做运行时转换。

```ts
const el = document.getElementById('app') as HTMLDivElement;
```

也可以用尖括号（在 TSX/React 里不要用，冲突）：

```ts
// const el = <HTMLDivElement>document.getElementById("app");
```

---

## 常见易错点速记

- `any` 会放弃检查；优先用 `unknown` + 收窄。
- `strictNullChecks` 开启后，`null/undefined` 必须通过联合类型显式允许。
- `object` 不是 `{}`，更不是“任意对象结构”；想表达结构请写 `{ a: number }` 或 `Record<string, ...>`。
- `never` 常用于 exhaustive check（确保 switch 覆盖所有分支）。

---
