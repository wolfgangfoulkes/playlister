class AddSongsToPlaylist < ActiveRecord::Migration
  def change
  		change_table(:songs) do |t|
  			t.belongs_to :songs
  		end
  end
end
