class Song < ActiveRecord::Base
	belongs_to :customer
	validates_presence_of :name, :playlist_id
end
