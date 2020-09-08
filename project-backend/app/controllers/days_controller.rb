class DaysController < ApplicationController

    def index
        days = Day.all
        render json: days, include: [:trip]
    end

    def show
        day = Day.find(params[:id])
        render json: day, include: [:trip]
    end

    def create
        day = Day.new(params)
        day.save
    end

    def destroy
        day = Day.find(params[:id])
        day.destroy
    end

end
