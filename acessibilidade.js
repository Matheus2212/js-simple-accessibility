var ACCESSIBILITY = {

    body:null,
    
    widget: null,
    
    memory: null,

    cookieName: "ACCESSIBILITYMEMORY",

    getMemory:function(){
        var exp = this.cookieName;
        var reg = new RegExp(exp);
        var memory = null;
        if(reg.test(document.cookie)){
            var name = exp+"=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                memory= c.substring(name.length, c.length);    
              }
            }
            if(memory==null){
                memory = {};
            }else{
                memory = JSON.parse(memory);
            }
        }else{
            memory = {};
        }
        this.memory = memory;
        return this.memory;
    },
    setMemoryActivity: function(activityObject){
        this.memory[activityObject.name] = activityObject.value;
        this.setMemory();
    },
    removeMemoryActivity: function(activityName){
        delete this.memory[activityName];
        this.setMemory();
    },
    setMemory:function(){
        var memory = JSON.stringify(this.memory);
        var d = new Date();
        d.setTime(d.getTime() + (1*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = this.cookieName + "=" + memory + ";" + expires + ";path=/";
    },    
    applyMemory:function(){
        var actions = Object.keys(this.actions);
        var event = new Event('click');
        for(var iterar = 0;iterar<actions.length;iterar++){
            var acao = this.actions[actions[iterar]],name = acao.name;
            if(this.memory.hasOwnProperty(name)){
                var value = this.memory[name];
                if(value==1){
                    this.widget.getElementsByClassName(name)[0].dispatchEvent(event);
                }
                if(value>1){
                    for(var i = 0;i<value;i++){
                        this.widget.getElementsByClassName(name)[0].dispatchEvent(event);
                    }
                }
            }
        }
    },
    
    language: null,
    languages: {
        "pt-br":{
            header: {
                text: "Acessibilidade",
                classes: "accessibilityHeader"
            },
            footer: {
                text: "Redefinir",
                classes:"accessibilityFooter"
            }
        }
    },

    widgetWindowHTML: "<div class='accessibilityWrapper'><a class='accessibilityClose'></a><div class='accessibilityHeader'></div><div class='accessibilityContent'></div><div class='accessibilityFooter'></div></div>",

    classes : new Array(),

    actions: {
        invertColors:{
            name:"accessibilityInvertColors",
            text:{
                "pt-br":{
                    text:"Inverter Cores"
                }
            },
            image: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"/></svg>',
            action:function(accessibility,button){
                button.name = this.name;
                button.addEventListener('click',function(evt){
                    evt.preventDefault();
                    var classes = accessibility.body.classList;
                    var abrir = true;
                    for(var iterar = 0 ;iterar<classes.length;iterar++){
                        if(classes[iterar]==this.name){
                            abrir = false;
                        }
                    }
                    if(abrir){
                        accessibility.body.classList.add(this.name);
                        button.classList.add('accessibilityActive');
                        accessibility.setMemoryActivity({name:this.name,value:1});
                    }else{
                        accessibility.body.classList.remove(this.name);
                        button.classList.remove('accessibilityActive');
                        accessibility.removeMemoryActivity(this.name);
                    }
                });
            }
        },
        contrast:{
            name:"accessibilityContrast",
            text:{
                "pt-br":{
                    text:"Contraste"
                }
            },
            image: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.64 8.64" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 8.64 8.64"><g><g><path fill="#020400" fill-rule="evenodd" d="m4.32,0c-2.386,0-4.32,1.934-4.32,4.32 0,2.386 1.934,4.32 4.32,4.32s4.32-1.934 4.32-4.32c0-2.386-1.934-4.32-4.32-4.32zm0,8.16c-2.121,0-3.84-1.719-3.84-3.84 0-2.121 1.719-3.84 3.84-3.84 2.121,0 3.84,1.719 3.84,3.84 0,2.121-1.719,3.84-3.84,3.84zm-.24-7.2c-0.034,0-0.065,0.007-0.094,0.02-1.699,0.168-3.026,1.598-3.026,3.34 0,1.743 1.327,3.172 3.025,3.34 0.03,0.013 0.061,0.02 0.095,0.02 0.133,0 0.24-0.108 0.24-0.24 0-0.002-0.002-0.004-0.002-0.007h0.002v-6.233c0-0.133-0.108-0.24-0.24-0.24zm-.24,6.197c-1.362-0.229-2.4-1.41-2.4-2.837s1.038-2.608 2.4-2.837v5.674z"/></g></g></svg>',
            action:function(accessibility,button){
                button.name = this.name;
                button.addEventListener('click',function(evt){
                    evt.preventDefault();
                    var classes = accessibility.body.classList;
                    var abrir = true;
                    for(var iterar = 0 ;iterar<classes.length;iterar++){
                        if(classes[iterar]==this.name){
                            abrir = false;
                        }
                    }
                    if(abrir){
                        accessibility.body.classList.add(this.name);
                        button.classList.add('accessibilityActive');
                        accessibility.setMemoryActivity({name:this.name,value:1});
                    }else{
                        accessibility.body.classList.remove(this.name);
                        button.classList.remove('accessibilityActive');
                        accessibility.removeMemoryActivity(this.name);
                    }
                });
            }
        },
        grayScale:{
            name:"accessibilityGrayScale",
            text:{
                "pt-br":{
                    text:"Escala de Cinza"
                }
            },
            image: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="459px" height="459px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve"><g><g id="invert-colors"><path d="M357,229.5c0-71.4-56.1-127.5-127.5-127.5v255C300.9,357,357,300.9,357,229.5z M408,0H51C22.95,0,0,22.95,0,51v357 c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V51C459,22.95,436.05,0,408,0z M408,408H229.5v-51 C158.1,357,102,300.9,102,229.5c0-71.4,56.1-127.5,127.5-127.5V51H408V408z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
            action:function(accessibility,button){
                button.name = this.name;
                button.addEventListener('click',function(evt){
                    evt.preventDefault();
                    var classes = accessibility.body.classList;
                    var abrir = true;
                    for(var iterar = 0 ;iterar<classes.length;iterar++){
                        if(classes[iterar]==this.name){
                            abrir = false;
                        }
                    }
                    if(abrir){
                        accessibility.body.classList.add(this.name);
                        button.classList.add('accessibilityActive');
                        accessibility.setMemoryActivity({name:this.name,value:1});
                    }else{
                        accessibility.body.classList.remove(this.name);
                        button.classList.remove('accessibilityActive');
                        accessibility.removeMemoryActivity(this.name);
                    }
                });
            }
        },
        highlightLinks:{
            name:"accessibilityHighLightLinks",
            text:{
                "pt-br":{
                    text:"Destacar Links"
                }
            },
            image: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="482.136px" height="482.135px" viewBox="0 0 482.136 482.135" style="enable-background:new 0 0 482.136 482.135;" xml:space="preserve"><g><path d="M455.482,198.184L326.829,326.832c-35.535,35.54-93.108,35.54-128.646,0l-42.881-42.886l42.881-42.876l42.884,42.876 c11.845,11.822,31.064,11.846,42.886,0l128.644-128.643c11.816-11.831,11.816-31.066,0-42.9l-42.881-42.881 c-11.822-11.814-31.064-11.814-42.887,0l-45.928,45.936c-21.292-12.531-45.491-17.905-69.449-16.291l72.501-72.526 c35.535-35.521,93.136-35.521,128.644,0l42.886,42.881C491.018,105.045,491.018,162.663,455.482,198.184z M201.206,366.698 l-45.903,45.9c-11.845,11.846-31.064,11.817-42.881,0l-42.884-42.881c-11.845-11.821-11.845-31.041,0-42.886l128.646-128.648 c11.819-11.814,31.069-11.814,42.884,0l42.886,42.886l42.876-42.886l-42.876-42.881c-35.54-35.521-93.113-35.521-128.65,0 L26.655,283.946c-35.538,35.545-35.538,93.146,0,128.652l42.883,42.882c35.51,35.54,93.11,35.54,128.646,0l72.496-72.499 C246.724,384.578,222.588,379.197,201.206,366.698z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
            action:function(accessibility,button){
                button.name = this.name;
                button.addEventListener('click',function(evt){
                    evt.preventDefault();
                    var classes = accessibility.body.classList;
                    var abrir = true;
                    for(var iterar = 0 ;iterar<classes.length;iterar++){
                        if(classes[iterar]==this.name){
                            abrir = false;
                        }
                    }
                    if(abrir){
                        accessibility.body.classList.add(this.name);
                        button.classList.add('accessibilityActive');
                        accessibility.setMemoryActivity({name:this.name,value:1});
                    }else{
                        accessibility.body.classList.remove(this.name);
                        button.classList.remove('accessibilityActive');
                        accessibility.removeMemoryActivity(this.name);
                    }
                });
            }
        },
        highlightTitles:{
            name:"accessibilityHighLightTitles",
            text:{
                "pt-br":{
                    text:"Destacar Títulos"
                }
            },
            image: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 4v3h5.5v12h3V7H19V4z"/></svg>',
            action:function(accessibility,button){
                button.name = this.name;
                button.addEventListener('click',function(evt){
                    evt.preventDefault();
                    var classes = accessibility.body.classList;
                    var abrir = true;
                    for(var iterar = 0 ;iterar<classes.length;iterar++){
                        if(classes[iterar]==this.name){
                            abrir = false;
                        }
                    }
                    if(abrir){
                        accessibility.body.classList.add(this.name);
                        button.classList.add('accessibilityActive');
                        for(var iterar = 1;iterar<=6;iterar++){
                            var elms = document.getElementsByTagName('h'+iterar);
                            if(elms!==null){
                                for(var i = 0;i<elms.length;i++){
                                    elms[i].style.border = "3px solid #FF0000";
                                }
                            }
                        }
                        accessibility.setMemoryActivity({name:this.name,value:1});
                    }else{
                        accessibility.body.classList.remove(this.name);
                        button.classList.remove('accessibilityActive');
                        for(var iterar = 1;iterar<=6;iterar++){
                            var elms = document.getElementsByTagName('h'+iterar);
                            if(elms!==null){
                                for(var i = 0;i<elms.length;i++){
                                    elms[i].style.border = "";
                                }
                            }
                        }
                        accessibility.removeMemoryActivity(this.name);
                    }
                });
            }
        },
        FontSize:{
            name:"accessibilityFontSize",
            text:{
                "pt-br":{
                    text:"Fonte"
                }
            },
            image: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16"><path fill-rule="evenodd" d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"/></svg>',
            action:function(accessibility,button){
                button.name = this.name;
                button.addEventListener('click',function(evt){
                    evt.preventDefault();
                    if(typeof window.accessibilityText == "undefined"){
                        window.accessibilityText = 0;
                    }
                    window.accessibilityText++;
                    var elms = document.getElementsByTagName('*');
                    if(window.accessibilityText==4){
                        delete window.accessibilityText;
                        if(elms!==null){
                            for(var iterar = 0;iterar<elms.length;iterar++){
                                var fontSize = elms[iterar].getAttribute('fontSize');
                                var lineHeight = elms[iterar].getAttribute('lineHeight');
                                elms[iterar].removeAttribute('style')
                            }
                        }
                        accessibility.body.classList.remove(this.name);
                        button.classList.remove('accessibilityActive');
                        accessibility.removeMemoryActivity(this.name);
                    }else{
                        var classes = accessibility.body.classList;
                        if(elms!==null){
                            for(var iterar = 0 ;iterar<elms.length;iterar++){
                                var fontSize = elms[iterar].style.fontSize;
                                var lineHeight = elms[iterar].style.lineHeight;
                                if(fontSize==""){
                                    fontSize = window.getComputedStyle(elms[iterar], null).getPropertyValue('line-height');
                                }
                                if(lineHeight==""){
                                    lineHeight = window.getComputedStyle(elms[iterar], null).getPropertyValue('font-size');
                                }
                                var LH = elms[iterar].getAttribute('lineHeight');
                                var FS = elms[iterar].getAttribute('fontSize');
                                if(LH == null && FS == null){
                                    elms[iterar].setAttribute('lineHeight',lineHeight);
                                    elms[iterar].setAttribute('fontSize',fontSize);
                                }
                                fontSize = parseFloat(fontSize.replace(/[a-zA-Z%]/,""));
                                if(lineHeight=="normal"){
                                    lineHeight = fontSize;
                                }
                                lineHeight = parseFloat(lineHeight.replace(/[a-zA-Z%]/,''))+2;
                                elms[iterar].style.fontSize = fontSize+2+"px";
                                elms[iterar].style.lineHeight = lineHeight+2+"px";
                            }
                        }
                        accessibility.body.classList.add(this.name);
                        button.classList.add('accessibilityActive');
                        accessibility.setMemoryActivity({name:this.name,value:window.accessibilityText});
                    }
                });
            }
        },
        stopAnimations:{
            name:"accessibilityStopAnimations",
            text:{
                "pt-br":{
                    text:"Parar Animações"
                }
            },
            image: '<svg id="blue_copy" style="enable-background:new 0 0 100 100;" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Layer_7_copy"><path d="M39.806,72.858h-8.915c-2.176,0-3.94-1.764-3.94-3.94V31.119c0-2.176,1.764-3.94,3.94-3.94h8.915   c2.176,0,3.94,1.764,3.94,3.94v37.799C43.746,71.094,41.982,72.858,39.806,72.858z"/><path d="M68.109,72.821h-8.915c-2.176,0-3.94-1.764-3.94-3.94V31.082c0-2.176,1.764-3.94,3.94-3.94h8.915   c2.176,0,3.94,1.764,3.94,3.94v37.799C72.049,71.057,70.285,72.821,68.109,72.821z"/><path d="M40.489,27.248c0.769,0.719,1.257,1.735,1.257,2.871v37.799c0,2.176-1.764,3.94-3.94,3.94h-8.915   c-0.234,0-0.46-0.03-0.683-0.069c0.704,0.658,1.643,1.069,2.683,1.069h8.915c2.176,0,3.94-1.764,3.94-3.94V31.119   C43.746,29.177,42.338,27.573,40.489,27.248z"/><path d="M68.792,27.211c0.769,0.719,1.257,1.735,1.257,2.871v37.799c0,2.176-1.764,3.94-3.94,3.94h-8.915   c-0.234,0-0.46-0.03-0.683-0.069c0.704,0.658,1.643,1.069,2.683,1.069h8.915c2.176,0,3.94-1.764,3.94-3.94V31.082   C72.049,29.14,70.641,27.535,68.792,27.211z"/><path d="M39.806,72.858h-8.915c-2.176,0-3.94-1.764-3.94-3.94V31.119   c0-2.176,1.764-3.94,3.94-3.94h8.915c2.176,0,3.94,1.764,3.94,3.94v37.799C43.746,71.094,41.982,72.858,39.806,72.858z" style="fill:none;stroke:#000000;stroke-miterlimit:10;"/><path d="M68.109,72.821h-8.915c-2.176,0-3.94-1.764-3.94-3.94V31.082   c0-2.176,1.764-3.94,3.94-3.94h8.915c2.176,0,3.94,1.764,3.94,3.94v37.799C72.049,71.057,70.285,72.821,68.109,72.821z" style="fill:none;stroke:#000000;stroke-miterlimit:10;"/></g></svg>',
            action:function(accessibility,button){
                button.name = this.name;
                button.addEventListener('click',function(evt){
                    evt.preventDefault();
                    var classes = accessibility.body.classList;
                    var abrir = true;
                    for(var iterar = 0 ;iterar<classes.length;iterar++){
                        if(classes[iterar]==this.name){
                            abrir = false;
                        }
                    }
                    if(abrir){
                        accessibility.body.classList.add(this.name);
                        button.classList.add('accessibilityActive');
                        accessibility.setMemoryActivity({name:this.name,value:1});
                    }else{
                        accessibility.body.classList.remove(this.name);
                        button.classList.remove('accessibilityActive');
                        accessibility.removeMemoryActivity(this.name);
                    }
                });
            }
        },
        bigCursor:{
            name:"accessibilityBigCursor",
            text:{
                "pt-br":{
                    text:"Cusor maior"
                }
            },
            image: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 463.721 463.721" style="enable-background:new 0 0 463.721 463.721;" xml:space="preserve"><g><g><path d="M407.453,224.871c0.85-6.517-1.983-13.317-7.65-16.717L82.186,2.737c-5.1-3.4-11.9-3.683-17.283-0.567 c-5.383,3.117-8.783,8.783-8.783,15.017v363.233c0,6.517,3.683,12.183,9.35,15.3c5.667,2.833,12.75,2.267,17.85-1.7l90.1-67.433 l82.45,129.2c3.117,5.1,8.783,7.933,14.45,7.933c2.833,0,5.95-0.85,8.5-2.267l84.15-48.733c3.967-2.267,6.8-6.233,7.933-10.767 c1.133-4.533,0.283-9.35-2.267-13.033l-76.783-120.983l103.7-29.183C401.786,236.771,406.603,231.387,407.453,224.871z M260.403,241.304c-5.1,1.417-9.35,5.383-11.333,10.2c-1.983,5.1-1.417,10.767,1.417,15.3l79.333,125.233l-54.683,31.733 l-83.017-130.9c-2.55-3.967-6.517-6.8-11.333-7.65c-1.133-0.283-1.983-0.283-3.117-0.283c-3.683,0-7.083,1.133-10.2,3.4 l-77.633,58.083V48.354l260.1,168.017L260.403,241.304z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
            action:function(accessibility,button){
                button.name = this.name;
                button.addEventListener('click',function(evt){
                    evt.preventDefault();
                    var classes = accessibility.body.classList;
                    var abrir = true;
                    for(var iterar = 0 ;iterar<classes.length;iterar++){
                        if(classes[iterar]==this.name){
                            abrir = false;
                        }
                    }
                    if(abrir){
                        accessibility.body.classList.add(this.name);
                        button.classList.add('accessibilityActive');
                        accessibility.setMemoryActivity({name:this.name,value:1});
                    }else{
                        accessibility.body.classList.remove(this.name);
                        button.classList.remove('accessibilityActive');
                        accessibility.removeMemoryActivity(this.name);
                    }
                });
            }
        }
    },

    createButton:function(){
        var acoes = Object.keys(this.actions);
        var content = this.widget.getElementsByClassName('accessibilityContent')[0];
        var accessibility = this;
        for(var iterar = 0;iterar<acoes.length;iterar++){
            var acao = this.actions[acoes[iterar]];
            var button = document.createElement('button');
            button.classList.add(acao.name);
            button.innerHTML = acao.image+acao.text[this.language].text;
            button.setAttribute('type','button');
            content.appendChild(button);
            acao.action(accessibility,button);
        }
    },

    widgetOpen: function(){
        this.body.classList.add('accessibilityOpen');
    },
    widgetClose: function(){
        this.body.classList.remove('accessibilityOpen');
    },
    widgetCloseEsc: function(accessibility, key){
        if(key.key=="Escape" || key.keyCode==27){
            accessibility.widgetClose();
        }
    },
    widgetCloseBodyClick: function(){
        var accessibility = this;
        this.body.addEventListener('click',function(){
            accessibility.widgetClose();
        });
        this.widget.addEventListener('click',function(evt){
            evt.stopPropagation();
        })
    },
    widgetOpenCtrlU: function(accessibility,key){
        if((key.key=="U" || key.key=="U" || key.keyCode==85) && (typeof window.accessibilityControlKeyDown !=="undefined" && window.accessibilityControlKeyDown == "1")){
            key.preventDefault();
            if(accessibility.isOpen()){
                accessibility.widgetClose();
            }else{
                accessibility.widgetOpen();
            }
        }else if(key.key=="Control" || key.keyCode==17){
            window.accessibilityControlKeyDown = "1";
        }else{
            delete window.accessibilityControlKeyDown;
        }
        var check = function(evt){
            delete window.accessibilityControlKeyDown;
        }
        window.removeEventListener("onkeyup",check,false);
        window.addEventListener("onkeyup",check);
    },
    widgetReset: function(){
        var widget = this;
        var icon = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="438.529px" height="438.528px" viewBox="0 0 438.529 438.528" style="enable-background:new 0 0 438.529 438.528;" xml:space="preserve"><g><g> <path d="M433.109,23.694c-3.614-3.612-7.898-5.424-12.848-5.424c-4.948,0-9.226,1.812-12.847,5.424l-37.113,36.835 c-20.365-19.226-43.684-34.123-69.948-44.684C274.091,5.283,247.056,0.003,219.266,0.003c-52.344,0-98.022,15.843-137.042,47.536 C43.203,79.228,17.509,120.574,5.137,171.587v1.997c0,2.474,0.903,4.617,2.712,6.423c1.809,1.809,3.949,2.712,6.423,2.712h56.814 c4.189,0,7.042-2.19,8.566-6.565c7.993-19.032,13.035-30.166,15.131-33.403c13.322-21.698,31.023-38.734,53.103-51.106 c22.082-12.371,45.873-18.559,71.376-18.559c38.261,0,71.473,13.039,99.645,39.115l-39.406,39.397 c-3.607,3.617-5.421,7.902-5.421,12.851c0,4.948,1.813,9.231,5.421,12.847c3.621,3.617,7.905,5.424,12.854,5.424h127.906 c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.42-7.898,5.42-12.847V36.542C438.529,31.593,436.733,27.312,433.109,23.694z"/><path d="M422.253,255.813h-54.816c-4.188,0-7.043,2.187-8.562,6.566c-7.99,19.034-13.038,30.163-15.129,33.4 c-13.326,21.693-31.028,38.735-53.102,51.106c-22.083,12.375-45.874,18.556-71.378,18.556c-18.461,0-36.259-3.423-53.387-10.273 c-17.13-6.858-32.454-16.567-45.966-29.13l39.115-39.112c3.615-3.613,5.424-7.901,5.424-12.847c0-4.948-1.809-9.236-5.424-12.847 c-3.617-3.62-7.898-5.431-12.847-5.431H18.274c-4.952,0-9.235,1.811-12.851,5.431C1.807,264.844,0,269.132,0,274.08v127.907 c0,4.945,1.807,9.232,5.424,12.847c3.619,3.61,7.902,5.428,12.851,5.428c4.948,0,9.229-1.817,12.847-5.428l36.829-36.833 c20.367,19.41,43.542,34.355,69.523,44.823c25.981,10.472,52.866,15.701,80.653,15.701c52.155,0,97.643-15.845,136.471-47.534 c38.828-31.688,64.333-73.042,76.52-124.05c0.191-0.38,0.281-1.047,0.281-1.995c0-2.478-0.907-4.612-2.715-6.427 C426.874,256.72,424.731,255.813,422.253,255.813z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
        var footer = this.widget.getElementsByClassName('accessibilityFooter')[0], content = footer.innerHTML;
        footer.innerHTML = "<a>"+icon+" "+content+"</a>";
        footer.getElementsByTagName('a')[0].addEventListener('click',function(event){
            event.preventDefault();
            widget.memory = {};
            widget.setMemory();
            var actions = widget.actions,keys = Object.keys(actions);
            var event = new Event('click');
            var buttons = widget.widget.getElementsByTagName('button');
            for(var iterar = 0;iterar<keys.length;iterar++){
                var action = actions[keys[iterar]];
                widget.body.classList.remove(action.name);
                buttons[iterar].classList.remove('accessibilityActive');
            }
            var a = document.getElementsByTagName('a');
            for(iterar = 0;iterar<a.length;iterar++){
                a[iterar].style.border = "none";
            }
            for(iterar = 1;iterar<=6;iterar++){
                var elms = document.getElementsByTagName('h'+iterar);
                for(var i = 0;i<elms.length;i++){
                    elms[i].style.border = "none";
                }
            }
            var elms = document.getElementsByTagName('*');
            for(iterar=0;iterar<elms.length;iterar++){
                elms[iterar].style.fontSize = '';
                elms[iterar].style.lineHeight = '';
            }
            delete window.accessibilityText;
            
        });
    },

    addClass: function(classItem){
        this.classes.push(classItem);
    },
    isOpen: function(){
        var classes = this.body.classList;
        for(var iterar = 0; iterar<classes.length;iterar++){
            if(classes[iterar]=="accessibilityOpen"){
                return true;
            }
        }
        return false;
    },
    
    setLanguage: function(language){        
        this.language = language;
    },
    setWidgetLanguage: function(){
        if(this.language==null){
            console.log("ACCESSIBILITY - Language is Undefined - Default: pt-br");
            this.language = "pt-br";
        }
        var language = this.languages[this.language];
        var keys = Object.keys(language);
        for(var iterar = 0;iterar<keys.length;iterar++){
            var span = document.createElement('span');
            span.innerHTML = language[keys[iterar]].text;
            var elm = this.widget.getElementsByClassName(language[keys[iterar]].classes);
            if(elm.length>0){
                elm = elm[0];
                elm.appendChild(span);
            }
        }
    },
    createWidgetFastTrigger:function(elm,accessibility){
        elm = document.getElementById(elm);
        var body = this.body;
        if(elm!==null){
            elm.style.cursor = "pointer";
            elm.addEventListener('click',function(evt){
                evt.preventDefault();
                evt.stopPropagation();
                if(accessibility.isOpen()){
                    accessibility.widgetClose()
                }else{
                    accessibility.widgetOpen();
                }
            });
        }
    },
    createWidget: function(accessibility){
        var check = document.getElementById("accessibilityWidget");
        if(check == null){
            this.widget = document.createElement('div');
            this.widget.setAttribute("id","accessibilityWidget");
            if(this.classes.length>0){
                for(var iterate = 0;iterate<this.classes.length;iterate++){
                    this.widget.classList.add(this.classes[iterate]);
                }
            }
            this.widget.innerHTML = this.widgetWindowHTML;
            this.body.appendChild(this.widget);
            this.widget.getElementsByClassName('accessibilityClose')[0].addEventListener('click',function(evt){
                evt.preventDefault();
                accessibility.widgetClose();
            });
        }else{
            this.widget = check;
        }
        this.widgetCloseBodyClick();
        window.addEventListener('keyup',function(evt){
            accessibility.widgetCloseEsc(accessibility,evt);
        });
        window.addEventListener('keydown',function(evt){
            accessibility.widgetOpenCtrlU(accessibility,evt);
        });
    },
    createAccessibility: function(elm){
        this.body = document.getElementsByTagName('body')[0];
        var accessibility = this;
        if(typeof navigator!=='undefined' && accessibility.language==null){
            if(typeof navigator.language!=="undefined"){
                accessibility.language = navigator.language.toLowerCase();
            }
        }        
        this.language = accessibility.language;
        if(this.widget==null){
           this.createWidget(accessibility);
           this.createButton();
        }
        if(this.language!==null){
            this.setWidgetLanguage();
        }
        this.widgetReset();
        if(typeof elm !=="undefined"){
            this.createWidgetFastTrigger(elm,accessibility);
        }
        this.getMemory();
        this.applyMemory();
    }    
}