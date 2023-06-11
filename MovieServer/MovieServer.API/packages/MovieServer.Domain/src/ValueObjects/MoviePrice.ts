import { MoviePriceIsNotInRangeException } from "../Exceptions";

export default class MoviePrice {
    public static MAX_PRICE = 1000000;
    public Price: number;
    /**
     * constructor
     */
    private constructor(price: number) {
        if (price < 0 || price > MoviePrice.MAX_PRICE) {
            throw new MoviePriceIsNotInRangeException(price);
        }
        this.Price = price;
    }

    // implicit
    public static Create(price: number): MoviePrice {
        return new MoviePrice(price);
    }
}