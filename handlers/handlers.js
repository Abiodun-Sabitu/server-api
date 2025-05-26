const {
  loadHomePage,
  loadErrorPage,
  createItem,
  getAllItems,
  getOneItem,
  deleteItem,
} = require("./../utils");

const handleLoadHomePage = async (res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(await loadHomePage());
};

const handleLoadErrorPage = async (res) => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(await loadErrorPage());
};

const handleGetAllItems = async (res) => {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await getAllItems()));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const handleCreateItem = async (req, res) => {
  
  let receivedData = "";
  req.on("data", (chunk) => {
    receivedData += chunk.toString();
  });
  req.on("end", async () => {
    try {
      const data = JSON.parse(receivedData);
      if (!data || Object.keys(data).length === 0) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "Bad request: cannot add empty item" })
        );
        return;
      }
      const updatedCatalogue = await createItem(data);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "item created successfully",
          items: updatedCatalogue,
        })
      );
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
};

const handleGetOneItem = async (res, id) => {
  try {
    const item = await getOneItem(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(item));
  } catch (error) {
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    } else {
      console.error('Headers already sent. Cannot send error response.');
    }
  }
};


const handleDeleteItem = async (res, id)=>{
 try {
    const item = await deleteItem(id)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: `item ${id} deleted successfully`,
      items:item
    }));
  } catch (error) {
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    } else {
      console.error('Headers already sent. Cannot send error response.');
    }
  }

}



module.exports = {
  handleLoadHomePage,
  handleLoadErrorPage,
  handleCreateItem,
  handleGetAllItems,
  handleGetOneItem,
  handleDeleteItem
};
