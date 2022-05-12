class TimelinesController < ApplicationController
    before_action :authenticate_user!

    def show
        user_ids = current_user.followings.pluck(:id)
        from = Time.now - 24.hours
        to = Time.now
        @articles = Article.where(user_id: [*user_ids, current_user.id], created_at: from..to).left_joins(:likes).group(:id).order('COUNT(likes.id) DESC',created_at: :desc).limit(5)
    end
end
