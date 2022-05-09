class AccountsController < ApplicationController
    def show
        @user = User.find(params[:id])
        follow_status = current_user.has_followed?(@user)
        follower = @user.followers.count

        respond_to do |format|
            format.html
            format.json { render json: { hasFollowed: follow_status, follower: follower } }
        end
        
        if @user == current_user
            redirect_to  profile_path
        end
    end
end