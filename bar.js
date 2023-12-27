const progress = document.getElementById('progress');
const birthYearBtn = document.getElementById('birthYearBtn');
const activityBtn = document.getElementById('activityBtn');
const firstHitYearBtn = document.getElementById('firstHitYearBtn');
const superBowlYearBtn = document.getElementById('superBowlYearBtn');
const timelineDescription = document.getElementById('timelineDescription');

const birthYear = 2006;
const activity = 2008;
const firstHitYear = 2009;
const superBowlYear = 2017;

birthYearBtn.addEventListener('click', () => {
  updateProgress(20);
  showDescription("Lady Gaga was 'born this way' in " + birthYear);
  const imageSrc = 'lg.jpg';
        changeBackgroundToImage(imageSrc);
});

activityBtn.addEventListener('click', () => {
  updateProgress(48.39);
  showDescription("Lady Gaga released her debut album in " + activity + "," + " Called 'The Fame'");
});

firstHitYearBtn.addEventListener('click', () => {
  updateProgress(70.97);
  showDescription("Lady Gaga's debut album wins her a grammy " + firstHitYear);
});

superBowlYearBtn.addEventListener('click', () => {
  updateProgress(100);
  showDescription("Lady Gaga performed at the Super Bowl in " + superBowlYear);
});

function updateProgress(percent) {
  progress.style.width = percent + '%';
}

function showDescription(description) {
  timelineDescription.textContent = description;
}
