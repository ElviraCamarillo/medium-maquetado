
//objeto de mi post de ejemplo
// var objetoPost = {
//     title: ' The Most Underrated Tool in Data Science: NumPy',
//     abstract: 'The power of NumPy and how to effectively use it',
//     description: 'Data scientist often work with DataFrame, be it in R or Python.',
//     urlImage: 'https://i.blogs.es/a19bfc/testing/450_1000.jpg',
//     author: 'Soner Yildirim',
//     createdAt: 'Feb 20',
//     category: 'Towards Data Science',
//     group: 'Popular on Medium',
//     minToRead: '6'
// }
var postArray = [];
const getPostData = () => {
    let title = $("#title").val();
    let abstract = $("#abstract").val();
    let description = $("#description").val();
    let urlImage = $("#urlImage").val();
    let author = $("#author").val();
    let createdAt = $("#createdAt").val();
    let category = $("#category").val();
    let group = $("#group").val();
    let minToRead = $("#minToRead").val();

    let postObject = {title, abstract, description, urlImage, author, createdAt, category, group, minToRead}

    postArray.push(postObject)
    addPostToDB(postObject)

    console.log(`Objeto de posts: ${postObject}`)
    console.log(`Array de posts: ${postArray}`)
}
$("#save-post").on("click", () => {
    console.log(`Array de posts: ${postArray}`)
    getPostData()
    $('#exampleModalCenter').modal('toggle');
    return false;
})

var filteredArray = []  

$("#searchBox").on("keyup",(event) => {   
    let keyword = $(event.target).val();   
    filteredArray = postArray.filter((post) => {
             return post.category.contains(keyword)   
            })
            console.log(filteredArray);
            console.log(keyword);
        })

// agregar post en base de datos
const addPostToDB = (postObject) => {
    postArray = []
    $.ajax({
        url:"http://localhost:8081/posts",
        method:"POST",
        data:JSON.stringify(postObject),
        success:(response)=>{
           console.log(response)
           getPostsLists()
        }
    
    })
}
//addPostToDB(objetoPost)


// functions sections Gaby

const getPostById = (id) =>{
    $.ajax({
        url:`http://localhost:8081/posts/${id}`,
        method:"GET",
        success:(response)=>{
            console.log(response)
            printPost(response)
            
        }
    })
}

function reverseObject(object) {
    var newObject = {};
    var keys = [];

    for (var key in object) {
        keys.push(key);
    }

    for (var i = keys.length - 1; i >= 0; i--) {
        var value = object[keys[i]];
        newObject[keys[i]]= value;
    }       

    return newObject;
}

const printPostCenter = (objectPost) =>{
    console.log(objectPost)
    
    let min = 0
    let max = 14
    let counter = 0

    $.each(objectPost, (index,post) => {
        console.log(index,post)
        // formar item
        if(counter >= min && counter <= max){
            let item =  `
                <div class="card-container d-flex justify-content-between mb-4 card-item-container" data-toggle="modal" data-target="#modalPostPreview" data-id="${post._id}">
                    <div class="card-innerText w-100 mr-4 min-width0">
                        <p class="card-text">${post.category}</p>
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-paragrah">${post.description}</p>
                        <div class="d-flex w-100 justify-content-between ">
                            <div class="wrap-info--post w-100 nowrap-withellipsis mr-1 ">
                                <p class="card-autor mb-0 nowrap-withellipsis"><a href="">${post.author}</a>  in  <a href="">Fake group</a></p>
                                <p class="gray-text mb-0 nowrap-withellipsis">
                                    <span class="card-date-post">${post.createdAt}</span>
                                    <span class=""> - </span>
                                    <span class="card-read-post">${post.estimatedReadTime} min read</span>
                                    <span><svg class="svgIcon-use" width="15" height="15"><path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path></svg></span>
                                </p>
                            </div>
                            <button class="btn p-0 card-icon-bookmark">
                                <svg class="svgIcon-use" width="25" height="25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg>
                            </button>
                            <button class="btn p-0 card-icon-bookmark">
                                <svg class="svgIcon-use" width="25" height="25"><path d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z" fill-rule="evenodd"></path></svg>
                            </button>
                            
                        </div>
                    </div>
                    <div class="card-img " style="background-image: url('${post.imageURL}')"></div>
                </div>
            `
            $('#listPostCenter').append(item)
        }
        counter++;
    });
}

