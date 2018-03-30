const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('🌈');
    reject('🌧️');
  }, 5000);
});

console.log('Loading...');

promise.then((data) => {
  console.log('1', data);
}).catch((error) => {
  console.log('error', error);
});
