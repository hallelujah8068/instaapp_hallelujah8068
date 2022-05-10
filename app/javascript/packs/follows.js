import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()



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
        const following = response.data.following
        $('.profile_follower_num').text(follower)
        $('.profile_following_num').text(following)
        handleFollowDisplay(hasFollowed)
      })
  
    $('.follow').on('click', () => {
      axios.post(`/accounts/${accountId}/follows`)
        .then((response) => {
          const follower = response.data.follower
          const following = response.data.following
          if (response.data.status === 'ok'){
            $('.unfollow').removeClass('hidden')
            $('.follow').addClass('hidden')
            $('.profile_follower_num').text(follower)
            $('.profile_following_num').text(following)
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
          const following = response.data.following
          if (response.data.status === 'ok'){
            $('.follow').removeClass('hidden')
            $('.unfollow').addClass('hidden')
            $('.profile_follower_num').text(follower)
            $('.profile_following_num').text(following)
          }
        })
        .catch((e) => {
          window.alert('error')
          console.log(e)
        })
    })
  })