document.getElementById('myForm').addEventListener('submit', addBm);

function addBm(e) {
    e.preventDefault();

    let name = document.getElementById('inpName').value
    let url = document.getElementById('inpUrl').value

    if(!name || !url){
        alert('Please fill in the details first')
        return false;
    }

    let bookmark = {
        name,
        url
    }

    if(localStorage.getItem('bookmarks') === null){
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert('Bookmark added!!')
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        for(var i=0; i<bookmarks.length; i++){
            if(bookmarks[i].name == bookmark.name){
                alert('Bookmark with same name exists!!')
                return
            }
            else if(bookmarks[i].url == bookmark.url){
                alert('Bookmark with the same URL exists!!')
                return
            }
            else {
                bookmarks.push(bookmark);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
                alert('Bookmark added');
                break
            }
        }
        
    }
    fetchBm()
    document.getElementById('inpName').value= "";
    document.getElementById('inpUrl').value= "";

}

function deleteBm(url){
    if(confirm("Are you sure you want to delete this bookmark?")) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        for(var i=0; i<bookmarks.length; i++){
            if(bookmarks[i].url == url){
                bookmarks.splice(i,1);
            }
        }
        if(bookmarks.length == 0){
            localStorage.removeItem('bookmarks');
        }else{
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        }
        alert('Bookmark deleted!')
        fetchBm()   
    }

}

function fetchBm() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

    let results = document.getElementById('results')

    results.innerHTML = ''
    if(bookmarks){
    for(let i=0; i<bookmarks.length; i++){
        var name = bookmarks[i].name
        var url = bookmarks[i].url
         
         results.innerHTML +='<div class= "post card blue-grey lighten-3">'+
                             '<div class= "card-content">'+
                             '<div class= "row">'+
                             '<div class= "col s6">'+
                             '<h5 class="left">'+name+'</h5>'+
                             '</div>'+
                             '<div class= "col s3">'+
                             '<a class="btn-large amber lighten-2" target="_blank" href="'+url+'">Visit</a>'+
                             '</div>'+
                             '<div class= "col s3">'+
                             '<a onClick="deleteBm(\''+url+'\')" class = "btn-large red" >Delete</a>'+
                             '</div>'+
                             '</div>'+
                             '</div>'+
                             '</div>'
    }
}
}