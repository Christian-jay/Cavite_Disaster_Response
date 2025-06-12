
let currentSort = 'location';
let searchTerm = '';

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

// Event listeners for drawer
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openDrawer);
}

if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
}

if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
}

// Close drawer on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
    }
});

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function (e) {
        searchTerm = e.target.value.toLowerCase();
        filterDisasters();
    });
}

// Sort functionality
function sortBy(criteria) {
    currentSort = criteria;
    console.log(`Sorting by: ${criteria}`);

    // Update active filter for all filter options
    document.querySelectorAll('.filter-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to clicked option
    if (event && event.target) {
        event.target.classList.add('active');
    }

    filterDisasters();
    
    // Close drawer after selection on mobile
    if (window.innerWidth <= 991) {
        closeDrawer();
    }
}

// Filter disasters based on search and sort
function filterDisasters() {
    console.log(`Filtering disasters - Search: "${searchTerm}", Sort: "${currentSort}"`);
    // In a real application, this would filter actual disaster data
}

// Action button handlers
function donate() {
    alert('Redirecting to donation page...');
}

function volunteer() {
    alert('Redirecting to volunteer registration...');
}

function save() {
    alert('Disaster report saved to your account!');
    // Add visual feedback
    const saveBtn = event.target;
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-check me-1"></i>Saved!';
    saveBtn.style.backgroundColor = '#28a745';

    setTimeout(() => {
        saveBtn.innerHTML = originalText;
        saveBtn.style.backgroundColor = '';
    }, 2000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out...');
        closeDrawer();
    }
}

// Progress bar animation
function updateProgress(percentage) {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
        progressBar.setAttribute('aria-valuenow', percentage);
    }
}

// Simulate real-time updates
function simulateUpdates() {
    const donations = ['₱125,000', '₱156,750', '₱189,200', '₱201,500', '₱234,800'];
    const donationElement = document.getElementById('donationValue');
    let currentIndex = 0;

    setInterval(() => {
        if (donationElement) {
            donationElement.textContent = donations[currentIndex % donations.length];
            currentIndex++;

            // Update progress bar
            const newProgress = Math.min(65 + (currentIndex * 5), 95);
            updateProgress(newProgress);

            // Update progress text
            const progressText = document.querySelector('.progress-section small');
            if (progressText) {
                progressText.textContent = `${newProgress}% of goal reached`;
            }
        }
    }, 1000);
}

// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Start simulations
    simulateUpdates();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Set initial active filter
    const locationFilter = document.querySelector('[onclick="sortBy(\'location\')"]');
    if (locationFilter) {
        locationFilter.classList.add('active');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile drawer if window becomes large
    if (window.innerWidth > 991 && mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
    }
});