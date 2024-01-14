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

/*==================Listando os Clientes===================*/
async function selectClientes(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT *FROM clientes;');
    return rows;

};

/*=================Cadastrando Novos Clientes==============*/
async function insertCliente(cliente){
    const conn = await connect();
    const sql = "INSERT INTO clientes(nome, idade, uf) VALUE (?, ?, ?);";
    return await conn.query(sql,[cliente.nome, cliente.idade, cliente.uf]);

}


module.exports = {selectClientes, insertCliente};