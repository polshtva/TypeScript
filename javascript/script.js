"use strict";
//Разминка
// Функция для получения данных с использованием дженерика
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
// Функция для получения активностей пользователя с типизированным параметром userId
async function getUserActivities(userId) {
    return fetchData(`/api/activities/${userId}`);
}
// Пример использования функции fetchData
async function exampleUsage() {
    const users = await fetchData('/api/users');
    console.log(users);
    const activities = await getUserActivities(1);
    console.log(activities);
}
// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message) {
    console.log(message);
}
// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg) {
    throw new Error(errorMsg);
}
// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value) {
    return typeof value === 'string';
}
// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value) {
    if (typeof value !== 'number') {
        throw new Error('Value is not a number');
    }
}
// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value) {
    if (isString(value)) {
        console.log(`String value: ${value.toUpperCase()}`);
    }
    else {
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
}
catch (error) {
    console.error(error);
}
// Реализуйте и типизируйте функцию, которая возвращает объект secondResponse для переданных данных
function createSecondResponse(data, status) {
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
// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle) {
    return vehicle.model !== undefined && vehicle.year !== undefined;
}
// Используйте Type Guard в функции, которая печатает информацию о транспорте
function printVehicleInfo(vehicle) {
    if (isCar(vehicle)) {
        console.log(`Car: ${vehicle.company} ${vehicle.model} ${vehicle.year}`);
    }
    else {
        console.log(`Bike: ${vehicle.company} ${vehicle.type}`);
    }
}
// Примеры использования
const myCar = { company: 'Toyota', model: 'Camry', year: 2020 };
const myBike = { company: 'Trek', type: 'mountain' };
printVehicleInfo(myCar); // Car: Toyota Camry 2020
printVehicleInfo(myBike); // Bike: Trek mountain
// Создание функции, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee) {
    // Реализация логики функции, обрабатывающая случай отсутствующих свойств
    console.log("Информация об сотруднике:");
    console.log("Идентификатор:", employee.id);
    console.log("Имя:", employee.name);
    console.log("Отдел:", employee.department);
    console.log("Почта:", employee.email);
}
// Пример использования
const employeeData = { id: 1, name: "Полина" };
printEmployeeInfo(employeeData);
// Реализация функции, которая принимает ключи интерфейса User и возвращает их типы
function getUserFieldType(key) {
    // Возвращение типа ключа
    return null; // Здесь null используется для демонстрации. Фактическое значение не имеет значения.
}
// Использование этой функции для получения типа поля 'age' и 'name'
const ageType = getUserFieldType('age'); // Тип: number
const nameType = getUserFieldType('name'); // Тип: string
// Типизация функции, которая принимает массив объектов с ограничением Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
function findById(items, id) {
    return items.find(item => item.id === id);
}
// Использование этой функции для поиска пользователя по id в массиве пользователей
const users_1 = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
];
const user = findById(users_1, 1);
// Обновленная функция findInArray, позволяющая искать по нескольким ключам одновременно
function findInArray(items, searchCriteria) {
    // Проверяем, что items и searchCriteria переданы
    if (!items || !searchCriteria) {
        return undefined;
    }
    return items.find(item => {
        // Проверяем, соответствуют ли все переданные ключи и значения
        return Object.entries(searchCriteria).every(([key, value]) => item[key] === value);
    });
}
// Данные для тестирования функции
const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
];
const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphone", price: 500 }
];
const books = [
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
// Обобщённая функция mapAndFilter
function mapAndFilter(items, transform, filter) {
    // Применяем функцию преобразования ко всем элементам входного массива
    const transformedItems = items.map(transform);
    // Фильтруем преобразованные элементы
    return transformedItems.filter(filter);
}
// Пример данных
const people = [
    { name: "Alice", age: 24 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 32 }
];
// Пример использования функции mapAndFilter
const adults = mapAndFilter(people, (person) => ({ fullName: person.name, age: person.age }), (adult) => adult.age >= 18);
// Вывод результатов для проверки
console.log(adults);
//# sourceMappingURL=script.js.map