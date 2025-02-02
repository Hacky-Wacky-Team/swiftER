from getdata import get_data
import time
import subprocess

# Start the Node.js server
subprocess.Popen(['node', 'server.js'])

while True:
    get_data()

    # 10 min delay
    time.sleep(600)