window.onload = () => {
  let workoutType = 'daily';
  let userData;
  function capitalizeWord(str) {
    return str.charAt(0).toUpperCase().concat(str.slice(1));
  }
  fetch('./data.json')
    .then((data) => data.json())
    .then((data) => (userData = data))
    .then(() => renderData(userData));

  document.querySelectorAll('.links-list a').forEach((item) => {
    item.addEventListener('click', (e) => {
      document.querySelectorAll('.links-list a').forEach((item) => {
        item.classList.remove('active');
      });
      workoutType = e.target.innerHTML.toLowerCase();
      e.target.classList.add('active');
      renderData(userData);
    });
  });

  function updateCard(data, key) {
    type = data.timeframes[workoutType];
    document.querySelector(
      `.app-${key} .data-hrs`
    ).innerHTML = `${type.current} Hrs`;
    document.querySelector(`.app-${key} .data-info`).innerHTML =
      workoutType === 'daily'
        ? `Yesterday ${type.previous} Hrs`
        : `Last ${capitalizeWord(workoutType.split('ly')[0])} - ${
            type.previous
          } Hrs`;
  }
  function renderData(dataList) {
    dataList.map((data) => {
      switch (data.title) {
        case 'Work':
          updateCard(data, 'work');
          break;
        case 'Play':
          updateCard(data, 'play');
          break;
        case 'Study':
          updateCard(data, 'study');
          break;
        case 'Exercise':
          updateCard(data, 'exercise');
          break;
        case 'Social':
          updateCard(data, 'social');
          break;
        case 'Self Care':
          updateCard(data, 'self');
          break;
      }
    });
  }
};
