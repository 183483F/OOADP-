const Express = require("express");

const App = Express()

App.get("/",(pRequest, pResponse) => {
    pResponse.send("asd");
});

App.listen(5000, () => {
    console.log("Sever listening at port 5000");
});