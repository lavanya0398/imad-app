var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool=require('pg').Pool;

var config={
    user:'lavanyajayachith',
    database:'lavanyajayachith',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));


var articles={
    'article-one' : {
        title:'Article-one',
        heading:'Article-one | lavanya',
        date:'Aug 22,2017',
        content:`
                <p>heii my first article.heii my first article.heii my first article.heii my first article.</p>
                <p>heii my first article.heii my first article.heii my first article.heii my first article.</p>
                `
    },
    'article-two':{
        title:'Article-two',
        heading:'Article-two | lavanya',
        date:'Aug 22,2017',
        content:`
                <p>heii my second article</p>
                `
    },
    'article-three':{
        title:'Article-three',
        heading:'Article-three | lavanya',
        date:'Aug 22,2017',
        content:`
              <p>heii my third article</p>
                `
    }
};

function createTemplate(data){
    
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var date=data.date;
    var htmlTemplate=`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class"container">
                <div>
                    <a href="/">HOME</a>
                </div>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </body>
    </html>
    `;
    return(htmlTemplate);
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool= new Pool(config);

app.get('/test1',function(req,res){
    
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status('500').send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

app.get('/articles/:articleName',function(req,res){
    
    var articleName=req.params.articleName;
    pool.query( " select * from articles where title= '" +articleName+"'",function(err,result){
       if(err) {
           res.status('500'.send(err.totring()));
       }
       else{
           
           if(result.rows.length===0){
               res.status('404').send('RECORD Not found');
           }
           else{
               var articleData=resul.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
    
   // res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
