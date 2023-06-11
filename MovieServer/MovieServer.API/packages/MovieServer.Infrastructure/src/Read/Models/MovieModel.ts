export const MovieModel =
{
    Id: String,
    //name
    Name: String,
    //status
    Status: String,
    //price
    Slot: String,
    //price
    Price: String,
    //localization
    Localization: {
        District: String,
        City: String
    },
    Actors: [{
        Name: String,
        Role: String,
        Id: Number
    }]
}