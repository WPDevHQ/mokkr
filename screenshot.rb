require "selenium-webdriver"
require "optparse"
require "securerandom"

options = {}
OptionParser.new do |opts|
  opts.on("-uURL", "--url=URL", "Set url to visit") do |url|
    options[:url] = url
  end

  opts.on("-wWIDTH", "--width=WIDTH", "Set width") do |width|
    options[:width] = width.to_i
  end

  opts.on("-hHEIGHT", "--height=HEIGHT", "Set height") do |height|
    options[:height] = height.to_i
  end

  opts.on("-uaUSERAGENT", "--useragent=USERAGENT", "Set useragent") do |user_agent|
    options[:user_agent] = user_agent
  end
end.parse!


profile = Selenium::WebDriver::Firefox::Profile.new
profile.assume_untrusted_certificate_issuer = true
profile.add_extension "default_responsive_design_view-0.1-fx.xpi"
profile['browser.seesionstore.resume_from_crash'] = false
profile['autoupdate.enabled'] = false

if options[:user_agent]
  profile['general.useragent.override'] = options[:user_agent]
end

preset = [{
  "width": options[:width],
  "height": options[:height],
  "key": "#{options[:width]}x#{options[:height]}",
  "name": "Responsive preset"
}].to_json
profile['devtools.responsiveUI.presets'] = preset

Selenium::WebDriver::Firefox::Binary.path = `which firefox`.chomp
caps = Selenium::WebDriver::Remote::Capabilities.firefox(firefox_profile: profile)

driver = Selenium::WebDriver.for(:remote, :desired_capabilities => caps)

driver.manage.window.maximize

driver.navigate.to options[:url]

wait = Selenium::WebDriver::Wait.new(:timeout => 10)
wait.until {
  driver.execute_script("return document.readyState;") == "complete"
}

sleep 1

path = "./#{SecureRandom.hex}.png"

driver.save_screenshot(path)

result = {path: path}
print result.to_json

driver.quit
