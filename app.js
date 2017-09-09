//load modules
//expressJS framework
const express = require("express");
//path
const path = require("path");
//body parser
const bodyParser = require('body-parser');
//nodemailer untuk mengirimkan email
const nodeMailer = require('nodemailer');

//init express app
var app = express();

//definisikan folder views sebagai folder view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade'); //set view template engine dengan JADE

//initialize bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

//definisikan foler statis untuk dapat diakses publik
app.use(express.static(path.join(__dirname, 'public')));

//route get index page
app.get('/', (req, res)=>{
	//res.render() -> untuk merender tampilan , passing variabel
	res.render('index',{title: 'Selamat Datang'});
});

//route get about page
app.get('/about', (req,res)=>{
	res.render('about',{title: 'About Us'});
});

//route get contact page
app.get('/contact', (req,res) => {
	res.render('contact', {title: 'Kontak'});
});

//route post untuk send email
app.post('/contact/send', (req,res) => {

	//definisikan transporter
	const transporter = nodeMailer.createTransport({
		service: 'Gmail',
		//Isi Data Dibawah ini dengan email an password anda
		auth: {
			user: 'catur.andi.pamungkas@gmail.com',
			pass: '*******'
		}
	});

	//denisikan mail options
	const mailOptions = {
		from: 'Catur Andi Pamungkas <catur.andi.pamungkas@gmail.com>',
		to: 'championbatang010@gmail.com',
		subject: 'Website Submission',
		text: 'You Have a submission with the following details : ' 
				+ 'Name :' +req.body.nama + 'Email : ' + req.body.email 
				+ 'Message : ' + req.body.message,
		html: '<p>You Have a submission with the following details</p' 
				+ "<ul>" + 
					"<li>Name : " + req.body.nama + "</li>" + 
					"<li>Email : " + req.body.email + "</li>" + 
					"<li>Message : " + req.body.message + "</li>"
	}

	//send email
	transporter.sendMail(mailOptions,(error, info)=>{
		if(error){
			console.log("ERROR : " + error);
		}else{
			console.log('Message Sent' + info.response);
		}
		res.redirect('/'); //redirect ke home page
	})
});

//listen server
app.listen(process.env.port || 5000,() =>{
    console.log('Server Berjalan  pada Port 5000');
});

