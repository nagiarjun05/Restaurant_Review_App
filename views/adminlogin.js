const userEmail=document.getElementById("user-email");
const passWord=document.getElementById("password");
const login=document.getElementById("login");
const back=document.getElementById('back');

login.addEventListener('click',async (e)=>{
    try{
        e.preventDefault();
        const  email=userEmail.value;
        const  password=passWord.value;

        if (!email||!password){
            return alert("All fields are mandatory!")
        }
        const res= await axios({
            method:'post',
            url:`http://localhost:8000/admin/login`,
            data:{ email: email, password: password }
        })
        alert(res.data.message)
        localStorage.setItem('token', res.data.token)
        window.location.href="./admin.html"
    }
    catch(err){
        console.log(err)
        if (err.response.status === 400) {
            alert(err.response.data.message);
        } else if (err.response.status === 404) {
            alert(err.response.data.message);
        } else if (err.response.status === 500) {
            alert(err.response.data.message);
        } else {
            showError(err)
        }
    };
});

back.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/index.html'
});

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
};