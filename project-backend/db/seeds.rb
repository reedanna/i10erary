# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do 
    
    User.create(name: Faker::Internet.unique.username, email: Faker::Internet.unique.email)
end

Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjk5NTd9&auto=format&fit=crop&w=1950&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1495542779398-9fec7dc7986c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1568&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1470217957101-da7150b9b681?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMjU4fQ&auto=format&fit=crop&w=1567&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/Ys-DBJeX0nE.JPG?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjk5NTd9&auto=format&fit=crop&w=1950&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80")
Destination.create(name: Faker::Address.unique.city, description: Faker::Lorem.paragraphs, image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-1.2.1&auto=format&fit=crop&w=1568&q=80")

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

