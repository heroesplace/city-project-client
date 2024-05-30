#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/assets/index-*.js* $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|VITE_SERVER_ADDRESS|'${VITE_SERVER_ADDRESS}'|g' $file 

done

echo "Starting Nginx"
nginx -g 'daemon off;'