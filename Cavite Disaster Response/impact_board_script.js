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

        mobileMenuBtn?.addEventListener('click', openDrawer);
        drawerClose?.addEventListener('click', closeDrawer);
        drawerOverlay?.addEventListener('click', closeDrawer);

        // Tab functionality
        function showDisaster(type) {
            // Remove active class from all cards
            document.querySelectorAll('.disaster-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Add active class to clicked card
            event.target.closest('.disaster-card').classList.add('active');
            
            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const targetContent = type === 'fire' ? 'fireContent' : 'floodContent';
            document.getElementById(targetContent).classList.add('active');
        }
        