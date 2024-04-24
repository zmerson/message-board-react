const express = require('express');
const app = express();
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const { get } = require('http');
//separate into multiple files when it gets too big - https://stackoverflow.com/questions/23923365/how-to-separate-routes-on-node-js-and-express-4
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sslOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

app.use(cors())

const rateLimit = require("express-rate-limit");

// Enable rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply the rate limiting middleware to your API routes
app.use("/api/", limiter);

//return user profile data
app.get('/api/user/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: { name: name }
    });
    // console.log('got user', user)
    const boards = await prisma.userRole.findMany({
      where: { userId: user.id },
      select: {
        board: true
      }
    });
    const posts1 = await prisma.post.findMany({
      where: { authorId: user.id },
    });
    const boardIds = posts1.map(post => post.boardId);
    const boardNames = await prisma.board.findMany({
      where: { id: { in: boardIds } },
      select: { name: true },
    });
    let posts = [];
    for (let i = 0; i< boardNames.length; i++) {
      posts.push({ ...posts1[i], boardName: boardNames[i].name });
    }
    console.log('got posts', posts)
    const comments = await prisma.comment.findMany({
      where: { userId: user.id },
    });
    const subscriptions = await prisma.userRole.findMany({
      where: { userId: user.id, subscribed: true },
      select: {
        board: true
      }
    });
    const profile = await prisma.profile.findFirst({
      where : { userId: user.id }
    });
    console.log("user is ", user)
    const response = { user, boards, posts, comments, subscriptions, profile }
    // console.log("response is ", response)
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/:id/cdoots', async (req, res) => {
  const { id } = req.params;
  try {
    const doots = await prisma.comment.findUnique({
      where: { id: id },
    });
    console.log('got doots', doots)
    res.json(doots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/:id/cdoots', async (req, res) => {
  const { id } = req.params;
  const { doots } = req.body;
  try {
    let updatedDoots;
    if (doots < 0) {
      updatedDoots = await prisma.comment.update({
        where: { id: Number(id) },
        data: { doots: { decrement: doots } },
      });
    }else {
      updatedDoots = await prisma.comment.update({
        where: { id: Number(id) },
        data: { doots: { increment: doots } },
      });
    }
    console.log('updated doots', updatedDoots)
    res.json(updatedDoots);
  } catch (error) {
    console.log('error updating doots', error)
    res.status(500).json({ error: error.message });
  }
});
// app.post('/api/user/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: Number(id) },
//     });
//     console.log('got user', user)
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// })

app.post('/api/board/info/subscribed', async (req, res) => {
    const { boardId, userId } = req.body
    //console.log(`board id: ${boardId} , userid: ${userId}`)
    let subscribed;
try {
   subscribed = await prisma.userRole.findFirst({
    where: {
      userId: userId,
      boardId: boardId,
    }, 
    select: {
      subscribed: true,
    }
  })
  if (subscribed == null) {
    console.log(" userRole status was not found, creating userRole")
    userRole = await prisma.userRole.create({
      data: {
        userId: userId,
        boardId:  boardId,
        role: 'STANDARD',
        subscribed: false,
      }
    })
    subscribed = false 
    console.log(" set subbed false ")
  }
  else {
    // console.log(JSON.stringify(subscribed))
    // subscribed = await prisma.userRole.findFirst({
    //   where: {
    //         userId: userId,
    //         boardId: boardId,   
    //   },
    //   select: {
    //     subscribed: true,
    //   }
    // })
    }
    console.log(`is ${userId} subscribed to ${boardId}? ` + JSON.stringify(subscribed))
    if (subscribed.subscribed) {
      res.json({ subscribed: true });
    } else {
      res.json({ subscribed: false });
    }
  }
    //res.send(subscribed)
  catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/board/info/:boardName/tags', async (req, res) => {
  const { boardName } = req.params.boardName
  const tags2 = await prisma.board.findFirst({
    where: {
      name: boardName,
    },
  })
  res.json(tags2)
})
app.use(express.json());

