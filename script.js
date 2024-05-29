const API_key = "38c94efeaf6648a5a3ee0adfceb12c98";
const url = "https://newsapi.org/v2/everything?q=";

//whenever load website we can call fetch news 
window.addEventListener('load', fetchNews("India"));

async function fetchNews(query) {
    const d = await fetch(`${url}${query}&apiKey=${API_key}`);
    const data = await d.json();

    // console.log(data);
    bindData(data.articles);
    //    console.log(data.articles[0].description);
}


//bind data used to bind or add  the mutiples article in the website 
//using for loop in articles we can bind aur data in the website

function bindData(articlesArr) {
    const card_teplate = document.getElementById("card-template");
    const card_container_parent = document.getElementById("card-container-parent");

    card_container_parent.innerHTML = "";

    articlesArr.forEach((element) => {
        if (!element.urlToImage) return;
        const cardclone = card_teplate.content.cloneNode(true);

        //before adding clone in our website we can add data in it 
        addDataInClone(cardclone, element);


        card_container_parent.appendChild(cardclone);
    });
}

//this function is used to add data in the clone 
function addDataInClone(cardClone, article) {
    let card_Img=cardClone.querySelector("#card_Img");
    let card_heading=cardClone.querySelector("#card_heading");
    let card_source=cardClone.querySelector("#card_source");
    let card_desc=cardClone.querySelector("#card_desc");


    card_Img.src = article.urlToImage;
    card_heading.innerText = article.title;
    card_desc.innerText = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    card_source.innerHTML=`${article.source.name}. ${date}`;


    
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    });
}


let curSelectedNav=null;
function navItemClick(id){
    fetchNews(id);


    let navItem=document.getElementById(id);
    if(curSelectedNav!=null){
        curSelectedNav.classList.remove('active');
    }
       curSelectedNav=navItem;
       curSelectedNav.classList.add('active');
}




function searchItemBtn(){
    // const searchBtn=document.getElementById('btn');
    const searchBar=document.getElementById('input');
    let newData=searchBar.value;
    if(newData==""){
        return;
    }
    fetchNews(newData);
    if(curSelectedNav!=null){
        curSelectedNav.classList.remove('active');
        curSelectedNav=null;
    }
}


const myLogo=document.getElementById('myLogo');
myLogo.addEventListener('click',()=>{
    window.location.reload();
});


const input=document.getElementById('input')
input.addEventListener('keyup',(e)=>{
    if(e.keyCode===13){
        fetchNews(input.value)
    }
})
