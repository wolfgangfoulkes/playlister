class AddScDataToSong < ActiveRecord::Migration
  def change
  		add_column :songs, :sc_id, :string
  		add_column :songs, :sc_permalink, :string
  		add_column :songs, :sc_permalink_url, :string
  		add_column :songs, :sc_uri, :string
  end
end
