const array = [1, 2, 3];
const y = (...args) => array.map((value, index) => value * args[index]);

y(2, 4, 5); // 2 8 15
