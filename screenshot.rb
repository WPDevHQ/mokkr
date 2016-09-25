require "selenium-webdriver"
require "optparse"
require "securerandom"

options = {}
OptionParser.new do |opts|
  opts.on("-uURL", "--url=URL", "Set url to visit") do |url|
    options[:url] = url
  end

  opts.on("-dDEVICE", "--device=DEVICE", "Set device") do |device|
    options[:device] = device
  end

  opts.on("-wWIDTH", "--width=WIDTH", "Set width") do |width|
    options[:width] = width.to_i
  end

  opts.on("-hHEIGHT", "--height=HEIGHT", "Set height") do |height|
    options[:height] = height.to_i
  end
end.parse!

prefs = {
  :download => {
    :prompt_for_download => false
  }
}

switches = %w[--ignore-certificate-errors --disable-translate]

chrome_options = {}

if options[:device]
  mobile_emulation = { "deviceName" => options[:device] }
  chrome_options["mobileEmulation"] = mobile_emulation
end

caps = Selenium::WebDriver::Remote::Capabilities.chrome(
  prefs: prefs,
  switches: switches,
  "chromeOptions" => chrome_options)

driver = Selenium::WebDriver.for(:remote, :desired_capabilities => caps)

if (options[:width] && options[:height])
  driver.manage.window.resize_to(options[:width], options[:height])
end

driver.navigate.to options[:url]
driver.execute_script("document.body.parentElement.style.overflow = 'hidden';")

wait = Selenium::WebDriver::Wait.new(:timeout => 10)
wait.until {
  driver.execute_script("return document.readyState;") == "complete"
}

path = "./#{SecureRandom.hex}.png"

driver.save_screenshot(path)

if (options[:height] && options[:width])
  height = options[:height]
  width = options[:width]
else
  height = driver.execute_script("return window.innerHeight;")
  width = driver.execute_script("return window.innerWidth;")
end

result = {height: height, width: width, path: path}
print result.to_json

driver.quit

