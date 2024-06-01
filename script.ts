//Разминка

// Интерфейс User с добавленным свойством email
interface User {
    id: number;
    name: string;
    email: string; // Добавлено свойство email
  }
  
  // Интерфейс Activity с добавленным свойством timestamp
  interface Activity {
    userId: number;
    activity: string;
    timestamp: Date; // Добавлено свойство timestamp
  }
  
  // Функция для получения данных с использованием дженерика
  async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  // Частичная и только для чтения версии интерфейсов User и Activity с использованием Utility Types
  type PartialUser = Partial<User>;
  type ReadonlyActivity = Readonly<Activity>;
  
  // Функция для получения активностей пользователя с типизированным параметром userId
  async function getUserActivities(userId: number): Promise<Activity[]> {
    return fetchData<Activity[]>(`/api/activities/${userId}`);
  }
  
  // Используем ReturnType для создания типа возвращаемого значения функции getUserActivities
  type ActivitiesReturnType = ReturnType<typeof getUserActivities>;
  
  // Определяем права доступа с использованием условных типов
  type AdminPermissions = { canBanUser: boolean };
  type BasicPermissions = { canEditProfile: boolean };
  
  // Тип UserPermissions выбирает права доступа на основе переданного дженерика T
  type UserPermissions<T> = T extends 'admin' ? AdminPermissions : BasicPermissions;
  
  // Примеры использования типа UserPermissions
  type UserAdminPermissions = UserPermissions<'admin'>; // { canBanUser: boolean }
  type UserBasicPermissions = UserPermissions<'user'>; // { canEditProfile: boolean }
  
  // Пример использования функции fetchData
  async function exampleUsage() {
    const users: User[] = await fetchData<User[]>('/api/users');
    console.log(users);
    
    const activities = await getUserActivities(1);
    console.log(activities);
  }


  // 1 задание

  // Определите Type Alias для Union типа String или Number
type StringOrNumber = string | number;

// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message: StringOrNumber): void {
  console.log(message);
}

// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
  return typeof value === 'string';
}

// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Value is not a number');
  }
}

// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber) {
  if (isString(value)) {
    console.log(`String value: ${value.toUpperCase()}`);
  } else {
    assertIsNumber(value);
    console.log(`Number value: ${value.toFixed(2)}`);
  }
}

// Примеры использования
logMessage("Hello, World!");
logMessage(123.45);

try {
  processValue("Hello");
  processValue(123.456);
} catch (error) {
  console.error(error);
}


// 2 задание

// Определите Generic интерфейс secondResponse с одним параметром типа T и свойством status типа number
interface secondResponse<T> {
    data: T;
    status: number;
  }
  
  // Реализуйте и типизируйте функцию, которая возвращает объект secondResponse для переданных данных
  function createSecondResponse<T>(data: T, status: number): secondResponse<T> {
    return {
      data: data,
      status: status
    };
  }
  
  // Используйте функцию createSecondResponse для создания ответа с массивом чисел
  const numericResponse = createSecondResponse([1, 2, 3, 4, 5], 200);
  
  // Используйте функцию createApiResponse для создания ответа с объектом пользователя (User)
  const userResponse = createSecondResponse({ id: 1, name: 'Полина', email: 'shtva@mail.ru' }, 200);
  
  // Пример вывода результатов в консоль
  console.log(numericResponse); // { data: [1, 2, 3, 4, 5], status: 200 }
  console.log(userResponse); // { data: { id: 1, name: 'Полина', email: 'shtva@mail.ru' }, status: 200 }
  

// 3 задание

// Определите тип данных для описания автомобиля
type Car = {
    company: string;
    model: string;
    year: number;
  };
  
  // Определите тип данных для описания велосипеда
  type Bike = {
    company: string;
    type: 'road' | 'mountain';
  };
  
  // Создайте Type Guard для проверки, является ли объект автомобилем
  function isCar(vehicle: Car | Bike): vehicle is Car {
    return (vehicle as Car).model !== undefined && (vehicle as Car).year !== undefined;
  }
  
  // Используйте Type Guard в функции, которая печатает информацию о транспорте
  function printVehicleInfo(vehicle: Car | Bike) {
    if (isCar(vehicle)) {
      console.log(`Car: ${vehicle.company} ${vehicle.model} ${vehicle.year}`);
    } else {
      console.log(`Bike: ${vehicle.company} ${vehicle.type}`);
    }
  }
  
  // Примеры использования
  const myCar: Car = { company: 'Toyota', model: 'Camry', year: 2020 };
  const myBike: Bike = { company: 'Trek', type: 'mountain' };
  
  printVehicleInfo(myCar); // Car: Toyota Camry 2020
  printVehicleInfo(myBike); // Bike: Trek mountain

  
