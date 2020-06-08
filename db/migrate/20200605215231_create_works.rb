class CreateWorks < ActiveRecord::Migration[5.2]
  def change
    create_table :works do |t|
      t.string :title
      t.datetime :date

      t.timestamps
    end
  end
end
