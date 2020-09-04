class CreateAttractions < ActiveRecord::Migration[6.0]
  def change
    create_table :attractions do |t|
      t.references :destination, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.string :image

      t.timestamps
    end
  end
end
