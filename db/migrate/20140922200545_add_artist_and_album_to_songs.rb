class AddArtistAndAlbumToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :artist, :string
    add_column :songs, :album, :string
  end
end
