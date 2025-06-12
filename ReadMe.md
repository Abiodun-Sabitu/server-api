# NodeJS Assignment  
## Servers and APIs

### Part 1: Simple Web Server (No Framework)

Without using a framework, build a web server to render HTML files:

- When I navigate to `/index.html`, I should see a simple webpage of the student. (Nothing fancy)
- Add another feature such that when I navigate to `{random}.html` it should return a 404 page.

---

### Part 2: API Server for Inventory Management (No Framework)

Without using a framework, build an API server to manage inventory information.

The API should be able to:

- Create item  
- Get all items  
- Get one item  
- Update item  
- Delete item  

#### Item Attributes

- Name  
- Price  
- Size: small (`s`), medium (`m`) or large (`l`)  
- Id  

---

### Things to Note:

- Return data structure should be consistent among the APIs  
- Ensure code is modular  
- Handle errors where possible  
- No need to use a database, use file system to persist data (e.g., `items.json`)
