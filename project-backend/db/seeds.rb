# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do 
    Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: Faker::Avatar.image)
    User.create(name: Faker::Internet.unique.username, email: Faker::Internet.unique.email)
end

30.times do 
    Attraction.create(destination_id: rand(1..10), name: Faker::Address.unique.community, description: Faker::Lorem.paragraphs, image: Faker::Avatar.image)
    Trip.create(user_id: rand(1..10), destination_id: rand(1..10), length: 3)
end

Trip.all.each do |trip|
    3.times do
        Day.create(trip_id: trip.id, date: Faker::Date.in_date_period)
    end
end

100.times do
    Visit.create(day_id: rand(1..90), attraction_id: rand(1..30), rating: rand(1..5))
end