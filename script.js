document.addEventListener('DOMContentLoaded', () => {
  
    const intro1 = document.getElementById('intro1');
    const intro2 = document.getElementById('intro2');
    const controlPanel = document.getElementById('controls');
    const allVideos = document.querySelectorAll('.video-item'); // Select all videos with the common class
    const buttons = document.querySelectorAll('.controls img');
    const startButton = document.getElementById('startBtn'); // Corrected ID

    // --- Initial Setup ---
    // Hide all videos and controls initially
    allVideos.forEach(v => {
        v.classList.remove('active');
        v.pause();
        v.currentTime = 0;
    });
    controlPanel.style.display = 'none';
    startButton.style.display = 'block'; // Ensure start button is visible

    // --- Event Listeners ---

    // 1. Click on Start Button: Play intro1
    startButton.addEventListener('click', () => {
        // Hide the start button
        startButton.style.display = 'none';

        // Ensure all videos are reset and inactive
        allVideos.forEach(v => {
            v.classList.remove('active');
            v.pause();
            v.currentTime = 0;
        });

        // Activate and play intro1
        intro1.classList.add('active');
        intro1.muted = false; // Unmute intro1
        intro1.play().catch(error => {
            console.error("Error playing intro1:", error);
            // Fallback for autoplay restrictions: if play fails, immediately go to intro2 or buttons
            // This is a basic fallback, more robust error handling might be needed
            playIntro2(); 
        });
    });

    // 2. When intro1 ends: Play intro2
    intro1.addEventListener('ended', () => {
        intro1.classList.remove('active');
        playIntro2();
    });

    function playIntro2() {
        intro2.classList.add('active');
        intro2.muted = false; // Unmute intro2
        intro2.play().catch(error => {
            console.error("Error playing intro2:", error);
            // Fallback: if play fails, immediately show buttons
            showControlButtons();
        });
    }

    // 3. When intro2 ends: Show control buttons
    intro2.addEventListener('ended', () => {
        intro2.classList.remove('active');
        showControlButtons();
    });

    function showControlButtons() {
        controlPanel.style.display = 'grid'; // Show the grid of buttons
    }

    // 4. Button click: Play selected main video
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.dataset.target;

            // Hide the control panel when a video is selected
            controlPanel.style.display = 'none';

            // Pause and reset all videos
            allVideos.forEach(v => {
                v.pause();
                v.currentTime = 0;
                v.classList.remove('active');
                v.muted = true; // Mute main videos initially
            });

            // Activate and play the selected video
            const targetVideo = document.getElementById(videoId);
            if (targetVideo) {
                targetVideo.classList.add('active');
                targetVideo.loop = false; // Main videos should not loop unless specified
                targetVideo.muted = false; // Unmute selected main video
                targetVideo.play().catch(error => {
                    console.error(`Error playing ${videoId}:`, error);
                    // If playing fails, show controls again (or an error message)
                    showControlButtons(); 
                });

                // When a main video ends, show the control buttons again
                targetVideo.addEventListener('ended', () => {
                    targetVideo.classList.remove('active');
                    showControlButtons();
                }, { once: true }); // Use { once: true } so the event listener is removed after it fires once
            }
        });
    });
});