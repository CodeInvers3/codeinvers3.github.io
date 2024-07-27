import * as React from "react"
import { Script } from "gatsby"

const PayloadPage = () => {

    function jxhr(options) {

        var req = new XMLHttpRequest();

        if (typeof options.async == 'boolean') {
            req.open(options.method, options.url, options.async);
        } else {
            req.open(options.method, options.url);
        }

        if (options.responseType) {
            req.responseType = options.responseType;
        }

        req.onload = function () {
            if (req.status >= 200 && req.status < 300) {
                if (typeof options.success === 'function') {
                    options.success(req);
                }
            } else {
                if (typeof options.error === 'function') {
                    options.error(req.statusText);
                }
            }
        };

        req.onerror = function () {
            if (typeof options.error === 'function') {
                options.error(req.statusText);
            }
        };

        req.send(options.data ? options.data : null);

        return {
            done: function (callback) {
                options.success = callback;
                return this;
            },
            fail: function (callback) {
                options.error = callback;
                return this;
            }
        };

    }

    function setPayload(source){

        jxhr({
            method: 'POST',
            url: 'http://192.168.2.11:9090/status',
        }).done(function(req){

            alert(req);
            
            /*var res = JSON.parse(req.responseText);
            if(res.status == 'ready'){
                
                jxhr({
                    method: 'GET',
                    url: '/payloads/'+source,
                    responseType: 'arraybuffer'
                }).done(function(req){
                    
                    if((req.status === 200 || req.status === 304) && req.response){
                        
                        jxhr({
                            method: 'POST',
                            url: 'http://127.0.0.1:9090',
                            async: true,
                            data: req.response
                        }).done(function(event){

                            if(req.status === 200){
                                document.getElementById('output').innerHTML = 'Payload loaded!\n';
                            }else{
                                document.getElementById('output').innerHTML = 'Cannot send payload\n';
                                return;
                            }

                        }).fail(function(){
                            alert("Cannot Load Payload Because The BinLoader Server Is Busy");
                        });

                    }

                });
            }*/

        }).fail(function(err){
            alert("Cannot Load Payload Because The BinLoader Server Is Not Running");
        });
    }

    return (
    <main>
        <p>Payload page</p>
        <div>
            <button type="button" onClick={
                function(){
                    setPayload('pl_wtsb.bin');
                }
            }>board type</button>
            <div>
                <textarea id="output"></textarea>
            </div>
        </div>
    </main>
    )
}

export default PayloadPage

export function Head() {
    return (
        <title>Payload page</title>
    )
}
