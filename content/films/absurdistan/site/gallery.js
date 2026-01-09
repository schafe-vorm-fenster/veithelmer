// Gallery configuration
const images = [
    '00_start.jpg',
    '01_ispiration.jpg',
    '02_sirt.jpg',
    '03_tsunami.jpg',
    '04_scouting.jpg',
    '05_lahic1.jpg',
    '06_lahic2.jpg',
    '07_hotel.jpg',
    '08_caycaragojunu.jpg',
    '09_seki.jpg',
    '10_caravanserai.jpg',
    '11_casting.jpg',
    '12_main_actors.jpg',
    '13_child_actors.jpg',
    '14_supporting_actors.jpg',
    '15_supporting_actrices.jpg',
    '16_production_team.jpg',
    '17_workshop_baku.jpg',
    '18_workshop_tbilisi.jpg',
    '19_transport.jpg',
    '20_storyboard.jpg',
    '21_rocket.jpg',
    '22_set_design.jpg',
    '23_costumes.jpg',
    '24_shooting_1.jpg',
    '25_shooting_2.jpg',
    '26_shooting_3.jpg',
    '27_shooting_4.jpg',
    '28_shooting_5.jpg',
    '29_cave.jpg',
    '30_making-of.jpg',
    '31_babies.jpg',
    '32_story_1.jpg',
    '33_story_2.jpg',
    '34_story_3.jpg',
    '35_story_4.jpg',
    '36_story_5.jpg',
    '37_story_6.jpg',
    '38_story_7.jpg',
    '39_story_8.jpg',
    '40_story_9.jpg',
    '41_story_10.jpg',
    '42_story_11.jpg',
    '43_story_12.jpg',
    '44_story_13.jpg',
    '45_story_14.jpg',
    '46_story_15.jpg',
    '47_story_16.jpg',
    '48_story_17.jpg',
    '49_story_18.jpg',
    '50_story_19.jpg',
    '51_story_20.jpg',
    '52_story_21.jpg',
    '53_story_22.jpg',
    '54_story_23.jpg',
    '55_story_24.jpg',
    '56_story_25.jpg',
    '57_story_26.jpg',
    '58_story_27.jpg',
    '59_story_28.jpg',
    '60_story_29.jpg',
    '61_story_30.jpg',
    '62_story_31.jpg',
    '63_story_32.jpg',
    '64_story_33.jpg',
    '65_story_34.jpg',
    '66_story_35.jpg',
    '67_story_36.jpg',
    '68_story_37.jpg',
    '69_story_38.jpg',
    '70_story_39.jpg',
    '71_story_40.jpg',
    '72_story_41.jpg',
    '73_story_42.jpg',
    '74_story_43.jpg',
    '75_story_44.jpg',
    '76_story_45.jpg',
    '77_story_46.jpg',
    '78_story_47.jpg',
    '79_story_48.jpg',
    '80_story_49.jpg',
    '81_story_50.jpg',
    '82_story_51.jpg',
    '83_story_52.jpg',
    '84_story_53.jpg',
    '85_story_54.jpg',
    '86_editing.jpg',
    '87_vfx.jpg',
    '88_music_1.jpg',
    '89_music_2.jpg',
    '90_music_3.jpg',
    '91_music_4.jpg',
    '92_sundance.jpg',
    '93_lola.jpg'
];

let currentIndex = 0;

// DOM elements
const galleryImage = document.getElementById('gallery-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentIndexEl = document.getElementById('current-index');
const totalImagesEl = document.getElementById('total-images');

// Initialize
totalImagesEl.textContent = images.length;
loadImage(currentIndex);

// Load image
function loadImage(index) {
    galleryImage.classList.add('loading');
    const imagePath = `img/${images[index]}`;
    
    // Preload image
    const img = new Image();
    img.onload = function() {
        galleryImage.src = imagePath;
        galleryImage.classList.remove('loading');
        currentIndexEl.textContent = index + 1;
    };
    img.src = imagePath;
    
    // Preload next image
    if (index < images.length - 1) {
        const nextImg = new Image();
        nextImg.src = `img/${images[index + 1]}`;
    }
}

// Navigation functions
function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    loadImage(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    loadImage(currentIndex);
}

// Event listeners
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
});

// Click on image to advance
galleryImage.addEventListener('click', (e) => {
    const rect = galleryImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // If clicked on left half, go previous; right half, go next
    if (x < rect.width / 2) {
        showPrev();
    } else {
        showNext();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        showNext();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

galleryImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

galleryImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        showNext();
    }
    if (touchEndX - touchStartX > 50) {
        showPrev();
    }
}
