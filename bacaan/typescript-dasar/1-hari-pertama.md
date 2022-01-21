# TypeScript Basic Day One

TypeScript adalah sebuah bahasa pemrograman _strongly typed_ yang dibangun di atas JavaScript, dengan tujuan memberikan _tooling_ yang lebih baik dalam mengembangkan aplikasi berbasis JavaScript.

Kenapa dibutuhkan TypeScript?
- Integrasi dengan _text editor_ yang lebih baik
- Bisa meminimalisir error di level _runtime_ karena bisa ditemukan lebih awal saat _compile_
- Typings (`string`, `number`, `boolean`)

### Contoh Kasus

```js
function add(x, y) {
    return x + y
}

const result = add(1, '2')

console.log(result) // '12'
```

```ts
function add (x: number, y: number): number {
    return x + y;
}

const result = add(1, '2') // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

console.log(result) // '12'
```

## TypeScript dengan JavaScript, apa hubungannya?

### JavaScript

JavaScript adalah bahasa scripting (interpreter) yang mengimplementasikan ECMAScript standar, sebuah standarisasi JavaScript untuk memastikan setiap web page bekerja dengan baik di browser yang berbeda (_interoperability_).

### TypeScript

TypeScript adalah superset dari JavaScript, yang artinya TypeScript mengembangkan JavaScript untuk memiliki fitur-fitur tertentu ke dalam JavaScript. Setiap berkas TypeScript akan di-_transpile_ ke berkas JavaScript.

## Install TypeScript

