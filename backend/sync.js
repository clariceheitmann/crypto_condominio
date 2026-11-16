const {Funcionario, Condominio, Material, Movimento} = require('./models/rel')
const conn = require('./db/conn')

async function asyncDataBase(){

    try{
        await conn.sync({force: true})
        console.log('Tabelas criadas e sincronizadas!')
    }catch(err){
        console.error('Erro ao criar e sincronizar tabelas!',err)
    }finally{
        await conn.close()
        console.log('Fechando conexão com o BD!')
    }
}

asyncDataBase()