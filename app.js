$(function () {
  // your code here
  let userid = 1;

  // h3 slide
  $(".posts h3").click(function () {
    $(".posts ul").slideToggle();
  });
  $(".todos h3").click(function () {
    $(".todos ul").slideToggle();
  });

  // get user function
  function getUser(userid) {
    $.ajax({
      url: `https://dummyjson.com/users/${userid}`,
      type: "GET",
      success: function (response) {
        let user = response;
        console.log(user);
        // posts title
        const postsTitle = document.querySelector(".posts h3");
        postsTitle.textContent = user.firstName + "'s Posts";

        // todos title
        const todosTitle = document.querySelector(".todos h3");
        todosTitle.textContent = user.firstName + "'s To Dos";

        // display user image
        const img = document.querySelector(".info__image img");
        img.src = user.image;

        // display user info
        const name = document.createElement("div");
        name.innerHTML = "<h1>" + user.firstName + " " + user.lastName + "</h1>";
        const age = document.createElement("div");
        age.innerHTML = "<strong>Age:</strong> " + user.age;
        const email = document.createElement("div");
        email.innerHTML = "<strong>Email:</strong> " + user.email;
        const phone = document.createElement("div");
        phone.innerHTML = "<strong>Phone:</strong> " + user.phone;

        const infoContent = document.querySelector(".info__content");
        infoContent.innerHTML = "";
        infoContent.appendChild(name);
        infoContent.appendChild(age);
        infoContent.appendChild(email);
        infoContent.appendChild(phone);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // get posts function
  function getPosts(userid) {
    $.ajax({
      url: `https://dummyjson.com/users/${userid}/posts`,
      type: "GET",
      success: function (response) {
        // posts list
        const postsList = document.querySelector(".posts ul");
        const listItem = document.createElement("li");
        postsList.innerHTML = "";
        console.log(response.posts.length);

        if (response.posts.length == 0) {
          console.log("User has no posts");

          listItem.textContent = "User has no posts";
          postsList.appendChild(listItem);
          return;
        }
        let postsData = response.posts;
        console.log(postsData);

        postsData.forEach((post) => {
          const postItem = document.createElement("div");
          postItem.innerHTML = "<h4>" + post.title + "</h4>";

          const postContent = document.createElement("div");
          postContent.textContent = post.body;

          listItem.appendChild(postItem);
          listItem.appendChild(postContent);
          postsList.appendChild(listItem);

          postItem.addEventListener("click", function () {
            openModal(post.id);
          });
        });
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // get todos function
  function getTodos(userid) {
    $.ajax({
      url: `https://dummyjson.com/users/${userid}/todos`,
      type: "GET",
      success: function (response) {
        let todos = response.todos;
        console.log(todos);
        // todos list
        const todosList = document.querySelector(".todos ul");
        const listItem = document.createElement("li");

        todosList.innerHTML = "";

        if (todos.length == 0) {
          console.log("User has no todos");

          listItem.textContent = "User has no todos";
          todosList.appendChild(listItem);
          return;
        }
        todos.forEach((todo) => {
          listItem.textContent = todo.todo;
          todosList.appendChild(listItem);
        });
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  // get posts for the modal function
  function openModal(postId) {
    const modal = document.createElement("div");
    const button = document.createElement("button");
    const overlay = document.createElement("div");

    overlay.className = "overlay";
    modal.className = "modal";
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    $.ajax({
      url: `https://dummyjson.com/posts/${postId}`,
      type: "GET",
      success: function (response) {
        let post = response;
        console.log(post);
        modal.innerHTML = "<h1>" + post.title + "</h1>";
        modal.innerHTML += "<p>" + post.body + "</p>";
        modal.innerHTML += "<p>" + "Views: " + post.views + "</p>";
        modal.appendChild(button);
        modal.style.display = "flex";
      },
      error: function (error) {
        console.log(error);
      },
    });

    button.textContent = "Close Modal";
    button.onclick = function () {
      modal.style.display = "none";
      // document.body.removeChild(modal);
      document.body.removeChild(overlay);
    };
    window.onclick = function (event) {
      if (event.target == overlay) {
        modal.style.display = "none";
        // document.body.removeChild(modal);
        document.body.removeChild(overlay);
      }
    };
  }

  // initial user
  getUser(userid);
  getPosts(userid);
  getTodos(userid);

  const nextButton = document.querySelector("header button:last-child");
  nextButton.addEventListener("click", function () {
    userid = (userid % 30) + 1;
    getUser(userid);
    getPosts(userid);
    getTodos(userid);
  });

  const prevButton = document.querySelector("header button:first-child");
  prevButton.addEventListener("click", function () {
    userid = userid - 1 === 0 ? 30 : userid - 1;
    getUser(userid);
    getPosts(userid);
    getTodos(userid);
  });
});
