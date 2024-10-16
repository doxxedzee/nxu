document.addEventListener('DOMContentLoaded', () => {
    const initialGifWrapper = document.getElementById('initialgifwrapper');
    const music = document.getElementById('music');
    const songs = ["./assets/users/harm/a.mp3"];
    let audioStarted = false;

    function getRandomSong() {
        return songs[Math.floor(Math.random() * songs.length)];
    }

    function playRandomSong() {
        const song = getRandomSong();
        music.src = song;
        music.play();
    }

    window.onload = function () {
        const initialGifWrapper = document.getElementById('initialgifwrapper');
        const music = document.getElementById('music');

        // Wait for the animation to finish before hiding the initial GIF
        initialGifWrapper.addEventListener('click', () => {
            music.play();
            initialGifWrapper.classList.add('fadeout');
            setTimeout(() => {
                initialGifWrapper.style.display = 'none';
            }, 1000);
        });
    };

    music.addEventListener('ended', playRandomSong);

    document.body.addEventListener('click', () => {
        if (!audioStarted) {
            playRandomSong();
            audioStarted = true;
        }
    });

    function createDiv(height, width) {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.height = `${height}px`;
        div.style.width = `${width}px`;
        div.style.overflow = "hidden";
        return div;
    }

    function randomColor() {
        const c = [255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
        c.sort(() => Math.random() - 0.5);
        return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }

    function updateScroll() {
        const docEl = document.documentElement;
        scrollY = window.pageYOffset || docEl.scrollTop || document.body.scrollTop;
        scrollX = window.pageXOffset || docEl.scrollLeft || document.body.scrollLeft;
    }

    function updateSize() {
        const docEl = document.documentElement;
        width = window.innerWidth || docEl.clientWidth || document.body.clientWidth;
        height = window.innerHeight || docEl.clientHeight || document.body.clientHeight;
    }

    let mouseX = 400, oldMouseX = 400, mouseY = 300, oldMouseY = 300;
    let width = 800, height = 600, scrollX = 0, scrollY = 0;
    const maxSparkles = 100;
    const tiny = [], star = [], starVisibility = [], starX = [], starY = [], tinyX = [], tinyY = [], tinyVisibility = [];

    for (let i = 0; i < maxSparkles; i++) {
        const tinyDiv = createDiv(3, 3);
        tinyDiv.style.visibility = "hidden";
        tinyDiv.style.zIndex = "999";
        document.body.appendChild(tiny[i] = tinyDiv);
        starVisibility[i] = 0;
        tinyVisibility[i] = 0;

        const starDiv = createDiv(5, 5);
        starDiv.style.backgroundColor = "transparent";
        starDiv.style.visibility = "hidden";
        starDiv.style.zIndex = "999";
        const horizontal = createDiv(1, 5);
        const vertical = createDiv(5, 1);
        horizontal.style.top = "2px";
        horizontal.style.left = "0px";
        vertical.style.top = "0px";
        vertical.style.left = "2px";
        starDiv.appendChild(horizontal);
        starDiv.appendChild(vertical);
        document.body.appendChild(star[i] = starDiv);
    }

    function sparkle() {
        if (Math.abs(mouseX - oldMouseX) > 1 || Math.abs(mouseY - oldMouseY) > 1) {
            oldMouseX = mouseX;
            oldMouseY = mouseY;
            for (let c = 0; c < maxSparkles; c++) {
                if (!starVisibility[c]) {
                    star[c].style.left = `${(starX[c] = mouseX)}px`;
                    star[c].style.top = `${(starY[c] = mouseY + 1)}px`;
                    star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                    const color = "grey";
                    star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = (color === "random") ? randomColor() : color;
                    star[c].style.visibility = "visible";
                    starVisibility[c] = 50;
                    break;
                }
            }
        }
        for (let c = 0; c < maxSparkles; c++) {
            if (starVisibility[c]) starAction(c);
            if (tinyVisibility[c]) tinyAction(c);
        }

        setTimeout(sparkle, 40);
    }

    function starAction(i) {
        if (--starVisibility[i] === 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
        if (starVisibility[i]) {
            starY[i] += 1 + Math.random() * 3;
            starX[i] += (i % 5 - 2) / 5;
            if (starY[i] < height + scrollY) {
                star[i].style.top = `${starY[i]}px`;
                star[i].style.left = `${starX[i]}px`;
            } else {
                star[i].style.visibility = "hidden";
                starVisibility[i] = 0;
            }
        } else {
            tinyVisibility[i] = 50;
            tiny[i].style.top = `${tinyY[i] = starY[i]}px`;
            tiny[i].style.left = `${tinyX[i] = starX[i]}px`;
            tiny[i].style.width = "2px";
            tiny[i].style.height = "2px";
            tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
            star[i].style.visibility = "hidden";
            tiny[i].style.visibility = "visible";
        }
    }

    function tinyAction(i) {
        if (--tinyVisibility[i] === 25) {
            tiny[i].style.width = "1px";
            tiny[i].style.height = "1px";
        }
        if (tinyVisibility[i]) {
            tinyY[i] += 1 + Math.random() * 3;
            tinyX[i] += (i % 5 - 2) / 5;
            if (tinyY[i] < height + scrollY) {
                tiny[i].style.top = `${tinyY[i]}px`;
                tiny[i].style.left = `${tinyX[i]}px`;
            } else {
                tiny[i].style.visibility = "hidden";
                tinyVisibility[i] = 0;
            }
        } else {
            tiny[i].style.visibility = "hidden";
        }
    }

    document.onmousemove = (e) => {
        mouseY = e.pageY;
        mouseX = e.pageX;
    };

    const audioPlayer = document.getElementById('music');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const goBackBtn = document.getElementById('goBackBtn');
    const skipBtn = document.getElementById('skipBtn');
    const muteBtn = document.getElementById('muteBtn');
    let isPlaying = false;
    let isMuted = false;
    
    let currentSongIndex = 0;
    audioPlayer.src = songs[currentSongIndex];
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    // Previous song (go back)
    goBackBtn.addEventListener('click', () => {
        if (currentSongIndex > 0) {
            currentSongIndex--;
        } else {
            currentSongIndex = songs.length - 1; // Loop back to the last song if at the start
        }
        audioPlayer.src = songs[currentSongIndex];
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    skipBtn.addEventListener('click', playRandomSong);
    
    muteBtn.addEventListener('click', () => {
        if (isMuted) {
            audioPlayer.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audioPlayer.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        isMuted = !isMuted;
    });

    window.onscroll = updateScroll;
    window.onresize = updateSize;
    updateSize();
    sparkle();

    const badges = document.querySelectorAll('.badge');

    badges.forEach(badge => {
        let titleText = badge.getAttribute('title');

        badge.addEventListener('mouseenter', () => {
            badge.setAttribute('data-title', titleText); // Store the title in a custom attribute
            badge.removeAttribute('title'); // Remove the title attribute
        });

        // Restore the title attribute on mouseleave
        badge.addEventListener('mouseleave', () => {
            badge.setAttribute('title', badge.getAttribute('data-title')); // Restore the title attribute
            badge.removeAttribute('data-title'); // Remove the custom attribute
        });
    });

    async function fetchDiscordPresence() {
        const userId = '1141550188985602129'; // Replace with your Discord User ID
        const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;
    
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            const discordStatusDiv = document.getElementById('discord-status');
            const userAvatar = `https://cdn.discordapp.com/avatars/${userId}/${data.data.discord_user.avatar}.png`;
    
            const statusIcons = {
                online: `<img src="./assets/discord-icons/online.webp" width="15" height="15" alt="Online">`,
                idle: `<img src="./assets/discord-icons/idle.png" width="15" height="15" alt="Idle">`,
                dnd: `<img src="../assets/discord-icons/dnd.webp" width="15" height="15" alt="Do Not Disturb">`,
                offline: `<img src="./assets/discord-icons/offline.webp" width="15" height="15" alt="Offline">`,
            };
    
            const statusIcon = statusIcons[data.data.discord_status] || statusIcons.offline;
    
            let activityContent = '';
            if (data.data.discord_status !== 'offline') { // Check if the user is not offline
                if (data.data.activities.length > 0) {
                    // Filter out custom status activities
                    const activities = data.data.activities.filter(act => act.type !== 4);
    
                    if (activities.length > 0) {
                        // Check for game activity or Spotify
                        const streamingActivity = activities.find(act => act.type === 1); // Check for streaming activity
                        const activity = streamingActivity || activities.find(act => act.name !== 'Spotify') || activities[0];
    
                        if (streamingActivity) {
                            activityContent = `
                                <div class="activity">
                                    <div class="text-content">
                                        <p><span class="glow">Streaming</span> ${streamingActivity.name}</p>
                                        <p>${streamingActivity.details}</p>
                                    </div>
                                </div>
                            `;
                        } else if (activity.name === 'Spotify') {
                            const spotifyCover = activity.assets.large_image
                                ? `https://i.scdn.co/image/${activity.assets.large_image.split(':')[1]}`
                                : './assets/spotify-placeholder.png'; // Fallback image
    
                            activityContent = `
                                <div class="activity">
                                    <div class="text-content">
                                        <p><span class="glow">Listening to</span> ${activity.details}</p>
                                        <p>by ${activity.state}</p>
                                    </div>
                                    <img src="${spotifyCover}" alt="Spotify Cover" class="activity-image">
                                </div>
                            `;
                        } else {
                            const activityImage = activity.assets.large_image
                                ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                                : './assets/activity-placeholder.png'; // Fallback image
    
                            activityContent = `
                                <div class="activity">
                                    <div class="text-content">
                                        <p><span class="glow">Playing</span> ${activity.name}</p>
                                        <p>${activity.details}</p>
                                    </div>
                                    <img src="${activityImage}" alt="${activity.name}" class="activity-image">
                                </div>
                            `;
                        }
                    }
                }
            }
    
            discordStatusDiv.innerHTML = `
                <div class="avatar-container">
                    <img src="${userAvatar}" alt="User Avatar" class="avatar" style="outline: 2px solid #FFF;">
                    <span class="status-icon">${statusIcon}</span>
                </div>
                <div class="text-container">
                    <a class="username" style="color: #FFD700; font-weight: bold; background-image: url('./assets/main-page/gold.gif'); background-size: cover;">${data.data.discord_user.username} <span class="role">[Swatting]</span></a>
                    ${activityContent}
                </div>
            `;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Display offline avatar if there's an error
            const offlineAvatar = `
                <div style="position: relative; display: inline-block;">
                    <img src="offline-avatar.png" alt="User Offline" style="width: 50px; height: 50px; border-radius: 50%;">
                    <div style="position: absolute; bottom: 0; right: 0; width: 15px; height: 15px;">
                        ${statusIcons.offline}
                    </div>
                </div>
            `;
            discordStatusDiv.innerHTML = offlineAvatar;
        }
    }
    

    fetchDiscordPresence();
    setInterval(fetchDiscordPresence, 10000);
});