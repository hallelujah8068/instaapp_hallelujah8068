import $ from 'jquery'
import axios from 'modules/axios'


const handleFollowDisplay = (hasFollowed) => {
    if (hasFollowed) {
      $('.unfollow').removeClass('hidden')
    } else {
      $('.follow').removeClass('hidden')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#accounts-show').data()
    const accountId = dataset.id

    axios.get(`/accounts/${accountId}.json`)
      .then((response) => {
        const hasFollowed = response.data.hasFollowed
        const follower = response.data.follower
        $('.follower_count').append(`<span>${follower}</span>`)
        handleFollowDisplay(hasFollowed)
    })
}) 

$('.follow').on('click', () => {
    axios.post(`/accounts/${accountId}/follows`)
      .then((response) => {
        const follower = response.data.follower
        if (response.data.status === 'ok'){
          $('.unfollow').removeClass('hidden')
          $('.follow').addClass('hidden')
          $('.follower_count').text(follower)
        }
      })
      .catch((e) => {
        window.alert('error')
        console.log(e)
      })
  })

  $('.unfollow').on('click', () => {
    axios.post(`/accounts/${accountId}/unfollows`)
      .then((response) => {
        const follower = response.data.follower
        if (response.data.status === 'ok'){
          $('.follow').removeClass('hidden')
          $('.unfollow').addClass('hidden')
          $('.follower_count').text(follower)
        }
      })
      .catch((e) => {
        window.alert('error')
        console.log(e)
      })
  })