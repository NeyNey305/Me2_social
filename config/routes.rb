Rails.application.routes.draw do
  resources :entries
  get 'dashboard/index'
  get 'users/sign_out'
  get 'welcome/index'
  root 'welcome#index'
  post '/locations' => 'welcome#create_location'

  # devise_for :users
  resources :posts
  devise_for :users, :controllers => { registrations: 'registrations' }


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :posts do
    resources :comments
  end
end
