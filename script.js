//BASE URL
const baseURL = "https://tarmeezacademy.com/api/v1";

//Get All Posts
function getPosts() {
  axios.get(`${baseURL}/posts?limit=3`).then((response) => {
    let posts = response.data.data;

    let allPosts = document.getElementById("posts");
    allPosts.innerHTML = "";
    for (let x = 0; x < posts.length; x++) {
      let username = posts[x].author.username;
      let profilePic = posts[x].author.profile_image;
      let postImage = posts[x].image;
      let timeCreated = posts[x].created_at;
      let postTitle = posts[x].title;
      let body = posts[x].body;
      let commentsCount = posts[x].comments_count;
      let emptyTitle = "";
      if (postTitle == null) {
        postTitle = emptyTitle;
      }
      let tags = posts[x].tags;
      let tagHTML = "";
      for (let i = 0; i < tags.length; i++) {
        tagHTML += `<span class="btn btn-secondary rounded-pill me-1">${tags[i].name}</span>`;
      }
      allPosts.innerHTML += `<div class="card shadow my-5">
            <div class="card-header ">
                <img src="${profilePic}" alt="" style="width: 40px; height: 40px;"
                    class="rounded-circle border border-3 profile-pic">
                <b>@${username}</b>
            </div>
            <div class="card-body">
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
                    ${tagHTML}
                    </i>
                    
                    
                </div>
            </div>
        </div>`;
    }
  });
}

getPosts();

//Login User
function loginBtnClicked() {
  let username = document.getElementById("username-input").value;
  let password = document.getElementById("password-input").value;
  axios
    .post(`${baseURL}/login`, {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      let modal = document.getElementById("login-modal");
      let modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      setupUI()
      let username = document.getElementById("username");
      username.style.display = "block";
      username.innerHTML = "@" + response.data.user.username;
    });
}

//Show Success Alert
function showSuccessAlert() {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  const alertTrigger = document.getElementById("liveAlertBtn");
  if (alertTrigger) {
    alertTrigger.addEventListener("click", () => {
      appendAlert("Nice, you triggered this alert message!", "success");
    });
  }
}

//Setup Ui
function setupUI() {
  let token = localStorage.getItem('token')
  if(token != null) {
    document.querySelector(".login").style.display = "none";
    document.querySelector(".register").style.display = "none";
    document.querySelector(".logout").style.display = "block";
    document.querySelector(".profile-pic").style.display = "block";
  }
}

//Logout user

function logoutUser() {
  document.querySelector(".login").style.display = "block";
  document.querySelector(".register").style.display = "block";
  document.querySelector(".logout").style.display = "none";
  document.querySelector(".profile-pic").style.display = "none";
  document.getElementById("username").style.display = "none";
}
