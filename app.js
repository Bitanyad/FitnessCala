//import modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({ 
    extended: true
}));

/* app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/jquery/dist'))) */


app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, function() {
    console.log("API version 1.0.0 running on 3000");
});

app.get('/', function(req, res){
    res.status(200);
    res.sendFile('index.html', {root: __dirname });
});

app.get('/bmi', function(req, res){
    res.status(200);
    res.sendFile('bmi.html', {root: __dirname });
});  

app.get('/bodyfat', function(req, res){
    res.status(200);
    res.sendFile('bodyfat.html', {root: __dirname });
});  

app.get('/caloriesburned', function(req, res){
  res.status(200);
  res.sendFile('caloriesburned.html', {root: __dirname });
}); 

app.get('/idealweight', function(req, res){
    res.status(200);
    res.sendFile('idealweight.html', {root: __dirname });
}); 

app.post('/bmi', function(req,res){
  
    weight = parseFloat(req.body.weightKG);
    height = parseFloat(req.body.heightCM/100);
    bmi = Math.round(weight / (height * height)*100)/100;
    /* res.send("Your BMI is: " + bmi);
    console.log("working"); */
    
    if(bmi < 19){
        res.send("Your BMI is: " + bmi +". You are UNDERWEIGHT")
    }
    else if ( 19 <= bmi && bmi < 25){
       res.send("Your BMI is: " + bmi +". You are NORMALWEIGHT")
    }
    else if ( 25 <= bmi && bmi < 30){
       res.send("Your BMI is: " + bmi +". You are OVERWEIGHT")
    }
    else{
       res.send("Your BMI is: " + bmi +". You are OBESE")
    }
  }); 

  app.post('/bodyfat', function(req,res){
    age = parseInt(req.body.age);  
    weight = parseFloat(req.body.weightKG);
    height = parseFloat(req.body.heightCM/100);
    bmi = Math.round((weight / (height * height))*100)/100;
      
    if(req.body.gender == "female"){
        bfp = Math.round(((1.2 * bmi) + (0.23 * age) - 5.4) *100)/100;
      }
    else{
        bfp = Math.round(((1.2 * bmi) + (0.23 * age) - 16.2) *100)/100;
    }  
    
    res.send("Your body fat percentage is: " + bfp);
    console.log("working");
  }); 

  app.post('/idealweight', function(req,res){
    age = parseInt(req.body.age);  
    height = parseFloat(req.body.heightCM/100);
      
     if(req.body.gender == "female"){
        iw = Math.round(22 * (Math.pow((height - 0.1),2)) *100)/100;
      }
    else{
      iw = Math.round(22 * (height * height) *100)/100;
    }
  });
    
    app.post('/caloriesburned', function(req,res){
      age = parseInt(req.body.age);  
      weight = parseFloat(req.body.weightKG);
      height = parseFloat(req.body.heightCM);
        
       if(req.body.gender == "female"){
          BMR = Math.round(((10*weight)+(6.25*height)-(5*age)-161) *100)/100;
        }
      else{
        BMR = Math.round(((10*weight)+(6.25*height)-(5*age)+5) *100)/100;
      }
    
    res.send("Your Basal Metabolic Rate is: " + BMR);
    console.log("working");
  }); 