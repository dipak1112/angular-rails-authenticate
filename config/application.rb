require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)

module DemoRailsAngularjs
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.

    config.active_record.raise_in_transactional_callbacks = true
    config.active_record.whitelist_attributes = false

  end
end
