var consulta = document.getElementById('contact');

consulta.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  
  let myHeaders = new Headers();

  const options = {
    method: 'GET',
    headers: myHeaders,
    
  }

  fetch('/basedatos/consultatotalpacientes', options)
    .then((res) => res.json())
    .then((data) => {
      setText(data);
      console.log(data);
    });
});
function setText(data) { 
    var x = document.getElementById("div"); 
      
    // x.innerHTML = Object.values(data[0]); 
    var a="<table border==\"1\"><tr>";
    for (key in data[0]) {
        a +='<td>' + key + '</td>';
    }
    a +="</tr>";
    for (var i = 0; i < data.length; i++) {
        a +='<tr>';
        for (key in data[i]) {
        a +='<td>' + data[i][key] + '</td>';
    }
        a +='</tr>';
    }
    a +="</table>";
    x.innerHTML=a;
    
    console.log(a);
} 

