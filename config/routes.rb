Rails.application.routes.draw do
  root to: "static_pages#root"

  # resource :user
  # resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
     resources :institutions
     resources :accounts
     resources :transactions
     resources :users
     resource :session
  end

end
