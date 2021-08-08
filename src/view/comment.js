import dayjs from 'dayjs';
// eslint-disable-next-line no-undef
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const createCommentItemTemplate = (commentItem) => {
  const {author, comment, date, emoticon} = commentItem;

  const formattedDate = Date.now() - date < 172800000 ? dayjs(date).format('YYYY/MM/DD hh:mm') : dayjs(date).fromNow();

  return  `<li class="film-details__comment">
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
      </li>`;
};

const createCommentsTemplate = (comments) => {
  const sortedComments = comments.sort((a, b) => b.date - a.date);
  const listOfComments = sortedComments
    .map((comment) => createCommentItemTemplate(comment))
    .join();

  // for (const item of sortedComments) {

  // }
  return `<ul class="film-details__comments-list">
      ${listOfComments}
    </ul>`;
};

export {createCommentsTemplate};
