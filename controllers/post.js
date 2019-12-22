exports.getPosts = (req, res) => {
    res.json({
        posts:[
            {title:'First Posts'},
            {title:'Secound Posts'},

        ]
    });
  };
  