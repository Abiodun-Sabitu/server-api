const path = require("path");
const fs = require("fs");

const homePagePath = path.join(__dirname, "/pages/index.html");
const errorPagePath = path.join(__dirname, "/pages/404.html");
const itemsFilePath = path.join(__dirname, "/catalogue/items.json");

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
  console.log(JSON.parse(await allItems));
  return JSON.parse(await allItems);
};

//Auto generate ID
const generateId = async () => {
  const allItems = await getAllItems();
  const itemId = allItems.reduce((maxIDSoFar, currentItem) => {
    if (currentItem.id > maxIDSoFar) {
      return currentItem.id;
    } else {
      return maxIDSoFar;
    }
  }, 0);
  //console.log(itemId + 1);
  return itemId + 1;
};

//reusable stand alone write into file func
function updateCatalogue(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(itemsFilePath, data, (err) => {
      if (err) {
        console.log(`operation not successful: catalogue wasn't updated`);
        return reject(err);
      }
      console.log(`operation successful: catalogue has been refreshed!`);
      resolve(getAllItems());
    });
  });
}


//create Item
const createItem = async (item) => {
  const itemId = await generateId();
  let existingItems = await getAllItems();
  const itemToAdd = { ...item, id:itemId };
  console.log("ffff",itemToAdd);
 existingItems.push(itemToAdd);
  console.log(existingItems);
  return updateCatalogue(JSON.stringify(existingItems));
};



//getAllItems()
//generateId();
//createItem({ id: 10, name: "Sweet Potato", price: 900, size: "m" });

module.exports = {
  loadHomePage,
  loadErrorPage,
};
