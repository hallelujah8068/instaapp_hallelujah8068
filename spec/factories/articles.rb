FactoryBot.define do
    factory :article do
      content { Faker::Lorem.characters(number: 10) }

      after(:build) do |article|
        article.images.attach(io: File.open('app/assets/images/default-avatar.png'), filename: 'default-avatar.png')
      end
    end
end