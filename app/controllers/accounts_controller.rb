class AccountsController < ApplicationController
    def show
        @user = User.find(params[:id])
        follow_status = current_user.has_followed?(@user)
        follower = @user.followers.count
        following = @user.followings.count

        respond_to do |format|
            format.html
            format.json { render json: { hasFollowed: follow_status, follower: follower, following: following } }
        end
        
        if @user == current_user
            redirect_to  profile_path
        end
    end
end