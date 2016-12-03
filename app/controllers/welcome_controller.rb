class WelcomeController < ApplicationController
  def index
    @location = Location.new
end

def create_location
  # @location = Location.new(location_params)
  #   if @location.save
  #     p 'SUCCESS' * 10
  #   else
  #     p 'FAILURE' * 10
  #   end
  end



  # private
  #
  # def location_params
  #   params.require(:location).permit(:street, :city, :state, :zip_code)
  # end
end
