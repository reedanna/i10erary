class VisitsController < ApplicationController
    
    def index
        @visits = Visit.all

        render json: @visits, except: [:created_at, :updated_at]
    end

    def show
        @visit = Visit.find(params[:id])
        render json: @visit
    end

    def create
        render :json => Visit.create(
            day_id: params[:day_id], 
            attraction_id: params[:attraction_id],
            rating: params[:rating] 
          )
    end

    def destroy
        Visit.find(params[:id]).destroy
      end
end
