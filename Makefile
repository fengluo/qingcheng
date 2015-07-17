copy:
	@mkdir -p build/fonts
	@cp fonts/* build/fonts/
	@cp icon.css build/

build: copy
	@node_modules/.bin/webpack

dist:
	@mkdir -p dist/fonts
	@node_modules/.bin/webpack
	@cat icon.css build/style.css | cleancss -o dist/qingcheng.css
	@cp fonts/* dist/fonts/
	@uglifyjs build/build.js -m -o dist/qingcheng.js

.PHONY: build copy dist
