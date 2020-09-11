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
        @visit = Visit.new(visit_params);
        @visit.save
    end

    def destroy
        Visit.find(params[:id]).destroy
    end

    def update
        @visit = Visit.find(params[:id])
        @visit.update(visit_params)
    end

    private
    def visit_params
        params.require(:visit).permit(:day_id, :attraction_id, :rating);
    end
end
