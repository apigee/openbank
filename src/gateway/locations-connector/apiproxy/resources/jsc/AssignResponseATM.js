var entities = context.getVariable("response.content");
var cursor = JSON.parse(entities).cursor;
entities = JSON.parse(entities).entities;
 
var data = [];
for (var i = 0; i < entities.length; i++) 
{
                var entity = {}; 
                
                entity.AtmId = entities[i].AtmId;
                entity.AtmServices = entities[i].AtmServices;
                entity.Address = entities[i].Address;
                entity.Currency = entities[i].Currency;
                entity.Location = entities[i].Location;
                entity.LocationCategory = entities[i].LocationCategory;
                entity.MinimumValueDispensed = entities[i].MinimumValueDispensed;
                entity.Organisation = entities[i].Organisation;
                entity.SiteName = entities[i].SiteName;
                entity.SupportedLanguages = entities[i].SupportedLanguages;
                data.push(entity);
}
var atms = {};
atms.Data = {};
atms.Data["Atm"] = data;
atms.Meta = {};
atms.Links = {};

if (cursor) 
{
    atms.Links.next = "/atms?cursor=" + cursor;
}
context.setVariable("response.content",JSON.stringify(atms));