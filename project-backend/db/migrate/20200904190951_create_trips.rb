class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.references :user
      t.references :destination
      t.integer :length

      t.timestamps
    end
  end
end