const printPostSidebar = (objectPost) =>{
    console.log(objectPost)
    let min = 15
    let max = 18
    let counter = 0
    let counterNumber = 1

    $.each(objectPost, (index,post) => {
        console.log(index,post)
        // formar item
        if(counter >= min && counter <= max){
            let item = `
                <div class="card-container d-flex justify-content-between mb-4 card-item-container" data-toggle="modal" data-target="#modalPostPreview" data-id="${index}">
                    <div class="card-number-position d-flex ">0${counterNumber}</div>
                    <div class="card-innerText w-100 mr-4 min-width0">
                        <h4 class="card-title">${post.title}</h4>
                        <div class="d-flex w-100 justify-content-between ">
                            <div class="wrap-info--post w-100 nowrap-withellipsis mr-1 ">
                                <p class="card-autor mb-0 nowrap-withellipsis"><a href="">${post.author}</a>  in  <a href="">${post.group}</a></p>
                                <p class="gray-text mb-0 nowrap-withellipsis">
                                    <span class="card-date-post">${post.createdAt}</span>
                                    <span class=""> - </span>
                                    <span class="card-read-post">${post.minToRead} min read</span>
                                    <span><svg class="svgIcon-use" width="15" height="15"><path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path></svg></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            $('#sidebarPost').append(item)
            counterNumber++;
        }
        counter++;
    });
}

const printPostBottom = (objectPost) =>{    
    let min = 19
    let max = Object.keys(objectPost).length
    let counter = 0

    $.each(objectPost, (index,post) => {
        console.log(index,post)
        // formar item
        if(counter >= min && counter <= max){
            let item =  `
                <div class="card-container d-flex justify-content-between mb-4 card-item-container" data-toggle="modal" data-target="#modalPostPreview" data-id="${index}">
                    <div class="card-innerText w-100 mr-4 min-width0">
                        <p class="card-text">${post.category}</p>
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-paragrah">${post.abstract}</p>
                        <div class="d-flex w-100 justify-content-between ">
                            <div class="wrap-info--post w-100 nowrap-withellipsis mr-1 ">
                                <p class="card-autor mb-0 nowrap-withellipsis"><a href="">${post.author}</a>  in  <a href="">${post.group}</a></p>
                                <p class="gray-text mb-0 nowrap-withellipsis">
                                    <span class="card-date-post">${post.createdAt}</span>
                                    <span class=""> - </span>
                                    <span class="card-read-post">${post.minToRead} min read</span>
                                    <span><svg class="svgIcon-use" width="15" height="15"><path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path></svg></span>
                                </p>
                            </div>
                            <button class="btn p-0 card-icon-bookmark">
                                <svg class="svgIcon-use" width="25" height="25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg>
                            </button>
                            <button class="btn p-0 card-icon-bookmark">
                                <svg class="svgIcon-use" width="25" height="25"><path d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z" fill-rule="evenodd"></path></svg>
                            </button>
                            
                        </div>
                    </div>
                    <div class="card-img " style="background-image: url('${post.urlImage}')"></div>
                </div>
            `
            $('#listPostBottom').append(item)
        }
        counter++;
    });
}

const getPostsLists = () =>{
    $.ajax({
        url:`http://localhost:8081/posts`,
        method:"GET",
        success: (response) => {
            console.log(response)
            //const postList = response.data.post
            var orderedResponse = response.data.post
            console.log(orderedResponse)
            printPostCenter(orderedResponse)
            printPostSidebar(orderedResponse)
            printPostBottom(orderedResponse)
        }
    })
}

getPostsLists()

const printPost = (objectPost) =>{
    $('#modalPostPreview .modal-title').text(objectPost.title)
    $('#modalPostPreview .card-author').text(objectPost.author)
    $('#modalPostPreview .card-group').text(objectPost.group)
    $('#modalPostPreview .card-date').text(objectPost.createdAt)
    $('#modalPostPreview .card-minread').text(objectPost.minToRead)
    $('#modalPostPreview .full-image-post').css("background-image", "url("+objectPost.urlImage+")")
    $('#modalPostPreview .card-description').text(objectPost.description)
}

$('#bottomPostsLists').on('click', '.card-item-container', function(){
    console.log('open modal')
    var idPost = $(this).data('id')
    // get del post
    getPostById(idPost)
})


//--------------------------------------------------POSTS RECENT UP--------------------------
avatarArray = []

  //------For company------
  $( ".company-info" ).hover(
    function() {
      $( this ).find(".company-dialog").append(`
      <span class="dialog-company d-flex flex-column align-items-center">
      <div class="card-dialog-company">
        <div class="card border border-0">
          <div class="card-body d-flex justify-content-between">
              <div>
                  <h5 class="card-title name-company">Logistic Company</h5>
                  <p class="card-text paragraph-description">The undercurrents, of the future. A Medium publication, about tech and science. Former Medicare. https://twitter.com/ASlavitt</p>
              </div>
              <span class=""><img src="./assets/img/ico-company.jpg" class="rounded-sm ml-2" width="60" height="60" alt=""><img/></span>
          </div>
          <hr class="hr-footer align-self-center">
          <div class="d-flex justify-content-between align-items-baseline p-2">
            <p class="paragraph-description">Followed <strong>by 8.9K</strong> people</p>
            <a href="#" class="btn btn-follow">Follow</a>
          </div>
        </div>                        
      </div>
      <span class="triangle-company"></span>
      </span>
      `)
    }, function() {
      $(".dialog-company").hide('slow',
        function(){ $(this).remove()
      })
    }
)

//------Cuadro de dialogo oscuro-----
$( ".time-info" ).hover(
  function() {
    $( this ).append(`
    <span class="time-dialog d-flex flex-column align-items-center">
      <div class="time-paragraph text-center text-white rounded-sm">
        <p>Updated Mar 30</p>                              
      </div>
      <span class="time-triangle"></span>
    </span>
    `)
  }, function() {
    $(".time-dialog").after().remove()
  }
)

const printAvatar = () => {
  $(".container-dialog").empty();
  avatarArray.forEach((avatar,index) => {
    console.log(avatar.picture.medium)
    $( ".author-info" ).hover(
      function() {
        $( this ).find(".show-dialog").append(`
        <span class="container-dialog d-flex flex-column align-items-center">
        <div class="card-dialog">
          <div class="card border border-0">
            <div class="card-body d-flex justify-content-between">
                <div>
                    <h5 class="card-title name-title">${avatar.name.first} ${avatar.name.last}</h5>
                    <h6 class="card-title description-title">Medium member since Mar 2020</h6>
                    <p class="card-text paragraph-description">Former Medicare, Medicaid & ACA head for Pres. Barack Obama. https://twitter.com/ASlavitt</p>
                </div>
                <span class=""><img src="${avatar.picture.medium}" class="rounded-circle img-avatar ml-3" width="60" height="60" alt="${avatar.name.first}"><img/></span>
            </div>
            <hr class="hr-footer align-self-center">
            <div class="d-flex justify-content-between align-items-baseline p-2">
              <p class="paragraph-description">Followed <strong>by 8.9K</strong> people</p>
              <a href="#" class="btn btn-follow">Follow</a>
            </div>
          </div>                        
        </div>
        <span class="triangle"></span>
    </span>
        `)
      }, function() {
        $(".container-dialog").hide('slow',
          function(){ $(this).remove()
        })
      }
  )
  })
}

//${avatar.name.title} ${avatar.name.first[0]} ${avatar.name.last}

const getAvtarFromRandomUser = () => {
  console.log('Descarga Completada')
    avatarArray = []
    $.ajax({
        url:'https://randomuser.me/api/',
        method:"GET",
        success:(response)=>{
            $.each(response.results,(key,value)=>{
              avatarArray.push({...value,key})
                console.log(value.picture.medium)
                console.log(  avatarArray)
            })
            printAvatar();
        }
    })
}

const isMobile = () => {
    if($(window).width() < 767) {
      $(".author-info").on("click", () => {
        $(".dialog-company").remove()
        console.log("borrando con click")
      })
      console.log("es vista movil")
    }

}

  getAvtarFromRandomUser()

  isMobile()

const searchBox = () => {
    if($(window).width() > 767){
        $()
    }
}