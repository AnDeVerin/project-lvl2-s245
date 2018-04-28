Каждый элемент - объект, со следующими свойствами:
```
name:
  <>

type:
  - object
  - value

status:
  = unchanged
  - deleted
  + added

children:
  []

value:
  <>
```

Проверка условий:

1. inObj1 && inObj2 && obj1 && obj2
2. inObj1 && inObj2 && obj1 && val2
3. inObj1 && inObj2 && val1 && obj2
4. inObj1 && inObj2 && val1 === val2
5. inObj1 && inObj2 && val1 !== val2

6. inObj1 - 
7. inObj2 +
