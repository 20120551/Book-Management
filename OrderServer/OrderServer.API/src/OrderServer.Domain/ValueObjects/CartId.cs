using OrderServer.Domain.Exceptions;

namespace OrderServer.Domain.ValueObjects
{
    public record CartId
    {
        public Guid Guid { get; set; }
        public CartId(Guid id)
        {
            if(id == Guid.Empty)
            {
                throw new EmptyCartIdException();
            }   
            Guid = id;
        }

        public static implicit operator CartId(string id) => new(Guid.Parse(id));
        public static implicit operator Guid(CartId id) => id.Guid;
        public static implicit operator CartId(Guid id) => new(id);
    }
}
