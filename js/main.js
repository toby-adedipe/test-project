// add class 'activeLink' to the current link in the browser
const allLinks = document.querySelectorAll('a');
// Set home link as default style
const homeLink = document.querySelectorAll('a[href="/"]')
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
// add a clikc event to all the links on the page
allLinks.forEach(link=> link.addEventListener('click', clickLink))

async function getData(){
  let response = await fetch('../data/data.json')
  let data = await response.json()

  return data
}

getData().then(data => {
  let html = ""
  var div = document.createElement('div')
  // json.forEach(function (book){
  //   html += "<p>"+ book.title + ""
  // })
  data.forEach(book=>{
    html += `
      <div class="all-books-section">
        <div class="book-image">
          <img src=${book.image} alt=${book.title}>
        </div>
        <div class="book-info">
          <p>${book.availability}</p>
          <p>${book.title}</p>
          <p>${book.authors.map(category=>(
            `<span>${category}</span>`
          ))}
          - ${book.yearPublished}</p>
          <p>${book.category.map(category=>(
            `<span>${category} </span>`
          ))}
          </p>
          <p>${book.ratings}</p>
          <p>${book.readers}</p>
          <p>${book.likes}</p>
      </div>
    `;
  })
  div.innerHTML = html
  document.getElementById("all-books").appendChild(div)
})


    /*const json = JSON.parse(req.responseText);
    let html = "";
    // Add your code below this line
    json.forEach(function(val){
      const keys = Object.keys(val);
      html += "<div class='cat'>";
      keys.forEach(function(key){
        html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
      });
      html += "</div><br>";
    });

    // Add your code above this line
    document.getElementsByClassName('message')[0].innerHTML = html;
    let html = "";
        json.forEach(function(val) {
          html += "<div class = 'cat'>";
          // Add your code below this line
          html += "<img src= '"+ val.imageLink + "'" + "alt= '" + val.altText + "'>";


          // Add your code above this line
          html += "</div><br>";*/