require "selenium/webdriver"
require "optparse"
require "securerandom"
require "dotenv"

Dotenv.load

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

  opts.on("-dDEVICE", "--device=DEVICE", "Set device") do |device|
    options[:device] = device
  end
end.parse!

caps = Selenium::WebDriver::Remote::Capabilities.chrome()
caps['platform'] = 'Windows 8.1'
caps['version'] = '53.0'
caps['recordVideo'] = false
caps['recordScreenshots'] = false
caps['screenResolution'] = "1920x1080"
caps['autoAcceptAlerts'] = true

if options[:device]
  caps['chromeOptions'] = {
    "mobileEmulation" => { "deviceName" => options[:device] }
  }
end

driver = Selenium::WebDriver.for(:remote,
                                 :url => "https://#{ENV['ACCESS_USERNAME']}:#{ENV['ACCESS_KEY']}@ondemand.saucelabs.com:443/wd/hub",
                                 :desired_capabilities => caps)

begin
  driver.get(options[:url])
  driver.switch_to.alert.dismiss rescue Selenium::WebDriver::Error::NoAlertOpenError

  raise "404" if driver.title.include?("is not available")

  driver.execute_script("document.documentElement.style.overflow = 'hidden';")

  path = "./#{SecureRandom.hex}.png"
  driver.save_screenshot(path)

  result = {path: path}
  print result.to_json
ensure
  driver.quit
end
