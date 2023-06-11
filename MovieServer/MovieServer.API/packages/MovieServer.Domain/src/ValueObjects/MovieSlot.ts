import { MovieSlotIsNotInRangeException } from "../Exceptions";

export default class MovieSlot {
    public static MAX_SLOT = 100;
    public Slot: number;
    /**
     * constructor
     */
    private constructor(slot: number) {
        if (slot < 0 && slot > MovieSlot.MAX_SLOT) {
            throw new MovieSlotIsNotInRangeException(slot);
        }
        this.Slot = slot;
    }

    // implicit
    public static Create(slot: number): MovieSlot {
        return new MovieSlot(slot);
    }
}