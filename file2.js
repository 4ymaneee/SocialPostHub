// Get the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id); // This will log the 'id' from the URL

//Get Post About
function getPostAbout(id) {
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts/${id}?limit=1`)
    .then((response) => {
      let currentPost = document.getElementById("posts");
      currentPost.innerHTML = "";
      let post = response.data.data;

      console.log(post);

      currentPost.innerHTML = "";
      let owner = post.author.username;
      let username = post.author.username;
      let profilePic = post.author.profile_image;
      let postImage = post.image;
      let timeCreated = post.created_at;
      let postTitle = post.title;
      let body = post.body;
      let commentsCount = post.comments_count;
      let emptyTitle = "";
      if (postTitle == null) {
        postTitle = emptyTitle;
      }
      let tags = post.tags;
      let tag = "";
      for (let i = 0; i < tags.length; i++) {
        tag += `<span class="btn btn-secondary rounded-pill me-1">${tags[i].name}</span>`;
      }
      currentPost.innerHTML = `<h1 class="mt-5 owner" style="font-weight: 700;" >@${owner} Post</h1>
      <div class="card shadow my-5">
              <div class="card-header" >
                  <img src="${profilePic}" alt="" style="width: 40px; height: 40px;"
                      class="rounded-circle border border-3 profile-pic">
                  <b >@${username}</b>
              </div>
              <div class="card-body" onclick="changeLocation()" style="cursor: pointer;">
                  <img class="w-100 rounded"
                      src="${postImage}"
                      alt="">
                  <h6 class="mt-2" style="color: grey;">${timeCreated}</h6>
                  <h5>${postTitle}</h5>
                  <p>${body}</p>
                  <hr>
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-pen" viewBox="0 0 16 16">
                          <path
                              d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                      </svg>
                      <span class="me-2">(${commentsCount}) comments</span>
  
                      <i id="tag-content"> 
                      ${tag}
                      </i>
  
                  </div>
              </div>
          </div>`;
    });
}

getPostAbout(id);
