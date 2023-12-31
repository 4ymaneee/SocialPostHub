// //BASE URL
// const baseURL = "https://tarmeezacademy.com/api/v1";

// //Login User
// function loginBtnClicked() {
//   let username = document.getElementById("username-input").value;
//   let password = document.getElementById("password-input").value;
//   axios
//     .post(`${baseURL}/login`, {
//       username: username,
//       password: password,
//     })
//     .then(function (response) {
//       console.log(response.data.token);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       let modal = document.getElementById("login-modal");
//       let modalInstance = bootstrap.Modal.getInstance(modal);
//       modalInstance.hide();
//       showSuccessAlert("You Have Login successfully");
//       setupUI();
//     })
//     .catch(function (error) {
//       showDangerAlert(error.response.data.message);
//     });
// }

// //Show Success Alert
// function showSuccessAlert(successMessage) {
//   const alertPlaceholder = document.getElementById("succes-alert");
//   const appendAlert = (message, type) => {
//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert" id="deleteSuccesAlert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       "</div>",
//     ].join("");

//     alertPlaceholder.append(wrapper);
//   };
//   appendAlert(successMessage, "success");

//   //Delete Success Alert
//   const alert = bootstrap.Alert.getOrCreateInstance("#deleteSuccesAlert");
//   setTimeout(() => {
//     alert.close();
//   }, 3000);
// }
// //Show Danger Alert
// function showDangerAlert(errorMessage) {
//   const alertPlaceholder = document.getElementById("danger-alert");
//   const appendAlert = (message, type) => {
//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert" id="deleteDangerAlert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       "</div>",
//     ].join("");

//     alertPlaceholder.append(wrapper);
//   };
//   appendAlert(errorMessage, "danger");

//   //Delete Error Alert
//   const alert = bootstrap.Alert.getOrCreateInstance("#deleteDangerAlert");
//   setTimeout(() => {
//     alert.close();
//   }, 3000);
// }

// //Setup Ui
// function setupUI() {
//   //Token
//   let token = localStorage.getItem("token");
//   if (token != null) {
//     document.querySelector(".login").style.display = "none";
//     document.querySelector(".register").style.display = "none";
//     document.querySelector(".logout").style.display = "block";
//     document.querySelector(".profile-pic").style.display = "block";
//     document.querySelector(".new").style.display = "block";
//   }

//   //Username
//   let user = JSON.parse(localStorage.getItem("user"));
//   let username = document.getElementById("username");
//   let profilePic = document.getElementById("imgProfile");
//   if (user != null) {
//     username.style.display = "block";
//     document.getElementById("username").innerHTML = "@" + user.username;
//     //Profile pic
//     profilePic.src = user.profile_image;
//   }
// }
// setupUI();

// //Logout user
// function logoutUser() {
//   showSuccessAlert("You Have Logout successfully");
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   localStorage.removeItem("profilePicture");
//   document.querySelector(".login").style.display = "block";
//   document.querySelector(".register").style.display = "block";
//   document.querySelector(".logout").style.display = "none";
//   document.querySelector(".profile-pic").style.display = "none";
//   username.style.display = "none";
//   document.querySelector(".new").style.display = "none";
// }

// // Register User
// function registerBtnClicked() {
//   let image = document.getElementById("registerImage").files[0];
//   let name = document.getElementById("registerName").value;
//   let username = document.getElementById("registerUsername").value;
//   let password = document.getElementById("registerPassword").value;
//   let formData = {
//     image: image,
//     name: name,
//     username: username,
//     password: password,
//   };

//   axios
//     .post("https://tarmeezacademy.com/api/v1/register", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then(function (response) {
//       let modal = document.getElementById("register-modal");
//       let modalInstance = bootstrap.Modal.getInstance(modal);
//       modalInstance.hide();
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       showSuccessAlert("New User Registered Successfully");
//       setupUI();
//     })
//     .catch(function (error) {
//       showDangerAlert(error.response.data.message);
//     });
// }

// //Create a New Post
// function createBtnClicked() {
//   let title = document.querySelector(".titlePost").value;
//   let body = document.querySelector(".bodyPost").value;
//   let image = document.querySelector(".imagePost").files[0];
//   let token = localStorage.getItem("token");

//   let formData = {
//     title: title,
//     body: body,
//     image: image,
//   };

//   let config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   };

//   axios
//     .post("https://tarmeezacademy.com/api/v1/posts", formData, config)
//     .then(function (response) {
//       console.log("Post created successfully:", response.data);
//       let modal = document.getElementById("new-post-modal");
//       let modalInstance = bootstrap.Modal.getInstance(modal);
//       modalInstance.hide();
//       showSuccessAlert("Post Created Successfully");
//     })
//     .catch(function (error) {
//       let message = error.response.data.message;
//       showDangerAlert(message);
//     });
// }

// //Get Post About
// function GetPostAbout(id) {
//   axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}?limit=1`).then((response) => {
//     let post = response.data.data;
//     let currentPosts = document.getElementById("posts");
//     console.log(post)

//     currentPosts.innerHTML = ''
//     let owner = post.author.username
//     // let id = post.id;
//     let username = post.author.username;
//     let profilePic = post.author.profile_image;
//     let postImage = post.image;
//     let timeCreated = post.created_at;
//     let postTitle = post.title;
//     let body = post.body;
//     let commentsCount = post.comments_count;
//     let emptyTitle = "";
//     if (postTitle == null) {
//       postTitle = emptyTitle;
//     }
//     let tags = post.tags;
//     let tag = "";
//     for (let i = 0; i < tags.length; i++) {
//       tag += `<span class="btn btn-secondary rounded-pill me-1">${tags[i].name}</span>`;
//     }
//     currentPosts.innerHTML += `<h1 class="mt-5 owner" style="font-weight: 700;" >@${owner} Post</h1>
//     <div class="card shadow my-5">
//             <div class="card-header" >
//                 <img src="${profilePic}" alt="" style="width: 40px; height: 40px;"
//                     class="rounded-circle border border-3 profile-pic">
//                 <b >@${username}</b>
//             </div>
//             <div class="card-body" onclick="changeLocation()" style="cursor: pointer;">
//                 <img class="w-100 rounded"
//                     src="${postImage}"
//                     alt="">
//                 <h6 class="mt-2" style="color: grey;">${timeCreated}</h6>
//                 <h5>${postTitle}</h5>
//                 <p>${body}</p>
//                 <hr>
//                 <div>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//                         class="bi bi-pen" viewBox="0 0 16 16">
//                         <path
//                             d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
//                     </svg>
//                     <span class="me-2">(${commentsCount}) comments</span>

//                     <i id="tag-content"> 
//                     ${tag}
//                     </i>

//                 </div>
//             </div>
//         </div>`;
//   });
// }
// GetPostAbout(55);
