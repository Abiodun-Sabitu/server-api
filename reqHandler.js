const {
  handleLoadHomePage,
  handleLoadErrorPage,
  handleCreateItem,
  handleGetAllItems,
  handleGetOneItem,
  handleDeleteItem
} = require("./handlers/handlers");

const extractId = require("./helper");

const reqHandler = (req, res) => {
    try {
  const url = req.url;
  const method = req.method;

  if (url === "/index.html" && method === "GET") {
    handleLoadHomePage(res);
    return;
  }

  if (url === "/items" && method === "POST") {
    handleCreateItem(req, res);
    return;
  }

  if (url === "/items" && method === "GET") {
    handleGetAllItems(res);
    return;
  }

  const id = extractId(url);

  if (id !== null) {
    if (method === "GET") {
      handleGetOneItem(res, id);
    } else if (method === "DELETE") {
      handleDeleteItem(res, id);
    } /* else if (method === "PUT" || method === "PATCH") {
      handleUpdateItem(req, res, id);
    } */
     else {
      handleLoadErrorPage(res);
    }
  } else {
    handleLoadErrorPage(res);
  }
} catch (error) {
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end(error.message);
}
//   try {
//     if (req.url === "/index.html" && req.method === "GET") {
//       handleLoadHomePage(res);
//     } else if (req.url === "/items" && req.method === "POST") {
//       handleCreateItem(req, res);
//     } else if (req.url === "/items" && req.method === "GET") {
//       handleGetAllItems(res);
//     } else if (req.method === "GET") {
//       const id = extractId(req.url);
//       if (id !== null) {
//         handleGetOneItem(req, res, id);
//       } else {
//         handleLoadErrorPage(res);
//       }
//     } else {
//       handleLoadErrorPage(res);
//     }
//   } catch (error) {
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end(error.message);
//   }
};

module.exports = reqHandler;
