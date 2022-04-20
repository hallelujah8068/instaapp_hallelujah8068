class CommentsController < ApplicationController
    before_action :authenticate_user!, only: [:create]

    def index
        @article = Article.find(params[:article_id])
        @comments = @article.comments

        @comment = @article.comments.build
        @comment.user = current_user
    end

    def create
        @article = Article.find(params[:article_id])
        @comment = @article.comments.build(comment_params)
        @comment.user = current_user
          if @comment.save
            redirect_to article_comments_path, notice:'コメントを追加しました!'
          else
            flash.now[:error] = 'コメントを追加できませんでした'
            render :index
          end
    end

    private
    def comment_params
        params.require(:comment).permit(:content, :article_id, :user_id).merge(user_id: current_user.id, article_id: params[:article_id])
    end
end
