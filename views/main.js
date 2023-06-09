const restaurantList=document.getElementById('res-list');
const parent_element=document.querySelector('body');
const restaurantPagination=document.getElementById('restaurant-pagination');
const adminLogin=document.getElementById('admin-login');

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    const page=1
    showRestaurants(page)
});


const showRestaurants=async function(page){
    try{
    const res= await axios({ method:'get', url: `http://localhost:8000/restaurants?page=${page}`})
    restaurantList.innerHTML='';
    if(res.data.restaurants.length>0){
        res.data.restaurants.forEach(element => {
            var li = document.createElement('li');
            li.className='res-item';
            li.innerHTML=`<a class="restaurants" id="res${element.id}">"${element.name}" at ${element.address}</a>`;
            restaurantList.appendChild(li);});
            pagination(res.data.currentPage,res.data.hasNextPage,res.data.nextPage,res.data.hasPreviousPage,res.data.previousPage,restaurantPagination,showRestaurants)
        }}
    catch(err){
        if (err.response.status === 404) return alert(err.response.data.message);
        else if (err.response.status === 500)  return alert(err.response.data.message);
        else console.log(err)    
    }
}

parent_element.addEventListener('click',(e)=>{
    e.preventDefault()
    if(e.target.className==='restaurants'){
        const restaurantId=e.target.id.slice(3)
        localStorage.setItem('restaurantId',restaurantId)
        window.location.href=`/restaurant.html`
    }
});


adminLogin.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/adminlogin.html'
});


function pagination(currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,pages,cb){
    pages.innerHTML='';
    if (hasPreviousPage){
        const prevBtn=document.createElement('button')
        prevBtn.innerHTML=previousPage;
        pages.appendChild(prevBtn);
        prevBtn.addEventListener('click',()=>cb(previousPage));
    };
    
    const curBtn=document.createElement('button')
    curBtn.innerHTML=currentPage;
    pages.appendChild(curBtn);
    curBtn.addEventListener('click',(e)=>cb(currentPage));

    if (hasNextPage){
        const nexBtn=document.createElement('button')
        nexBtn.innerHTML=nextPage;
        pages.appendChild(nexBtn);
        nexBtn.addEventListener('click',()=>cb(nextPage));
    };
};