
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
document.addEventListener('keydown', function (e) {
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
document.addEventListener('DOMContentLoaded', function () {
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
window.addEventListener('resize', function () {
    // Close mobile drawer if window becomes large
    if (window.innerWidth > 991 && mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
    }
});

let itemCounter = 1;

// Show donation popup
function showDonationPopup() {
    document.getElementById('donationPopup').style.display = 'flex';
    document.getElementById('donationChoice').style.display = 'block';
    document.getElementById('monetaryForm').style.display = 'none';
    document.getElementById('inKindForm').style.display = 'none';
}

// Close donation popup
function closeDonationPopup() {
    document.getElementById('donationPopup').style.display = 'none';
    // Reset forms
    document.getElementById('donationForm').reset();
    document.getElementById('inKindDonationForm').reset();
    // Reset to choice screen
    document.getElementById('donationChoice').style.display = 'block';
    document.getElementById('monetaryForm').style.display = 'none';
    document.getElementById('inKindForm').style.display = 'none';
}

// Select donation type
function selectDonationType(type) {
    document.getElementById('donationChoice').style.display = 'none';

    if (type === 'monetary') {
        document.getElementById('monetaryForm').style.display = 'block';
        document.getElementById('inKindForm').style.display = 'none';
    } else if (type === 'in-kind') {
        document.getElementById('monetaryForm').style.display = 'none';
        document.getElementById('inKindForm').style.display = 'block';
    }
}

// Add another item for in-kind donations
function addAnotherItem() {
    itemCounter++;
    const itemsContainer = document.getElementById('itemsContainer');
    const newItemEntry = document.createElement('div');
    newItemEntry.className = 'item-entry';
    newItemEntry.setAttribute('data-item', itemCounter);

    newItemEntry.innerHTML = `
                <div class="item-row">
                    <div class="item-group">
                        <label class="form-label">Item Name:</label>
                        <input type="text" class="form-input" name="itemName[]" required>
                    </div>
                    <div class="item-group">
                        <label class="form-label">Type:</label>
                        <select class="form-input" name="itemType[]" required>
                            <option value="">Select type</option>
                            <option value="food">Food Supplies</option>
                            <option value="water">Water</option>
                            <option value="clothing">Apparel</option>
                            <option value="medical">Medical Supplies</option>
                            <option value="blankets">Blankets</option>
                            <option value="hygiene">Hygiene Kits</option>
                            <option value="emergency">Emergency Kits</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="item-group quantity-group">
                        <label class="form-label">Quantity:</label>
                        <input type="number" class="form-input" name="itemQuantity[]" min="1" required>
                    </div>
                    <button type="button" class="remove-item-btn" onclick="removeItem(this)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

    itemsContainer.appendChild(newItemEntry);
}

// Remove item entry
function removeItem(button) {
    const itemEntry = button.closest('.item-entry');
    itemEntry.remove();
}

// Handle form submissions
document.getElementById('donationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Monetary donation submitted successfully!');
    closeDonationPopup();
});

document.getElementById('inKindDonationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('In-kind donation submitted successfully!');
    closeDonationPopup();
});

// Add these functions to handle the status drawer
function openStatusDrawer() {
    document.getElementById('statusDrawerOverlay').classList.add('active');
    document.getElementById('statusDrawer').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeStatusDrawer() {
    document.getElementById('statusDrawerOverlay').classList.remove('active');
    document.getElementById('statusDrawer').classList.remove('active');
    document.body.style.overflow = '';
}

// Update the existing event listeners
document.getElementById('statusDrawerOverlay').addEventListener('click', closeStatusDrawer);
document.getElementById('statusDrawerClose').addEventListener('click', closeStatusDrawer);

// Update the existing button to open the status drawer
function openStatusModal() {
    openStatusDrawer();
}