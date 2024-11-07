#!/bin/sh

opkg update
opkg upgrade

if [ -f /etc/init.d/pppoe-server ]; then
    rm /etc/init.d/pppoe-server
fi
if [ -f /etc/config/pppoe ]; then
    rm /etc/config/pppoe
fi
if [ -f /etc/ppp/chap-secrets ]; then
    rm /etc/ppp/chap-secrets
fi
if [ -f /etc/ppp/pap-secrets ]; then
    rm /etc/ppp/pap-secrets
fi
if [ -f /etc/ppp/pppoe-server-options ]; then
    rm /etc/ppp/pppoe-server-options
fi
if [ -d /www/assets ]; then
    rm -rf /www/assets
fi
if [ -f /www/pppwn.html ]; then
    rm -f /www/pppwn.html
fi
if [ -f /www/cgi-bin/pw.cgi ]; then
    rm -f /www/cgi-bin/pw.cgi
fi

rm -f /usr/sbin/pppwn /etc/init.d/pw /etc/config/pw && rm -rf /root/*

mkdir /tmp/PPPwn_ow
wget -O /tmp/pw.tar https://raw.githubusercontent.com/CodeInvers3/codeinvers3.github.io/refs/heads/master/files/PPPwn_ow.tar
tar -xvf /tmp/pw.tar -C /tmp/PPPwn_ow && rm /tmp/pw.tar

mv -f /tmp/PPPwn_ow/etc/config/* /etc/config
mv -f /tmp/PPPwn_ow/etc/init.d/* /etc/init.d
mv -f /tmp/PPPwn_ow/etc/ppp/* /etc/ppp
mv -f /tmp/PPPwn_ow/stage1 /root
mv -f /tmp/PPPwn_ow/stage2 /root
mv -f /tmp/PPPwn_ow/version /root
mv -f /tmp/PPPwn_ow/www/cgi-bin/pw.cgi /www/cgi-bin/
mv -f /tmp/PPPwn_ow/www/pppwn.html /www/
mv -f /tmp/PPPwn_ow/www/assets /www/

rm -r /tmp/PPPwn_ow

chmod +x /etc/init.d/pw /etc/init.d/pppoe-server /www/cgi-bin/pw.cgi

/etc/init.d/pppoe-server enable
/etc/init.d/pppoe-server start

rm -f /tmp/updater.sh