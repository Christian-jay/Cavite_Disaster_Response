const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Add click event to all modal images
document.querySelectorAll(".modal-image").forEach(img => {
    img.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt || "";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
});

// Close modal when X is clicked
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
});

// Close modal when clicking outside the image
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }
});

// Close modal with Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Drawer/Mobile menu functionality
function myFunction() {
    const drawer = document.getElementById("myDrawer");
    const isOpen = drawer.style.width === "250px";
    
    if (isOpen) {
        drawer.style.width = "0";
        document.body.style.overflow = "auto";
    } else {
        drawer.style.width = "250px";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
}

function closeDrawer() {
    document.getElementById("myDrawer").style.width = "0";
    document.body.style.overflow = "auto";
}

// Close drawer when clicking outside
document.addEventListener("click", function(event) {
    const drawer = document.getElementById("myDrawer");
    const hamburger = document.querySelector(".topnav .icon");
    
    if (drawer.style.width === "250px" && 
        !drawer.contains(event.target) && 
        !hamburger.contains(event.target)) {
        closeDrawer();
    }
});

// Form submission handlers
document.querySelector('.section-four-container form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const message = document.querySelector('.message').value;
    
    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Here you would typically send the data to a server
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

document.querySelector('.sign-up-container form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    // Here you would typically send the email to a server
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close drawer if open
        if (window.innerWidth <= 768) {
            closeDrawer();
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Close drawer on desktop
        document.getElementById("myDrawer").style.width = "0";
        document.body.style.overflow = "auto";
    }
});