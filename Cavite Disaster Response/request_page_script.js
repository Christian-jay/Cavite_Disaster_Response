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

mobileMenuBtn?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawerOverlay?.addEventListener('click', closeDrawer);

// Image upload functionality
const imageUploadArea = document.getElementById('imageUploadArea');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');

imageUploadArea?.addEventListener('click', () => {
    imageInput.click();
});

imageUploadArea?.addEventListener('dragover', (e) => {
    e.preventDefault();
    imageUploadArea.classList.add('dragover');
});

imageUploadArea?.addEventListener('dragleave', () => {
    imageUploadArea.classList.remove('dragover');
});

imageUploadArea?.addEventListener('drop', (e) => {
    e.preventDefault();
    imageUploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleImageUpload(files[0]);
    }
});

imageInput?.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
    }
});

function handleImageUpload(file) {
    if (file && file.type.startsWith('image/')) {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert('File size must be less than 10MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            imageUploadArea.classList.add('hidden');
            imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file');
    }
}

function removeImage() {
    imageInput.value = '';
    previewImage.src = '';
    imageUploadArea.classList.remove('hidden');
    imagePreview.classList.add('hidden');
}

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Add search logic here - could filter saved posts or requests
    console.log('Searching for:', searchTerm);
});

// Form submission
document.getElementById('requestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('locationSelected').getAttribute('data-value');
    const category = document.getElementById('categorySelected').getAttribute('data-value');
    const hasImage = !imagePreview.classList.contains('hidden');
    
    // Validate required fields
    if (!title.trim()) {
        alert('Please enter a title');
        return;
    }
    
    if (!description.trim()) {
        alert('Please enter a description');
        return;
    }
    
    if (!location || location === 'Select Location') {
        alert('Please select a location');
        return;
    }
    
    if (!category || category === 'Select Category') {
        alert('Please select a category');
        return;
    }
    
    // Create request object
    const requestData = {
        title: title.trim(),
        description: description.trim(),
        location: location,
        category: category,
        hasImage: hasImage,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    console.log('Submitting request:', requestData);
    
    // Show success message
    alert('Request submitted successfully!');
    
    // Reset form
    document.getElementById('requestForm').reset();
    document.getElementById('locationSelected').textContent = 'Select Location';
    document.getElementById('categorySelected').textContent = 'Select Category';
    document.getElementById('locationSelected').removeAttribute('data-value');
    document.getElementById('categorySelected').removeAttribute('data-value');
    removeImage();
});

// Add some interactivity to saved posts
document.querySelectorAll('.saved-post-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.textContent.trim();
        const postTitle = btn.closest('.saved-post-item').querySelector('.saved-post-title').textContent;
        
        if (action === 'Donate') {
            alert(`Redirecting to donation page for: ${postTitle}`);
            // Here you would typically redirect to a donation page
        } else if (action === 'Volunteer') {
            alert(`Signing up to volunteer for: ${postTitle}`);
            // Here you would typically open a volunteer form or redirect
        }
    });
});

// Personal menu items in mobile drawer
document.querySelectorAll('.personal-menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const action = item.textContent.trim();
        alert(`Opening ${action} page...`);
        closeDrawer();
    });
});

// Logout functionality
document.querySelectorAll('.btn-logout').forEach(btn => {
    btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            alert('Logging out...');
            // Here you would typically handle the logout process
        }
    });
});

// Status badges interactivity
document.querySelectorAll('.status-badge').forEach(badge => {
    badge.addEventListener('click', () => {
        const status = badge.textContent.trim().toLowerCase();
        const itemTitle = badge.closest('.status-item').querySelector('.status-item-title').textContent;
        alert(`Request "${itemTitle}" is currently ${status}`);
    });
});

// Add some visual feedback for form interactions
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Console log for debugging
console.log('Cavite Disaster Response - Request Page Initialized');