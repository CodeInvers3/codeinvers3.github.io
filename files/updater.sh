#!/bin/sh

"$(opkg remove rp-pppoe-server && rp-pppoe-common)"

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
    
    rm -f /usr/sbin/pppwn /etc/init.d/pw /etc/config/pw && rm -rf /root/*

    if [ -d /www/pppwn ]; then
        rm -rf /www/pppwn
    fi
    if [ -f /www/pppwn.html ]; then
        rm -f /www/pppwn.html
    fi
    if [ -f /www/cgi-bin/pw.cgi ]; then
        rm -f /www/cgi-bin/pw.cgi
    fi

"$(opkg update && opkg install rp-pppoe-common rp-pppoe-server)"
        wait

        mkdir /tmp/PPPwn_ow /www/pppwn
        "$(wget -O /tmp/pw.tar https://raw.githubusercontent.com/CodeInvers3/codeinvers3.github.io/refs/heads/master/files/PPPwn_ow.tar &)"
        wait
        
        "$(tar -xvf /tmp/pw.tar -C /tmp/PPPwn_ow && rm /tmp/pw.tar)"
        mv -f /tmp/PPPwn_ow/etc/config/* /etc/config
        mv -f /tmp/PPPwn_ow/etc/init.d/* /etc/init.d
        mv -f /tmp/PPPwn_ow/etc/ppp/* /etc/ppp
        mv -f /tmp/PPPwn_ow/stage1 /root
        mv -f /tmp/PPPwn_ow/stage2 /root
        mv -f /tmp/PPPwn_ow/version /root
        mv -f /tmp/PPPwn_ow/www/* /www/pppwn
        rm -r /tmp/PPPwn_ow
        chmod +x /etc/init.d/pw /etc/init.d/pppoe-server /www/pppwn/cgi-bin/pw.cgi

        uci set uhttpd.pppwn=uhttpd
        uci set uhttpd.pppwn.listen_http='81'
        uci set uhttpd.pppwn.home='/www/pppwn'
        uci set uhttpd.pppwn.cgi_prefix='/cgi-bin'
        uci set uhttpd.pppwn.script_timeout='90'
        uci set uhttpd.pppwn.network_timeout='60'
        uci set uhttpd.pppwn.tcp_keepalive='1'
        uci add_list uhttpd.pppwn.interpreter='.sh=/bin/sh'
        uci add_list uhttpd.pppwn.interpreter='.cgi=/bin/sh'
        uci commit uhttpd

        /etc/init.d/uhttpd restart
        /etc/init.d/pppoe-server enable
        /etc/init.d/pppoe-server start
