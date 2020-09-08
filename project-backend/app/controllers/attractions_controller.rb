class AttractionsController < ApplicationController

    def index
        attractions = Attraction.all
        render json: attractions
    end

    def show
        attraction = Attraction.find(params[:id])
        render json: attraction
    end

    def create
        attraction = Attraction.new(params)
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
end
