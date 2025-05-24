const path = require("path");
const fs = require("fs");

const homePagePath = path.join(__dirname, "/pages/index.html");
const errorPagePath = path.join(__dirname, "/pages/404.html");
const itemsFilePath = path.join(__dirname, "/catalogue/items.js");


//Load Home Page
const loadHomePage = () => {
  const content = new Promise((resolve, reject) => {
    fs.readFile(homePagePath, "utf-8", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
  return content;
};


// Load Error Page
const loadErrorPage = () => {
  const errorPage = new Promise((resolve, reject) => {
    fs.readFile(errorPagePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(data);
    });
  });

  return errorPage;
};


// Get All Items
const getAllItems = async () => {
  const allItems = new Promise((resolve, reject) => {
    fs.readFile(itemsFilePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  //console.log(JSON.parse(await allItems));
  return JSON.parse(await allItems);
};


//Auto generate ID
const generateId = async () => {
  const allItems = await getAllItems();
  const itemId = allItems.reduce((maxIDSoFar, currentItem)=>{
    if(currentItem.id > maxIDSoFar){
        return currentItem.id
    }else{
        return maxIDSoFar
    }
  }, 0)
console.log(itemId + 1)
  return itemId + 1
};

/* const createItem = (data) => {
  fs.writeFile(itemsFilePath, data, () => {});
}; */

//getAllItems()
generateId();

module.exports = {
  loadHomePage,
  loadErrorPage,
};
