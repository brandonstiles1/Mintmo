Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :users
  resource :session, only: [:new, :create, :destroy]

  get 'auth/facebook/callback', to: 'sessions#omniauth_facebook'

  namespace :api, defaults: { format: :json } do
     resources :institutions
     resources :accounts
     resources :transactions
     resources :users
     resource :session
    get "search", to: "utils#search"
  end

end
