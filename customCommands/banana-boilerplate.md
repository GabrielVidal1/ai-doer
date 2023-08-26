# Folder : {0}

# Context File Path : {1}

/bash cp -R ./test/banana.dev_test ./test/out/{0}

/clear

# Context

/readFile {1}

/readFile test/banana.dev_test/context.md
/command replace-todos ./test/out/{0}/app.py
