(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

const singup = async (email,password,passwordConfirm,firstname,lastname,age,address,zipcode,phone) => {
    console.log(email,password,passwordConfirm,firstname,lastname,age,address,zipcode,phone);
     try{
         const res = await axios({
             method: 'POST',
             url: 'http://127.0.0.1:3000/api/users',
             data: {
                email,password,passwordConfirm,firstname,lastname,age,address,zipcode,phone
                 
             }
         });
         console.log(res);
         window.location.assign('/')
     }catch(err){
      alert(err.response.data.data);
         console.log(err);
     }
}

document.querySelector('.form-singup').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const zipcode = document.getElementById('zipcode').value;
    const phone = document.getElementById('phone').value;
    singup(email,password,passwordConfirm,firstname,lastname,age,address,zipcode,phone)

})