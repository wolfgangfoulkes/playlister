class SiteController < ApplicationController
  def index
  	@Playlists = Playlist.order('created_at desc') #descending order of creation
  end
end
