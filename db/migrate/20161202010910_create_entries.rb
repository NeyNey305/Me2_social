class CreateEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :entries do |t|
      t.string :title
      t.text :body
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
