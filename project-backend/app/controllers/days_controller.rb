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
        day = Day.new(day_params)
        day.save
    end

    def destroy
        day = Day.find(params[:id])
        day.destroy
    end

    private

    def day_params
        params.require(:day).permit(:trip_id, :date)
    end

end
