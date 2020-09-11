class Day < ApplicationRecord
  belongs_to :trip
  has_many :visits
  has_many :attractions, through: :visits
end
