
function displayRes(results, keys) {
  let colStr = "";
  let formStr = "";
  let dash = "-";
  for (const x of keys) {
    colStr += ` | ${x}`;
    formStr += "-+-"+dash.repeat(x.length);
  };
  console.log(`\n`+formStr);
  console.log(colStr);
  console.log(formStr);

  let logStr = "\n";

  results.forEach(result => {
    const objArr = Object.values(result);
    console.log(objArr);
 
  });
  // console.log(logStr);

  // console.log(result);
  // console.log(result[0].id);
  // console.log(keys[0]);
  // console.log(`${result[0]}.${keys[0]}`);
  // console.log(`result[0].${keys[0]}`);
  // console.log(keys);
};
  
module.exports = displayRes;