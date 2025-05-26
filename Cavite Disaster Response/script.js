const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".modal-image").forEach(img => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  });
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function myFunction() {
  const drawer = document.getElementById("myDrawer");
  if (drawer.style.width === "250px") {
    drawer.style.width = "0";
  } else {
    drawer.style.width = "250px"; // Drawer width when open
  }
}

function closeDrawer() {
  document.getElementById("myDrawer").style.width = "0";
}
