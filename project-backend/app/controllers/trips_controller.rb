class TripsController < ApplicationController

    def index
        @trips = Trip.all

        render json: @trips, except: [:created_at, :updated_at], include: [:destination, :days]
    end
    
    def show
        @trip = Trip.find(params[:id])
        render json: @trip, include: [:destination, :days]
    end

    def create
        @trip = Trip.new(trip_params)
        @trip.save
        render json: @trip, include: [:destination, :days]
    end

    def destroy
        Trip.find(params[:id]).destroy
    end

    def update
        @trip = Trip.find(params[:id])
        @trip.update(trip_params)
    end

    private

    def trip_params
        params.require(:trip).permit(:user_id, :destination_id, :length)
    end
 
end
