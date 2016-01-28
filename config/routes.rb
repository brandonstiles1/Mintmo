Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :user
  resource :session, only: [:new, :create, :destroy]

  namespace :api, format: 'json' do
     resources :institutions
     resources :accounts
     resources :transactions
  end

end
