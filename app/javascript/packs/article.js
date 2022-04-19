import $ from 'jquery'
import axios from 'modules/axios'
import {
  handleHeartDisplay,
  listenInactiveHeartEvent,
  listenActiveHeartEvent
} from 'modules/handle_heart'

document.addEventListener('DOMContentLoaded', () => {
  $('.active-heart').each(function() {
    const articleId = $(this).attr('id')
    //いいね機能
    axios.get(`/articles/${articleId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked, articleId)
    })
    .catch((e) => {
      console.log(e)
    })
  
    listenInactiveHeartEvent(articleId)
    listenActiveHeartEvent(articleId)
    })
})

const appendComment = (comment) => {
    $('.comments-container').append(
      `<div class="comment">
         <div class="comment_img"><img src="${comment.user.avatar_comment_image}"></div>
         <div class="comment_info">
           <div class="comment_user_name"><p>${comment.user.name}</p></div>
           <div class="comment_content"><p>${comment.content}</p></div>
         </div>
       </div>`
      
    )
  }

document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#comment-index').data()
    const articleId = dataset.articleId
  
    axios.get(`/articles/${articleId}`)
      .then((response) => {
        const comments = response.data
        comments.forEach((comment) => {
          $('.comments-container').append(
            appendComment(comment)
          )
        })
      })
  })