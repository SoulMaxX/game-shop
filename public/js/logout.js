const logout = async () => {
    try {
        const res = await axios({
            mathod: 'GET',
            url: 'http://127.0.0.1:3000/api/users/logout'
        });
        if (res.data.status = 'success') location.reload(true);
    } catch (err) {
        showAlert('error', 'Error logout try again.')
    }
}

document.querySelector('.form-logout').addEventListener('click',logout)