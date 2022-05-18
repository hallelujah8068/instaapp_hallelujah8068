# == Schema Information
#
# Table name: articles
#
#  id         :bigint           not null, primary key
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_articles_on_user_id  (user_id)
#
class Article < ApplicationRecord
    has_many_attached :images
    has_many :likes, dependent: :destroy
    has_many :comments, dependent: :destroy

    belongs_to :user

    # validates :images, presence: true
    # validates :content, presence: true

    validate :image_length

    def display_created_at
        I18n.l(self.created_at, format: :long)
    end

    def image_length
        if images.length > 5
            images = nil
            errors.add(:images, 'は5枚以内にしてください')
        end
     end
end
