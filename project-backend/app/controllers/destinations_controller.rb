class DestinationsController < ApplicationController

    def index
        destinations = Destination.all
        render json: destinations
    end

    def show
        destination = Destination.find(params[:id])
        render json: destination
    end

    def create
        destination = Destination.new(destination_params)
        destination.save
    end

    def update
        destination = Destination.find(params[:id])
        destination.update(params)
    end

    def destroy
        destination = Destination.find(params[:id])
        destination.destroy
    end

    private
    def destination_params
        params.require(:destination).permit(:name, :image, :description)
    end

end
