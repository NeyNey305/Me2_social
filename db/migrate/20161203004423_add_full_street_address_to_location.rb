class AddFullStreetAddressToLocation < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :full_street_address, :string
  end
end
