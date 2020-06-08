require 'sidekiq/web'
require 'subdomain'

Rails.application.routes.draw do

  resources :exercises
  class Subdomain
    def self.matches?(request)
      subdomains %w{ www admin } # reserved subdomains
      request.subdomain.present? && !subdomains.include?(request.subdomain)
    end
  end

  constraints Subdomain do
    resources :works
  end

  devise_for :users
  root to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
