Rails.application.routes.draw do
  # get 'profiles/show'

  resources :entries
  root 'welcome#index'
  get 'welcome/index'
  get 'dashboard/index'
  get 'users/sign_out'
  # get ':user_name', to: 'profiles#show', as: :profile
  get ':user_name/edit', to: 'profiles#edit', as: :edit_profile
  patch ':user_name/edit', to: 'profiles#update', as: :update_profile


  post '/locations' => 'welcome#create_location'

  resources :profiles
  resources :posts
  # devise_for :users
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :posts do
    resources :comments
    member do
      get 'like'
      get 'unlike'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
