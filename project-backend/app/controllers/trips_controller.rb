class TripsController < ApplicationController

    def index
        @trips = Trip.all

        render json: @trips, except: [:created_at, :updated_at]
    end
    
    def show
        @trip = Trip.find(params[:id])
        render json: @trip
    end

    def create
        render :json => Trip.create(
            user_id: params[:user_id], 
            destination_id: params[:destination_id],
            length: params[:length] 
          )
    end

    def destroy
        Trip.find(params[:id]).destroy
      end
 
end
