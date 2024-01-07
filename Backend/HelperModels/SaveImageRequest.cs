namespace Backend.HelperModels
{
    public class SaveImageRequest
    {
        public string LocationName { get; set; }
        public string? HotelName { get; set; }
        public string? RoomName { get; set; }
        public string? RestaurantName { get; set; }
        public string? ActivityName { get; set; }
        public string ImageData { get; set; }
    }   
}
