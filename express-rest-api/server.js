var express = require('express'),
    my_auth = require('./routes/auth');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.methodOverride());
	app.use(app.router);
});
 

app.post('/api/auth/login', my_auth.login);
app.post('/api/auth/register', my_auth.register);
app.post('/api/auth/forgot_password', my_auth.forgot_password);
app.post('/api/auth/logout', my_auth.logout); 
 
app.listen(9011);
console.log('Listening on port 9011...');