> Bisa diikuti langkah dari [https://www.typescriptlang.org/download](https://www.typescriptlang.org/download)

- Langkah pertama, pastikan di system sudah terpasang `NodeJS`
- Gunakan package manager untuk NodeJS seperti `npm` atau `yarn`, dalam modul ini akan digunakan `npm` karena modul dasar
- Jalankan perintah `npm install -g typescript` untuk memasang di sistem induk

### Memulai Project TypeScript

- Buat sebuah direktori baru, misal `belajar-typescript`
- Buka `terminal` di direktori tersebut
- Jalankan `tsc --init`, perintah ini akan memulai direktori tersebut sebagai project typescript dan menghasilkan berkas `tsconfig.json`
- Buat sebuah berkas dengan ekstensi `.ts`, misal `coba.ts`
- Tulis sebuah fungsi dengan bahasa TypeScript lalu simpan
- Jalankan perintah `tsc`
- Perhatikan akan ada sebuah berkas baru bernama `coba.js`

## Mengenal Types

Dengan menggunakan TypeScript, pemrogram memungkinkan untuk memberikan tipe data (type) pada setiap parameter, variabel, atau return value yang dikembalikan oleh sebuah fungsi, ini adalah konsep dasar dari TypeScript.

### Primitives

  - `string` untuk type karakter
  - `number` untuk type angka matematis
  - `boolean` untuk `true` atau `false`

### Array

Untuk membuat sebuah array cukup gunakan `tipe_data[]`, seperti `number[]` untuk `[1, 2, 3]`, atau `string[]` untuk `['a', 'b', 'c']`.

### Any

Type `any` digunakan ketika pemrogram tidak menginginkan nilai apapun jenisnya menyebabkan _typechecking errors_, atau tidak ingin ada error apapun ditampilkan saat transpile file `ts`, karena apapun nilai yang diberikan akan dianggap type yang benar dan legal.

Contoh

```ts
let obj: any = { x: 0 };
// Kode-kode di bawah ini tidak akan dianggap error saat proses compile.
// Dengan digunakannya `any`, semua data type checking akan dimatikan untuk variabel tersebut,
// diasumsikan pemrogram lebih paham apa yang terjadi dibandingkan dengan TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';
const n: number = obj;
```

> Ketika sebuah object tidak didefiniskan untuk sebuah type, compiler akan mengatur object tersebut sebagai `any`. Hal ini akan menyebabkan kekacauan di kemudian hari, karena tipe `any` tidak akan dicek apa type-nya. Set `"noImplicitAny": true` di file `tsconfig.json`.

## Type Annotations

Ketika membuat sebuah object, pemrogram bisa menambahkan sebuah type setelah nama object tersebut, contoh

```ts
const name: string = 'Sendy'
```

Pada dasarnya, ketika sebuah object dibuat dan dimasukkan sebuah nilai, object tersebut akan memiliki type yang sama dengan type nilai pertamanya, misal

```ts
const name = 'Sendy'
```

object `name` tersebut akan terus dikenali sebagai object dengan type `string` karena nilai pertamanya adalah sebuah `string`.

Contoh lain

```ts
const price: number = 30000000
const isAvailable: boolean = true
const keywords: string[] = ['rice', 'chicken', 'crispy']

// this also works
const price = 30000000 // price will known as number
const isAvailable = true // isAvailable will known as boolean
const keywords = ['rice', 'chicken', 'crispy'] // keywords will known as string[]
```

## Functions

Di typescript, pemrogram memungkinkan untuk menentukan type apa yang ingin diterima dan dikembalikan oleh sebuah fungsi.

### Parameter Type Annotations

```ts
function hello(name: string) {
    console.log('Hello ' + name)
}
```

Ketika sebuah parameter memiliki _type annotation_, parameter tersebut akan dicek validasi type-nya

```ts
hello(87) // Argument of type 'number' is not assignable to parameter of type 'string'.
```

### Return Type Annotations

Pemrogram juga bisa menambahkan type annotations yang ingin dikembalikan oleh sebuah fungsi

```ts
function isEven(value: number): boolean {
    return value % 2 === 1
}

function calculateCircleArea(radius: number): number {
    return 3.14 * Math.pow(radius, 2)
}

function getCountry(): string {
    return 'Indonesia'
}

function returnNothing(): void {
    console.log('Just return nothing')
}
```

## Tuple

Tuple adalah type annotation yang mirip dengan array, hanya saja tuple sudah ditentukan berapa jumlah _element_ di dalam array, dan type apa di posisi mana. Misal sebuah tuple memiliki 3 buah element, index 0 `number`, index 1 `string`, index 2 `boolean`, misal

```ts
type TupleSample = [number, string, boolean]
```

## Enums

Enum adalah sebuah grup dari _constants_, memungkinkan pemrogram untuk dapat melabeli _constant_ agar lebih mudah dibaca.

### Numeric Enums

Sifat dari numeric enum, jika value dari sisa enum di bawahnya tidak didefinisikan, maka value dari anggota enum selanjutnya otomatis dinaikkan, misal

```ts
enum WindDirection {
    North: 1,
    East,
    South,
    West,
}
```

Jika `North` memiliki nilai `1`, maka `East` memiliki nilai `2`, `South` memiliki nilai `3`, `West` memiliki nilai `4`.

Jika tidak didefinisikan nilai awal dari enum pertama, nilai anggota enum akan dimulai dari `0`, misal

```ts
enum WindDirection {
    North,
    East,
    South,
    West,
}
```

Maka `North` memiliki nilai `0`, maka `East` memiliki nilai `1`, `South` memiliki nilai `2`, `West` memiliki nilai `3`.

```ts
enum WindDirection {
    North: 1,
    East,
    South,
    West,
}

function navigateTo(direction: WindDirection) {
    // ... code here
}

navigateTo(WindDirection.East)
```

### String Enums

Konsepnya sama dengan Numeric Enums, tetapi setiap anggota dari enum harus dideklarasikan nilainya, misal

```ts
enum WindDirection {
    North = "NORT",
    East = "EAST",
    South = "SOUTH",
    West = "WEST",
}
```

### Heterogeneous enums

Secara teknis, Enums bisa dikombinasikan antara numeric dengan string, **tapi ngapain?**

```ts
enum Response {
    No = 0,
    Yes = "YES",
}
```

## Object Types

Setiap data yang diolah, biasanya datang dalam sebuah paket bernama `object`, karena itu digunakanlah _Object Types_ di TypeScript.

### Anonymous Object Types

Object type tidak dideklarasikan secara eksplisit, hanya saja dijabarkan seperti apa bentuknya di sebuahn parameter, contoh:

```ts
function hello(person: {name: string, age: number, isActive: member}) {
    // ...
}
```

### Named Object Types

Ada dua cara untuk membuat _named object types_, dengan `interface` atau `type`

```ts
interface Person {
    name: string
    age: number
    isActive: boolean
}
```

```ts
type Person = {
    name: string
    age: number
    isActive: boolean
}
```

### Nesting Object Types

```ts
interface Address {
    street: string
    city: string
    province: string
    postalCode: string
}

interface Person {
    name: string
    age: number
    isActive: boolean
}

interface Customer {
    user: Person
    address: Address
}

// Mapping result:

interface Customer {
    user: {
        name: string
        age: number
        isActive: boolean
    }
    address: {
        street: string
        city: string
        province: string
        postalCode: string
    }
}
```

### Property Modifiers
#### Optional Properties

> set `"strictNullChecks": true` di `tsconfig.json` terlebih dahulu

Pada beberapa kondisi, kita bisa menemukan properti-properti _optional_, properti ini ditandai dengan `?` di ujung nama properti, yang artinya dalam beberapa kesempatan, properti tersebut tidak tersedia pada sebuah object

```ts
interface Person {
    name: string
    age: number
    isActive: boolean
    email?: string
}
```

Ketika sebuah properti dilabeli `optional`, TypeScript akan memberitahukan pemrogram bahwa properti tersebut kemungkinan tidak ada atau `undefined`

```ts
function addUser(user: Person) {
    // ...
    return user
}

const john = addUser({name: 'John', age: 29, isActive: true})
const dean = addUser({name: 'Dean', age: 39, isActive: true, email: 'dean@mailer.ss'})

console.log(john.email) // Object is possibly 'undefined'
console.log(dean.email) // Object is possibly 'undefined'
```

Dengan optional properties modifier ini, TypeScript akan selalu memberikan peringatan kemungkinan properti teresebut tidak ada atau `undefined` setiap kali pemrogram mencoba untuk mengakses properti tersebut.

> Menggunakan _non-null assertion_ operator (`!`) akan menghilangkan peringatan ini, sebagai konfirmasi dari pemrogram bahwa pemrogram mengetahui lebih baik dibanding TypeScript dan bertanggung jawab atas segala hal yang akan terjadi

### Function Types

Function adalah sebuah _building block_ dari sebuah kode program, bisa sebagai _local function_, _imported function_ dari _module_ lain, sebagai _method_ dari sebuah _class_, atau sebagai _parameter_ sebuah fungsi seperti halnya parameter lain.

```ts
function hello(fn: (message: string) => void) {
    fn('Hello there')
}

function log(message: string) {
    console.log(message)
}

hello(log)
```

Contoh paling banyak digunakan untuk implementasi dari _Function Types_ adalah saat pemrogram memasukan fungsi _callback_ pada sebuah fungsi utama.

#### Named Function Types

Function types juga bisa ditulis dalam _type alias_

```ts
type LoggerFunction = (message: string) => void

function hello(fn: LoggerFunction) {
    // ...
}
```

## Generic

Generic adalah sebuah fungsi yang akan mengembalikan hal yang sama dengan input yang diterimanya. Tanpa menggunakan _generic_, pemrogram perlu untuk mendefinisikan type secara spesifik atau menggunakan `any`, tetapi dengan cara tersebut sebuah fungsi akan memiliki batasan-batasan yang membuat sebuah _generic_ tidak _reusable_.

```ts
// specified type
function what(arg: number): number {
    return arg
}

// any
function what(arg: any): any {
    return arg
}
```

Dengan digunakannya `any` sebagai input type, membuat fungsi tersebut bisa menerima type apa saja, namun karena `any` tidak akan dilakukan _type checking_, TypeScript tidak akan mengenali type apa yang dikembalikan oleh fungsi dan pemrogram bisa kesulitan untuk melihat type apa yang dikembalikan oleh fungsi tersebut. Untuk mengatasi masalah ini, kita bisa mengambil informasi type apa yang digunakan sebagai input, juga bisa sebagai type apa yang dikembalikan oleh sebuah fungsi.

Contoh penggunaan _type variable_

```ts
function what<Type>(arg: Type): Type {
    return arg
}
```

Contoh penggunaan generic

```ts
// explicitly set the type inside <> and the function will use that type as return type
// result will contain string type with 'apa ini' value
const result = what<string>('apa ini')
```

```ts
// TypeScript will use type argument inference, basically will set the type from input parameter and reuse it as the return type, automatically
// result will contain string type with 'apa ini' value
const result = what('apa ini')
```

### Generic Functions

Sering ditemukan sebuah fungsi yang akan memroses sebuah data dengan input tertentu dan mengembalikan output dengan type yang terkait dengan _type_ input tersebut. Misal sebuah fungsi menerima input sebuah array, dan akan mengembalikan nilai dari array index `0`.'

```ts
function first(elements: any[]) {
    return elements[0]
}
```

Fungsi tersebut berjalan sebagai mana mestinya, akan tetapi fungsi tersebut akan mengembalikan `any`, dan akan lebih baik jika mengembalikan type dari array tersebut.

```ts
function first<Type>(elements: Type[]): Type | undefined {
    return elements[0]
}
```

dengan menambahkan parameter `Type` pada sebuah fungsi dan juga sebagai return type, pemrogram telah menghubungkan antara type dari input dengan type dari return value, bisa diimplementasikan sebagai berikut

```ts
const s = first(["a", "b", "c"]) // s is of type 'string'

const n = first([1, 2, 3]) // n is of type 'number'

const u = first([]) // u is of type undefined
```

### Inference

Jika sebuah fungsi membutuhkan _input type_ dan _return type_ yang tidak berkaitan atau berbeda, maka type dipilihkan secara otomatis oleh TypeScript

```ts
function parse<Input, Output>(elements: Input[], fn: (element: Input) => Output): Output[] {
    return elements.map(fn)
}

const parsed = parse(["1", "2", "3"], (n) => parseInt(n));
```

### Generic Constraints

Ketika sebuah _generic function_ perlu validasi, modifikasi, atau menguji dari sebuah input apakah parameter memiliki suatu value tertentu atau tidak, daripada kembali menggunakan `any` atau membuat berbagai macam _object type_, pemrogram bisa menggunakan _generic constraint_.

Contoh kasus:

> Setiap data yang disimpan dalam sebuah database akan divalidasi oleh berbagai macam pengujian, ketika data tersebut lolos pengujian, key `validated` akan diperbaharui dengan nilai boolean `true`. Data yang diuji ada berbagai jenis, seperti **product**, **user** dan **transaction**.
> Jika pemrogram ingin membuat sebuah fungsi untuk validasi setiap data apakah memiliki object `validated` tanpa harus "repeating yourself", pemrogram harus membuat _generic functions_ dengan _generic constraints_.

Contoh implementasi

```ts
interface ValidData {
    validated: boolean
}

function theValidData<Type extends ValidData>(data: Type): Type | undefined {
    if (data.validated) {
        return data
    }
    return undefined
}

const theValidProduct = theValidData({
    name: 'VPS Tier 1',
    price: 199000,
    validated: true
})

const theValidUser = theValidData({
    name: 'John Dear',
    role: 'admin',
    validated: true
})

const theValidTransaction = theValidData({
    customerName: 'John Dear',
    totalAmount: 299000,
    status: 'paid',
    validated: true
})
```

# WAKTUNYA TUGAS

- Pasang typescript di local computer, pasang dengan `npm` di level "global"
- Buat folder `latihan-typescript`
- Jalankan perintah `tsc --init` di folder tersebut
- Buatlah Object Type dari contoh JSON di bawah ini dan simpan sebagai `article.response.ts`
```json
{
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "Tugas Belajar TypeScript",
      "body": "Latihan dulu biar ngerti",
      "created": "2021-12-27T14:56:29.000Z",
      "updated": "2021-12-27T14:56:28.000Z",
      "published": true
    },
    "author": {
      "id": "42",
      "type": "people",
      "name": "John Dear",
      "age": 80,
      "role": "contributor"
    },
    "comments": [{
      "name": "John Dear",
      "body": "Tes komen",
      "created": "2021-12-27T14:56:29.000Z",
      "updated": "2021-12-27T14:56:28.000Z"
    }]
  }]
}
``` 
- Jalankan perintah `tsc --watch` pada terminal di folder `latihan-typescript`
- Buatlah sebuah fungsi yang menerima input dengan object type dari `article.response.ts` tadi yang mengembalikan sebuah value tertentu (fungsi bebas, sesuai kreatifitas), simpan ke file dengan format `namafungsi.ts`
- Amati file baru dengan ekstensi `.js` dan pelajari isinya