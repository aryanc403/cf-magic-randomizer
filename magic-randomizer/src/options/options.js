import * as settings from '../util/settings.js';

async function setup() {
  const ratingDistributionForm = document.getElementById("rating-distribution-form");
  const shuffleUsernames = document.querySelector('#shuffle-usernames');

  async function update() {
    shuffleUsernames.checked = await settings.shuffleUsernames();
    const ratingDistributionData = await settings.ratingDistribution()
    await populateRatingDistributionFormData(ratingDistributionData);
  }

  ratingDistributionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await settings.ratingDistribution(getRatingDistributionFormData());
    await update();
  });

  shuffleUsernames.addEventListener('input', async () => {
    await settings.shuffleUsernames(shuffleUsernames.checked);
    await update();
  });

  await update();
}

document.addEventListener('DOMContentLoaded', setup);

const readNumber = (id) => {
  return document.getElementById(id)?.value||0;
}

const updateValue = (id,value) => {
  document.getElementById(id).value=value;
}

const getRatingDistributionFormData = () => ({
  touristPercent:readNumber('tourist-percent'),
  lgmPercent:readNumber('lgm-percent'),
  igmPercent:readNumber('igm-percent'),
  gmPercent:readNumber('gm-percent'),
  imPercent:readNumber('im-percent'),
  masterPercent:readNumber('master-percent'),
  cmPercent:readNumber('cm-percent'),
  expertPercent:readNumber('expert-percent'),
  specialistPercent:readNumber('specialist-percent'),
  pupilPercent:readNumber('pupil-percent'),
  newbiePercent:readNumber('newbie-percent'),
});

const populateRatingDistributionFormData = (data) => {
  console.log('data',data);
  updateValue('tourist-percent',data.touristPercent);
  updateValue('lgm-percent',data.lgmPercent);
  updateValue('igm-percent',data.igmPercent);
  updateValue('gm-percent',data.gmPercent);
  updateValue('im-percent',data.imPercent);
  updateValue('master-percent',data.masterPercent);
  updateValue('cm-percent',data.cmPercent);
  updateValue('expert-percent',data.expertPercent);
  updateValue('specialist-percent',data.specialistPercent);
  updateValue('pupil-percent',data.pupilPercent);
  updateValue('newbie-percent',data.newbiePercent);
};