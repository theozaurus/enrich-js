if ("undefined" == typeof com) { var com = {}; }
if (!com.jivatechnology) { com.jivatechnology = {}; }

(function(){

  this.Enrich = (function(){

    return function(){
      var that = this;

      var callbacks = {};

      this.add = function(name,callback){
        callbacks[name] = callback;
        if(dom){ callback(); }
        return that;
      };

      this.list = function(){
        return callbacks;
      };

      this.run = function(dom){
        if(!dom){ dom = document; }
        for(var i in callbacks){
          if(callbacks.hasOwnProperty(i)){
            var callback = callbacks[i];
            callback(dom);
          }
        }
        return that;
      };

      // Save duplicating logic
      // from other frameworks, let them call this
      var dom = false;
      this.domLoaded = function(){
        if(!dom){ that.run(); }
        dom = true;
        return that;
      };

    };

  })();

}).call(com.jivatechnology);
