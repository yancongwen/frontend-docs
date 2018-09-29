# lodash.js
?> londash 是一个 JavaScript 的实用工具库，但是其方法实在是太多了，这里记录一下工作中使用到的一些实用方法，以便查阅。

## Object
- **\_.omit**  
`_.omit(object, [props])`   
这个方法返回忽略属性之外的自身和继承的可枚举属性。

## Lang
- **\_.clone**    
`_.clone(value)`    
浅拷贝，即只复制第一层
```javascript
var objects = [{ 'a': 1 }, { 'b': 2 }]; 
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true
console.log(shallow === objects);
// => false
```

- **\_.clobeDeep**   
`_.cloneDeep(value)`    
深拷贝，递归地拷贝一个对象
```javascript
var objects = [{ 'a': 1 }, { 'b': 2 }];
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
console.log(deep === objects);
// => false
```

- **\_.cloneWith**   
`_.cloneWith(value, [customizer])`  
带自定义操作的浅拷贝
```javascript
function customizer(value) {
  if (_.isElement(value)) {
    return value.cloneNode(false);
  }
} 
var el = _.cloneWith(document.body, customizer); 
console.log(el === document.body);
// => false
console.log(el.nodeName);
// => 'BODY'
console.log(el.childNodes.length);
// => 0
```

- **\_.cloneDeepWith**   
`_.cloneDeepWith(value, [customizer])`  
带自定义操作的深拷贝  
```javascript
function customizer(value) {
  if (_.isElement(value)) {
    return value.cloneNode(true);
  }
} 
var el = _.cloneDeepWith(document.body, customizer); 
console.log(el === document.body);
// => false
console.log(el.nodeName);
// => 'BODY'
console.log(el.childNodes.length);
// => 20
```
