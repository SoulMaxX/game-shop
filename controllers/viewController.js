const Item = require("../models/itemModel");

exports.getHome = (req, res) => {
    res.status(200).render('base', {
        title: 'Game Shop'
    });
};

exports.getLogin = (req, res) => {
    res.status(200).render('login',{
        title: 'Login'
    })
}

exports.getSingup = (req, res) => {
    res.status(200).render('singupForm',{
        title: 'Singup'
    })
}

exports.getConsole = async(req,res) => {
    const items = await Item.find({type: "Console"});

    res.status(200).render('console',{
        title: 'Console',
        items
    })
}
exports.getGame = async(req,res) => {
    const items = await Item.find({type: "Game"});

    res.status(200).render('game',{
        title: 'Game',
        items
    })
}
exports.getAccessory = async(req,res) => {
    const items = await Item.find({type: "Accessory"});

    res.status(200).render('accessory',{
        title: 'Accessory',
        items
    })
}

exports.getCart= async(req,res)=> {

    res.status(200).render('cart',{
        title: 'Cart'
    })
}