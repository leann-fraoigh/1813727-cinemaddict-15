import dayjs from 'dayjs';
// eslint-disable-next-line no-undef
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const createComnentTemplate = (comments) => {
  const sortedComments = comments.sort((a, b) => b.date - a.date);

  const listOfComments = [];

  for (const item of sortedComments) {
    const {author, comment, date, emoticon} = item;

    const formattedDate = Date.now() - date < 172800000 ? dayjs(date).format('YYYY/MM/DD hh:mm') : dayjs(date).fromNow();

    listOfComments.push(
      `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoticon}.png" width="55" height="55" alt="emoji-${emoticon}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${formattedDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`);
  }
  return listOfComments.join('');
};

export {createComnentTemplate};
