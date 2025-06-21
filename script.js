 const intro1 = document.getElementById('intro1');
    const intro2 = document.getElementById('intro2');
    const controlPanel = document.getElementById('controls');
    const videos = document.querySelectorAll('.stage video');
    const buttons = document.querySelectorAll('.controls img');

    // Hide buttons at start
    controlPanel.style.display = 'none';

    // Step 1: when intro1 ends, play intro2
    intro1.addEventListener('ended', () => {
      intro1.classList.remove('active');
      intro2.classList.add('active');
      intro2.play();
    });

    // Step 2: when intro2 ends, show buttons
    intro2.addEventListener('ended', () => {
      // intro2.classList.remove('active');
      controlPanel.style.display = 'grid';
    });

    // Step 3: handle video switching via buttons
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.target;

        // Stop all videos
        videos.forEach(v => {
          v.pause();
          v.currentTime = 0;
          v.classList.remove('active');
        });

        const target = document.getElementById(id);
        target.classList.add('active');
        target.loop = false;
        target.muted = true;
        target.play();
      });
    });