require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'ReactNativeLocalization'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.author       = package['author']
  s.source       = { :git => package['repository']['url'], :tag => "v#{s.version}" }

  s.ios.deployment_target = '13.0'
  s.tvos.deployment_target = '13.0'
  s.osx.deployment_target = '10.15'

  s.requires_arc = true
  s.source_files = 'ios/**/*.{h,m,mm}'

  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency 'React-Core'
  end
end
