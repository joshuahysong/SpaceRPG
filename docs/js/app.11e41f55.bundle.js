!function(t){function e(e){for(var n,s,a=e[0],h=e[1],u=e[2],c=0,p=[];c<a.length;c++)s=a[c],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&p.push(o[s][0]),o[s]=0;for(n in h)Object.prototype.hasOwnProperty.call(h,n)&&(t[n]=h[n]);for(l&&l(e);p.length;)p.shift()();return r.push.apply(r,u||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],n=!0,a=1;a<i.length;a++){var h=i[a];0!==o[h]&&(n=!1)}n&&(r.splice(e--,1),t=s(s.s=i[0]))}return t}var n={},o={0:0},r=[];function s(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=n,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var a=window.webpackJsonp=window.webpackJsonp||[],h=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var l=h;r.push([535,1]),i()}({1456:function(t,e,i){"use strict";i.r(e);var n=i(61),o=i.n(n),r=i(534),s=function(){function t(){}return t.isMobile=!1,t.isDebugging=!0,t}(),a=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),h=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return a(e,t),e.prototype.drawLine=function(t,e,i,n,r,s,a){r=r||"#ffffff",s=s||1,a=a||1;var h=this.add.graphics(),u=o.a.Display.Color.HexStringToColor(r).color;return h.lineStyle(a,u,s),h.lineBetween(t,e,i,n),h},e.prototype.betweenPoints=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-e.y,2))},e}(o.a.Scene),u=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),l=function(t){function e(){return t.call(this,{key:"BootScene"})||this}return u(e,t),e.prototype.preload=function(){s.isMobile=!this.sys.game.device.os.desktop,this.load.setBaseURL("./../assets/"),this.load.multiatlas("shipTiles","atlas/shipTiles.json","atlas/"),this.load.json("itemData","itemData.json")},e.prototype.create=function(){this.scene.start("ShipScene")},e}(h),c=function(){function t(){}return t.tileSize=32,t.worldSize=400,t}(),p=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),f=function(t){function e(e,i,n,o,r,s){var a=t.call(this,e,i,n,o,s?r.buildFrame:r.frame)||this;return a.displayWidth=c.tileSize,a.scaleY=a.scaleX,a.setOrigin(.5),a.item=r,a.location=new Phaser.Geom.Point(i/c.tileSize,n/c.tileSize),a}return p(e,t),e.prototype.updateLocation=function(){this.location=new Phaser.Geom.Point(this.x/c.tileSize,this.y/c.tileSize)},e}(Phaser.GameObjects.Sprite),d=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),y=function(t){function e(){var e=t.call(this,{key:"ShipScene"})||this;return e.pinchZoom=1,e.isHudPointerDown=!1,e.isBuilding=!1,e.shipArray=[[0,1,0,0,0,0,0],[1,1,1,1,1,1,1],[0,1,0,0,0,0,0]],e}return d(e,t),e.prototype.create=function(){this.createKeys(),this.bindDebugEvents(),this.bindCameraEvents(),this.bindHudEvents(),this.bindTileEvents(),this.setupCameras(),this.drawGrid(),this.drawShip(),s.isDebugging&&(this.drawDebug(),this.scene.run("DebugScene")),this.scene.run("HudScene")},e.prototype.update=function(t,e){if(s.isMobile&&(this.isHudPointerDown||!this.input.pointer1.isDown||this.input.pointer2.isDown?this.oldPointerPosition=null:(this.oldPointerPosition&&(this.cameras.main.scrollX+=(this.oldPointerPosition.x-this.input.pointer1.position.x)/this.cameras.main.zoom,this.cameras.main.scrollY+=(this.oldPointerPosition.y-this.input.pointer1.position.y)/this.cameras.main.zoom),this.oldPointerPosition=this.input.pointer1.position.clone())),!s.isMobile){this.keyEsc.isDown&&this.isBuilding&&this.buildingTiles&&this.clearBuildingTiles();(this.keyW.isDown||this.cursors.up.isDown)&&(this.cameras.main.scrollY-=10/this.cameras.main.zoom),(this.keyA.isDown||this.cursors.left.isDown)&&(this.cameras.main.scrollX-=10/this.cameras.main.zoom),(this.keyS.isDown||this.cursors.down.isDown)&&(this.cameras.main.scrollY+=10/this.cameras.main.zoom),(this.keyD.isDown||this.cursors.right.isDown)&&(this.cameras.main.scrollX+=10/this.cameras.main.zoom)}},e.prototype.createKeys=function(){s.isMobile||(this.cursors=this.input.keyboard.createCursorKeys(),this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),this.keyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),this.keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.keyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),this.keyEsc=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC))},e.prototype.setupCameras=function(){this.cameras.main.setBounds(-1*c.tileSize*c.worldSize/2,-1*c.tileSize*c.worldSize/2,c.tileSize*c.worldSize,c.tileSize*c.worldSize);var t=this.shipArray[0].length*c.tileSize/2,e=this.shipArray.length*c.tileSize/2,i=(t-c.tileSize/2)%c.tileSize,n=(e-c.tileSize/2)%c.tileSize;this.cameras.main.centerOn(i,n)},e.prototype.bindDebugEvents=function(){this.input.keyboard.on("keydown_F4",function(){s.isDebugging=!s.isDebugging,s.isDebugging?(this.drawDebug(),this.scene.run("DebugScene")):(this.destroyDebug(),this.scene.stop("DebugScene"))},this),s.isMobile||this.input.on("pointermove",function(t){var e=this.cameras.main.getWorldPoint(t.x,t.y);this.events.emit("tileCoordinates",this.getTileCoordinates(e.x,e.y))},this)},e.prototype.bindCameraEvents=function(){if(s.isMobile){this.pinch=this.rexGestures.add.pinch(),this.pinch.enable,this.pinch.on("pinch",function(t){this.pinchZoom*=t.scaleFactor,this.pinchZoom=this.pinchZoom>2?2:this.pinchZoom<.25?.25:this.pinchZoom,this.cameras.main.zoomTo(this.pinchZoom,0)},this)}else this.input.on("wheel",function(t){var e=this.cameras.main.zoom,i=this.cameras.main.zoom;t.deltaY<0?i+=e<1?.25:.5:t.deltaY>0&&(i-=e<=1?.25:.5),e!==(i=i>2?2:i<.25?.25:i)&&this.cameras.main.zoomTo(i,150)},this)},e.prototype.bindHudEvents=function(){var t=this.scene.get("HudScene");t.events.on("hudPointerDown",function(t){this.isHudPointerDown=t},this),t.events.on("buildButton",function(t){var e=this.cache.json.get("itemData").filter(function(e){return e.id===t});if(e&&1===e.length){this.buildingTiles=[];var i=(c.worldSize+1)*c.tileSize,n=new f(this,i,i,"shipTiles",e[0],!0);n.alpha=.9,this.buildingTiles.push(n),this.add.existing(n),this.isBuilding=!0}},this)},e.prototype.bindTileEvents=function(){this.input.on("pointermove",function(t){if(this.isBuilding&&this.buildingTiles){var e=this.cameras.main.getWorldPoint(t.x,t.y);if(t.isDown){this.isHudPointerDown=!0;var i=void 0,n=Phaser.Math.Angle.Between(this.buildingTiles[0].x,this.buildingTiles[0].y,t.worldX,t.worldY),o=Phaser.Math.Snap.To(n,Math.PI/2);if((i=0===o?Phaser.Math.Vector2.RIGHT:o===Math.PI/2?Phaser.Math.Vector2.DOWN:o===-Math.PI/2?Phaser.Math.Vector2.UP:Phaser.Math.Vector2.LEFT)!=this.buildingDirection&&this.buildingTiles.length>1){for(var r=1;r<this.buildingTiles.length;r++)this.buildingTiles[r].destroy();this.buildingTiles.length=1}this.buildingDirection=i,this.createBuildTiles(i,e)}else{var s=this.getTileCoordinates(e.x,e.y);this.buildingTiles[0].x=s.x*c.tileSize,this.buildingTiles[0].y=s.y*c.tileSize,this.buildingTiles[0].updateLocation(),this.ship.filter(function(t){return t.location.x===s.x&&t.location.y===s.y}).length>0?this.buildingTiles[0].tint=Phaser.Display.Color.HexStringToColor("#ff0000").color:this.buildingTiles[0].clearTint()}}},this),this.input.on("pointerdown",function(t){this.isBuilding&&this.buildingTiles&&t.rightButtonDown()&&this.clearBuildingTiles()},this),this.input.on("pointerup",function(){var t=this;if(this.isHudPointerDown=!1,this.isBuilding&&this.buildingTiles){for(var e=function(e){if(i.ship.filter(function(i){return i.x===t.buildingTiles[e].x&&i.y===t.buildingTiles[e].y}).length<=0){var n=new f(i,i.buildingTiles[e].x,i.buildingTiles[e].y,i.buildingTiles[e].texture.key,i.buildingTiles[e].item);i.add.existing(n),i.ship.push(n)}},i=this,n=0;n<this.buildingTiles.length;n++)e(n);for(var o=1;o<this.buildingTiles.length;o++)this.buildingTiles[o].destroy();this.buildingTiles.length=1,this.buildingTiles[0].setDepth(1),s.isDebugging&&(this.destroyDebug(),this.drawDebug())}},this)},e.prototype.drawGrid=function(){for(var t=this.cameras.main.getBounds(),e=t.width,i=t.height,n=Math.floor(e/2/c.tileSize)*c.tileSize*-1-c.tileSize/2,o=Math.floor(i/2/c.tileSize)*c.tileSize*-1-c.tileSize/2;n<e/2;)this.drawLine(n,i/2*-1,n,i/2,"#ffffff",.1),this.drawLine(e/2*-1,o,e/2,o,"#ffffff",.1),o+=c.tileSize,n+=c.tileSize},e.prototype.drawShip=function(){this.ship=[];var t=this.shipArray[0].length*c.tileSize/2,e=this.shipArray.length*c.tileSize/2;t-=(t-c.tileSize/2)%c.tileSize,e-=(e-c.tileSize/2)%c.tileSize;for(var i=this.cache.json.get("itemData"),n=0;n<this.shipArray.length;n++)for(var o=0;o<this.shipArray[n].length;o++)if(1===this.shipArray[n][o]){var r=o*c.tileSize+c.tileSize/2-t,s=n*c.tileSize+c.tileSize/2-e,a=new f(this,r,s,"shipTiles",i[1]);this.add.existing(a),this.ship.push(a)}},e.prototype.drawDebug=function(){this.debugObjects=[];var t=this.cameras.main.getBounds(),e=t.width,i=t.height;this.debugObjects.push(this.drawLine(0,i/2*-1,0,i/2,"#0000ff",.5)),this.debugObjects.push(this.drawLine(e/2*-1,0,e/2,0,"#0000ff",.5))},e.prototype.destroyDebug=function(){if(this.debugObjects){for(var t=0;t<this.debugObjects.length;t++)this.debugObjects[t].destroy();this.debugObjects=null}},e.prototype.getTileCoordinates=function(t,e){var i=c.tileSize/2;return new Phaser.Geom.Point(Math.floor((t+i)/c.tileSize),Math.floor((e+i)/c.tileSize))},e.prototype.clearBuildingTiles=function(){for(var t=0;t<this.buildingTiles.length;t++)this.buildingTiles[t].destroy();this.buildingTiles=[],this.isBuilding=!1},e.prototype.createBuildTiles=function(t,e){var i;if(i=t===Phaser.Math.Vector2.LEFT||t===Phaser.Math.Vector2.RIGHT?Math.abs(Math.round((e.x-this.buildingTiles[0].x)/c.tileSize)):Math.abs(Math.round((e.y-this.buildingTiles[0].y)/c.tileSize)),this.buildingTiles.length<i+1)for(var n=function(e){var i=o.buildingTiles[0].x,n=o.buildingTiles[0].y;t===Phaser.Math.Vector2.RIGHT?i=o.buildingTiles[0].x+c.tileSize*e:t===Phaser.Math.Vector2.LEFT?i=o.buildingTiles[0].x-c.tileSize*e:n=t===Phaser.Math.Vector2.UP?o.buildingTiles[0].y-c.tileSize*e:o.buildingTiles[0].y+c.tileSize*e;var r=new f(o,i,n,"shipTiles",o.buildingTiles[0].item,!0);r.alpha=.9,o.ship.filter(function(t){return t.location.x===r.location.x&&t.location.y===r.location.y}).length<=0&&(o.buildingTiles.push(r),o.add.existing(r))},o=this,r=this.buildingTiles.length;r<=i;r++)n(r);else if(this.buildingTiles.length>1&&this.buildingTiles.length>i+1){var s=this.buildingTiles.length-(i+1);for(r=1;r<=s;r++){this.buildingTiles.pop().destroy()}}},e}(h),g=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),m=function(t){function e(){var e=t.call(this,{key:"DebugScene"})||this;return e.debugFont={fontFamily:"Monospace",fontSize:12,color:"#ffffff"},e}return g(e,t),e.prototype.create=function(){this.worldCamera=this.scene.get("ShipScene").cameras.main,this.drawStartingText(),this.drawCameraCenter(),this.bindEvents(),this.input.addPointer(1)},e.prototype.update=function(){var t=this.worldCamera.getBounds();if(this.cameraText.setText(["---- Camera ----","Size: "+t.width+", "+t.height,"View: "+Math.round(this.worldCamera.worldView.width)+", "+Math.round(this.worldCamera.worldView.height),"Center: "+Math.round(this.worldCamera.worldView.centerX)+", "+Math.round(this.worldCamera.worldView.centerY),"Zoom: "+this.worldCamera.zoom.toFixed(2)]),!s.isMobile){var e=this.worldCamera.getWorldPoint(this.input.activePointer.x,this.input.activePointer.y),i=["---- Mouse ----","Screen: "+Math.round(this.input.activePointer.x)+", "+Math.round(this.input.activePointer.y),"World: "+Math.round(e.x)+", "+Math.round(e.y)];this.tileCoordinates&&i.push("Tile: "+this.tileCoordinates.x+", "+this.tileCoordinates.y),this.mouseText.setText(i)}if(s.isMobile){this.pointerText&&this.pointerText.destroy();var n=["---- Pointers ----"];this.input.activePointer.isDown&&n.push("activePointer: "+Math.round(this.input.activePointer.position.x)+", "+Math.round(this.input.activePointer.position.y)),this.input.pointer1.isDown&&n.push("pointer1: "+Math.round(this.input.pointer1.position.x)+", "+Math.round(this.input.pointer1.position.y)),this.input.pointer2.isDown&&n.push("pointer2: "+Math.round(this.input.pointer2.position.x)+", "+Math.round(this.input.pointer2.position.y)),this.pointerText=this.add.text(200,0,n,this.debugFont)}},e.prototype.bindEvents=function(){this.scene.get("ShipScene").events.on("tileCoordinates",function(t){this.tileCoordinates=t},this)},e.prototype.drawStartingText=function(){this.cameraText=this.add.text(0,0,["Camera","Center: 0, 0","Zoom: 0"],this.debugFont),s.isMobile?this.pointerText=this.add.text(200,0,"---- Pointer ----",this.debugFont):this.mouseText=this.add.text(200,0,["---- Mouse ----","Screen: 0, 0","World: 0, 0","Tile: 0, 0"],this.debugFont)},e.prototype.drawCameraCenter=function(){var t=this.worldCamera.getBounds(),e=t.width,i=t.height;this.drawLine(this.worldCamera.centerX,i/2*-1,this.worldCamera.centerX,i/2,"#ff0000",.25),this.drawLine(e/2*-1,this.worldCamera.centerY,e/2,this.worldCamera.centerY,"#ff0000",.25)},e}(h),b=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),v=function(t){function e(){var e=t.call(this,{key:"HudScene"})||this;return e.elementIsHovered=!1,e.isMenuOpen=!1,e.menuFont={fontFamily:"Arial",fontSize:16,color:"#ffffff"},e.itemFont={fontFamily:"Arial",fontSize:12,color:"#ffffff"},e.menuButtons=[],e.itemButtons=[],e}return b(e,t),e.prototype.create=function(){this.createMenuButton(),this.createItemButton()},e.prototype.createMenuButton=function(){this.menuButtonWidth=150,this.menuButtonHeight=40;var t=Phaser.Display.Color.HexStringToColor("#222222").color,e=Phaser.Display.Color.HexStringToColor("#333333").color,i=this.add.rectangle(0,0,this.menuButtonWidth,this.menuButtonHeight);i.setFillStyle(t),i.setStrokeStyle(1,Phaser.Display.Color.HexStringToColor("#333333").color);var n=this.add.text(0,0,"Build",{fontFamily:this.menuFont.fontFamily,fontSize:this.menuFont.fontSize,color:this.menuFont.color});n.setOrigin(.5);var o=this.add.container(this.menuButtonWidth/2,window.innerHeight-this.menuButtonHeight/2,[i,n]);o.setSize(this.menuButtonWidth,this.menuButtonHeight),o.setInteractive({cursor:"pointer"}),o.on("pointerover",function(){this.list[0].fillColor=e}),o.on("pointerout",function(){this.list[0].fillColor=t}),o.on("pointerdown",function(){this.events.emit("hudPointerDown",!0),this.isMenuOpen=!this.isMenuOpen;for(var t=0;t<this.itemButtons.length;t++)this.itemButtons[t].setActive(this.isMenuOpen),this.itemButtons[t].setVisible(this.isMenuOpen)},this),o.on("pointerup",function(){this.events.emit("hudPointerDown",!1)},this),this.menuButtons.push(o)},e.prototype.createItemButton=function(){for(var t,e,i=this.cache.json.get("itemData"),n=62+this.itemFont.fontSize,o=n,r=Phaser.Display.Color.HexStringToColor("#222222").color,s=Phaser.Display.Color.HexStringToColor("#333333").color,a=n/2*-1+21+10,h=a+21+this.itemFont.fontSize/2+5,u=function(u){var c=l.add.rectangle(0,0,o,n);c.setFillStyle(r),c.setStrokeStyle(1,Phaser.Display.Color.HexStringToColor("#333333").color),c.alpha=.75;var p=new f(l,0,a,"shipTiles",i[u]);p.setOrigin(.5),p.displayWidth=42,p.scaleY=p.scaleX,(t=l.add.text(0,h,i[u].name,{fontFamily:l.itemFont.fontFamily,fontSize:l.itemFont.fontSize,color:l.itemFont.color})).setOrigin(.5);var d=o/2+l.menuButtonWidth+10+u*(o+10);(e=l.add.container(d,window.innerHeight-n/2-10,[c,p,t])).setSize(o,n),e.setInteractive({cursor:"pointer"}),e.on("pointerover",function(){this.list[0].fillColor=s}),e.on("pointerout",function(){this.list[0].fillColor=r}),e.on("pointerdown",function(){this.events.emit("buildButton",i[u].id),this.events.emit("hudPointerDown",!0)},l),e.setActive(!1),e.setVisible(!1),l.itemButtons.push(e)},l=this,c=0;c<i.length;c++)u(c)},e}(h),w={type:n.AUTO,parent:"app",title:"Phaser Test",version:"0.0.1",width:1920,height:1080,scene:[l,y,m,v],scale:{mode:n.Scale.RESIZE,autoCenter:n.Scale.CENTER_BOTH},disableContextMenu:!0,resolution:window.devicePixelRatio,plugins:{scene:[{key:"rexGestures",plugin:r.a,mapping:"rexGestures"}]}},T=new n.Game(w);window.game=T},259:function(t,e){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(t){"object"==typeof window&&(i=window)}t.exports=i},535:function(t,e,i){i(61),t.exports=i(1456)},742:function(t,e){var i,n,o=t.exports={};function r(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(i===setTimeout)return setTimeout(t,0);if((i===r||!i)&&setTimeout)return i=setTimeout,setTimeout(t,0);try{return i(t,0)}catch(e){try{return i.call(null,t,0)}catch(e){return i.call(this,t,0)}}}!function(){try{i="function"==typeof setTimeout?setTimeout:r}catch(t){i=r}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(t){n=s}}();var h,u=[],l=!1,c=-1;function p(){l&&h&&(l=!1,h.length?u=h.concat(u):c=-1,u.length&&f())}function f(){if(!l){var t=a(p);l=!0;for(var e=u.length;e;){for(h=u,u=[];++c<e;)h&&h[c].run();c=-1,e=u.length}h=null,l=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function y(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];u.push(new d(t,e)),1!==u.length||l||a(f)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},9:function(t,e,i){"use strict";var n=Object.prototype.hasOwnProperty,o="~";function r(){}function s(t,e,i,n,r){if("function"!=typeof i)throw new TypeError("The listener must be a function");var s=new function(t,e,i){this.fn=t,this.context=e,this.once=i||!1}(i,n||t,r),a=o?o+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],s]:t._events[a].push(s):(t._events[a]=s,t._eventsCount++),t}function a(t,e){0==--t._eventsCount?t._events=new r:delete t._events[e]}function h(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(o=!1)),h.prototype.eventNames=function(){var t,e,i=[];if(0===this._eventsCount)return i;for(e in t=this._events)n.call(t,e)&&i.push(o?e.slice(1):e);return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(t)):i},h.prototype.listeners=function(t){var e=o?o+t:t,i=this._events[e];if(!i)return[];if(i.fn)return[i.fn];for(var n=0,r=i.length,s=new Array(r);n<r;n++)s[n]=i[n].fn;return s},h.prototype.listenerCount=function(t){var e=o?o+t:t,i=this._events[e];return i?i.fn?1:i.length:0},h.prototype.emit=function(t,e,i,n,r,s){var a=o?o+t:t;if(!this._events[a])return!1;var h,u,l=this._events[a],c=arguments.length;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),c){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,i),!0;case 4:return l.fn.call(l.context,e,i,n),!0;case 5:return l.fn.call(l.context,e,i,n,r),!0;case 6:return l.fn.call(l.context,e,i,n,r,s),!0}for(u=1,h=new Array(c-1);u<c;u++)h[u-1]=arguments[u];l.fn.apply(l.context,h)}else{var p,f=l.length;for(u=0;u<f;u++)switch(l[u].once&&this.removeListener(t,l[u].fn,void 0,!0),c){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,e);break;case 3:l[u].fn.call(l[u].context,e,i);break;case 4:l[u].fn.call(l[u].context,e,i,n);break;default:if(!h)for(p=1,h=new Array(c-1);p<c;p++)h[p-1]=arguments[p];l[u].fn.apply(l[u].context,h)}}return!0},h.prototype.on=function(t,e,i){return s(this,t,e,i,!1)},h.prototype.once=function(t,e,i){return s(this,t,e,i,!0)},h.prototype.removeListener=function(t,e,i,n){var r=o?o+t:t;if(!this._events[r])return this;if(!e)return a(this,r),this;var s=this._events[r];if(s.fn)s.fn!==e||n&&!s.once||i&&s.context!==i||a(this,r);else{for(var h=0,u=[],l=s.length;h<l;h++)(s[h].fn!==e||n&&!s[h].once||i&&s[h].context!==i)&&u.push(s[h]);u.length?this._events[r]=1===u.length?u[0]:u:a(this,r)}return this},h.prototype.removeAllListeners=function(t){var e;return t?(e=o?o+t:t,this._events[e]&&a(this,e)):(this._events=new r,this._eventsCount=0),this},h.prototype.off=h.prototype.removeListener,h.prototype.addListener=h.prototype.on,h.prefixed=o,h.EventEmitter=h,t.exports=h}});