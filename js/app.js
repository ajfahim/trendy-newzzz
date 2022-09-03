const getCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try {
        const res = await fetch(url);
        const data = await res.json();
        return await data.data.news_category
    }
    catch (err) {
        console.log(err)
    }

}


const renderCategories = async ()=>{
    const categories = await getCategories();
    const categoryItems = document.getElementById("category-items");
  
    categories.forEach(category =>{
        const ul = document.createElement("ul");
        ul.classList.add("nav");
        ul.innerHTML= `
        <li class="nav-item">
            <a class="nav-link text-secondary fw-bold" aria-current="page" href="#">${category.category_name}</a>
        </li>
        `;
        categoryItems.appendChild(ul)
    })
    
}
renderCategories();


const getNewsByCaterory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/category/01';
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data)
        return await data.data
    }
    catch (err) {
        console.log(err)
    }

}

const renderNewsCards = async ()=>{
    const cards = await getNewsByCaterory();
    const cardsElement = document.getElementById("cards");
    
    cards.forEach( card =>{
        const div = document.createElement("div");
        div.classList.add("card", "mb-3");
        div.innerHTML =`
        <div class="row g-1">
                    <div class="col-md-4">
                        <img src="${card.thumbnail_url}" class="img-fluid rounded-start p-2" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${card.title ? card.title : "No Title Found"}</h5>
                            <div class="text-truncate-container">
                                <p class="card-text text-secondary truncate-overflow">${card.details ? card.details : "No details Found"}</p>
                            </div>
                            <div class="mt-3">
                                <div class="row d-flex align-items-center">
                                    <div class="col align-items-center">
                                        <div class=" d-flex ">
                                            <img class="img-fluid rounded-circle" style="max-width: 50px;"
                                                src="${card.author.img}" alt="">
                                            <div class="ms-2">
                                                <p class="mb-0">${card.author.name ? card.author.name : "No Author Name Found"}</p>
                                                <p class="text-muted mb-0">${card.author.published_date ? card.author.published_date.slice(0,11) : "Date Unavailable"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class=" d-flex justify-content-center align-items-center">
                                            <i class="fa-regular fa-eye"></i>
                                            <p class="ms-2 text-secondary fw-bold">${card.total_view ? card.total_view : "No data found"}</p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="">
                                            <div class="ratings">
                                                <i class="fa fa-star rating-color"></i>
                                                <i class="fa fa-star rating-color"></i>
                                                <i class="fa fa-star rating-color"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="  text-center">
                                            <a href="#"><i
                                                    class="fa-solid fa-arrow-right fw-bold text-primary fs-3"></i></a>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
        `;
        cardsElement.appendChild(div)
    })

}
renderNewsCards();