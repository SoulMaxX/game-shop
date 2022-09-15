
const login = async (email,password) => {
   console.log(email,password);
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/users/login',
            data: {
                email,
                password
                
            }
        });
        console.log(res);
        if(res.data.status == 'success'){
            alert('Logged in successfully')           
            window.location.assign('/')
        }
    }catch(err){

        // document.querySelector('body').insertAdjacentHTML('afterbegin',
        // `<div class="alert alert-danger">${err.response.data.message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div> `)

        alert(err.response.data.message);
        console.log((err.response))
    }
}

document.querySelector('.form-login').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password);
})