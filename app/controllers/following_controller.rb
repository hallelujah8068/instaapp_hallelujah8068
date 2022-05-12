class FollowingController < ApplicationController
    before_action :authenticate_user!

    def index
        @users = current_user.followings
    end

end
