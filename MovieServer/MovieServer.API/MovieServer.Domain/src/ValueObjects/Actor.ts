import { EmptyActorNameException } from "@Domain/Exceptions";

export default class Actor {
    /**
     * constructor
     */
    private constructor(
        public Name: string,
        public Role: string
    ) {
        if (Name === "") {
            throw new EmptyActorNameException();
        }
    }

    // implicit
    public static Create(name: string, role: string): Actor {
        return new Actor(name, role);
    }
}