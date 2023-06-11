export default class MovieId {
    Guid: string;
    /**
     * constructor
     */
    private constructor();
    Compare(id: string): boolean;
    static Create(id: string): MovieId;
}
