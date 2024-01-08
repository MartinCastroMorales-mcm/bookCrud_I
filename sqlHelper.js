import mariadb from "mariadb"
  
export default class sqlHelper {
    pool;
    constructor() {
        this.pool = mariadb.createPool({
            host: '127.0.0.1', //localhost does not work. this does work why?
            user: 'martin',
            password: '1234',
            connectionLimit: 5,
            database: "m_bookstore"
        });
    }
    async sqlCall(query) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            const rows = await conn.query(query);
            //console.log("rows: ");
            //console.log(rows)
            return rows;
        } catch (err) {
            throw err;
        }
    }

    async createBook(book) {
        const query = "INSERT INTO books "
            + "(nombre, autor, precio) "
            + "VALUES (" + book.nombre + "," + book.autor + "," + book.precio + ");";
        this.sqlCall(query);
    }
    async readBooks() {
        //console.log("test")
        const query = "SELECT * FROM books;"
        let result = await this.sqlCall(query);
        //console.log("readBooks: ");
        //console.log(result)
        return result;
    }
    async updateBook(book) {
        const query = "UPDATE books\n"
            + "SET title = " + book.title + "\n"
            + "author_id = " + book.author_id + "\n"
            + "year_pub = " + book.year_pub + "\n"
            + "WHERE isbn = " + book.isbn + ";"//do a formal model and clean these queries
        sqlCall(query)
    }
    async deleteBook(book) {
        const query = "DELETE FROM book \n"
            + "isbn = " + book.isbn + ";"
        sqlCall(query);
    }
}
