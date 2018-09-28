({
	onBoatClick : function(component, event, helper) {

 		var myEvent = component.getEvent("BoatSelect");
        var boat=component.get("v.boat");
        myEvent.setParams({"boatId": boat.Id});
        myEvent.fire();
        
        console.log('before Application event BoatSelected');
        var appEvent = $A.get("e.c:BoatSelected");

          
        appEvent.setParams({
            "boat": boat
        });
        alert("Id" + boat.Id + " Name" + boat.Name + " Lat" + boat.Geolocation__Latitude__s + " Long" + boat.Geolocation__Longitude__s );
        appEvent.fire();   
        debugger;

        var plotEvent = $A.get("e.c:PlotMapMarker");
        plotEvent.setParams({
            "lat": boat.Geolocation__Latitude__s,
            "sObjectId": boat.Id,
            "long": boat.Geolocation__Longitude__s,
            "label":boat.Name
        });
        console.log('After Application event PlotMapMarker SetParams'); 
        plotEvent.fire(); 
    }  
})