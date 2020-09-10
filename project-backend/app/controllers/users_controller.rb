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
        @user = User.new(user_params)
        @user.save
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
    end

    private

    def user_params
        params.require(:user).permit(:name, :email)
    end


end
