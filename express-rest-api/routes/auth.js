exports.login = function(req, res) {
	console.log("In login")
    var loginBodyRequest = req.body;

    if (loginBodyRequest === undefined || 
    	loginBodyRequest == null) {
    	res.send(400, {'message':'Invalid body request'});
    }
    
    if (!loginBodyRequest.hasOwnProperty('email')){
    	return res.send(404, {'message':'Please send valid email'});	
    };
	if (!loginBodyRequest.hasOwnProperty('password')){
    	return res.send(404, {'message':'Please send password'});	
    };

    ///Now all validations are done
    if (loginBodyRequest['email'] != 'test@runner.com' || loginBodyRequest['password'] != '12345678') {
    	return res.send(404, {'message':'No such email/password exists in our system'});	
    }

    res.cookie('MY_SESSION', 'CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3:SOMETHING_ELSE');
    res.send(200, {'success': 'true'});
    
};

exports.register = function(req, res) {
	console.log("In register")
    
     var regBodyReq = req.body;

    if (regBodyReq === undefined || 
    	regBodyReq == null) {
    	res.send(400, {'message':'Invalid body request'});
    }
    
    if (!regBodyReq.hasOwnProperty('email')){
    	return res.send(404, {'message':'Please send valid email'});	
    };
	if (!regBodyReq.hasOwnProperty('password')){
    	return res.send(404, {'message':'Please send password'});	
    };
    if (!regBodyReq.hasOwnProperty('password_confirmation') || 
    	regBodyReq['password'] != regBodyReq['password_confirmation']){
    	return res.send(404, {'message':'Please send valid password confirmation'});	
    };

    ///Now all validations are done
    if (regBodyReq['email'] == 'test@runner.com') {
    	return res.send(409, {'message':'User exists.  Please click forgot password'});	
    }

    res.cookie('MY_SESSION', 'CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3:SOMETHING_ELSE');
	res.send(200, {'success': 'true'})

};
 

 exports.forgot_password = function(req, res) {
	console.log("In forgot password")
    var emailBodyRequest = req.body;

    if (emailBodyRequest === undefined || 
    	emailBodyRequest == null) {
    	res.send(400, {'message':'Invalid body request'});
    }
    
    if (!emailBodyRequest.hasOwnProperty('email')){
    	return res.send(404, {'message':'Please send valid email'});	
    };
	///Now all validations are done
    if (emailBodyRequest['email'] != 'test@runner.com') {
    	return res.send(404, {'message':'User not found'});	
    }

    res.cookie('MY_SESSION', 'CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3:SOMETHING_ELSE');
    res.send(200, {'success': 'true'});
    
};

exports.logout = function(req, res) {
    console.log("In logout");

    res.clearCookie('MY_SESSION');
    res.send(200, {'success': 'true'})
}

    
