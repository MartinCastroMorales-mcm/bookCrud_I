import sqlHelper from "./sqlHelper.js"

const instance = new sqlHelper();
let result = await instance.readBooks()
console.log(result);