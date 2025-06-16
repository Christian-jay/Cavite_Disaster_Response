// Mobile drawer functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// Disaster content switching
function showDisaster(type) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove active class from all disaster cards
    const disasterCards = document.querySelectorAll('.disaster-card');
    disasterCards.forEach(card => card.classList.remove('active'));

    const drawerCards = document.querySelectorAll('.drawer-impact-card');
    drawerCards.forEach(card => card.classList.remove('active'));

    // Show selected content
    if (type === 'fire') {
        document.getElementById('fireContent').classList.add('active');
        document.querySelector('.disaster-card').classList.add('active');
        document.querySelector('.drawer-impact-card').classList.add('active');
    } else if (type === 'flood') {
        document.getElementById('floodContent').classList.add('active');
        document.querySelector('.disaster-card:nth-child(3)').classList.add('active');
        document.querySelector('.drawer-impact-card:nth-child(2)').classList.add('active');
    }

    // Close mobile drawer after selection
    closeDrawer();
}

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const disasterCards = document.querySelectorAll('.disaster-card');

    disasterCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const details = card.querySelectorAll('.disaster-details span');
        let detailsText = '';
        details.forEach(detail => detailsText += detail.textContent.toLowerCase() + ' ');

        if (title.includes(searchTerm) || detailsText.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Initialize with fire content active
document.addEventListener('DOMContentLoaded', function () {
    showDisaster('fire');
});