fetch('../data/data.json')
    .then(res=> res.json())
    .then(data=> console.log(data))

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