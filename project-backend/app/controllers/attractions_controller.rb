class AttractionsController < ApplicationController

    def index
        attractions = Attraction.all
        render json: attractions, include: [:destination]
    end

    def show
        attraction = Attraction.find(params[:id])
        render json: attraction, include: [:destination]
    end

    def create
        attraction = Attraction.new(attraction_params)
        attraction.save
    end

    def update
        attraction = Attraction.find(params[:id])
        attraction.update(params)
    end

    def destroy
        attraction = Attraction.find(params[:id])
        attraction.destroy
    end

    private
    def attraction_params
        params.require(:attraction).permit(:name, :image, :description, :destination_id)
    end
end