// 4 задание

// Определение интерфейса Employee
interface Employee {
    id: number;
    name: string;
    department: string;
    email: string;
  }
  
  // Использование Utility Type для создания типа, который делает все свойства Employee опциональными
  type PartialEmployee = Partial<Employee>;
  
  // Использование Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
  type ReadonlyEmployee = Readonly<Employee>;
  
  // Создание функции, которая принимает PartialEmployee и выводит информацию о сотруднике
  function printEmployeeInfo(employee: PartialEmployee) {
    // Реализация логики функции, обрабатывающая случай отсутствующих свойств
    console.log("Информация об сотруднике:");
    console.log("Идентификатор:", employee.id);
    console.log("Имя:", employee.name);
    console.log("Отдел:", employee.department);
    console.log("Почта:", employee.email);
  }
  
  // Пример использования
  const employeeData: PartialEmployee = { id: 1, name: "Полина" };
  printEmployeeInfo(employeeData);
  

  // 5 задание

  // Определение интерфейса для пользователя
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }
  
  // Использование Indexed Access Types для получения типа поля name из User
  type UserNameType = User['name'];
  
  // Создание Mapped Type, который преобразует все поля интерфейса User в boolean
  type UserFieldsToBoolean = {
    [K in keyof User]: boolean;
  }
  
  // Реализация функции, которая принимает ключи интерфейса User и возвращает их типы
  function getUserFieldType<K extends keyof User>(key: K): User[K] {
    // Возвращение типа ключа
    return null as any; // Здесь null используется для демонстрации. Фактическое значение не имеет значения.
  }
  
  // Использование этой функции для получения типа поля 'age' и 'name'
  const ageType = getUserFieldType('age'); // Тип: number
  const nameType = getUserFieldType('name'); // Тип: string

  
  // 6 задание

  // Создание базового интерфейса для сущностей с идентификатором
interface Identifiable {
    id: number;
  }
  
  // Типизация функции, которая принимает массив объектов с ограничением Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
  function findById<T extends Identifiable>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
  }
  
  // Использование этой функции для поиска пользователя по id в массиве пользователей
  const users_1: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
  ];
  const user = findById(users_1, 1);

  
// 7 задание

// Объявление типов для данных
interface User1 {
    id: number;
    name: string;
    age: number;
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  interface Book {
    isbn: string;
    title: string;
    author: string;
  }
  
  // Обновленная функция findInArray, позволяющая искать по нескольким ключам одновременно
  function findInArray<T>(items: T[], searchCriteria: Partial<T>): T | undefined {
    // Проверяем, что items и searchCriteria переданы
    if (!items || !searchCriteria) {
      return undefined;
    }
  
    return items.find(item => {
      // Проверяем, соответствуют ли все переданные ключи и значения
      return Object.entries(searchCriteria).every(([key, value]) => item[key as keyof T] === value);
    });
  }
  
  // Данные для тестирования функции
  const users: User1[] = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
  ];
  
  const products: Product[] = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphone", price: 500 }
  ];
  
  const books: Book[] = [
    { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
    { isbn: "67890", title: "Learning TypeScript", author: "Another One" }
  ];
  
  // Тестирование функции
  
  // 1. Найдите пользователя по имени "Alice".
  const foundUser = findInArray(users, { name: "Alice" });
  
  // 2. Найдите продукт с ценой 500.
  const foundProduct = findInArray(products, { price: 500 });
  
  // 3. Найдите книгу по автору "Another One".
  const foundBook = findInArray(books, { author: "Another One" });
  
  // Пример использования функции для поиска по нескольким ключам одновременно
  const foundProductByNameAndPrice = findInArray(products, { name: "Laptop", price: 1000 });
  

  //8 задание 

  interface Person {
    name: string;
    age: number;
  }
  
  interface Adult {
    fullName: string;
    age: number;
  }
  
  // Обобщённая функция mapAndFilter
  function mapAndFilter<T, U>(items: T[], transform: (item: T) => U, filter: (item: U) => boolean): U[] {
    // Применяем функцию преобразования ко всем элементам входного массива
    const transformedItems = items.map(transform);
    
    // Фильтруем преобразованные элементы
    return transformedItems.filter(filter);
  }
  
  // Пример данных
  const people: Person[] = [
    { name: "Alice", age: 24 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 32 }
  ];
  
  // Пример использования функции mapAndFilter
  const adults: Adult[] = mapAndFilter(
    people,
    (person) => ({ fullName: person.name, age: person.age }),
    (adult) => adult.age >= 18
  );
  
  // Вывод результатов
  console.log(adults);
  