app.get('/api/:boardId/tags', async (req, res) => {
  const { boardId } = req.params
  try {
    const tags = await prisma.tag.findMany({
      where: {
        boardId: Number(boardId),
      },
    });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    // res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/:boardName/tags', async (req, res) => {
  try{
    const { boardName } = req.params
    // const { name, boardId } = req.body
    console.log("req.body: ", req.body )
    const tagsObj = req.body
    console.log("tagsObj: ", tagsObj)
    // console.log("boardId: ", boardId)
    // console.log("name: ", name)
    let tag = null;

  // const board = await prisma.board.findFirst({
  //   where: {
  //     name: boardName,
  //   },
  // });
  try {
    tag = await prisma.tag.findFirst({
      where: {
        name: tagsObj.name,
        // name: name,
        // boardId: boardId,  
      },
    });
  }
  catch (error){
    console.error('Error fetching tag:', error);
  }
  if (tag === null) {
    const tag = await prisma.tag.create({
      data: {
        name: tagsObj.name,
      },
    });
  const updatedBoard = await prisma.board.update({
    where: {
      id: tagsObj.boardId,
    },
    data: {
      tags: {
        connectOrCreate: {
          create: {
            name: tagsObj.name,
          },
          where: {
            name: tagsObj.name,
          },
        },
      },
    },
    include: {
      tags: true,
    },
  });
  res.json({"created" :updatedBoard})
  }
  else {
    res.json({"tag already exists": tag})
    console.log("tag already exists")
  }
}

catch (error) {
  console.error('Error fetching tags:', error);
  // res.status(500).json({ error: 'Internal Server Error' });
}
});
//write an endpoint that gets all the boards for a given tag
app.get('/api/tag/:name/', async (req, res) => {
  const { name } = req.params;
  try {
    const boards = await prisma.board.findMany({
      where: {
        tags: {
          some: {
            name: name,
          },
        },
      },
    });
    console.log('got boards', boards)
    res.json(boards);
  } catch (error) {
    console.error('Error fetching tag:', error);
    // res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/board/:boardName/userRole', async (req, res) => {
  const { userId, boardId } = req.body
  const userRole = await prisma.userRole.findFirst({
    where: {
      userId: userId,
      boardId: boardId,
    },
  })
  console.log(`returned userRole for boardId=${boardId}, userId =${userId} `)
  res.json(userRole)
})
// server.js
app.get('/post/:id', async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  console.log(`post is ${JSON.stringify(post)}`)
  res.json(post);
});
app.post('/api/:postId/newComment', async (req, res) => {
  const { postId } = req.params;
  const { comment, userId } = req.body;
  try {
    userName = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    });
  }
  catch (error) {
    console.error('Error fetching user name:', error);
  }
  console.log('got username', userName)
  try {
    const newComment = await prisma.comment.create({
      data: {
        comment: comment,
        postId: Number(postId),
        userId: Number(userId),
        userName: userName.name,
      },
    });

    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//write a query that gets all the comments in a post
app.get('/api/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  //return the author of the comment

  try {
    let comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },
    });
    // const username = await prisma.user.findFirst({
    //   where: {
    //     id: comments.userId,
    //   },
    //   });
    // let combined = [];
    const combined = await Promise.all(comments.map(async (comment) => {
    // await comments.forEach(async (comment) => {
      const user = await prisma.user.findFirst({
          where: {
            id: comment.userId,
          },
        })
        // console.log('user is ' + JSON.stringify(user))  
        // combined.push({ ...comment, username: user?.username });
        return ({ ...comment, username: comment.userName })
    }));
    // console.log('prisma got comments with username', commentsWithUsername);
    // console.log('combined comments with username', combined);
    res.json(combined);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.post('/api/:boardId/:postId/commentId', async (req, res) => {
//   const { boardId, postId, commentId } = req.params;
//   const { userId, content } = req.body;

//   try {
//     //make this create a new comment
//     const comment = await prisma.comment.findUnique({
//       where: {
//         id: Number(commentId),
//       },
//     });

//     res.json(comment);
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });
app.post('/api/:boardName/ban', async (req, res) => {
  const { boardName } = req.params
  const { banName } = req.body
  try {
    const board = await prisma.board.findFirst({
      where: {
        name: boardName,
      },
    });
  const userToBan = await prisma.user.findFirst({
    where: {
      name: banName
    }
  })
  console.log(`user to ban is ${JSON.stringify(userToBan)}`)
  const userRole = await prisma.userRole.findFirst({
    where: {
      userId: userToBan.id,
      boardId: board.id,
    }
  })
  //if usurRole is null, create a new userRole here
  let bannedUserRole = "not banned";
  if (userRole != null) {
  console.log(`user's user role is ${JSON.stringify(userRole)}`)
  bannedUserRole = await prisma.userRole.upsert({      
    where: {
      id: userRole.id,
      userId: userToBan.id,
      boardId: board.id,
    },
    update: {
      role: 'STANDARD',
      banned: true,
    },
    create: {
      board: {
        connect: {
          id: board.id,
        },
      },
      user: {
        connect: {
          id: userToBan.id,
        },
      },
      subscribed: true,
      role: 'STANDARD',
    }
  });
  }
  else {
    bannedUserRole = await prisma.userRole.create({
      data: {
        userId: userToBan.id,
        boardId: board.id,
        role: 'STANDARD',
        banned: true,
      }
    })
  }
  res.json(bannedUserRole)
  console.log(`banned user's updated user role: ${JSON.stringify(bannedUserRole)}`)
  }
  catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
  //upsert userRole to banned=true
//update tags
app.post('/api/board/tags/update', async (req, res) => {
  const { boardId, tags } = req.body;
  try {
    // Update the tags for the board with the given boardId
    const updatedBoard = await prisma.board.update({
      where: { id: boardId },
      data: { tags: { set: tags } },
    });
    res.json(updatedBoard);
  } catch (error) {
    console.error('Error updating tags:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//unused
app.post('/api/board/info/:name', async (req, res) => {
    const { name } = req.params
try {
  const subscribed = await prisma.userRole.findFirstOrThrow({
    where: { id: userId },
    include: { subscriptions: { where: { id: boardId } } },
  });
}catch (error) {
  console.error('Error fetching boards:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

app.post('/api/unsubscribe', async (req, res) => {
   const { boardId, userId } = req.body
  try {
    userRole = await prisma.userRole.findFirst({
      where: {
        boardId: parseInt(boardId),
        userId: parseInt(userId)
      },
    })
    const updatedUserRole = await prisma.userRole.update({ 
    where: {
      id: userRole.id,
      userId: userId,
      boardId: boardId,
    },
    data: {
      subscribed: false,
    },
  });
  console.log("UserRole updated:", updatedUserRole);
  }catch (error) {
  console.error('Error fetching boards:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});
app.post('/api/newboard/set-owner', async (req, res) => {
  const { boardId, userId } = req.body
  console.log(boardId)
  try {
      const existingUserRole = await prisma.userRole.findFirst({
        where: {
          userId: userId,
          boardId: boardId,
        },
      });
      
      if (existingUserRole) {
        const updatedUserRole = await prisma.userRole.update({
          where: {    
              id: existingUserRole.id,    
              userId: userId,
              boardId: boardId,
          },
          data: {
            role: 'OWNER', // Update the role or other fields as needed
            // ... other fields to update
          },
        });
        // Handle the updated entry as needed
        console.log('UserRole updated:', updatedUserRole);
      } else {
        // If the entry does not exist, create a new one
        const newUserRole = await prisma.userRole.create({
          data: {
            userId: userId,
            boardId: boardId,
            subscribed: true,
            role: 'OWNER',
            // ... other fields for the new entry
          },
        });
        // Handle the newly created entry as needed
        console.log('New UserRole created:', newUserRole);
        res.json(newUserRole)
      }
  }catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.post('/api/subscribe', async (req, res) => {
   const { boardName, userId } = req.body
try {
  const board = await prisma.board.findFirst({
    where: {
      name: boardName,
    },
  });
  console.log('board is ' + board)
  if (board){
    const userRole = await prisma.userRole.findFirstOrThrow({
      where: {
        userId,
        boardId: board.id,
      }
    })
    console.log(`user ${userId} has role ${JSON.stringify(userRole)} on board ${board} before upsert`)
    const subscribed = await prisma.userRole.upsert({
      where: {
        id: userRole.id,
        userId,
        boardId: board.id,
      },
      update: {
        subscribed: true,
      },
      create: {
        board: {
          connect: {
            id: board.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        subscribed: true,
        role: 'STANDARD',
      }
    });
    console.log("upserted " + JSON.stringify(subscribed))
  }
  res.send(true)
}catch (error) {
  console.error('Error fetching boards:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

app.get('/api/boards', async (req, res) => {
    
  try{
    const boards = await prisma.board.findMany({
      include: {
        owner: {
          select: {
            name: true,
          },
        },
      }
    });
    // console.log(JSON.stringify(boards))
    
    res.json(boards);

  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

app.post('/api/newboard', async (req, res) => {
  const { name, userId } = req.body;

  try {
    // console.log(postedBy)
    const newBoard = await prisma.board.create({
      data: {
        name,
        userId,
      },
    });
    res.status(201).json(newBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/newpost', async (req, res) => {
  const {title, content, authorId, boardName} = req.body;
  const userName = await prisma.user.findFirst({
    where: {
      id: authorId,
    },
    select: {
      name: true,
    }
  });
  try {
    const boardId = await prisma.board.findUnique({
      where: {
         name: boardName 
      }
    })
    let userNameString = userName.name.toString()
    const time = new Date().toISOString()
    console.log("time is" + time)
    console.log("board is " + JSON.stringify(boardId))
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: authorId
          }
        },
        authorName: userNameString,
        published: true,
        Board: {
          connect: {
            id: boardId.id
          }
        },
        createdAt: time
      }
    })
    res.status(201).json(newPost);

  }catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal server error'})
  }
});

app.post('/api/create-account', async (req, res) => {
    const {email, name, password} = req.body;
    let user = false;
    try {
      user = await prisma.user.findUnique({
        where: { email },
      })
      if (!user){
          console.log(" user was not found, creating user")
          newuser = await prisma.user.create({
            //const hashedPassword = await bcrypt.hash(password, 10);
            data: {
              email, name, password
            }
          });
        res.status(201).json({ message: 'User created successfully', newuser });
      } else {
        return res.status(400).json({ error: 'User already exists' })
      }
    }
    catch(error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' }); 
    }
});
app.get('/api/board/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const board = await prisma.board.findUnique({
      where: { name: name },
      include: { posts: true },
    });

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    console.log('got board', board)
    res.json(board);
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/my-posts', async (req, res) => {
  const { authorId } = req.body;
  try {
    const posts = await prisma.posts.findMany({
      where: {
        authoriD: authorId
      }
    })
  }catch (error){
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  res.json({posts});
})
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("user from server was: " + JSON.stringify(user))
    if (!user || user.password !== password) {
      console.log("error1 was: " + user.password + " vs password u put " + password)
      return res.status(401).json({ error: 'Invalid credentials' });
    }

      const token = jwt.sign(user, 'your_secret_key', { expiresIn: '1h' });
      
      res.json({ user, token });
    } catch(error) {
      console.log("error2 was: " + error)
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
  const port = process.env.PORT || 5000;
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
