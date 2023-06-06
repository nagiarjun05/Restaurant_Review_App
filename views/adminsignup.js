const userName=document.getElementById("user-name");
const userEmail=document.getElementById("user-email");
const passWord=document.getElementById("password");
const signup=document.getElementById("signup");
const back=document.getElementById('back');

signup.addEventListener('click',async (e)=>{
    try{
        e.preventDefault();
        if (!userName.value||!userEmail.value||!passWord.value) return alert("All fields are mandatory!")
        const  [name,email,password]=[userName.value,userEmail.value,passWord.value]
        const res=await axios({
            method:'post',
            url:`http://localhost:8000/admin/signup`,
            data:{
                name: name,
                email: email,
                password: password
                }
            }
        )
        alert(res.data.message);
        window.location.href="./adminlogin.html"
    }
    catch(err){
        if (err.response.status === 403) return alert(err.response.data.message);
        else if (err.response.status === 500) return alert(err.response.data.message);
        else console.log(err)
});

back.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/index.html'
});