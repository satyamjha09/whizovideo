const videos = document.querySelectorAll('.stage video');
    const buttons = document.querySelectorAll('.controls img');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.target;
        videos.forEach(v => {
          v.classList.toggle('active', v.id === id);
        });
      });
    });