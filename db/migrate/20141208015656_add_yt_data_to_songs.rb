class AddYtDataToSongs < ActiveRecord::Migration
  def change
  	add_column :songs, :src_type, :string
  	add_column :songs, :yt_id, :string
  	add_column :songs, :yt_etag, :string
  	add_column :songs, :image_url_small, :string
  	add_column :songs, :image_url_medium, :string
  	add_column :songs, :image_url_large, :string
  end
end
