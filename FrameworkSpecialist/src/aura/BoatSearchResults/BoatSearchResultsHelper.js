({
 onSearch : function(component,event) {
     console.log('Selected Boat: '+component.get("v.boatTypeId1"));
     	var boatselected=component.get("v.boatTypeId1")
        var action = component.get("c.getBoats");
        if(boatselected=='All Types'){
            boatselected='';
        }
		 	var action = component.get("c.getBoats");
        	action.setParams({
          	"boatTypeId":boatselected
        	});
        	// debugger
    		action.setCallback(this, function(response) {
               
                var state = response.getState();
                if (component.isValid() && state === "SUCCESS") {
                    //debugger
                    //c//onsole.log("responce : " + response.getReturnValue());
                    component.set("v.boats", response.getReturnValue());
                    //.log("responce1 : " + component.get("v.boats"));
                }
                else {
                    console.log("Failed with state1: " + state);
                }
        	});
    		$A.enqueueAction(action);
	}
})