const restaurantDetailContainer=document.getElementById('res-details-container');
const reviewList=document.getElementById('reviews-list');
const parent_element=document.querySelector('body');
const restaurantId=localStorage.getItem('restaurantId')
const restaurantPagination=document.getElementById('review-pagination');
const postreview=document.getElementById('reviewpost')
const reviewContent=document.getElementById("review-content");
const back=document.getElementById('back');

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    console.log("content is loading")
    const page=1
    showRestaurantDetails(page)
});


const showRestaurantDetails=function(page){
    axios({
        method:'get',
        url: `http://localhost:8000/restaurant/restaurant?restaurantId=${restaurantId}&page=${page}`,
    })
    .then(res=>{
        console.log(res)
        restaurantDetailContainer.innerHTML=`
        <h1>${res.data.restaurant.name}</h1>
        <h2>${res.data.restaurant.address}</h2>
        <h3>${res.data.restaurant.details}</h3>`;
        if(res.data.reviews.length>0){
            reviewList.innerHTML='';
            res.data.reviews.forEach(element => {
                var li = document.createElement('li');
                li.className='review-item';
                li.innerHTML=`<a class="review" id="rev${element.id}">"${element.review}"</a>`;
                reviewList.appendChild(li);
            });
            pagination(res.data.currentPage,res.data.hasNextPage,res.data.nextPage,res.data.hasPreviousPage,res.data.previousPage,restaurantPagination,showRestaurantDetails)
        }else{
            reviewList.innerHTML=`
            <h3>No one has added their reviews for this restaurant yet, please add a review !!</h3>`
        }
    })
    .catch(err=>console.log(err))
};



postreview.addEventListener('click',async (e)=>{
    try{
        e.preventDefault();
        if (!reviewContent.value){
            return alert("Please enter review first before posting")
        }
        const  reviewCon=reviewContent.value;
        
        const res=await axios({
            method:'post',
            url:`http://localhost:8000/review/postreview`,
            data:{
                reviewContent: reviewCon,
                restaurantId:restaurantId
                }
            }
        )
        alert(res.data.message);
        window.location.href="./restaurant.html"
    }
    catch(err){
        if (err.response.status === 400) {
            alert(err.response.data.message);
        } else if (err.response.status === 403) {
            alert(err.response.data.message);
        } else if (err.response.status === 500) {
            alert(err.response.data.message);
        }
    };
});


back.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.removeItem('restaurantId');
    window.location.href='/index.html'
});


function pagination(currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,pages,cb){
    pages.innerHTML='';
    if (hasPreviousPage){
        const prevBtn=document.createElement('button')
        prevBtn.innerHTML=previousPage;
        pages.appendChild(prevBtn);
        prevBtn.addEventListener('click',()=>{
            cb(previousPage)
            });
    };
    
    const curBtn=document.createElement('button')
    curBtn.innerHTML=currentPage;
    pages.appendChild(curBtn);
    curBtn.addEventListener('click',(e)=>{        
        cb(currentPage)
    });

    if (hasNextPage){
        const nexBtn=document.createElement('button')
        nexBtn.innerHTML=nextPage;
        pages.appendChild(nexBtn);
        nexBtn.addEventListener('click',()=>{
            cb(nextPage)
            });
    };
};