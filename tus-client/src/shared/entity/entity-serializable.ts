
export interface EntitySerializable<T> {
    deserialize(input: Object): T;
}

export class EntitySerializableUtil {

    public static convertToObject<T extends EntitySerializable<any>>(type: { new(): T ;}, objFromJson: T ): T {
        return new type().deserialize(objFromJson);
    }
}

