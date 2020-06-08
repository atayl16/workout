class CreateExercises < ActiveRecord::Migration[5.2]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :sets
      t.string :weight
      t.references :work, foreign_key: true

      t.timestamps
    end
  end
end
