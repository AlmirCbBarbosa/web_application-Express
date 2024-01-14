var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res)=>{
  try{
    const results = await global.db.selectClientes();
    console.log(results);
    res.render('index',{results});
  }
  catch(error){
    res.redirect('/?erro=' + error);
  }
});

/*GET new page*/
router.get('/new', (req, res, next)=>{
  res.render('new', {title:"Cadastro de Cliente", result:{}, action:"/new"});
});

/*GET edit page. */
router.get('/edit/:id', async (req, res)=>{
  const id = parseInt(req.params.id);

  try{
    const result = await global.db.selectCliente(id);
    res.render('new', {title:'Edição de Cliente', result, action: '/edit/'+ id});
  }
  catch{

  }
});


/*POST new page. */
router.post('/new', async (req, res)=>{
  const nome = req.body.nome;
  const idade = !req.body.idade? null :parseInt(req.body.idade);
  const uf = req.body.uf
  
  try{
    await global.db.insertCliente({nome,idade,uf});
    res.redirect('/?new=true');
  }
  catch(error){
    res.redirect('/?erro=' + error);
  }
});

/*POST edit page */
router.post('/edit/:id', async (req, res)=>{
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const idade = !req.body.idade? null: parseInt(req.body.idade);
  const uf = req.body.uf;

  try{
    await global.db.updateCliente(id,{nome, idade, uf});
    res.redirect('/?edit=true');
  }
  catch(error){
    res.redirect('/?erro=' + error);
  }
});

module.exports = router;
