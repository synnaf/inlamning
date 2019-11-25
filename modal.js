window.onload = function() {

    //funktion som hanterar flickr-data
    function handleFlickr() {
        //skapar en script-tag 
        let fetchScript = document.createElement("script"); 
        //hämtar flickr-url 
        fetchScript.src = "https://www.flickr.com/services/feeds/photos_public.gne?tags=puppy&format=json&jsoncallback=getData";    
        //lägger till scripttaggen i head 
        document.getElementsByTagName("head")[0].appendChild(fetchScript); 

        
        //skapar sökknappen 
        let searchbutton = document.getElementById("searchButton"); 
        searchbutton.addEventListener("click", function() {
            let url = "https://www.flickr.com/services/feeds/photos_public.gne?"; 
            let searchinput = document.getElementById("searchinput").value; 
            let jsonFunction = "format=json&jsoncallback=getData";
             //enCodeURI ska vara samma värde som input 
            let search = encodeURI(searchinput); 
        }); 

    } //stänger handleFlickr

//kör funktionen som häntar datan 
handleFlickr(); 

} //stänger window-onload 



 //skapa en callbackfuntkion som sedan kan presentera datan i window.onload (läggs till efter callback i URL)
 function getData(data) {
    console.log(data); 

    let flickrdata = data.items;

    //objekten som presenteras ska finnas i en array 
    //spara datan i en variabel som vi lagrar vår lista från flickr i 


    //for-loop som skriver ut datans bilder 
    for (let i=0; i<flickrdata.length; i++) {

        //hämtar datan i sin array, och bilderna som finns i egenskaperna media - m, för objektet 
        let image = data.items[i].media.m;
         //skapar en html-tagg som bilderna ska finnas i 
         let imagecontainer = document.createElement("img"); 
         //lägger till src-attribut till bilden 
         imagecontainer.src = image; 

        //skapa en section som bilden placeras i (3 per rad) 
        let imagesection = document.createElement("section"); 
        imagesection.setAttribute("class", "sectionClass");

        //placerar section i body
        let mainbody = document.getElementById("main"); 
        mainbody.appendChild(imagesection); 

        //placerar bilden i section 
        imagesection.appendChild(imagecontainer); 

        //skapar en knapp som kan launcha modalen
        let button = document.createElement("button");
        button.id = "myButton"+[i];
        button.innerHTML = "click for modal"; 
        button.setAttribute("type", "button"); 

        imagesection.appendChild(button); 

        //eventlyssnare för knapp
        let modalB = document.getElementsByTagName("button");
        modalB[i].addEventListener("click", function() {
            //använder boostraps modal 
            $('#myModal').modal(); 
            
            //sätter titel + innehålll i modalen 
            let flickrdata = data.items;
            let modaltitle = document.getElementById("modal-id"); 
            modaltitle.innerText = data.items[i].title; 
            let modalbody = document.getElementById("modal-body"); 
            modalbody.innerHTML = data.items[i].description; 
        });   
    } //stänger for-loop 

    
    //for-loop som skriver ut datans titlar  
    for (let i=0; i<flickrdata.length; i++) {

            //hämtar datan i sin array, och titeln från objektet  
            let headline = data.items[i].title;
            //skapar en html-tagg som bilderna ska finnas i 
            let cardheading = document.createElement("h6"); 
            //lägger till src-attribut till bilden 
            cardheading.innerHTML = headline; 
   
           //skapa en section som bilden placeras i (3 per rad) 
           let imagesection = document.createElement("div"); 
           imagesection.setAttribute("class", "headingClass");
   
           //placerar section i body
           let mainbody = document.getElementsByClassName("sectionClass")[i]; 
           mainbody.appendChild(imagesection); 
           //placerar bilden i section 
           imagesection.appendChild(cardheading); 
    }



 } //stänger getData 

