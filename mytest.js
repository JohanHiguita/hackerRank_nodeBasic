const OrderProcessor = require('./processor');

const op = new OrderProcessor();

op.on("greet", ()=> console.log("hello"));
op.emit("greet");





