class UsersController < ApplicationController
   
    def index
        @users = User.all
        render json: @users, except: [:created_at, :updated_at]
    end

    def show
        @user = User.find_by(id: params[:id])
        render json: @user
    end
    
    def create
        @user = User.new(params)
        @user.save
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
    end

end
