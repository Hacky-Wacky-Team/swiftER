#!/bin/bash

# Start the Vite server in the background
npm run dev &

# Start the Python script
python3 main.py

# Wait for all background processes to finish (if needed)
wait
