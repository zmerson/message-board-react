#!/bin/bash

# Navigate to the directory where your Express app is located
cd /home/apps/message-board-react/

# Run the Express server using npm
npm run server

# Keep the process running
exec "$@"
