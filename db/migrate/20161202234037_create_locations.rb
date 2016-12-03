class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :street
      t.string :city
      t.string :state
      t.integer :zip_code
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
