    const intro1 = document.getElementById('intro1');
    const intro2 = document.getElementById('intro2');
    const controlPanel = document.getElementById('controls');
    const videos = document.querySelectorAll('.stage video');
    const buttons = document.querySelectorAll('.controls img');
    const startButton = document.getElementById('startButton');

     startBtn.addEventListener('click', () => {
      // Stop any current video
      videos.forEach(v => {
        v.pause();
        v.currentTime = 0;
        v.classList.remove('active');
      });

      intro1.classList.add('active');
      intro1.muted = false;
      intro1.play();
    });

    // Hide buttons at start
    controlPanel.style.display = 'none';

      // Step 2: When intro1 ends → play intro2
    intro1.addEventListener('ended', () => {
      intro1.classList.remove('active');
      intro2.classList.add('active');
      intro2.muted = false;
      intro2.play();
    });

    // Step 3: When intro2 ends → show grid buttons
    intro2.addEventListener('ended', () => {
      intro2.classList.remove('active');
      controlPanel.style.display = 'grid';
    });

    // Step 4: Button click → play selected video
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.target;

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





    // const startBtn = document.getElementById('startBtn');
    // const intro1 = document.getElementById('intro1');
    // const intro2 = document.getElementById('intro2');
    // const controlPanel = document.getElementById('controls');
    // const videos = document.querySelectorAll('.stage video');
    // const buttons = document.querySelectorAll('.controls img');

    // // Step 1: Click on Play button to begin intros
    // startBtn.addEventListener('click', () => {
    //   // Stop any current video
    //   videos.forEach(v => {
    //     v.pause();
    //     v.currentTime = 0;
    //     v.classList.remove('active');
    //   });

    //   intro1.classList.add('active');
    //   intro1.muted = false;
    //   intro1.play();
    // });

    // // Step 2: When intro1 ends → play intro2
    // intro1.addEventListener('ended', () => {
    //   intro1.classList.remove('active');
    //   intro2.classList.add('active');
    //   intro2.muted = false;
    //   intro2.play();
    // });

    // // Step 3: When intro2 ends → show grid buttons
    // intro2.addEventListener('ended', () => {
    //   intro2.classList.remove('active');
    //   controlPanel.style.display = 'grid';
    // });

    // // Step 4: Button click → play selected video
    // buttons.forEach(btn => {
    //   btn.addEventListener('click', () => {
    //     const id = btn.dataset.target;

    //     videos.forEach(v => {
    //       v.pause();
    //       v.currentTime = 0;
    //       v.classList.remove('active');
    //     });

    //     const target = document.getElementById(id);
    //     target.classList.add('active');
    //     target.loop = false;
    //     target.muted = true;
    //     target.play();
    //   });
    // });