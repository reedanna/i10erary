class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.references :day, null: false, foreign_key: true
      t.references :attraction, null: false, foreign_key: true
      t.integer :rating

      t.timestamps
    end
  end
end
