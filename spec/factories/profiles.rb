FactoryBot.define do
    factory :profile do
        after(:build) do |profile|
            profile.avatar.attach(io: File.open('app/assets/images/default-avatar.png'), filename: 'default-avatar.png')
        end
    end
end 