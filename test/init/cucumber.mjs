import { configure } from "../../build/config/index.js";

// you can set most of the cucumber config props from here, leave some that are restricted.
export default configure({
  baseURL: "https://the-internet.herokuapp.com/",
  parallel: 5
});
