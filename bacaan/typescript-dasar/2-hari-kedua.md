# TypeScript Basic Day Two

## Advanced Types

### Mapped Types

- [ ] Kentang 
- [x] Wortel
- [ ] Ayam

Ketika pemrogram tidak mengetahui pasti key dari sebuah type, atau tidak ingin mengulang-ngulang karena sebuah type memiliki key yang sama dengan type lain

```ts
type FlatData = {
    [key: string]: string | number | boolean
}
```

```ts
type Feature = {
    post: (message: string) => void
}

type Application = {
    twitter: Feature
    facebook: Feature
}

type EnabledApplication = {
    [key in keyof Application]: boolean
}

const config: EnabledApplication = {
    twitter: true,
    facebook: false
}
```

### Literal Type

Selain primitives dan object type, TypeScript memiliki _literal type_ yang memungkinkan pemrogram memiliki type yang menerangkan kebutuhan dari value sebuah object.

```ts
let greeting: "hello" = "hello"

greeting = "hello" // valid dan legal

greeting = "hi" // tidak valid karena tidak sesuai type yang dideklarasikan
```

```ts
function greet(name: string, time: "pagi" | "siang" | "malam") {
    console.log("Hi " + name + ", Selamat " + time)
}

greet("John", "pagi") // Hi John, Selamat pagi
greet("John", "petang") // Argument of type '"petang"' is not assignable to parameter of type '"pagi" | "siang" | "malam"'.
```

### Template Literal Types

Literal types bisa dikombinasikan dengan literal types yang lainnya dan membentuk literal types yang baru dengan bantuan union.

```ts
type Country = "US" | "UK" | "ID"
type Language = "en" | "id"

type Locale = `${Language}_${Country}` // type Locale = "en_US" | "en_UK" | "en_ID" | "id_US" | "id_UK" | "id_ID"
```

### Union Object Types

Sebuah object memungkinkan untuk memiliki dua macam type, seperti `string` dengan `number`, `number` dengan `boolean`. Union type ditandai dengan tanda pipeline (`|`).

```ts
type Age = number | string

function whatIsYourAge(age: Age): Age {
    return age
}

whatIsYourAge(20)
whatIsYourAge('20')
```

### Intersection

Menggabungkan dua named type menjadi satu named type yang baru
```ts
type Latitude = {
    latitude: number
}

type Longitude = {
    longitude: number
}

type Coordinate = Latitude & Longitude
```

#### Narrowing

Setelah menggunakan Union type, pemrogram bisa menggunakan _narrowing_ untuk menentukan aksis selanjutnya bergantung dari type dari input fungsi tersebut, misal jika input adalah single object, maka akan mengembalikan `Hai Kamu`, dan jika array akan mengembalikan `Hai Kalian`.

```ts
function greeting(people: Person | Person[]): string {
    if (typeof people === 'string') {
        return 'Hai Kamu'
    }
    return 'Hai Kalian'
}
```

Pemrogram bisa menggunakan keyword `typeof` untuk menguji apakah input tersebut sesuai dengan type yang dikehendaki, atau bisa dengan fungsi lain seperti `Array.isArray(value)`.

##### `typeof` Guards

`typeof` adalah operator native dari JavaScript yang akan mengembalikan type dasar dari sebuah object
- "string"
- "number"
- "bigint"
- "boolean"
- "symbol"
- "undefined"
- "object"
- "function"

Selain `typeof`, bisa juga menggunakan `instanceof` untuk memvalidasi apakah suatu nilai merupakan _instance_ dari sebuah _class_.

```ts
class Person {
    // ...
}

const john = new Person()

function isPerson(data: Person | IPerson): string {
    if (data instanceof Person) {
        return 'class type'
    }
    return 'interface type'
}
```

### Extending Object Types

```ts
interface Person {
    name: string
    age: number
    isActive: boolean
}

interface User extends Person {
    email: string
    password: string
}

// Mapping result

interface User {
    name: string
    age: number
    isActive: boolean
    email: string
    password: string
}
```

## Class

Dalam pemrograman berorientasi objek / _Object Oriented Programming_ (OOP), sebuah class digunakan untuk membuat _reusable component_.

```ts
class Student {
    name: string

    constructor(name: string) {
        this.name = name
    }

    sayHi() {
        return "Hi " + this.name
    }
}

const student = new Student('John')
student.sayHi()
```

