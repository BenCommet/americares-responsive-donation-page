# import htmlmin
wrapper_file = open('wrapper.html', 'r', encoding="utf8")
# script_file = open('js/script.js', 'r', encoding="utf8")
# api_file = open('js/api.js', 'r', encoding="utf8")
css_file = open('css/styles.css', 'r', encoding="utf8")
wrapper_file_lines = wrapper_file.readlines()
# script_file_lines = script_file.readlines()
css_file_lines = css_file.readlines()
publish_file = open('wrapper-publish.html', 'w', encoding="utf8")

for wrapper_line in wrapper_file_lines:
  if "Insert CSS Here" in wrapper_line:
    for css_line in css_file_lines:
      publish_file.write(css_line)
    publish_file.write('\n')    
  # elif "Insert Javascript Here" in wrapper_line:
  #   for js_line in script_file_lines:
  #     publish_file.write(js_line)
  #   publish_file.write('\n')
  elif "Remove Line" in wrapper_line:
    publish_file.write('\n')
  # elif "Insert API Javascript Here" in wrapper_line:
  #   for api_line in api_file:
  #     publish_file.write(api_line)
  else:
    publish_file.write(wrapper_line)

# script_file.close()
css_file.close()
publish_file.close()
#reopen the publish file so we can minify it
# publish_file = open('publish.html', 'r', encoding="utf8")
# publish_file_lines = publish_file.read()
# publish_file.close()
# publish_file = open('publish.html', 'w', encoding="utf8")
# minified = htmlmin.minify(publish_file_lines.decode("utf-8"), remove_empty_space=True)
# publish_file.write(minified)
