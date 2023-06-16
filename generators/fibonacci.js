function* fibonacci(limit) {
  //f(n) = f(n-1) + f(n-2)
  let f1 = 1;
  let f2 = 1;
  while (limit ? f1 < limit : true) {
    yield f1;
    const temp = f1;
    f1 = f2;
    f2 = temp + f2;
  }
}

// const fib = fibonacci();
// const fib20 = fibonacci(20);

module.exports = {
  fibonacci,
};
