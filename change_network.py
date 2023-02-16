import socket    
hostname = socket.gethostname()    
ip = socket.gethostbyname(hostname)    

env = open('.env','a')
env.write('\n')
env.write('BASE_URL = http://'+ip+":5002")
env.close()