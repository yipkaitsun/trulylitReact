const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass');
if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss(withSass(
    
    {
        env: {
          'MYSQL_HOST': 'localhost',
          'MYSQL_PORT': '3306',
          'MYSQL_DATABASE': 'trulylittlethings',
          'MYSQL_USER': 'root',
          'MYSQL_PASSWORD': '',
        },
       
      cssLoaderOptions: {
      url: false
    }
     }
  
  
  ))