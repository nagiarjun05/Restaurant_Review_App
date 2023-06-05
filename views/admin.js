const logout=document.getElementById('logout');
const restaurantList=document.getElementById('res-list');
const restPagination=document.getElementById('res-pagination');
const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    const page=1;
    showRestaurants(page)
});

const showRestaurants=function(page){
    axios({
        method:'get',
        url: `http://localhost:8000/admin/restaurants?page=${page}`,
        headers:{'Authorization':token}
    })
    .then(res=>{
        console.log(res)
        restaurantList.innerHTML='';
        res.data.restReviewDet.forEach(element => {
            var li = document.createElement('li');
            li.className='resRev-item';
            li.innerHTML=`<a class="resRev" id="resRev${element.id}">Restaurant - ${element.name} , Total Revies - ${element.reviewCount}</a>`;
            restaurantList.appendChild(li);
        });
    })
    .catch(err=>console.log(err))
};


logout.addEventListener('click',(e)=>{
    localStorage.removeItem('token');
    window.location.href='/adminlogin.html'
});