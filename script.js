document.addEventListener('DOMContentLoaded', () => {
    const introVideo = document.getElementById('intro1'); // Now refers to the single intro video
    const controlPanel = document.getElementById('controls');
    const allVideos = document.querySelectorAll('.video-item'); // Select all videos with the common class
    const buttons = document.querySelectorAll('.controls img');
    const startButton = document.getElementById('startBtn');

    // --- Initial Setup ---
    // Hide all videos except the intro video, and ensure they are reset
    allVideos.forEach(v => {
        if (v.id !== 'intro1') {
            v.classList.remove('active');
            v.pause();
            v.currentTime = 0;
        }
    });

    // Make the intro video active and paused from the start
    introVideo.classList.add('active');
    introVideo.muted = true; // Ensure intro is muted initially
    introVideo.pause(); // Ensure intro is paused
    introVideo.currentTime = 0; // Start intro from the beginning

    // Hide control panel initially
    controlPanel.style.display = 'none';
    
    // Ensure start button is visible
    startButton.style.display = 'block'; 

    // --- Event Listeners ---

    // 1. Click on Start Button: Play the single intro video
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';

        // Ensure only the intro video is active before playing it
        allVideos.forEach(v => {
            if (v.id !== 'intro1') {
                v.classList.remove('active');
                v.pause();
                v.currentTime = 0;
            }
        });

        introVideo.muted = false; // Unmute intro video when playing
        introVideo.play().catch(error => {
            console.error("Error playing intro video:", error);
            // Fallback for autoplay restrictions: if play fails, immediately show buttons
            showControlButtons(); 
        });
    });

    // 2. When the intro video ends: Show control buttons, keeping intro video visible
    introVideo.addEventListener('ended', () => {
        // We DO NOT remove 'active' from introVideo, so it stays visible
        introVideo.pause(); // Ensure intro video is paused on its last frame
        showControlButtons(); // Show control buttons immediately
    });

    function showControlButtons() {
        controlPanel.style.display = 'grid';
    }

    // 3. Button click: Play selected main video
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.dataset.target;

            // Pause and reset all videos, except the intro video which should remain active
            allVideos.forEach(v => {
                if (v.id !== 'intro1' && v.id !== videoId) { // Do not reset intro or the target video
                    v.pause();
                    v.currentTime = 0;
                    v.classList.remove('active');
                    v.muted = true;
                }
            });
            
            // If the intro video was active, ensure it's muted and paused but remains visible
            if (introVideo.classList.contains('active')) {
                introVideo.muted = true;
                introVideo.pause();
            }

            // Hide the control panel immediately
            controlPanel.style.display = 'none';

            // Activate and play the selected video
            const targetVideo = document.getElementById(videoId);
            if (targetVideo) {
                targetVideo.classList.add('active'); // Will fade in
                targetVideo.loop = false; // Main videos should not loop unless specified
                targetVideo.muted = false; // Unmute selected main video
                targetVideo.play().catch(error => {
                    console.error(`Error playing ${videoId}:`, error);
                    // If playing fails, show controls again immediately
                    showControlButtons(); 
                });

                // When a main video ends, show the control buttons again
                targetVideo.addEventListener('ended', () => {
                    targetVideo.classList.remove('active'); // Immediately fade out the main video
                    
                    // After main video fades out, ensure the intro video is the background again
                    if (!introVideo.classList.contains('active')) {
                        introVideo.classList.add('active'); // Make sure introVideo is active again
                        introVideo.muted = true; // Keep it muted
                        introVideo.pause(); // Keep it paused
                    }
                    showControlButtons(); // Show controls immediately
                }, { once: true });
            }
        });
    });
});