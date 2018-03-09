# import htmlmin
donate_file = open('donate.html', 'r', encoding="utf8")
script_file = open('js/script.js', 'r', encoding="utf8")
api_file = open('js/api.js', 'r', encoding="utf8")
css_file = open('css/styles.css', 'r', encoding="utf8")
donate_file_lines = donate_file.readlines()
script_file_lines = script_file.readlines()
css_file_lines = css_file.readlines()
publish_file = open('publish.html', 'w', encoding="utf8")

for donate_line in donate_file_lines:
  if "Insert CSS Here" in donate_line:
    for css_line in css_file_lines:
      publish_file.write(css_line)
    publish_file.write('\n')    
  elif "Insert Javascript Here" in donate_line:
    for js_line in script_file_lines:
      publish_file.write(js_line)
    publish_file.write('\n')
  elif "Remove Line" in donate_line:
    publish_file.write('\n')
  elif "Insert API Javascript Here" in donate_line:
    for api_line in api_file:
      publish_file.write(api_line)
  else:
    publish_file.write(donate_line)

script_file.close()
css_file.close()
publish_file.close()
#reopen the publish file so we can minify it
# publish_file = open('publish.html', 'r', encoding="utf8")
# publish_file_lines = publish_file.read()
# publish_file.close()
# publish_file = open('publish.html', 'w', encoding="utf8")
# minified = htmlmin.minify(publish_file_lines.decode("utf-8"), remove_empty_space=True)
# publish_file.write(minified)
