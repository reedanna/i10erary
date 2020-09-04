Rails.application.routes.draw do
  resources :visits
  resources :attractions
  resources :days
  resources :trips
  resources :destinations
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
