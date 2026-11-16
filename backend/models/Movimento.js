const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Movimento = db.define('Movimento',{
    codMovimento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo:{
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    idMaterial:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codMaterial',
            model: 'materiais'
        }
    },
},{
    timestamps: false,
    tableName: 'movimentos'
})

module.exports = Movimento