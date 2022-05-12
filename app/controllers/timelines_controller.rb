class TimelinesController < ApplicationController
    before_action :authenticate_user!

    def show
        user_ids = current_user.followings.pluck(:id)
        # from = Time.now - 24.hours
        # to = Time.now
        @articles = Article.where(user_id: user_ids).order(created_at: :desc)
    end
end
