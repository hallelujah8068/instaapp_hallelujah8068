class FollowerController < ApplicationController
    before_action :authenticate_user!

    def index
        @users = current_user.followers
    end
end