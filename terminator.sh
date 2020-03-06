client=`sudo netstat -ntlp | grep :3000 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
sudo kill -9 ${client}

server=`sudo netstat -ntlp | grep :8443 | awk -F 'LISTEN      ' '{print $2}' | awk -F '/' '{printf $1}'`
sudo kill -9 ${server}