class Attraction < ApplicationRecord
  belongs_to :destination
  has_many :visits
end
