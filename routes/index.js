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
  res.render('new', {title:"Cadastro de Cliente", action:"/new"});
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

module.exports = router;
