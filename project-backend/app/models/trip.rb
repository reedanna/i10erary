class Trip < ApplicationRecord
    belongs_to :user
    belongs_to :destination
    has_many :days
    has_many :visits, through: :days
end
