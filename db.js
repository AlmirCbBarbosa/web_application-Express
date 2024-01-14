const mysql = require('mysql2/promise');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    };

    //fazendo a conexão
    const connection = await mysql.createConnection({//verifica se ja esta connectado ao banco de dados
        host:'localhost',
        port:'3306',
        user:'root',
        password:'BarbosaCB@1583699',
        database: 'crud',
    });

    console.log('Conectou no MySQL');
    global.connection = connection;
    return global.connection;
};

connect();

/*==================Listando todos os Clientes===================*/
async function selectClientes(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT *FROM clientes;');
    return rows;

};

/*==================Localizando um Cliente específico==============*/
async function selectCliente(id){
    const conn = await connect();
    const sql = "SELECT *FROM clientes WHERE id=?;";
    const[rows] = await conn.query(sql, [id]);

    return rows && rows.length > 0 ? rows[0] : {};
}


/*=================Cadastrando Novos Clientes==============*/
async function insertCliente(cliente){
    const conn = await connect();
    const sql = "INSERT INTO clientes(nome, idade, uf) VALUE (?, ?, ?);";
    return await conn.query(sql,[cliente.nome, cliente.idade, cliente.uf]);
}

/*==================Atualizando Cliente==================*/
async function updateCliente(id, cliente){
    const conn = await connect();
    const sql = "UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?;";

    return await conn.query(sql, [cliente.nome, cliente.idade, cliente.uf, id])
}


module.exports = {selectClientes, selectCliente, insertCliente, updateCliente};