Jika sudah terbiasa dengan _OOP_, bisa dilihat bahwa kode di atas mendeklarasikan sebuah `class` dengan nama `Student` yang memiliki 3 _member_, yaitu `name`, sebuah constructor, dan fungsi `sayHi`.

Saat menggunakan class, untuk mengakses objek didalamnya digunakan `this`, hal ini menunjukkan bahwa objek yang diakses ada di dalam _scope_ class tersebut.

### Inheritance

Inheritance, atau penurunan sebuah class ke class baru lainnya.

```ts
class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }

    sayHi() {
        console.log("Hi " + this.name)
    }
}

class Student extends Person {
    constructor(name: string) {
        super(name)
    }

    learnSomething() {
        console.log(this.name + "is learning TypeScript")
    }
}

const student = new Student('John')
student.sayHi()
student.learnSomething()
```

Contoh di atas adalah dasar dari sebuah class, class akan menurunkan property dari base class (`Person`) ke turunannya (`Student`) dengan menggunakan `extends` keyword, sebuah class turunan biasa juga disebut _derived class_, dan _base class_ biasa disebut _super class_.

Keyword `constructor` digunakan untuk menginisiasi sebuah class dan memungkinkan untuk menerima parameter yang akan digunakan untuk mengisi sebuah nilai ke _class member_ yang nilainya berasal dari luar class tersebut. `constructor` akan dijalankan pertama kali saat inisiasi sebuah class sebelum fungsi lainnya dipanggil.

Ketika _derived class_ diharuskan untuk menginisiasi _super class_, maka gunakan fungsi `super` untuk menginisiasi dan memberikan constructor parameter yang dibutuhkan oleh _super class_.

Karena class `Person` mewariskan `sayHi` ke class `Student`, maka object yang menginisiasi sebagai class `Student` bisa mengakses fungsi `sayHi` yang ada di base class nya dengan keyword `this`.

### Abstraction / Implements

Abstraction adalah sebuah konsep untuk menyederhanakan sebuah object dan memisahkan tugas antara class / type dengan implementasi kode yang mewarisinya.

```ts
interface Applicant extends IPerson {
    qualified: boolean
}

interface HumanResourceJobDesc {
    doHiring: (people: Applicant[]) => Applicant[]
}

type EmployeeRole = 'human_resource' | 'manager' | 'executive'

class Employee {
    name: string
    role: EmployeeRole
    constructor(name: string, role: EmployeeRole)
}

class HumanResource extends Employee implements HumanResourceJobDesc {
    constructor(name: string) {
        super(name, 'human_resource')
    }

    doHiring(people: Person[]): Person[] {
        // ...
        return people.filter(data => data.qualified)
    }
}
```

`HumanResourceJobDesc` adalah sebuah interface yang mewakili abstraksi dari class `HumanResource`, ketika sebuah class `implements` sebuah `interface`, maka class tersebut wajib memiliki member dengan nama yang sama dan type yang sama dengan abstraksi yang dituliskan, dalam hal ini class `HumanResource` wajib memiliki fungsi `doHiring` dengan function type `(people: Applicant[]) => Applicant[]`.

## type vs interface

Contoh `type`

```ts
type Coordinate = {
    latitude: number
    longitude: number
}
```

Contoh `interface`
```ts
interface Coordinate {
    latitude: number
    longitude: number
}
```

### type

`type` merepresentasikan proses untuk membuat sebuah _named type_

### interface

Kebalikan dari `type`, `interface` adalah sebuah cara yang menggambarkan suatu object dan property-nya. Jika `type` bisa digunakan untuk _primitives_, _union_ dan _intersection_, maka `interface` hanya dibatasi untuk _object type_ saja.

### Persamaan

#### Keduanya bisa diperluas / extended

`type` dan `interface` bisa diperluas atau mengimplementasi `type` dan `interface` lainnya, yang membedakan hanya syntax yang digunakan.

##### interface extending interface

```ts
interface Coordinate {
    latitude: number
    longitude: number
}

interface Address extends Coordinate {
    address: string
}
```

##### interface extending type

```ts
type Coordinate = {
    latitude: number
    longitude: number
}

interface Address extends Coordinate {
    address: string
}
```

##### type extending type

