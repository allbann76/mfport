# Utils

## usy

Необходимо реализовать следующиие возможности шаблонизатора `usy`:

### 1.Импорт данных


Импортирует данные по-умолчанию в шаблон. Например, даны два файла:

```js
// file: data.json :
{
    "message": "Some default message"
}

// file: a.tpl
#import "./data.json"
Hello, ${name}!
This is message for you: ${message}
```

Данные из файла data.json импортируются внутрь шаблона с помощью ключевого слова: `#import`,

```js
let tpl = fs.readFileSync('./a.tpl');

usy(tpl, {
    name: 'Joe'
});

// результат: 

Hello, Joe!
This is message for you: Some default message'
```

### 2.Значения по-умолчанию

Синтаксис значений по умолчанию: 

```js
let text = 'Look this: ${name ||Some default value}';

usy(test, {}); 

// результат: 

Look this: Some default value
```

### 3.Импорт шаблонов: 

С помощью ключевого слова `#import` можно импортировать другие шаблоны, притом, если в них тоже есть импорты, то их нужно импортировать тоже. Допустим помимо `a.tpl` и `data.json` есть еще один файл: 

```js
// file: b.tpl
#import "./a.tpl"

Hey, hey! ${some}
```

Результат вызова `usy(bTpl, {some: 'test', name: 'Joe'})` будет такой: 

```
Hello, Joe!
This is message for you: Some default message'

Hey, hey! test
```

### 4. Типизация 

Нужно реализовать типизацию данных в передаче аргументов функциям: 

```js
const text = 'Here: ${name: 15, "string", true}';

usy(text, {
    here: function (intValue, stringValue, boolValue) {
        /* 
         * intValue - число
         * stringValue - строка
         * boolValue - boolean
         */
    }
});
```
По-умолчанию, если привести тип не получается - то это строка, например в `${name: doodoo}` - в функцию будет передан `"doodoo"`
