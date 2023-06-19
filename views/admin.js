const logout=document.getElementById('logout');
const restaurantList=document.getElementById('res-list');
const restPagination=document.getElementById('res-pagination');
const postrestaurant=document.getElementById('postrestaurant');
const restaurantName=document.getElementById("restaurant-name");
const restaurantAddress=document.getElementById("restaurant-address");
const restaurantDescription=document.getElementById("restaurant-description");


const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    showRestaurants()
});

const showRestaurants=async function(){
    try {
        const res =await axios({ method:'get', url: `http://localhost:8000/admin/restaurants`, headers:{'Authorization':token} });
        restaurantList.innerHTML='';
        res.data.restReviewDet.forEach(element => {
            var li = document.createElement('li');
            li.className='resRev-item';
            li.innerHTML=`<a class="resRev" id="resRev${element.id}">Restaurant - ${element.name} , Total Revies - ${element.reviewCount}</a>`;
            restaurantList.appendChild(li);
        });
    }
    catch(err) { 
        if (err.response.status === 404) return alert(err.response.data.message);
        else if (err.response.status === 401)  return alert(err.response.data.message);
        else if (err.response.status === 500)  return alert(err.response.data.message);
        else console.log(err)
    }
};

postrestaurant.addEventListener('click',async (e)=>{
    try{
        e.preventDefault();
        if (!restaurantName.value || !restaurantAddress.value || !restaurantDescription.value) return alert("Please enter all details of restaurant")
        const res=await axios({
            method:'post',
            url:`http://localhost:8000/admin/restaurants/restaurant`,
            data:{
                restaurantName: restaurantName.value,
                restaurantAddress: restaurantAddress.value,
                restaurantDescription: restaurantDescription.value },
            headers:{'Authorization':token}
            }
        )
        showRestaurants()  
        alert(res.data.message);
    }
    catch(err){
        if (err.response.status === 401) return alert(err.response.data.message);
        else if (err.response.status === 403)  return alert(err.response.data.message);
        else if (err.response.status === 500)  return alert(err.response.data.message);
        else console.log(err)
    };
});


logout.addEventListener('click',(e)=>{
    localStorage.removeItem('token');
    window.location.href='/adminlogin.html'
});