function sortJSON(arr, key, asc=true) {
    return arr.sort((a, b) => {
      let x = a[key];
      let y = b[key];
      if (asc) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
      else { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
  }

  const toggleSpinner = (isLoaging)=>{
    const spinner = document.getElementById("spinner-element");
    isLoaging ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
  }
  
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
            <a onClick = renderNewsCards('${category.category_id}') class="nav-link text-secondary fw-bold" aria-current="page" href="#">${category.category_name}</a>
        </li>
        `;
        categoryItems.appendChild(ul)
    })
    
}
renderCategories();


const getNewsByCaterory = async id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        const sorted = await sortJSON(data.data, "total_view", false)
        console.log("sorted", sorted)
        return await sorted
    }
    catch (err) {
        console.log(err)
    }

}

const getCategoryNameById = async id =>{
    const categories = await getCategories()
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log( "I have data ", data.data.news_category)
        await data.data.news_category.forEach( async category =>{
            if(category.category_id === id){
                 return await category.category_name
            }
        })
       
    }
    catch (err) {
        console.log(err)
    }

  
}

const setItemCountAndCategoryName = (number, name)=>{
    const resultCount = document.getElementById("result-count");
    const categoryName = document.getElementById("category-name");
    resultCount.innerText = number;
    categoryName.innerText = name; 
    // console.log(number, name)
}
// setItemCount();



const renderNewsCards = async id=>{
    toggleSpinner(true);
    const cards = await getNewsByCaterory(id);
    const name = await getCategoryNameById(id)
   await setItemCountAndCategoryName(cards.length, name);

    const cardsElement = document.getElementById("cards");
    cardsElement.innerHTML ="";
    cards.forEach( card =>{
        const div = document.createElement("div");
        div.classList.add("card", "mb-3");
        div.innerHTML =`
        <div class="row">
                    <div class="col-md-4 text-center">
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
                                            <a onClick = renderModal('${card._id}') href="#" data-bs-toggle="modal" data-bs-target="#modal"><i
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
        
    });
    toggleSpinner(false);
    
    
}
renderNewsCards('08');


const getNewsDetailsById = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("ndslfjasld;jfslkj",data.data[0])
        return await data.data[0];
    }
    catch (err) {
        console.log(err)
    }

}
// getNewsDetailsById();

const renderModal = async (id)=>{
    const modalDetalis = await getNewsDetailsById(id);
    const modalElement = document.getElementById("modal-elemant");
    const div = document.createElement("div");
    modalElement.innerHTML="";
    div.innerHTML = `
        <h1>${modalDetalis.title}</h1>
        <p class="text-muted">Posted on <span class="fw-bold">${modalDetalis.author.published_date ? modalDetalis.author.published_date.slice(0,11) : "Date Not Found"}</span></p>
        <p class="text-muted">Posted by <span class="fw-bold">${modalDetalis.author.name ? modalDetalis.author.name : "Author Name Not Found"}</span></p>
        <p class="text-muted">Total View: <span class="fw-bold"> ${modalDetalis.total_view ? modalDetalis.total_view : "Data Not Found"}</span></p>
        <div class="my-3">
            <img class="img-fluid" src="${modalDetalis.image_url}" alt="">
        </div>
        <div>
            <p>${modalDetalis.details}</p>
        </div>
    `;
    modalElement.appendChild(div);
    
}
