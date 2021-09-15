import dayjs from 'dayjs';
import he from 'he'; // Не совсем понимаю, какой смысл использовать эту библиотеку на этапе вставки текста, а не раньше, при отправке на сервер. Плюс не ясно, почему она в итоге пропускет неизмененными небезопасные символы...

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const createCommentItemTemplate = (commentItem) => {
  const {author, comment, date, emoticon, id} = commentItem;
  const formattedDate = dayjs().diff(dayjs(date), 'day') < 2 ? dayjs(date).format('YYYY/MM/DD hh:mm') : dayjs(date).fromNow();

  return  `<li class="film-details__comment" data-comment-id="${id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emoticon}.png" width="55" height="55" alt="emoji-${emoticon}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment)}</p>
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
    .join('');

  return `<ul class="film-details__comments-list">
      ${listOfComments}
    </ul>`;
};

export {createCommentsTemplate};
