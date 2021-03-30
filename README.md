### HTML 2 PDF Generator

Follow below steps (Tested on Unix based Systems)
1. Install wkhtmltopdf on your operating system (For Ubuntu), 
   For the stable/current release
   
  ```
  sudo apt-get update
  sudo apt-get install xvfb libfontconfig wkhtmltopdf
  ```

  Or let's say specific version 0.12.3, follow below procedure
   ```
   cd ~
   wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz
   tar vxf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz
   cp wkhtmltox/bin/wk* /usr/bin/
   ```
2. go to the project root directory, `npm install`
3. `npm app.js`
