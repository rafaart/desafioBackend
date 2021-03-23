const express = require('express')
const rotas = express.Router()
const Inscrito = require('../modelos/inscrito')

//pegar todos
rotas.get('/', async (req, res) => {
    try{
        const inscritos = await Inscrito.find()
        res.json(inscritos)
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})
//pegar um
rotas.get('/:id', pegarInscrito, (req, res) => {
    res.json(res.inscrito.nome)
})
//colocar um
rotas.post('/', async (req,res) => {
    const inscrito = new Inscrito({
        nome: req.body.nome,
        inscritoNoCanal: req.body.inscritoNoCanal
    })
    try{
        const novoInscrito = await inscrito.save()
        res.status(201).json(novoInscrito)
    } catch (err){
        res.status(400).json({ message: err.message})
    }

})
//atualizar um
rotas.patch('/:id', pegarInscrito, async (req,res) => {
    if(req.body.nome != null){
        res.inscrito.nome = req.body.nome
    }
    if(req.body.inscritoNoCanal != null){
        res.inscrito.inscritoNoCanal = req.body.inscritoNoCanal
    }
    try{
        const inscritoAtualizado = await res.inscrito.save()
        res.json(inscritoAtualizado)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})
//deletar um
rotas.delete('/:id', pegarInscrito, async (req,res) => {
    try{
        await res.inscrito.remove()
        res.json({message: "inscrito deletado"})
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

//midleware
async function pegarInscrito(req, res, next) {
    let inscrito
    try{
        inscrito = await Inscrito.findById(req.params.id)
        if (inscrito == null){
            return res.status(404).json({message: "inscrito não foi encontrado"})
        }
    }catch {
        return res.status(500).json({message: err.message})
    }
    res.inscrito = inscrito
    next()
}


module.exports = rotas