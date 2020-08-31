(function($){
  $(document).ready(function(){
    function carousel(){
      $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true
      });
    }
    setTimeout(carousel, 1500)
  })
  $(window).on("load", function(){
    $(".loader-wrapper").fadeOut("slow");
  })
})(jQuery)

//getting all the needed html elements
const allLinks = document.querySelectorAll('a');
const homeLink = document.querySelectorAll('a[href="/"]')
const search = document.getElementById('search-input')
const results = document.getElementById('search-results')
const carousel = document.getElementById('carousel')
const searchDiv = document.getElementById('search-div')
const searchBtn = document.getElementById('mobile-search')
const backBtn = document.getElementById('arrow-left')
const toggler = document.getElementById('toggler')
const hamburger = document.getElementsByClassName('hamburger')[0]

//function to set and change the active link in the sidebar
homeLink.forEach(link=>{
  link.className += ' active-link'
});
// create a function to remove the styling from other links and add it to currentlink
function clickLink(e){
  removeStyle();
  this.classList.add('active-link')
}
// function to remove styling from other links
function removeStyle(){
  allLinks.forEach(link=> link.classList.remove('active-link'))
}
// add a click event to all the links on the page
allLinks.forEach(link=> link.addEventListener('click', clickLink))

//Async method to fetch data
async function getData(){
  let response = await fetch('../data/data.json')
  let data = await response.json()

  return data
}

//abstracted function to render the html for the carousel
function renderCarousel (book){
  let html = ""
  var div = document.createElement('div')
  div.setAttribute("class", "carousel-cell")
  
  html += `
  <div style="background-image: url(${book.image})" class="carousel-images">
    <div class="carousel-background">
      <input type="checkbox" class="info-toggler">
      <div class="toggle-info"><div></div></div>
      <div class="carousel-info">
        <p class=${book.availability === 'Available' 
          ? "available-book"
          : "unavailable-book"
          }>
            ${book.availability}
        </p>
        <div>
          <p class="book-title">${book.title}</p>
          <p>${book.authors.map(author=>(
              `<span> ${author}</span>`
            ))}
          </p>
          <p>
            ${book.yearPublished}
          </p>
        </div>
        <div>
            <p>Genre: ${book.category.map(category=>(
              `<span> ${category}</span>`
            ))}
            </p>
            <p>Labels: ${book.labels.map(label=>(
              `<span> ${label}</span>`
            ))}
        </div>
          <div class="ratings-section">
            <div class="ratings-section-ratings">
              <p>Ratings: ${book.ratings}</p>
              <div>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star empty" aria-hidden="true" style="color: #333333"></i>
              </div>
            </div>
            <div class="ratings-section-likes">
              <div>
                <i class="fa fa-users" aria-hidden="true" style="color: #999999"></i>
                <p>${book.readers}</p>
              </div>
              <div>
                <i class="fa fa-heart-o" aria-hidden="true" style="color: #999999"></i>
                <p>${book.likes}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  `
  div.innerHTML = html
  carousel.appendChild(div)
}

//Function to render the html for the main page(all books and recent books)
function renderHTML (book, id){
  let html = ""
  let div = document.createElement('div')  
  html += `
    <div class="all-books-section">
      <div class="book-image">
        <img src=${book.image} alt=${book.title}>
      </div>
      <div class="book-info">
        <p class=${book.availability === 'Available' 
          ? "available-book"
          : "unavailable-book"
        }>
          ${book.availability}
        </p>
        <p class="book-title">${book.title}</p>
        <p>${book.authors.map(author=>(
          `<span> ${author}</span>`
        ))}
        - ${book.yearPublished}</p>
        <p>${book.category.map(category=>(
          `<span> ${category}</span>`
        ))}
        </p>
        <div class="ratings-section">
          <div class="ratings-section-ratings">
            <p>Ratings: ${book.ratings}</p>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star empty" aria-hidden="true"></i>
          </div>
          <div class="ratings-section-likes">
            <div>
              <i class="fa fa-users" aria-hidden="true"></i>
              <p>${book.readers}</p>
            </div>
            <div>
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              <p>${book.likes}</p>
            </div>
          </div>
        </div>
    </div>
  `;
  div.innerHTML = html
  document.getElementById(id).appendChild(div)
}
  
// Get the data JSON data and render it to the html page
getData().then(data => {
  data.filter(book=>book.id<8).forEach(book=>renderCarousel(book)) // Rendering only 7 featured books for the carousel
  data.filter(book=>book.id>=10).forEach(book=>renderHTML(book, "recently-added")) //Rendering the last 5 books to be added to the database
  data.forEach(book=>renderHTML(book, "all-books"))
})

//Autocomplete Feature
const searchBooks = async searchInput =>{
  const res = await fetch('../data/data.json');
  const data = await res.json()

  let matched = data.filter(book =>{
    const regex = new RegExp(`${searchInput}`, 'gi')
    return book.title.match(regex)
  })

  searchInput.length === 0
  ? matched = []
  : matched

  renderSearchHtml(matched)

}

const renderSearchHtml = matches => {
  results.innerHTML = ""
  matches.forEach( book => {
    let html = ""
    let div = document.createElement('div')
    div.setAttribute('class', 'rendered-search')  
    html += `
      <p>${book.title} </p>
      <p>${book.authors.map(author=>(
        `<span> - ${author}</span>`
      ))}</p>
    `;
    div.innerHTML = html
    results.appendChild(div)
    console.log(html)
  })

}

// Toggle showing and hiding Search bar
const showSearch = ()=>{
  searchDiv.style.display = "flex";
  toggler.style.visibility="hidden";
  hamburger.style.visibility="hidden";
}
const hideSearch = ()=>{
  searchDiv.style.display = "none";
  toggler.style.visibility = "visible";
  hamburger.style.visibility = "visible";
}


search.addEventListener('input', ()=> searchBooks(search.value))
searchBtn.addEventListener('click', ()=>showSearch())
backBtn.addEventListener('click', ()=>hideSearch())
