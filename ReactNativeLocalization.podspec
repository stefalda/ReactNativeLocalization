require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name     = "ReactNativeLocalization"
  s.version  = package['version']
  s.summary  = package['description']
  s.homepage = "https://github.com/stefalda/ReactNativeLocalization"
  s.license  = package['license']
  s.author   = package['author']
  s.source   = { :git => package['repository']['url'], :tag => "v#{s.version}" }

  s.ios.deployment_target = '8.0'
  s.tvos.deployment_target = '10.0'
  s.osx.deployment_target = '10.10'

  s.preserve_paths = 'README.md', 'LICENSE', 'package.json', 'lib'
  s.source_files   = "ios/*.{h,m}"

  s.dependency 'React-Core'
end
