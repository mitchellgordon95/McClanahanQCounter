Parse.Cloud.define("incrementCounter", function(request, response) {
     
    var Counter = Parse.Object.extend("Counter");
    var query = new Parse.Query(Counter); 
    query.get("OYMHX9dQV4", {
        success: function(counter) {
            if (Date.now() - counter.updatedAt > 30000)
            {
                count = counter.get("count") + 1;
                counter.set("count", count);

                Parse.Cloud.useMasterKey();
                counter.save(null, {
                    success: function() {
                        response.success(count);
                    },
                    error: function() {
                        response.error("Screw you, Mark.");
                    }
                });
                
            }
            else
            {
                response.error("Screw you, Mark.");
            }
        },
        error: function(object, error) {
            response.error("Screw you, Mark.");
        }
    });

});
               
