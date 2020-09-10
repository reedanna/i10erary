class Destination < ApplicationRecord
    has_many :attractions
    has_many :trips
end
