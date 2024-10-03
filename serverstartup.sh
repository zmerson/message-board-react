#!/bin/bash

# Navigate to the directory where your React app is located
cd /home/apps/message-board-react/

# Run the React app using npm
npm run start-react

# Keep the process running
exec "$@"
