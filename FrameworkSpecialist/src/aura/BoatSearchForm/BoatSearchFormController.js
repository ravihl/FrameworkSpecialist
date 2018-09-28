({
	doInit: function(component, event, helper) {
 var createNewBoat = $A.get("e.force:createRecord");
        if (createNewBoat) {
            component.set("v.renderNew", true);
        }else{
             component.set("v.renderNew", false);
        }
    var action = component.get("c.getboattypes");

    // Add callback behavior for when response is received
    action.setCallback(this, function(response) {
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") {
            //debugger
            console.log("responce : " + response.getReturnValue());
            component.set("v.btypes", response.getReturnValue());
        }
        else {
            console.log("Failed with state: " + state);
        }
    });

    // Send action off to be executed
    $A.enqueueAction(action);
	},
    createBoat: function (component) 
     {
            debugger
            console.log('inside controller');
            var createRecordEvent = $A.get('e.force:createRecord');
            if (createRecordEvent) 
            {
                console.log('before type name');
                var typeName = component.find("selectedType").get("v.value");
                console.log('before type name');                
                
                    //var typeMap = component.get('v.searchOptionToIdMap');
                    var typeId = null;
                    if (typeName) 
                    {
                            typeId = typeName;
                    }
                    createRecordEvent.setParams({
                        'entityApiName': 'Boat__c',
                        'defaultFieldValues': {
                            'BoatType__c': typeId
                        }
                    });
                    createRecordEvent.fire();
            }
       },
    onFormSubmit:function(component, event, helper) {
        //debugger
        // var myEvent = $A.get("e.c:BoatSearchEvent");
        // myEvent.setParams({"typeId": component.get("v.selectedType")});
        // myEvent.fire();
        console.log("selectType "+ component.get("v.selectedType") );
          var boatTypeId = component.get("v.selectedType");
        console.log("Search button pressed " + boatTypeId);
        var formSubmit = component.getEvent("formsubmit");
        formSubmit.setParams({"formData":
                            {"boatTypeId" : boatTypeId}
        });
        formSubmit.fire();
        },
    handleChange:function(component, event, helper) {
        var y=component.find("boatTypes").get("v.value");
        console.log("value :  "+ y);
        component.set("v.selectedType",component.find("boatTypes").get("v.value"));
    },

    handleClick:function(component, event, helper) {
        //debugger
        var y=component.find("boatTypes").get("v.value");
        console.log("value :  "+ y);
        //calling another controller funtion from controller
        $A.enqueueAction(component.get('c.createBoat'));
    }
        
})