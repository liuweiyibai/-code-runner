function asyncRunner(g: () => Generator) {
  console.log("初始化 generator");
  const it = g();
  let interationCounter = 0;
  let errorFlag = false;
  (function interate(value: unknown): void {
    let yielded: IteratorResult<unknown>;
    if (errorFlag) {
      yielded = it.throw(value);
      errorFlag = false;
    } else {
      yielded = it.next(value);
    }
    console.log("interation start", interationCounter);
    interationCounter++;
    const startTime = Date.now();
    if (yielded.done) {
      console.log(`结束 generator`);
      return;
    }
    const promise: Promise<unknown> = Promise.resolve(yielded.value);
    promise
      .then((value) => {
        const elapsedTime = Date.now() - startTime;
        console.log(`promise resolved :( ${elapsedTime} ms`);
        interate(value);
      })
      .catch((err) => {
        const elapsedTime = Date.now() - startTime;
        console.log(`promise rejected :( ${elapsedTime} ms`);
        errorFlag = true;
        interate(err);
      });
  })(undefined);
}
const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));
function* testG(): Generator<Promise<any>> {
  // await 被编译成了 yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}

const resp = asyncRunner(testG);
console.log(resp);