```ts
type Coordinate = {
    latitude: number
    longitude: number
}

type Address = Coordinate & {
    address: string
}
```

##### type extending interface

```ts
interface Coordinate {
    latitude: number
    longitude: number
}

type Address = Coordinate & {
    address: string
}
```

#### class Implements

```ts
interface Coordinate {
    latitude: number
    longitude: number
}

class CoordinateModel implements Coordinate {
    latitude = 0.0
    longitude = 0.0
}

type Address = Coordinate & {
    address: string
}

class AddressModel implements Address {
    latitude = 0.0
    longitude = 0.0
    address = "Bandung"
}
```

**Sebuah class tidak dapat mengimplementasikan union type**

```ts
type AddressOrCoordinate = Coordinate | {address: string}

class AddressModel implements AddressOrCoordinate {

}
// A class can only implement an object type or intersection of object types with statically known members.
```

```ts
type AddressOrCoordinate = Coordinate & {address: string}

class AddressModel implements AddressOrCoordinate {

}
```

#### Declaration Merging

Jika terdapat dua buah atau lebih `interface` dengan nama yang sama, TypeScript akan menggabungkan kedua `interface` tersebut menjadi satu. Hal ini tidak berlaku jika menggunakan `type`, jika dipaksa untuk menggunakan dua `type` dengan nama yang sama atau lebih, TypeScript akan menampilkan error.

```ts
interface Coordinate {
    latitude: number
}
interface Coordinate {
    longitude: number
}

const coordinate: Coordinate = {latitude: 0.0, longitude: 0.0}
```

#### Tuple

Tuple hanya bisa ditulis dalam `type` keyword

```ts
type Coordinate = [latitude: number, longitude: number]
```

`interface` memungkinkan property di dalamnya menggunakan _tuple_

```ts
interface Coordinate {
    coordinate: [latitude: number, longitude: number]
}
```

## More Features of TypeScript

### Optional Chaining

Pada TypeScript versi 3.7 ke atas, berfungsi untuk menghentikan proses jika sebuah object merupakan `null` atau `undefined`.

```ts
const x = foo?.bar.baz()
```

Kode di atas jika dijabarkan adalah, jika `foo` memiliki value, maka `bar` akan dieksekusi, tetapi jika `foo` bernilai `null` atau `undefined`, proses akan dihentikan dan _return_ sebagai `undefined`

Implementasi di JavaScript

```js
const x = foo === null || foo === undefined ? undefined : foo.bar.baz()
```

Untuk memanggil fungsi dengan optional chaining

```ts
foo?.baz?.()
```

Untuk memanggil element dengan index tertentu
```ts
foo?.[0]
```

### Nullish Coalescing

Nullish coalescing (`??`) adalah operator yang biasa digunakan untuk menambahkan default value, jika value yang dikehendaki tidak memiliki nilai. Perbedaan dengan operator or (`||`), operator `??` hanya memvalidasi apakah sebuah nilai tidak `null` atau tidak `undefined`, dan menganggap bahwa `""`, `0`, `NaN` adalah value yang sah.

```ts
const x = 0 || "Empty" // Empty

const y = 0 ?? "Empty" // 0
```

```ts
const x = "" || "Empty" // Empty

const y = "" ?? "Empty" //  (Empty string)
```

### Read Only Type

Sebuah object dengan _read only_ keyword membuat object tersebut tidak dapat diubah nilainya setelah object tersebut dibuat

```ts
interface Article {
    title: string
    body: string
}

const article: Readonly<Article> = {
    title: "Belajar TypeScript",
    body: "Body"
}

article.title = "Belajar Lagi" // Cannot assign to 'title' because it is a read-only property.
article.body = "Belajar TypeScript menyenangkan" // Cannot assign to 'body' because it is a read-only property.
```

```ts
interface Article {
    readonly title: string
    body: string
}

const article: Article = {
    title: "Belajar TypeScript",
    body: "Body"
}

article.title = "Belajar Lagi" // Cannot assign to 'title' because it is a read-only property.
article.body = "Belajar TypeScript menyenangkan"
```

# SAATNYA TUGAS

- Buatlah aplikasi `To Do List` dengan TypeScript, dengan spesifikasi:
  - minimal 2 buah model dengan `class` dan memiliki inheritance
  - 1 buah controller dengan implementasi abstraction menggunakan `implements` ke suatu `interface` atau `type`