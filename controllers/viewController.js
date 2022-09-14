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

