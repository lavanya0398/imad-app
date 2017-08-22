var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
    
    var htmlTemplate=`
    
    <html>
        <head>
            <title>
                ${data.title}
            </title>
        </head>
        <body>
            <div class"container">
                <div>
                    <a href="/">HOME</a>
                </div>
            </div>
            <hr/>
            <h3>
                ${data.heading}
            </h3>
            <div>
                ${data.date}
            </div>
            <div>
                ${data.content}
            </div>
        </body>
    </html>
    `;
    return(htmlTemplate);
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
