const checkAdmin = (req,res,next)=>{
    const token = req.cookies.jwt;
    var i=0;
    if (token) {
      jwt.verify(token, 'the signup login', async (err, decodedToken) => {
        if (err) {
          res.redirect('/');
        } else {
          let user = await User.findById(decodedToken.id);
          if(user){
          names.forEach((name)=>{
            if(name.password === user.password && name.username === user.username)
            { 
              i=1; 
            } 
          });
          if(i===1)
          {
            next();
          }else{
            res.redirect('/');
          }
        }
      }
      });
    } else {
      res.redirect('/');
    }
  };